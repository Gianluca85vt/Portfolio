---
title: "GTA 2 path tracing needed a new D3D9 renderer"
date: 2026-09-27
category: 3D
excerpt: A modder path-traced GTA 2 by writing a Direct3D 9 renderer that rebuilds the game's tile world into geometry RTX Remix can actually light.
cover: /img/blog/gta-2-rtx-remix-d3d9-renderer/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/pc-gaming/27-year-old-gta-2-gets-full-path-tracing-and-60-fps-frame-generation-via-rtx-remix-custom-direct3d-9-wrapper-modernizes-classic-with-custom-direct3d-9-bridge-unlocks-dynamic-lighting
  - outlet: TechPowerUp
    url: https://www.techpowerup.com/353119/modder-brings-path-tracing-and-frame-generation-to-grand-theft-auto-2-via-rtx-remix
  - outlet: gta2-rtx-remix (project repository)
    url: https://github.com/gebdag/gta2-rtx-remix
artistView:
  take: "This is not a texture swap with a ray tracer bolted on. The wrapper builds the geometry it hands to Remix, which means every light, every emissive and every surface response in the path-traced GTA 2 is a decision somebody made in a compatibility layer, not a property recovered from a 1999 disc."
  works:
    - "Lighting: translating the game's own light list was the easy half. Generating lights from events — explosions, fires, gunfire — is what makes a top-down city read as lit rather than tinted, and it is the part the original data could never supply."
    - "Art direction: extending emissives to every pickup so they stay legible in a dark scene is a readability fix dressed as a graphics feature. In a game where you find things by scanning the street from above, that matters more than reflections do."
  misses:
    - "Materials: GTA 2's style data carries colour and nothing else — no normals, no roughness. Every surface response the path tracer computes is a value the wrapper assumed, so the lighting can only be as convincing as somebody's guess about what asphalt from 1999 was meant to be."
    - "Camera: a fixed top-down view throws away most of what path tracing is good at. Bounce light off a wall you cannot see does not reach the frame, and the rooftops take the sun while the streets stay in shadow."
---

Nvidia's RTX Remix works by standing between a game and the graphics driver,
catching fixed-function Direct3D 8 and 9 draw calls and re-lighting the scene
it reconstructs from them. That is the whole premise, and it is why the Remix
catalogue is full of early-2000s shooters. GTA 2 is from 1999. It talks to
DirectDraw and an early build of Direct3D, neither of which Remix listens to.

So a developer going by gebdag wrote the missing renderer. GTA2 RTX Remix went
up as v0.7.1 on 25 September 2026 and coverage followed over the next two days:
path-traced lighting, a dynamic time of day, 16:9 support, and frame generation
aimed at 60fps in a game that shipped when a Voodoo3 was a reasonable purchase.

## Two DLLs and a rebuilt world

The project ships `gta2dx9.dll`, described in its own repository as a
Direct3D 9 renderer for GTA2, and `gta2dx9_vid.dll`, a shim for the video
device. The trade coverage has called this a wrapper, which undersells what is
in the source tree. Alongside the D3D9 renderer sit modules for map, style,
mesh and camera — GTA 2's own level data and its own tile-and-sprite graphics
format, parsed and turned into meshes.

Read that again in pipeline terms. Remix is not intercepting GTA 2's geometry.
There is no GTA 2 geometry to intercept in any form Remix understands. The
renderer reads the game's data files, builds the city itself, and presents that
as a modern draw call. What the path tracer lights is new work that happens to
be positioned exactly where Anywhere City used to be.

That distinction decides everything about how the mod looks. A normal Remix
project is an asset job: capture a scene, replace the textures with PBR
versions, place lights, ship. Here the lights, the emissives and the surface
properties have nowhere to come from, because the source files never had them.
It is the same problem the team [rebuilding PS1 pre-rendered backgrounds in
Blender](/blog/static-between-stations-prerendered-backgrounds-blender) ran
into from the other side: recovering three dimensions from data that was only
ever asked to produce a picture.

## Where the light comes from

The repository is direct about it. The renderer does translation of the game's
lights, plus generation of lights from game events such as explosions, fires
and gunfire, and it ships emissive maps for some of the game's textures as a
Remix mod. Version 0.7.0's notes add flicker to car fires and extend emissives
to all pickups so they stay visible in dark scenes.

Every one of those is an authoring choice. A car fire in 1999 was an animated
sprite with no light attached; somebody decided it now throws a flickering
point light, chose its colour, and chose how fast it flickers. Pickups glowing
in the dark is not a restoration. It is a lighting artist solving a
legibility problem that the mod itself created by making night actually dark.

Widescreen turned out to be a rendering problem too. The original ran 4:3 and
culled at the edge of that window, so opening the view to 16:9 exposed
characters popping into existence a few pixels from the frame edge. The
project notes 16:9 support without that pop-in, which means the draw window
had to be widened, not just the camera.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=uUH8R3ntdus" target="_blank" rel="noreferrer">
    <img src="/img/blog/gta-2-rtx-remix-d3d9-renderer/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Grand Theft Auto 2 RTX Remix showcase video" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>The Grand Theft Auto 2 RTX Remix showcase, posted alongside the release. It opens on YouTube, since GTA 2 is an 18-rated game and age-restricted clips refuse to play inside an embed.</figcaption>
</figure>

## The cheapest path-traced city you will ever see

There is a nice irony in the timing. The expensive problem in path tracing
right now is geometry — how to keep an acceleration structure for tens of
gigabytes of mesh inside a consumer card's memory, which is the whole subject
of [RTX Mega Geometry 2.0 streaming 31GB of mesh through 1.5GB of
VRAM](/blog/rtx-mega-geometry-2-vram-streaming). GTA 2's Anywhere City is a
grid of textured blocks. The BVH for it would fit in a rounding error.

Which is why frame generation is doing the heavy lifting on the performance
claim rather than the ray budget. The requirements list is short: the free v9.6
release of GTA 2 that Rockstar has distributed since 2004, the RTX Remix
runtime, and 64-bit Windows 10 or 11. No minimum GPU is documented, which for a
path tracer is a conspicuous silence — Remix's own floor has always been an
RTX card, and the 60fps figure quoted in coverage comes with no hardware
attached to it. Treat it as unverified until somebody benchmarks it.

## What this actually demonstrates

Remix was sold as a way to bring old games forward without their source code.
The GTA 2 project shows the limit of that pitch and the way around it in the
same repository: when a game is too old for the interception layer, you write
the renderer the interception layer wants to see, and you accept that you are
now the author of the scene rather than its restorer.

It is a lot of work for a 27-year-old top-down game, and the people doing it
know more about GTA 2's file formats than anyone at Rockstar has needed to in
two decades. That knowledge is the real output. The lighting is what makes it
shareable.
