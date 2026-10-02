---
title: "DGX Spark 64GB: half the memory, $1,000 more"
date: 2026-10-02
category: Tech
excerpt: Nvidia's 64GB Spark arrives 23 October at $4,999 — a thousand dollars above what the 128GB box cost at launch. Smaller pool, higher price.
cover: /img/blog/dgx-spark-64gb-half-the-memory/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/pc-components/gpus/nvidia-introduces-64gb-dgx-spark-to-throw-local-ai-fans-a-lifeline-amid-the-rampocalypse-new-gb10-config-starts-at-usd4999-for-those-who-can-work-with-less
  - outlet: The Register
    url: https://www.theregister.com/systems/2026/10/02/nvidia-debuts-4999-dgx-spark-with-half-the-ram-and-storage-amid-memory-crunch/5300622
  - outlet: Ars Technica
    url: https://arstechnica.com/information-technology/2026/10/memory-supplies-are-only-getting-tighter-micron-ceo-says/
artistView:
  take: "The Spark was never interesting to me as an AI appliance. It was interesting because 128GB of addressable GPU memory for four thousand dollars undercut every out-of-core workaround in a render pipeline, and the 64GB SKU prices that advantage back out of reach."
  works:
    - "Memory architecture: one unified pool with no host-to-device copy is the right shape for scenes that do not fit a card, and 64GB still clears any consumer GPU by a wide margin."
    - "Pipeline: a self-compiled Blender 5.3 alpha on this hardware came back with DLSS denoising and OptiX working, which is a better software story than ARM64 Linux usually gets."
  misses:
    - "Value: halving the pool while raising the price turns the one spec that justified the box into its weakest line."
    - "Storage: cutting the drive alongside the memory hits simulation caches, which is where a 3D workload actually lives on disk."
draft: true
---

When the DGX Spark shipped, the specification that mattered to me had nothing to
do with parameters or tokens a second. It was this: for about four thousand
dollars, you got 128GB of memory that a GPU could address directly. At the time,
as The Register points out, that made it the highest-capacity workstation GPU
Nvidia sold — a claim about capacity and nothing else.

Anyone who has watched a Cycles render fall out of GPU memory and limp along
out-of-core knows why that number is the interesting one.

On 2 October Nvidia put out a 64GB version at $4,999, on sale from 23 October
through Acer, Asus, Dell, Gigabyte, HP and MSI. Same GB10 Grace Blackwell part,
same DGX OS, same ConnectX-7 networking. Half the unified memory, and per The
Register, half the storage too.

The same day, the 128GB model went to $6,950.

## Do the subtraction

The 128GB Spark sold for around $4,000 when it launched last year. So the cheap
one, the lifeline, the entry point, costs a thousand dollars more than the
full-memory machine did twelve months ago — about 25% more for half the pool.
The 128GB version is up nearly 75% in the same window.

Nvidia blames memory supply. Fair enough — it is true. Worth remembering all
the same that the GB10 platform has been drifting upward since the day it was
shown as Project Digits at CES last year, when the expected price was nearer
$3,000 and nobody had yet watched DRAM contracts double.

Tom's Hardware makes the fair case for the smaller box: dense models got good
enough that you no longer need 128GB to run something clever locally. Qwen 3.8
27B fits inside 32GB, with a tight context window. If inference is the job, a
permanently attached 128GB of LPDDR5X is an expensive thing to be carrying. The
64GB machine handles models up to around 100 billion parameters and is a poorer
fit for fine-tuning, which is the trade being offered.

That argument holds for someone running a local agent. It falls apart for
anyone who looked at this box and saw a render node, because a renderer does not
care how clever your model is — it cares whether the scene fits in memory, and
scenes have got bigger every single year that memory got more expensive.

## Where the money went

Micron reported its fiscal Q4 on 30 September. Revenue $54.23 billion. A record
87% gross margin, and an 88% operating margin in the Mobile and Client unit —
which was the only unit in the company that shipped *less* memory than the
quarter before.

Eleven days earlier, Acer's chief executive
[accused the three memory makers of holding for margins above 80%](/blog/ram-prices-acer-peak-mid-2027/)
and said the warehouses were full. One of the three has now filed a number that
sits just above his estimate, on the consumer business, while moving fewer bits.
Make of the coincidence what you like.

Micron's CEO Sanjay Mehrotra told investors the same week that demand will
outrun supply for at least a couple more years. Worth noting what he was
actually talking about: Micron does not sell consumer RAM any more, and his
comments covered HBM and server DRAM. The consumer squeeze is a side effect.
Capacity goes where the margin is, and [DRAM revenue per square
millimetre has already passed what TSMC gets for an N2 wafer](/blog/dram-per-mm2-tsmc-n2-price/).
Nothing about that points at relief.

## Meanwhile, the software caught up

The part of this week I enjoyed more. Reha Yağcıoğlu compiled Blender 5.3 Alpha
natively on a DGX Spark — Linux on ARM64 — with the DLSS denoiser and OptiX
working, and wrote the process up on Blender's own developer forum on 1 October.
There is a tutorial video, and a Raspberry Pi 5 running Blender tucked in at the
end of it as a joke that also works.

<figure>
  <button class="video-embed" data-video="PVpLUIxnMHM" data-title="Blender 5.3 Alpha on NVIDIA DGX Spark with DLSS + ARM64 Builds" type="button">
    <img src="/img/blog/dgx-spark-64gb-half-the-memory/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Reha Yağcıoğlu's Blender on DGX Spark build video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Reha Yağcıoğlu's walkthrough of the native ARM64 build, from the thread he posted on Blender's developer forum. He compiled it himself, from source, on hardware Blender does not ship a build for.</figcaption>
</figure>

Nobody hands you that build. You compile it, which is why a step-by-step writeup
of the process is a genuinely useful thing to publish rather than a curiosity.
And it arrives in the same fortnight that the hardware it runs on got worse value
in both directions at once.

Grace Blackwell with a working OptiX path and 128GB of coherent memory would have
been a strange, specific, rather wonderful box to build a lookdev station around.
Grace Blackwell with 64GB at five thousand dollars is a harder sell against a
tower with a used 4090 in it. And the tower runs software you can download.

## The honest state of it

Confirmed: $4,999, 64GB unified memory, 23 October, six OEM partners, GB10
unchanged, 128GB now $6,950.

Not confirmed, or not by me: the exact storage capacities on the 64GB SKU — The
Register says the drive is halved without giving the figures — and the original
128GB launch price, which sources put at "around $4,000" rather than a number
Nvidia will stand behind today.

---

*Pricing, launch date and partner list from Tom's Hardware and The Register,
both of 2 October 2026. Micron's quarterly figures and Mehrotra's remarks via
Ars Technica. The Blender build is Reha Yağcıoğlu's, documented on
devtalk.blender.org and syndicated by BlenderNation on 1 October; I could not
reach the forum thread directly from here and have relied on the syndicated
summary and his own description of it.*
