---
title: Percy Jackson's sirens are crusted in barnacles, and sticking the barnacles on was the hard part
date: 2026-08-19
category: Film & TV
excerpt: Storm Studios just walked FMX through how they built the Sirens for Percy Jackson and the Olympians season 2. The monster design is the easy part to talk about. The actual problem was keeping barnacles glued to a performing creature.
cover: /img/blog/percy-jackson-sirens-barnacle-solvers/cover.svg
---

Storm Studios, the Oslo VFX house behind effects work on *The Last of Us*,
*Black Panther: Wakanda Forever* and *Star Trek: Strange New Worlds*, gave a
talk at FMX HIVE 2026 called **"Call of the Sirens: Percy Jackson S2,"**
also posted as a SideFX Houdini Talk. It walks through how the studio built
the Sirens sequence for *Percy Jackson and the Olympians* season 2 — and
underneath the monster-design headline is a problem I run into constantly
from the environment side of the fence: how do you dress a surface that also
has to act?

## The sirens got ugly on purpose

The Sirens show up in episode 5, "We Check In to C.C.'s Spa & Resort,"
which dropped on Disney+ and Hulu on **31 December 2025** as part of the
season's weekly rollout. The show's writers ditched the "beautiful woman
who lures you with song" version of the myth for something closer to the
source material's actual menace: humanoid creatures that read as living
rock, embedded in their environment and encrusted with barnacles, starfish
and seaweed. Grotesque rather than seductive. It is a good call for a show
that has spent two seasons trying to make Greek myth feel dangerous again
instead of decorative.

That design choice is also what makes the VFX problem interesting, because
"encrusted rock creature" is not one asset. It is an environment surface —
the kind of thing you'd normally scatter, dress and forget — that also has
to breathe, turn its head and deliver a threat.

## Dressing something that moves is a different job

Scattering barnacles, starfish and weed across a static rock is a solved
problem. Any environment artist has done some version of it: a scatter
system, some slope and cavity masking so the growth clusters in the right
places, a pass of hand-placed hero pieces where the camera lingers. It looks
right because a rock does not need permission from anything else in the
shot. It just sits there.

A performing creature does need that permission, from itself. The moment the
Siren's torso twists or its head turns to track a character, every barnacle
riding that surface has to move with it — correct orientation to the new
surface normal, no sliding across the skin, no popping as deformation
folds geometry in on itself around a joint. Storm's stated approach was
building **custom solvers to attach the barnacles procedurally**, which is
the right instinct: you do not want an animator or a look-dev artist
hand-placing thousands of encrustations across every keyframe of a hero
creature. You want a system that reads the deforming surface and keeps the
dressing glued to it, shot after shot, revision after revision, without
anyone re-touching it by hand.

I have solved smaller versions of this same problem — geometry scattered
across a mesh that then gets deformed — and the failure mode is always the
same one: the dressing looks great on the T-pose and falls apart the second
the surface actually does something. A solver built for this has to survive
motion, not just survive a screenshot.

## The part that's easy to miss: the performance has to survive the solver

The talk's other headline term is **animation-guided simulation** — sims
that ride on top of the keyframed or captured performance rather than
replacing it, specifically so the creature keeps its "lively, mythical
presence" instead of going stiff under a layer of secondary effects. That
phrase is doing a lot of work. Any time you bolt a simulation onto a
performance — cloth, muscle, jiggle, in this case an entire crust of rock
and shell — you risk the sim reading as the dominant layer and the acting
underneath disappearing. The eye stops watching the actor's timing and
starts watching the wobble.

Keeping barnacles procedurally stuck to a moving body is only half the
problem Storm was solving. The other half was making sure that solving it
didn't cost them the performance they built it on top of. Storm has also
talked about procedural workflows letting them iterate fast from design to
final shots — which matters more on a sequence like this than on a hero
creature you lock early, because a design this unusual almost certainly
went through several passes before "grotesque rock woman" read as scary
instead of silly on screen.

## Worth remembering it's not one studio's show

Season 2's Sirens sequence is Storm's, but the season's VFX credits also
list ILM, Important Looking Pirates and Raynault VFX, the last of whom
reportedly delivered something close to 250 shots of digital environments,
set extensions and magical effects elsewhere in the run. A Disney+ fantasy
show aimed at a young-adult audience is routinely running a four-studio
pipeline now, each vendor solving a different piece of the same mythology.
The barnacle solver is a small, specific piece of that — but it's the kind
of small, specific piece that decides whether a monster reads as built or
as grown.

---

*Sourced from Storm Studios' "Call of the Sirens: Percy Jackson S2" talk at
FMX HIVE 2026, cross-posted as a SideFX Houdini Talk, plus season 2 VFX
credit reporting from The Art of VFX. The cover art on this page is an
original graphic made for this piece, not a production still.*
