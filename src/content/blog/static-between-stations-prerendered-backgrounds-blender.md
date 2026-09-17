---
title: "PS1 pre-rendered backgrounds, rebuilt in Blender"
date: 2026-09-17
category: 3D
excerpt: Static Between Stations renders its rooms in Blender and plays them as video — path-traced, scan-heavy, nothing the engine has to optimise.
cover: /img/blog/static-between-stations-prerendered-backgrounds-blender/shot-01.jpg
draft: true
---

The developer of Static Between Stations put in-engine footage out this week,
and the environments in it are video files. Blender renders each room with
path-traced lighting, Unity plays the result back, and the only live geometry
in the scene is the character walking about on top of the plate plus whatever
foreground pieces have to sit in front of them. High-poly scans of real
buildings go into the render and never reach the runtime at all.

Which is how Final Fantasy VII worked in 1997. Resident Evil the year before
that. Most of what people picture when they say "the PlayStation look" is this
one trick.

The trick has come back for the opposite reason it was invented.

## What the old version actually was

Square built FF7's backgrounds on SGI Onyx hardware and squashed the output
down to 320x224 — a bitmap roughly the size of a modern app icon, holding a
room that had been lit and rendered at whatever quality a room full of
workstations could manage overnight.

Then came the hard bit. The PS1's GPU had no depth buffer. Nothing in the
hardware compared one pixel's distance against another's; everything was sorted
into an ordering table and drawn back to front, painter's-algorithm style. So
when Cloud walks behind a pillar, the pillar is not in front of him in any
geometric sense the machine understands. By the accounts of how the format
worked, the background was cut into tiles, each tile carried a draw order, and
the game shuffled those orders as the character moved through the screen.

Somebody authored that. Per screen. Hundreds of screens.

## What it cost

The camera is nailed down. That is the deal you sign. Every angle in the game
is a separate rendered asset, so a scene you can walk around from four
positions is four renders, four sets of tiles, four sets of collision, four
camera matrices that have to agree with each other.

Move a lamp and the room is re-rendered. Change a doorway and the tiles are
re-cut. There is no such thing as a small lighting note.

And it ate discs. FF7 shipped on three CDs in large part because of this —
thousands of pre-rendered stills and full-motion sequences, none of them
compressible in the way geometry is. Thirty years on, the trilogy's finale has
its own version of that arithmetic: [a single Blu-ray you cannot play until the
download finishes](/blog/ff7-revelation-one-disc-mandatory-download). The
storage problem moved. It did not go away.

## Why a small team reaches for it in 2026

In 1997 you pre-rendered because the console could not draw the scene. A PS1
managed a few thousand flat, untextured polygons a frame under good conditions,
with no perspective-correct texturing and no floating point in the geometry
path. A cathedral was not happening in real time.

The resource a small team runs short of today is people.

Getting a photogrammetry scan into a shipping game is days of work that has
nothing to do with how it looks: retopologise, unwrap, bake normals, build the
LOD chain, author lightmap UVs, check the shader variants compile, bake
lighting per platform, then chase the one draw call that spikes on the low-end
target. Pre-rendering deletes that entire column. The scan stays at whatever
density the photographs gave it, because the mesh is only ever seen by
Blender's renderer, and Blender does not care.

Path tracing works the same way. A render that takes four minutes a frame on a
machine nobody is waiting at is free in a sense it will never be at 60fps.

So the technique that used to be a workaround for a weak GPU is now a
workaround for a headcount. Same output, different missing resource.

## One thing got genuinely easier

Occlusion. The whole tile-ordering business that people hand-authored screen by
screen is a second render layer now — output a depth pass beside the colour
pass, feed it in, and let the hardware do the comparison it could not do in
1997. The part of this pipeline that used to be tedious and error-prone is the
part you get for nothing.

Everything else is about where it was. Iteration is still slow. The camera is
still frozen. Anything that needs to react to the player — a sign that
flickers when you pass it, a door that opens — has to be real-time geometry
composited onto the plate, which means matching the render's camera and its
lighting by hand, and that match is where this look usually falls apart.

Then there is compression, which is a new problem rather than an old one. A
320x224 bitmap dithered into 15-bit colour has a grain to it; the crunch is
part of why those backgrounds still read as deliberate. A clean path-traced
render at modern resolution, pushed through a video codec, has smooth dark
gradients in it — and smooth dark gradients are exactly what codecs band. A
game built around static, set in a dying city, is going to be full of them.
Bitrate is an art decision here, not an export setting.

## The look was a symptom

None of the artists doing this in 1996 wanted fixed cameras. They wanted
Toy Story and had a console that could draw fog. The aesthetic everyone now
chases — the stillness, the crushed colour, the compositional discipline that
comes from a camera nobody can move — is the residue of a compromise.

Which is a fine thing to pick up on purpose. The blog wrote about
[a game that runs its characters at 12 and 24fps on purpose](/blog/orbitals-review)
a fortnight ago, and it works, because the team chose the limit rather than
inheriting it. Static Between Stations looks like the same move: the constraint
is being picked up deliberately by somebody who could render the scene in real
time if they wanted to, and who has decided the four minutes a frame buys more
than it costs.

The thing to watch, when it ships, is the seams. Character lighting against
plate lighting, and what the codec did to the shadows.
