---
title: "DDR6 vs DDR5: the 4x is against a 2020 baseline"
date: 2026-11-19
category: Tech
excerpt: JEDEC's DDR6 preview starts at 12.8 GT/s on a 96-bit bus. The 4x bandwidth claim measures that against DDR5's 2020 launch spec, not the sticks you own.
cover: /img/blog/ddr6-preview-96-bit-bus-74mm-module/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/pc-components/ram/ddr6-ram-shrinks-by-44-percent-while-delivering-4x-ddr5s-baseline-bandwidth-jedec-previews-12-8-gt-s-modules-with-up-to-1-terabyte-of-capacity-per-slot
  - outlet: PC Gamer
    url: https://www.pcgamer.com/hardware/memory/ddr6-memory-modules-to-be-almost-half-the-size-of-ddr5-and-almost-double-the-max-speed/
artistView:
  take: "A memory standard is a piece of engineering you can read like any other asset, and this one reads as a server part that desktops will be allowed to borrow later. The capacity line is the one I care about, because every scene budget I have ever worked to was a memory budget with a different name on it, and 16GB dies are the first number here that would actually let a heavy cache stay resident."
  works:
    - "Physical design: shrinking the module to 74mm to keep traces short at 78-picosecond bit times is the honest fix, and it is the kind of constraint-led decision that usually gets dressed up as a feature."
    - "Spec honesty: JEDEC's own preview claims more than 50% at introduction and says in writing that this is not a claim of equal application performance, which is a more careful number than either headline built on top of it."
  misses:
    - "Workstation relevance: transfer rates, low-power modes and the capacity ceiling are all quoted for RDIMMs. UDIMM is listed as possible, with no pin count, no connector and no date, so nothing here is yet a desktop part."
    - "Timing against the problem: reported windows run from 2027 to 2029, which puts first silicon at or after the price peak this blog has been tracking all autumn. A standard cannot relieve a shortage it arrives behind."
draft: true
---

Two of the outlets that covered JEDEC's DDR6 preview on 19 November 2026 put
different multipliers in their headlines. Tom's Hardware went with four times
the bandwidth of DDR5. PC Gamer went with almost double the maximum speed.
Neither of them got it wrong.

The numbers JEDEC put in the preview are these. Server RDIMMs start at
**12.8 GT/s** and the roadmap continues to 14.4 GT/s "and beyond". The data bus
widens from 64 bits to 96. Die density goes up to 128Gb. The module itself
shrinks to a proposed 74mm, against 133mm for a DDR5 DIMM.

Run the bandwidth arithmetic and the two headlines fall out of the same spec.
A 96-bit bus at 12.8 GT/s moves 153.6 GB/s per module. DDR5 at its original
JEDEC launch grade, DDR5-4800 on 64 bits, moves 38.4 GB/s. That ratio is 4.00,
exactly, which is where four times comes from. Compare instead against the top
of DDR5's own ladder at 9.2 GT/s — 73.6 GB/s — and you get 2.09, which is where
almost double comes from. Tom's Hardware is transparent about this in its own
URL, which contains the word *baseline* where the headline does not.

So the multiplier is a choice of which DDR5 you stand the new part next to, and
the two reasonable choices are two years and a factor of two apart. If you are
sizing a machine, 2.09 is the number that describes your upgrade, because the
sticks in the machine you are replacing are not DDR5-4800. Per pin the gain at
launch is 39%.

JEDEC's own framing is more cautious than either. The preview claims more than
50% bandwidth at introduction, and attaches a sentence saying that figure is not
a claim of equal application performance. I would like to quote the document
directly and cannot: `jedec.org` does not resolve from where this is written, so
the wording above comes from the outlets that did read it. Treat the 50% as
JEDEC's conservative number and the 4x as journalism's generous one.

## Why the module got short

The 74mm figure is the part worth sitting with, because it is a constraint
showing through the product.

At 12.8 GT/s a single bit occupies 78 picoseconds on the wire. Light in a PCB
trace covers something like a centimetre in 50 picoseconds, which means the
whole budget for one bit is a few centimetres of copper. A 133mm DIMM with DRAM
packages distributed along it has traces at the far end that are long compared
to that budget, and every millimetre of stub on the way is a reflection waiting
to close your eye diagram. Halving the card halves the worst-case run.

JEDEC's stated reason is accommodating higher system memory density, which is
the same thing said from the other end: shorter cards mean you can put more of
them in a chassis, and shorter traces are what lets each one run at 12.8 without
the signal falling apart. Power gets its own pass too — a move to VSS-terminated
IO, plus low-power modes described as data-centre-focused.

I like this kind of decision. It is engineering admitting what the physics costs
and redesigning the object around it, rather than keeping the familiar shape and
quietly capping the speed grade.

## The capacity number, and a unit that slipped

128Gb per die is double DDR5's 64Gb ceiling, and it is the figure that matters
for anyone whose job involves a scene that does not fit.

128 gigabits is 16 gigabytes per die. PC Gamer's write-up renders it as "128 GB
DRAM die density", which is a factor of eight out and would describe a single
chip holding more memory than most workstations. Its own parenthetical — double
that of DDR5 — is correct, and only makes sense at 128Gb, so this is a unit slip
rather than a disputed fact. Worth flagging because the number will get copied.

Where the extra bits come from is a question this blog has already answered the
hard way. Micron said in October that [DRAM is nearing atomic
limits](/blog/micron-drops-4f2-dram-atomic-limits/) and shelved the 4F² cell
after roughly twenty years of work on it. If the cell cannot shrink much
further, doubling die density arrives through stacking, packaging and wafer
bonding, all of which cost silicon area and process steps. A 128Gb die on a
standards roadmap is a target that somebody still has to pay for.

The capacity figures beyond the die are softer than they look. Module sizes of
128GB and 256GB, and RDIMMs scaling past a terabyte per slot, are reported as
projection rather than JEDEC specification. Tom's Hardware put the terabyte in
its headline anyway.

## What this is worth at a desk

Not much yet, and the honest version of that sentence has a date in it.

Every transfer rate, every low-power mode and every capacity ceiling in this
preview is quoted for RDIMMs. UDIMM and CAMM are both listed as possible form
factors; the pin count and the connector are undisclosed; nothing has been said
about when any of it ships. Reported windows run from 2027 at the optimistic end
to 2029 at the TrendForce end, and the standard is not final.

Set that against the thing actually hurting. [Acer's chief executive put the RAM
price peak at mid-2027](/blog/ram-prices-acer-peak-mid-2027/) and described the
three big suppliers holding a line on margins, and the machines people are
specifying this quarter are being specified under those prices. DDR6 silicon
arrives at that peak at the earliest and after it in most of the forecasts.

Which leaves the shrinking module as the near-term interest for anyone doing
this work on a laptop. CAMM in a 74mm world would mean workstation notebooks
with serviceable memory at server transfer rates, and that would be a genuine
change to what a portable machine can hold. It is also the part of the preview
with the least detail attached, so I am reading intent rather than a plan.

The bandwidth will be fine. Bandwidth has been fine for a while; a dense USD
scene or a Houdini cache falls over on capacity long before it starves for
throughput, and the capacity story here is a server story with a desktop
footnote. When the UDIMM spec lands with a number on it, that will be worth
writing about.
