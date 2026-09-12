---
title: "FF7 Revelation: one disc and a mandatory download"
date: 2026-09-12
category: Games
excerpt: Square Enix is shipping the FF7 trilogy finale on a single Blu-ray you cannot play until it finishes downloading. The arithmetic is worth following.
cover: /img/blog/ff7-revelation-one-disc-mandatory-download/shot-01.jpg
---

Naoki Hamaguchi confirmed this week that the physical edition of Final Fantasy
VII Revelation ships on one disc, and that the disc on its own will not get you
into the game. There is a mandatory download on top. Square Enix dates the game
8 April 2027, physical and digital the same day, on PS5, Xbox Series X|S,
Switch 2 and PC.

His reasoning, as reported: the team discussed matching the disc count of the
previous two games, and doing that would have meant compromising the fidelity
and quality of the build. So they went with one disc plus a download.

That answer got a fairly cold reception, and I understand why — it sounds like
a press line covering a cost decision. Follow the numbers, though, and it holds
up better than it reads.

## The arithmetic

A PS5 game disc is a triple-layer Ultra HD Blu-ray. 100GB. The Xbox Series X
disc is the same format at the same ceiling. That number has not moved since
2020 and there is no fourth layer coming.

Rebirth installed at roughly 150GB and shipped on two discs. Remake shipped on
two as well. Revelation is the finale of a trilogy that has grown with every
instalment — the [Planet's Crisis trailer we wrote about in
August](/blog/final-fantasy-vii-revelation-planets-crisis-trailer/) put the
Highwind in the sky and opened up rooftop traversal across zones that were
corridors in 1997. If that build lands anywhere past 200GB, and it very
plausibly does, you are into three discs.

Three discs is not impossible. It is a thicker case, a third replication run,
a third SKU line in every warehouse, and — the part that bites a schedule
hardest — nothing about it is free on the engineering side either.

## What eats 150GB

People assume textures, and textures are a big share, but they are rarely the
whole story in a Japanese RPG of this size.

Voice is enormous. Revelation ships full English and Japanese performance for a
game people will spend somewhere north of a hundred hours inside. Two complete
vocal tracks for that much dialogue, at a bitrate that does not audibly fall
apart on a decent soundbar, runs into tens of gigabytes on its own. Pre-rendered
video adds more — the FF7 remakes lean on rendered cutscenes for the set pieces,
and a 4K stream at a bitrate Square Enix would sign off on is not small.

Then the textures. A 4K albedo, normal and ORM set for one hero asset, BC7
compressed, is around 48MB before you have lit anything. Multiply by a cast, a
world, and a materials library that has been accumulating since 2020.

## What "compromise" means in a schedule

Here is the reading I keep coming back to as someone who has cooked assets for
more than one target.

Shipping a smaller build for disc buyers is not a slider you drag. It is a
second cook. Every texture re-baked at a tighter compression setting, every
audio bank re-encoded, every streaming package re-laid-out, and then the whole
thing re-tested — because a lower-mip texture set changes what streams in when,
and that surfaces pop-in and hitches that the full build does not have. Then it
goes through platform certification again, per platform, as a distinct
submission.

So the disc SKU becomes a second version of the game with its own bug database.
On a project this size, in the final months, that is a real cost and a real
risk. Hamaguchi's answer is the honest one for a team trying to ship once.

Whether it is the *right* answer turns on
something the disc conversation usually skips.

## The console never plays the disc

Your PS5 does not run Revelation off that Blu-ray. It copies the contents to the
internal SSD, verifies them, and runs from there. The optical drive spins to
install and then to confirm, at launch, that you still have the thing in the
tray.

This changes what a disc is for. In the PS2 era the disc was the storage medium
and studios laid assets out on the platter with deliberate duplication — the
same texture written three times in three places so the laser never had to seek
across the disc mid-level. That craft is gone. Mandatory installs killed it.

What a modern disc gives you is a resale right, an offline install, and a copy
that survives a delisting. A mandatory download removes the second of those
outright, and puts the third on a timer — the day Square Enix takes that content
package down, your disc is a partial game. Which is the same argument we made
when [Sony announced PS5 discs stop in
2028](/blog/ps5-discs-end-2028-license-not-ownership/), arriving from the other
direction.

I don't think Square Enix is being dishonest here. I think the format ran out
of room three console generations after anyone expected it to, and nobody
building games at this scale has a good answer for the people who wanted a
box on a shelf that works.

<figure>
  <button class="video-embed" data-video="E9BTbjtXJWM" data-title="Final Fantasy VII Revelation - Combat and Exploration Deep Dive Trailer" type="button">
    <img src="/img/blog/ff7-revelation-one-disc-mandatory-download/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Final Fantasy VII Revelation combat and exploration deep dive trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Square Enix's combat and exploration deep dive, on the PlayStation channel. The open sky and the zone sizes on show here are a fair part of what the install size is carrying.</figcaption>
</figure>

One number to watch when the preload goes up next spring. If Revelation lands
under 200GB, the one-disc decision was about replication cost. If it lands well
past it, the arithmetic was never in question.
