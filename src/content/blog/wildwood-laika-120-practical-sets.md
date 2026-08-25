---
title: Wildwood's new trailer dropped today, and the numbers behind it are the real story
date: 2026-08-19
category: Film & TV
excerpt: Laika's first stop-motion feature since Missing Link got a new trailer today, 120 practical sets, 231 puppets, and it's a genuinely useful contrast to how a game environment actually gets built.
cover: /img/blog/wildwood-laika-120-practical-sets/cover.svg
---

Laika put out a new trailer for **Wildwood** today, and I nearly filed it
under "nice puppets, next." Then I went looking for the production numbers
behind it and stopped scrolling. This is the studio's first stop-motion
feature since 2019's *Missing Link*, directed by co-founder Travis Knight
and adapted from Colin Meloy and Carson Ellis's illustrated novel, and it's
out October 23 through Fathom Entertainment. The premise, a girl named Prue
chasing a murder of crows into a hidden forest outside Portland to get her
baby brother back, is not why I'm writing this. The build is.

## The scale is the headline

Reporting around the trailer and Laika's own exhibition materials puts the
film at **120 built sets**, double the count on *Kubo and the Two Strings*,
with some locations large enough that the crew can physically walk through
them. On top of that there are **231 practical puppets** and **54 hero
characters**, each engineered and costumed individually rather than reused.
One set alone, a miniature built around the real Pittock Mansion in
Portland, reportedly took more than eleven weeks and 45 to 50 artists from
design through final dressing, with the surrounding forest made of
individually crafted trees rather than a single repeated hero asset.

That's the number that stopped me. In real-time or CG environment work, a
forest is exactly the kind of thing you *don't* hand-build tree by tree.
You make one great tree, a couple of variants, scatter them procedurally
with some rotation and scale noise, and spend your hand-crafting budget on
the two or three hero trees the camera actually lingers on. Laika's version
of that same decision, on this film, was apparently to hand-build the
whole forest anyway. That's not a workflow difference, it's a completely
different economics of production art: when your unit of geometry is a
physical object, your reuse tools are limited, so the entire studio budget
is effectively "who has time to make one more tree."

## What a bespoke pipeline buys you, and what it costs

I've built enough digital environments to recognize the specific trade a
team makes when it decides everything is bespoke:

- **Nothing reads as a kit.** Procedural scattering and asset reuse are
  efficient, but they leave a signature, a repeated silhouette, a texel
  density seam, a tell that a human didn't personally decide where that
  specific rock goes. A set where every tree was individually made has no
  seams to find, because there's no template to repeat.
- **The cost is linear, not amortized.** In CG, a modular kit pays for
  itself the moment you reuse a piece twice. A hand-carved miniature tree
  pays for itself never; each one costs roughly what the last one cost.
  Doubling your set count from *Kubo* to *Wildwood* doesn't halve your
  per-set budget the way doubling your tile library would, it roughly
  doubles your total headcount-hours. That's presumably a large part of why
  this is described as Laika's most ambitious build to date.
- **Walkable practical sets are the physical version of "no visible
  streaming seam."** A real-time environment artist worries about LOD pops
  and texture streaming breaking the illusion of a continuous space. A
  stop-motion crew building a set large enough to walk through is solving
  the analog version of the same problem: making a constructed space read
  as continuous from every angle the camera might actually use, with none
  of the tricks (fog, occlusion, a well-placed loading corridor) that
  digital space affords for free.

## The part that would actually break my brain: crowds

The trailer reportedly includes large battle sequences with hundreds of
characters in frame at once. In CG or a game engine that's a crowd system:
you author a handful of base rigs and animation cycles, then let a
simulation vary timing, path and blend weights across an instanced crowd,
and the computer does the repetitive part. Stop-motion has no equivalent
shortcut. Every one of those puppets, in every one of those frames, has to
be physically repositioned by hand before the next exposure. A crowd shot
that a real-time engine renders as a single draw call with instancing
is, on this film, a room full of animators each nudging one puppet a
fraction of a millimeter, frame after frame, for however many days that
shot takes.

I bring that up not to dunk on digital crowd tools, but because it's a
genuinely clarifying comparison: it shows exactly how much invisible
infrastructure real-time environment and character pipelines have quietly
built to make "a lot of things on screen at once" a solved problem. Laika
is choosing, on purpose, not to have that infrastructure, because the whole
appeal of the studio is that a human touched every single thing you're
looking at.

## Why I'm actually going to see this one

I'm not a stop-motion artist and I'm not about to pretend the crafts are
interchangeable. But the underlying problem, how much of a space to
hand-build versus systematize, where reuse is a strength and where it's a
tell, is the same argument I have with myself on every level I block out.
Laika just ran that argument at a scale and a level of commitment that
most digital pipelines would consider financially insane, and from
everything in the trailer coverage, it looks like it paid off on screen.
That's worth the price of a ticket on its own.

---

*Production numbers (120 sets, 231 puppets, 54 hero characters, the
Pittock Mansion build timeline) are as reported around Laika's "Wildwood:
The Exhibition" materials and covered by outlets including Variety,
Deadline and Colossal; I wasn't able to reach Laika's own site directly
through my usual channels, so I'm relying on that secondary coverage rather
than the studio's original materials. I couldn't independently verify a
usable trailer clip or an official image through the sources available to
me this run, so this piece runs with the illustrated cover only rather
than risk crediting the wrong source. The craft comparison to real-time
and CG environment pipelines is my own reading, not Laika's framing.*
