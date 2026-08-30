---
title: True Depth V3 turns one photo into a Blender scene
date: 2026-08-17
category: 3D
excerpt: True Depth V3 adds proper camera-projection scenes and one-click HDRI studios on top of its depth-map displacement, all running locally off a single 2D image.
cover: /img/blog/true-depth-v3-blender-photo-to-3d/cover.svg
---

Saw this cross BlenderNation this week: **True Depth**, the Blender add-on that turns a flat
image into 3D geometry, shipped a **V3 update** that's a genuinely bigger jump than the version
number suggests. Worth stopping on, because the underlying trick — camera projection from a
single reference — is one every matte painter and environment artist already knows by hand. This
just automated the part that used to eat an afternoon.

## What it does

True Depth runs a monocular depth-estimation model (it's built on the **second generation of
DepthAnything**) over any image you feed it, generates a depth map, and displaces it into real
geometry — no photogrammetry rig, no LiDAR scan, no reference set of overlapping shots. One
image in, mesh out. All of it runs **locally**, on your own GPU, not through a cloud API.

V3 adds three modes on top of the original flat-relief displacement:

- **Flat Relief** — the original mode: a 2.5D displacement straight off the depth map, good for
  quick paintover-style bumps.
- **Perspective** — builds an actual camera-projected 3D scene from the image, stretched back
  into depth. This is the one that matters for environment work.
- **360° HDRI** — takes an HDRI environment and projects it onto a dome, giving you a rough
  lighting/staging setup in one click.

It also now claims print-ready output for anyone wanting to take a depth relief into physical
form, though that's the least interesting part of this for a games or film pipeline.

## Where this actually lands in a pipeline

Camera projection onto rough geometry is not a new idea — it's how matte paintings have been
integrated into live-action and CG shots for decades, and it's how a lot of previz environments
get built when there's no time to model anything real. What's new is that the depth pass, which
used to be either hand-painted or reconstructed from multiple photos, now comes out of a single
image in seconds, locally, without sending anything to a third-party server.

That matters for the boring but real reason: a lot of studio pipelines still won't let you run
concept art or location photography through a cloud AI service, full stop. A tool that does the
estimation on your own machine sidesteps that conversation entirely, which is probably a bigger
deal for adoption than the depth quality itself.

The honest use case is **previz and pitching**, not production geometry. If an art director hands
you a location photo or a concept painting and asks "can we get a camera move through this by
Friday," True Depth's Perspective mode gets you a plausible, lit, movable-camera version of that
image in an afternoon instead of a week of manual projection setup and geometry sculpting. That's
genuinely useful — it's the difference between showing someone a flat image and showing them a
shot.

What it isn't is a replacement for actual environment modelling. Monocular depth estimation has a
hard ceiling: it infers depth from a single vantage point, so anything the camera didn't see —
the back of that building, what's actually behind the foreground tree — doesn't exist. Push the
camera more than a little off the original angle and you'll see the stretching and the holes
where occluded geometry should be. That is the physics of working from one
image instead of a scanned or modelled scene. Anyone who's tried to fake depth with a single
parallax-mapped card in a game engine will recognise the limit immediately.

## The actual value

The right way to think about this is as a faster front end to a process environment artists
already run informally — project a photo onto a rough proxy to sell a camera move before
committing to a build. True Depth just compresses the "generate a usable depth pass" step from
hours to seconds and does it without a cloud round-trip. Worth having in the toolbox for pitching
and blocking, not worth mistaking for a shortcut around modelling the thing for real.
