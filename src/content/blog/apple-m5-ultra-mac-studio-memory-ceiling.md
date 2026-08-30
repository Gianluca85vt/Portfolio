---
title: "Apple M5 Ultra: 1.2TB/s through the same 512GB ceiling"
date: 2026-08-26
category: Tech
excerpt: The new Mac Studio keeps the half-terabyte unified memory ceiling Apple set in March 2025 and raises the bandwidth behind it by half.
cover: /img/blog/apple-m5-ultra-mac-studio-memory-ceiling/cover.svg
---

There's a moment in a GPU render that anyone who does this for a living
recognises on sight. The scene loads, the first buckets come back quickly, and
then something tips you over the card's memory — one more 8K displacement map, a
scatter layer nobody trimmed, a volumetric still sitting in the file from three
versions ago. The render keeps going. It keeps going at a fraction of the speed
it had ninety seconds earlier, because the renderer is now hauling geometry and
textures across PCIe on demand instead of reading them out of local memory.

Every artist's mental model of a workstation is shaped by that cliff. It's why
"how much VRAM" comes before "how fast" in any sensible conversation about a
render box. Hold that against what Apple announced on Monday.

## The number that didn't move

Apple announced the M6 and the M5 Ultra on 25 August, alongside refreshed Mac
mini and Mac Studio machines. The M5 Ultra tops out at a 36-core CPU, an 80-core
GPU, up to 512GB of unified memory, and 1.2TB/s of memory bandwidth, which Apple
describes as 50 percent more than the M3 Ultra.

Set that next to the M3 Ultra from March 2025: up to a 32-core CPU, an 80-core
GPU, up to 512GB of unified memory, 819GB/s.

The memory ceiling is identical. The GPU core count is identical. Four CPU cores
arrived, and the bandwidth behind all of it went up by roughly half — 819 × 1.5
lands at 1,228.5GB/s, which is where Apple's "1.2TB/s" and its "50 percent"
claim meet. The two figures agree with each other, which is worth checking and
frequently isn't true of launch-day spec sheets.

So this is a generation spent almost entirely on feeding the cores that were
already there.

For path tracing, that's the correct place to spend it. A production path tracer
is memory-bound long before it's compute-bound. Camera rays are coherent and
behave well; everything after the first bounce scatters, and secondary rays end
up walking the BVH in effectively random order, missing cache, pulling texture
tiles that have nothing to do with the tile the neighbouring thread wants. Shader
cores sitting idle waiting on memory are the normal state of a render. Adding
more of them to a starved memory system buys very little. Widening the pipe buys
something on every ray.

Phoronix and CineD both describe the M5 Ultra as Apple's first quad-die part,
which would be a change from the two-die UltraFusion arrangement of the M3
Ultra. Apple hasn't published the die topology in the material I could reach, and
the GPU core ceiling is unchanged at 80 either way, so I'd treat the packaging
detail as reported rather than confirmed.

## A Mac mini's ceiling is 32GB

The M6 is the more novel chip and the less useful one for this work.

It's Apple's first 2nm part: a 12-core CPU built from two "super" cores, four
performance cores and six efficiency cores, with a dual 16-core Neural Engine.
The GPU picks up revised shader cores, Dynamic Caching, hardware ray tracing,
and — the line that should interest environment artists — a 50 percent increase
in geometry rate. Memory bandwidth goes to 170GB/s, from 153GB/s on the M5 and
120GB/s on the M4.

That geometry number is a real improvement in the place scene assembly hurts.
Dropping a kitbash set into a viewport, scrubbing a shot with a few hundred
thousand instanced pieces on screen, working with something dense before it's
been decimated — that's a rasterisation-side problem, and a faster front end
shows up immediately in how the viewport feels.

Then you reach the ceiling. The M6 Mac mini ships with 16GB of unified memory
and configures to 32GB. **That 32GB is the whole machine** — the OS, the browser
you left open, your DCC application's CPU-side copy of the scene, and the GPU's
working set, all drawing on the same pool. On a
discrete-GPU box, a 32GB card sits behind 64GB or 128GB of system RAM doing
separate work. Here they're the same 32GB.

At 170GB/s it's also moving about a seventh of what the Ultra moves. Which puts
a firm edge on what the M6 mini is for: a capable desktop, and a poor render
node.

Prices, since they date quickly: the M6 Mac mini starts at $899 and the M5 Pro
version at $1,699; Mac Studio starts at $2,499 with the M5 Max and $5,499 with
the M5 Ultra. One detail worth catching if external storage matters to your
caches — the M6 mini has Thunderbolt 4, while the M5 Pro configuration gets
Thunderbolt 5.

## Sixteen times the capacity, two-thirds the speed

The comparison everyone reaches for is a 5090, so let's do it properly.

An RTX 5090 carries 32GB of GDDR7 on a 512-bit bus, good for 1,792GB/s. The M5
Ultra offers up to 512GB at about 1,200GB/s. Sixteen times the capacity, running
at roughly two-thirds the bandwidth.

Which of those wins is entirely a question about your scene. Under 32GB, the
discrete card is faster on raw throughput and sits inside a renderer ecosystem
that has had a decade of OptiX-first optimisation poured into it. Over 32GB, the
bandwidth comparison becomes academic, because one of the two machines has left
the resident case and is paging, and paging costs far more than a 33 percent
bandwidth deficit ever will.

The honest caveat is renderer support, and it cuts against Apple. Most
production GPU path tracers were built CUDA-first. Metal backends exist and have
improved, but "exists" and "is the path the vendor optimises and your studio's
pipeline is validated against" are different claims, and a spec sheet can't
settle the second one.

None of it has been measured yet, by anyone. Preorders opened on 25 August with
deliveries from 22 September, and the 512GB configurations — the ones this
entire argument rests on — are reported for late October. The machine that would
answer the question is the last one anybody gets to put a scene through.

---

*Specifications from Apple's 25 August 2026 announcement as reported by Ars
Technica, Phoronix, MacRumors, 9to5Mac and CineD; RTX 5090 memory
specifications are Nvidia's published figures. Prices are US launch prices as of
26 August 2026. The quad-die description of the M5 Ultra is reported, not
confirmed against Apple's own documentation.*
