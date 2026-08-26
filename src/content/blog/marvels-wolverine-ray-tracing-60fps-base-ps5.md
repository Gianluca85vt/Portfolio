---
title: Marvel's Wolverine ships ray tracing at 60fps on a base PS5
date: 2026-08-14
category: Games
excerpt: Every Insomniac game before this one made you pick between ray tracing and 60fps. Wolverine's default mode is both, on base PS5 hardware, not the Pro. That's a bigger deal than the headline number sounds.
cover: /img/blog/marvels-wolverine-ray-tracing-60fps-base-ps5/cover.svg
---

Marvel's Wolverine is a month from launch — 15th September, PS5 exclusive — and this
week brought a stack of hands-on previews plus a technical confirmation from
Insomniac that's easy to skim past if you don't spend your days budgeting frame
time. Performance mode, the game's *default* mode, runs at 60fps with ray tracing
enabled, on a base PS5. Not the Pro. Not a quality-mode compromise you have to
opt into and eat a 30fps hit for. The mode most players will never leave.

I want to explain why that line is worth more than the marketing bullet point it
sounds like, because it flips a trade-off that has shaped every ray-traced console
game since the feature became standard.

## Ray tracing has always been the first thing cut for framerate

Real-time ray tracing on a fixed console budget is a tax, not a toggle. It adds
extra rays that have to be shot, intersected against geometry, and denoised, on
top of everything else already competing for the frame — shading, animation,
physics, streaming. On PS5-class hardware, that tax has consistently been too
expensive to pay twice: once for 4K-ish quality mode, once for 60fps performance
mode. So the standard shape of a "next-gen" console game became two menus stapled
together — a Quality mode with ray-traced reflections or shadows at 30fps, and a
Performance mode that switches RT off, or scales it down hard, to hit 60. Insomniac's
own **Spider-Man 2** shipped exactly that split. So did most of the genre.

Wolverine's Performance mode keeping ray tracing on **and** making that combination
the default, not a hidden third option, means the team decided most players should
see ray-traced lighting and reflections at 60fps without ever opening a settings
menu. That's a different design conversation than "can we technically fit RT in
performance mode" — it's "we're building around this pairing being what everyone
plays."

## The difference is when you decide, not just whether you can

The detail that actually explains this, from Insomniac's own comments this week,
is that the 60fps-plus-RT target was built into the game from early development
rather than chased down as a stretch goal after the fact. That ordering matters
more than the frame-time number itself.

Retrofitting a performance target onto content built for a quality bar almost
always means cutting things after the fact: dropping ray count, shrinking the
denoiser's effective resolution, culling reflection-casting surfaces the art team
already populated a level with. You are un-building work that was already signed
off. Deciding the target up front changes what gets built in the first place —
which surfaces get flagged as reflective, how dense the destructible geometry in
a scene is allowed to get, how much the lighting team leans on baked versus
traced information, what dynamic-resolution range the renderer is allowed to
scale into before a level is ever finished. It's the difference between hitting a
number and designing for one, and it shows up as fewer compromises later precisely
because fewer things had to be un-decided.

<figure>
  <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram comparing a retrofitted performance target against a performance target built in from the start">
    <rect width="760" height="320" fill="#18011F"/>
    <text x="30" y="40" fill="#F4E9F7" font-family="Georgia, serif" font-size="18" font-weight="bold">Retrofit vs. built-in target</text>

    <text x="30" y="80" fill="#E29DE8" font-family="Arial, sans-serif" font-size="13" font-weight="bold">RETROFITTED (target added late)</text>
    <rect x="30" y="95" width="620" height="34" rx="4" fill="#3a1245"/>
    <rect x="30" y="95" width="500" height="34" rx="4" fill="#5c1f6e"/>
    <rect x="530" y="95" width="120" height="34" rx="4" fill="#9c3fb0" opacity="0.5"/>
    <text x="40" y="118" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">content built for quality bar</text>
    <text x="540" y="118" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="11">cuts made after</text>

    <text x="30" y="165" fill="#E29DE8" font-family="Arial, sans-serif" font-size="13" font-weight="bold">BUILT-IN (target set from day one)</text>
    <rect x="30" y="180" width="620" height="34" rx="4" fill="#3a1245"/>
    <rect x="30" y="180" width="620" height="34" rx="4" fill="#7a2a90"/>
    <text x="40" y="203" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">reflective surfaces, destructible density, lighting budget all decided against the target from the start</text>

    <text x="30" y="260" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12">Same destination — 60fps with ray tracing on base PS5.</text>
    <text x="30" y="280" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12">One path un-builds finished work. The other never builds the parts that wouldn't survive.</text>
  </svg>
  <figcaption>How Insomniac describes reaching a 60fps ray-traced default: decided at the start, not cut down to at the end.</figcaption>
</figure>

## The destruction angle is the same discipline, applied to props

The other detail running through this week's previews is how much of Wolverine's
world is built to break. Reporters describe props reacting in physically grounded
ways under Logan's claws, and his healing factor visibly closing wounds mid-fight
— which, from a technical-art seat, is its own budget problem stacked on top of
the rendering one. Destructible geometry usually means extra draw calls for
fractured states, physics simulation for debris, and — if it's meant to look
convincing rather than like pre-baked chunks flying apart — some kind of runtime
fracturing or state-swap system that has to stay inside the same frame budget as
everything else. Healing that visibly reverses damage is the harder version of
that problem: it means the damage state has to be authored as something that can
run backwards convincingly, not just play once and stay broken.

None of that is confirmed in technical detail — Insomniac hasn't published a
breakdown of how the destruction system works, and I'd treat "physically
accurate" in preview copy the way I treat any marketing line, as a claim to verify
once people have hands on the shipped build. But the fact that a studio is
promising both a 60fps ray-traced default *and* destructible, healing-reactive
environments in the same breath tells you the whole project was scoped around a
tighter simulation-and-rendering budget than "make it look as good as possible and
see what frame rate falls out."

## The catch, because there's always one

Eurogamer's hands-on this week called the combat "ferocious, destructive and
cinematic — but a little predictable," which is a preview writer's way of saying
the moment-to-moment feel is strong and the encounter design might not be doing
much new. That's a different axis than the technical one, and worth keeping
separate: a game can hit an unprecedented performance target and still play it
safe structurally. I'd also flag that every number above is Insomniac's own
framing, repeated across previews that were almost certainly built around a
guided hands-on session — not something outlets independently profiled on their
own hardware. Base-PS5 ray tracing holding at a locked 60fps in a busy combat
encounter, with destruction and healing VFX both active at once, is exactly the
kind of claim that looks different in a curated demo than three weeks after
launch when players are stress-testing it in the worst-case rooms they can find.

Worth watching properly once it ships — and worth remembering, if it holds up,
as a marker for where "ray tracing plus 60fps" stops being the compromise-mode
question and starts being the expected floor.

*Sourced from this week's Eurogamer and Push Square previews, plus Insomniac's own
comments on Performance mode reported by TechRadar and Wccftech — all converging on
the same 60fps-with-ray-tracing-by-default claim, though all tracing back to the same
guided preview event rather than independent hands-on testing.*
