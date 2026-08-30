---
title: A hand-painted dormitory that paints its own light
date: 2026-08-24
category: 3D
excerpt: Morgane Muller's Spellbound Dormitory, covered by 80.lv this week, gets its stained-glass windows to glow without a single translucent shader.
cover: /img/blog/spellbound-dormitory-hand-painted-stained-glass/cover.svg
---

**Morgane Muller**'s **Spellbound Dormitory**, covered by 80.lv this week, is a four-month
final-year environment built at **Artside** from a concept by **Gabriel Nagypal**, under
the supervision of Sacha Veyrier, Quentin Ferlay, Yoan Autin, Lionel Cregut and Clément
Masset. The scene is a school dormitory, dressed almost entirely by hand.

<figure>
  <img src="/img/blog/spellbound-dormitory-hand-painted-stained-glass/cover.svg" loading="lazy" width="1200" height="900" alt="" />
</figure>

## What the coverage actually says

Two details from 80.lv's write-up are worth pulling out on their own: Muller broke the
scene down into individual hand-painted elements rather than leaning on a tiling PBR
material set, and the stained-glass windows read as translucent without any actual light
transmission behind them — the glow is painted, not simulated.

## Why that second one is the interesting problem

Real translucency — light entering a surface, scattering, and leaving somewhere else —
is one of the more expensive things a renderer can be asked to do. Subsurface scattering
or a refraction pass through coloured glass means tracing what happens *inside* the
material, not just how it reflects. In a real-time engine that is a budget line: a
translucent shader with backscatter costs more per pixel than an opaque one, and a scene
with a dozen stained-glass panels multiplies that cost by every light source hitting them.

Painting the illusion sidesteps the simulation entirely. You are not calculating how
light passes through the glass — you are painting what a viewer's eye expects that
result to look like: a warm colour ramp near the light source, a cooler falloff further
from it, a soft-edged bloom where the panes would be brightest. None of it is physically
there. All of it reads as if it were, because the human visual system is doing the same
shortcut we are — pattern-matching against what stained glass has looked like in every
photo it has ever seen, not measuring photons.

This is the same reasoning that makes baked lighting work at all, just applied at the
texture level instead of the lightmap level. A technical artist reaching for real-time
translucency will still want it for anything the camera moves close to or that changes
lit state — a painted glow does not react to a flickering torch. But for a fixed
architectural read, in a scene that is being hand-painted throughout anyway, faking the
physics is not a compromise, it is the consistent choice: the rest of the environment is
already lying about light in exactly the same way, one brushstroke at a time.

## Dividing the scene into individual pieces

The other detail — breaking the environment into separate hand-painted elements rather
than tiling a shared material library — is the more time-consuming decision and the one
that makes the trick above possible in the first place. A tiling PBR set has to look
correct under arbitrary lighting because it does not know in advance what light will hit
it. A hand-painted, non-repeating element can bake in exactly the lighting the artist
wants, because it is only ever going to sit in this one spot in this one scene. That is
the trade a hand-painted pipeline makes across the board: slower to build, no reuse, but
every surface gets to lie in a specific, art-directed way instead of a generic one.

---

*Based on 80.lv's coverage of the project and Muller's own credits for it — I have not
seen a full texture or lighting breakdown of the stained-glass work itself, so treat the
technical reasoning above as informed extrapolation from the published summary, not a
confirmed step-by-step of how the panels were actually painted.*
