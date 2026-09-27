"""
Portfolio passes: what the website needs out of a Blender scene.

    1. <name>.glb          the model, for the 3D viewer on the home page
    2. <name>-clay.png     the shot again, every material replaced by grey clay
       <name>-wire.png     the shot again, as a wireframe of the model's edges

The two renders use the scene's own camera, resolution and lights, so they sit
exactly on top of the finished render and the site can wipe between them.

How to run it
-------------
From a terminal, on a saved .blend (nothing in the file is changed or saved):

    blender -b path/to/scene.blend --python scripts/blender/portfolio_passes.py -- --out ~/Desktop/portfolio

Or inside Blender: Scripting tab > Open > this file > Run Script. With no
options it does everything and writes to a folder called "portfolio-export"
next to the .blend. Run it from a copy of the file if you are not sure: in the
UI it changes things while it works and puts them back afterwards, but a crash
halfway would leave them changed.

Options (all optional)
----------------------
    --out DIR            where to write (default: <blend folder>/portfolio-export)
    --name NAME          file name to use (default: the .blend's name)
    --only glb,clay,wire what to make (default: all three)
    --objects A,B        which objects go in the GLB (default: every visible mesh)
    --max-mb 5           GLB size to aim for; the mesh is decimated to fit
    --texture 2048       largest texture side in the GLB
    --samples 64         Cycles samples for the clay pass (the wire pass uses 16)
    --keep-background    keep the world behind clay and wire (default: transparent)
    --wire-subdiv        keep subdivision on for the wire pass: the surface is
                         smoothed and the cage's edges are drawn on it (default:
                         the bare modelling cage, the topology people ask to see)
    --turntable          render the wire pass for every frame of the scene's
                         animation too (for the turning head: same frames, same
                         camera, so it drops in for the video the site builds)

Tested against Blender 3.6 and 4.x. Anything an older exporter does not know
about is dropped from the call rather than failing it.
"""

import argparse
import os
import sys

import bpy

LINE = (0.843, 0.886, 0.918, 1.0)   # #D7E2EA, the site's text colour
BASE = (0.05, 0.05, 0.055, 1.0)


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser(prog="portfolio_passes")
    p.add_argument("--out")
    p.add_argument("--name")
    p.add_argument("--only", default="glb,clay,wire")
    p.add_argument("--objects", default="")
    p.add_argument("--max-mb", type=float, default=5.0)
    p.add_argument("--texture", type=int, default=2048)
    p.add_argument("--samples", type=int, default=64)
    p.add_argument("--keep-background", action="store_true")
    p.add_argument("--turntable", action="store_true")
    p.add_argument("--wire-subdiv", action="store_true")
    return p.parse_args(argv)


def log(msg):
    print(f"[portfolio] {msg}", flush=True)


# --------------------------------------------------------------------- setup

def output_paths(args):
    blend = bpy.data.filepath
    if not blend:
        raise SystemExit("Save the .blend first: the output is named after it.")
    folder = os.path.expanduser(args.out) if args.out else os.path.join(os.path.dirname(blend), "portfolio-export")
    os.makedirs(folder, exist_ok=True)
    name = args.name or os.path.splitext(os.path.basename(blend))[0]
    return folder, name


def export_objects(args):
    wanted = [n.strip() for n in args.objects.split(",") if n.strip()]
    if wanted:
        missing = [n for n in wanted if n not in bpy.data.objects]
        if missing:
            raise SystemExit(f"No object called: {', '.join(missing)}")
        return [bpy.data.objects[n] for n in wanted]
    return [
        o for o in bpy.context.view_layer.objects
        if o.type == "MESH" and o.visible_get() and not o.hide_render
    ]


def call_dropping_unknown(op, **kwargs):
    """Calls an operator, dropping any keyword this Blender's version does not know.

    An exporter too old for WebP textures gets its own default format instead.
    """
    for _ in range(len(kwargs) + 1):
        try:
            return op(**kwargs)
        except TypeError as err:
            text = str(err)
            if kwargs.get("export_image_format") == "WEBP" and "WEBP" in text:
                log("this Blender cannot write WebP textures; using its default")
                kwargs["export_image_format"] = "AUTO"
                continue
            bad = next((k for k in kwargs if f'"{k}"' in text or f"'{k}'" in text), None)
            if bad is None:
                raise
            log(f"this Blender has no '{bad}' option; carrying on without it")
            kwargs.pop(bad)
    return op(**kwargs)


# ----------------------------------------------------------------------- GLB

