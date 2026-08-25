---
title: CD Projekt Red just told you 2028 for The Witcher 4. The number underneath it is 500.
date: 2026-08-25
category: Games
author: ruben-castellani
excerpt: CD Projekt Red confirmed The Witcher 4 is targeting a 2028 release, its first game built on Unreal Engine 5 instead of the studio's own tech. The headcount attached to that update is the more useful number.
cover: /img/blog/witcher-4-2028-unreal-engine-transition-cost/cover.svg
---

Joint-CEO Michał Nowakowski posted a short update on 24 August: The Witcher 4
is "targeting" a 2028 release. He said it could slip. Coverage across the
usual outlets ran the headline as a release-window story, which is fair —
it's the first number CD Projekt Red has put on this game's launch since the
teaser in 2022.

The more informative detail sat one line further down: over 500 developers
are working on it, and this is the first CD Projekt Red game built on
Unreal Engine 5 rather than the studio's own REDengine.

## Why "targeting" is doing real work in that sentence

REDengine was written in-house, for CD Projekt Red's own open-world RPGs,
tuned over three console generations to the specific things this studio's
games do: dense narrative branching, hand-placed world detail at Witcher-3
density, a rendering pipeline nobody outside Warsaw had to learn from
scratch. Every artist and engineer on the last three Witcher games and
Cyberpunk 2077 already knew where the levers were.

Unreal Engine 5 is a different toolset with different defaults, and
"targeting" is the word a studio uses when it is still finding out how its
own production numbers translate into someone else's engine. World
Partition streaming behaves differently from a bespoke open-world system.
Nanite handles the foliage density Witcher games are known for, but not for
free — the June 2025 tech demo at Unreal Fest specifically called out
Nanite Foliage and the new Unreal Animation Framework as things the
partnership with Epic had to build up rather than switch on. MetaHuman
covers faces; it doesn't cover the mass AI crowd systems the same demo
showed running in the Kovir tech demo, which is custom work bolted onto the
engine, not a feature it ships with.

<figure>
  <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline from 2022 partnership announcement through the 2025 tech demo to the 2028 release target">
    <rect width="760" height="260" fill="#18011F"/>
    <text x="30" y="36" fill="#F4E9F7" font-family="Georgia, serif" font-size="17" font-weight="bold">Six years, engine to release</text>

    <line x1="60" y1="130" x2="700" y2="130" stroke="#5A1030" stroke-width="4"/>

    <circle cx="90" cy="130" r="9" fill="#D6294E"/>
    <text x="90" y="100" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="13" text-anchor="middle">2022</text>
    <text x="90" y="165" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">Epic</text>
    <text x="90" y="180" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">partnership</text>

    <circle cx="380" cy="130" r="9" fill="#D6294E"/>
    <text x="380" y="100" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="13" text-anchor="middle">2025</text>
    <text x="380" y="165" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">Kovir tech</text>
    <text x="380" y="180" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">demo shown</text>

    <circle cx="670" cy="130" r="9" fill="#B600A8"/>
    <text x="670" y="100" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="13" text-anchor="middle">2028</text>
    <text x="670" y="165" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">Target,</text>
    <text x="670" y="180" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">not a date</text>

    <text x="380" y="225" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">500+ developers now on the project, largest CDPR has run</text>
  </svg>
  <figcaption>Nothing here is unusual for an engine change at this scale — it's just rarely this visible, because most studios don't confirm the switch three years before launch.</figcaption>
</figure>

## What 500 developers on one open-world game actually means

That headcount is the number worth sitting with, more than the year. It's
larger than the credited team on The Witcher 3, and it's still growing
during what CD Projekt Red is calling pre-production-adjacent tooling work
rather than full production. Two things drive a number that size on an
engine the studio didn't write:

**Retraining, not just hiring.** A veteran environment artist who spent a
decade inside REDengine's material and streaming systems doesn't become
productive in Unreal Engine 5 by opening the editor. World Partition's
data-layer and HLOD workflow, Nanite's mesh-budget rules, Lumen's
indirect-lighting behaviour under an open sky — these are different enough
from a bespoke pipeline that the studio is effectively re-teaching its own
senior staff a discipline they already had, on top of bringing in people
who already know Unreal.

**Custom tooling on someone else's foundation.** The tech demo's crowd
system and the animation framework work Epic and CD Projekt Red did
together aren't small side quests — they're the studio rebuilding the
specific capabilities REDengine already had, inside a new engine, before
full production can lean on them. That work doesn't show up in a trailer.
It shows up as months added to a schedule with nothing new to demo, which
is exactly the gap between the June 2025 tech demo and this week's
"targeting 2028" update.

None of this is a knock on the decision to move to Unreal Engine 5 — sharing
tooling with the rest of the industry, tapping an engine that gets fixes
and hardware support CD Projekt Red doesn't have to fund alone, is a
reasonable trade for a studio that just spent years patching Cyberpunk
2077's launch problems on its own dime. But a reasonable trade still costs
what it costs, and the 2028 target is the studio pricing that cost out loud
for the first time.

## What to watch instead of the date

The date will move; Nowakowski said as much. What won't lie is whether the
next public showing is still tech-demo footage — a curated slice built to
prove the engine can do the job — or the first uncut gameplay built inside
whatever tools the 500-person team has actually finished. That's the tell
for whether the transition is behind them or still the thing eating the
schedule. Gamescom 2026 isn't it: CD Projekt Red is showing The Witcher 3
expansion there instead, which on its own says the Witcher 4 build isn't
ready to stand next to a live audience yet.

---

*Release-window and headcount details from CD Projekt Red's 24 August
statement, as reported by Push Square, Shacknews, GameRant and PlayStation
LifeStyle. Engine and tech-demo details from CD Projekt Red and Epic
Games' joint presentation at Unreal Fest and State of Unreal 2025.*
