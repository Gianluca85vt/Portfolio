---
title: "Console prices hit $900 and nobody lowered the target spec"
date: 2026-10-12
category: Editorial
column: Architectures of the Void — the Monday editorial
cover: /img/blog/editorial/cover.jpg
excerpt: US console sales are at their worst since the 1980s and a PS5 Pro costs $900. The fidelity target the art teams build against has not moved an inch, and reconstruction is what is covering the difference.
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/console-gaming/console-market-craters-as-xbox-sales-crash-33-percent-to-the-lowest-since-launch-25-years-ago-ps5-sales-drop-25-percent-steep-price-hikes-push-series-x-to-usd800-and-ps5-pro-to-usd900
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/us-console-hardware-market-at-its-most-precarious-position-since-the-80s-says-circana/
  - outlet: GameSpot
    url: https://www.gamespot.com/articles/gears-of-war-e-day-hows-it-selling-lets-unpack-things/
  - outlet: Push Square
    url: https://www.pushsquare.com/news/2026/10/playstation-hardware-sales-hit-lowest-point-since-2013-in-us-and-ps5s-price-is-the-problem
  - outlet: Ars Technica
    url: https://arstechnica.com/information-technology/2026/10/pc-shipments-fall-20-1-percent-in-sharpest-decline-since-q1-2023/
artistView:
  take: "A target spec is a contract between a lighting budget and a machine, and this generation broke the machine's side of it quietly, over five years, one price rise at a time. The art did not get cheaper to make because the box got dearer to buy. What happened instead is that the internal resolution went down and a network was hired to lie about it convincingly, which works, and which is not the same thing as the frame we signed off."
---

I have never once been handed a target spec that went down.

Up, yes. Sideways, constantly — a platform added in month nine, a handheld
nobody mentioned at kickoff. But the machine the art gets built against only
ever improves on paper, and the schedule only ever shortens, and both of those
are settled in rooms where nobody has to bake anything afterwards. This week
the market said the other half of it out loud, in numbers, and the two halves
do not fit together at all.

Circana's US figures through August put PlayStation hardware units down 25 per
cent year on year — the worst position PlayStation has held since 2013, when a
tired PS3 was waiting to be put out of its misery. Xbox hardware is down 33
per cent, an all-time low across the twenty-five years the brand has existed.
Circana's own reading is that the US console market is in its most precarious
state since the 1980s, which is a comparison to an actual crash. The average
selling price of a PlayStation 5 is now close to $600. A Series X is $750
digital and $800 with a drive in it. A PS5 Pro is $900.

The target spec did not move.

## The ratchet

Microsoft has put the price of an Xbox up three times in two years: $100 onto
the 512GB machines, $150 onto the 1TB ones, and the 2TB model taken off the
board entirely. Sony never did the mid-generation price cut that every previous
PlayStation got. A PS5 costs more in 2026 than it did in 2020, and you could
not have written that sentence about any console before this one.

The reason offered is the chip shortage, and the chip shortage is real. It is
also not a thing anybody blocking out a level is told about.

Here is what a price rise turns into once it leaves the press release. It
becomes an install base. The install base becomes a forecast, the forecast
becomes a budget, and the budget lands on the art team as a schedule. Only as
a schedule. The spec stays exactly where it was, because the spec was agreed
the day the trailer was approved, and nobody reopens a spec — the spec is the
promise, and the schedule is the thing with give in it. So you get less time to
hit the same number for a machine fewer people own, and the people who decided
each of those three things decided them separately and never met.



PC is not the escape hatch either. Omdia has Q3 shipments down 21.2 per cent
year on year to 58.1 million machines, the sharpest fall since the start of
2023, desktops down 23.5 per cent. Memory and silicon are expensive everywhere
at once. Every platform the work targets is contracting, and the work is being
specced as though all of them were about to double.

## Hundreds of casters

