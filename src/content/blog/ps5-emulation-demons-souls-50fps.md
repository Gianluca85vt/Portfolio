---
title: "Demon's Souls: 1 to 50 FPS on a PS5 emulator"
date: 2026-10-01
category: Tech
excerpt: KyTyPS5 took Demon's Souls from one frame a second to 40-50 in about three weeks, and a new jailbreak opened every PS5 still on July firmware.
cover: /img/blog/ps5-emulation-demons-souls-50fps/shot-01.jpg
sources:
  - outlet: Ars Technica
    url: https://arstechnica.com/gaming/2026/09/ps5-jailbreaks-just-got-a-lot-more-useful/
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/playstation/marvels-wolverine-reaches-gameplay-with-kytyps5-emulator-ps5-exclusive-joins-ghost-of-yotei-in-reaching-gameplay-performance-still-in-single-digits
  - outlet: VideoCardz
    url: https://videocardz.com/newz/ps5-exclusive-marvels-wolverine-now-boots-on-pc-demons-souls-reaches-40-50-fps
artistView:
  take: "Emulating a console is a renderer reproduction problem before it is a speed problem, and the order those two get solved in tells you how it is going. KyTyPS5 is showing correct images first and frames second, which is the harder way round and the one that usually holds up."
  works:
    - "Rendering: in PSXTech's capture the Boletaria lighting reads the way it does on hardware — the shadow terminators sit where they should and the fog holds its depth, which means the shader translation is landing rather than approximating."
    - "Materials: no obvious channel swaps or inverted normals in the footage shown, the usual first casualty when a translation layer guesses at a texture format."
  misses:
    - "Scope: three minutes across two or three locations proves a corridor, not a game. Boss arenas and the Nexus hub are where frame times historically fall apart."
    - "Performance: 40-50 FPS came off an i9-14900K and an RTX 5090 to reproduce a machine that holds 60 on its own silicon, so the translation is still costing roughly an order of magnitude in hardware."
draft: true
---

Demon's Souls booted on a PS5 emulator on 8 September at about one frame a
second. By 12 September it was doing 15 to 18. The next day, 30. Late last week
a capture went up showing 40 to 50 across several areas, on an i9-14900K and an
RTX 5090.

Three weeks. PS3 emulation took most of a decade to reach that curve, and it had
the advantage of a console whose oddities had been picked over in public for
years before anybody wrote a line of emulator code.

The emulator is KyTyPS5. Worth saying plainly, because half the coverage has it
confused with shadPS4, which is a different project aimed at the PS4. One more
caveat: the 40-50 FPS build is a local fork. It has not been pushed to GitHub.
Nobody outside the author has run it.

<figure>
  <button class="video-embed" data-video="GDwxZMe2-D0" data-title="Demon's Souls Remake 30 FPS KyTyPS5 Emulator" type="button">
    <img src="/img/blog/ps5-emulation-demons-souls-50fps/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from PSXTech's capture of Demon's Souls running under the KyTyPS5 emulator" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>PSXTech's capture at the 30 FPS stage, mid-September — one step down the curve from the 40-50 figure making the rounds now. Same emulator, earlier build.</figcaption>
</figure>

## The other half of the week

On the Tuesday, a jailbreak called Relapse landed, and it moved the line on
which consoles are reachable. Previous PS5 exploits worked on firmware old
enough that almost nobody was still running it. Relapse works on anything up to
13.6, which shipped in July — so any PS5 that missed the mid-September 14.00.00
update is now openable.

The route is an old WebKit hole in the console's deliberately awkward web
browser, escalated to kernel write access, then an ELF loader to make running
arbitrary code less of a ceremony. It is also quicker. Earlier exploits could
hang the machine for fifty minutes per attempt.

These two things are not the same project and one does not require the other.
They just arrived in the same seven days, which is what makes this week read
differently from the steady background noise of console hacking.

## What an emulator has to get right before it can get fast

A console emulator is doing two jobs that pull against each other. It has to
reproduce the machine's behaviour, and it has to do that fast enough to be worth
using. Projects that chase the second one first produce the thing everybody has
seen: sixty frames a second of wrong image. Missing geometry. Black textures.
Lighting that lost a gamma step somewhere and went chalky.

The PS5 makes the first job harder than usual. Games on it talk to the GPU
through Sony's own low-level API rather than through D3D12 or Vulkan, so the
emulator is not translating familiar calls. It is reconstructing an interface
that was never documented publicly, and then recompiling the shader bytecode
those calls reference into something a desktop GPU will accept. That is the part
that eats years.

Which is why the claim worth weighing in the Demon's Souls footage is the one
nobody put in a headline: reports describe very few graphics bugs alongside
that frame rate. Correct images and usable speed arriving together, this early,
says the shader path is working rather than being approximated.

Bluepoint's remake is a good test for that, because the whole game is a lighting
exercise. It was a 2020 launch title with no gameplay changes to speak of, built
to show what the new box did with materials and shadows. If a translation layer
is fudging anything in that pipeline, Boletaria is where it shows — in the fog
depth, in the shadow terminators, in the way metal catches a torch.

The same reasoning sits under [a modder path-tracing GTA 2 by writing a new
Direct3D 9 renderer](/blog/gta-2-rtx-remix-d3d9-renderer): once you are
re-implementing somebody's graphics API, the win comes from understanding what
the original was actually drawing, not from throwing silicon at it.

## Wolverine is the control group

Insomniac's Wolverine booted on the same emulator about twelve days after it
shipped, reached the main menu, and has now got as far as cinematics and
gameplay. At single-digit frame rates. Ghost of Yotei sits at about the same stage.

How single-digit depends who you ask. One test reports about 2 FPS on an RTX
5090; another has around 3 on an RTX 4070 paired with an i9-13900K. The gap
between those two is odd enough that I would not lean on either figure, beyond
the obvious: whatever the hardware, it is unplayable.

Set that against what the game does on the console it was written for. Wolverine
[ships with ray tracing on at 60fps on a base PS5](/blog/marvels-wolverine-ray-tracing-60fps-base-ps5),
not the Pro — the first Insomniac game that stopped making you choose. A five-thousand-pound PC gets two frames of it.

That gap is the honest measure of how much a fixed hardware target buys you. Six
years of studios writing directly to one GPU, with one memory layout and one set
of latencies, compounds into something a general-purpose machine has to brute
force its way back through. Demon's Souls runs because it is a 2020 game that
uses a fraction of what the hardware eventually learned to do. The 2026 games
are where the real cost shows up, and they will be slow for a long while yet.

## The part worth being careful about

Three minutes of video, two or three locations, a build nobody else has. None of
that makes it fake. The intermediate milestones were reproduced by other people,
and the climb from 1 to 15 to 30 is documented across several weeks of separate
posts by separate accounts, which is about as much corroboration as a scene
project ever generates. But a capture of the good bit is a capture of the good
bit. Emulator demos have a long history of being exactly that.

What I would want before calling this a solved renderer: the Nexus, a boss
arena, and a frame time graph rather than an FPS counter.
