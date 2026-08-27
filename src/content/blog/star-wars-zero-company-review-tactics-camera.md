---
title: Zero Company makes a top-down tactics camera look like a Respawn Star Wars game
date: 2026-08-27
category: Games
cover: /img/blog/star-wars-zero-company-review-tactics-camera/shot-01.jpg
reviewOf: STAR WARS Zero Company
score: 8.5
scoreSources:
  - { outlet: IGN, score: 9 }
  - { outlet: GameRant, score: 9 }
  - { outlet: TechRaptor, score: 9 }
  - { outlet: Game Informer, score: 8 }
  - { outlet: VGC, score: 8 }
  - { outlet: Shacknews, score: 7 }
excerpt: EA and Lucasfilm's Clone Wars tactics game landed today at 87 on OpenCritic from nineteen critics. The six outlet scores I could verify average 8.5. Almost every one of them praises the presentation and flags the texture pop-in, which is one problem wearing two faces.
---

The camera sits about twenty metres up, angled down, far enough back that you
can read a firing line across a whole courtyard. You commit a shot. It drops —
fast, close, over the shoulder of a clone trooper — holds for the impact, and
pulls back out to tactical height before you've finished exhaling.

That move is the entire art brief for **STAR WARS Zero Company**, out today on
PC, PS5 and Xbox Series X/S. Bit Reactor built it with Respawn, published by EA
and Lucasfilm Games, and it is a turn-based tactics game set in the closing
stretch of the Clone Wars.

## Where the scores landed

OpenCritic has it at **87** from nineteen critics as of 27 August, with 89% of
them recommending it. Metacritic sits at 86. Six outlet scores I could verify
individually:

| Outlet | Score |
|---|---|
| IGN | 9 |
| GameRant | 9 |
| TechRaptor | 9 |
| Game Informer | 8 |
| VGC | 8 (4/5) |
| Shacknews | 7 |

Mean of 8.33, which rounds to **8.5**. Those six are a sample of nineteen, so
treat the number as a temperature reading rather than a verdict — but the shape
is consistent with the aggregate, and the spread is real rather than the flat
identical-number pattern you get when a page is scraping rather than reporting.

The consensus is easy to summarise. The tactics are good. The presentation is
better than a game seen from this distance has any business being. And a lot of
reviewers, across the range from 7 to 9, mention texture pop-in.

## Twenty metres up is a hard place to sell Star Wars

Respawn's Jedi games get to art-direct a corridor. Third-person, over-shoulder,
a known field of view and a known distance to the nearest wall. You know which
side of a rock the player will see, so you spend your texel budget there and
leave the back of it cheap. You know the light will hit the character from
roughly camera-left in this beat, so you place a practical and let it read.
That control is most of why those games look expensive.

A tactics map takes all of it away. The camera orbits. Players spin it
constantly, because spinning it is how you check cover angles, so every rock is
seen from every side within about four seconds of the map loading. There is no
back of the rock.

At the same time you're much further away, which means silhouette does the work
that surface detail does in a third-person game. Small props stop existing.
Material response flattens out — at that distance a beautifully layered metal
shader and a decent flat one are separated by about three pixels of specular.
The things that survive twenty metres of air are shape, contrast, and light.

So a game that wants to look like a Respawn Star Wars game from up there has to
buy its impression back some other way, and the close-up cut is how Zero
Company does it. Hold the wide shot for readability, cut in for the beat that
carries the drama, get out. It's a very old film-editing solution to a very
specific rendering problem.

<figure>
  <button class="video-embed" data-video="ZxQQSOil6bc" data-title="Star Wars Zero Company: Turn-Based Tactics That Aren't Just For XCOM Experts | IGN Preview" type="button">
    <img src="/img/blog/star-wars-zero-company-review-tactics-camera/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from IGN's hands-on preview video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>IGN's hands-on preview, from the campaign's first ten hours. IGN's 9 is one of the six scores counted above, though this video is their preview rather than their review — no review video from a counted outlet had surfaced by the time this went up. Their preview line about "a few scruffy-looking edges" is the same thing the launch reviews are calling pop-in.</figcaption>
</figure>

## The cut is what costs you the textures

Here is why I think the praise and the complaint are the same finding.

Streaming systems work on prediction. In a third-person game the engine has a
fairly good idea of where you'll be in two seconds, because you're walking, and
walking has momentum. It pulls the high-resolution mips for that direction and
lets everything behind you sit at low detail. When it guesses wrong you get a
brief smear, and it usually guesses right.

Now give that same system a camera that can be anywhere on a large map on the
next frame, controlled by a player who whips it around to check angles, and a
cinematic cut that teleports it to point-blank range on an asset that was two
hundred metres away and streamed at potato resolution a moment ago. There is no
momentum to predict from. The cut is an instant, unsignalled demand for the
highest mip on a specific object, and the request arrives at the same moment the
shot is supposed to look its best.

You can mitigate it. You can pre-warm the target of a cinematic cut a frame or
two ahead, because the game knows who's shooting whom before the animation
starts. You can bias residency toward anything inside a unit's threat range. You
can hold the cut a beat longer on a wide before pushing in. None of that is
free, and on a game where the player might have thirty units and a dozen visible
enemies, the set of things that *might* need to be sharp next is most of the
level.

Whether Bit Reactor undershot the pre-warm or the console memory budget simply
ran out, I can't tell from reviews alone. The symptom is consistent enough
across outlets that it isn't one reviewer's machine.

## Clone armour is a readability problem before it's a fashion one

XCOM-style play depends on telling your units apart at a glance, from a
distance, mid-panic. Silhouette, colour, stance. That's the whole reason those
games ship with soldier customisation that goes well past cosmetic — it's a
legibility system pretending to be a wardrobe.

Then someone hands you the Clone Wars, whose entire visual premise is that the
soldiers are identical. Identical is the *point* of them, narratively and
thematically, and it's also the worst possible starting condition for a game
that needs six distinguishable pieces on a board.

Reviews describe a squad of non-Force-using misfits rather than a company of
matching troopers, which reads like the design answering that question directly
— build the roster out of species and silhouettes that differ, then let armour
kit and paint separate whoever's left. Several outlets flag the story and
characters as competent without being remarkable, which may be the price of
casting for shape.

## The permadeath caveat

Multiple reviews mention crashes, and at least one report describes crashes
interacting badly with permadeath — losing progress in a way that makes a
permanent loss retroactively worse. I could not confirm the specifics against a
primary source before writing this, so treat it as reported rather than
established, and as the kind of thing a launch patch usually reaches first.

An 8.5 on a day-one tactics game with a free camera and a cinematic cut is a
good result. The bug reports and the pop-in reports are landing on the same
week, from the same reviewers, at scores between 7 and 9 — which is roughly what
it looks like when a team gets the hard rendering idea right and runs out of
runway on the plumbing underneath it.

---

*Scores as of 27 August 2026, the day of release. Aggregate figures from
OpenCritic and Metacritic; the six individual scores are converted to a 1-10
scale and averaged with no weighting. Release platforms and developer credits
from EA's own listings for the game.*
