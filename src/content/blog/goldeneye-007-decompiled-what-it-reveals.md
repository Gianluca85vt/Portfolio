---
title: "GoldenEye 007 decompiled: how N64 games were built"
date: 2026-08-18
category: Tech
excerpt: Six and a half years of reverse engineering, and the C now rebuilds the 1997 ROM byte for byte. It preserves the 4KB texture budget too.
cover: /img/blog/goldeneye-007-decompiled-what-it-reveals/shot-01.jpg
---

A community reverse-engineering effort led by a contributor going by KholdFuzion hit
100% on its GoldenEye 007 decompilation status page on 17 August, across the US, JP and
PAL builds. The project — `n64decomp/007` on GitHub, mirrored from KholdFuzion's GitLab —
now has C source code that recompiles to a byte-identical match of the original 1997
Nintendo 64 ROM. Tom's Hardware, XDA-Developers, HotHardware and Time Extension all picked
it up over the same 24 hours, and the milestone lines up with what the project's own public
tracker shows.

How long it took depends on where you start counting, and the coverage does not agree: Tom's
Hardware called it a half-decade, Time Extension nine years. The public GitHub mirror was
created in February 2020 and its last commit — "james bond will return." — landed on 17
August 2026, which makes six and a half years of work visible in that one repository, with
earlier reverse-engineering on the game predating it.

That "byte-identical" part matters, so let me explain what it actually means, because it's
the difference between a curiosity and something you can build a career's worth of mods on.

## Decompiled doesn't mean "readable." It means "rebuildable."

Reverse engineers didn't disassemble the ROM into raw MIPS assembly and stop there — that's
been possible for decades and gets you nothing but a wall of `jal` and `lui` instructions. A
**matching decompilation** goes further: you write C code, compile it with period-accurate
tools, and check whether the output is bit-for-bit identical to the retail cartridge. If it
matches, you've proven your C is a faithful reconstruction of what Rare's programmers
actually wrote, not just something that behaves similarly. Every function in GoldenEye 007
now clears that bar. Every one.

This is the same family of project as the Super Mario 64 decompilation (2019-2020),
Ocarina of Time and Majora's Mask (via the ZRET project, which fed HarbourMasters'
Ship of Harkinian port), and Perfect Dark, decompiled separately by Ryan Dwyer under the
same `n64decomp` GitHub organization. Every one of those spawned native PC ports, uncapped
framerates, widescreen support, and mods nobody could have shipped against the original
assembly. A PC port of GoldenEye built on this codebase is reportedly already in testing.

None of the repos ship the original assets or a ROM — you have to dump your own cartridge to
build anything. That is the entire reason these projects survive.
Nintendo went after the compiled, asset-bundled Mario 64 PC port in 2020, not the decomp
source itself, and the pattern has held since. Source-only, clean-room, bring-your-own-dump
is the model that keeps this kind of work online.

## What matching a ROM byte for byte tells you

The port speculation interests me less than this. To match a 1997 build
byte-for-byte, you don't just recover *what* the game does — you recover *how tightly* it
was built to fit, because the original programmers were optimizing against constraints a
decompiler has to reproduce exactly or the build fails.

<figure>
  <img src="/img/blog/goldeneye-007-decompiled-what-it-reveals/shot-01.jpg" loading="lazy" width="1440" height="810" alt="A Nintendo 64 console with its controller" />
  <figcaption>Nintendo 64 console and controller, photographed by Evan-Amos, released into the public domain via Wikimedia Commons</figcaption>
</figure>

The N64 had **4KB of texture cache** on its RCP. Four kilobytes. Total, for whatever texture
was bound at any given draw call — which is why GoldenEye's levels are built from small,
heavily tiled textures rather than the large unique sheets a modern environment artist
reaches for by default, and why so much of the game's material read comes from vertex
colors and lighting doing work that texture detail can't. Fog hides the draw distance in the Facility and
Frigate levels because the hardware could not afford to render what sits behind it. Geometry budgets were counted in triangles per
room, not per scene. None of that is news to anyone who's read a GDC postmortem, but a
decompilation is different from a postmortem: it's the actual constraint-solving, preserved
in source, rather than someone's memory of it years later.

That's what makes a completed matching decomp worth more to a technical artist than to a
speedrunner. A mod built on the assembly can move a wall. A mod built on this source can tell
you *why* the wall was where it was — what texture budget, draw call count or RCP limit put
it there — and that's the kind of ground truth you normally only get by working at the
studio that shipped the thing.

## Where this goes

Expect, in roughly the order Mario 64 and Perfect Dark went: a native PC build with modern
resolutions and control schemes first, then widescreen and camera mods, then the more
ambitious stuff — Randomizers, new levels built in the original engine, maybe eventually a
decompilation-powered rebuild in something like Unreal or Godot the way Ship of Harkinian
went for Ocarina of Time. Whether Nintendo tolerates any of it long-term is genuinely
unknown; the company's tolerance has run hot and cold project to project, and nothing here
guarantees GoldenEye gets the multi-year runway Mario 64's community got before the 2020
takedowns. For now the source is out and provably correct. Nintendo cannot decompile that
back into secrecy.
