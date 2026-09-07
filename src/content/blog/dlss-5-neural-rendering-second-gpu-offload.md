---
title: "DLSS 5's 50% frame cost, moved to a second GPU"
date: 2026-09-07
category: Tech
excerpt: Nvidia's neural rendering takes half your frame rate in NBA 2K27. A ReShade add-on hands the pass to a second card and claims a good deal of it back.
cover: /img/blog/dlss-5-neural-rendering-second-gpu-offload/shot-01.jpg
---

Two RTX 5060 Ti 16GB cards, both on PCIe 5.0 x8, a monitor plugged into each
one, a Ryzen 7 7800X3D underneath. That is the machine Marcelo Guibout put on
video over the weekend, and the reason for the second card is not rendering.
The game draws on the first GPU. Nvidia's DLSS 5 neural pass runs on the other.

It works because of where the pass sits in the frame. "Neural rendering happens
at the end of the frame: it takes a finished frame and hands a finished frame
back," Guibout wrote. "That is what makes it possible to pick it up and run it
somewhere else." The add-on — `mgpu_bridge`, a ReShade file, up on GitHub —
creates its own D3D12 device on the second card and does precisely that.

That architecture is not news to anyone who read the DLL when it fell out of an
early build. I went through it here when
[DLSS 5 leaked as a generative pass over finished art](/blog/dlss-5-leak-generative-pass-finished-art/):
the frame gets assembled, lit and graded, and then a model looks at the result
and hands back a different one. What is new is somebody noticing that a stage
which only needs a finished picture doesn't have to run on the card that drew
it.

## The cost does not move

<figure>
  <img src="/img/blog/dlss-5-neural-rendering-second-gpu-offload/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Visual Concepts / 2K, via the official NBA 2K27 Steam page</figcaption>
</figure>

Nvidia's own number for switching neural rendering on is a 50 to 60 percent
frame-rate hit, and it quotes that as a blanket figure rather than a per-game
one. Digital Foundry tested the shipping version in NBA 2K27 and called it
"super, super heavy". PC Gamer's benchmarks put some scenes worse than the
blanket figure. Nvidia has talked about optimisation pulling the cost toward 10
to 15 percent by the end of the year, which is a target somebody stated, not a
number anybody has measured.

The blanket part is what should interest anyone who budgets frame time.

Every cost you learn to manage in this job scales with what is in the shot.
Cascade count, alpha overdraw in foliage, how many shadow-casting lights survive
the cull, how many unique materials make it through into separate draws. The
scene gets heavy, you cut the thing that got heavy. A diffusion pass over a
finished frame does not behave like that at all. It charges the same for an
empty corridor and for a stadium bowl full of crowd instances, because it never
sees the corridor or the crowd — it sees a picture, at a resolution, and the
resolution is the only lever there is.

So the usual optimisation pass has nothing to grab hold of. You cannot simplify
your way back into half a frame budget that was taken as a flat tax. Either the
model gets cheaper, or the pixels do, or you find some other silicon to run it
on.

Which is where the second card comes in, and there is a precedent for that
answer. Nvidia bought Ageia in 2008, and for a few years afterwards you could
dedicate a spare GeForce to PhysX while your main card drew the game. It was a
genuine option. It also quietly stopped being one, because the work folded back
into the main GPU and the games that leaned on it stopped getting made. A
dedicated coprocessor is what you build when a workload is too expensive and too
separable to leave where it is, and it lasts exactly as long as both of those
things stay true.

## What the demo does not show

Latency. Guibout's own account is that the setup doubles display latency, and
the second monitor is not optional — the second card presents its own output.
For a basketball game that is a shrug. For anything where you are reading an
animation to time an input, it is the whole experience.

He has also been careful about what the videos are. Technical showcases, he
said, not benchmarks. The figures being repeated from them — Tom's Hardware led
with up to 127 percent more neural-rendered frames — come out of demo footage of
Cyberpunk 2077 and a Blood of Dawnwalker cinematic rather than a controlled
test, and should be read that way until somebody runs it properly. The project
is public, so somebody will.

There is a hardware floor under all of it too. DLSS 5 leans on FP8 instructions,
accelerated on Blackwell and Ada, and Nvidia has put its optimisation effort
into RTX 50-series first with 40-series to follow. Two mid-range Blackwell cards
in one box is a very specific kind of enthusiast answer to a cost that a laptop
or a console cannot pay at all.

For now there is one shipping game to test any of it in. DLSS 5 arrived in
NBA 2K27 with the Game Ready driver on 3 September, and the game
[took an 8.5 here](/blog/nba-2k27-review/) for reasons that had nothing to do
with its lighting. A basketball court is a sealed room with a known light rig
and no weather — roughly the friendliest thing you could hand a model trained on
photographs. The first real test of what this pass costs, and of what it does to
somebody's art direction, arrives with the first outdoor game that ships it.

---

*Performance figures as quoted by Nvidia and by outlet testing published between
3 and 7 September 2026; Digital Foundry's remark via Eurogamer's report of 7
September. The MGPU Bridge hardware list, latency caveat and performance claims
are the developer's own, from demonstration footage rather than a controlled
benchmark. Nvidia's 10 to 15 percent optimisation figure is a stated target.*
