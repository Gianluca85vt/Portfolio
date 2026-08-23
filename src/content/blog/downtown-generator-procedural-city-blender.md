---
title: A Blender add-on now generates a whole downtown from a few sliders. It kept the part that actually matters.
date: 2026-08-15
category: 3D
author: elia-marcheselli
excerpt: Downtown Generator, a new Geometry Nodes add-on for Blender 5.x, builds full procedural American downtowns from your own asset library. The interesting decision is what it refused to automate.
cover: /img/blog/downtown-generator-procedural-city-blender/cover.svg
---

I saw this one on 80.lv's radar this week and had to stop and look properly: **Downtown Generator**,
a new Geometry Nodes add-on by 3D artist **Mohamed Elsherif**, procedurally builds entire American
downtown blocks inside Blender — set the footprint, and it lays out roads, buildings, street props,
parks and billboards for you. It's built specifically for **Blender 5.x**, so it's already tied to
the [5.2 LTS release](/blog/blender-5-2-lts-what-changed/) most of us are on now.

## What it actually does

You give it city dimensions, it generates the block layout, and then it's asking you for two things
constantly: which building collections to use, and which street props to scatter. That second part
is the one worth dwelling on, because it's not generating architecture out of nothing — it's
assigning and varying **assets you (or someone) actually modelled**. Custom buildings, trees, park
furniture, billboards, all pluggable in through collections rather than locked to a bundled library.
There's a day/night mode for lighting variation too, which is a nice touch for anyone using this to
block out establishing shots at different times.

That's a deliberate design choice, and I think it's the right one. A tool that hallucinated
convincing architecture from a slider would be a toy. A tool that takes the buildings you already
trust and handles the part that's pure tedium — placement, spacing, road logic, variation so block
four doesn't read as a copy-paste of block one — is infrastructure.

## Where this fits in the actual pipeline

Anyone who has blocked out a city environment by hand knows the real cost isn't modelling one good
building. It's the fortieth one that has to look different enough from the first thirty-nine without
you hand-placing every prop on every sidewalk. That's exactly the kind of repetitive spatial logic
Geometry Nodes is good at — the same shift I wrote about with [Blender's procedural feather
tool](/blog/procedural-feathers-blender-geometry-nodes/) a few days ago: take a workflow that used
to mean a week of manual placement, and turn it into rules plus your own assets. Downtown Generator
is the environment-scale version of that same idea.

It's also the Blender-native answer to something that has mostly lived in Houdini or dedicated city
tools until now, similar in spirit to what I covered with [Spline Architect's jump to GPU-scale
instancing in Unity](/blog/spline-architect-gpu-instancing-one-million/) — cheaper, faster procedural
tooling landing inside the DCC you're already working in, instead of forcing a round trip to a
heavier tool just to lay out a street.

## What I'd actually check before building around it

I haven't run this myself yet, so treat this as a first read rather than a verdict. The obvious
question with any procedural city tool is what a block looks like at block forty, not block one —
whether the variation logic actually avoids the "recognisably the same three buildings" problem that
kills a lot of procedural generation the moment a viewer's eye lingers. The other is asset prep
overhead: this is only as good as the building and prop collections you feed it, so the real time
cost moves upstream, to building a library worth reusing across a whole city rather than one street.

Reported pricing on it varies between outlets right now — I've seen it listed both around $30 and
around $40 on Superhive (the marketplace formerly known as Blender Market) — so don't hold me to a
number until you check the listing yourself.

Either way: if you do any kind of urban environment work in Blender and you're tired of hand-placing
street furniture, this is worth a look. Not because it does the art for you — because it doesn't try
to, and hands the boring 90% back to you as a slider instead.
