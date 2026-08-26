---
title: What Warren Spector's levels did with space
date: 2026-08-19
category: Games
excerpt: The Deus Ex and System Shock designer announced his retirement after 44 years. The tribute pieces are covering the CV — I want to talk about why immersive sim spaces are still the hardest thing an environment artist can be asked to build.
cover: /img/blog/warren-spector-retirement-immersive-sim-environments/shot-01.jpg
---

**Warren Spector announced his retirement from game development on 18 August**,
in a LinkedIn post covered same-day by Time Extension, Kotaku, GameSpot,
GamesRadar+ and Game World Observer, among others. He's 70, cites age and
health catching up with him, and says plainly that "it's just not as much fun
for me anymore." He's not slamming a door — he mentions consulting, lecturing,
writing, and getting his piano chops back — but after 44 years he's done
shipping games.

The CV is the part every obituary-shaped piece leads with, so I'll keep it
short: **Ultima VI and Underworld** at Origin, **System Shock** at Looking
Glass, **Deus Ex** and **Thief: Deadly Shadows** at Ion Storm Austin, later
Disney Epic Mickey. He didn't invent the immersive sim single-handedly — Looking
Glass was a team, and Doug Church and Ken Levine are as central to that lineage
as he is — but Spector is the one who kept saying out loud, in interviews and
postmortems, *what the genre was actually for*. That's the part I want to talk
about, because it's a level-design and environment-art problem before it's
anything else, and it's still not solved.

## The pitch was never "more freedom." It was "the world remembers."

<figure>
  <img src="/img/blog/warren-spector-retirement-immersive-sim-environments/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Deus Ex via its official Steam page; Warren Spector at GDC 2017, via Wikimedia Commons</figcaption>
</figure>

Spector's own framing, repeated across two decades of talks, is that a designer
should act like a tabletop game master: build the rules and the pressures, then
respect the player who tries something you didn't script for. The test isn't
whether the player *can* go somewhere unexpected. It's whether the space
*acknowledges* that they did — a guard's patrol route shifting because a body
went missing, a vent that was always there once you think to look up instead of
forward.

That second half is the hard part, and it's squarely an environment art and
level design budget problem, not a narrative one. A scripted setpiece needs one
version of a room: the one the camera sees. A Deus Ex-style multi-route space
needs every version simultaneously live — the vent route, the hacked-door
route, the social-engineering route, the loud route — built, lit, and tested as
though each were the main path, because for some fraction of players it is. You
can't fake redundancy the way you can fake a skybox. Either the alternate route
exists as real geometry with real collision and real lighting, or the promise
of choice is a lie the first time someone tries it.

## Why that's more expensive now than it was in 2000

Deus Ex got away with this partly because its rooms were, by current standards,
small and geometrically cheap. A vent shaft was a tube with a texture on it. In
2026, an equivalent space ships with baked or real-time GI, physically based
materials per surface, and a texel density budget that assumes most of what's
built gets seen head-on in a trailer. Building three redundant paths through a
room used to cost three sets of blockout and scripting. Now it costs three sets
of blockout, scripting, lighting passes, and asset variation — because a vent
nobody was "supposed" to use still has to hold up at the fidelity the rest of
the game promises.

That's the real reason full immersive sims are rare and mostly small-team or
retro-styled now (Peter Molyneux's genre-adjacent stuff aside, look at how much
of the recent wave — Dishonored's spiritual successors, the Prey reboot,
Underworld Ascendant, Spector's own last credited project — either shrank in
scope or struggled to ship on schedule). The design philosophy still works, but it assumes every room is built at least
three times over, and modern production budgets one build per room and hope the
scripted path covers it.

## What I'd actually take from this

The lesson for anyone doing environment work today is that
"immersive" was never about density of detail — it was about a space that
stays true under player behavior nobody explicitly designed for. That's a
cheaper trick than full multi-route level design: reactive lighting states,
destructible or moveable set dressing, NPCs that path around a mess the player
made instead of ignoring it. Half-measures like that are how a handful of
recent games (Baldur's Gate 3's environmental interactivity is the obvious
current reference point, even outside the immersive sim lineage proper) get a
sliver of that "the world remembers" feeling without needing a Looking
Glass-sized simulation budget.

Spector spent 44 years arguing that a level is a promise to the player, not a
camera path. Whoever picks that argument back up is going to be doing it with
render budgets he never had to plan against.

---

*Retirement details from Warren Spector's 18 August LinkedIn post, as reported
by Time Extension, Kotaku, GameSpot, GamesRadar+ and Game World Observer.
Design-philosophy framing draws on his own recurring public talks and
interviews over the years, not a single source.*
