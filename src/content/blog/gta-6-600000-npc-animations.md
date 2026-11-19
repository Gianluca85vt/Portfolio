---
title: "GTA 6's 600,000 animations: a headcount problem"
date: 2026-11-19
category: 3D
excerpt: Rockstar says GTA 6 carries over 600,000 NPC animations, almost eleven times GTA 5's count. Someone had to art-direct every one of them.
cover: /img/blog/gta-6-600000-npc-animations/shot-01.jpg
sources:
  - outlet: TechRadar
    url: https://www.techradar.com/gaming/rockstar-reveals-it-built-a-gta-6-team-that-focused-solely-on-creating-more-realistic-npcs-with-over-600-000-animations-twice-as-many-as-red-dead-redemption-2-had
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/grand-theft-auto/thanks-to-a-dedicated-team-art-directing-every-single-npc-gta-6-has-over-10-times-as-many-unique-animations-as-gta-5/
  - outlet: 80 Level
    url: https://80.lv/articles/rockstar-created-about-600-000-animations-for-npcs-in-gta-6/
artistView:
  take: "Six hundred thousand clips is a number you reach by hiring, not by solving. Every one of them had to be authored, named, tagged, reviewed and fitted into a streaming budget, and the phrase Rockstar keeps repeating — that each was art-directed — is the expensive half of the sentence."
  works:
    - "Animation: reviewers describe passers-by with weight and intent rather than the looping idle-and-walk pairs most open worlds run, which is what a library this size is for."
    - "Pipeline: splitting NPC work off to a dedicated team with its own writers and directors treats background characters as authored content, and that is the only org shape that gets you past a few thousand clips."
  misses:
    - "Pipeline: a library eleven times the size of GTA 5's is eleven times the search, retarget and review surface, and nothing published so far explains how Rockstar keeps a clip findable at that scale."
    - "Performance: all of it lands on the same CPU frame that already holds traffic, physics and two live protagonists, which is a large part of why there is no 60fps mode on any console."
draft: true
---

Six hundred thousand animation clips. That is what Rockstar says is sitting
inside Grand Theft Auto VI, which went on sale today, 19 November 2026, on PS5
and Xbox Series machines.

Put it next to the studio's own back catalogue and the shape of the thing shows
up. GTA 5 shipped with about **55,000**. Red Dead Redemption 2 had roughly
**300,000**. GTA 6 has over 600,000 — twice Red Dead's library and close to
eleven times GTA 5's.

The figures come from Aaron Garbut, co-head of Rockstar North, in an interview
with The New York Times published around the Extended Look in late August. They
were not announced this week; they have been resurfacing all through launch as
people go looking for a number to explain what they are seeing. I have not read
the NYT piece directly — it sits behind a paywall I could not get past — so
everything attributed to Garbut here comes through the outlets that did, and
they agree with each other on the counts.

<figure>
  <img src="/img/blog/gta-6-600000-npc-animations/shot-02.jpg" loading="lazy" width="1600" height="900" alt="Jason and Lucia from Grand Theft Auto VI, in an official Rockstar press screenshot" />
  <figcaption>Official Rockstar press screenshot. The two protagonists get the attention you would expect. The argument here is about everyone standing behind them.</figcaption>
</figure>

## The expensive word is not "600,000"

Garbut's line, as quoted everywhere since August, is that Rockstar
"art-directed each individual one of them."

That is the sentence to stop on. A large animation count on its own is not
especially hard to reach — procedural variation, randomised playback speeds,
layered additive noise on a base loop, and a few hundred source clips will
generate you a very big number to put in a press release. Studios do this. It
is a reasonable technique and it is how most crowds in most games work.

Art-directing each one is a different activity entirely. It means a person
looked at the clip, had an opinion about it, and either kept it or sent it back.
At 600,000 clips that is not a technical achievement so much as an
organisational one: you are describing a review pipeline that someone had to
staff, schedule and keep running for years without it collapsing into a folder
nobody can search.

Divide it out. Red Dead Redemption 2 shipped on 26 October 2018. That is 2,946
days to today. Six hundred thousand clips across that span is **a little over
200 a day, every day, weekends included, for eight years.** The real curve was
nothing like flat — that is a back-of-envelope figure, not a production
schedule — but it gives you the order of magnitude, and the order of magnitude
is a building full of animators.

Which is roughly what Rockstar did. The reporting around the same interview says
the studio stood up a new Los Angeles team of writers, directors and producers
pointed specifically at NPCs. Writers. For background characters.

## What a clip costs after it exists

Anyone who has worked on a library this size knows the authoring is only the
first bill.

A clip has to be named in a scheme that survives six years of people leaving.
It has to be tagged well enough that an animator in another timezone can find
it instead of making a ninth version of the same thing. It has to be retargeted
onto every skeleton that might play it, and the moment you have more than one
body type — adults, children, the heavier builds Rockstar has shown in Vice City
crowds — that multiplies. Then it has to fit a memory budget, because 600,000
clips do not live in RAM at once. Something decides what streams in as you walk
down a street and what gets evicted behind you.

None of that is glamorous and all of it is where the money goes. We wrote about
the same economics from the other end a few weeks back, when Blizzard rebuilt
its classic character models and found that [the rig, not the mesh, is where
the cost sits](/blog/wow-forever-classic-models-rig/). Scale that argument up by
three orders of magnitude and you have Rockstar's problem.

I would like to tell you how they solved the search-and-dedup side of it.
Nothing published so far says. The detail in the coverage is all about outcomes
— sweat that responds to exertion, voices that carry on the wind, NPCs with
personality traits weighted by demographic and profession — and almost none of
it about tooling. That gap is the piece I actually want to read, and it will
probably take a GDC talk in 2028 to get it.

## It all has to tick

The runtime side is where this stops being an art-department story.

Every one of those clips is selected, blended and advanced by something on the
CPU, alongside traffic routing, vehicle physics, police coordination and a
second protagonist running combat behaviour next to you. That is the frame
budget Rockstar has been defending for a year, and on 18 November it published
the table that settles the argument: [PS5 and PS5 Pro both render at native
1440p](/blog/gta-6-30fps-ps5-pro-same-1440p/), with the Pro's extra silicon
spent on reconstruction and shadows rather than frames. A bigger GPU draws the
same simulation faster. It does not make the simulation tick twice.

So the animation library and the 30fps lock are the same decision seen from two
sides. You can have a street where four hundred people each have somewhere to
be and a gait that belongs to them, or you can have sixty frames. On this
hardware, in 2026, choosing both was never on the table.

Bloomberg's reporting on the game's development, which I have also only read
second-hand, says the sheer volume of NPC work was among the things that pushed
the schedule. Treat that as reported rather than confirmed. It is at least
consistent with the arithmetic: if you commit to hand-directing every clip in a
library that size, the date moves when the animators say it moves.

There is a version of this industry where that number gets generated overnight
and nobody looks at any of it. Rockstar took thirteen years and hired a city.
Both approaches produce a big figure for the press release. Only one of them
produces a pedestrian who looks like she is late for something.
