---
title: "Blender's OVERGROWN teaser: painterly shadows"
date: 2026-09-15
category: 3D
excerpt: Blender Studio's first OVERGROWN footage landed on 14 September. The painterly shadows in it are solved in the geometry that casts them.
cover: /img/blog/blender-overgrown-teaser-painterly-shadows/cover.svg
draft: true
---

The shadow is what gives away a painterly render, every time.

You can spend a month on brushwork. Loose edges on the foliage, visible strokes
in the bark, a sky that looks like somebody put it there with a wide brush and
then walked away. Then the sun comes round and drops a shadow on the ground
that traces the silhouette of your mesh to the millimetre — every leaf, every
subdivided curve, razor sharp and geometrically perfect. The frame stops being
a painting. It becomes a render of a painting.

Blender Studio put out the first OVERGROWN teaser on 14 September, and the
shadows in it are the part worth pausing on.

## Where they put the fix

The obvious place to attack this is compositing. Grab the shadow pass, push it
through some noise, break the edge up with a texture, call it done. It works on
a still. It falls apart the moment the camera moves, because the noise lives in
screen space and the shadow lives in the world, and the two slide against each
other like a badly tracked matte painting.

Blender Studio went the other way. Rather than treating the shadow, they
treated the thing casting it: brushstroke geometry is generated around the
silhouette edges of the caster, so the object throwing the shadow already has a
ragged, painted outline in three dimensions. The shadow inherits that for free.
It is broken up because the geometry blocking the light is genuinely broken up,
which means it stays broken up when the camera swings, when a second light
comes in from the side, when the object turns.

They keep the cast shadows fairly soft on top of that, which lets the bumpy
surface of the brushstroke geometry do more of the breaking-up work without
anyone having to art-direct it shot by shot.

This is the same instinct behind [Imageworks putting ink lines into the geometry
so they follow a moving character](/blog/spider-verse-inklines-grease-pencil-geometry-nodes/)
rather than drawing them in post. Solve a stylisation problem at the point where
the look is generated and it survives motion. Solve it downstream and you are
signing up to babysit every shot.

## The tool came off another film

The brushstroke setup doing this work was not built for OVERGROWN. It came off
Project Gold, and it ships as the Brushstroke Tools extension, free, written by
Simon Thommes — who also recorded the painterly shadows masterclass the studio
released during its archive week.

Which is the whole pitch for how Blender Studio operates. A tool gets built
because a short film needed it, then the next production picks it up, then it
turns into an extension anybody can install. The films are expensive proofs that
the tools work under load. That is a slower loop than a studio simply buying a
licence, and it is the reason a hobbyist can download the exact node setup that
made the shadows in a feature teaser.

## They did not use it everywhere

The detail I like most: the painterly shadows were applied selectively, on the
shots where the studio judged they would make a difference, and left off
elsewhere.

Anybody who has shipped a stylised look knows why. These setups are not free.
Brushstroke geometry multiplies your primitive count, it complicates every
shadow-casting light in the scene, and it turns a two-minute render into
something you schedule. On a ten-minute short you can afford to be a purist. On
a feature — and OVERGROWN is Blender Studio's first attempt at feature length —
you are making a budget decision on every shot, and the honest answer is that
most shots do not need it. Picking which ones do is a craft skill nobody teaches
and everybody in the job eventually learns the hard way.

That kind of triage is exactly the sort of thing a short film's pipeline never
forces you to write down, and a feature punishes you for not having.

## The money is still the open question

The teaser is a proof of concept twice over: it argues the story works, and it
argues the pipeline holds. Blender Studio has said it wants 7,000 subscribers by
the end of September, a number it puts at roughly 20% of the film's development
funding. As of mid-September that target was still ahead of it, which is the
same position the project was in when the studio
[opened every OVERGROWN production log to non-subscribers for a week](/blog/blender-studio-overgrown-open-doors-week/)
at the start of the month.

Six production logs cover the run from early development through animation,
shading, lighting, effects, music and final compositing. If you want to see how
a painterly feature is actually assembled rather than how it looks when it is
finished, that archive is the reason to care about this project even if the
film never gets made.
