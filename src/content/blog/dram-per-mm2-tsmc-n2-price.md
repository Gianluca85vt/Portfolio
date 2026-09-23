---
title: "DRAM per mm² has passed TSMC's N2 wafer price"
date: 2026-09-23
category: Tech
excerpt: An analyst chart puts 1b DRAM at $0.654 per mm² against $0.424 for TSMC N2. The arithmetic holds. It measures revenue per area, which changes the reading.
cover: /img/blog/dram-per-mm2-tsmc-n2-price/shot-01.jpg
---

Somebody put two numbers side by side on 20 September and the hardware internet
has been chewing on them since. A square millimetre of 1b-generation DRAM:
**$0.654**. A square millimetre of wafer off TSMC's N2 line: **$0.424**.

Memory silicon, in other words, now carries half again the value per unit of
area as the most advanced logic process in volume production. That inverts the
assumption every hardware conversation has rested on for twenty years — the die
doing the thinking is the expensive one, and the memory sitting next to it is
the commodity you buy by the stick.

The chart came from Kurnal, of Kurnal Insights, and Tom's Hardware wrote it up
on the 22nd. It is worth walking through, because the arithmetic is sound and
the conclusion people are drawing from it is not quite the one the numbers
support.

## The arithmetic

A 300-millimetre wafer has a gross area of about 70,686 mm². Divide a wafer
price by that and you get a nominal price per square millimetre.

Kurnal takes a TSMC N3 wafer at $20,000, which works out at $0.283/mm², and an
N2 wafer at $30,000, or $0.424/mm². Both figures come from media leaks rather
than a price list — TSMC quotes per customer and per volume, and a separate
analyst estimate last year put 3nm nearer $18,000, so treat $20,000 as the top
of a range rather than a fact.

The memory side is calculated differently. Take a DRAM price of $1.50 per
gigabit and multiply it by how many gigabits a generation fits into a square
millimetre:

- 1y DRAM, at 0.219 Gb/mm² → $0.329/mm²
- 1z DRAM, at 0.273 Gb/mm² → $0.410/mm²
- 1b DRAM, at 0.436 Gb/mm² → $0.654/mm²

I ran the multiplications. They come out exactly as published, and 1b lands at
1.54 times the N2 figure. Nothing is being fudged.

## The two numbers are not the same kind of number

Here is where the reading gets away from the chart.

The logic figure is a foundry charge. It is what a customer pays TSMC to run a
wafer through the fab, before Nvidia or Apple or AMD adds anything of its own on
top. The memory figure is a market price per bit, in the middle of the worst
memory shortage in a decade, with the memory maker's margin already baked in.

So the comparison is not memory manufacturing cost against logic manufacturing
cost. It is what DRAM area currently sells for against what leading-edge logic
area currently gets billed at. That is a statement about who is capturing the
value in this shortage, and the answer is the memory makers. TrendForce put
first-quarter DRAM industry revenue up 81% quarter on quarter, and on 7
September had conventional DRAM contract prices still climbing 13 to 18% for
the quarter, with consumer parts worst hit because suppliers had pulled supply
toward servers.

The comparison also leaves out packaging entirely, and packaging is the side
where logic spends heavily — advanced substrates, interposers, the whole
CoWoS-shaped queue that has been the other bottleneck of this cycle. Neither
figure accounts for edge exclusion, dicing lanes, test structures or yield.
They are nominal area prices, and the analyst said as much.

## Why the newest node looks the dearest

The detail that gives the game away sits in the DRAM column. 1b is the newest,
densest generation on that list, and it comes out as the most expensive per
square millimetre. 1y, the oldest, is the cheapest.

Manufacturing cost does not behave that way. A denser node exists precisely so
that a bit costs less to make; if density made silicon dearer per area nobody
would ever shrink anything. The numbers come out in that order because the
price per bit is held flat at $1.50 across all three generations, so more bits
per millimetre mechanically means more dollars per millimetre.

Which tells you what the figure actually is. Revenue density. The newest node
is not expensive to run — it is the best at converting a fixed quantity of
wafer area into bits that can be sold at today's price. In a shortage, that is
the most valuable property a fab can have, and it is why every memory maker is
pushing capacity onto its leading node instead of adding conventional lines.

<figure>
  <button class="video-embed" data-video="byWZoKCdePo" data-title="True 3D DRAM" type="button">
    <img src="/img/blog/dram-per-mm2-tsmc-n2-price/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Asianometry's video on 3D DRAM" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Asianometry on where DRAM density goes after planar scaling runs out, published 26 July 2026. The per-millimetre economics above are the commercial reason that research is being funded so hard.</figcaption>
</figure>

## What lands on the desk

Strip the analysis away and a plain fact remains: memory area is the scarce,
expensive thing right now, and it is being rationed accordingly.

That single fact is the machinery under most of the hardware stories of the past
fortnight. It is why a headset ships at a thousand dollars. It is why Raspberry
Pi has quietly locked its boards to their factory RAM size in firmware — the
resale arbitrage that policy kills only exists because a memory chip is now
worth stealing off a board. It is why eight-gigabyte graphics cards refuse to
die at the bottom of the stack. [Acer's chief executive put the peak at mid-2027
and called a shortage running to 2030
impossible](/blog/ram-prices-acer-peak-mid-2027/), which is either a read of the
supply curve or a man talking his own book, depending on how charitable you are
feeling.

For anyone building assets, the thing being repriced is an assumption rather
than a component. For a decade the answer to a texture budget problem was that
the next generation would have more memory. CD Projekt could build Night City
at [twice the texel density of The Witcher
3](/blog/night-city-hand-built-texel-density/) partly because that was a safe
bet. It is not a safe bet now. Streaming pools, mip budgets, virtual texturing,
the whole apparatus built for the years when memory was the cheap part of the
board — all of it is about to matter more than it has since the PS3, and for a
reason that has nothing to do with graphics and everything to do with what
hyperscalers are willing to pay for a gigabit.

---

*Per-area figures, wafer price assumptions and bit densities from Kurnal
Insights, posted 20 September 2026 and written up by Tom's Hardware on the 22nd;
the multiplications were re-run here and match. DRAM contract price movements
from TrendForce. Wafer prices are leaked estimates, not published rates, and
none of the figures account for yield, dicing or packaging.*
