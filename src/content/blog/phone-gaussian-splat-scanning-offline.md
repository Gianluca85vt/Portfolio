---
title: Phone-based 3D scanning just dropped the cloud entirely
date: 2026-08-19
category: 3D
excerpt: Scantic trains Gaussian splats on-device, no account, no upload, no wifi. It is not the first app to do this, which is the story — offline capture just became the baseline, not the pitch.
cover: /img/blog/phone-gaussian-splat-scanning-offline/cover.svg
---

Saw this cross CGChannel this week: **Scantic**, a small Vienna-made iPhone app, scans a room or
an object into a 3D Gaussian splat entirely on the phone. No account, no upload, no wifi. Walk
around the subject for a minute or two and the splat is computed and stored locally, start to
finish.

On its own that would be a nice indie release and nothing more. What makes it worth a piece is
that it isn't unusual anymore. Niantic folded fully local, on-device splat training into
**Scaniverse** — the free app that already dominates this space — a while back. So the actual
news isn't "a phone can do this now." It's that offline, no-cloud capture has quietly stopped
being a differentiator and become the baseline anyone entering this category has to ship with.

## Splats aren't meshes, and it bears repeating

Gaussian splatting and photogrammetry solve different problems. Photogrammetry reconstructs
geometry — triangles, with UVs, that a game engine or a renderer can shade, retopologise and
rig. A Gaussian splat reconstructs *appearance*: a cloud of soft, view-dependent blobs that
reproduces exactly how a real scene looked from wherever you stood, lighting and all, without
ever solving for a clean surface underneath.

That's why a splat off your phone looks startlingly photoreal in a viewer and is still mostly
useless as a game asset straight out of the app. There's no watertight mesh, no UVs to paint,
and pushing the camera outside the paths you actually walked exposes holes and smearing the same
way monocular depth estimation does — the reconstruction only knows what it saw. Converting a
splat into production geometry is its own pipeline step, not a checkbox in the capture app.

## Where it actually earns a slot in the kit

The honest use case is reference, not delivery. Location scouting for a level or a set,
capturing a prop or a texture source in the field, building a lookdev reference you can fly a
camera through instead of scrubbing forty flat photos — that's what a two-minute, phone-only
splat is good for, and it's a real upgrade over a photo dump in a PureRef board.

The offline part matters more than it looks on a feature list. A lot of studio pipelines flatly
won't let location photography or reference capture leave the building through a third-party
cloud service, full stop — the same wall I mentioned when [True Depth's local depth-estimation
add-on](/blog/true-depth-v3-blender-photo-to-3d/) shipped a couple of weeks back. An app that
does the whole reconstruction on-device, with nothing to upload in the first place, sidesteps
that conversation entirely. That's arguably a bigger deal for on-set and on-location adoption
than the splat quality itself, and it's now table stakes rather than a selling point.

## What to actually watch here

Not Scantic specifically — it's a small app competing against a free one with a much bigger
capture and sharing network behind it. What's worth watching is the pattern: capture tools that
used to justify a cloud round-trip on "we need the compute" grounds keep losing that excuse as
phone GPUs catch up, and the ones built account-free and offline-first from day one are the ones
that get let past a studio's data policy without a fight. For anyone doing location or asset
reference work, that's the feature to actually check before the render quality.

Sources: [CGChannel's write-up on Scantic](https://www.cgchannel.com/2026/08/scantic-trains-gaussian-splats-entirely-on-your-phone/)
and [Niantic's own announcement of on-device splat training in Scaniverse](https://nianticlabs.com/news/scaniverse4).
