---
title: "Substance Painter 12.2: paint the baking cage"
date: 2026-10-22
category: 3D
excerpt: Substance 3D Painter 12.2 lets you brush the baking cage distance onto the low poly, per pixel. No custom-cage FBX, no round trip through Maya.
cover: /img/blog/substance-painter-12-2-cage-painting/shot-01.jpg
sources:
  - outlet: 80.lv
    url: https://80.lv/articles/substance-3d-painter-12-2-lets-artists-paint-baking-cages-directly-on-models/
  - outlet: Adobe Experience League
    url: https://experienceleague.adobe.com/en/docs/substance-3d-painter/using/release-notes/version-12-1
artistView:
  take: "Adobe has turned the bake cage from a mesh into a map, and that single change moves a whole class of bake repair from whoever owns the low-poly file to whoever is standing in front of the smeared normal map. Painted per pixel, the offset lives in the texture set rather than in a second FBX with a strict naming convention, which is the part that kept custom cages out of small teams."
  works:
    - "Pipeline: a painted offset removes the step where fixing a skewed bake means reopening the modelling scene, duplicating the low poly and exporting a matched _cage file — the step people skip, which is why so many props ship with a warped chamfer."
    - "Ergonomics: you fix the error in the viewport where you can see it, at the scale it occurs. A global cage distance is one number trying to serve a bolt head and a shoulder pad at the same time, and it never has."
    - "Selection: Visible Polygons Only on a rectangular marquee is a fix nobody asks for in a feature pitch and everybody has sworn at — a 2D drag through a 3D viewport grabbing the far side of the mesh."
  misses:
    - "Portability: a cage painted in Painter is a Painter asset. Studios whose bake authority is Marmoset Toolbag, xNormal or an in-house baker get none of this, and the mesh-cage round trip stays exactly where it was."
    - "Fragility: a mesh cage is tied to topology, a painted cage is tied to the UV layout. Re-unwrap the asset and the offsets no longer sit where you put them — different exposure, not less of it."
    - "Verification: the Texture Set Highlighter appears in one write-up and not yet in release notes anybody outside Adobe has read end to end, so treat the smaller items as described rather than confirmed."
---

So far 80.lv is the only outlet with this release, so the 12.2 feature list below
is their reading of Adobe's notes rather than two publications agreeing.

A bake cage is the least glamorous object in a prop pipeline and it decides
whether your normal map is usable.

The mechanism matters here, because the feature only makes sense against it. When you
bake high-poly detail down to a low-poly mesh, the baker fires a ray from each
point on the low-poly surface and records what the high poly looks like where it
hits. Direction is the whole game. By default the ray follows the interpolated
vertex normal, and on anything with a hard edge and averaged normals those
normals fan outward, so the rays splay. The result is the smear everyone
recognises without naming: detail that bends away from a chamfer, a cylinder cap
that reads as a dent, the inside corner of a bracket where the high-poly bolt
appears to have melted.

A cage fixes it by replacing the ray directions. You inflate a copy of the low
poly, the rays fire inward from that shell, and the fan goes away.

## The part that was tedious

<figure>
  <img src="/img/blog/substance-painter-12-2-cage-painting/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Adobe, via the official Substance 3D Painter Steam page</figcaption>
</figure>

Two options, until this week. Set a single global cage distance and live with
it, or author a cage mesh somewhere else and import it.

The global number is a compromise by construction. Too small and the shell sits
inside the high-poly silhouette, so the bake misses detail it should have caught.
Too large and rays from one region start catching a neighbour — the cage over an
ear swallows the skull behind it, the shell over a bolt catches the plate it
sits on. One number, serving a 4mm chamfer and a 30cm pauldron.

The custom cage was the real answer and almost nobody did it. It means going back
to Maya, Blender or Max, duplicating the low poly, pushing vertices out by hand
where the bake is wrong, exporting it as a separate file whose object names match
the original exactly, and importing that alongside the mesh. Get a name wrong and
the baker silently ignores it. Change the low-poly topology afterwards and the
cage is scrap. In a two-person team that round trip costs a morning, which is why
the usual fix is to nudge the global distance, squint, and ship.

## What 12.2 changed

You paint the cage distance onto the model. Per pixel with a brush, or across a
whole sub-object with Polygon Fill.