def cap_textures(objects, limit):
    """Scales file-backed images down to `limit` for the export. Returns what to restore."""
    touched = []
    seen = set()
    for obj in objects:
        for slot in obj.material_slots:
            mat = slot.material
            if not mat or not mat.use_nodes:
                continue
            for node in mat.node_tree.nodes:
                img = getattr(node, "image", None)
                if not img or img.name in seen:
                    continue
                seen.add(img.name)
                w, h = img.size
                if max(w, h) <= limit:
                    continue
                if img.packed_file or not img.filepath:
                    log(f"texture {img.name} is {w}x{h} and packed; left as it is")
                    continue
                s = limit / max(w, h)
                img.scale(max(1, int(w * s)), max(1, int(h * s)))
                touched.append(img)
    return touched


def export_glb(path, objects):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objects:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    call_dropping_unknown(
        bpy.ops.export_scene.gltf,
        filepath=path,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_texcoords=True,
        export_normals=True,
        export_materials="EXPORT",
        export_image_format="WEBP",
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_animations=False,
        export_cameras=False,
        export_lights=False,
    )
    return os.path.getsize(path) / (1024 * 1024)


def make_glb(folder, name, args):
    objects = export_objects(args)
    if not objects:
        log("no visible meshes to export; skipping the GLB")
        return
    path = os.path.join(folder, f"{name}.glb")
    depsgraph = bpy.context.evaluated_depsgraph_get()
    faces = sum(len(o.evaluated_get(depsgraph).data.polygons) for o in objects)
    log(f"GLB: {len(objects)} objects, {faces:,} faces after modifiers")

    restore = cap_textures(objects, args.texture)
    added = []
    try:
        size = export_glb(path, objects)
        log(f"GLB: {size:.1f} MB")
        # Too big: decimate every object by the same ratio and try again, up to
        # three times. The modifiers are removed afterwards; the scene keeps its
        # full-resolution mesh.
        tries = 0
        ratio = 1.0
        while size > args.max_mb and tries < 3:
            tries += 1
            ratio *= max(0.1, (args.max_mb / size) * 0.9)
            for o in objects:
                mod = next((m for m in o.modifiers if m.name == "portfolio-decimate"), None)
                if mod is None:
                    mod = o.modifiers.new("portfolio-decimate", "DECIMATE")
                    added.append((o, mod))
                mod.ratio = ratio
            size = export_glb(path, objects)
            log(f"GLB: decimated to {ratio:.0%} of the faces, now {size:.1f} MB")
        if size > args.max_mb:
            log(f"GLB is still {size:.1f} MB. Try a lower --texture, or fewer --objects.")
    finally:
        for o, mod in added:
            o.modifiers.remove(mod)
        for img in restore:
            img.reload()
    log(f"wrote {path}")


# -------------------------------------------------------------------- passes

