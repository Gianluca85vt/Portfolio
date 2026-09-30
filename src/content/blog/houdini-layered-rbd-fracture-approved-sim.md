---
title: "Houdini RBD: add fracture without re-simulating"
date: 2026-09-29
category: 3D
excerpt: Jae Jun Yi's multi-layered RBD workflow, presented at SIGGRAPH 2026, lets a second fracture inherit motion a director has already signed off on.
cover: /img/blog/houdini-layered-rbd-fracture-approved-sim/shot-01.jpg
sources:
  - outlet: 80 Level
    url: https://80.lv/articles/former-pixar-fx-artist-reveals-a-smarter-way-to-refine-destruction
  - outlet: ACM SIGGRAPH 2026 Posters
    url: https://dl.acm.org/doi/proceedings/10.1145/3799825
  - outlet: SideFX (Houdini documentation)
    url: https://www.sidefx.com/docs/houdini/destruction/index.html
  - outlet: SideFX (Multi Layered Destruction tutorial)
    url: https://www.sidefx.com/tutorials/multi-layered-destruction-in-houdini/
  - outlet: The Rookies
    url: https://www.therookies.co/blog/breakdowns/rbd-building-destruction-a-houdini-project
artistView:
  take: "This is the displacement-pass trick applied to rigid bodies: lock the low frequency once it is approved, then add high frequency on top of it. What makes it a production tool rather than a demo is that Yi built it from stock RBD nodes, so it survives the artist who wrote it leaving the studio."
  works:
    - "Pipeline: inheriting the parent piece's transform means the approved silhouette of the collapse is bit-identical after the detail pass, so lighting and comp keep working on a shot that did not move under them."
    - "Art direction: gating the second layer on a trigger the artist sets — impact, velocity, a hand-picked piece — puts the note where the note actually was, which is usually one corner of frame rather than the whole building."
  misses:
    - "Scope: Yi says himself it degrades on highly interconnected or interactive destruction, and that is the honest limit. If the extra fracture ought to change how the big thing falls, layering it on top is a lie the audience can read."
    - "Craft risk: debris that never feeds back into the mass it came off can look applied rather than caused, and at that point you have bought detail and spent believability on it."
draft: true
---

There is a particular note that arrives in dailies and costs more than anyone in the room
thinks it does. The director likes the collapse. The timing is right, the big shapes read,
the thing falls the way the shot needs it to fall. Now could the rubble break up more on the
left, where it meets the road?

Everyone nods. Nobody says how expensive that is.

**Jae Jun Yi**, a former Pixar FX technical director, took that note to SIGGRAPH. His workflow
went up as a poster at SIGGRAPH 2026 in Los Angeles in July — article 24 in the Posters
proceedings, credited to Yi with three co-authors — and 80 Level ran a long breakdown of it on
28 September 2026. He calls it multi-layered RBD simulation. The short version: run a base
simulation for composition and large-scale motion only, get that approved, and then fracture
selected pieces a second time, with the children inheriting the parent's already-blessed
movement and going dynamic only when a trigger the artist sets says they should.

## Why the note is expensive

Rigid body destruction is not a sim you can nudge. The fracture pattern is upstream of
everything: it decides how many pieces exist, which is what the piece identifiers are numbered
against, which is what the constraint network is built between, which is what the solver
collides. Re-fracture one corner of a building and the piece indexing shifts, the glue
constraints rebuild, collisions resolve differently, and geometry two metres away that nobody
asked about starts falling somewhere else.

So a note about one corner returns a different shot.

And the shot has already grown things on top of it. The dust and the smoke were sourced off
those pieces, so their emission points moved. The debris pass instanced against them. Lighting
has a cache on disk it has been working against for a week; comp has a version they have
already started balancing. The note costs the re-sim, plus everything that was built on the
assumption that the sim was final.

## What Yi's layers actually do

The base layer is deliberately coarse — enough pieces to get the mass and the timing right,
and no more. That is the one the director approves, and it is cheap to iterate because the
piece count is low.

Then the selection. Pieces come out either by hand or by condition: size, velocity, impact
strength, a collision event. Those pieces get fractured again. Crucially, the new children
start life carrying the parent's transform — its position, its rotation, its motion — so at
the moment of the switch nothing changes on screen. They are riding the approved animation.
Only when the trigger fires do they become dynamic in their own right.

Yi's write-up spends most of its length on the plumbing that keeps that seam invisible:
identifiers, transform attributes, activation state, constraints, collision adjustments. That
emphasis is correct and it is the part people skip. Anyone can fracture something twice. Handing
motion from one solver pass to the next without a frame of pop is the actual work.

