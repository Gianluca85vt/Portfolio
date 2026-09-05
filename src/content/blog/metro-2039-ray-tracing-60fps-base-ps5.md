---
title: "Metro 2039: ray tracing and 60fps on a base PS5"
date: 2026-09-05
category: Games
excerpt: 4A Games says the performance mode holds 4K, 60fps and ray tracing on a standard PS5, not only the Pro. Corridors are what make that promise affordable.
cover: /img/blog/metro-2039-ray-tracing-60fps-base-ps5/shot-01.jpg
draft: true
---

Deep Silver put a new Metro 2039 trailer in [Sony's 3 September State of
Play](/blog/state-of-play-3-september-two-shows/), gave the game a date — **4
February 2027** — and attached a performance claim to it. A mode running 4K,
60fps and ray tracing, on PlayStation 5, PS5 Pro and Xbox Series X.

The base PS5 is the part worth stopping on. Rays at 60, on the machine without
the extra compute.

Two caveats sit on top of that before anything else. The trailer was captured on
a PS5 Pro, so what people watched is the best case rather than the common one.
And "4K" on a console tracing rays at 60fps is a reconstructed 4K. 4A has not
published an internal resolution, and every comparable mode this generation
renders well under the number on the box and upscales to it.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=l7kgpzX9l4w" target="_blank" rel="noreferrer">
    <img src="/img/blog/metro-2039-ray-tracing-60fps-base-ps5/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Metro 2039 gameplay trailer" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>The gameplay trailer shown at State of Play, captured on PS5 Pro. It opens on YouTube rather than playing here, because Metro is an 18 and those uploads are usually age-restricted.</figcaption>
</figure>

## They have done this before

June 2021, Metro Exodus Enhanced Edition. 4A went back into a game that had
shipped in 2019, pulled out its baked lighting and relit the whole thing with
ray-traced global illumination — 4K60 on PS5 and Series X, 1080p60 on Series S.
Not one showcase level. The base game and both expansions.

So the claim turns up with a receipt behind it, which is more than most
performance promises manage.

One absence in the 2039 announcement is worth noting. The platform list for that
mode reads PS5, PS5 Pro, Series X. Series S is not on it. Exodus Enhanced
managed the S at 1080p five years ago, so the omission might mean a lower target
rather than nothing at all — but 4A has not said, and a press line that names
three machines and skips the fourth is rarely an oversight.

<figure>
  <img src="/img/blog/metro-2039-ray-tracing-60fps-base-ps5/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>4A Games and Deep Silver, via the official Steam page</figcaption>
</figure>

## What "ray traced from the start" costs the art department

4A describe 2039 as the first Metro built around ray tracing rather than having
it fitted late. That reads like a marketing sentence. For anyone who makes the
environments it is the most consequential line in the announcement.

A baked lighting pipeline is a mountain of unglamorous work that never appears
in a trailer. Every piece of static geometry needs a second UV channel unwrapped
for its lightmap, laid out without overlaps, texel density budgeted against
memory. Seams get hidden. Light leaks get patched with geometry the player will
never see, sitting there purely to stop a bake going wrong. Probe grids get
hand-tuned for the moving objects a lightmap cannot describe. And all of it is
queued — a lighter changes a bulb, sends it to a farm, finds out tomorrow.

Delete the bake and that whole column of work goes with it. The lighter moves a
light and watches the room change. That is the difference between lighting as a
scheduling problem and lighting as a craft decision, and it is why studios keep
chasing this even in years when the frame cost is worse.

The bake was doing one other thing people forget. It was a guarantee. A lightmap
costs the same every frame, in every room, forever, because the expensive part
happened months ago on somebody else's machine. Rays do not behave like that.
Their cost moves with what is on screen, how far they travel before they hit
something, and how large the acceleration structure has grown.

Which brings it back to tunnels.

## Why a corridor is the friendly case

Metro is a game about enclosed spaces, and enclosed spaces are close to the best
possible input for real-time ray tracing. A ray cast in a tunnel hits a wall
almost immediately, so the average ray is short and cheap. The geometry is
mostly static, so the BVH those rays are traced against gets built once and
largely stays put. Lit volumes are small. Light sources are few, and half of
them are being carried by the player.

Run the same arithmetic in an open world. Rays fired at a sky that returns
nothing, an acceleration structure spanning square kilometres, and a good
fraction of it rebuilding every frame because the traffic moved.

This is the same shape of argument as the one under GTA 6, approached from the
other side of the machine. There the ceiling was [the CPU holding a simulation
together](/blog/gta-6-extended-look-30fps-question/) — cars routing themselves,
crowds with somewhere to be, a second protagonist fighting beside you. Here the
ceiling is GPU time spent on light transport. Different chip, same underlying
question: how much of your scene can you bound in advance? Metro can bound
nearly all of it. Rockstar can bound very little.

None of which makes 2039 the more impressive engineering. It makes it the more
tractable problem, which is a different compliment and a real one.

## The word "performance" moved

There is a small thing in the wording that is easy to skim past. For most of
this console generation, "performance mode" has meant the setting that switches
ray tracing off to reach 60. 4A are using the phrase for the mode that keeps ray
tracing on at 60 — which implies a quality mode above it, doing something more
expensive. More rays, longer ones, a higher internal resolution, some
combination. Nobody has described what that mode is.

Three numbers would settle most of this before February: the internal resolution
in each mode, the reconstruction method on a base PS5, and whether Series S is
getting a version of this at all. A trailer answered none of them. Trailers
rarely do.

---

*Release date, platforms and the 4K/60/ray tracing performance mode from the
3 September State of Play and the coverage published alongside it, chiefly
TheSixthAxis, Gematsu and Worthplaying. Metro Exodus Enhanced Edition figures
from 4A's own 2021 announcement of that release. Internal resolution,
reconstruction method and Series S support are unstated at the time of writing.*
