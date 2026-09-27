---
title: "RTX Mega Geometry 2.0: 31GB of mesh, 1.5GB VRAM"
date: 2026-09-27
category: Tech
excerpt: Nvidia's 2.0 SDK streams ray-tracing geometry on demand and sheds detail when memory runs short. The bill moved from your VRAM to your disk.
cover: /img/blog/rtx-mega-geometry-2-vram-streaming/shot-01.jpg
sources:
  - outlet: NVIDIA Technical Blog
    url: https://developer.nvidia.com/blog/whats-new-for-game-developers-dlss-5-with-3d-guided-neural-rendering-nvidia-ace-updates-and-new-rtx-kit-capabilities/
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/pc-components/gpus/nvidias-rtx-mega-geometry-2-0-streams-ray-tracing-geometry-into-vram-on-demand-nanite-inspired-design-drops-detail-instead-of-dropping-out
  - outlet: VideoCardz
    url: https://videocardz.com/newz/nvidia-rtx-mega-geometry-2-0-adds-geometry-streaming-for-detailed-ray-traced-scenes
artistView:
  take: "Streaming the acceleration structure is the right fix for the problem 1.0 left open, and it quietly moves the hardest decision in the scene — which detail survives when memory runs short — from the art team to a screen-space error metric. That is a good trade on foliage and a nervous one on a hero asset."
  works:
    - "Pipeline: baking a continuous LOD hierarchy once and streaming clusters out of it retires the whole category of hand-authored ray-tracing proxies, which was never art's job to begin with."
    - "Performance: dropping geometric detail under pressure instead of stalling means the failure reads as a softer silhouette rather than a hitch, and a soft silhouette at 40 metres is the cheapest thing in the scene to give away."
  misses:
    - "Asset budgets: 31GB of mesh data resident as 1.5GB is a VRAM win paid for on disk and on the bus, and nobody reviews download size at asset sign-off."
    - "Art direction: the clusters are pre-baked, so the quality of the hierarchy is decided by the topology handed to the baker — uneven triangle density will stream worse than clean, evenly distributed density, and that is invisible until it is on screen."
draft: true
---

Nvidia's numbers for its own demo scene: 1.6 billion unique triangles, 18.9
billion once you count instances, across 2,034 meshes. Roughly 70GB to
download, 31GB of which is mesh data. Standing in the courtyard on an RTX 5090
at 4K with DLSS Quality, about 1.5GB of that geometry is actually in VRAM.

That ratio is what RTX Mega Geometry 2.0 is for. The SDK went out to developers
on **22 September 2026**, alongside RTX Kit 2026.3, and it adds one thing:
streaming.

## What 1.0 left open

The version that shipped last month solved a specific, unglamorous problem.
Ray tracing runs against a bounding volume hierarchy, and building a BVH from
Nanite's raw clusters every frame was never affordable, so Unreal had been
[handing the art team a low-poly stand-in mesh to trace
instead](/blog/nanite-fallback-mesh-rtx-mega-geometry). Mega Geometry let the
GPU build and cache bounding volumes over the real cluster data, incrementally,
reusing whatever did not move. The fallback mesh stopped being load-bearing.

What it did not solve was residency. The acceleration structure still had to
cover the geometry, and the geometry still had to be somewhere. On a scene that
fits, fine. On a scene that does not, you are back to the oldest problem in
real-time graphics with extra steps.

2.0 bakes a continuous level-of-detail hierarchy ahead of time, pulls clusters
out of it on demand, and builds the acceleration structures around whatever
happens to be resident. When the scene asks for more than the budget allows, it
sheds geometric detail and carries on. No thrashing, no hitch while something
gets evicted and refetched.

Tom's Hardware measured it on a 4090 and got about 1GB of VRAM back and
something like a 13% gain. Nvidia's own earlier figure for Mega Geometry in
Alan Wake 2 was around 15%. Those are close enough to each other to believe,
and both are small enough to say out loud: this is not a doubling.

<figure>
  <button class="video-embed" data-video="5wbpuD-EMnk" data-title="Zorah | Neural Rendering, Powered by GeForce RTX 50 Series and AI" type="button">
    <img src="/img/blog/rtx-mega-geometry-2-vram-streaming/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from NVIDIA's Zorah demo video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>NVIDIA's own Zorah walkthrough — the fully path-traced scene the Mega Geometry SDK exists to make tractable.</figcaption>
</figure>

A note on those Zorah figures, because they do not line up with the ones from
last year. The build Nvidia showed at CES 2025 was described as roughly 500
million triangles in a 108GB download. The scene behind the 2.0 announcement is
1.6 billion triangles in about 70GB. Same demo name, different build, and the
numbers moved in both directions, so treat them as two scenes rather than a
like-for-like jump. Nvidia has also not said which version of Mega Geometry
**Gears of War: E-Day** ships with, which is the first retail game running any
of it.

## The bill did not disappear

Look at the two numbers in the first paragraph again. 31GB of mesh on disk,
1.5GB of it resident. Streaming did not make that mesh data smaller. It made it
someone else's problem — the drive it sits on, and the bandwidth it crosses to
get into memory.

An art review has a line for triangle count. It has a line for texture memory,
usually a strict one. It does not have a line for how many gigabytes the shipped
build weighs, because for years that was a publishing concern rather than a
craft one. A technology whose whole premise is that you can author far past what
fits in VRAM, provided the disk holds the full hierarchy, makes download size an
art decision. Quietly, and after the fact, which is the worst way for a budget
to arrive.

Nobody at Nvidia is hiding this. The 70GB is in the announcement. It is just
not the number in the headline.

## What softens, and where

The failure mode is the part I would want to test first. "Drops detail instead
of dropping out" means that when memory gets tight the scene degrades
gracefully, and graceful is being decided by an algorithm working from
screen-space error — how much a cluster swap would visibly change the image at
this distance, at this resolution.

That metric is very good at the thing it was designed for. Foliage, crowd
geometry, distant architecture: give it away, nobody notices, and the 1.0
article's railing-shadow problem was the same class of thing solved from the
other end. It is less good at knowing that the ornament on the third arch is the
shot in the trailer.

So the check changes. You already look at a hero asset up close. Now you also
need to look at it from the distance where the budget bites, on a card near the
bottom of your spec, with the scene fully loaded around it — because that is
where the hierarchy will start spending your silhouette. And you cannot tune
that per-asset the way you used to tune a fallback proxy by hand. What you can
tune is the topology you hand the baker. Even triangle density clusters well.
Long thin triangles and abrupt density changes across a seam give the hierarchy
bad leaves, and a bad leaf is a worse decision at every level above it.

## The cards that need it most

1GB back on a 4090 is a rounding error. 1GB back on an 8GB card is an eighth of
everything it has, and 8GB is still what most people are rendering on — the
reason [a 500-dollar laptop GPU module can ship with 4GB of usable
headroom](/blog/framework-laptop-16-rtx-5070-12gb-gpu-module-price) and nobody
blinks is that the whole market has been squeezed from underneath by memory
prices.

Which is the awkward shape of this. The technology helps thin cards most, and it
arrives as an opt-in SDK that a studio has to integrate, on RTX hardware, in
games that choose to ship it. One retail title so far. The SDK is at 2.0.0 on
GitHub this week, and it was at 0.9.0 beta about eighteen months ago, which is a
reasonable pace for a graphics API extension and a slow one for anybody hoping
their 3060 gets a second life this year.