That is a map where a mesh used to be, and the consequences run further than the
convenience. The offset now lives inside the texture set, saved with the project
and edited in the same viewport that shows you the bad bake. You see the smear,
you brush the region that produces it, you rebake — and 12.1, which landed on
22 June 2026 with a reworked baking workflow and OpenPBR support, added
auto-rebaking, so on a single map the rebake can follow the brush without being
asked.

It also moves who is allowed to fix it. A skewed bake used to travel back up the
chain to whoever owned the low-poly source file, which on a studio asset means a
ticket and a wait. Now it is repairable by the person looking at the problem.
That is a small political change dressed as a tool feature, and on a prop team it
is the difference between a fix and a known issue.

Worth noting where this came from: 12.1 already let you paint skew corrections
directly on the low poly when the cage was in distance-based mode, and Adobe's
own community forum carries a July 2026 request asking specifically for local
cage offset painting, on the grounds that you could only set the distance
globally or import a mesh. Three months later it shipped. I will not pretend to
know whether those two facts are connected, but the shape of the arc is clear
enough — 12.1 made correction paintable, 12.2 made the cage itself paintable.

## The limit the pitch will not mention

A painted cage only works where Painter does the baking.

If your studio bakes in Marmoset Toolbag, in xNormal, in Blender, or in whatever
script the pipeline team wrote in 2019 and nobody has touched since, none of this
reaches you. The offset map is a Painter asset, not an interchange format, and
there is no version of it that rides along in an FBX. Plenty of production bakes
happen outside Painter precisely because Toolbag's bake previews are better, so
this is not an edge case.

And the fragility moves rather than disappearing. A mesh cage breaks when
topology changes. A painted cage breaks when UVs change, because it is stored
against the layout. Which of those you re-do more often says whether this is a
good trade for your asset. It cuts in an awkward direction right now, too, with
the unwrap-and-pack half of UV work [finally runnable with no window
open](/blog/rizomuv-2027-headless-mode-python/) — automate the repack and you
have automated away the thing your cage offsets were painted against.

## Polygon Fill grew up

Three new selection modes: Rectangular Marquee, Polygon Loop, and Partial Polygon
Loop. Plus a Visible Polygons Only option.

Polygon Fill is how you assign a material to part of a mesh without building a
mask, and on hard-surface work it is used constantly — this face set is painted
steel, that one is rubber. Selecting a loop around a cylinder by clicking faces
one at a time is the kind of work that makes you consider a different career.
Partial Polygon Loop is the thoughtful one: a full loop frequently grabs more
geometry than you wanted, and the honest answer is usually most of a loop rather
than all of it.

Visible Polygons Only is the fix with the most groaning behind it. Drag a
rectangle in a 3D viewport and, with no depth test, it selects through the mesh
and takes the far side with it. Everyone who has done this knows the recovery:
undo, orbit, try again from an angle where nothing is behind anything.

These modes now do double duty, since Polygon Fill is one of the two ways to set
cage distance. Marquee the panel that skews, fill it with an offset, rebake.

## The viewport, and glass

Order Independent Transparency is in, for overlapping low-opacity materials —
glass, ice, anything stacked.

This is not new technology; engines have shipped OIT variants for years. It
matters here because of what Painter's viewport is for. Standard alpha blending
is order-dependent, so two panes of glass in front of each other composite
according to draw order rather than depth, and the result shifts as you orbit.
When you are tuning an opacity value against that, you are tuning against a
preview that is wrong in a way the engine will not reproduce. Authoring viewports
earn their keep by agreeing with the renderer downstream.

A Texture Set Highlighter is also reported, lighting up the geometry belonging to
a set when you hover it in the list. On a vehicle carrying twenty-odd texture
sets named by whoever did the export, that is a genuine time save, though this
one shows up in a single summary and deserves confirming against the notes.

The through-line across 12.1 and 12.2 is that Adobe has spent two releases on
baking, which is the least demo-able part of the application and the part that
wastes the most time. [ArmorPaint took eight years to reach
1.0](/blog/armorpaint-1-0-eight-years-six-build-targets/) partly because it built
its baker on the GPU with the viewport live, betting that bake iteration speed
was the thing worth paying for. Painting the cage is the same bet from the other
end of the market.
