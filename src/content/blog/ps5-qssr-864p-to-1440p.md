---
title: "PS5 QSSR: 1.8ms to turn 864p into 1440p"
date: 2026-10-03
category: Tech
excerpt: Sony's new upscaler reaches the base PS5 five years in. Digital Foundry measured 1.5 to 1.8ms reconstructing Wolverine from 864p — a tenth of a 60fps frame.
cover: /img/blog/ps5-qssr-864p-to-1440p/video-thumb.jpg
sources:
  - outlet: PlayStation Blog
    url: https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/
  - outlet: TechRadar
    url: https://www.techradar.com/gaming/sony-has-revealed-its-new-qssr-upscaling-tech-for-the-base-ps5-with-tech-analysts-confirming-an-exceptional-quality-boost-for-marvels-wolverine-while-ghost-of-yotei-saw-less-dramatic-improvements
  - outlet: Eurogamer
    url: https://www.eurogamer.net/ps5-ai-upscaling-qssr-marvels-wolverine-ghost-yotei
artistView:
  take: "A reconstructor that holds sub-pixel detail steady changes what an environment artist is allowed to author, not only what the frame counter reads. Five years of base-PS5 work has quietly sanded high-frequency detail out of assets because it boiled at low internal resolutions, and this is the first thing on the hardware that hands some of it back."
  works:
    - "Reconstruction: Digital Foundry's note that moving-foliage artifacts are much reduced covers the hardest case in the category, because a temporal pass guesses where each pixel came from and on a leaf in wind that guess is wrong everywhere at once."
    - "Pipeline: shipping it as a library any PlayStation developer can call means the gain does not depend on a studio employing its own temporal-reconstruction specialist."
  misses:
    - "Scope: both launch titles were authored for the old reconstructor with the fine detail already thinned out, so they are the two games least able to show what QSSR is for."
    - "Budget: 1.5 to 1.8ms is around a tenth of a 60fps frame, and on a fixed box that comes out of shadow resolution, draw distance or internal resolution."
---

Digital Foundry put a number on Sony's new upscaler this week: **1.5 to 1.8
milliseconds** to reconstruct Marvel's Wolverine from 864p to 1440p on a base
PlayStation 5. A 60fps frame is 16.67ms end to end. So the upscaler is taking
nine to eleven per cent of it.

That is the price. What it buys is harder to put in a number, and it lands on
the people building the assets more than on the people reading the frame
counter.

## What Sony shipped

On **1 October** Sony announced Quick Spectral Super Resolution — QSSR — and
patched it into two games the same day: Marvel's Wolverine and Ghost of Yōtei,
in both cases as an extra graphics option rather than a replacement for what was
there. It comes out of Project Amethyst, the machine-learning graphics programme
Sony runs with AMD, the same programme that produced PSSR for the PS5 Pro. PSSR
stays a Pro feature. QSSR is a lighter network with a hand-tuned PS5
implementation, and Sony says any PlayStation developer can call it.

There are two of these rather than one because of compute. A PS5 Pro carries 60
compute units against the base machine's 36 and feeds them roughly 28 per cent
more memory bandwidth. PSSR was built for that headroom and does not fit without
it.

## 864p is the number to sit with

In the mode Digital Foundry measured, Wolverine draws 1.33 megapixels and
presents 3.69. Nearly two thirds of what reaches the screen was invented. That
arrangement is five years old on this hardware, with FSR or a hand-rolled
temporal pass doing the inventing.

Those reconstructors fail in a specific place: fine, high-frequency detail in
motion. A one-pixel leaf edge at 864p is a shimmering dot. Thin railings crawl.
Sharp speculars sparkle into aliasing. Hair boils.

Artists have been compensating for that since 2020, in ways that stopped being
decisions and turned into house style. You thicken the railing. You fatten the
alpha on a foliage card so its edge is never a single pixel. You push roughness
up so a highlight broadens instead of twinkling. You bias the normal map flatter
at distance, add a little more fog, and ship a softer image than the one you
authored. Each of those removes detail from the asset to keep the frame from
boiling.

Which makes Digital Foundry's finding the relevant one: sub-pixel integrity
considerably better, temporal stability substantially improved, artifacts from
moving foliage much reduced. Moving foliage is the worst case in the whole
category. A temporal reconstructor works by guessing where each pixel was last
frame, and on grass in wind that guess is wrong everywhere at once.

Jasmin Patry, lead rendering engineer at Sucker Punch, described it in Sony's
own announcement as a level of temporal stability that has not been possible on
PS5 until now. Taking that at face value, the useful consequence lands on the
next set of assets: detail you have been sanding off because it boiled can stay
on the model.

## Where the 1.8ms comes from

A console frame budget does not grow, so 1.5 to 1.8ms has to come out of
something already in the frame. Shadow resolution, draw distance, a shading
pass, or the internal resolution itself — and that last one has a pleasing
circularity to it, since a team may well drop internal resolution further to
afford the upscaler that makes low internal resolutions hold together. That
trade is the ordinary shape of a reconstruction budget, and it is how 864p
became the number in the first place.

Wolverine is a fair test because Insomniac had already spent that budget hard.
[Ray tracing at 60fps in the game's default mode on a base PS5](/blog/marvels-wolverine-ray-tracing-60fps-base-ps5)
was the thing worth noting back in August, and it fit because of a low internal
resolution and a lot of careful cutting elsewhere. [4A Games made a similar
claim for Metro 2039 and credited its corridors](/blog/metro-2039-ray-tracing-60fps-base-ps5),
which is the same accounting from another direction — you buy the expensive
feature by narrowing what the renderer has to think about.

## Why Ghost of Yōtei gained less

Yōtei improved, but less. Digital Foundry found it running at roughly the same
frame rate as the game's existing FSR 3 pass in the unlocked performance mode,
with a smaller lift in image quality than Wolverine showed.

Read that as a statement about Sucker Punch. Their grass and wind work is among
the most tuned of its kind on the platform, and they had already paid for
stability — in custom temporal code, in authoring discipline, in art direction
that leans on silhouette and large shapes where a thinner image survives. A
better reconstructor is worth most to the team that had the worst one. Yōtei had
little left to recover.

So the two launch titles are the games least able to demonstrate the point. Both
were authored under the old constraint, with the fine detail thinned out before
anyone wrote a patch note. Hand a studio a stable reconstructor at the start of
a project instead of six years in and the assets come out different.

<figure>
  <button class="video-embed" data-video="FQW6K7TLvQA" data-title="Hands-On with QSSR - AI Upscaling For Standard PS5 - Image Quality, PSSR Comparisons + More" type="button">
    <img src="/img/blog/ps5-qssr-864p-to-1440p/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Digital Foundry's QSSR analysis" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Digital Foundry's hands-on, which is where the 1.5 to 1.8ms figure and the on/off comparisons in both games come from.</figcaption>
</figure>

## The timing

The base PS5 shipped in November 2020. Sony is handing it a new rendering
library in October 2026, seven weeks before GTA 6 arrives on 19 November. A
software upgrade that makes a five-year-old console hold detail better costs
considerably less than persuading that install base to buy a Pro.
