---
title: "RuneScape 4 in Unreal Engine: the MMO part is new"
date: 2026-10-06
category: Games
excerpt: Jagex revealed RS4 at RuneFest on 3 October. The move to Unreal happened already, with Dragonwilds — a persistent world on that stack is the untested bit.
cover: /img/blog/runescape-4-unreal-engine-mmo/shot-01.jpg
sources:
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/mmo/runescape-4-announced-at-runefest-full-mmo-sequel-started-as-expansion-to-survival-game-dragonwilds/
  - outlet: TechSpot
    url: https://www.techspot.com/news/114088-runescape-4-officially-works-started-dragonwilds-expansion.html
artistView:
  take: "The teaser is a CGI concept piece, so there is no RS4 renderer to judge yet — what can be judged is the choice behind it, and Jagex has already shipped a RuneScape game on this engine. Dragonwilds is the evidence, not the trailer."
  works:
    - "Pipeline: committing the whole studio to a stack it already shipped on removes the usual sequel risk, which is a team learning an engine and a game at the same time."
    - "Art direction: starting in Ashenfall means the new MMO inherits a landmass that has already been built, lit and tested in Unreal rather than a blank world."
  misses:
    - "Presentation: a pre-rendered teaser with floating islands and dragon combat sets an expectation no streaming MMO renderer has to meet yet, and that gap is where announcement footage usually gets quoted back at a studio."
    - "Scope: dragon-back traversal, as the teaser shows it, is the most expensive camera an MMO can offer — it moves fast, looks down, and asks for draw distance in every direction at once."
---

Jagex closed RuneFest in Birmingham on Saturday 3 October with a teaser for a
fourth RuneScape MMO. Working title RS4, because it is the studio's fourth
generation of the thing. No name, no platforms, no release window, and an
executive producer, Jesse America, describing it as very early. A few years
away, in Jagex's own wording.

The line that travelled was "built in Unreal Engine", and it travelled as if
RuneScape had just abandoned its own tech. That already happened. **RuneScape:
Dragonwilds** shipped 1.0 on 15 September this year, after a year and a half in
early access, and it was an Unreal Engine 5 game from the start — in development
since 2022. So the engine is not a new decision at Jagex. It is a decision with
a shipped game behind it.

<figure>
  <button class="video-embed" data-video="ZscPQbJ3UdE" data-title="RuneScape - Official 4th MMO Teaser Trailer" type="button">
    <img src="/img/blog/runescape-4-unreal-engine-mmo/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the RuneScape 4th MMO teaser trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The teaser, roughly 90 seconds, via IGN's upload — it is a trailer rather than a review or any kind of technical look. Reporting describes a town in a valley under floating islands, a rider on a dragon, and a three-headed dragon attacking. Pre-rendered concept work, not a capture of the game running.</figcaption>
</figure>

## How it became an MMO

The better detail in the reporting is where RS4 came from. It started as an
expansion for Dragonwilds, pencilled in for 2027, and became a full MMO after
playtesters kept asking for something closer to a traditional RuneScape.

That is a sequence worth sitting with, because it explains the engine choice
backwards. A team does not pick Unreal for RS4 and then build Dragonwilds to
practise. They built a co-op survival game in Unreal, found the appetite was for
a persistent world in the same place, and kept the tooling. The story begins in
Ashenfall — Dragonwilds' continent — during the Sixth Age, years after that
game's events.

Jagex has also said RS4 replaces nothing. RuneScape, Old School RuneScape and
Dragonwilds all keep running. For a studio whose last mainline game is over a
decade old, that is four live products on three different technology stacks,
which is a staffing problem long before it is a rendering one.

## Co-op survival and an MMO are different engineering

The Dragonwilds precedent is thinner than the headlines made it sound.
Dragonwilds is one to four players, or solo. Dedicated servers exist, and the
session is small and private. An MMO is hundreds of clients sharing one
authoritative world, with replication, interest management and persistence that
has to survive a decade of players digging at it.

Unreal does ship networking, and people have made it do large-world work. It is
also the part of Unreal that studios building MMOs have historically had to tear
into and rewrite, because the default replication model was designed around
shooter-sized sessions. Which is why "built in Unreal" tells you much less
about an MMO than it does about a single-player game. It describes the tooling.
The scaling work is its own project.

The art side inherits a related problem. RuneScape's visual language survives
because it reads at small sizes and at distance: strong silhouettes, flat colour
separation, a world you can parse while watching a skill bar instead of the
scenery. Unreal's defaults pull the other way, toward a photographic surface
response. Dragonwilds suggests Jagex can hold a stylised look on this engine.
Doing it with forty other players on screen, each with their own gear, is a
different test.

And then lighting. At MMO scale you are not lighting a level, you are lighting a
region that has to look right at every hour of a day cycle with an unpredictable
number of moving light sources in it. The Coalition only just got to
[hundreds of shadow casters on screen while holding 60fps](/blog/gears-e-day-megalights-shadow-casters/)
with MegaLights, in a corridor shooter on fixed hardware. An MMO has none of
those advantages — no fixed hardware, no fixed population, no corridor.

## Timing against Epic's roadmap

A project a few years out that starts in Unreal Engine 5 is a project that
lands near Unreal Engine 6. Epic has shown UE6, Verse is being positioned as
the gameplay language, and the migration will not be free. The useful read on
that is still that [UE5 skills are the ones worth having now](/blog/unreal-engine-6-dont-panic/)
— engine transitions arrive slowly and in pieces, and a studio mid-production
takes them on its own schedule. Jagex will likely ship on whatever UE5 has
become by then, with bits of 6 pulled in where they pay.

## The honest state of it

Confirmed: a fourth RuneScape MMO, working title RS4, Unreal Engine, set in
Gielinor beginning in Ashenfall in the Sixth Age, the whole studio on it, early
development, a few years out, and the three existing games continuing.

Not confirmed: the name, the platforms, any release window, business model,
subscription or otherwise, and anything at all about how it plays. The footage
shown is concept work. Nobody outside Jagex has seen the renderer.

---

*Announcement details, the RuneFest date and the Dragonwilds-expansion origin
from PC Gamer's and TechSpot's reporting on the reveal. Dragonwilds' 1.0 date
and its Unreal Engine 5 basis from Jagex's own store listing and the coverage of
that launch. Runtime of the teaser is as described in reporting; it had not been
possible to verify it directly from here.*
