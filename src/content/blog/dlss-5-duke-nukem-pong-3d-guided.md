---
title: "DLSS 5 on Duke Nukem and Pong: no 3D to guide it"
date: 2026-10-06
category: AI
excerpt: Nvidia says DLSS 5 anchors to source 3D content and motion vectors. A DOS game in DOSBox supplies neither, so the model fills the gap from habit.
cover: /img/blog/dlss-5-duke-nukem-pong-3d-guided/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/retro-gaming/madlad-applies-dlss-5-to-the-original-duke-nukem-and-pong-tens-of-games-tested-with-outcomes-ranging-from-trippy-to-genuinely-interesting
  - outlet: XDA Developers
    url: https://www.xda-developers.com/i-tested-the-leaked-dlss-5-and-its-doing-something-to-old-games-that-nvidia-probably-didnt-intend/
  - outlet: NVIDIA Newsroom
    url: https://nvidianews.nvidia.com/news/nvidia-dlss-5-delivers-ai-powered-breakthrough-in-visual-fidelity-for-games
artistView:
  take: "Pointed at a 16-colour sprite the model stops reading a scene and starts recalling one. The embossed bricks in Duke Nukem are the giveaway: nothing in that image says a brick is raised, so the raise came from training data rather than from the game."
  works:
    - "Separation: on published footage the pass holds the player, the enemies and the bullets apart from the background and mostly leaves their interiors alone, which is more silhouette discipline than I expected from a filter with no depth buffer to read."
    - "Relief: the embossing on rectangular level geometry lands as depth because EGA tiles are already drawn as flat faces of solid objects. It happens to guess the right shape from the right shapes."
  misses:
    - "Temporal stability: strip the motion vectors and each frame is a fresh guess. Kryzhanovsky's own read is that force-injected DLSS 5 holds up best on stills, which is a polite way of describing crawl."
    - "Art direction: a 320x200 palette of sixteen colours was a constraint somebody composed around. Repainting it with photoreal material response throws away the readability that the constraint bought."
draft: true
---

Read Nvidia's own description of DLSS 5 and the limit is written into it. The model
takes a game's colour and motion vectors each frame, and it infuses the scene with
photoreal lighting and materials that are **anchored to source 3D content** and kept
consistent frame to frame. Nvidia's GeForce write-up of the NBA 2K27 implementation
is blunter still in its own URL, where the thing is called 3D-guided neural
rendering.

Hold that phrase for a second, because Valery Kryzhanovsky has spent the last few
weeks pointing it at games that have no 3D in them at all.

## Pong, 1972

The test set runs wide — tens of titles, from 2D platformers and RPGs up through The
Witcher 3 and Marvel's Spider-Man. The end everybody is sharing is the DOS end:
Duke Nukem, the 1991 Apogee platformer, 320x200 in sixteen EGA colours. And Pong.

Getting there takes a stack. The DOS games run in DOSBox, ReShade carries the
injection, and RenoDX supplies the interface for the parameters. Which injection
point you pick matters — render stage, after upscaling, or final output — and that it
matters this much is worth noticing on its own. A pass that genuinely understood the
scene would be less sensitive to where in the chain you bolted it.

What comes out is stranger than broken. Rectangular level geometry gets embossed, so
flat tiles read as raised surfaces. The pass finds the player sprite, the enemies and
the bullets, and largely declines to scribble inside them. Turn the strength up and
the whole thing slides into an acid trip, which is the expected failure and the least
interesting one.

<figure>
  <button class="video-embed" data-video="TtIN4YK0eBI" data-title="DLSS 5 on Older Games - Feels Refreshing I (5 Games Tested)" type="button">
    <img src="/img/blog/dlss-5-duke-nukem-pong-3d-guided/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a side-by-side test of DLSS 5 injected into older games" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A mid-September side-by-side of DLSS 5 injected into five older 3D games at 1440p. Not the DOS experiment above — this is the end of the test range where the pass still gets motion vectors, which is the comparison worth having.</figcaption>
</figure>

## Nothing to anchor to

The library doing this is the one that fell out of an NBA 2K27 build in August —
[a generative pass that runs after the frame is finished](/blog/dlss-5-leak-generative-pass-finished-art/),
rather than a renderer feature anybody shipped on purpose. In a modern engine it at
least gets the inputs it was trained on. In DOSBox it gets none of them. No motion
vectors. No depth buffer. No source 3D content, which is the exact thing Nvidia's
page says the output is anchored to.

So the model has a flat image and a prior about what images of the world look like,
and it uses the second to invent the first. The embossed bricks are the clearest
evidence. Nothing in Duke Nukem's tile art encodes that a brick protrudes — the
artist drew a face, not a volume. The model raised it because bricks are usually
raised. It was right, and it was right by coincidence of what it had been shown, not
by reading anything in front of it.

That is a different claim from "it looks bad". Some of it looks genuinely good. I
have not run the stack myself; this is read off published footage and two write-ups,
and anyone telling you how the crawl behaves in motion from a compressed YouTube clip
is guessing a little too.

The temporal weakness follows from the input list rather than from any bug.
Kryzhanovsky's conclusion is that the technology is promising and undercooked, and
that the absent temporal element is its key drawback. Of course it is. Frame-to-frame
consistency in DLSS 5 is bought with motion vectors, and DOSBox has never had any to
hand over. Each frame gets its own opinion about where the light is.

## The cost that stops mattering

There is one accidental joke in all this. The reason neural rendering is a hard sell
in a current game is the bill: it
[takes something like half the frame rate](/blog/dlss-5-neural-rendering-second-gpu-offload/)
in NBA 2K27, which is why people started handing the pass to a second GPU. Duke Nukem
is 64,000 pixels of sixteen colours. There is nothing to lose. The most expensive
post-process Nvidia has ever shipped is free the moment you aim it at 1991.

Which makes this the cheapest honest test bench we have for what the model knows. Run it on Cyberpunk and you cannot separate the model's contribution from the
good lighting that was already there. Run it on sixteen colours and every single
thing in the output that was not in the input came from the weights.
