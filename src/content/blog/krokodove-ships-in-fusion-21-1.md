---
title: "Krokodove ships in Fusion 21.1: 20 years of nodes"
date: 2026-09-10
category: 3D
excerpt: Raf Schoenmaekers gave Krokodove away through Reactor for two decades. Blackmagic's 8 September release puts it in the box, and ends a render farm headache.
cover: /img/blog/krokodove-ships-in-fusion-21-1/shot-01.jpg
---

There is a particular kind of Friday evening that anyone who has comped in
Fusion will recognise. The shot is finished. It renders on your machine. You
submit it to the farm and it comes back with an error about a node the farm has
never heard of, because the node came from a package you installed through
Reactor eighteen months ago and forgot was not part of Fusion.

Blackmagic announced DaVinci Resolve 21.1 and Fusion Studio 21.1 on 8 September.
Buried in a release note about motion graphics is the end of that particular
Friday: over twenty-five more Krokodove tools now ship inside the host, on top
of the batch that arrived with version 21 back in April. Krokodove is now a
folder in the Effects library, shipped with the installer.

## Twenty years, one person, given away

Krokodove is Raf Schoenmaekers, working as Komkom Doorn Studio, adding nodes to
Fusion since roughly the mid-2000s. Over a hundred of them by the time the
collection matured — image filters, warps and morphs, an unusually deep set of
titling and text animation tools, and a long tail of things that exist because
one compositor needed them once and decided everyone else might as well have
them too. Version 6.40 landed in 2016. It kept going.

The distribution route was Reactor, the community package manager the We Suck
Less forum built for Fusion, which shipped its 2.0 release in 2018. Reactor is
genuinely good software and it solved a real problem, which was that Fusion had
no add-on story at all. What it could not solve was everything downstream of the
install.

Because a `.comp` file is a text description of a node graph, and a node it
references either exists on the machine opening it or does not. Hand a comp to a
colleague without Krokodove and they get a broken graph. Send it to a render
farm where the nodes were never installed on the blades and you find out at
render time rather than open time, which is the worst moment available. Studios
handled it the way studios handle everything — a golden image, a deployment
script, a wiki page nobody updated — and freelancers handled it by remembering.

Putting the nodes in the installer deletes that whole category of problem. A
comp built on a laptop in 21.1 opens on a farm running 21.1. It will matter more
to people shipping work than anything else in the release notes, and nobody will
ever put it in a demo reel.

<figure>
  <button class="video-embed" data-video="SoqIAk0fGaQ" data-title="Krokodove Tools in DaVinci Resolve Fusion 21" type="button">
    <img src="/img/blog/krokodove-ships-in-fusion-21-1/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a walkthrough of the Krokodove nodes inside DaVinci Resolve's Fusion page" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A walkthrough of the Krokodove nodes as they landed in Resolve 21, from April 2026, before the 21.1 batch. Useful mostly for seeing what the tools do, since the release notes describe them in about four words each.</figcaption>
</figure>

It is also worth saying what a node library like this is worth, because the
market has been pricing it lately. Mike Gaynor's Caddis went 1.0 last week with
[more than 130 nodes and a $129 perpetual licence](/blog/caddis-1-0-node-graph-per-layer/),
which is a fair price and a thin margin for years of work. Krokodove is
comparable in scope and has been free the entire time. Absorbing it into a
product where the base edition costs nothing is a strange, quiet piece of
generosity from both directions.

## Deep comp gets motion blur, and gets faster

The other half of 21.1 is the part I would look at first if crowds or heavy CG
are your problem.

Fusion is one of a very small number of compositors that do deep compositing
properly — images that carry colour at many depths per pixel instead of one, so
that merging CG into a plate becomes a depth-ordered sort rather than a hand-cut
holdout matte. 21.1 gives Renderer3D motion blur and matte objects while running
in deep mode, adds flipbook previews of deep images, throws in a Hard Mix blend
mode, and claims hardware-accelerated deep renders up to eight times faster.

Motion blur in deep mode is the line to read twice. Deep data and motion blur
have always sat awkwardly together, because a blurred sample is smeared across
space while a deep sample is a statement about one location. Getting the two to
coexist is the difference between deep being a technique you reach for on locked-
off shots and one you can use on a moving camera.

Which is where this connects to work like Folks rebuilding stadiums for *Chad
Powers*, where the season's problem was [stands holding upwards of 90,000
people across more than 600 shots](/blog/chad-powers-folks-cg-crowds-90000-fans/).
Tiered sprite crowds against a real bowl, with players and rails and camera
moves cutting through them, is exactly the situation where hand-built holdouts
stop scaling and deep starts earning its storage cost. Eight times faster is not
a marketing number when a single deep EXR sequence can outweigh everything else
in the shot.

There is a smaller thing in the Lens Distort tool that I like more than it
deserves. A new calibration mode called Fusion Division Radial lets you solve
distortion by drawing lines along edges you know are straight in the frame — a
door jamb, a kerb, the edge of a building. Every lens grid you never shot,
recovered from the plate itself. It will not beat a proper checkerboard, but
plates arrive without grids constantly, and having a defensible method beats
nudging a slider until the tracking markers stop swimming.

## What I could not confirm

Blackmagic's own release page for 21.1 is at `blackmagicdesign.com/media/release/20260908-03`,
and I could not read it from here, so the free-versus-Studio split on these
features is not something I want to state flatly. Resolve's base edition is
free and Fusion Studio and Resolve Studio are paid; historically deep
compositing and the heavier renderer work have sat on the Studio side while
node libraries have not. If you are planning around the deep improvements
specifically, check the edition before you plan.

The rest of it stands. Twenty years of one person's tools, given away the whole
time, now installed by default on a piece of software several hundred thousand
people already have. Somebody should buy Raf Schoenmaekers a drink.
