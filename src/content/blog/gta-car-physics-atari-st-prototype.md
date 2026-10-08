---
title: "GTA's car physics started as an Atari ST demo"
date: 2026-10-08
category: Tech
excerpt: Pat Kerr wrote the vehicle simulation behind Grand Theft Auto over a weekend in August 1996, in GFA BASIC on an Atari ST. It runs in a browser now.
cover: /img/blog/gta-car-physics-atari-st-prototype/shot-01.jpg
sources:
  - outlet: Pat Kerr
    url: https://patkerr.co.uk/2d-vehicles/
  - outlet: 80 Level
    url: https://80.lv/articles/gta-1-s-vehicle-physics-are-now-playable-in-your-browser/
  - outlet: iXBT Games
    url: https://ixbt.games/en/news/2026/10/08/razrabotcik-gta-vossozdal-model-vozdeniia-iz-pervoi-casti-igry-k-ee-30-letiiu-prototip-rabotaet-v-brauzere.html
artistView:
  take: "Kerr solved a feel problem with a dynamics solver when the rest of the industry was pushing points around with F = ma, then tuned the one part he could not derive until it read right. That order of operations — correct structure, guessed surface — is still how vehicle handling gets built."
  works:
    - "Simulation: a 2D rigid body with real angular momentum gives you oversteer, weight on the outside wheel and a handbrake slide for free, none of which you can fake with point physics."
    - "Camera: exposing the dead zone and the speed-based zoom as separate toggles is an admission that the sense of speed was never purely in the maths."
    - "Scope: Ship and Brick modes strip the tyre model out entirely, which is the clearest way to show what the tyres were actually contributing."
  misses:
    - "Presentation: the Canvas build draws state and little else, so the skid that made the original read as a car leaves no mark on the road behind it."
    - "Documentation: the write-up names the tyre behaviour as an approximation without printing the curve, and that curve is the part another programmer would want."
draft: true
---

Press 3 and the car becomes a brick.

That is a real mode in Motion Lab, a browser toy that Pat Kerr put up this
week. Kerr was a programmer at DMA Design — the studio that became Rockstar
North — and the physics he is giving away is the physics that moved the cars in
the original Grand Theft Auto. He has rebuilt it in JavaScript, thirty years
after writing it, and the thing you drive in a browser tab is the same
simulation that shipped.

The origin story is smaller than the game it ended up in. One weekend in late
August 1996, on an Atari ST at home, in GFA BASIC, as a wireframe demo. It was
ported to C afterwards to go into the actual game.

## What was unusual about it

<figure>
  <img src="/img/blog/gta-car-physics-atari-st-prototype/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Atari 1040STF photographed by Bill Bertram, CC BY 2.5 via Wikimedia Commons; Motion Lab screenshot from the project's own repository</figcaption>
</figure>

Kerr's own framing is the useful part. He describes what he built as a simple
classical 2D rigid body dynamics simulation, and points out that most game
vehicles of the period were done with basic high-school point physics — F = ma,
a position, a velocity, a shove in the direction you are facing.

The difference between those two approaches is the difference between a car and
a cursor. Point physics gives you something that accelerates and turns. A rigid
body gives you a mass with a moment of inertia, which means it resists being
rotated, carries that rotation once it has it, and can be pushed around its
centre rather than through it. Oversteer falls out of that. So does the
handbrake turn, and the way a GTA car keeps swinging after you have let go of
the wheel.

Nobody playing in 1997 could have told you any of this. What they could tell you
was that the cars felt heavy — the same information, arriving by a different
route.

## The part he guessed

The tyres are where it gets honest. Kerr calls his tyre behaviour simple,
approximate and technically incorrect, and describes it as his fairly educated
guess.

Tyre modelling is genuinely hard — the real thing is a slip-angle curve that
rises, peaks and falls away, and getting it from measurements is somebody's
career. In 1996, on a machine with no floating-point unit worth the name and a
frame budget measured in a handful of milliseconds, you were never going to
evaluate that curve. So he approximated it, tuned it until the car did what a
car does, and shipped.

This is the bit worth sitting with. The structure underneath was more rigorous
than the competition's, and the surface detail was a shrug. Both decisions were
correct. A dynamics solver is the thing you cannot bolt on later; a friction
curve is a number you can turn until it feels right. Vehicle handling still gets
built in exactly that order, in studios with physics engineers and telemetry.

## Dead zone, and zoom

Buried in Motion Lab's controls are two camera toggles: Z for the camera's dead
zone, X for speed-based zoom. B switches the side barriers, G flips vertical
gravity.

Those first two are a confession. A dead zone means the camera ignores small
movements before it starts following, which keeps a twitchy car from making the
whole screen twitch. Speed-based zoom pulls out as you go faster, so the road
arrives at your eye quicker than the car is actually travelling. Neither is
physics. Both are why the physics read as speed.

I have spent enough time next to a vehicle setup to know that the handling
argument is usually half a camera argument, and that nobody enjoys being told
so. Having the two toggles sitting beside the solver, as separate switches you
can turn off, is a more candid piece of documentation than most engine manuals
manage.

## Thirty years of what, exactly

One correction, because the anniversary is being reported loosely. The thirtieth
being marked is the prototype's — that weekend in August 1996. Grand Theft Auto
itself did not ship until late 1997, and the outlets do not even agree on the
day: 21 October and 28 November 1997 both appear for the European MS-DOS
release. The game's own thirtieth is next year.

It keeps happening to these games. A modder path-traced GTA 2 by writing a new
Direct3D 9 renderer to turn its tile world into
[geometry RTX Remix could actually light](/blog/gta-2-rtx-remix-d3d9-renderer/),
and that was a stranger reaching into a closed binary from outside. This is the
other direction: the person who wrote the code, opening it himself.

Both are worth more than nostalgia. When
[the GoldenEye decompilation rebuilt the 1997 ROM byte for byte](/blog/goldeneye-007-decompiled-what-it-reveals/),
what came out of it was a readable account of how a 1990s console game was
actually assembled — budgets, constraints, compromises. Kerr's write-up does the
same job for one subsystem, with the advantage that the author can tell you
which parts he believed in.

Press 2 for Ship mode and the tyres come off entirely, leaving thrust and
rotation in a frictionless plane. It handles like nothing you would want to
drive. Which tells you precisely how much work that educated guess was doing.
