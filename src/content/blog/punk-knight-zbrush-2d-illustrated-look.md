---
title: A ZBrush sculpt that reads as a flat drawing
date: 2026-08-19
category: 3D
excerpt: David Papunashvili's Punk Knight reads as flat concept art until you rotate it. The 2D concept is projected onto the sculpt and PolyPainted over.
cover: /img/blog/punk-knight-zbrush-2d-illustrated-look/cover.svg
---

Every few months a stylized sculpt does the rounds that makes people stop scrolling
because it does not look like 3D. **David Papunashvili**'s **Punk Knight**, covered by
80.lv this week, is the current one — a character that reads as a flat, inked
illustration right up until you realise it is a fully modelled, fully paintable ZBrush
sculpt, made without leaving the app.

<figure>
  <img src="/img/blog/punk-knight-zbrush-2d-illustrated-look/cover.svg" loading="lazy" width="1200" height="900" alt="" />
</figure>

## What he actually did

The two details worth pulling out of the coverage: the 2D concept was **projected
directly onto the sculpt**, used as reference for both form and colour matching, and the
final surface colour was painted with **PolyPaint** rather than baked out to a texture
map in another program.

Neither technique is new on its own. Projecting a concept onto a base mesh to lock
proportions and silhouette has been standard practice since ZBrush got a camera-matched
projection workflow, and PolyPaint — colour stored per vertex on the sculpt itself,
no UVs required — has been in the toolset for over a decade. What is worth noticing is
using both together as the *entire* pipeline, with no detour through Substance or Photoshop,
to hold onto an illustrator's flatness all the way to the final render.

## Why the flat look is the hard part, not the easy part

This is the bit that is easy to miss if you have not tried it: making a 3D object look
like a 2D drawing is harder than making it look photoreal, because a real-time or offline
renderer's entire job is to calculate light behaving correctly, and an illustrated look
depends on light behaving *incorrectly* on purpose — flat colour fields, hard graphic
shadow shapes that do not follow the actual key light, linework that thickens and thins
for readability rather than physical accuracy.

You cannot get that from a PBR material and an HDRI. You have to paint the lie directly
onto the geometry, which is exactly what projecting the concept and PolyPainting over it
does: it lets the artist keep the illustrator's colour decisions — the ones a lighting
rig would otherwise flatten or override — literally stuck to the surface. Rotate the
model and the shading does not relight, because it was never meant to be light in the
first place. It is paint wearing the shape of a 3D object.

## Where this keeps showing up

This is the same instinct behind the *Arcane* and *Spider-Verse* look bleeding into games
over the last few years — hand-placed shadow shapes and inked outlines living on top of,
or instead of, physically based shading. The difference between a Netflix or Sony
production doing it and a solo artist doing it in a weekend is entirely tooling. A studio
has a custom shader graph and a team to maintain it. Papunashvili has ZBrush's stock
projection tools and PolyPaint, and gets most of the way there without a single custom
node.

That is the actual news here, more than the render itself: this look is no longer
gated behind a bespoke pipeline. If you already know how to project a concept and
PolyPaint a sculpt — workflow most character artists have touched — the "illustrated in
3D" style is a choice you can make on a personal project, not a budget line only a studio
can afford.

## Worth trying yourself

If you want to test this on your own sculpt, the failure point is almost always the
same: projecting the concept too literally and ending up with a decal rather than a
painting. The concept is reference for colour relationships and shadow shapes, not a
texture to trace. The moment PolyPaint starts fighting the sculpt's own form — a shadow
shape that reads flat from the concept's angle but wraps wrong from every other angle —
is the moment to stop projecting and start repainting by eye.

It is a small project, one character, made by one person over what sounds like a
short stretch of time. Worth a longer look regardless, because the technique scales down
to something you can try this weekend with tools most of us already have open.

---

*Based on 80.lv's coverage of the project — I have not seen a full turntable or a
breakdown of the projection setup itself, so treat the workflow description above as the
published summary rather than a verified step-by-step.*
