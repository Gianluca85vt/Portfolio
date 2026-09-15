---
title: Steam Frame costs $1,059 because of RAM prices
date: 2026-09-15
category: Tech
excerpt: Valve's standalone headset went on sale at $1,059. The 16GB of LPDDR5X inside it is the one component Valve could not shrink to hit a cheaper number.
cover: /img/blog/steam-frame-1059-ram-market/shot-01.jpg
draft: true
---

Valve opened Steam Frame orders yesterday, 14 September, at $1,059 for the 256GB
model and $1,299 for the 1TB, starting at €1,049 in Europe. Jeremy Selan, one of
the developers on it, told the BBC how it got to that number: the company set out
to make something far more affordable, and the global RAM and storage markets hit
Valve the way they have hit everybody. His other line is the one worth keeping —
they fought hard to get it even to this price.

That is a hardware team saying the bill of materials won.

<figure>
  <button class="video-embed" data-video="9mz_jb8KTp4" data-title="Steam Frame - Official Valve Announcement" type="button">
    <img src="/img/blog/steam-frame-1059-ram-market/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from Valve's Steam Frame announcement video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Valve's own announcement video for the Frame, from when the headset was revealed in November 2025 — ten months before anyone knew what it would cost.</figcaption>
</figure>

## Sixteen gigabytes, and nowhere to cut

The line on the spec sheet that did this is 16GB of LPDDR5X, unified, feeding a
Snapdragon 8 Gen 3. Unified means the CPU and the GPU drink from one pool. There
is no separate VRAM to trade against, so every render target for two 2160×2160
panels — running somewhere between 72Hz and 144Hz — sits in the same 16GB as the
operating system, the tracking stack, the compositor and whatever the game
believes it owns.

Sixteen is generous for a headset. Quest 3 shipped with eight. So the obvious
saving, the one every hardware company reaches for when a component doubles in
price, was to halve it and absorb the compromise.

Valve didn't, and why not is the most interesting thing about this machine.

## The memory is load-bearing

The Frame runs Arm. SteamOS on Arm, which is new, on a Qualcomm mobile part. Your
Steam library is x86. Valve's answer is FEX, the open-source x86-on-Arm
translation layer it has been funding for years and has now folded into Proton —
so a Windows x86 build goes through Proton to become a Linux x86 build, and
through FEX to become something the Snapdragon can execute.

Stack two translation layers and memory is the first thing you spend. At any
moment the device is holding the original binary, the translated code cache FEX
builds as it runs, and the game's own working set. The code cache grows with how
much of the game the player has walked through, which means the memory cost
climbs over a session rather than sitting still. A game that fits comfortably in
six gigabytes natively does not fit in six gigabytes under translation.

And the Frame's whole pitch is that your existing library comes with you. Cut the
RAM and the pitch stops being true. Valve was holding the one component whose
price went vertical, and it was the component the product stands on.

Sony is stuck on the same rock for the same reason — [memory prices are why it
still can't put a date on the PS6](/blog/ps6-memory-crisis-next-gen-art-budgets/),
and Totoki said so on the record rather than letting people guess. Two companies,
two very different products, one supply chain. Samsung, SK Hynix and Micron make
almost all the world's DRAM between them, and through 2026 they have been moving
wafers to high-bandwidth memory for AI accelerators, where the margin is. What
reaches a headset is what's left over.

## What 16GB unified actually buys an artist

If you are building for this thing natively, capacity is rarely the wall you hit
first. Bandwidth is. A mobile SoC on LPDDR5X has an order of magnitude less
memory bandwidth than a desktop card, and in VR you are paying for two eyes, high
refresh, and a framebuffer that has to be read back and encoded if anything is
being streamed. Overdraw costs more than it does anywhere else. Transparency
stacks are expensive in a way that does not show up in a screenshot. Full-screen
post is a tax you pay 144 times a second, per eye.

Which is the same discipline VR-native studios have always worked under, and the
reason the craft is so specific. Polyarc built three Moss games inside those
limits, and [the art discipline that took](/blog/polyarc-closes-moss-vr-native-art/)
is worth reading next to a launch like this — the studio closed on 11 September,
three days before Valve put a $1,059 headset on sale.

There is a way around all of it, and Valve built the headset around that instead.
The Frame is described as streaming-first: a dedicated wireless adapter with two
radios, one held open for the stream and one for ordinary Wi-Fi, plus eye-tracked
foveated streaming that spends bandwidth where the pupil is pointed. Do the heavy
render on a PC in the next room and the Snapdragon's job shrinks to decode and
reproject. The memory stops being the constraint because the memory that matters
is in the tower.

Read the product that way and "streaming-first" describes what the bill of
materials allowed. Foveated streaming from a machine you already own is a
genuinely good answer, and Valve controlling both ends of the stack is why its
version has a shot at low latency. The architecture and the price came from the
same place.

Valve has confirmed it sells the $1,049 Steam Machine at cost. Pierre-Loup
Griffais hinted to Tom's Hardware that the Frame may be in the same position,
though as far as I can find the company has not said so outright. If that turns
out to be true, then $1,059 is not Valve's margin. It is Samsung's.

Reservations are open until 17 September.
