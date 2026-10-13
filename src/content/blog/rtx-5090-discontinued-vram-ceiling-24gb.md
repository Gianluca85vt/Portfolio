---
title: "RTX 5090 reportedly discontinued: 32GB to 24"
date: 2026-10-13
category: Tech
excerpt: Leakers say the GB202 die is going to pro cards only. If the top GeForce becomes a 24GB 5080, GPU rendering loses the one card that held a heavy scene.
cover: /img/blog/rtx-5090-discontinued-vram-ceiling-24gb/shot-01.jpg
sources:
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/nvidia-has-reportedly-stopped-producing-rtx-5090-cards-to-focus-on-rtx-pro-gpus-for-ai-data-centers/
  - outlet: Tom's Hardware (via Yahoo Tech)
    url: https://tech.yahoo.com/computing/articles/nvidia-reportedly-halts-geforce-rtx-122000787.html
artistView:
  take: "A GPU renderer does not care about frames a second, it cares whether the scene fits. 32GB was the first consumer card where a heavy environment fit without a pro-tier invoice, and if the top GeForce comes back as a 24GB part then the ceiling for everyone working on their own machine moves down a step. Nvidia has not confirmed any of this."
draft: true
---

VRAM is a cliff. That is the thing worth holding on to while reading this
week's reports, because every other number on a graphics card is a slope —
more cores render the same frame faster, a higher clock shaves a percentage
off. Memory does not behave that way. A scene fits on the card or it does
not, and the two sides of that line are not 20% apart.

So when leakers started saying over the weekend that Nvidia has stopped
making the GeForce RTX 5090, the figure to look at is 32.

## What is actually being claimed

<figure>
  <img src="/img/blog/rtx-5090-discontinued-vram-ceiling-24gb/shot-02.jpg" loading="lazy" width="1440" height="989" alt="A Palit GeForce RTX 5090 GameRock, a triple-fan partner card, shot against black" />
  <figcaption>Palit's GameRock, one of the partner boards built on the die the reports say is being reallocated. Photograph by PantheraLeo1359531, CC BY 4.0 via Wikimedia Commons.</figcaption>
</figure>

Hardware leakers MEGAsizeGPU and hongxing2020 say a factory notice dated
around **10 October 2026** ends production of the RTX 5090, China-market D
variants included, so the GB202 die can go to professional and data centre
cards instead. A third leaker, Zed Wang, is reported as backing it up. The
same leak says a 24GB RTX 5080 steps up to become the top GeForce part, with
the current 16GB model dropped.

Nvidia has confirmed none of it. As of 12 October the company had said
nothing, and that silence is worth reading carefully rather than treating as
agreement — Nvidia has denied this shape of story before. In January,
Hardware Unboxed reported RTX 5070 Ti production had finished and the 16GB
5060 Ti was being wound down; Nvidia's answer was that it continues to supply
all GeForce SKUs to its partners. Moore's Law is Dead claimed the 5090 had
been quietly discontinued since late 2025, which, if you believe it, means
this week's notice is documenting something eleven months old.

Three leakers and a factory document is more than the usual rumour carries.
It is still not a statement from the company.

What is not in dispute: the card launched at $1,999 and VGC puts street
prices now at $4,000 to $5,000 and up. Whatever the production line is doing,
the thing has been priced out of a freelancer's reach for a while. I went
through [why a graphics card now costs what a used car
costs](/blog/why-gpus-cost-so-much-right-now/) back in August, and nothing in
it has aged badly.

## Why 32 to 24 is not an 8GB difference

Here is what the cliff looks like at a desk.

You have an environment — a street, a hero interior, whatever — with the
texture sets at the resolution the shot needs, displacement on the hero
geometry, a volumetric or two. You hit render on the GPU. Either the whole
thing is resident on the card and it goes at GPU speed, or it is not, and
then one of two things happens. The renderer spills to system memory and
every access to the spilled part crawls across PCIe instead of staying on the
board. Or it stops.

