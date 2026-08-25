---
title: Framework's laptop GPU finally swaps like a lens, and the price of the upgrade is the actual story
date: 2026-08-21
category: Tech
excerpt: Framework shipped a 12GB RTX 5070 module that drops into the existing Laptop 16 chassis, no new mainboard required. It costs 1,199 dollars, 500 more than the 8GB version, for four extra gigs of VRAM.
cover: /img/blog/framework-laptop-16-rtx-5070-12gb-gpu-module-price/cover.svg
---

Framework put out new hardware for the Laptop 16 this week: a **one-piece haptic
touchpad**, a **one-piece keyboard** with an aluminium lattice deck, and — the part
that actually matters if you use this machine to work rather than to look at — a
**GeForce RTX 5070 laptop GPU module with 12GB of VRAM**. Phoronix, Tom's Hardware
and Framework's own blog all covered the launch this week.

## The part that's genuinely new

Framework's whole pitch since the first Laptop 16 has been that the GPU is a
module, not a soldered decision you make once at checkout. This is the release
that actually proves it. The 12GB RTX 5070 module works in the **original 2025
Laptop 16 chassis** — you don't need to buy a new mainboard to get it, you unclip
the old graphics module and clip this one in. For anyone who bought in on the
promise that this laptop wouldn't become e-waste the moment Nvidia released a new
die, that's the first real payoff.

I like that, genuinely. Most gaming and workstation laptops treat the GPU as
fused to the motherboard's fate — you replace the whole machine to get more VRAM,
and the old one goes in a drawer or a landfill. A socketed graphics module that
survives a generation is closer to how a desktop tower has always worked, and
it's rare enough in a laptop that it's worth saying so plainly.

## The part that undercuts the pitch

The existing RTX 5070 module, at 8GB, is $699. The new 12GB module is
**$1,199** — a 72% jump for four more gigabytes of GDDR7. Framework has said
publicly that the increase isn't a margin decision on their end; it's what their
silicon suppliers are now charging them, and they've also warned the $699 8GB
module is unlikely to hold its price once current inventory runs out.

That number lines up with everything else I've been tracking this year. I wrote
about the [RTX 5090's street price](/blog/why-gpus-cost-so-much-right-now/)
doubling and about [system RAM](/blog/ram-prices-raptor-lake-workstations/)
getting squeezed by the same cause: AI data centres buying up memory supply
that used to go to consumer and prosumer parts. GDDR7 is exactly the kind of
memory that squeeze hits hardest, and a laptop GPU module is a small, low-volume
product next to a hyperscaler's GPU order — Framework has very little leverage
to absorb that cost the way Nvidia or a big OEM might.

## Why 12GB is the number that matters here, not the touchpad

For a technical artist, the touchpad and keyboard news is nice ergonomics and
nothing more. The VRAM figure is the one worth sitting with. Desktop RTX 5070
cards ship with 12GB as standard — this module is the laptop finally catching
up to its desktop sibling's memory, not exceeding it. And 12GB is already a tight
budget for anything past light viewport work: a handful of 4K texture sets, a
Nanite-heavy Unreal scene, or a GPU renderer like Redshift or Octane loaded with
production-weight assets will eat past that before you've finished dressing a
single environment. It's a fine number for reviewing work, sculpting, or running
a lighter engine viewport on the road. It is not a number I'd plan a render or a
lookdev pass around, on a desktop card or in this module.

So the honest read is: the modularity is real and worth applauding, but it
doesn't cancel out the memory economics underneath it. You can now upgrade the
GPU in a Framework 16 without replacing the whole laptop, which is a genuine win
for repairability. What you're upgrading into is still a mobile GPU with
desktop-baseline VRAM, priced at a premium that has nothing to do with Framework
and everything to do with where GDDR7 is going this year. If you're weighing this
against building or upgrading a desktop workstation instead, the module's price
tag is a data point for that decision, not a reason to skip it.

Sources: [Phoronix](https://www.phoronix.com/review/framework-laptop-16-2026),
[Framework's official blog](https://frame.work/blog/framework-laptop-16-now-with-rtx-5070-12gb-and-launch-event-re-cap),
[Tom's Hardware on the price](https://www.tomshardware.com/pc-components/gpus/frameworks-new-rtx-5070-12gb-graphics-module-costs-a-whopping-usd1-199-72-percent-more-expensive-than-usd699-8gb-version-says-pricing-is-beyond-its-control),
and [VideoCardz](https://videocardz.com/newz/framework-rtx-5070-12gb-graphics-module-costs-1199-over-70-more-than-8gb-model).
