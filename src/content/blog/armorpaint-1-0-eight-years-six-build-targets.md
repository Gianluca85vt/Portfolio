---
title: "ArmorPaint 1.0: eight years, six build targets"
date: 2026-09-04
category: 3D
excerpt: ArmorPaint tagged 1.0 on 3 September, eight years into early access. Source still free under zlib, binaries still $19, and six build targets explain the wait.
cover: /img/blog/armorpaint-1-0-eight-years-six-build-targets/shot-01.jpg
draft: true
---

ArmorPaint has a version number now. The repository tagged **1.0** on 3
September 2026, under the release name 26.09, and the eight years of early
access sitting behind that tag are the part worth looking at.

Eight years is a long time to withhold a 1 from software people have been
shipping work with since at least 2019 — the first tutorials and trade write-ups
date from that autumn. Blender exports, game props, hard-surface kit. It has
been in real pipelines for most of that run, wearing a 0.x the whole time. What
kept the count from moving is visible in the build instructions.

## Six targets and a compiler for each

The readme tells you how to build it, and the list is longer than you expect
from a painting app. Windows x64 with Visual Studio and clang. Linux x64 with
clang. macOS on arm64 through Xcode, iOS on arm64 through Xcode again, Android
arm64 through Android Studio, and a WebAssembly target on top. Six platforms,
four toolchains.

Underneath those sit the graphics backends, and this is where the real bill
comes due. ArmorPaint paints on the GPU. A brush stroke is a pass over the
texture rather than a CPU blit into a buffer, which is what lets it do things
like ray-traced baking with the viewport still live. That design commits it to
Direct3D 12 on Windows, Vulkan on Linux and Android, Metal on Apple hardware.
Three APIs that agree about almost nothing — resource binding, command
submission, synchronisation, how a compute pass hands its result to a draw call.

So a new brush behaviour is not one piece of work. It is the feature, then the
same feature reasoned through three memory models, then whatever falls over on a
phone. Miss a barrier on one backend and you get a stroke that lands a frame
late, or corrupt texels, or nothing at all on the one platform you don't have on
your desk.

<figure>
  <button class="video-embed" data-video="G3w2Qqi0BAI" data-title="Learn ArmorPaint: Import, Paint, Bake &amp; Export [Tutorial]" type="button">
    <img src="/img/blog/armorpaint-1-0-eight-years-six-build-targets/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from an ArmorPaint texturing walkthrough" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A community walkthrough of the full loop — import, paint, bake, export — published in April 2026, on 0.9. It is the clearest look at what the app does day to day, and nothing in it changes with the version bump.</figcaption>
</figure>

Look at the cadence with that in mind. Version 0.8 shipped in October 2021, 0.9
in September 2023, 1.0 now. Two to three years a point release, across 6,000-odd
commits on main. That is what a GPU-native tool costs when one person carries the
porting matrix.

## The $19 has not moved

The funding model is the same one Lubos Lenco has run since the start, and it is
unusually plain about itself. Source on GitHub under zlib, which is about as
permissive as licences get — take it, compile it, ship it, sell it, just don't
claim you wrote it. Prebuilt binaries cost $19 on itch.io. Buy once, updates
free.

The readme is blunt in a way marketing copy never is: the repository targets
developers and may lack stability. Nobody is pretending the free path and the
paid path are the same experience. You are paying for someone else to have
already fought the Android NDK.

For a working artist that is a rounding error against a subscription, and it is
also why the comparison people reach for is the wrong shape. The incumbent is
Adobe's Substance 3D Painter, and the gap between them lives in the ecosystem
rather than the brush engine — the `.sbsar` library, bakers a lead already
trusts, and the plain fact that a studio's texturing conventions are written
against Substance's outputs. A $19 painter does not dislodge that, and was never
going to.

Where it does land is everywhere the subscription is the blocker. Students,
hobbyists, a solo dev on Linux, anyone who needs to hand a texturing step to a
contractor without provisioning a seat. Linux support that is native rather than
tolerated is worth more than it sounds to that group, given how much of the
indie pipeline has drifted onto Blender.

## What the 1 is worth

In features, not much. The 1.0 notes I can reach point at performance and
stability work, with Vulkan brought up to 1.3 — a maintenance release wearing a
milestone number.

The milestone itself is the signal. A 0.x is a standing invitation to be told
your bug report is premature, and eight years of it, on a tool people were
already using in production, is a maintainer being more careful about the label
than his users were. Dropping the 0 says the API surface and the file format are
things he is now willing to be held to. For anyone deciding whether to write a
studio's texturing step against this thing, that is the sentence that mattered.

---

*Release date, tag, build targets, toolchains and the paid-binary policy come
from the project's own GitHub repository and readme. The version history for 0.8
and 0.9 and the eight-year early-access framing come from CG Channel's coverage;
the $19 price and zlib licensing from the developer's own public statements. The
full 1.0 changelog is on armorpaint.org and its forums, both of which I could
not reach at the time of writing, so the feature summary above is drawn from
secondary listings and should be treated as partial.*
