---
title: "Thief Remastered's Tarnished Mirror: 3 missions"
date: 2026-09-14
category: Games
excerpt: Nightdive confirmed the campaign its own Steam leak gave away. Three missions, five enemy types, full reveal 2 November, built on a 1998 engine.
cover: /img/blog/thief-remastered-tarnished-mirror-dark-engine/shot-01.jpg
---

Nightdive spent the weekend making a joke of its own leak. A mass Steam
achievements dump earlier this month spilled a set of strings nobody was meant
to read, and the teaser that followed on 11 September 2026 is a montage of
every article and post that ran with them, closing on fresh Garrett key art by
Alexandru "Dominus" Negoita and one line of dialogue: *"Huh, not so secret
anymore."*

The secret was **The Tarnished Mirror**, a new campaign for *Thief: The Dark
Project Remastered*. Three story missions. Five new enemy types. The full
reveal is held until 2 November, and the remaster itself carries a winter
window on its Steam page.

<figure>
  <button class="video-embed" data-video="VdVODbtS344" data-title="Thief: The Dark Project Remastered — The Tarnished Mirror Teaser" type="button">
    <img src="/img/blog/thief-remastered-tarnished-mirror-dark-engine/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Nightdive Studios' Tarnished Mirror teaser" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Nightdive Studios' own teaser, posted to their channel. It runs under a minute and is mostly a scroll of the headlines that leaked it, so the campaign footage everyone wants is still being held for 2 November.</figcaption>
</figure>

## Where the port work ends

Everything else on the feature list is Nightdive doing what Nightdive does.
*The Dark Project* and the *Gold* content go onto KEX, their in-house engine,
and come out at 4K and 120fps with gamepad support, rumble and gyro, an item
and weapon wheel, mission replay, updated models, textures and cutscenes. One
line in that list is doing more work than the rest: "small fixes to the
original level design". Alongside it, built-in support for the custom campaigns
written for the 1998 release.

Three new missions is a separate job from any of that. Somebody has to author
levels for a twenty-eight-year-old engine, in that engine's terms, and hand
them to an audience that has been building in the same toolset since 1999 and
will spot a seam instantly. It is original level design, on a deadline, in a
toolchain older than most of the people who will play it.

## Everything hangs off the light gem

Thief's stealth runs on the lighting. The light gem in the middle of the HUD
samples the illumination where Garrett is standing and shows it back to you,
and the AI's chance of seeing you is driven off roughly the same value. That
single loop is why the game still works twenty-eight years on. The thing you
are reading is the room itself, and it is legible at a glance because a lamp
looks like a lamp.

Which puts a hard floor under the remaster. The light is baked —
lightmaps computed offline and stored in the mission file, the way a 1998
engine had to do it. The gem samples the bake. So you cannot relight a Thief
level to modern taste. Lift the exposure, warm up the torches, throw in a
bounce pass, and you have quietly moved where the player is safe. Every
shadow in the game is a decision somebody placed, tested and signed off. The
bake is the record of it.

New missions inherit the same rule from the other side. For whoever is
building *The Tarnished Mirror*, the lighting pass **is** the stealth pass. Get
a corridor a shade too bright and a patrol route that read fine on paper stops
working.

That kind of tension — where the new thing added on top changes how the old
thing reads — is the recurring problem with remasters. Ubisoft ran into a small
version of it this month and shipped a switch: [Black Flag Resynced now lets
you turn the perk glow off](/blog/black-flag-resynced-perk-vfx-toggle/),
because an emissive aura nobody asked for was sitting on Edward's gear in a
game whose whole look predates that idea.

## Rooms you can't see

There is a second layer under every Thief level, and it is invisible.

Dark Engine geometry is carved rather than assembled — you subtract rooms out
of solid space, and the engine chops the result into cells and portals so it
knows what can see what. Over the top of that, an author hand-places *room
brushes*: volumes that carry no geometry at all and exist so the engine knows
where sound goes, where AI can hear, which space an object is in. Footstep
noise on stone against carpet, a guard hearing you two rooms away through an
open door — that comes out of the room graph, not the visible walls.

So a new Thief mission is really two builds. The one you look at, and the one
you listen through. Miss a room brush and nothing breaks visually. The level
just goes deaf in one corner.

## Why the fan campaigns pin everything down

The best promise on that store page is the smallest one. Support for custom
campaigns made for the original game. Twenty-eight years of community
missions — some of them longer and better constructed than the shipped
campaign — become playable at 4K without anyone porting them one at a time.

To do that, KEX has to keep reading the original mission format, brushes,
lightmaps, room graph and all. Which in turn sets the ceiling on how far
Nightdive could modernise the renderer even if it wanted to. You cannot swap in
a dynamic lighting model underneath a format whose light is a stored array, and
you cannot re-portalize twenty-year-old fan levels on load without breaking the
ones that exploited the quirks. The compatibility promise and the visual
restraint are the same decision.

Restoration work keeps arriving here. The source sets the ceiling. No amount
of budget lifts it — the same wall [a 4K scan of 35mm cel animation runs
into](/blog/ninja-scroll-4k-restoration-cel-scan/), where the resolution is
free and the thing being scanned simply has no more detail in it.

## What is actually confirmed

Confirmed: The Tarnished Mirror exists, three story missions, five new enemy
types, reveal on 2 November 2026, remaster dated to a winter window, KEX,
4K/120, fan campaign support.

Not confirmed: what Nightdive is authoring those missions *in*. Nothing
published says whether the new levels were built in DromEd, the original
in-house editor that eventually reached the public, or in something the studio
wrote itself against the same file format. For anyone who has ever fought that
editor, it is the single most interesting question about the whole campaign,
and 2 November is when we find out.

---

*Campaign details, reveal date and feature list from Nightdive Studios' teaser
and the Thief: The Dark Project Remastered Steam page, as reported on 11–12
September 2026 by PC Gamer, TheGamer and Eurogamer. Dark Engine specifics —
baked lightmaps, the light gem, room brushes, subtractive geometry — are
long-documented behaviour of the 1998 engine and its editor, not statements
from Nightdive about the remaster.*
