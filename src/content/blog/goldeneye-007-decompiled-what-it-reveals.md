---
title: "GoldenEye 007 decompiled: how N64 games were built"
date: 2026-08-18
category: Tech
excerpt: A half-decade reverse-engineering project just hit 100 percent on GoldenEye 007's source code. Beyond the mod and port potential, it's a rare look at how Rare fit a whole level into memory nobody today would call generous.
cover: /img/blog/goldeneye-007-decompiled-what-it-reveals/cover.svg
---

A community reverse-engineering effort led by a contributor going by **KholdFuzion** hit
**100% on its GoldenEye 007 decompilation status page** on 17 August, after roughly five
years of work. The project — `n64decomp/007` on GitHub, mirrored from KholdFuzion's GitLab —
now has C source code that recompiles to a **byte-identical match** of the original 1997
Nintendo 64 ROM. Tom's Hardware, XDA-Developers and HotHardware all picked it up over the
same 24 hours, and the milestone lines up with what the project's own public tracker shows.

That "byte-identical" part matters, so let me explain what it actually means, because it's
the difference between a curiosity and something you can build a career's worth of mods on.

## Decompiled doesn't mean "readable." It means "rebuildable."

Reverse engineers didn't disassemble the ROM into raw MIPS assembly and stop there — that's
been possible for decades and gets you nothing but a wall of `jal` and `lui` instructions. A
**matching decompilation** goes further: you write C code, compile it with period-accurate
tools, and check whether the output is bit-for-bit identical to the retail cartridge. If it
matches, you've proven your C is a faithful reconstruction of what Rare's programmers
actually wrote, not just something that behaves similarly. Every function in GoldenEye 007
now clears that bar.

This is the same family of project as the **Super Mario 64** decompilation (2019-2020),
**Ocarina of Time** and **Majora's Mask** (via the ZRET project, which fed HarbourMasters'
Ship of Harkinian port), and **Perfect Dark**, decompiled separately by Ryan Dwyer under the
same `n64decomp` GitHub organization. Every one of those spawned native PC ports, uncapped
framerates, widescreen support, and mods nobody could have shipped against the original
assembly. A PC port of GoldenEye built on this codebase is reportedly already in testing.

None of the repos ship the original assets or a ROM — you have to dump your own cartridge to
build anything. That's not a technicality; it's the entire reason these projects survive.
Nintendo went after the compiled, asset-bundled **Mario 64 PC port** in 2020, not the decomp
source itself, and the pattern has held since. Source-only, clean-room, bring-your-own-dump
is the model that keeps this kind of work online.

## What five years of matching a ROM actually tells you

Here's the part I find more interesting than the port speculation. To match a 1997 build
byte-for-byte, you don't just recover *what* the game does — you recover *how tightly* it
was built to fit, because the original programmers were optimizing against constraints a
decompiler has to reproduce exactly or the build fails.

The N64 had **4KB of texture cache** on its RCP. Four kilobytes, total, for whatever texture
was bound at any given draw call — which is why GoldenEye's levels are built from small,
heavily tiled textures rather than the large unique sheets a modern environment artist
reaches for by default, and why so much of the game's material read comes from vertex
colors and lighting doing work that texture detail can't. Draw distance in the Facility and
Frigate levels gets hidden behind fog not for mood but because the hardware could not afford
to render what fog would otherwise cover. Geometry budgets were counted in triangles per
room, not per scene. None of that is news to anyone who's read a GDC postmortem, but a
decompilation is different from a postmortem: it's the actual constraint-solving, preserved
in source, rather than someone's memory of it years later.

That's what makes a completed matching decomp worth more to a technical artist than to a
speedrunner. A mod built on the assembly can move a wall. A mod built on this source can tell
you *why* the wall was where it was — what texture budget, draw call count or RCP limit put
it there — and that's the kind of ground truth you normally only get by working at the
studio that shipped the thing.

## Where this actually goes

Expect, in roughly the order Mario 64 and Perfect Dark went: a native PC build with modern
resolutions and control schemes first, then widescreen and camera mods, then the more
ambitious stuff — Randomizers, new levels built in the original engine, maybe eventually a
decompilation-powered rebuild in something like Unreal or Godot the way Ship of Harkinian
went for Ocarina of Time. Whether Nintendo tolerates any of it long-term is genuinely
unknown; the company's tolerance has run hot and cold project to project, and nothing here
guarantees GoldenEye gets the multi-year runway Mario 64's community got before the 2020
takedowns. For now, the source is out, it's provably correct, and that's not something
Nintendo can decompile back into secrecy.
