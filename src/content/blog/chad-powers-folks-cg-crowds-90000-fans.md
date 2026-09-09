---
title: "Chad Powers VFX: 90,000 fans in 600 shots"
date: 2026-09-09
category: Film & TV
excerpt: Folks was the sole VFX vendor on Chad Powers season one — more than 600 shots, three stadiums rebuilt or extended, and stands holding 90,000.
cover: /img/blog/chad-powers-folks-cg-crowds-90000-fans/cover.svg
draft: true
---

Folks put out its breakdown for *Chad Powers* season one this week, a few days after season two dropped all six episodes on Hulu on 3 September. Three numbers carry it: one vendor, more than 600 shots, and stands holding upwards of 90,000 people.

Six hundred shots handed to a single studio is a lot of trust for episodic comedy. It also tells you the show's problem was structural rather than spectacular. There is no creature here, no city falling over. Just a stadium. It has to be full, over and over, for a season of television.

## What "practical sprites" is doing in that sentence

The studio's own summary lists the ingredients as CG environments, practical sprites, crowd simulations and compositing. That third-from-last phrase is carrying most of the weight.

A sprite in a stadium context is a photographed human on a card. You shoot real extras — on a stage, in a corner of a real stand, sometimes against blue — cut them out, and place them in the seats as flat planes angled toward camera. Each one is two triangles and a texture. A crowd simulation with articulated agents costs you a skeleton, a solver step and a draw call per person; sprites cost you almost nothing per person, which is the only reason a number like 90,000 is sayable out loud.

So the crowd gets tiered by distance. Near the rail, where a long lens can resolve a face, you want real extras in the plate or full CG characters with proper animation. Mid-bowl, sprites with a handful of filmed variations, shuffled and re-lit. Far side, sprites so small they are effectively coloured noise with the right value range. Most of your 90,000 live there.

The failure mode here is **repetition**: the eye is extremely good at spotting the same red jacket four seats apart, and a tiled crowd reads as wallpaper the instant it does. Most of the craft in a stadium fill is in the shuffling — varying costume, pose, scale and, above all, the timing of when each card moves.

## Building the bowl instead of booking it

Folks' work ranged from extending real locations to building stadiums outright in CG, standing in for the Rose Bowl, Neyland and Sanford.

<figure>
  <img src="/img/blog/chad-powers-folks-cg-crowds-90000-fans/shot-01.jpg" loading="lazy" width="1440" height="810" alt="Aerial view of Neyland Stadium in Knoxville, packed for a game, with the checkerboard end zones visible" />
  <figcaption>Neyland Stadium, full on a game day. This is the reference a stadium build is measured against — the density, the gaps, the value range of a hundred thousand people from above. Photograph by Neomrbungle, Wikimedia Commons, CC BY-SA 4.0.</figcaption>
</figure>

Building a college stadium in CG for a comedy is the cheap option. A stadium that size exists in the state you need — packed, lit, loud — for a handful of hours a year, and those hours are spoken for. You cannot book Neyland on a Tuesday. What you can do is get a small unit in for plates, photograph everything, and rebuild it as an asset you can point a camera at whenever the edit demands. Once built, shot nine is nearly free.

That economics is the same argument [DNEG's 338 shots on *For All Mankind* season five](/blog/for-all-mankind-season-5-dneg-mars-continuity/) ran into from the other end: on television, continuity across a season costs more than the build ever does. A stadium has it worse than Mars, because everyone watching has seen the real one on a Saturday and knows what the light does at four in the afternoon.

## Crowds have to act

Here is where a stadium crowd stops behaving like a set dressing problem. A city crowd can idle. A sports crowd has to hit beats — rise on the snap, groan on the sack, erupt or go silent depending on which way the story needs the game to break. A simulation that only wanders produces a stadium of people politely ignoring the match, which reads as wrong immediately even to someone who could not tell you why.

Getting that right means the crowd is cut like performance, not generated like weather. Somebody is timing the wave of standing bodies against the ball.

The production had a genuine advantage there. Variety reported the team filming at a University of Georgia halftime, and Glen Powell has described the experience of a full stadium booing him on cue — Sanford being Georgia's own ground. Whether or not those plates ended up in the sprite library, being inside a real crowd reacting to a real thing gives you the reference that no amount of solver tuning replaces: how fast a stand actually stands, how ragged the edges of a reaction are, how many people never look up at all.

It is the same instinct behind Important Looking Pirates [lighting a 48-inch practical model ship for *The Mandalorian and Grogu*](/blog/mandalorian-grogu-ilp-vfx-breakdown/). Shoot the real thing where it teaches you something, then build the rest.

## Where to look

Next time a stadium fills on screen, ignore the far stands — they are doing their job by being vague. Watch the band of crowd about two-thirds back, the zone that is close enough to resolve and far enough to be cards. Look for a reaction that arrives everywhere at once. Real crowds ripple; they take about a second to agree on anything, and the people at the top of the bowl are always a beat behind the people who can see.