Gears of War: E-Day is the first shipping game built on Unreal's MegaLights,
and I wrote last week that it is the most interesting lighting work to ship
this year. I still think so. A scene that used to allow roughly three shadow
casters in view now runs hundreds of them, which retires an arithmetic that
lighting artists have been carrying since 2006. Watching a vehicle headlight
behave like a light instead of a glowing quad is genuinely moving if you have
ever had to fake one.

Then look at what it cost and where it landed.

Digital Foundry reports frame-time spikes on Series X and short stalls on
Series S, which has the same lighting complexity to resolve on a far smaller
budget. On PC only a 5090 clears native 4K60 — a card that costs more than the
console it is supposed to embarrass. And Alinea's estimate has E-Day at around
230,000 copies sold, 168,000 of those on Steam and 62,000 across Xbox, against
1.7 million people who took it through Game Pass. Add the 722,000 who paid $30
for the early upgrade and roughly 950,000 people gave Microsoft money, for
about $37 million. The analyst's word for that was "soft".

So the flagship rendering technique of the generation resolves correctly on one
graphics card, in a game that sold a number you could hide inside a mid-size
Steam sale, on a console whose sales are at a twenty-five-year floor. The
technique works. The team shipped it and the footage is the proof. What failed
is the arithmetic above it, which sized the ambition against a market that was
growing in a slide deck.

## Eight sixty-four

On 1 October Sony announced QSSR and put it on the base PS5. Digital Foundry
measured 1.5 to 1.8 milliseconds to reconstruct Marvel's Wolverine from 864p
to 1440p.

Eight hundred and sixty-four. Five years into the machine's life, on the box
most people bought.

Reconstruction is good engineering. I have no argument with the technique.
What it is being asked to do here is hold a fidelity target the hardware never
had the headroom for, and then be described as a feature. A one-pixel leaf
edge at 864p is a shimmering dot before any network touches it. Thin railings
crawl. The reconstructor does an extraordinary job of inventing something
stable out of that, and what it hands back is a plausible frame rather than the
frame the environment artist composed. The 1.8ms is not free either —
on a fixed box a tenth of a 60fps frame comes out of shadow resolution, draw
distance, or the internal resolution itself, which is the one that started this.

DLSS 5 ran on Duke Nukem and Pong this month, with no 3D scene underneath to
guide it, and it produced something. Hold both of those thoughts at once:
the reconstruction stack is now strong enough to hallucinate detail into a 1991
sprite, and it is being deployed to make a 2026 console hit a number set in
2020.

## Scoping, as a verb

One team this month did the other thing.

Fuse fixed the vehicle physics tick in Star Wars Galactic Racer at 60Hz and
made 60fps the floor on every machine the game ships on, Series S included.
A 60fps floor on the weakest box means the art budget was written around the
weakest box, three years out, and then defended every time somebody wanted one
more light. The
reviews land their hits on the environment art rather than the handling,
because the handling is the part that got protected by a decision made early.

Call it restraint if you want. What it took was authority — somebody deciding
what the machine could do, writing it down, and holding that line for three
years while people asked for one more light. Everything above about rework and
reconstruction is what happens when nobody is allowed to make that call until
the schedule makes it for them.



## Who signs it

A $900 console and an 864p internal resolution are the same decision, filed
under two different departments. Somebody chose to keep the price up and the
promise up, and the only slack left in the system was the picture itself, so
the picture is what got spent. Nobody signed a document saying that. It
happened the way these things always happen, which is that three reasonable
people optimised three separate columns and the bill arrived at the end of the
pipeline, where the art is.

I would rather build for an honest machine than a flattered one. Tell me the
box is $900 and the audience is shrinking and the budget is what it is, and I
will light something beautiful inside those walls — that is the job, and it has
always been the job. What I cannot do is hit a number that was set when
the market was a different shape and then pretend the upscaler closed the gap.

A generation that only looks the way it was promised on hardware nobody is
buying any more is a demo reel with a release schedule attached.
