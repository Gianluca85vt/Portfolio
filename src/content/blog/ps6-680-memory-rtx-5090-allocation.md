---
title: "PS6 memory costs $680 and games aren't the buyer"
date: 2026-10-19
category: Editorial
column: Architectures of the Void — the Monday editorial
cover: /img/blog/editorial/cover.jpg
excerpt: Data centres outbid games for memory, and the bill lands on the card I render on and the console I build for. Memory breaks instead of bending.
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/ps6-ram-nand-costs-over-680-keplerl2
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/playstation-6s-memory-costs-alone-exceed-680-per-console-its-claimed/
  - outlet: Push Square
    url: https://www.pushsquare.com/news/2026/10/ps6-price-tag-facing-usd1000plus-nightmare-as-ai-data-centres-send-component-costs-soaring
  - outlet: The Register
    url: https://www.theregister.com/2026/01/06/memory_firm_profits_up_as/
  - outlet: TrendForce
    url: https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026
artistView:
  take: "Every other number on a spec sheet is a dial an artist can turn — fewer casters, a shorter LOD chain, one less bounce. Memory is the only one that is a yes or a no, which is why a memory shortage does not make the work slower, it makes some of the work impossible and the rest of it a negotiation. This week the shortage arrived on the authoring machine and the target platform in the same breath, and games were not the bidder that set the price of either."
draft: true
---

We've stopped buying memory. We're being handed what's left of it, which is a
different relationship with your own raw material entirely.

Three things landed in the same few days and the same decision sits under all
three. A hardware leaker put the PlayStation 6's memory and storage, between
them, at over $680 a console. Leaks say Nvidia has quietly stopped making the
RTX 5090 so its die can go to professional and data centre cards, which would
leave 24GB as the most memory you can buy on a GeForce. And Nvidia shipped a
revised DLSS 5 model that uses 20% less VRAM — a graphics feature whose selling
point is that it takes less of the thing.

One allocation argument. Three invoices.

## The itemised bill

KeplerL2, the leaker whose PS6 numbers VGC and Eurogamer both carried over the
weekend, puts the bill of materials near $760, up around $200 since March, with
memory and storage alone past $680 of it. The planned configuration is
reportedly 30GB. Push Square's reading is that a $1,000 console has stopped
being a scare number and started being arithmetic.

Treat all of that as a leak, because it is one. Sony has announced no console,
no spec and no price, and a NeoGAF post isn't a bill of materials.

The reason underneath it isn't a leak at all. TrendForce has conventional DRAM
up 55 to 60% in a single quarter and reckons AI will swallow close to a fifth
of global DRAM wafer capacity once you count what HBM and GDDR7 cost in
equivalent wafers. The Register had memory makers' profits climbing on a
projected 70% hike a year ago. IDC doesn't expect relief before the end of
2027. Consumer graphics memory is on limited allocation, which is a polite way
of saying somebody else goes first.

So the next console is dear for the same reason my next workstation is. Neither
price was set by anyone who has ever shipped a game.

## Where it breaks

Nearly every number on a spec sheet is a slope. Fewer shadow casters, a cheaper
reflection method, drop a bounce, let the LOD chain start a step earlier — turn
any of those dials and the frame gets cheaper by a percentage and uglier by a
percentage, and you spend a career learning which percentages a viewer
forgives. Lighting is mostly a negotiation about what nobody will look at.

Memory doesn't negotiate. The scene is resident or it isn't.

On the far side of that line you're not 15% slower. You're crawling across PCIe
for every texture fetch that got evicted, or the render is dead and the night
has gone with it. A scene a gigabyte over can lose a large fraction of its
speed, because what got pushed out is what's being touched constantly. A memory
ceiling is a wall. The wall is where your ambition for the shot stops.

Which is why 32 falling to 24 costs more than eight gigabytes. Eight gigabytes
is a 4K set on your hero assets, or the sim cache for a medium effect, or the
headroom that lets you keep working in the viewport while something renders
behind you. On a 32GB card none of those are decisions. On 24 they all are, and
decisions take meetings.

## The missing rung

The ladder used to have a rung in the middle. Below it, a consumer card you
could justify to yourself. Above it, a workstation card with ECC and three
times the memory for four to six times the money. The 5090 sat between them,
did most of what the expensive one did, and cost a quarter as much — which is
why every freelancer I know who renders on a GPU either owns one or wanted one.

Take it out and the ladder is a consumer card and an invoice. Nothing between
them. The thing you're asked to buy on the far side of the gap isn't priced for
a person; it's priced for a company that bills the render.

And look where the 5090 is going. The same silicon, sold into a market that
pays more for it. There's no villain in that; it's what any of us would do with
a wafer we could sell twice. It does mean the hardware an artist works on is
now the leftovers of a business with no interest in art, and leftovers aren't a
roadmap you can plan a studio around.

## Lodgers

Then the software turns up, in the middle of all this, with its hat in its
hand.

The revised DLSS 5 model is around 118 million parameters, down roughly 24%
from the September version, and Nvidia says it costs about half the GPU
overhead and 20% less VRAM at 4K. Those are the company's own figures and
nobody outside has checked them. Take them at face value anyway, because of the
shape of the claim: the headline improvement in a graphics feature is now that
it occupies less of the resource that just got scarce.

A neural pass living in the frame buffer is a lodger in a flat that was already
too small. It wants its slice resident, permanently, while the scene wants all
of it. On a box that also has to hold a heavy environment for GPU rendering,
anything asking for resident memory is something you end up switching off — and
a feature artists switch off is one the platform holder eventually makes
mandatory, because the fidelity target was set assuming it was on.

The sequence is almost funny. Memory got scarce because of AI build-outs. The
fix being shipped into the gap is a smaller AI model. We're being sold a diet
by the people who ate the food.

## Nobody was bidding

For thirty years, consoles were how memory got cheap. A console generation
bought DRAM by the tens of millions of units and dragged the whole price curve
down behind it, and every artist in this industry has been living off that
subsidy without once thinking about it. The target spec went up every five
years because memory got cheaper every year, and the reason memory got cheaper
every year was partly us.

That has reversed, and nobody asked us. A console maker negotiating for 30GB a
unit is no longer the big customer in the room. It's a rounding error beside a
data centre order, and it gets the price a rounding error gets. Which means the
memory budget an art team will build against for the next decade — the hardest
constraint in the whole pipeline, the one that decides how big a level can be
and how many unique materials it can carry — was settled in a supply
negotiation where games had no seat. Nobody from here was in the room to lose
the argument.

We'll build inside it anyway. That's the job, and constraints have always been
where this craft happens: instancing properly instead of hoping, texture
streaming treated as a discipline rather than a checkbox. Honestly, a
generation of artists forced to be rigorous about memory will produce
better-engineered work than the last one managed, and I'm not going to pretend
otherwise.

There's still a difference between a limit you chose and a limit you were
dealt. The first is design. The second is weather, and no amount of craft makes
the weather yours. The constraints that shaped every game worth remembering
were set by people who were at least trying to make games. Ours are being set
by people who have never heard of us.