Most of the renderers people actually use will spill rather than die. Redshift
was built around out-of-core from the start. Cycles will fall back to host
memory. V-Ray GPU handles it. They all slow down when they do it, sometimes
by a lot, and the slowdown is not proportional to how far over you went — a
scene 1GB past the limit can lose a large fraction of its speed, because what
got evicted is being touched constantly.

Which is why 24 versus 32 is a question about what work you can take rather
than how fast you do it. Eight gigabytes is a 4K texture set on a few hero
assets, or the simulation cache for a medium effect, or the headroom that lets
you leave the viewport in Cycles while a background render runs. On a 24GB
card those are decisions. On 32GB they mostly are not.

And it is not only offline rendering. Substance Painter with 8K texture sets,
a UE5 scene with Nanite and Lumen while the editor holds its own copy of
everything, a Houdini sim cached to the GPU, the ML denoisers and upscalers
that now sit in the middle of comp — all of it is competing for the same
pool. The RTX 50 series was already a card where people went looking for
headroom in odd places; I wrote earlier about [overclocking RTX 50 VRAM and
why it is a bad idea on a render
box](/blog/vram-overclocking-hydra-rtx-50-series-artist-risk/), and the
instinct behind that is the same one at work here.

## The tier above costs four times as much

The obvious answer is the pro card. The RTX Pro 6000 Blackwell has 96GB of
GDDR7 with ECC and 24,064 CUDA cores, which is three times the 5090's memory
and genuinely the right tool for a heavy scene.

It is also a different purchase entirely. The card appeared in US retailer
listings in early 2025 at around $8,435, and current quotes have gone well
past that — one report has Nvidia's own marketplace at $13,250 and out of
stock, with resellers somewhere between roughly $8,900 and $11,500. Those are
snapshots from pages with unclear dates, so treat the spread as a spread
rather than a price. Direction is the only part that is clear, and the
direction is up, for the same reason the 5090 is reportedly going away.

So the ladder an artist climbs has a missing rung. Below: a 24GB consumer
card. Above: a workstation card at four to six times the money. The 5090 sat
between those two and did most of what the pro card did for a quarter of the
cost. That is the position being vacated.

## One die, two products, one allocation decision

GB202 is a single piece of silicon. Nvidia decides what it becomes — a
GeForce flagship, an RTX Pro card, something in a server — and those are the
same wafers either way. Which means consumer buyers of the top card were
always receiving whatever was left after a commercial decision made somewhere
else, and this week's reports describe that decision changing.

Add the memory shortage underneath it. High-bandwidth memory demand from AI
build-outs has been squeezing supply across the industry all year, and it has
reached a long way past graphics cards — console makers are living with the
same problem. A GDDR7 allocation argument that ends with 32GB consumer parts
being the wrong use of the memory is exactly the shape you would expect.

## What to do about it

If you are running a 5090, you are fine, and you now own something the second
hand market will treat kindly. If you were planning to buy one, the planning
window may have closed, and a 4090 — also out of production — is not the
fallback it was.

If you are specifying a machine for the next year or two, the honest advice is
to stop treating consumer VRAM as a number that goes up every generation. It
went 11, 24, 32, and the next step may be down. Build the scene budget around
what you can buy rather than what you expect to be able to buy, which mostly
means being serious about instancing, texture streaming and not shipping 8K
maps on things nobody sees at 8K.

Wait for Nvidia to say something before treating the 24GB 5080 as a plan. It
has denied this before.

---

*Production claims from hardware leakers MEGAsizeGPU, hongxing2020 and Zed
Wang as reported by Tom's Hardware and VGC on 11-12 October 2026, with
additional context from Dexerto. Nvidia had made no statement at the time of
writing. RTX Pro 6000 Blackwell listings are retailer snapshots of uncertain
date and are given as a range for that reason. The January 2026 RTX 5070 Ti
report and Nvidia's response to it come from Hardware Unboxed's coverage.*