def clay_material():
    # Built node by node rather than by finding the default "Principled BSDF":
    # with Blender set to translate new data names, that node is called
    # something else, and the lookup comes back empty.
    mat = bpy.data.materials.new("portfolio-clay")
    mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = (0.6, 0.6, 0.6, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.55
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat


def wire_body_material():
    """The dark body under the wireframe lines: enough light to read the form."""
    mat = bpy.data.materials.new("portfolio-wire")
    mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    body = nt.nodes.new("ShaderNodeBsdfDiffuse")
    body.inputs["Color"].default_value = BASE
    nt.links.new(body.outputs["BSDF"], out.inputs["Surface"])
    return mat


class Remember:
    """Sets attributes and puts every one of them back afterwards."""

    def __init__(self):
        self.saved = []

    def set(self, obj, attr, value):
        self.saved.append((obj, attr, getattr(obj, attr)))
        setattr(obj, attr, value)

    def restore(self):
        for obj, attr, value in reversed(self.saved):
            try:
                setattr(obj, attr, value)
            except Exception as err:  # a value this build will not take back
                log(f"could not restore {attr}: {err}")


def mark_all_edges(mesh):
    """Gives every edge a Freestyle mark; returns a function that puts the old marks back.

    Older Blenders keep the mark on each edge; newer ones keep it as a boolean
    edge attribute called "freestyle_edge". Either is handled.
    """
    edges = mesh.edges
    if len(edges) and hasattr(edges[0], "use_freestyle_mark"):
        old = [e.use_freestyle_mark for e in edges]
        for e in edges:
            e.use_freestyle_mark = True

        def put_back():
            for e, v in zip(mesh.edges, old):
                e.use_freestyle_mark = v

        return put_back

    attr = mesh.attributes.get("freestyle_edge")
    existed = attr is not None
    if not existed:
        attr = mesh.attributes.new("freestyle_edge", "BOOLEAN", "EDGE")
    old = [d.value for d in attr.data]
    for d in attr.data:
        d.value = True

    def put_back():
        a = mesh.attributes.get("freestyle_edge")
        if a is None:
            return
        if not existed:
            mesh.attributes.remove(a)
        else:
            for d, v in zip(a.data, old):
                d.value = v

    return put_back


def wire_setup(r, args):
    """
    Lines on every edge of the visible meshes, drawn by Freestyle.

    Freestyle rather than the Wireframe shader node: the node draws the
    triangles the renderer splits every face into, where Freestyle draws the
    mesh's own edges — quads stay quads — and only the ones the camera can see.
    Every edge is given a Freestyle mark for the render and has its old mark
    back afterwards; subdivision is switched off unless --wire-subdiv.
    """
    scene = bpy.context.scene
    layer = bpy.context.view_layer
    meshes = [o for o in layer.objects if o.type == "MESH" and o.visible_get() and not o.hide_render]

    for o in meshes:
        if not args.wire_subdiv:
            for m in o.modifiers:
                if m.type in {"SUBSURF", "MULTIRES"}:
                    r.set(m, "show_render", False)
    marks = [(mesh, mark_all_edges(mesh)) for mesh in {o.data for o in meshes}]

    r.set(scene.render, "use_freestyle", True)
    r.set(scene.render, "line_thickness_mode", "ABSOLUTE")
    r.set(scene.render, "line_thickness", 1.0)
    r.set(layer, "use_freestyle", True)
    fs = layer.freestyle_settings
    for existing in fs.linesets:
        r.set(existing, "show_render", False)
    ls = fs.linesets.new("portfolio-wire")
    ls.select_by_visibility = True
    ls.visibility = "VISIBLE"
    ls.select_by_edge_types = True
    for flag in ("select_silhouette", "select_border", "select_crease", "select_ridge_valley",
                 "select_suggestive_contour", "select_material_boundary", "select_contour",
                 "select_external_contour"):
        setattr(ls, flag, flag in {"select_silhouette", "select_border"})
    ls.select_edge_mark = True
    ls.linestyle.color = LINE[:3]
    ls.linestyle.thickness = 1.0

    def undo():
        style = ls.linestyle
        fs.linesets.remove(ls)
        if style and style.users == 0:
            bpy.data.linestyles.remove(style)
        for mesh, put_back in marks:
            put_back()

    return undo


def render_pass(path, material, samples, args, animation=False, denoise=False, wire=False):
    scene = bpy.context.scene
    if not scene.camera:
        raise SystemExit("The scene has no active camera to render the passes from.")
    r = Remember()
    undo_wire = None
    try:
        if wire:
            undo_wire = wire_setup(r, args)
        # Cycles for both, so the two passes light the model the same way.
        r.set(scene.render, "engine", "CYCLES")
        r.set(scene.cycles, "samples", samples)
        r.set(scene.cycles, "use_denoising", denoise)
        r.set(scene.render, "film_transparent", not args.keep_background)
        r.set(scene.render.image_settings, "file_format", "PNG")
        r.set(scene.render.image_settings, "color_mode", "RGBA" if not args.keep_background else "RGB")
        r.set(bpy.context.view_layer, "material_override", material)
        r.set(scene.render, "filepath", path)
        if animation:
            bpy.ops.render.render(animation=True)
        else:
            bpy.ops.render.render(write_still=True)
    finally:
        if undo_wire:
            undo_wire()
        r.restore()
    log(f"wrote {os.path.dirname(path) + os.sep if animation else path}")


def main():
    args = parse_args()
    folder, name = output_paths(args)
    only = {x.strip() for x in args.only.split(",")}
    log(f"writing to {folder}")

    if "glb" in only:
        make_glb(folder, name, args)

    made = []
    try:
        if "clay" in only:
            mat = clay_material()
            made.append(mat)
            render_pass(os.path.join(folder, f"{name}-clay.png"), mat, args.samples, args, denoise=True)
        if "wire" in only:
            mat = wire_body_material()
            made.append(mat)
            render_pass(os.path.join(folder, f"{name}-wire.png"), mat, 16, args, denoise=True, wire=True)
            if args.turntable:
                frames = os.path.join(folder, f"{name}-wire-frames", "frame_")
                render_pass(frames, mat, 16, args, animation=True, denoise=True, wire=True)
    finally:
        for mat in made:
            bpy.data.materials.remove(mat)

    log("done. Send the folder over and they go straight onto the site.")


main()
