---
title: Nuke can now relight Gaussian splats — just not the way you'd think
date: 2026-08-21
category: 3D
excerpt: Foundry's Nuke 17.1 open beta lets you drop lights onto a Gaussian splat in comp. The catch is what it deliberately doesn't need to do that — and why that's the honest amount of magic to expect.
cover: /img/blog/nuke-17-1-gaussian-splat-relighting/cover.svg
draft: true
---

Foundry has **Nuke 17.1** out in open beta, and the headline addition is
basic relighting for Gaussian splats: drop Direct, Point or Spot lights into Nuke's
3D scene, point them at an imported splat, and the updated **SplatRender** node
renders the result back into your comp. There's also a new **GeoSequencer** node for
turning a sequence of imported splats into a time-sampled, animatable USD stream, a
`.splat` export path, and the 3D viewer has moved to **Hydra 2.0**. Nuke 17.0 shipped
native splat support back in February; 17.1 is the update that starts asking what you
actually do with one once it's sitting in a compositing tree.

## The detail that matters more than the feature name

Foundry's own release notes make a point of saying normals and position data are
**not required** for the relighting to work. That's not a footnote, that's the whole
story. A Gaussian splat isn't geometry — I went through this when [Scantic's
phone-only splat scanner](/blog/phone-gaussian-splat-scanning-offline/) came up a
couple of days ago, but it's worth repeating here because it's the exact thing that
makes "relighting a splat" sound bigger than it is. A splat is a cloud of soft,
view-dependent blobs baked from photographs — appearance, not surface. There's no
normal to bounce a light off, because there's no surface for a normal to belong to.

So SplatRender isn't computing how light would actually fall across the splat's
geometry, because it has no geometry to fall across. What it's doing is closer to a
screen-space grade that's aware of your placed lights' position, colour and falloff:
an Ambient Color for whatever the lights don't reach, and a Lighting Blur Radius that
softens the lit result without smearing hard edges. That's a genuinely useful comp
tool. It is not a relight in the sense a lighting TD means when they say the word —
you're not going to re-key a splat the way you'd re-key a lit CG asset with proper
AOVs. It's closer to painting a directional tint over a photograph than moving a real
light through a real scene.

## Why that's still worth shipping

None of that is a knock on the feature — it's the correct scope for what a splat can
honestly support today, and pretending otherwise would be worse. The actual value is
integration, not physical accuracy. A splat scanned on location — a courtyard, a
ruin, a set dressing reference — used to sit in comp as a flat, lit-how-it-was-lit
plate: gorgeous to fly a camera through, useless the moment your shot's lighting
didn't match the day it was captured. Basic relighting means a compositor can nudge
that captured environment toward the scene's actual light direction without kicking
it out to a 3D package, rebuilding it as geometry, and re-lighting it properly from
scratch — a round trip that, for a background element or a previs pass, is rarely
worth the time it costs.

Paired with GeoSequencer turning captured splat sequences into something Nuke's
existing toolset can actually manipulate over time, the direction is clear: Foundry
is building the plumbing to let a splat behave like a normal comp element — cleaned
up, graded, nudged toward a lighting direction, cut into a shot — without forcing it
through a full reconstruction pipeline first. That's the gap between "splats are a
neat capture format" and "splats are something you can actually deliver with," and
it's the same gap I flagged when writing about phone-based splat capture going
offline-first: the capture side keeps getting more production-friendly, and now the
comp side is catching up to meet it.

## What I'd actually want to see

Foundry has asked press and beta users not to publish footage of 17.1's new features
until it's out of beta, so there's no demo reel to point at yet — take the "basic" in
"basic relighting" at face value until one shows up. The thing to watch for when it
does is how the Lighting Blur Radius behaves on a splat with real depth variance —
foreground props against a scanned background — because that's exactly the case
where a screen-space trick either sells the illusion or gives itself away. A
compositing-only relight that only convinces on flat, wall-like scans wouldn't be
much of an upgrade over just grading the plate.

Sources: [CG Channel's write-up on Nuke 17.1](https://www.cgchannel.com/2026/08/foundry-releases-nuke-17-1/),
[Radiance Fields' breakdown of the open beta](https://radiancefields.com/nuke-17.1-open-beta-adds-dynamic-gaussian-splats-and-basic-relighting).
