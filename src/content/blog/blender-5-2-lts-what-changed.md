---
title: "Blender 5.2 LTS: what changed, and what did not"
date: 2026-08-07
category: 3D
cover: /img/3d/render-01.png
excerpt: Two years of support, ACES colour management built in, and a compositor that finally got rebuilt.
---

**Blender 5.2 LTS** landed on 14 July, supported until **July 2028**. If you work on
projects that outlive a release cycle — and most client work does — LTS is the version you
actually want to be on. Two years of fixes without the feature churn.

Here is what is genuinely worth knowing, rather than the full changelog.

## Colour management grew up

This is the big one for anyone doing client work, and it went under the radar.

Blender 5 brought **HDR output, HDR view transforms, and both ACES 1.3 and ACES 2.0
support**. You can now set Blender's working space to **ACEScg or Rec.2020** for wide-gamut
projects.

If you have ever had to match a render to footage graded in ACES, or hand a shot to a
compositor who works in ACEScg, you know exactly how much friction this removes. That used
to be an OCIO config you cobbled together and hoped survived the next update.

## Cycles got faster where it hurt

The volume improvements are the standout. Volume rendering picked up a **new unbiased
null-scattering method**, and **GPU volume sampling got faster**. Anyone who has watched a
fog or smoke shot crawl through a render farm will feel that.

Also worth noting: **adaptive subdivision is no longer experimental**. It has been sitting
in that limbo for years. There is also **thin film interference for metal materials** —
useful for anything iridescent, oil, coated surfaces — and **improved subsurface
scattering**.

## EEVEE quietly got better at hair

More realistic **hair thickness** and **improved self-shadowing**, plus **faster probe
baking** and **more responsive material overrides**.

The probe baking one matters more than it sounds. Iteration speed in EEVEE is the whole
point of using EEVEE; anything that shortens the loop between "change a light" and "see the
result" is worth more than a headline feature.

## The compositor was rebuilt

A full redesign. Node trees are now **independent data blocks**, which means you can reuse
a comp setup across scenes instead of rebuilding it. There is an **asset shelf of prebuilt
effects**, plus **improved lens distortion, new convolution tools, a sunbeams mode and
better glare filters**.

Node trees as data blocks is the structural change here. Everything else is polish on top.

## What is still coming

The 2026 roadmap has **layered textures, animation layers, non-photorealistic rendering, a
new hair solver**, and further Cycles and VR work, spread across 5.1, 5.2 and 5.3.

The NPR work is the one I am watching. Blender has been the practical choice for stylised
rendering for a while now despite the toolset rather than because of it.

## Should you update

If you are on 4.x and shipping work: yes, but move to **5.2 LTS specifically**, not the
latest release. You want the two-year support window, not the newest features.

If you are mid-project: finish the project first. This is always the answer and it is
always correct. Colour management changes in particular have a habit of shifting your
renders in ways you notice three shots later.
