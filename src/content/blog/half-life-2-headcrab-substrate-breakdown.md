---
title: A fan remade Half-Life 2's Headcrab and documented every Substrate decision across 62 pages
date: 2026-08-14
category: 3D
excerpt: Emanuel Pessel used Unreal Engine 5's Substrate material system to rebuild Valve's Headcrab from scratch, then published the entire process because almost nobody writes Substrate guides for organic creatures.
cover: /img/blog/half-life-2-headcrab-substrate-breakdown/shot-01.jpg
draft: true
---

I nearly scrolled past this one — "artist remakes classic game monster" is a genre unto
itself at this point. What stopped me was the word **Substrate**, buried in the second
line of 80.lv's write-up. That is the part I actually care about.

## The subject is a pretext

<figure>
  <img src="/img/blog/half-life-2-headcrab-substrate-breakdown/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Half-Life Headcrab zombie cosplay, via Wikimedia Commons (CC BY 2.0)</figcaption>
</figure>

**Emanuel Pessel** picked Valve's Headcrab for a reason that has nothing to do with
nostalgia: it is a small, ugly, biologically plausible creature, and that makes it a
brutal test case for a shading system. He built it the long way — ZBrush for the sculpt,
3ds Max for retopology, Substance 3D Designer and Painter for texturing, Akeytsu for
rigging — and landed it in Unreal Engine 5.7.4 with three idle animations, a single 4K
texture on one UV set, and a triangle budget that drops from 16K at LOD0 down to a scant
44 at LOD5. He has also said plainly that no AI touched the asset beyond spell-checking
the write-up, which matters for how much you can trust the numbers below as actually
representing manual technique rather than a generated shortcut.

None of that is the headline, though. The headline is that he wrote up all of it — a
**62-page case study**, freely published, of every decision that went into the model,
the rig and, above all, the shader.

## Why Substrate is the hard part

Substrate is Epic's replacement for Unreal's old single-shading-model-per-material
approach, the one that forced you to pick Default Lit, Clear Coat or Subsurface and then
fight the engine if you wanted more than one at once. It went experimental in 5.2, beta
in 5.5, and only lost the "experimental" tag in 5.7 — which is the version Pessel built
in, meaning he was working with a genuinely new, still-settling toolset rather than
something with three years of forum answers behind it.

A Headcrab's skin is exactly the case Substrate exists for: translucent membrane over
muscle, a wet mucus layer that needs its own specular response, mottled subsurface
colour underneath, all on the same few square centimetres of mesh. Under the old system
that is a pile of blend nodes and manual masking hacks that never quite holds up under
different lighting. Substrate is supposed to let you stack those as genuinely separate
layers and let the engine sort out the physically-based mixing. Whether it actually
delivers on that, under production constraints, is precisely what a 3.2K-instruction
shader on a hero creature asset tells you — and that number is itself notable, because
it is a specific, checkable cost rather than a vague "it runs fine."

Pessel's own framing of why he wrote the breakdown is the part that should sting anyone
who has shipped a Substrate material and moved on: he called it "still a hotly debated
topic," and pointed out that most of the guides that do exist are built around car
paint. Cars are the easy case — hard surfaces, clean layer boundaries, no subsurface
scattering fighting a wet coat. Nobody was writing the organic-creature version. So he
did.

## The number worth remembering

If you only take one figure from this, take the **texel density: 40.36 texels per
centimetre** on a single 4K set. That is the kind of unglamorous, load-bearing number
that separates a documented production asset from a portfolio flex — it is exactly what
you'd check before dropping this into an actual shot, and exactly the kind of number a
"look what I made" post never bothers to include.

## Why I am flagging a Headcrab breakdown on a portfolio blog

Because this is the resource I go looking for and rarely find. Every big engine feature
gets a keynote demo and then a long silence where the actual "here is what broke on a
real asset and how I fixed it" writing should be. A free, 62-page, warts-and-all account
of shipping Substrate on something that isn't a car is genuinely rare, and it is the
kind of thing worth bookmarking before you need it rather than after.

*Figures and quotes here come from 80.lv's coverage of the project and Pessel's own
published write-up — I have not opened the case study page by page myself, so treat the
framing above as a summary of a much longer document, not a substitute for reading it.*
