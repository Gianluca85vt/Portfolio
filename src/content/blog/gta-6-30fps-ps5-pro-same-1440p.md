---
title: "GTA 6 at 30fps: PS5 Pro renders the same 1440p"
date: 2026-11-19
category: Games
excerpt: Rockstar published GTA 6's resolution table on 18 November. PS5 and PS5 Pro both render at native 1440p, and the Pro's extra GPU went somewhere else entirely.
cover: /img/blog/gta-6-30fps-ps5-pro-same-1440p/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/console-gaming/gta-vi-runs-at-1440p-on-ps5-and-xbox-series-x-but-just-720p-with-upscaling-on-series-s-rockstar-details-upscaling-technologies-for-launch
  - outlet: Push Square
    url: https://www.pushsquare.com/news/2026/11/ps5-pro-is-not-powerful-enough-to-run-gta-6-at-60fps-rockstar-explains-frame-rate-decision
  - outlet: Engadget
    url: https://www.engadget.com/2321134/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision/
artistView:
  take: "Rockstar spent the Pro's headroom on reconstruction and shadows instead of pixels or frames, which is the correct call on a frame this simulation-bound and an unusually blunt thing to publish on launch eve. The resolution table is the most useful technical document the studio has put out in years."
  works:
    - "Performance: one hard 30 with no graphics menu means one frame budget to validate instead of four, and reviewers describe the lock holding without fluctuation on Pro hardware."
    - "Image quality: putting the Pro's GPU into PSSR2 and ray-traced shadows buys visible gains at an unchanged 1440p, which is where that silicon can actually move the needle."
  misses:
    - "Pipeline: three reconstruction paths across four consoles, TAA and PSSR2 and FSR 4, means the same material library gets validated three times and the artefacts land differently in each."
    - "Series S: 720p upscaled to 1080p sitting next to 1440p-to-4K is a gap wide enough that art tuned at the top SKU stops reading at the bottom, and no setting closes it."
---

The most useful thing Rockstar published this week was a table. On
18 November 2026, a day before Grand Theft Auto VI went on sale, the studio's
technical team handed over the resolution and upscaling breakdown for every
console it ships on. Four SKUs, three different reconstruction techniques, one
frame rate target.

PlayStation 5: native 1440p, upscaled to 4K, using Rockstar's own temporal
anti-aliasing. Xbox Series X: the same. PlayStation 5 Pro: **also native 1440p
to 4K**, but reconstructed with Sony's second-generation PSSR instead. Series S
renders at 720p and upscales to 1080p with AMD's FSR 4. On all four the final
image gets a 4K interface composited on top.

Read that list twice and the frame rate stops being a mystery.

<figure>
  <img src="/img/blog/gta-6-30fps-ps5-pro-same-1440p/shot-01.jpg" loading="lazy" alt="A wide view across Vice City in Grand Theft Auto VI" />
  <figcaption>Vice City. Rockstar Games, official screenshot.</figcaption>
</figure>

## The Pro did not buy more pixels either

A mid-generation console with a substantially bigger GPU normally announces
itself in the resolution column. That is what the extra compute is for. Give a
game more GPU and it renders the same frame at a higher base resolution, or
holds the same resolution at a higher frame rate, and either way the number on
the spec sheet moves.

Here it does not move at all. The Pro renders the identical 1440p as the machine
it is meant to outclass. Every bit of that additional GPU went into PSSR2 doing
a better job of reconstructing those 1440p into 4K, and into ray-traced shadows
that Rockstar says are a Pro exclusive.

Which tells you where the frame time is going. If the GPU had been the thing
setting the budget, a base PS5 would have landed below 1440p and the Pro above
it. They are the same because neither one is waiting on the GPU. They are both
waiting on the same thing, and it is a thing the Pro barely touched.

## Rockstar said it out loud

The studio's position, given to press on 18 November, is that the Pro is not
powerful enough to run the game at 60fps or at 40fps, because its CPU is only
marginally quicker than the base console's and the simulation is what needs the
headroom. Digital Foundry has put that CPU gap at roughly seven per cent. The
part is the same Zen 2 silicon, clocked a little higher.

Seven per cent more CPU does not buy you a hundred per cent more frames.

The sharper half of the statement is that this covers future patches. No 60fps
mode is coming to current-generation consoles, which breaks a habit — GTA V and
Red Dead Redemption 2 both got their higher frame rate options eventually, on
later hardware. Ruling it out now says the tick rate is structural rather than a
setting somebody could unlock later.

That argument has been running since the summer —
[why a bigger GPU cannot make the simulation tick faster](/blog/gta-6-extended-look-30fps-question/)
was the whole of it — and the receipts are finally attached.

## What the thirty-three milliseconds are buying

A 30fps lock gives you about 33ms a frame. On a game like this the renderer is
not the tenant taking up most of that.

Traffic routes itself. Pedestrians have destinations. Physics runs on every
vehicle in range. Police coordinate. Both protagonists are live simultaneously,
so the one you are not driving is doing perception and target selection beside
you every frame. Reviewers who went long on detail kept landing on the audio —
Rockstar says convenience store refrigerators have individual sounds, which
means emitters being managed, mixed and culled in numbers nobody would have
attempted a generation ago.

Then there is the weather, which the studio rebuilt so that
[storms are localised and persistent rather than global](/blog/gta-6-weather-localized-persistent/).
A single global weather state is cheap. Separate systems moving across a map
this size, leaving wet surfaces behind them, is bookkeeping that runs whether or
not you are looking at it.

Add it up and 30 is the number the design chose, years ago. Everything above
was bought with it.

<figure>
  <img src="/img/blog/gta-6-30fps-ps5-pro-same-1440p/shot-02.jpg" loading="lazy" alt="Jason and Lucia in Grand Theft Auto VI" />
  <figcaption>Jason and Lucia. Rockstar Games, official screenshot.</figcaption>
</figure>

## Three upscalers is a real cost

The bit that interests me most as someone who ships assets is the reconstruction
spread. Rockstar built a physically-based material library for this game, and a
cinematic imaging pipeline on top of it. That library now has to survive being
resolved three separate ways.

TAA, PSSR2 and FSR 4 fail differently. Thin geometry, foliage, fine specular
detail, anything with high-frequency normal data — each technique smears or
shimmers its own way, and the fixes do not transfer. Tune a fence or a
wet-asphalt material until it stops crawling under one and you have learned
nothing about the other two. Four consoles, three validation passes, and one of
them starts from 720p.

Digital Foundry's launch testing, published 18 November, has the Pro holding its
30 almost without deviation and the base PS5 taking minor but sustained dips.
That split is the most predictable thing in this whole story: same resolution,
same target, and the console with the marginally faster CPU is the one that
keeps the lock.

PC remains unmentioned. No port has been confirmed, and for anyone who wants
this world at 60 frames a second it is now the only place it could happen.
