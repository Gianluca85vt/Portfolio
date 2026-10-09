---
title: "GameMaker games on 3DS: how Cinnamon does it"
date: 2026-10-09
category: Tech
excerpt: A fork of the Butterscotch runner puts GameMaker bytecode on the 3DS and Wii U. Most of the labour went into converting textures and audio for the hardware.
cover: /img/blog/gamemaker-games-on-3ds-cinnamon-runner/shot-01.jpg
sources:
  - outlet: Project Sunshine (Cinnamon repository)
    url: https://github.com/Project-Sunshine-Native/cinnamon
  - outlet: Butterscotch Runner project
    url: https://github.com/ButterscotchRunner/Butterscotch
  - outlet: 80 Level
    url: https://80.lv/articles/pizza-tower-runs-on-3ds-due-to-custom-gml-runner-called-cinnamon/
artistView:
  take: "Reading the preprocessor's documentation tells you more about this port than any screenshot does. Somebody sat down with a decade-old GPU's texture formats and worked out, page by page, which assets could survive block compression and which had to be paid for in full."
  works:
    - "Texture pipeline: keeping sprite and background atlas pages at rgba5551 while compressing the rest is the correct call for hand-drawn pixel art, and it is the sort of per-page decision most pipelines never bother to make."
    - "Pipeline design: converting assets ahead of time on a desktop, rather than at load on the console, moves every expensive decision off the device that cannot afford it."
  misses:
    - "Audio: 4-bit ADPCM is a heavy haircut on music written for lossless playback, and on a game scored as carefully as Undertale that is the compromise a listener will notice first."
    - "Coverage: implementing GML functions one at a time means compatibility arrives in a jagged line, so a supported bytecode version still says very little about whether a given game runs."
---

Export a game from GameMaker: Studio and you do not get a native executable
with your code inside it. You get bytecode, bundled next to the assets, plus a
stock interpreter — the YoYo runner — whose job is to read that bytecode at
runtime. The arrangement is closer to a Java application than to a compiled C++
game, and it has a consequence the toolchain's authors presumably thought about
for roughly a second before moving on: the bytecode in a shipped GameMaker game
will run on *any* runner that speaks the same version of it.

