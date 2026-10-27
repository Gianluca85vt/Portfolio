---
title: "Micron drops 4F²: DRAM is near atomic limits"
date: 2026-10-27
category: Tech
excerpt: Micron shelved the 4F² cell after twenty years and says DRAM is near atomic limits. Wafer bonding comes at 1ε, High-NA EUV after. 3D DRAM has no date.
cover: /img/blog/micron-drops-4f2-dram-atomic-limits/video-thumb.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/pc-components/dram/micron-plans-to-use-wafer-bonding-and-high-na-euv-for-next-gen-dram-company-also-developing-vertical-high-bandwidth-memory-and-vertical-edge-inference-memory-integrated-directly-on-top-of-processors
  - outlet: TweakTown
    url: https://www.tweaktown.com/news/114236/micron-reveals-ddr6-lpddr6-hbm-and-nand-roadmap-as-ai-memory-demand-keeps-climbing/index.html
artistView:
  take: "Every scene budget I have ever worked to was really a memory budget wearing a different hat. Micron has now said in public that the cheap way to add bits is finished, which means the ceiling I build under stops moving on its own and starts moving only when somebody pays for more silicon area."
  works:
    - "Roadmap honesty: putting 3D1 and 3D2 on a slide with no dates attached is more useful to anyone planning a workstation refresh than a confident date that slips twice."
    - "Packaging direction: memory stacked straight onto the processor is the right answer for inference, and it is the same physics that would help a GPU hold a big virtual-texture working set without going out to board-level VRAM."
  misses:
    - "Capacity for content work: the roadmap's gains are aimed at HBM and at AI parts. Nothing on it says the 32GB consumer GPU gets cheap, and that is the number that decides whether a scene fits."
    - "Timing: 1δ lands in volume in the second half of 2027 at a mid-20% density gain. Against demand growing the way it is, a quarter more bits per wafer two years out is not relief."
draft: true
---

Scott DeBoer, Micron's president and chief technology and products officer,
said something at the company's technology webinar on 21 October 2026 that
is worth copying down exactly: "DRAM is nearing atomic limits at this point."

That is the supply side of every memory story this blog has run for three
months. We have written about the price ten times — [DRAM now costs more per
square millimetre than TSMC's N2 logic wafers](/blog/dram-per-mm2-tsmc-n2-price/),
Acer's CEO putting the peak at mid-2027, Sony unable to date a console because
it cannot price the RAM. What none of those pieces answered is why the capacity
is not simply arriving to meet the money. DeBoer answered it.

## The cell that was supposed to save a third of the area

DRAM cells are measured in F², where F is the smallest feature the process can
print. A conventional cell is 6F². The industry has spent most of two decades
chasing 4F², which would cut the area of every bit by a third — the single
largest density win left on the table that does not require rebuilding the
whole architecture.

Micron has taken it off the roadmap. After roughly twenty years of work, the
company is staying on 6F² and, per the reporting of the webinar, no longer
treats 4F² as a production architecture. Samsung, SK hynix and CXMT are, by the
same accounts, still pursuing it.

That is a real disagreement between the three or four companies that make all
the world's DRAM, and it is not a small one. One of them is wrong. Micron's
position is that the vertical-channel transistor 4F² needs costs more in
process complexity and yield than the third of an area it hands back. Which is
a judgement about money as much as physics, and the kind of judgement that
looks either very smart or very expensive in about four years.

## What replaces it

<figure>
  <button class="video-embed" data-video="GlwtS_Vq9aE" data-title="Thy Tran on Micron's 1-Alpha DRAM Process Technology" type="button">
    <img src="/img/blog/micron-drops-4f2-dram-atomic-limits/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Micron's video on its 1-alpha DRAM process technology" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Micron's own explainer, with Thy Tran, the company's VP of DRAM process integration, on the 1α node. It dates from the 2021 announcement rather than this month's roadmap, and it is here because it shows what one planar node step actually involves — the work that DeBoer is now saying has a floor under it.</figcaption>
</figure>

The roadmap Micron showed instead is a list of increasingly exotic ways to keep
a flat cell working:

- 1γ — in high-volume manufacturing now.
- 1δ — volume production in the second half of 2027, with a bit-density
  gain in the mid-20% range over 1γ. DDR6 and LPDDR6 both ride on this node.
- 1ε — introduces **wafer bonding**. Still in development; Micron has not
  said how it will implement it or what it expects to gain.
- ζÅ — High-NA EUV lithography.
- ηÅ — new materials.

Then, somewhere past all of that, 3D DRAM. Micron lists two generations, 3D1
and 3D2, with no architecture disclosed and no date. DeBoer's framing was that
the company has confidence in several more planar nodes and wants to introduce
3D DRAM at the optimal point on cost and performance, which is the polite way
of saying it will go when the sums work and not before.

Wafer bonding is the interesting one. Rather than shrinking the cell, you build
the array and the peripheral logic on separate wafers at processes that suit
each, then bond them face to face. NAND has been doing a version of this for
years. Bringing it to DRAM is a packaging answer to a lithography problem, and
it tells you where the easy wins have gone.

## The numbers that actually ship

On the product side the webinar was less philosophical. DDR6 is quoted at
roughly double DDR5's bandwidth; LPDDR6 at about 35% better power efficiency;
both on 1δ. G11 NAND goes beyond 400 layers. HBM moves a generation a year,
HBM4 this year through to HBM6 in 2030.

And two new things called vHBM and vEIM — vertical high-bandwidth
memory and vertical edge inference memory — designed to sit directly on top of
a processor rather than beside it. One report puts first-generation mass
production at 2028; other coverage says Micron named neither dates nor
customers, so treat the 2028 figure as resting on a single source.

Micron is also working with Albany NanoTech on fabrication technologies it
expects to use across the next five to ten years. Five to ten years is the
honest horizon here, and it is not a horizon that helps anybody specifying a
machine this quarter.

## What it means at the desk

Here is the part I care about. Every ceiling I have ever hit in a scene was a
memory ceiling. Not polygons — polygons stopped being the problem a long time
ago. It is how many 4K textures stay resident before the viewport starts
swapping, how large a cache you can keep warm, whether a simulation caches to
RAM or to disk and loses the afternoon. The number on the side of the box is
the number that decides what you can build.

For fifteen years that number went up on its own, roughly on schedule, and
nobody had to think about it. Micron has now said in public that it does not
go up on its own any more. Bits come from area, area comes from wafers, and
wafers are being bought by people with much deeper pockets than anyone
rendering for a living. That is already visible at the low end: [Framework
charged $500 for a GPU module whose real upgrade was 4GB of VRAM](/blog/framework-laptop-16-rtx-5070-12gb-gpu-module-price/),
and nothing on this roadmap suggests that arithmetic improves soon.

I would be glad to be wrong about this. 1δ is a real node with a real date and
a quarter more bits on it, and wafer bonding could surprise everybody. But a
mid-20% density gain arriving in late 2027, aimed mostly at HBM for AI parts,
is not the shape of relief. It is the shape of a plateau with good engineering
on it.
