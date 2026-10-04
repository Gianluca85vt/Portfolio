---
title: "Gears of War: E-Day ships UE5's MegaLights first"
date: 2026-10-04
category: 3D
excerpt: The Coalition went from roughly three shadow casters on screen to hundreds, holding 60fps on Series X. On PC only a 5090 clears native 4K60. The cost moved.
cover: /img/blog/gears-e-day-megalights-shadow-casters/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/pc-gaming/gears-of-war-e-day-pc-graphics-performance-tested-43-gpus-take-us-back-to-the-start-of-an-iconic-saga
  - outlet: 80.lv
    url: https://80.lv/articles/gears-of-war-e-day-is-the-highest-rated-gears-game-in-over-15-years
  - outlet: Wccftech
    url: https://wccftech.com/gears-of-war-e-day-ue5-shadow-casting-lights-60fps-xbox/
artistView:
  take: "Twenty years ago Gears taught a generation what a normal map looked like. The same franchise is now the first to ship Unreal's answer to the shadow-caster budget, and the footage shows a lighting team working without the arithmetic they have carried since 2006."
  works:
    - "Lighting: in the interior footage the light sources are motivated — emergency strips, muzzle flash, fires — and every one of them is throwing a shadow, which is what kills the plastic look older Gears interiors had."
    - "Art direction: the horror pass holds up because darkness is now cheap to shape. You can take light away in one corner without the scene flattening, since the fill is not coming from a baked probe doing the work of fifty lamps."
  misses:
    - "Performance: Digital Foundry reports frame-time spikes on Series X and short stalls on Series S. The Series S has the same lighting complexity to resolve on a much smaller budget, and that is where the bill arrives."
    - "Scalability: a PC settings tier that only the top card clears at native 4K is a tuning problem, not a showcase. Reviewers reached a locked 60 with DLSS Performance, which means the native path is decorative."
draft: true
---

Every lighting artist who has worked in a game engine since about 2006 has
carried the same number in their head: how many lights in this room are allowed
to cast a shadow. Three, usually. Four if the scene is quiet. Everything else
gets baked into a lightmap, or faked with an unshadowed fill, or deleted and
replaced with a brighter neighbour that was already paying for itself.

The Coalition has shipped a game where that number is gone.

Gears of War: E-Day is the first retail title running Unreal Engine 5's
MegaLights, the ray-traced direct lighting path Epic has been building toward
for several engine versions. Technical director Kate Rayner, speaking to Digital
Foundry during a studio visit, put the before-and-after plainly: a space that
would previously have allowed three shadow casters in view now runs hundreds of
ray-traced area lights, all shadowing, at 60 frames a second on an Xbox Series
X. Her phrasing was that there is no way the studio could have done it on
current-generation hardware without MegaLights.

Worth being concrete about what the old number cost, because from outside the
industry it reads like a spec bump rather than a change to the day job.

## What the shadow-caster budget actually bought

<figure>
  <img src="/img/blog/gears-e-day-megalights-shadow-casters/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>The Coalition / Xbox Game Studios, via the official Steam page</figcaption>
</figure>

A dynamic shadow-casting light is expensive because the renderer has to draw the
scene again from that light's point of view to find out what is hidden. Do it
for one light, fine. Do it for forty and you are rendering the level forty-one
times a frame. So engines capped it, and lighting artists spent a large part of
their week deciding which lamps were real.

The workarounds are the texture of the last two console generations. Baked
lightmaps that look magnificent until something moves through them. Shadow-only
proxy geometry. Lights with their shadow flag off, placed to imply bounce that
nothing is computing. A practical light in the set — a desk lamp, a flare, a
vehicle headlight — that is a glowing quad and nothing else, because the budget
for the room went on the sun.

MegaLights changes the accounting by sampling: instead of resolving every light
fully, it picks a small number of light samples per pixel and denoises the
result, so the cost scales with screen pixels rather than with the number of
lamps you placed. It handles direct light. Lumen is still doing the indirect
bounce beside it.

For an artist that is a different job, not a faster version of the same one.
When the engine stops asking which three lights are real, lighting a scene
becomes composition rather than triage.

## Gears is the right game to prove it on

There is some history here. Gears of War in 2006 was the game that showed a lot
of people what Unreal Engine 3 could do, and the look it sold — wet normal-mapped
stone, bloom on everything, a brown-grey palette that got mocked for a decade —
became the house style of a generation because the engine made it cheap. Two
decades on, the same franchise is the test case for the next change in how light
is computed.

E-Day also has a reason to want it. This is the prequel to the invasion, closer
to horror than the chainsaw-and-cover rhythm the series settled into, and the
reviews this week keep reaching for the word harrowing. Horror lives on
darkness you can shape. That needs lots of small motivated sources and a renderer
willing to let most of the frame go black without the scene falling apart.

The blog's review of the campaign landed on an 8, and found that
[E-Day is at its best when the level design stays linear](/blog/gears-of-war-e-day-review/) —
the corridors and the set pieces, rather than the wider spaces. Which tracks
with the lighting story. A tight interior full of shadowing practicals is
exactly the scene MegaLights was built for.

## The cost moved to the CPU and the minimum spec

Tom's Hardware ran 43 graphics cards through it. Native 4K at the top preset and
60fps is reached by the RTX 5090 and nothing else. At 1080p Ultra the picture is
far healthier — an RTX 5060 turns in 97fps — but a top settings tier that one
card in the world clears natively is a tuning decision somebody should defend.
Reviewers who wanted 4K60 with ray tracing on got there using DLSS at
Performance, which is a quarter of the pixels.

RTX Mega Geometry is in there too, costing around ten percent and restricted to
cards with 12GB or more. We wrote about that one in August, when
[Nvidia retired Nanite's decimated stand-in mesh](/blog/nanite-fallback-mesh-rtx-mega-geometry/)
so ray tracing could hit the real cluster geometry instead. E-Day was named then
as the first game to ship it. Now there is a number on it.

The odd one is the CPU. Tom's Hardware benchmarked 25 processors and called
E-Day uncharacteristically CPU-heavy for an Unreal Engine 5 title, which is not
the usual complaint — UE5 games normally fall over on the GPU while the CPU
watches. The game even ships a "low core mode". Nobody outside the studio has
published a clean breakdown of where that load sits, and I would not guess:
light culling, the BVH work for ray tracing and the destruction simulation are
all candidates and all plausible, which is another way of saying I do not know.

Between vendors, Tom's found the RTX 50 series slightly ahead on average frame
rates while the Radeon RX 9000 cards held noticeably better 1% lows. That second
number is the one I would weigh if I were buying. An average is a brochure. The
1% low is what the game feels like.

## And on the small box

Digital Foundry's analysis reports frame-time spikes on Series X and short
stalls on Series S. The Series S is where every generous rendering decision goes
to be audited, and a lighting model that scales with resolution rather than with
light count should in theory suit it — fewer pixels, less work. In practice the
scene complexity came along unchanged.

What I keep thinking about is the authoring side rather than the frame rate. If
the shadow-caster budget is gone, the discipline that came with it goes too, and
some of that discipline was good. Deciding which three lights mattered forced a
read on the scene. Place four hundred shadowing lamps because you can and you
get a room with no hierarchy, beautifully lit and impossible to navigate. The
best interiors in the E-Day footage are not the busiest ones.

Standard edition unlocks 6 October. The multiplayer servers were down through
the review period, so every verdict published so far is campaign-only — and the
lighting claims, for now, rest on footage and on a studio visit rather than on
anyone's own capture.