Which is the gap [Butterscotch](https://github.com/ButterscotchRunner/Butterscotch)
climbed into. It is an open-source reimplementation of the YoYo runner, written
to be portable, and its own documentation lists builds for Windows, macOS, the
web, the PlayStation 2, the PS3, the Vita and the Switch. A fork called
**Cinnamon** narrows that ambition to old Nintendo hardware: the 3DS, the Wii U,
the Wii, with the GameCube listed as future work. It is the thing 80 Level
pointed at this morning, and the project behind it, Project Sunshine, has been
using it to put Undertale and Deltarune on consoles that never saw either.

## The version ladder decides everything

<figure>
  <img src="/img/blog/gamemaker-games-on-3ds-cinnamon-runner/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Tour De Pizza, via the official Steam page</figcaption>
</figure>

Before any of the interesting engineering starts, a game has to clear a
compatibility gate, and the gate is narrow.

Butterscotch tracks what YoYo internally calls the WAD version, which modding
tools like UndertaleModTool label the bytecode version instead. The ladder runs
from WAD 8 — GameMaker: Studio 1.0.198 and up — to WAD 17, which is GameMaker
Studio 2.2 and later. Cinnamon currently handles two rungs of it: 16 and 17.

Below WAD 8 the question changes shape. Those builds carry raw GML, interpreted
when the game loads, so running them needs a GML compiler rather than a
bytecode interpreter — a different program, not a bigger version of this one.

And at the other end, two toolchain options take a game off the ladder
completely. Anything built with YYC, GameMaker's native-code compiler, ships
machine code rather than bytecode; same for anything built on GMRT, YoYo's
newer runtime. Cinnamon's README names Forager and Hyper Light Drifter as
casualties, the upstream project adds Rivals of Aether. A studio that chose the
faster compiler at some point in 2017 quietly opted out of ever being ported
this way.

Note what that means for the work. What gets reimplemented here is the
*machine*, and the game stays sealed — its logic arrives as portable bytecode
and is never opened. That puts this a long way from the six-and-a-half-year
archaeology behind
[a GoldenEye 007 source tree that rebuilds the 1997 ROM byte for byte](/blog/goldeneye-007-decompiled-what-it-reveals/),
where the whole task was reconstructing C from a compiled binary. Here the game
is an input file the project explicitly does not distribute: Cinnamon ships
under the MPL, with a disclaimer that you supply your own `data.win`.

## The part that is actually hard

So the interpreter reads the bytecode. Fine. The assets are where a 3DS starts
saying no.

Cinnamon does not read textures and audio out of `data.win` on the console.
There is a separate host-side tool, `n3ds-preprocess`, that you run on a desktop
against the game's data file, and it writes out a converted asset bundle — a
texture atlas, a packed blob of sprites and backgrounds and fonts with seek
metadata, a sound bank, and streamed music as loose files. The output goes into
the build's romfs, or onto the SD card at `3ds/cinnamon` if you want to swap
assets without rebuilding.

Doing conversion ahead of time, on hardware that has power to spare, is simply
correct. Every cycle spent deciding how to pack a texture is a cycle the 3DS
does not have.

But the format choices inside that tool are the bit I would put in front of
anyone who thinks texture compression is a solved problem you tick a box for.
The preprocessor defaults to what the documentation calls a hybrid atlas:
sprite and background pages stay at **rgba5551**, while non-sprite pages may be
compressed to **etc1a4**. You can override it per page, or force one format
everywhere.

That asymmetry is a real decision with a real cost. ETC1A4 is block
compression — four bits of colour per pixel, plus a separate four-bit alpha
plane — and block compression works by approximating each block of pixels with
a pair of endpoint colours. Feed it a photograph and you will struggle to see
the damage. Feed it hand-drawn pixel art, where every edge is a deliberate
one-pixel transition between two unrelated colours, and the compressor smears
exactly the thing the artist spent their time on. Outlines go muddy. Flat fills
pick up blotches near their borders.

RGBA5551 is sixteen bits a pixel, so choosing it for the sprite pages doubles
their footprint against the compressed alternative. On a console whose texture
memory is measured in single-digit megabytes that is not a small concession,
and it is the right one, because the alternative is visible in every frame. The
one-bit alpha that comes with the format is almost free here: cut-out pixel-art
sprites are either opaque or absent, and rarely need the soft edges that single
bit cannot express.

Audio takes the opposite ruling. Music gets decoded from Vorbis and re-encoded
as 4-bit ADPCM — a hard, cheap, lossy compression that the console's audio
hardware can play back without spending CPU on it. Nobody would choose it for
music if there were another option. There is not really another option.

Both calls follow the same logic, and it is the logic of every constrained
pipeline I have worked inside: find the one channel the audience is actually
scrutinising, protect it, and let the rest take the hit. On a 2D game built out
of sprites, the sprites are that channel. The soundtrack, played through a 3DS
speaker, is not where anyone will look first — even when it probably deserves
better.

## What is on hardware, and what is on an emulator

Here the reporting needs more care than the headlines gave it.

The project's own showcase separates its evidence by platform, and the
separation matters. Undertale is documented running on **real 3DS hardware**,
with screenshots, on bytecode 16. Pizza Tower appears too, also on bytecode 16
— but it is the Demo 1 build from SAGE 2019, and it is shown under Wii U via
Cemu, which is an emulator running on a PC rather than a console on a desk.

So the retail Pizza Tower, the 2023 release, on a physical 3DS? I could not
confirm it from the project's own materials, and I am not going to assert it
because an aggregator headline did. The repository lists Pizza Tower as an
opportunity the runner opens up, which is a statement of intent. Treat the
stronger version of the claim as unverified until the project posts hardware
footage.

What the developers do claim, in their own forum posts, is a stable 30fps in
most areas for the Undertale port across Wii U, the original 3DS and the New
3DS, with all three routes completable. That is their measurement, not an
independent one, and it is worth saying so plainly. Reimplementation projects
tend to quote their best rooms. The honest comparison is
[the PS5 emulator that took Demon's Souls from one frame a second to forty or
fifty in about three weeks](/blog/ps5-emulation-demons-souls-50fps/): early
numbers on this kind of work move fast in both directions, and a figure from
September describes September.

## Why a runner beats a port

The structural thing worth taking away is the launcher the project says it is
building. Because the runner is generic, one binary plus a converted asset
bundle gets you any compatible game — rather than a separate hand-maintained
port per title, which is how this scene has always worked and why it has always
stalled.

That is a genuinely different proposition from a fan port. A fan port is one
game, one person, one abandonment. A runner is infrastructure, and the
compatibility list grows every time somebody implements another GML function in
C. The project is candid that this is how it progresses — one function at a
time — which is why a game can sit on a supported bytecode version and still
fall over on launch.

It also means the ceiling is set by the hardware rather than by anybody's
patience. Games leaning on heavy 3D or large particle systems will not fit on a
console from 2011, whatever the runner does. Everything else is a texture
budget and a list of unimplemented functions, and both of those are the kind of
problem that yields to time.
