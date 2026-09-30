---
title: "Witcher 3 on Switch 2: 720p buys the lighting"
date: 2026-09-30
category: Games
excerpt: Handheld Switch 2 renders at 720p so the remaster can afford its new lighting and denser foliage. On PC the same rework ships as full path tracing.
cover: /img/blog/witcher-3-remastered-switch-2-720p-lighting-budget/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/witcher-3-steam-most-played-record-remastered
  - outlet: Nintendo Life
    url: https://www.nintendolife.com/news/2026/08/the-witcher-3-remastered-resolution-and-frame-rate-for-switch-2-revealed
  - outlet: NVIDIA
    url: https://www.nvidia.com/en-us/geforce/news/witcher-3-wild-hunt-remastered-path-tracing-dlss-4-5-ray-reconstruction/
artistView:
  take: "An eleven-year-old game has one lever left that reaches every surface at once, and CD Projekt Red pulled it. You cannot re-author the assets in a free upgrade. You can re-light them, and that is where the whole budget went, from the handheld build to the path-traced one."
  works:
    - "Lighting: the global illumination rework changes how every surface in the game reads without anyone opening a single source file, which is the only upgrade at that scale a remaster can still afford."
    - "Scalability: one lighting rework stretched from a 720p handheld target to full path tracing means the rig was authored to scale rather than hand-tuned per platform."
  misses:
    - "Resolution: on the stated handheld targets, denser foliage at 720p is the worst pairing in real-time rendering — thin vegetation undersampled is where temporal shimmer lives."
draft: true
---

720p.

That is the handheld target CD Projekt Red gave for The Witcher 3 on Switch 2 — 1080p docked, 30 to 40fps with VRR in both, closer to 40 where the TV runs at 120Hz. Nintendo Life reported those figures in August, ahead of the 29 September launch, and they are stated targets rather than measured output; I have not seen a shipped capture analysis yet.

The reason attached to them is what makes this worth writing about. CDPR said the resolution came down because the budget went to lighting and shadowing, and to raising the density of flora and fauna. That is a choice somebody argued about in a room. On a handheld, resolution is the cheapest, most visible thing you can spend on, and they spent it somewhere else.

## What you buy when you sell pixels

Dropping from 1080p to 720p on the same panel is roughly a 56% cut in pixels shaded per frame. Everything that runs per-pixel gets that discount at once: the lighting, the shadow filtering, the ambient occlusion, the material evaluation. You hand the saving to the frame budget and then decide what to buy with it.

Buying resolution back is the safe call. It is also the one that shows up least in motion, because a game running at 30fps on a seven-inch screen is being judged on whether the world looks *lit*, not on whether a roof tile has a clean edge. Bounce light in a Novigrad alley, a shadow that softens with distance from the caster, vegetation thick enough that the ground behind it is not visible — those read at any resolution. Sharpness does not survive the first camera pan.

So the trade is defensible. It also has a cost, and the cost is specific: denser foliage is exactly the content that punishes you for undersampling. Thin geometry, high-frequency alpha, constant movement. That is the classic recipe for shimmer, and it is the one thing a lower render resolution makes measurably worse. Whether the temporal solution in the Switch 2 build holds it together is the question I would want a capture analysis to answer before calling the trade a win.

## The same rework, at the other end of the scale

On PC the remaster ships full path tracing, with DLSS 4.5 Ray Reconstruction, FSR 4 and XeSS 2.0 behind it, on a renderer that CDPR moved to native DirectX 12 and parallelised. Ray-traced hair. A reworked global illumination pass, GTAO, subsurface scattering, a new shading model, a new tone mapper.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=OlmuIckOX0c" target="_blank" rel="noreferrer">
    <img src="/img/blog/witcher-3-remastered-switch-2-720p-lighting-budget/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from CD Projekt Red's Witcher 3 Remastered launch trailer" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>CD Projekt Red's launch trailer for the Remastered edition. It opens on YouTube rather than playing here: an 18-rated game's trailers are usually age-gated, and an age-gated video refuses to run inside any embed.</figcaption>
</figure>

Those two builds run one lighting rework between them, not two. A studio can tune a rig per platform — plenty do, and it is why the handheld version of a game sometimes looks like a different art direction. Shipping a GI solution that survives from a path-traced 5090 down to a 720p portable means the rig was authored to degrade rather than to be rebuilt at the bottom. That is a pipeline decision made early and paid for over a long time, and it is the part of this release I would actually want to read a postmortem on.

## Why lighting was the only big lever left

I wrote in August that [the 2026 overhaul was going after the lighting](/blog/witcher-3-remastered-2026-lighting-overhaul/) and that the thirty-plus bullet points around it were mostly marketing units. The shipped version makes the reason clearer than the announcement did.

A remaster inherits its asset base. The meshes, the UV layouts, the texture budget — all of it was set in 2013 and 2014 and none of it can be meaningfully changed in something given away free to everyone who already owns the game. When CD Projekt Red's own art directors say [Night City runs at twice The Witcher 3's texel density](/blog/night-city-hand-built-texel-density/), that gap is not something a patch closes. Texel density is a production-wide decision that every asset inherits on day one; you cannot retrofit it eleven years later without re-authoring the game.

Lighting is different. Change the solver and every surface in the world responds, including the ones nobody has opened since 2015. It is the one upgrade whose reach is the whole game and whose cost is a rendering team rather than an art department. Which is why it gets the budget on a 5090 and on a handheld alike.

## 120,324

That is the concurrent Steam peak The Witcher 3 hit on 29 September, per Eurogamer — an all-time record for the game, past the roughly 103,000 it drew when the Netflix series landed in 2020. Trackers disagree slightly at the top end; SteamDB's reading was a little under 121,000.

Free helps. The upgrade went out to every version of the game that exists, on every storefront, which means the install base did not have to decide anything — it just woke up with a new renderer. But an eleven-year-old single-player RPG setting its all-time concurrent record eleven years in is still a strange and good number, and it happened on the back of a lighting pass.
