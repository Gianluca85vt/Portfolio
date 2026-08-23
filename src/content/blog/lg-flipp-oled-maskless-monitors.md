---
title: LG says it's finally beaten the 25-year-old stencil behind every OLED screen, and monitors get it first
date: 2026-08-20
category: Tech
author: piero-lanzoni
excerpt: LG Display unveiled FLiPP, a photolithography process that patterns OLED subpixels without the fine metal mask every panel has used since the format existed. The claimed numbers are big. The timeline is not soon, and I've seen this exact promise fail to ship before.
cover: /img/blog/lg-flipp-oled-maskless-monitors/cover.svg
---

LG Display unveiled a new OLED manufacturing process called **FLiPP** at IMID
2026 in Busan on **19 August**. The name stands for **FMM-Less innovative
Pixel Patterning**, and buried in that acronym is the actual news: LG says it
has found a way to make an OLED panel without the part that has defined how
every OLED panel gets made since the technology existed.

## What the mask actually does

Every OLED panel you have ever looked at, mine included, got its red, green
and blue subpixels onto the glass the same way: vacuum-evaporate the organic
material through a **fine metal mask**, a sheet of metal punched with holes
finer than the pixels themselves, so each color lands only where it's
supposed to. It works like a stencil. It has worked like a stencil for about
twenty-five years.

Stencils have limits. A fine metal mask sags and warps as panels get bigger,
which is a real ceiling on precision at scale. You need a new custom mask for
every panel size and resolution, which is tooling cost baked into each SKU.
And a meaningful amount of organic material lands on the mask instead of the
glass and gets thrown away.

FLiPP replaces the stencil with something closer to a semiconductor process.
LG coats the RGB organic material across the **entire substrate**, then uses
**UV photolithography** — expose, then etch away what you don't want — to
leave the correct pattern behind. It's the same subtractive logic chip
fabs have used for decades, applied to a display substrate instead of
silicon. LG is reportedly leaning on manufacturing experience from its
existing Tandem WOLED TV lines to pull it off without inventing an entirely
new equipment category from scratch.

## The numbers LG is claiming

Compared to a conventional FMM panel under matched conditions, LG says
FLiPP delivers:

- **1.6x brightness**
- **2.4x lifespan**
- **13% lower power draw**
- **~55% larger aperture ratio** — more of each pixel is actually open to
  emit light, instead of being masked off
- **Up to 64% higher mother-glass utilization**, and LG says it's the first
  company to run an FMM-less OLED process on a full, undivided 8.5-Gen sheet
  rather than a divided one

The size pitch is the part that actually changes the shape of the product
line: LG is framing FLiPP as one process that scales from **1-inch panels
(wearables, VR/AR) up to 100-inch TVs**, with no new mask tooling required
per size. That's the ceiling a stencil imposes, gone.

Every one of those figures is LG Display's own comparison, not an
independent lab's. I found no third-party benchmark of a FLiPP panel
anywhere in current coverage — for the obvious reason that nobody outside
LG has one to test yet.

## Where it actually lands first, and when

LG says the initial rollout targets **tablets and monitors**, ahead of
wearables and eventually large-screen TVs. The company is putting **3
trillion won (roughly $2.1 billion)** behind converting production capacity
for it. Multiple outlets reporting from the IMID floor put **mass production
no earlier than late 2027**, on a fab line that's still being converted for
the process. No monitor or laptop manufacturer has been named as a launch
partner, and no product exists yet to point at.

I want to flag something LG's own materials didn't say, because it's the
part I actually care about and I don't want to misrepresent it as their
claim: nobody in the coverage I could find ties FLiPP specifically to
color-critical or reference-grade monitors. That connection is mine, not
theirs. But a higher aperture ratio and a longer-lived panel are generically
relevant to exactly the kind of screen an environment artist stares at for
ten hours a day with a toolbar and a timeline burned into the same forty
pixels — OLED burn-in on static UI chrome is a real, if usually slow, cost
of grading and comping on these panels, and anything that meaningfully
extends panel life works in that piece's favor. I'd rather say that plainly
as my own inference than let it read like something LG promised, because
they didn't.

## Why I'm not clearing shelf space for one yet

I've watched this exact promise before, and it didn't ship. **Japan
Display's "eLEAP"** process is the same basic idea — photolithography
instead of a fine metal mask — announced with similar language, and it has
spent years failing to reach real commercial volume. That's not proof FLiPP
fails the same way. LG has a scale and a balance sheet JDI doesn't, and it's
explicitly reusing existing Tandem WOLED infrastructure rather than starting
cold. But "we solved the stencil problem" is a sentence the display industry
has heard before from a company that, in the end, couldn't get yields where
they needed to be. China's Visionox and TCL CSOT are chasing the same
FMM-free goal from different angles, on their own timelines, which tells you
this isn't a solved problem so much as a problem everyone currently making
OLED panels is racing to solve at once.

So: a genuinely interesting manufacturing story, with numbers I'd love to
see hold up, on a line that doesn't start production for at least another
year, for a product nobody has announced. I'll believe the aperture ratio
when a review outlet has one on a bench, not when it's a slide at a trade
show. Filing this one to check back on in 2027.

Sources: [Forbes](https://www.forbes.com/sites/johnarcher/2026/08/19/lg-display-develops-new-oled-panels-with-more-brightness-and-longer-lifespans/),
[VideoCardz](https://videocardz.com/newz/lg-display-unveils-flipp-oled-technology-with-up-to-1-6x-higher-brightness-and-2-4x-longer-lifespan),
[WCCFTech](https://wccftech.com/lg-display-introduces-flipp-oled-technology/),
[OC3D](https://overclock3d.net/news/gpu-displays/cheaper-brighter-better-lg-unveils-its-oled-flipp-technology/),
and [Notebookcheck on JDI's eLEAP precedent](https://www.notebookcheck.net/LG-Display-tests-JDI-s-eLEAP-OLED-tech-promising-brighter-more-efficient-panels.1048911.0.html).
All performance figures are LG Display's own comparisons as presented at
IMID 2026; none have independent verification yet, and no commercial
product or partner has been named as of this writing.
