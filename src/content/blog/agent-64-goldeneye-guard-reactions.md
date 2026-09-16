---
title: "How Agent 64 rebuilt GoldenEye's guard reactions"
date: 2026-09-16
category: Games
excerpt: Rare's N64 guards felt clever because of how they fell over. Agent 64 rebuilt the reaction animations and treats readability as the design goal.
cover: /img/blog/agent-64-goldeneye-guard-reactions/shot-01.jpg
draft: true
---

Shoot a GoldenEye guard in the arm and he drops his rifle. Shoot him in the leg and he goes
down on it. Shoot him in the chest and he folds backward with both hands over the wound,
takes a second, and gets back up if you let him. Every player who put hours into that game in
1997 remembers those guards as unusually smart, and almost nobody who says so is thinking
about what the guards were deciding. They are thinking about how the guards fell over.

Replicant D6, the solo developer behind Agent 64: Spies Never Die, spent years rebuilding
that feeling and talked to 80.lv on 15 September about how. The phrase from that interview
worth taking away is that he prioritised readability over intelligence in combat. That is the
correct order of operations, and most modern shooters run it backwards.

## The brain was never the point

Guards in GoldenEye respond to roughly four things: being shot, seeing you, seeing another
guard shot while that guard is in their line of sight, and hearing a gunshot nearby. That is
the sensory model. The behaviour layered on top ran as what the reverse-engineering community
named Action Blocks — the scripted per-character sequences that Mitchell "SubDrag" Kleiman's
GoldenEye Editor exposed as editable years before anyone had matching source. A guard walks
this patrol, and when input X arrives, runs routine Y.

Written out like that it sounds primitive, because it is. There is no flanking solver in
there, no cover scoring, no squad coordination model, nothing a modern AI programmer would
recognise as planning. What there is instead is an enormous amount of care spent on the
half-second after the input arrives.

That half-second is the entire interface. A guard's internal state is invisible; the player
can only ever see the animation. So the animation set has to carry the whole conversation —
noticed you, didn't notice you, hit in the shoulder, hit in the leg, panicking, reaching for
an alarm. Rare spent the budget on the output side, and the input side stayed four rules and
a script.

The [decompiled GoldenEye source that hit a byte-perfect match last
month](/blog/goldeneye-007-decompiled-what-it-reveals/) is useful here for a reason that has
nothing to do with PC ports. It preserves the constraint solving rather than someone's
memory of it. And the constraint on a guard was brutal: a few hundred triangles, textures
pulled through a 4KB cache, 320x240 on a CRT, fog eating the far half of the room. You cannot
read a face. You cannot read a weapon-ready posture from stance alone at that resolution.
Silhouette change and timing are the only two signals that survive the trip to the player's
eye, so both had better be doing real work.

## What readable costs you

Here is the trade nobody advertises. A genuinely clever enemy — one that picks good cover,
suppresses while a teammate repositions, retreats at the right health threshold — will do all
of that invisibly, and the player will read it as the enemy behaving randomly. I have watched
enough studio AI demos to know the tell: the programmer narrates what the agent is thinking
while the footage plays, because without narration you could not tell.

Agent 64 goes the other direction. Guards stagger according to where the bullet landed, roll
aside, rush you when you get close, and pile into each other often enough that a clean
breach turns into slapstick. Every one of those is legible from across a room with no
narration. Whether the underlying state machine is sophisticated is a question the player is
never asked.

<figure>
  <button class="video-embed" data-video="Rv16DzKQxtM" data-title="Agent 64: Spies Never Die - Launch Trailer" type="button">
    <img src="/img/blog/agent-64-goldeneye-guard-reactions/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Agent 64: Spies Never Die launch trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The launch trailer for Agent 64: Spies Never Die. It is a trailer, not a review — the guard reactions are easiest to see in the firefight sections rather than the cuts.</figcaption>
</figure>

The structural quoting goes deeper than the guards. The game's three difficulties are Agent,
Special Agent and 64 Agent, against GoldenEye's Agent, Secret Agent and 00 Agent, and like
Rare's they add objectives rather than only adding enemy health. That is the part of the
1997 design worth copying and the part most retro homages skip, because bolting extra
objectives onto a level means the level had to be built with the space for them from the
start. Difficulty as a content unlock.

Agent 64 shipped on 11 August 2026 on Steam, at around twenty dollars, from one person.

## The same argument, pointed at frame rate

Choosing legibility over fidelity is a decision artists make constantly and rarely get to
defend in public. [Orbitals animating its characters at 12 and 24fps on
purpose](/blog/orbitals-review/) is the same call made in a different department: step the
output down until the pose reads, then stop. Reviewers split three and a half points over
whether that was style or shortfall, which tells you how uncomfortable the choice still makes
people.

What the N64 shooters had going for them is that nobody could mistake the constraint for a
choice. Four kilobytes is four kilobytes. Now that the hardware will happily render a face
you can read, the decision to spend the animation budget on a leg buckling rather than on a
subtle micro-expression has to be argued for — and the argument is that the player is
standing thirty feet away, moving, and has about four frames to decide whether the man in
front of them has noticed.
