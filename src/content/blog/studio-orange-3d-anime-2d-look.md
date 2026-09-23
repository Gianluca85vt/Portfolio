---
title: "Studio Orange: 3D models bent to look hand-drawn"
date: 2026-09-23
category: 3D
excerpt: Dropped frames, warped models, faces redrawn by hand. Every trick that makes Orange's CG read as anime costs the asset reuse 3D is supposed to buy you.
cover: /img/blog/studio-orange-3d-anime-2d-look/video-thumb.jpg
draft: true
---

Watch a close-up in BEASTARS and wait for the head turn. A normal CG character
rotates and the face stays rigid — same nose, same skull, seen from a new
angle, because that is exactly what a model is for. Orange's characters do
something else. The features slide slightly. The nose holds a shape it should
have lost ten degrees ago. It reads as a drawing, and a drawing is allowed to
lie about anatomy in a way a mesh is not.

A behind-the-scenes breakdown has been going round this week — Class Creatives
working with Hobbes Sakuga — walking through how the studio gets there. Almost
everything that gives Orange its look has already happened by the time
anything reaches the shader.

<figure>
  <button class="video-embed" data-video="W117QR-9OHc" data-title="How Studio Orange &quot;Cheats&quot; 3D to Look Like 2D Anime (Behind the Scenes)" type="button">
    <img src="/img/blog/studio-orange-3d-anime-2d-look/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Class Creatives breakdown of Studio Orange's pipeline" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The Class Creatives and Hobbes Sakuga breakdown of Orange's production pipeline, which prompted this piece.</figcaption>
</figure>

## Throwing frames away on purpose

The first thing Orange does is refuse the frame rate. CG on television is
usually rendered at a steady 24 — every frame new, motion continuous, because
smoothness is what the hardware gives you for free and nobody thinks to
decline it. Hand-drawn anime almost never works that way. A key animator holds
a pose for three frames, snaps to the next one, holds again. The stutter is
half the language.

Eiji Inomoto, who founded Orange in 2004 after CG work on *Ghost in the Shell:
Stand Alone Complex*, has talked about dropping frames on his early television
jobs — the Zoids CG, back when the received wisdom was that CG should look as
fluid as the renderer could manage, and dropping frames looked like a fault
rather than a choice. He kept doing it anyway.

What makes it hard is that it is not a global setting. The stepping changes
inside a single shot. A body might run on twos while the cape runs on ones,
because cloth reads as cloth only when it moves continuously, and the
character reads as drawn only when it does not. So somebody decides, per
element, per shot, how much of the simulation survives. That decision does not
live in a file you can copy to the next episode.

## The model is wrong on purpose

The shading is the part everyone photographs, and it is genuinely clever —
normals pushed around so a curved surface takes flat light and a face holds one
clean shadow shape instead of the soft gradient geometry wants to give it. But
edited normals are a solved problem. Plenty of studios do it. Nobody else gets
Orange's result from it.

The rest of it is worse, in the sense that pipeline people mean when they say a
thing is worse. Orange employs 2D animators inside a 3D production. They draw
guide animation for the CG animators to match, and they correct faces after the
first pass. They draw the expression as it should have been, and that drawing
gets worked back into the geometry for that shot, at that camera angle. The model that shipped in episode four is not quite the model that
shipped in episode two.

That is the trade. Everything Orange does to make a frame read as hand-drawn is
local to the frame. A bent silhouette works from one camera. A hand-corrected
mouth shape works for one line of dialogue. The whole promise of a CG pipeline
is that you build the asset once and amortise it across a season, and Orange
keeps spending that saving back, shot by shot, to buy something a drawing gets
for nothing.

Which is roughly the problem [Imageworks solved for Spider-Verse by building
ink lines that follow a moving face](/blog/spider-verse-inklines-grease-pencil-geometry-nodes/),
and the reason that solution took a feature-film R&D budget. A drawn mark on a
3D surface wants to slide. You either build machinery that stops it sliding, or
you pay a human to redraw it every time it does. Orange, for a long stretch,
chose the human.

## Why nobody has copied it at scale

The methods are public. Orange staff have described them at length for years,
and the technique has stayed rare anyway, because it resists the thing studios
buy CG for. You cannot staff it up quickly, because the judgement — which frames to drop,
which silhouettes to break — sits in the heads of people who have done it for a
decade. You cannot outsource a shot easily when the shot's assets are unique to
it. And you cannot promise a producer that episode nine will be cheaper than
episode one.

It also explains the studio's output. Orange makes a small number of shows and
they look like nothing else, which is what happens when a pipeline is optimised
for a look rather than a throughput number.

Worth remembering what the target actually is. Cel animation has a specific
material character — ink edge on the front of the acetate, paint behind it,
each layer catching light slightly differently — and when you scan it at 4K
[you can see where that physical stack starts to hit its own
ceiling](/blog/ninja-scroll-4k-restoration-cel-scan/). Orange is chasing the
memory of that stack rather than the stack itself, which is looser, more
forgiving, and — judging by how long the studio has been closing in on it —
still extremely difficult to hit with a renderer.
