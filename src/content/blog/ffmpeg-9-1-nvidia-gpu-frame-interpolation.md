---
title: FFmpeg 9.1 interpolates frames on an Nvidia GPU
date: 2026-11-20
category: Tech
excerpt: FFmpeg 9.1's fruc_vulkan filter invents in-between frames on Nvidia's optical flow hardware. The code dates to 2023; a licence kept it out until now.
cover: /img/blog/ffmpeg-9-1-nvidia-gpu-frame-interpolation/cover.svg
sources:
  - outlet: Phoronix
    url: https://www.phoronix.com/news/FFmpeg-9.1-Released
  - outlet: heise online
    url: https://www.heise.de/en/news/FFmpeg-9-1-adds-frames-with-help-from-an-Nvidia-GPU-11532651.html
artistView:
  take: "Offline interpolation on the optical flow engine is a review tool, and a good one — a 24fps turntable at 60 for a dailies call costs seconds of GPU time. The frames are invented, so it belongs in previs and reference and nowhere near a motion sign-off."
  works:
    - "Pipeline: it runs inside FFmpeg, which is already in every render farm and every capture script, so nobody has to install a vendor SDK to use it."
    - "Performance: the motion vectors come off dedicated silicon rather than a compute pass, which is why this is cheap enough to bolt onto a playblast script."
  misses:
    - "Compositing: optical flow has no concept of a cut and will blend the last frame of one shot into the first of the next, so edited sequences need splitting first."
    - "Review: baked motion blur, hair, transparency and text overlays are where warped frames show their seams, and those are exactly what a lookdev loop is full of."
draft: true
---

In January 2023 Philip Langdale posted a filter to the ffmpeg-devel list that
made an Nvidia GPU invent frames. It wrapped NvOFFRUC, the frame-rate
up-conversion library inside Nvidia's Optical Flow SDK, and by every account it
did the job. It never reached mainline.

FFmpeg 9.1 went out on 20 November 2026 with the capability finally in the
tree, as a filter called `fruc_vulkan`, reaching the same silicon by a
different road.

## What the licence said

NvOFFRUC is closed and non-redistributable. Per the terms as the coverage
describes them, you needed the SDK present to build against it and present
again to run the result, and the binary you ended up with could not be passed
to anyone else.

FFmpeg does keep a corner for awkward licences. The `--enable-nonfree` build
flag exists so a tree can pull in components the project itself will not
distribute. Even that corner has a floor, and the floor is that somebody can
compile FFmpeg and walk away with something usable. A filter that runs only on
a machine carrying a licensed SDK, producing a binary nobody may hand on, falls
straight through it.

So the patch sat in the archive for three and a half years, while the
accelerator it wanted to reach sat in four generations of graphics card.

## The road round it

Optical Flow SDK 5.0 opened a second door: `VK_NV_optical_flow`, a Vulkan
extension that goes through the ordinary extension mechanism and the graphics
driver rather than a separate proprietary library.

The division of labour changes with it. The GPU's optical flow accelerator
still computes the motion vectors — that part is silicon and always was. The
extension hands those vectors back to the application, and then FFmpeg's own
Vulkan compute shader does the rest: warping the two real frames along the
motion and blending them into the one that goes between. The 2023 patch asked
Nvidia's library to perform the whole operation and return a finished frame.
This one asks the driver for motion and writes the interpolation itself, which
leaves nothing closed in the picture except the driver every Nvidia owner
already runs.

`fruc_vulkan` merged to master in late August 2026, three and a half years
after SDK 5.0 opened the route, and it is in 9.1.

## Which cards, and the bit nobody reconciles

Nvidia's own SDK documentation puts a hardware optical flow accelerator in
every GPU from Turing onward, which includes the RTX 20 series. The Vulkan path
is narrower than the silicon. Reports on the merge put support at Ampere and
newer — the RTX 30 series up — and Guru3D states flatly that RTX 20 cards are
not covered by this implementation.

None of the coverage I read squares those two facts, and the gap matters if you
own a 2080: the accelerator is in the chip, and the extension that would reach
it may not be. On top of that the filter wants a compute queue and an optical
flow queue, `VK_KHR_maintenance9`, a driver exposing the extension, and an
FFmpeg built with Vulkan support. The usual answer to all of that is to run
`ffmpeg -filters` and look.

## What it is good for at a desk

A turntable rendered at 24 and smoothed to 60 for a review call. A lookdev loop
that needs to read as motion rather than as a slideshow. Reference footage shot
at whatever the camera gave you, brought up to the plate rate so you can scrub
it against the shot. This is cheap enough to put in a playblast script and
forget about, which is the whole appeal: no SDK, no licence negotiation, a
filter in the same binary that is already writing your dailies.

The failure cases are specific and worth knowing before you trust one:

- A cut. Optical flow sees two frames and looks for motion between them, so
  across an edit it will cheerfully melt one shot into the next. Split the
  sequence first.
- Baked motion blur. Interpolating footage that already carries a shutter gives
  you a smeared frame warped along vectors derived from smear.
- Hair, foliage, anything with alpha. Thin moving geometry is where warped
  pixels announce themselves.
- Burned-in text and UI. Frame counters and HUD overlays sit still while the
  world moves, and the flow field does not care.

The honest limit is the one worth saying out loud to whoever asked for the
60fps version: those frames do not exist. The renderer never made them. For
timing, silhouette and a sense of weight, interpolated playback is fine and
often better than watching a 24fps loop stutter. For anything being signed off
on motion — a run cycle, a cloth sim, a camera move — you are approving a
guess.

It also does nothing whatsoever for a game. This is a filter that runs after
the fact, on finished frames, with as long as it likes. The realtime version of
the same idea runs on the same hardware and costs real money:
[DLSS 5's neural pass takes about half the frame rate in NBA 2K27](/blog/dlss-5-neural-rendering-second-gpu-offload/)
before anyone claws any of it back. And when a console is pinned to 30 because
the simulation cannot tick faster — the situation where
[GTA 6 renders at native 1440p on a PS5 Pro exactly as it does on a base PS5](/blog/gta-6-30fps-ps5-pro-same-1440p/)
— no interpolator anywhere in the chain gives the game a faster CPU.

## The other Vulkan thing in this release

9.1 also carries `apv_encode_vulkan`, the first Vulkan encoder for APV, written
by Lynne and merged in July 2026. Vulkan APV decoding had landed earlier in the
year, so the pair is now complete.

APV is the intra-only professional codec aimed at capture and mastering, the
job an artist currently hands to ProRes or DNx. Doing the encode through Vulkan
rather than a vendor SDK means it rides whatever GPU the driver exposes instead
of one company's silicon and one company's terms — the same lesson as the
interpolation filter, arrived at from the opposite end of the pipeline.

Three and a half years is a long wait for a feature that was sitting in the
chip the whole time, unreachable for reasons that had nothing to do with
engineering.

---

*Release date and contents from Phoronix's 20 November 2026 report and heise's
write-up of the same release. Licensing history, the SDK 5.0 Vulkan route and
the August 2026 merge from the coverage of the merge; Turing-onward accelerator
support from Nvidia's Optical Flow SDK documentation. The Ampere-versus-Turing
discrepancy is unresolved in the sources and is flagged as such above.*
