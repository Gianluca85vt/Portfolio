"""
Detail levels: a model cut down to a ladder of triangle counts, for the
"Detail budget" viewer on the home page.

Each level is one small gzipped binary file the viewer reads straight into
WebGL: quantised positions, a normal and a colour index per vertex, and the
palette.
The source is decimated from full resolution for every level (not level from
level), so each one is the best that triangle count can do.

How to run it
-------------
With the model file (FBX, glTF/GLB, OBJ):

    blender -b --python scripts/blender/detail_levels.py -- path/to/eva_01.fbx --out public/models --name eva01 --front +x

Or on an open .blend (every visible mesh goes in):

    blender -b scene.blend --python scripts/blender/detail_levels.py -- --out public/models --name eva01

It prints the triangle count of each level at the end: those are the numbers
to put in `lab.detail` in src/data/home.ts.

Options (all optional)
----------------------
    --out DIR          where to write (default: next to the model)
    --name NAME        file names start with this (default: the model's name)
    --levels 500,...   triangle counts, lowest first (default: 500,2000,8000,32000,128000)
    --front +x         which way the model faces in the file: +x, -x, +y or -y
                       (default -y, Blender's front view)
    --smooth-angle 50  faces meeting at a sharper angle than this keep a hard
                       edge when the viewer's Smooth shading is on

Colours come from each material's base colour (Principled BSDF, or the viewport
colour when there is none). Textures are not carried over.

File layout (little-endian, before gzip)
----------------------------------------
    char[4]  "DLV1"
    u32      vertex count
    u32      index count
    u32      flags: 1 = indices are u32 (else u16)
    f32[3]   centre   position = centre + q / 32767 * half
    f32[3]   half
    u32      palette size, then palette size x RGBA u8 (sRGB)
    indices, padded to 4 bytes
    i16[3]   position per vertex, padded to 4 bytes
    i8[3]    normal per vertex, padded to 4 bytes
    u8       palette index per vertex
"""

import argparse
import gzip
import math
import os
import struct
import sys

import bpy

FRONTS = {
    # (x, y, z) in Blender -> (x, y, z) in the viewer: y up, facing +z.
    "-y": lambda x, y, z: (x, z, -y),
    "+y": lambda x, y, z: (-x, z, y),
    "+x": lambda x, y, z: (y, z, x),
    "-x": lambda x, y, z: (-y, z, -x),
}


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser(prog="detail_levels")
    p.add_argument("model", nargs="?")
    p.add_argument("--out")
    p.add_argument("--name")
    p.add_argument("--levels", default="500,2000,8000,32000,128000")
    p.add_argument("--front", default="-y", choices=sorted(FRONTS))
    p.add_argument("--smooth-angle", type=float, default=50.0)
    return p.parse_args(argv)


def log(msg):
    print(f"[detail] {msg}", flush=True)


def load(path):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    ext = os.path.splitext(path)[1].lower()
    if ext == ".fbx":
        bpy.ops.import_scene.fbx(filepath=path)
    elif ext in (".glb", ".gltf"):
        bpy.ops.import_scene.gltf(filepath=path)
    elif ext == ".obj":
        if hasattr(bpy.ops.wm, "obj_import"):
            bpy.ops.wm.obj_import(filepath=path)
        else:
            bpy.ops.import_scene.obj(filepath=path)
    else:
        raise SystemExit(f"Can't read {ext} files; export FBX, GLB or OBJ.")


def material_colour(mat):
    if mat is None:
        return (0.5, 0.5, 0.5)
    if mat.use_nodes:
        for node in mat.node_tree.nodes:
            if node.type == "BSDF_PRINCIPLED":
                return tuple(node.inputs["Base Color"].default_value[:3])
    return tuple(mat.diffuse_color[:3])


def to_srgb(c):
    c = max(0.0, min(1.0, c))
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def joined_mesh():
    """Every visible mesh, transforms applied, as one object."""
    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH" and o.visible_get() and len(o.data.polygons)]
    if not meshes:
        raise SystemExit("No meshes to export.")
    for o in bpy.context.scene.objects:
        if o not in meshes:
            bpy.data.objects.remove(o, do_unlink=True)
    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes:
        o.hide_select = False
        o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    # Children follow their parents: bake the whole chain into the vertices.
    bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM")
    bpy.ops.object.make_single_user(object=True, obdata=True)
    bpy.ops.object.convert(target="MESH")
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    if obj.data.has_custom_normals:
        bpy.ops.mesh.customdata_custom_splitnormals_clear()
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.remove_doubles(threshold=1e-5)
    bpy.ops.mesh.quads_convert_to_tris()
    bpy.ops.object.mode_set(mode="OBJECT")
    return obj


def triangles(me):
    return sum(len(p.vertices) - 2 for p in me.polygons)


def decimated(src, target):
    """A copy of src with `target` triangles, or one fewer: on closed parts of
    the mesh a collapse takes two triangles at a time, so an even count is not
    always there to be had. The site shows whatever count comes out."""
    have = triangles(src.data)
    obj = src.copy()
    obj.data = src.data.copy()
    bpy.context.scene.collection.objects.link(obj)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    if target < have:
        mod = obj.modifiers.new("decimate", "DECIMATE")
        mod.decimate_type = "COLLAPSE"
        mod.ratio = target / have
        mod.use_collapse_triangulate = True
        bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.quads_convert_to_tris()
    bpy.ops.object.mode_set(mode="OBJECT")
    return obj


