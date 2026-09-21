---
title: "RAM prices: Acer says the peak is mid-2027"
date: 2026-09-21
category: Tech
excerpt: Acer's CEO calls a shortage running to 2030 impossible and says warehouses are full. The same week, CXMT put its fifth-gen DRAM into mass production.
cover: /img/blog/ram-prices-acer-peak-mid-2027/shot-01.jpg
---

Acer's chief executive spent part of last week telling reporters that the people
selling him memory are not being straight about how long this lasts. Jason Chen's
line, from remarks reported out of Taipei on 20 September: a shortage running to
2030 is impossible. Fabs are under construction. Capacity is coming. The 2030 number
describes intent rather than capacity.

Then the part that will get quoted back at him. Chen described the public
statements coming out of Samsung, SK Hynix and Micron — the ones insisting
nothing gets cheaper for years yet — as a roll call. Three companies reading
their positions out in the open, each one confirming to the other two that
nobody is about to break ranks. He put the target at margins above 80%, held for
as long as the story holds up. And he said the warehouses are full right now.
Many sellers, few buyers.

<figure>
  <button class="video-embed" data-video="9hLiwNViMak" data-title="RAM: WTF?" type="button">
    <img src="/img/blog/ram-prices-acer-peak-mid-2027/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from GamersNexus's RAM: WTF? video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>GamersNexus mapped the structure of the DRAM market in November 2025, before this year's run. Chen is describing the same three companies from the other side of the purchase order.</figcaption>
</figure>

## Which parts are short

Chen's narrower claim is the more useful one. He said the genuine shortages sit
in specific bins — top-end DDR5, LPDDR5X-9600, and niche silicon like Nvidia's
N1 and N1X — rather than in memory as a category.

Spec a machine and that distinction decides what you pay. The 128GB of ordinary
DDR5 you want under a Houdini sim cache is not being fought over by the same
buyers as the low-power mobile stack. Handhelds, phones and headsets are,
because that is where the fast LPDDR5X goes, and it is the one bin Chen concedes
is genuinely tight.

Which lands awkwardly next to Valve. The reason [the Steam Frame came out at
$1,059](/blog/steam-frame-1059-ram-market/) is the 16GB of unified LPDDR5X
feeding its Snapdragon — exactly the bin Chen concedes is tight. Of all the ways
to be unlucky with a bill of materials, building your product on the one part
the squeeze is genuine in has to be the most expensive.

## Acer buys memory, so read the forecast accordingly

An OEM talking down the price of its second-largest input is doing something for
itself, and it would be silly to pretend otherwise. Chen has every reason to
want Samsung's next quote to arrive softer.

What makes the forecast worth reading anyway is that it is not a happy one. His
numbers have PC prices rising another 5% to 20% through the end of this year,
flattening across the first half of 2027, peaking around the middle of it, and
only then starting to come down. Somebody talking purely for effect would have
promised relief in March. Fifteen months of pain followed by a slow decline is
what a buyer says when he thinks he is describing the shape of the thing.

## The Hefei part

The other event of the week sits underneath all of this. On 20 September, CXMT
said its fifth-generation DRAM platform had entered mass production in Hefei.
The claims: 11.95nm spacing between features in the memory-cell area, a high-k
dielectric metal gate process adapted to DRAM, and at least 50% more gross dies
per wafer than the previous platform measured on an 8-gigabit part. Two LPDDR5X
products at 24Gb were shown, half again the capacity of the outgoing generation.
Wafer output is meant to go from roughly 300,000 a month now to about 375,000 by
the end of the year.

Every one of those figures is CXMT's own and none of it has been independently
measured. Dies per wafer is a yield claim dressed as a geometry claim, and yield
is the number companies are least honest about. Treat 50% as a direction.

The direction is the point, though. Chen told Digitimes that Chinese supply is
disruptive to pricing, which is a careful way of saying that a fourth supplier
selling into the commodity end breaks a three-way roll call. CXMT only has to be
available — in the commodity parts nobody wants to build because HBM pays better
per wafer, and in enough volume that one of the three has to work out whether
holding the line is worth losing the socket.

## What it costs the rest of us

Memory prices land on anyone whose job is filling memory. They
set the ceiling on the mainstream card, and the mainstream card sets the texture
budget you author to. A 32GB DDR5-6000 kit that sat near $100 late last year has
been widely reported around the $400 mark this year — I have not been able to
pin that to a single primary source, but nobody who has bought RAM in 2026 will
find it surprising.

The knock-on shows up in odd places. That ReShade trick for [handing the DLSS 5
neural pass to a second GPU](/blog/dlss-5-neural-rendering-second-gpu-offload/)
worked beautifully on two RTX 5060 Ti 16GB cards, and what it costs to try is
now mostly 32GB of GDDR7 at 2026 prices rather than two mid-range dies. Clever
architecture keeps running into the bill of materials.

And if the mainstream card stays at 8GB through 2027 because GDDR7 is too
expensive to be generous with, then the budget an environment artist works to
does not move for another two years either. Streaming pools, virtual texturing,
the mip you ship versus the mip you authored — all of it stays pinned to a
number that was set by a fab allocation decision in 2025.

Chen's date to watch is mid-2027. Mark it, and see whether the three of them are
still reading from the same sheet by then.
