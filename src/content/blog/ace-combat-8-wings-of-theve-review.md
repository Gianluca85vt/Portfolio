---
title: "Ace Combat 8 review: superb flying, rough on PC"
date: 2026-09-30
category: Games
excerpt: Eight verdicts average 9.0 and Steam still reads Mixed. A 150GB install for a PS2-era bonus and a memory leak past 20GB are doing the damage.
cover: /img/blog/ace-combat-8-wings-of-theve-review/shot-01.jpg
reviewOf: "ACE COMBAT 8: WINGS OF THEVE"
score: 9
verdict: "Project Aces' strongest entry in 25 years: melodrama, a soaring score, and dogfights staged like set pieces. The flying is superb. The PC build ships with a memory leak and a 150GB install attached to a PS2-era bonus."
scoreSources:
  - outlet: PSX Brasil
    score: 10
  - outlet: PC Gamer
    score: 9.2
  - outlet: Forbes
    score: 9
  - outlet: Destructoid
    score: 9
  - outlet: Hardcore Gamer
    score: 9
  - outlet: GRYOnline.pl
    score: 9
  - outlet: GameSpot
    score: 8
  - outlet: TechRaptor
    score: 8
sources:
  - outlet: GameSpot
    url: https://www.gamespot.com/reviews/ace-combat-8-is-utterly-absurd-and-better-off-for-it/
  - outlet: Kotaku
    url: https://kotaku.com/an-ace-combat-8-wings-of-theve-pc-pre-order-bonus-snafu-has-fans-pissed-off-enough-to-tank-its-steam-reviews-2000738328
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/sim/ace-combat-8-steam-reviewers-are-steaming-mad-about-its-pre-order-bonus-not-being-a-standalone-app/
  - outlet: KitGuru
    url: https://www.kitguru.net/gaming/mustafa-mahmoud/ace-combat-8-wings-of-theve-is-the-highest-rated-entry-in-25-years/
artistView:
  take: "The sky and the flight model are doing precisely what this series exists for, and the build wrapped around them looks like it was assembled against a hard date. Reading the complaint threads, the faults sit in packaging and memory management rather than in anything an artist made."
  works:
    - "Art direction: the cloud and weather work is the series signature and it still holds at speed — in the launch footage the volumetrics keep their shape through a barrel roll, which is exactly where cheap cloud solutions smear into soup."
    - "Mission design: reviewers describe set pieces staged as scripted geometry rather than open arenas, which is how you get a canyon run that frames correctly at 900 knots instead of a player who flies out of the shot."
  misses:
    - "Performance: players report RAM climbing past 20GB across a session, which reads as a streaming or pooling leak rather than a shading cost. An art budget that is simply too heavy shows up as a steady hit, not a climb."
    - "Build packaging: shipping Ace Combat 0 as DLC inside the main depot means a PS2-era game inherits a 150GB install footprint it has no use for."
---

Across the eight scored verdicts I could verify on 30 September 2026, ACE
COMBAT 8: WINGS OF THEVE averages **9.0**, from a range of 8 to 10. OpenCritic
had it at 88 from 45 critics the same day; Metacritic sat between 87 and 88 as
more reviews landed through the morning, which is the normal drift of an
aggregate still filling up. KitGuru's read is that this is the highest-rated
entry in the series in 25 years, with 2001's Ace Combat 04: Shattered Skies
holding first place at 89.

That is about as clean a critical result as a sequel gets. The Steam page tells
a different story, and it is worth separating the two things going on there,
because they have almost nothing to do with each other.

## Two separate complaints, one Mixed rating

The first is a packaging decision. Pre-orders include Ace Combat 0: The Belkan
War, a port of the PS2 entry. On console it installs as its own game. On PC it
arrived as DLC — it will not launch unless Ace Combat 8 is installed, and Ace
Combat 8 is roughly 150 gigabytes. Kotaku reported that an earlier version of
the Steam page described The Belkan War as "a standalone application separate
from" the full game, and that the page was later edited to match what actually
shipped. Anyone who bought it to play a 2006 game on a Steam Deck is now
looking at a 150GB prerequisite and no separate achievement list.

