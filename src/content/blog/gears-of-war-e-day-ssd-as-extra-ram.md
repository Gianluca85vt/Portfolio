---
title: Gears of War E-Day uses the SSD as extra RAM
date: 2026-11-14
category: Tech
excerpt: The Coalition pages city data off the NVMe drive to fit E-Day on a Series S. Tom's Hardware measured the same system on PC at up to 3.7 GB/s.
cover: /img/blog/gears-of-war-e-day-ssd-as-extra-ram/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/pc-components/ssds/we-tested-the-ram-saving-storage-tech-in-gears-of-war-e-day-up-to-3-7-gb-s-of-ssd-streaming-speed-saves-several-gigabytes-of-system-ram-usage
  - outlet: Notebookcheck
    url: https://www.notebookcheck.net/Gears-of-War-E-Day-on-Xbox-Series-X-shows-how-games-can-circumvent-memory-limitations.1413640.0.html
artistView:
  take: "The interesting work in the Series S build happened in the data layout rather than the renderer, which means it happened in the content. Deciding what gets evicted together is an authoring decision, made by whoever split the asset, and it is the kind of constraint that arrives from engineering and gets paid for in the art directory."
  works:
    - "Streaming: keeping the city at full size on a 10GB console by paging cold data to flash is a packaging win, and it shows what careful eviction granularity buys you."
    - "Scalability: the discipline forced by the weakest target turns up as lower RAM use on a mid-range PC, which is the best argument for having a weak target at all."
  misses:
    - "Lighting: Series S goes without Lumen reflections, per Digital Foundry's comparison, and reflective floors are exactly where a viewer notices the absence."
    - "Performance: reviewers describe Series X dipping under 60 in busy Horde scenes, which is what a tight frame budget looks like when streaming has to keep up."
draft: true
---

Paging memory out to disk is about as old as operating systems. Your desktop has
been doing it the whole time, quietly and badly, and you only find out when
something thrashes and the mouse turns to treacle.

A console has no such luxury. No swap file to fall back on, no spare bandwidth
to be careless with, and a fixed frame budget that one bad page-in will blow
straight through. So when The Coalition decided to use the Xbox Series S's NVMe
drive as a tier of memory for Gears of War: E-Day, they were taking on by hand
what a kernel does by guesswork — and they had to be right every frame.

Tom's Hardware went looking for the same system on PC this afternoon.

## What is on the box

<figure>
  <img src="/img/blog/gears-of-war-e-day-ssd-as-extra-ram/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>The Coalition / Xbox Game Studios, via the official Steam page</figcaption>
</figure>

Series S ships with 10GB of GDDR6, of which games see roughly eight. Series X
has 16. E-Day is a full Unreal Engine 5 title — Nanite, Lumen, MegaLights, and
on PC RTX Mega Geometry driving ray-traced shadows and reflections — set in a
dense city, and the Series S build keeps that city at its full size instead of
shrinking it.

The Coalition explained how to Digital Foundry. They set aside a few gigabytes
of the console's SSD and treat it as a slower tier of memory, moving
less-frequently-touched city data out to flash and pulling it back when the game
needs it again, with access-pattern heuristics deciding what has gone cold.
Write-ups of that interview put the net gain at roughly a gigabyte of effective
extra RAM.

One gigabyte reads like a rounding error. Against an eight-gigabyte budget it is
more than a tenth of everything you have, and on this class of machine a tenth
is the difference between a district loading and a district getting cut.

Worth saying plainly: the Series S detail traces back to a single Digital
Foundry interview, re-reported widely since. Neither Microsoft nor The Coalition
has put the figure in their own words anywhere I can find, so treat the
gigabyte as one outlet's reporting of one conversation.

## The PC numbers

Tom's Hardware's test went up today. Their headline figure is up to **3.7 GB/s
of SSD streaming**, which they say saves several gigabytes of system RAM,
measured first on a high-end rig with resources to spare and then on a more
modest configuration closer to what most people are running. I could not open
the full test from where I am sitting, so I am working from the publication's own
summary rather than their charts. The shape of the result is the part that
matters here, and the shape is that a trick built for the weakest console pays
out on a mid-range PC.

Which is the sane way round, and rarer than it should be.

## The bookkeeping is asset work

Digital Foundry's reading was that the clever part sits in The Coalition's data
management rather than in the hardware. That is worth unpacking, because it is
the bit that lands on the people making the content.

Eviction granularity is authored, not configured. If a building is one
four-hundred-megabyte blob, you page four hundred megabytes or you page nothing.
Split it along what is visible together and you page what the camera can see.
Nobody writes that split in engine code. Somebody decides it while building the
asset, usually without being told that is what they are deciding.

Locality on disk is the other half. Two things needed in the same frame want to
sit next to each other in the package, or each one costs its own read. Chase
that properly and you end up duplicating — the same prop across six districts,
stored six times, so every district reads contiguously. It is one of the honest
reasons modern installs are enormous, and [where a 210GB install actually
goes](/blog/gta-6-210gb-where-the-bytes-go/) is mostly this plus audio.

Nanite has worked on the same principle since it shipped, streaming geometry
clusters off disk as the camera asks for them. Extending that bet to the rest of
the scene's data is a logical next step rather than a leap.

Anyone who has cooked a build for a streaming engine has watched the package
swell or the hitching appear because of how things were grouped, not because of
how they were modelled. Nothing in that work shows up in a screenshot, which is
why it tends to get discovered late.

## Flash is not memory

Latency is the whole problem. A good NVMe drive answers in tens of microseconds.
DRAM answers in tens of nanoseconds. Three orders of magnitude, and a frame
sitting around waiting on a page-in is a frame you dropped. The Coalition said
as much in that interview: move data too often and the gain goes back out as
stutter.

The buffer buys nothing else, either. No GPU time, no CPU headroom. Series S
still goes without Lumen reflections, and reviewers describe Series X dropping
under 60 in crowded Horde scenes.

On PC an SSD is a hard requirement rather than a recommendation, which follows
from all of the above. The install size I am less sure about — some outlets list
115GB and others 130GB, and I have not managed to reconcile them.

## The same bet, in a server rack

AMD is running this play in the data centre, claiming [95% of server performance
on half the DRAM](/blog/amd-mext-half-the-server-dram/) by paging to flash,
EPYC-only and closed-source. Different scale, identical reasoning, and the
reasoning in both places is that DRAM has stopped getting cheaper and nobody
expects it to start.

E-Day is the version of that idea you can buy. Series S is the machine that
forced it, and the discipline it bought shows up on hardware nobody was worried
about. That is usually how a weak target earns its keep, and it is a decent
argument against dropping one.
