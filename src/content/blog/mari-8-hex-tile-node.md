---
title: "Mari 8 hex tiling: three taps kill the repeat"
date: 2026-09-26
category: 3D
excerpt: Foundry's texture painter now de-repeats tiled textures in a hexagonal grid. The technique is four years old and has been in renderers for months.
cover: /img/blog/mari-8-hex-tile-node/shot-01.jpg
sources:
  - outlet: CG Channel
    url: https://www.cgchannel.com/2026/09/foundry-releases-mari-8-0-in-open-beta/
  - outlet: Morten S. Mikkelsen — hextile-demo reference implementation
    url: https://github.com/mmikk/hextile-demo
artistView:
  take: "Judging from the node descriptions and Mikkelsen's public reference code rather than the beta itself: this is the correct fix for the oldest visible failure in environment art, arriving in the one place artists actually look at the surface. The interesting question is what it does to review notes, because \"the tiling is showing\" has been a free thing for an art director to say for twenty years."
  works:
    - "Texturing: de-repeating at the paint stage means the artist sees the blended result while authoring, instead of discovering the grid in a render three days later."
    - "Pipeline: a Tri-Planar Tiled node that takes one image across X, Y and Z is aimed squarely at scan data and kitbash geometry, where the UVs are either wrong or absent."
  misses:
    - "Texturing: hex tiling scrambles directional detail — brick courses, plank runs, anything with a grain — because the rotated instances no longer line up."
    - "Scope: it hides the repeat, not the flatness. Large-scale colour variation still wants a macro map on top, and no node builds that for you."
---

Only CG Channel has filed on this so far, so the details below rest on one
outlet's reporting of the release plus the public reference code for the
technique itself.

Stand a character next to a cliff face in almost any game and walk sideways.
Somewhere around the fourth or fifth metre you will find the crack you already
looked at. Then again. The tiling repeat is the most familiar failure in
environment art, it has been solved a dozen different ways by a dozen different
studios, and every one of those solutions lived in a shader someone on the tech
art team wrote and maintained.

Foundry has put one in Mari.

## What landed

<figure>
  <img src="/img/blog/mari-8-hex-tile-node/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Morten S. Mikkelsen, from the MIT-licensed hex-tiling reference demo</figcaption>
</figure>

Mari 8.0 has been in open beta since July. The update CG Channel wrote up on
24 September is Beta 2, and it brings a Hex Tile node, a Tri-Planar Tiled node,
and a Compare node for A/B wipes between two branches of the graph. The whole
8.0 cycle adds over fifty nodes to the Node Graph, most of them small maths
operations that should have been there years ago.

No stable date. CG Channel's guess, based on how previous Mari cycles have run,
is three to six months. Pricing at the time of the beta announcement: $86 a
month or $689 a year for an individual, $1,289 a year per seat for teams.

## The hexagons

Tile a texture on a square grid and the eye finds the grid, because the same
rectangle lands at the same orientation every time. Hex tiling breaks that by
laying the texture down on a hexagonal lattice instead, with each cell getting
its own random offset and rotation, then blending the three cells nearest to
the shading point according to how far it sits from their edges.

Three cells means three texture fetches for every pixel that would otherwise
have cost one. That is the price, and it is why this was a research problem
rather than a default.

The lineage is worth knowing. Heitz and Neyret published the histogram-preserving
version in 2018, which kept contrast intact through the blend but needed a
precomputation pass turning your source texture into a transform and an inverse
transform. Two extra textures per input, generated offline, invalidated every
time an artist tweaked the albedo. Morten S. Mikkelsen's 2022 adaptation threw
out the histogram machinery and replaced it with a contrast ramp cheap enough
to evaluate inline, which let the method sample the original texture directly.
His demo code is on GitHub under MIT, and it is the version that has been
spreading — into Houdini, into RenderMan, into Redshift 2026.6 back in May, and
now into Mari.

## Why the paint tool is the place it matters

A render-time hex tile node fixes the picture. A paint-time one fixes the
feedback loop.

Every texture artist has shipped a surface that looked fine in the material
preview and grew a visible grid the moment it went onto a two-hundred-metre
terrain under a low sun. You find that out in review. Then you go back, add
macro variation, re-export, re-import, wait for the light bake. Doing the
de-repeating in the tool where the texture is authored means the thing on
screen while you paint is the thing that ships, and the artist gets to judge
whether the blend is eating detail they cared about.

That judgement is the part no node automates. Hex tiling works beautifully on
gravel, rust, dirt, plaster, lichen, anything with no preferred direction. Feed
it a brick wall and the rotations will cut the courses at angles bricks do not
sit at. Wood grain the same. You learn quickly which of your library is
hex-safe, and it is roughly the half of it that was already noise.

## The other node

Tri-Planar Tiled is the less glamorous addition and might get more use. Mari
already had a triplanar projection node, but it wanted up to three separate
images, one per axis. The new one takes a single image and throws it down all
three ways. For a scanned rock with garbage UVs, or a kitbashed hard-surface
piece nobody ever unwrapped, that is the difference between texturing it and
sending it back.

Triplanar has its own tax — three projections, blended by the world-space
normal, and a smeared band wherever a surface sits at forty-five degrees to two
axes. Artists have been eating that tax in Substance and in engine shaders
forever. Having it in the paint graph mostly saves a round trip.

## Where this sits

The interesting thing about a solved problem arriving as a button is how much
of the craft it quietly relocates. Deciding how much unique texture a surface
deserves is still the call that costs money — [CD PROJEKT RED placed every
building and advert in Night City by hand](/blog/night-city-hand-built-texel-density/)
because a first-person camera walks right up to all of it, and no amount of
clever tiling substitutes for that budget. Hex tiling does not buy you
authored detail. It buys you permission to tile at a scale where you were
previously forced to, and to stop apologising for it.

At the other end, a prop the camera holds at arm's length still gets
[four hand-authored texture sets and wear painted where a hand would put
it](/blog/tears-in-rain-sci-fi-prop-texture-sets/). Nothing in Mari 8 changes
that maths. It just moves the line a bit, in the direction of the artist.

One practical note for anyone hoping to see it in motion: Foundry has asked
people not to publish videos showing the beta UI until the features are out of
beta, with demos available on its own site instead. So the node exists, the
maths is public, and the screen recording is not.
