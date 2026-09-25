---
title: "Silent Hill: Townfall stutters at 60fps on a 5090"
date: 2026-09-25
category: 3D
excerpt: DSOGaming cleared 60fps at native 4K with ray tracing on a 5090 and still hit severe hitching. Shader compiles and streaming are two separate faults.
cover: /img/blog/silent-hill-townfall-pc-stutter-shader-cache/cover.svg
draft: true
---

A GeForce RTX 5090, a Ryzen 9 7950X3D and 32GB of DDR5 at 6000 will run SILENT
HILL: Townfall at native 4K, everything maxed, ray tracing on, north of sixty
frames a second. That is DSOGaming's test bench and DSOGaming's number, posted
after the game went out on 24 September. The same write-up describes severe
shader-compilation stutter, erratic frame times and heavy CPU load.

Both things are true at once. Frames per second and frame *times* are different
measurements, and a game can pass the first while failing the second badly
enough that nobody wants to play it.

## Two faults, one symptom

Everyone calls it stutter. On a frame time graph they look identical — a spike
where a flat line should be. Underneath they are unrelated problems with
unrelated fixes, and Townfall appears to have both.

The first is pipeline state compilation. Before a GPU can draw anything, the
driver needs a compiled pipeline for that exact combination of shader, vertex
layout, blend mode, render target format and lighting path. Change any one of
those and it is a different pipeline. If the engine reaches a draw call and the
pipeline for it does not exist yet, something has to build it right then, on the
CPU, while the frame waits. That is where the multi-hundred-millisecond pauses
come from when you walk into a room with a light type you have not seen before.

The second is streaming. Cross into a new cell and the engine is creating
meshes, uploading textures, spinning up audio and running whatever construction
scripts the level designer left in. Players are calling this traversal stutter
and the reports cluster on zone transitions and on vegetation coming into view.

They overlap in the worst possible way. Streaming in a new area is exactly the
moment a pile of never-seen material permutations arrives, so the streaming
hitch and the compile hitch land on the same frame and get blamed on whichever
one you already believed in.

## Precaching only catches what it can see coming

Unreal has had an automatic PSO precaching system for several versions now, and
it works. It walks the materials a scene is about to need, hands the driver the
pipeline descriptions ahead of time, and the compile happens on a worker thread
instead of in front of the player.

The catch is in "about to need". Precaching sees the material instances that
exist in the level, on the components, in the loaded assets. It does not see a
dynamic material instance gameplay conjures the moment a mechanic fires. It does
not see a permutation that only exists once a particular vertex factory meets a
particular light and a particular shadow pass, if nothing in testing ever put
those three together. Anything behind a switch nobody flipped during the
gathering pass shows up at runtime as a surprise, and a surprise is a stall.

Foliage is the hardest case there is for this. Take one grass type: it needs a
pipeline for the base pass, another for shadow depth, another for the velocity
pass, more again once world position offset is doing wind on it, and Lumen —
which TechPowerUp confirms is doing the lighting here — adds its own. Multiply
by however many plant species the environment team placed. Then note that all of
it arrives in bulk, at once, the instant you walk over a streaming boundary into
a wooded stretch. Which is precisely where players say the hitching is worst.

Foliage has a habit of being the thing that breaks the budget. FromSoftware
[thinned out Limgrave's grass to hold 30fps on Switch 2](/blog/elden-ring-switch-2-limgrave-grass-30fps/),
and that was a considered decision made by people who knew exactly what the
plants cost. The Townfall case is the same bill arriving without anyone having
opened the envelope.

## The sixty seconds in the menu

The community remedy doing the rounds is to launch the game, leave it sitting on
the main menu for a minute, and only then press start. People report it helps.

That is diagnostic. It means the compilation is happening — there is a
background pass chewing through pipelines while you look at the title screen.
What there isn't is a gate. Nothing stops you from starting the game before the
cache is warm, so the compile work that should have finished during a loading
bar instead finishes during act one, in pieces, on your frame budget.

I have seen that trade made in enough projects to know it is not an oversight.
A blocking "preparing shaders" screen on first boot is honest and it is also
four to eight minutes of a black progress bar, which is the first thing a
launch-day reviewer photographs and the last impression you want on a horror
game that opens on atmosphere. Somebody weighed a visible wait against invisible
hitching and picked the hitching. Plenty of shipped Unreal titles have made the
same call.

There is no frame generation in the build, for any vendor, which TechPowerUp
notes alongside the missing XeSS support. Worth saying that frame gen would not
have saved this anyway. Interpolation needs two frames to work between, and a
300ms compile stall is a frame that never arrived.

## What this does to the review

Eleven verdicts [averaged 8.0 across a four-point spread](/blog/silent-hill-townfall-review/)
when the embargo lifted on the 21st, with the atmosphere getting near-universal
praise and the stealth taking most of the damage. None of that was wrong. Those
were review builds, on review hardware, played by people who had already sat
through whatever first-boot compile there was before they started taking notes.

A score describes a game. Frame pacing describes a build, and builds get
patched — this class of fault more often than most, because the fix is usually
a wider precache gather rather than a rewrite. What it costs in the meantime is
the one thing Townfall was reviewed well for. Fog, silence, a village you are
frightened of walking into, and a 300ms freeze every time the village gives you
a new tree.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=WARs8turgnM" target="_blank" rel="noreferrer">
    <img src="/img/blog/silent-hill-townfall-pc-stutter-shader-cache/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from KONAMI's SILENT HILL: Townfall launch trailer" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>KONAMI's own launch trailer, the PEGI cut. It opens on YouTube rather than playing here because the game is rated 18 and the video is age-restricted. It is a trailer, not a performance capture — nothing in it tells you anything about frame times.</figcaption>
</figure>