def corner_normals(me, angle):
    me.shade_smooth()
    if hasattr(me, "set_sharp_from_angle"):  # Blender 4.1+
        me.set_sharp_from_angle(angle=angle)
        return [tuple(n.vector) for n in me.corner_normals]
    me.use_auto_smooth = True  # Blender 3.x / 4.0
    me.auto_smooth_angle = angle
    me.calc_normals_split()
    return [tuple(l.normal) for l in me.loops]


def export(obj, path, pos_axes, nor_axes, frame, palette, palette_of, angle):
    """One level as a .bin: see the file layout at the top."""
    me = obj.data
    normals = corner_normals(me, angle)
    centre, half = frame
    verts = {}
    pos, nor, mat, idx = [], [], [], []
    for poly in me.polygons:
        m = palette_of[poly.material_index] if poly.material_index < len(palette_of) else 0
        for li in poly.loop_indices:
            vi = me.loops[li].vertex_index
            n = nor_axes(*normals[li])
            q = tuple(max(-127, min(127, round(c * 127))) for c in n)
            key = (vi, q, m)
            at = verts.get(key)
            if at is None:
                at = verts[key] = len(pos)
                p = pos_axes(*me.vertices[vi].co)
                pos.append(tuple(max(-32767, min(32767, round((p[k] - centre[k]) / half[k] * 32767))) for k in range(3)))
                nor.append(q)
                mat.append(m)
            idx.append(at)

    big = len(pos) > 65535
    out = bytearray()
    out += b"DLV1"
    out += struct.pack("<III", len(pos), len(idx), 1 if big else 0)
    out += struct.pack("<3f", *centre) + struct.pack("<3f", *half)
    out += struct.pack("<I", len(palette))
    for c in palette:
        out += bytes(round(to_srgb(v) * 255) for v in c) + b"\xff"

    def pad():
        out.extend(b"\0" * (-len(out) % 4))

    out += struct.pack(f"<{len(idx)}{'I' if big else 'H'}", *idx)
    pad()
    for p in pos:
        out += struct.pack("<3h", *p)
    pad()
    for n in nor:
        out += struct.pack("<3b", *n)
    pad()
    out += bytes(mat)
    data = gzip.compress(bytes(out), compresslevel=9, mtime=0)
    with open(path, "wb") as f:
        f.write(data)
    return len(idx) // 3, len(pos), len(data)


def main():
    args = parse_args()
    if args.model:
        load(os.path.abspath(os.path.expanduser(args.model)))
    source = args.model or bpy.data.filepath
    if not source and not (args.out and args.name):
        raise SystemExit("Pass the model file, or --out and --name.")
    name = args.name or os.path.splitext(os.path.basename(source))[0]
    out = os.path.expanduser(args.out) if args.out else os.path.dirname(os.path.abspath(source))
    os.makedirs(out, exist_ok=True)
    axes = FRONTS[args.front]
    levels = [int(x) for x in args.levels.split(",") if x.strip()]

    src = joined_mesh()
    me = src.data
    log(f"{len(me.polygons)} triangles in, {len(me.materials)} materials")

    # One palette entry per distinct colour, so duplicate materials share it.
    palette, palette_of = [], []
    for mat in me.materials:
        c = tuple(round(v, 4) for v in material_colour(mat))
        if c not in palette:
            palette.append(c)
        palette_of.append(palette.index(c))

    # The frame every level shares: standing on y = 0, turning about the
    # middle of its footprint (area-weighted, so dense parts don't pull it).
    pts = [axes(*v.co) for v in me.vertices]
    lo = [min(p[i] for p in pts) for i in range(3)]
    hi = [max(p[i] for p in pts) for i in range(3)]
    ax = az = total = 0.0
    for poly in me.polygons:
        c = axes(*poly.center)
        ax += c[0] * poly.area
        az += c[2] * poly.area
        total += poly.area
    pivot = (ax / total, lo[1], az / total)
    lo = [lo[i] - pivot[i] for i in range(3)]
    hi = [hi[i] - pivot[i] for i in range(3)]

    def shifted(x, y, z):
        return tuple(a - b for a, b in zip(axes(x, y, z), pivot))

    centre = tuple((lo[i] + hi[i]) / 2 for i in range(3))
    half = tuple(max((hi[i] - lo[i]) / 2, 1e-6) for i in range(3))
    log(f"size {hi[0]-lo[0]:.3f} x {hi[1]-lo[1]:.3f} x {hi[2]-lo[2]:.3f}")

    angle = math.radians(args.smooth_angle)
    counts = []
    for i, target in enumerate(levels):
        obj = decimated(src, target)
        path = os.path.join(out, f"{name}-{i}.bin.gz")
        tris, nverts, size = export(obj, path, shifted, axes, (centre, half), palette, palette_of, angle)
        counts.append(tris)
        log(f"level {i}: {tris} triangles, {nverts} vertices, {size / 1024:.0f} KB -> {path}")
        bpy.data.objects.remove(obj, do_unlink=True)

    log("faces for lab.detail: " + ", ".join(str(c) for c in counts))


if __name__ == "__main__":
    main()
