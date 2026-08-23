---
title: The first arcade video game had no computer in it. A rare copy is up for auction.
date: 2026-08-14
category: Tech
author: piero-lanzoni
excerpt: A green-sparkle 1973 Computer Space cabinet is bidding at RR Auction right now. What stopped me scrolling wasn't the price — it's that the machine has no CPU, no ROM and no frame buffer. The rotating spaceship on screen is wired directly into transistor logic.
cover: /img/blog/computer-space-first-video-game-had-no-cpu/shot-01.jpg
---

There is a two-player **Computer Space** cabinet up for sale at RR Auction in Boston right
now, and I nearly scrolled past it as another "rare thing sells for a lot of money" story.
Then I read what is actually inside the box, and stopped.

**Computer Space** (1971, Nutting Associates) is generally credited as the first arcade
video game and the first commercially sold video game, full stop — a year before Pong. This
particular unit is the far rarer **1973 two-player "green sparkle" fiberglass cabinet**;
the single-player version shipped in red, blue and yellow, and green was reserved for the
two-player run. Reportedly fewer than ten of those two-player cabinets are known to survive
in working order — I could only find that figure from auction coverage, not an independent
registry, so treat it as a claim rather than a count. As of the listing sitting at 12 bids,
the price was **$6,748**, against an estimate RR Auction and multiple outlets put at
**$20,000-plus**. The auction closes **20 August**. Worth flagging: the trade write-up I
first saw this story in quoted a $200,000 estimate, but that figure does not appear on the
RR Auction listing itself or in any other outlet's coverage I could find — every other
source lands on $20,000+, so that is the number I'm going with here.

## The name is a lie, and that's the interesting part

<figure>
  <img src="/img/blog/computer-space-first-video-game-had-no-cpu/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Computer Space arcade cabinet, via Wikimedia Commons</figcaption>
</figure>

"Computer Space" does not contain a computer. No CPU. No ROM. No frame buffer. In 1971,
none of those were affordable enough to put inside a coin-op cabinet that had to earn its
keep back a quarter at a time. Nolan Bushnell and Ted Dabney, working as Syzygy
Engineering, solved that by building the entire game as a hardwired state machine out of
discrete **7400-series TTL logic chips** — the same family of parts you'd find gluing
together a random piece of 1970s test equipment, not something you'd expect to draw a
rotating spaceship dodging saucer fire on a CRT.

The shapes — the ship, the saucers, the rocket exhaust — weren't stored as bitmaps or
sprites in any memory chip, because there was no memory chip to store them in. They were
laid out as physical **diode matrices**: arrays of diodes wired in the pattern of the shape
itself, so the "data" is the circuit. Counters and flip-flops handled position, rotation
and collision, and the whole thing wrote directly to a modified 15-inch black-and-white
GE television. No framebuffer, because a framebuffer is memory, and there wasn't any. The
picture existed only as a live electrical state, redrawn every frame by logic that had no
concept of "frame" as data — just as timing.

I build in engines that abstract every one of those problems away. Vertex buffers, render
targets, texture atlases — all of it assumes you can store a shape once and reference it
cheaply. Computer Space predates the idea that you'd have anywhere to store it. The
"compression trick" of building a shape as a small symmetric pattern you reuse and mirror,
rather than storing every orientation in full, is the same instinct behind texture
atlasing and instancing today. It's just implemented in soldered logic instead of a shader,
because soldered logic was what a quarter-operated cabinet in 1971 could afford.

## It also explains why it flopped

Computer Space is famous partly *because* it was a commercial disappointment. It was built
as a coin-op adaptation of **Spacewar!**, the 1962 two-player game made for the PDP-1 at
MIT, and it kept Spacewar!'s three-button control scheme — rotate, thrust, fire — plus a
control layout that assumed the player already understood orbital-style movement. Great
for engineering students who'd played Spacewar! on a university mainframe. Baffling for
someone who'd wandered over from the pool table at a bar.

That failure is the reason **Bushnell's Law** exists — the idea, which Bushnell applied
directly to designing Pong a year later, that a coin-op game has to be simple enough for a
stranger to understand in the time it takes to read the instructions once. It's a design
lesson that still holds for the first ninety seconds of anything you ship today, and it
came out of watching people bounce off Computer Space's control panel specifically.

Syzygy's cut of Computer Space's royalties helped fund the company Bushnell and Dabney
founded the following year. They wanted to call it Syzygy again; a roofing company already
had the name registered. They picked **Atari** instead.

## Why this one, why now

None of that changes the price of the cabinet on the block. What it does is put a number
on how far real-time graphics have come without most of the underlying problem changing:
you still have a limited budget, you still need motion to read clearly, and you still have
to decide what gets stored once and reused versus rebuilt every frame. Computer Space just
had to answer those questions in diodes instead of draw calls, because in 1971 that was the
only silicon a quarter machine could afford.

Whoever wins this one isn't buying a piece of nostalgia. They're buying the machine that
existed before the industry had a word for "graphics pipeline."
