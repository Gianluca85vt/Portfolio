---
title: "CADQuader: STEP files to quads, and holes decide"
date: 2026-11-22
category: 3D
excerpt: Pilgway's CADQuader turns STEP and IGES files into quad meshes and claims edge loops around holes, which is where CAD conversion has always fallen over.
cover: /img/blog/cadquader-step-files-to-quad-meshes/cover.svg
sources:
  - outlet: 80 Level
    url: https://80.lv/articles/3dcoat-dev-launches-new-tool-to-convert-cad-models-into-polygon-meshes
  - outlet: NOVEDGE
    url: https://novedge.com/blogs/design-news/meet-the-beta-version-of-cadquader-our-brand-new-tool-for-converting-step-files-into-quad-meshes
artistView:
  take: "Pilgway has aimed this at the one part of CAD conversion that resists automation, which is brave and also the only version of the tool worth shipping. Everything else in the chain was solved years ago."
  works:
    - "Pipeline: the Blender bridge going both ways is the right shape for the job. Engineers send revisions, and a one-way OBJ dump means repeating every topology decision each time a bolt moves."
    - "Topology: holding sharp edges and corners through conversion is the floor, not the ceiling, and by the beta reports that part is steady."
  misses:
    - "Topology: loops around circular features are the headline claim and also the reported gap, which is awkward, because a hole is the entire reason anyone retopologises a CAD part by hand."
    - "Licensing: after the trial you can still generate meshes but not export them, so the evaluation stops working at the point where you would take the output into a scene and bake it."
draft: true
---

A STEP file contains no polygons. Not a reduced count, not a bad count — none.
People coming to a pipeline from outside find that genuinely hard to credit,
because the thing renders perfectly on the engineer's screen, in colour, with
fillets you can measure. What is in the file is a set of mathematical surfaces
and the trimmed boundaries where they meet each other. The engineer's software
draws that surface description straight to the screen at whatever precision the
viewport asks for. There is nothing to export.

So the import button tessellates. It walks those surfaces and drops triangles
against a tolerance, usually a chord deviation you can set, and it hands you
something dense and irregular with no relationship at all to how the part is
shaped. Curvature does not guide it. A cylinder becomes a band of slivers. Two
flat faces that meet at a crisp edge arrive as a crisp edge, fine, but the
hundred triangles either side of it run in no direction in particular.

That mesh is useless for the things we do after modelling. You cannot bevel it
predictably, you cannot subdivide it, UV seams have nowhere sensible to go, and
building LODs from it means decimating noise into quieter noise.

**CADQuader** is Pilgway's attempt at the gap, in beta since this week. Pilgway
makes 3DCoat, which means the people writing it have spent fifteen years on the
retopology problem from the sculpting side and are now coming at it from the
engineering side. It takes STEP and IGES in, offers several generation methods,
detects and preserves sharp corners and edges, and — the claim that matters —
builds edge loops around circular features. There is a bridge that sends meshes
to Blender and back, a native `.quader` project format, and OBJ export.

## Why the holes are the whole thing

Take a bracket with twelve bolt holes. In the CAD file each hole is a trimmed
cylindrical surface punched through a planar face, described by a radius and an
axis. Exact. Unambiguous. Then you tessellate it, and the mesher has to decide
how to fill a flat face that has twelve circular voids in it, which is a problem
with no natural quad answer. What you get is a fan of triangles radiating out
from each rim, or a Delaunay scatter that happens to respect the boundary.

Either way the rim has no loop around it. That one absence is what breaks
everything downstream. A loop concentric to the hole is what lets you bevel the
rim without the bevel eating into the face. It is what holds the circle round
when the mesh subdivides, instead of the hole going visibly polygonal at the
first level. It is what gives the normal bake a clean cage to project against,
and it is what you grab when the hole needs to move three millimetres because
someone changed the fastener.

Every hard-surface artist handed a STEP file has done this by hand. You import
the triangle soup, you keep it as a snapping target, and you rebuild the part
over the top with quads where you want them. On a simple bracket that is an
afternoon. On an assembly with forty parts it is a week, and the week buys
nothing an engineer would recognise as progress, because the shape was already
correct when it arrived.

Quad meshing from CAD is not a new research area, incidentally. Simulation
people have been at it for decades, because finite element solvers want
quadrilateral elements too. Their objective is different: element quality,
aspect ratios, convergence. Nobody meshing a part for stress analysis cares
whether an artist can select a loop and slide it, and a mesh that scores well
on those metrics can still be miserable to edit. A tool pointed at artists is
solving a different problem with the same words.

## The beta is telling on itself, which is good

One tester on 3DCoat's own forum put it about as plainly as you could want:
sharp edges are preserved well, quad flow needs work, and on their test model
the contours around round holes came out missing. That is the headline feature
and the reported failure arriving in the same sentence. A forum post also refers
to a 2026.16 build going out with fixes from beta feedback, though I have not
been able to confirm the version from Pilgway directly — the vendor's own site
would not load from here.

I am taking the tester's report as more useful than the feature list, and not
because I assume the tool is bad. Beta feedback that names the hard case is
worth more than a bullet point claiming the hard case is handled, and a
developer shipping a free beta specifically so people throw awkward parts at it
has made the correct call about how this gets evaluated.

The access terms fit that reading. Registration gets you thirty days of full
access, after which you can still open models and generate meshes but need a
licence to save or export. Being able to generate but not export is an odd place
to draw the line and I can see the logic — you can keep looking at what it
produces indefinitely, so the shop window stays open. It also means the moment
you have a genuinely representative part to test, which is usually a month into
caring about a tool, you can see the answer and not use it.

## What I would test first

Not a bracket. Everyone's demo is a bracket. Take something with a fillet that
runs into a hole, because tangent continuity between a blend surface and a
cylindrical cut is where CAD geometry gets genuinely ambiguous about what the
edge even is, and a mesher has to commit to a reading. Then look at whether the
loop it builds around the hole survives the fillet.

This is the third tool I have written about this year promising usable quads
from something that was never quads. [An addon that reads a mesh and picks the
retopology algorithm for you](/blog/quadify-ultra-ml-retopology-blender-5/) came
at it from the sculpting side, where the input is organic and dense and the
judgement being automated is which approach suits the form. Generative 3D is
making the same offer from the other end, with
[Tripo shipping native quad meshes under a face cap](/blog/tripo-p2-native-quad-meshes-face-cap/)
rather than a remesh of a triangle output.

CAD is the interesting case among them, because the input is not noisy or
guessed. The geometry is exact and the design intent is written into the file —
this is a hole, this is a fillet, these two faces are tangent. A converter has
more to work with here than in either of the other two situations. Which raises
the bar rather than lowering it. If the source data tells you precisely where
the circles are, missing the loops around them is a harder thing to forgive.
