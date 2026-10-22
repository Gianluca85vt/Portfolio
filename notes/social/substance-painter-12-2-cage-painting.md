## LinkedIn

A bake cage is the least glamorous object in a prop pipeline, and it decides whether your normal map is usable. Adobe just turned it from a mesh into a map.

Substance 3D Painter 12.2 lets you paint the baking cage distance directly onto the low poly — per pixel with a brush, or across a whole sub-object with Polygon Fill.

Why that matters, for anyone who has not spent an afternoon on a smeared chamfer. A baker fires rays along the interpolated vertex normal. On hard edges with averaged normals those normals fan outward, the rays splay, and high-poly detail bends away from the chamfer or reads as a dent on a cylinder cap. A cage replaces the ray directions with an inflated shell.

Until this week you had two options. A single global cage distance, one number trying to serve a 4mm chamfer and a 30cm pauldron at once. Or author a cage mesh in Maya, Blender or Max — duplicate the low poly, push vertices out by hand, export a file whose object names match exactly, import it alongside. Get a name wrong and the baker ignores it in silence. Change the topology and the cage is scrap.

Almost nobody did the second one. The usual fix is to nudge the global distance, squint, and ship.

The pipeline consequence is bigger than the convenience. A skewed bake used to travel back up the chain to whoever owned the low-poly source file, which on a studio asset means a ticket and a wait. Now it is repairable by the person looking at the smear.

The honest limit: this is a Painter asset. If your bake authority is Marmoset Toolbag, xNormal or an in-house script, the mesh-cage round trip stays where it was. And the fragility moves rather than disappearing — a mesh cage breaks when topology changes, a painted one breaks when the UVs do.

Also in 12.2: three new Polygon Fill selection modes, and Visible Polygons Only so a marquee stops punching through to the far side of the mesh.

#3dart #gamedev #substance3d

## X

Substance 3D Painter 12.2 lets you paint the baking cage distance straight onto the low poly. Per pixel with a brush, or per sub-object with Polygon Fill. The cage is a map now, not a mesh.

Why cages exist: the baker fires rays along the interpolated vertex normal. Hard edges with averaged normals make those normals fan out, the rays splay, and detail bends away from the chamfer. An inflated shell replaces the ray directions and the fan goes away.

Before this you had a single global cage distance — one number serving a 4mm chamfer and a 30cm pauldron — or you authored a cage mesh in Maya/Blender/Max and imported it with object names matched exactly. Get a name wrong, the baker ignores it in silence.

Which is why hardly anyone did it. Nudge the global distance, squint, ship. A painted offset lives in the texture set, edited in the same viewport that shows you the bad bake.

The quieter change is who is allowed to fix a skew. It used to go back up the chain to whoever owned the low-poly file. Now it is the person standing in front of the problem.

Limits worth knowing: the offset map is Painter-only, so Toolbag and xNormal shops get nothing. And a mesh cage breaks when topology changes, a painted cage breaks when the UVs do. [image: shot-01.jpg]
