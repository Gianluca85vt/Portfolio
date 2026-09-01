---
title: Black Flag Resynced 1.0.7 turns off the perk glow
date: 2026-09-01
category: Games
cover: /img/blog/black-flag-resynced-perk-vfx-toggle/cover.svg
excerpt: Title Update 1.0.7 adds a Perk Effects switch, so the emissive aura on Edward's gear can be shut off. Live today at 14:00 UTC.
draft: true
---

There is a menu in Assassin's Creed Black Flag Resynced called HUD/VFX
Customization. As of today it holds one more switch, labelled Perk Effects, and
turning it off stops Edward Kenway glowing.

Title Update 1.0.7 went live on 1 September 2026 at 14:00 UTC across platforms,
somewhere between two and sixteen gigabytes depending on which one you're on.
The rest of it is quality-of-life: you can now hide Edward's pistols, the way an
earlier patch let you hide the blowpipe, and there's a stray dog somewhere in
the Caribbean you can pick up and take back to the hideout. Then a long tail of
fixes across photo mode, animation and audio.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=PhQ3yQjUgAc" target="_blank" rel="noreferrer">
    <img src="/img/blog/black-flag-resynced-perk-vfx-toggle/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Ubisoft's Black Flag Resynced overview trailer" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>Ubisoft's own overview trailer for Black Flag Resynced. It opens on YouTube — the game is rated 18 and these trailers are usually age-gated, which blocks in-page playback.</figcaption>
</figure>

## What the aura was doing there

Perks come off gear. A player wearing gear needs to know the gear is working,
and on a third-person character the cheapest way to say so is emissive. An aura,
a rim, a slow particle drift. It reads at any camera distance, it survives any
lighting condition, it costs no screen real estate and no HUD element, and
almost every action game built in the last fifteen years does some version of
it.

The bill arrives on the one asset the camera never leaves.

## Why it lands badly here in particular

Black Flag's visual argument has always been light on water and light on cloth.
Sun low over the Caribbean, wet linen, a coat that moves. A resync of a 2013
game is spending its whole budget making that read better than it used to. And
then a fixed-intensity glow sits in the middle of every frame, indifferent to
the sky that took months.

Emissive readability layers sit outside the lighting model on purpose. That's
the whole reason they work — an aura that dimmed correctly at noon would stop
communicating at noon, which defeats it. So it doesn't ride the exposure curve
the rest of the scene lives under. At night it blooms into the frame. Under a
midday sun it barely registers. Whoever tuned that value was choosing a number
that is wrong in most lighting conditions and survivable in the average one,
which is the actual job, and it is a worse job than it sounds like from the
outside.

Every hour the lighting team spends on a sunset gets partly overwritten by a
system that has to ignore the sunset to do its work.

## A menu is what you ship when both readings are right

Two players look at the same frame. One wants to know their build is live. One
wants the picture. Both are asking for something reasonable and the answers are
incompatible, so Ubisoft shipped a switch — the same admission behind the
growing HUD customisation menus across the series, where eagle vision washes,
objective markers and interaction prompts have all been peeled apart into
individual toggles over the last few years.

That category of menu keeps getting longer. It's worth noticing what that means
for how these games get made: readability layers now get authored knowing a
chunk of the audience will delete them, which is a strange brief. You tune the
glow for the players who keep it and you make sure the gear still reads as
different gear for the players who don't. Silhouette and material have to carry
the information on their own, in the version where the aura is gone.

## The pistols are a different problem wearing the same clothes

Hiding the pistols isn't about lighting. Edward's bandolier is a rack of pistols
across the chest, and it is genuinely iconic, and it is also a wall of
hard-surface clutter sitting exactly where the coat's secondary motion and the
cloth sim do their most visible work. Every frame of run animation, the good
stuff is happening under four gun barrels.

Turn them off and you can see the coat. Ubisoft is selling it as a cosmetic
preference, which it is. It also hands the animation back to the player.

The blowpipe went first, in an earlier patch. Pistols now. My guess is the list
keeps growing, and that a "hide everything I'm not currently holding" option is
where it ends up, because that's what people are really asking for when they
turn these on one at a time.

Also there's a dog now. I have my priorities.

---

*Title Update 1.0.7 details from Ubisoft's own patch notes for Black Flag
Resynced, published 31 August 2026, with the release timing confirmed on the
Assassin's Creed channel. The Perk Effects toggle lives in the HUD/VFX
Customization menu.*
