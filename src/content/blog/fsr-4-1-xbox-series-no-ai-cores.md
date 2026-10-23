---
title: "FSR 4.1 on Xbox Series X|S: no AI cores to run it"
date: 2026-10-23
category: Tech
excerpt: AMD is bringing its machine-learning upscaler to RDNA 2 consoles that have no matrix hardware. The inference runs on the same shader units as your rendering.
cover: /img/blog/fsr-4-1-xbox-series-no-ai-cores/shot-01.jpg
sources:
  - outlet: GamesIndustry.biz
    url: https://www.gamesindustry.biz/amds-fsr-41-upscaling-is-coming-to-xbox-series-xs
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/xbox-series-x-s-and-xbox-rog-ally-x-are-getting-amd-fsr-4-1-upscaling-to-improve-performance
artistView:
  take: "FSR 4.1's image quality stopped being the argument some time ago — the published RDNA 3 comparisons hold up. What is left to argue about is where the milliseconds go, and on a Series S there are not many spare ones to hand an upscaler."
  works:
    - "Upscaling: in the RDNA 3 comparisons, texture detail survives camera movement far better than FSR 3 managed. Smearing on a panning shot was the tell that gave the old version away, and it is mostly gone."
    - "Scaling the model down: AMD shipping an INT8 path at all means the quality work transfers to hardware with no matrix units, which is the only reason a 2020 console is in this conversation."
  misses:
    - "Artefacts: reviewers testing the RDNA 3 build report more shimmer than Redstone on foliage edges and thin geometry — railings, wires, grass. Those are exactly the assets an environment artist cannot avoid putting on screen."
    - "Pipeline: nothing is injected at system level on console, so the back catalogue only gets this if someone reopens a shipped project and patches it. Most of those teams have moved on."
---

The Xbox Series X and Series S are RDNA 2 machines. They were taped out before
AMD put matrix units in a consumer GPU, which means there is no dedicated
silicon in either box for running a neural network — and FSR 4.1, the upscaler
AMD and Microsoft announced for them this week, is a neural network.

Image quality is largely settled — the published RDNA 3 comparisons are good.
What nobody has costed in public is what the thing takes off the top of a frame
on a six-year-old console.

## Where the inference goes

<figure>
  <img src="/img/blog/fsr-4-1-xbox-series-no-ai-cores/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Xbox Series X console, via Wikimedia Commons</figcaption>
</figure>

On a desktop RDNA 4 card, FSR 4.1 runs its model in FP8 on hardware built to do
that. On RDNA 2 and RDNA 3 there is no FP8, so AMD built a separate INT8 version
that executes on the general-purpose shader units. The same units that are
shading your pixels.

That is the whole cost structure. Upscaling stops being free overhead and starts
competing with the frame for compute, and the numbers that have come out of PC
testing are not small. ComputerBase measured FSR 4 INT8 on an RX 6800 XT and an
RX 7800 XT at roughly 9 to 13 per cent below FSR 3.1 at the same Quality preset.
GameGPU put the range wider, 10 to 20 per cent depending on the scene. Against
the FP8 path on RDNA 4, PCGH's benchmarks have INT8 around 8 per cent slower.

The cleanest way to see it is the uplift shrinking. In Cyberpunk 2077 at 4K with
ray tracing, reported figures have FSR 4.1 bringing a 168 per cent improvement
over native where the older upscaler managed 200 per cent. You are still well
ahead of native. You are just handing some of the win back to pay for the model.

Those are desktop cards, measured on desktop drivers, and a console is a fixed
target with a hand-tuned shader compiler and no driver overhead to speak of.
Microsoft's CTO Scott Van Vliet says its engineers have been working with AMD on
exactly this optimisation. The console figure could land better than the PC one.
Nobody has published it.

## The Series S is the part worth watching

Series X has 52 compute units. Series S has 20, and about four teraflops to
spend on a 1440p target it has been missing since 2020. An upscaler that costs
a tenth of your GPU is a different proposition on each machine.

It can still be the right trade. If the model lets you drop the internal
resolution far enough, you buy back more than you spend, and that arithmetic is
the entire reason temporal upscaling took over this generation. But it is
arithmetic somebody has to actually do, per title, on the weaker box, and the
answer will not be the same for a corridor shooter and an open world with
transparency stacked four deep.

This is the same squeeze as [what porting Diablo 4 to Switch 2 costs the art
team](/blog/diablo-4-switch-2-age-of-hatred-what-porting-costs-art/) — a budget
so tight that the arguments move from quality settings to which assets get to
exist at all.

Worth noting what the other side is doing with the same problem. Nvidia went the
opposite direction and [cut DLSS 5 to 118 million parameters to halve what it
costs to run](/blog/dlss-5-smaller-model-half-the-gpu-cost/), because its
September model was eating half the frame rate on the cards that could least
afford it. Both companies have arrived at the same realisation from different
ends: the upscaler's own frame time is now a line item, not a rounding error.

## Nothing arrives by itself

On console there is no system-level toggle. FSR 4.1 is not being injected into
anything retroactively — developers implement it, either by patching a shipped
game or by building it into the next one.

A patch to a two-year-old title means pulling a
branch nobody has touched since certification, integrating a new upscaler, and
re-certifying, for a game that is making its money on sale weekends. Some
studios will do it. Most of the back catalogue will never see it, which makes
this a feature for games not yet finished rather than a thing that improves the
console you own.

## The dates do not line up

Handhelds go first. ASUS has the ROG Xbox Ally X and the X20 getting a preview
update through Armoury Crate on 23 October, which is today, and reports differ
on whether the base Ally is in or out — Tom's Guide read the original list as
excluding it, Windows Central says it was confirmed in a correction.

For Series X and Series S, AMD says "coming soon" and nothing more. No date, no
launch title list, no indication of which first-party games get it first.

There is one wrinkle I cannot resolve. AMD's own roadmap for desktop RDNA 2 has
FSR 4.1 arriving in **early 2027**, and the reason given is how much optimisation
work the architecture needs. Console silicon is RDNA 2. If "soon" for Xbox means
sooner than early 2027 for the desktop parts that share its architecture, that
implies the console build is a separate effort running ahead of the PC one,
which would be unusual and which neither company has said. Treat the timing as
genuinely unknown.

The next machine sidesteps all of it. Project Helix gets FSR Diamond, on
hardware designed for it, and the reason that is a cleaner story is the reason
this one is complicated: you cannot retrofit matrix units into a console that
shipped six years ago. You can only get clever about not having them.

---

*Announcement details from AMD and Microsoft's joint reveal as reported by
GamesIndustry.biz and VGC. Performance figures are PC measurements from
ComputerBase, GameGPU and PCGameshardware, reported secondhand; no console
numbers have been published. Image-quality observations come from published
RDNA 3 comparison testing. Release timing for Series X|S is unconfirmed by both
companies at the time of writing.*