The framing I like most is the one that is easiest to overlook. Yi chose to extend Houdini's
normal RBD toolset rather than write a specialised system. A bespoke solver is a beautiful thing
that belongs to one person, breaks on the next Houdini version, and becomes unmaintainable the
week that person changes job. A workflow assembled out of stock nodes gets picked up by whoever
inherits the shot. In a studio, that difference matters more than elegance does.

## "Layered" already meant something else

Worth being precise about the word, because destruction artists have used it for years and they
did not mean this. In the house sense — the one SideFX teaches in its own
[Multi Layered Destruction](https://www.sidefx.com/tutorials/multi-layered-destruction-in-houdini/)
tutorial — a layer is a different *kind* of simulation stacked on the rigid bodies: particles for
grit, pyro for the dust and the airfield, a second wave of emitted RBDs for small pieces the main
fracture was too coarse to carry. Vertical layering. Each pass reads the one below it and adds a
phenomenon the one below it does not have.

Then there is the other established sense, which is spatial. A breakdown on The Rookies of a
building collapse describes the geometry cut into eleven layers before a single fracture is
made — eight that destroy and three that stay put — each one clustered and constrained so the
structure holds together until it is meant not to. That is layering as level design: deciding in
advance which parts of the building are allowed to participate.

Yi's layering is a third thing, and it runs in time rather than in space or in kind. Same solver,
same phenomenon, same geometry — run twice, with the second run starting from the first run's
answer. Nobody had a word free, so it got this one.

<figure>
  <button class="video-embed" data-video="duZAciX_CuQ" data-title="Vehicle Destruction &amp; Dynamic Rigging with RBDs | Keith Kamholz | Houdini HIVE Worldwide" type="button">
    <img src="/img/blog/houdini-layered-rbd-fracture-approved-sim/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from SideFX's Houdini HIVE talk on rigid-body destruction" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Keith Kamholz's Houdini HIVE talk for SideFX on art-directing rigid-body destruction. It predates Yi's poster and is about vehicles rather than buildings, but it is a good hour on the same underlying problem: getting a solver to produce a specific collapse rather than a plausible one.</figcaption>
</figure>

## The same argument, from the other end

Simulation keeps running into this. The solver is fast at producing plausible motion and slow at
producing *that* motion — the one someone has in their head. Every trick FX has accumulated
over twenty years is some version of taking control back: guided sims, velocity fields painted by
hand, retiming caches, blending between two solves.

Which is why this sits next to a piece from last month about wardrobe. Render Ready builds hero
garments by scanning real clothes on poseable mannequins, and the case for
[scanning a garment rather than simulating it](/blog/render-ready-scanned-garments-vs-cloth-sim/)
was the same shape: a cloth solver gives you an approximation you then have to argue with, where a
scan gives you a measurement. Yi's version fences off the part of the solver's output that has
already been approved, so that nobody argues with it twice.

The scheduling underneath is what makes this a real problem rather than a tidy one. Motion gets
signed off early, because motion is the thing you can judge in a grey playblast. Detail notes
arrive late, when the shot is dressed and lit and the reviewer can finally see it properly. The
approval and the note are separated by weeks of downstream work, by design, and every pipeline
either has a way to absorb that or pays for it in overtime. The
[Chimera being rebuilt four times across two years](/blog/cyberpunk-2077-chimera-two-years-four-rebuilds/)
is the games version of the same bill: a change at the front of the chain, every discipline behind
it doing the work again.

## Where it stops

Yi is straight about the limits, which is rarer than it should be. The technique degrades on
highly interconnected destruction, and on anything interactive.

That follows from how it works. The layering is sound precisely because the second-level pieces are
small enough that their behaviour does not feed back up into the parent's motion. A chunk of
masonry shedding grit does not change where the chunk goes. But a column that ought to actually
give way once you fracture it properly *should* change what happens above it — and if the parent
motion is locked, it cannot. You would get a column that shatters convincingly while the floor it
was holding up falls exactly as it did when the column was solid.

Audiences feel that without being able to name it, and they call the shot fake.

So the judgement call, every time, is whether the note is about detail or about physics. "More
small pieces on the left" is detail, and this workflow is built for it. "That wall should have
come down harder" is physics, and there is no layer you can add that fixes it. You go back to the
base sim and you re-cache, and the week is gone.

Knowing which of those two you have been handed is most of the job.
