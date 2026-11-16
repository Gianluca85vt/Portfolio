---
title: "Cyberpunk 2077 rain mod: 3D drops at 0.5ms"
date: 2026-11-16
category: 3D
excerpt: A modder replaced Night City's flat rain cards with lit 3D drops and published the frame cost. That number explains what CD Projekt Red shipped in 2020.
cover: /img/blog/cyberpunk-2077-rain-mod-torrent/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/cyberpunk-2077-torrent-rain-weather-mod
  - outlet: DSOGaming
    url: https://www.dsogaming.com/mods/cyberpunk-2077-gets-a-new-mod-with-realistic-rain-and-immersive-weather-effects/
artistView:
  take: "Torrent is a weather mod that ships its own frame budget, which is rarer and more interesting than the screenshots. The drops are lit by neon and stopped by roofs, and the author put a millisecond figure next to each of those decisions."
  works:
    - "Rendering: hiding the vanilla rain and the far rain cards, then drawing real geometry in their place, is the only way to get depth back. A camera-facing billboard cannot be behind anything."
    - "Lighting: letting street lamps, headlights and signage hit individual drops is the single highest-value change in a city built almost entirely out of local light sources."
    - "Performance: storm mist drawn at half resolution is textbook. Low-frequency volumetrics upsample without anyone noticing, and it keeps the effect near 0.15ms."
  misses:
    - "Occlusion: cover tests at this scale usually run off a top-down depth map, and small overhangs leak at its resolution. Footage published so far is heavy on open street, which is where the technique is strongest."
    - "Measurement: every figure is the author's own and no test hardware is named, so the budget below is indicative rather than benchmarked."
---

Half a millisecond. That is what CyanideX reports the rain in Torrent costs on
Ultra during a heavy storm — between 0.15 and 0.5ms a frame — and it is the
most useful line on the whole mod page.

Torrent landed on Nexus Mods on 11 November 2026 and got picked up by the trade
press over the weekend. It replaces Night City's rain with individual 3D drops
that fall through the world in depth, catch light from neon, headlights and
street lamps, and stop at roofs, bridges and the roof of your own car. There is
a new lightning system with branching bolts that flicker before they fade, and
spray thrown off tyres on wet road. Thunder is a separate mod.

The numbers are the part worth reading.

## What flat rain is, and why everyone ships it

<figure>
  <img src="/img/blog/cyberpunk-2077-rain-mod-torrent/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>CD Projekt Red, via the official Cyberpunk 2077 Steam page</figcaption>
</figure>

Rain in a real-time engine is almost never water. It is a camera-locked
particle volume of stretched billboards — thin quads with a streak texture,
rotated to always face you — plus, in the distance, a handful of big scrolling
textured planes that sell density for the price of a few draws. The mod page
calls those far rain cards, and Torrent hides both them and the vanilla
particles before drawing its own.

That technique is cheap, predictable and has been the default since the
mid-2000s. It also throws away two things. A billboard that always turns to
face the camera has no depth, so it never passes convincingly behind a railing
or in front of a sign. And unless you pay for it, a drop that small takes no
local lighting at all.

The second one is the real loss in this particular game. Night City is lit
almost entirely by emissive surfaces at short range: signage, windows, strip
lighting, headlights. Rain that ignores all of it is rain falling through a
city it is not actually in. Get a drop to pick up the red of a sign three
metres away and the whole street reads as wet.

## The budget, written out

A 60fps frame is 16.67ms. Stack what Torrent's author published:

- rain, 0.15 to 0.5ms on Ultra in heavy weather
- wheel spray, peaking around 0.4ms
- storm mist, about 0.15ms, drawn at half resolution

Call it roughly a millisecond with everything running hard. On a 60fps budget
that is around six per cent of the frame, spent entirely on weather, in a game
where it is not raining most of the time. At 30fps it is half that share.

Six per cent is a decision, and it is the decision CD Projekt Red was making
in 2020 on a console
generation whose CPUs were already the constraint. Flat cards cost a fraction
of this. A studio shipping to a fixed frame target picks the fraction, every
time, and spends the millisecond somewhere the player is looking more often.

The design choice that makes Torrent affordable at all is on the mod page too:
it adds a few draws to the existing rain pass and runs no simulation on the
CPU. All of it is GPU work, slotted into a pass the engine was already doing.
That is also why it costs almost nothing when the sky is clear — there is no
system sitting there ticking.

Weather is a budget line, and which processor it lands on decides how much of
it you can afford. [GTA 6's localised, persistent weather pushes that cost onto
the CPU instead](/blog/gta-6-weather-localized-persistent/), which is a much
harder bill to pay on this hardware than a millisecond of GPU particles.

## Why a mod gets to do this and a studio does not

Torrent has a settings menu. Quality can drop to High or Medium, rain cover can
be set to Simple, storm mist can be switched off entirely. A PC mod can hand
the budget decision to whoever installed it, and assume a machine from 2026.

A console build cannot. It has one budget, fixed six years ago, and it has to
hold it in the worst case — rain, traffic, a chase, a crowd, all at once. Most
of what looks like a studio settling for less is a studio holding a line in a
case you never saw.

None of which makes the vanilla rain good. It reads flat because it is flat,
and six years of GPU headroom have gone by since the call was made. Night City
has always been [built at roughly twice the texel density of Witcher
3](/blog/night-city-hand-built-texel-density/), which is why the surfaces hold
up to a camera pushed right against them and the weather in front of them does
not. A mod closing that gap for a millisecond is a fair trade on a 2026 PC.

One caveat on all of the above. Every figure here is the author's own, measured
on hardware nobody has named, and no outlet has run independent numbers yet.
Treat them as the shape of the cost rather than the cost.
