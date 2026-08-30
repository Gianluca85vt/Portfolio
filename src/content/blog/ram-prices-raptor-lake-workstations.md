---
title: RAM prices pushed Intel to un-retire Raptor Lake
date: 2026-08-14
category: Tech
excerpt: A 32GB DDR5 kit went from about 95 dollars to over 500 in a year, so builders are quietly going back to Raptor Lake and DDR4.
cover: /img/blog/ram-prices-raptor-lake-workstations/shot-01.jpg
---

I already wrote about GPUs turning into VRAM with a chip stapled to it. Turns out the same
squeeze is happening one slot over, on the system memory that has nothing to do with your
graphics card, and it's arguably a bigger problem for anyone running a real DCC toolchain.

## The number that made me stop scrolling

<figure>
  <img src="/img/blog/ram-prices-raptor-lake-workstations/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>DDR5 SDRAM module and Intel Core i9-13900K (Raptor Lake) die shot, via Wikimedia Commons</figcaption>
</figure>

A 32GB DDR5 kit was around **95 dollars in mid-2025**. Current market trackers put the same
class of kit somewhere in the **550-600 dollar range** heading into the back half of 2026.
That is close to a **480% increase** in about a year.
Lead times on DDR4 and DDR5 modules have stretched past **20 to 30 weeks**, and a chunk of
what is available is going out under allocation, meaning the person quoting your build
literally cannot promise you the kit they quoted last month.

Same root cause as the GPU story: AI data centres want memory more than gamers and artists
do, and they can pay more for it. Samsung, SK Hynix and Micron have pointed fab capacity at
HBM for accelerators because that's where the margin is, and DDR5 for the rest of us is
fighting over what's left.

## Intel's answer: bring back a chip from 2023

Here's the part that actually surprised me. Robert Hallock, who runs Intel's enthusiast
channel business, told Tom's Hardware this week that **Raptor Lake** — the LGA1700
architecture Intel launched back in 2022 and refreshed in 2023 — is staying "a core part of
the portfolio for years to come." Not as a budget afterthought. As a plan.

The reason is blunt: demand for it spiked and nobody at Intel scheduled for that. Hallock's
own words: *"If people are going to go to more affordable hardware, they still want the
fastest available for their money, and that happened to be Alder Lake and Raptor Lake. So
there was a sudden inrush of demand into these parts — certainly not anticipated when you
start your wafers, and your builds, long before that moment ever happens."*

Motherboard vendors are responding with **hybrid DDR4/DDR5 LGA1700 boards**, and there are
credible reports circulating of a further Raptor Lake refresh aimed at early 2027, still on
DDR4. The whole platform is getting a second life for one reason: **DDR4 is dramatically
cheaper than DDR5 right now**, and Raptor Lake is the newest chip that still speaks it
natively.

## Why this matters more for a workstation than a gaming rig

A gamer can run 16 or 32GB and feel basically nothing. That's not true for the kind of
session I actually run day to day.

Substance Painter with 8K texture sets open, ZBrush holding a few million polygons across
subtools, Houdini caching sims to RAM before it ever touches disk, a browser with forty tabs
of reference because that's apparently unavoidable now, and Blender or Unreal open in the
background so I can bounce between them without a reload — that's 64GB gone before I've
done anything demanding, and 128GB is not a flex, it's the point where you stop thinking
about memory at all. That headroom is exactly what just quintupled in price.

## What I'd actually do about it

**Don't assume the newest platform is the right buy.** A current-gen DDR5-only build looks
worse on paper than it did a year ago, purely because of what's plugged into it. Price a
Raptor Lake / LGA1700 build with DDR4 next to it before you commit — the CPU is a
generation or two behind, but for texture and sim-heavy work you are rarely CPU-bound
first, and the memory savings are not small.

**Buy the RAM you need, not the RAM you'll grow into.** Same logic as the GPU piece.
Speccing 128GB "to be safe" at 550 dollars a kit is a very different decision than it was
at 95.

**Check what you already have before you add to it.** Mixed kits and half-populated
channels are always a bad idea, but they're a genuinely expensive mistake to make right
now if a mismatch forces you to replace a working kit instead of extending it.

**Expect this to last.** The GPU piece I wrote pointed at 2027-2028 before memory supply
normalises. Nothing about this changes that timeline, it's the same shortage wearing a
different label. If you're planning a workstation this year, plan around the platform
actually being sane about memory, not around the price coming back down before your parts
arrive.

Sources: [Tom's Hardware on Intel's Raptor Lake comments](https://www.tomshardware.com/pc-components/cpus/raptor-lake-is-a-core-part-of-the-portfolio-for-years-to-come-says-intel-theres-been-a-sudden-inrush-of-demand-for-lga-1700-chips-due-to-ddr5-prices),
[Tom's Hardware on the rumoured DDR4 Raptor Lake refresh](https://www.tomshardware.com/pc-components/cpus/intel-reportedly-preparing-surprise-return-to-ddr4-systems-with-raptor-lake-next-ddr4-platform-slated-for-the-first-half-of-2027-on-the-lga-1700-socket-takes-a-page-from-amds-book-by-extending-budget-platform-longevity),
and [Windows Central on Intel's case for its older chips](https://www.windowscentral.com/hardware/intel/intel-raptor-lake-ddr4-cpu-benefits-pc-gaming).
DDR5 pricing figures are current market estimates and move fast — treat them as
directional, not a quote.
