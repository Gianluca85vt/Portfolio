## LinkedIn

A STEP file contains no polygons. Not a low count — none. That still surprises people who come into a 3D pipeline from outside, because the part renders perfectly on the engineer's screen, in colour, with fillets you can measure.

What is in the file is a set of mathematical surfaces and the trimmed boundaries where they meet. So when you import it, something has to tessellate those surfaces into triangles against a tolerance, and what lands on your desk has no relationship to how the part is shaped. A cylinder becomes a band of slivers. Flat faces arrive as noise running in no particular direction. You cannot bevel it, you cannot subdivide it, and UV seams have nowhere sensible to go.

Pilgway — the 3DCoat people — have put a tool called CADQuader into beta that takes STEP and IGES and generates quad meshes, preserving sharp corners and edges and, they say, building edge loops around circular features. There is a bridge to Blender and back, and OBJ export.

That last claim is the one I care about, because holes are the entire problem. In the CAD file a bolt hole is a trimmed cylindrical surface with an exact radius. Tessellate it and you get a triangle fan off the rim with no concentric loop, and that single absence is what breaks everything downstream: the bevel eats the face, the circle goes polygonal at the first subdivision level, the normal bake has no clean cage, and nothing is grabbable when the fastener changes.

Which is why every hard-surface artist handed a STEP file rebuilds it by hand over the triangle soup. A week of work that buys nothing an engineer would call progress, because the shape was already right when it arrived.

A tester on 3DCoat's forum reports sharp edges preserved well, quad flow needing work, and contours missing around round holes. Headline feature and reported failure in the same sentence. Worth watching rather than buying.

#b3d #3dmodeling #gamedev

## X

A STEP file contains no polygons. Not a low count — none. It is mathematical surfaces and trimmed boundaries, drawn straight to the engineer's screen at whatever precision the viewport asks for. There is nothing in there to export.

So import tessellates: triangles dropped against a chord tolerance, with no relationship to how the part is shaped. Cylinders become bands of slivers. You cannot bevel it, cannot subdivide it, and UV seams have nowhere to go.

Pilgway (3DCoat) has CADQuader in beta: STEP and IGES in, quad meshes out, several generation methods, sharp corners and edges preserved, a Blender bridge both ways, OBJ export. The claim that matters is edge loops around circular features.

Holes are why. In CAD a bolt hole is a trimmed cylinder with an exact radius. Tessellated, you get a fan off the rim and no concentric loop — so the bevel eats the face, the circle goes polygonal on subdivision, and the bake has no clean cage.

A tester on 3DCoat's forum: sharp edges preserved well, quad flow needs work, contours missing around round holes on their model. The headline feature and the reported gap in one sentence. Free beta, 30 days full access, then a licence to export.

What I would test first is not a bracket. Take a fillet running into a hole — tangent continuity between a blend surface and a cylindrical cut is where CAD gets ambiguous about what the edge is, and a mesher has to commit.
