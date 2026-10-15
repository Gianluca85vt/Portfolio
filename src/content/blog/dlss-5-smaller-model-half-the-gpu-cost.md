---
title: "DLSS 5's new model: 24% smaller, half the cost"
date: 2026-10-15
category: AI
excerpt: Nvidia cut DLSS 5 to 118 million parameters and says that halves the GPU cost of running it. The September version took half your frame rate.
cover: /img/blog/dlss-5-smaller-model-half-the-gpu-cost/shot-01.jpg
sources:
  - outlet: Guru3D
    url: https://www.guru3d.com/story/nvidia-dlss-5-gets-2x-faster-ai-model-with-lower-vram-usage/
  - outlet: Tom's Guide
    url: https://tomsguide.com/gaming/pc-gaming/i-benchmarked-the-real-dlss-5-in-nba-2k27-and-the-future-of-photorealistic-graphics-has-one-big-catch
  - outlet: TechSpot
    url: https://techspot.com/article/3169-nvidia-dlss-5-release
  - outlet: 91mobiles
    url: https://www.91mobiles.com/gaming/nba-2k27-with-dlss-5-performance-review/
artistView:
  take: "Nvidia has spent six weeks making the neural pass cheaper rather than better, which tells you the September model was shipped at whatever size they could get running at all. Trimming 37 million weights to buy back frame time is the same trade an artist makes dropping a shadow cascade, except the dial belongs to the driver."
  works:
    - "Performance: halving the overhead of the pass, if it holds up, is the only change that makes this feature arguable on a single card instead of two."
    - "Pipeline: separate application to gameplay, cutscenes and individual scenes gives an art director somewhere to stand, which the announcement build did not."
  misses:
    - "Image quality: Nvidia says quality is held at a similar level, and a similar level after a 24% parameter cut is a claim nobody outside the company has checked yet."
    - "Memory: a resident model competing for the frame buffer is a cost no scene asked for, and it lands in the same month the GeForce VRAM ceiling looks like falling."
draft: true
---

Nvidia published a revised DLSS 5 model on **13 October**. The headline figure
is the parameter count: around **118 million**, down about 24% from the version
that shipped in September. The company says the smaller model runs roughly twice
as fast, costs about half the GPU overhead, and uses 20% less VRAM at 4K, with
image quality held at a similar level.

Those are Nvidia's own numbers. Nobody outside the company has benchmarked them,
and I could not reach Nvidia's own post from here to read how it measured, so
everything below treats them as claims.

They are worth sitting with anyway, because of what the September model cost.
When DLSS 5 arrived in NBA 2K27 on 3 September, the neural pass took something
close to [half your frame rate before frame generation got
involved](/blog/dlss-5-neural-rendering-second-gpu-offload/) — the problem
somebody then worked around by handing the pass to a second card over ReShade.
Tom's Guide, citing PC Gamer's testing, put the drop at 50 to 60%. 91mobiles, on
an RTX 5070 Ti at 4K, measured 126.8 fps falling to 41.8, which is nearer two
thirds. TechSpot came at it from the other end: Nvidia's own 370 fps slide runs
DLSS Performance mode with 6X Multi Frame Generation, and the RTX 5080's 233 fps
result on the same slide implies a render rate of about 39 fps underneath all
that interpolation.

## 24% smaller, twice as fast

Those two figures do not divide into each other. Cutting a quarter of the weights
does not double inference speed on its own, so something else moved — layer
shapes that map better onto the tensor cores, lower precision in places, a graph
restructured so fewer passes go out to memory. Nvidia's own framing is refined
training data and a smaller model.

Whatever the mix, the September version was not shaped for the hardware it ran
on. Anyone who has shipped a tool knows that order of events. Get it correct,
then get it to fit.

The sources disagree on what it shrank from. Guru3D puts the previous model
around 155 million parameters; a German report working from a leaked build says
about 148 million. Take 24% off 155 and you land on 118. Off 148 you land on
112. I would not lean on the percentage.

The VRAM line is the one I keep coming back to. Twenty percent less at 4K reads
like housekeeping until you set it beside the week's other story — the leaks
saying the [RTX 5090 is discontinued and the top GeForce drops from 32GB to
24](/blog/rtx-5090-discontinued-vram-ceiling-24gb/). A neural pass that lives in
the frame buffer competes with everything else you put there. On a box that also
has to hold a heavy scene for GPU rendering, any feature wanting resident memory
is a feature you end up switching off.

## A parameter count in the frame budget

Something shifted quietly here in how a renderer gets planned. Shadow map
resolution, screen-space reflections, ray counts: those have been budget lines
for years, and a technical artist carries a rough feel for what each one costs in
milliseconds. A model's parameter count now sits in the same list. When Nvidia
trims 37 million weights to buy back frame time, that is the trade you make
yourself when you drop a cascade or halve a probe grid.

The dial is in someone else's hands, though. You can cut your own shadow
cascades. Retraining Nvidia's model is not on the table, and until last week the
only lever available was off.

There is some control. Developers can pick between models and apply the pass
separately to gameplay, cutscenes and individual scenes, which was the company's
answer to the art-direction complaints that followed the reveal. Edward Liu, who
runs applied deep learning research at Nvidia, walks through those controls in
the company's own explainer. Per-scene control is genuinely useful. It is also
more surface for an art director to supervise, on a system whose output they
cannot art-direct in the usual sense.

The updated model reaches NBA 2K27 on **16 October**, Hogwarts Legacy on
5 November, and Where Winds Meet later that month. NBA 2K27 is the one to watch,
being the only title with a September baseline anybody has actually measured. If
the drop falls from 50-60% to something near 30, this becomes the first version
of the feature with a defensible performance story. If it does not, the
second-GPU trick stays the most honest answer anyone has found.