The second is performance. Players on the 29 September advance-access build
report RAM usage climbing past 20GB, crashes, and no support for third-party
flight sticks. Notebookcheck's round-up of those threads puts the practical
floor at 32GB of system memory. Reports from the Steam forums are inconsistent
in a specific way — some people on weaker hardware describe smooth sessions
while others on a 5090 describe stutter at maximum settings — and inconsistency
across similar configurations is the signature of a leak rather than a scene
that costs too much to draw.

Worth saying plainly: these are user reports from a store page during an
advance-access window, not a benchmark suite. Nobody has published frame-time
graphs yet.

## Why the 20GB number is the interesting one

A game that is too heavy for your machine behaves predictably. It is slow from
the first frame, it is slow in the same places every run, and it is slow in
proportion to what is on screen. Memory that climbs across a session behaves
differently: fine for twenty minutes, then progressively worse, and worst in
long missions. That pattern points at something not being released — streamed
assets, render targets, audio banks — rather than at an art budget nobody
costed properly.

It also explains the contradictory hardware reports. If the leak rate is roughly
constant, then the machine that survives is the one with headroom to absorb it,
and 32GB absorbs a lot more than 16. A 5090 with 16GB of system RAM will fall
over before a 3070 with 64. That is why the complaint threads read as noise
until you sort them by RAM rather than by GPU.

We watched the same shape play out five days ago, when [a 5090 cleared 60fps at
native 4K and still hitched its way through Silent
Hill](/blog/silent-hill-townfall-pc-stutter-shader-cache) — two distinct faults
wearing one symptom, and a patch only arriving once somebody separated them.

## The Belkan War decision is a build decision

The packaging complaint gets written up as a marketing failure. From a pipeline
seat it looks like something else: attaching The Belkan War to the main
application's build rather than giving it its own app ID and its own depot. That
choice is cheap at the time. One build, one set of scripts, one certification
pass, one store entry to maintain. It costs almost nothing until the moment a
customer wants the small thing without the large one, and then it costs
everything, because the dependency was baked in months before anyone asked the
question.

Bandai Namco can fix this. Splitting a depot is not hard. It is the kind of
work that gets scheduled after launch precisely because it was never scheduled
before it.

The memory leak is a better test of the studio. Project Aces built a game that
critics put in the top two percent of everything released this year, and shipped
it on PC with a fault that makes long missions worse the longer you fly them.
The question is whether that gets a patch and an acknowledgement or a quiet
month. Some publishers do own it — Activision [named shader compilation as its
own problem rather than the driver's](/blog/modern-warfare-4-shader-preloading-stutter)
in August, which is rarer than it should be.

<figure>
  <button class="video-embed" data-video="dSg_UP8irR0" data-title="Ace Combat 8 Is Utterly Absurd--And Better Off For it" type="button">
    <img src="/img/blog/ace-combat-8-wings-of-theve-review/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from GameSpot's Ace Combat 8 video review" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>GameSpot's video review. Their 8 is one of the eight verdicts in the average above.</figcaption>
</figure>

## What the critics are actually praising

The reviews are unusually aligned on what works, which is part of why the
average sits where it does. The flight model, the mission staging, the
orchestral score, and a plot that commits fully to its own melodrama instead of
apologising for it. GameSpot's headline calls the game absurd and says it is
better for being so, which is the correct reading of a series whose most famous
mission involves flying a fighter through a tunnel.

From a craft seat the thing to watch is the sky. Ace Combat has always spent
its rendering budget on weather rather than on surface detail, and it is a
sensible trade for a game where the ground is four thousand feet away and
moving. Clouds that hold their shape when you roll through them are expensive
and hard, and getting that right matters more to how this game feels than any
amount of panel-line work on the aircraft.

The flying, by every account, is the best it has been since the PS2 era. The
build around it needs another month.
