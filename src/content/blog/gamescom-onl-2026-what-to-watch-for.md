---
title: Gamescom Opening Night Live starts at 20:00. How to tell in-engine from a target render.
date: 2026-08-25
category: Games
cover: /img/blog/gamescom-onl-2026-what-to-watch-for/cover.jpg
excerpt: Two hours of trailers, and most of what you learn from them has nothing to do with the games being announced. Here is the stream, the running order, and the handful of tells that separate footage running on a machine from footage rendered on a farm.
---

*Written on the afternoon of 25 August, before the show. Opening Night Live
has since aired and Gamescom itself runs through 28 August. I have left the
piece as it was published rather than quietly rewriting it after the fact —
the things it says to watch for are the same things whether you are watching
live or catching up on the trailers today.*

There is a particular twenty minutes before a show like this where the chat
fills up with people posting their predictions, and every year somebody is
convinced Half-Life 3 is on the slate. It never is. The show starts, Geoff
Keighley walks out, and the first trailer plays.

I watch these for a different reason than most people in that chat, and it took
me an embarrassingly long time to admit it: I am not really there for the
announcements. I am there to look at how the footage was made.

## Where and when

Opening Night Live runs tonight, Tuesday 25 August, at **20:00 CEST** — 19:00
BST, 14:00 ET, 11:00 PT. There is a pre-show half an hour before, at 19:30 CEST,
which historically carries one or two reveals that would have been perfectly at
home in the main broadcast.

It streams on the gamescom and The Game Awards channels simultaneously. Here is
the official one:

<figure>
  <button class="video-embed" data-video="qwC9EFT6EFk" data-title="gamescom Opening Night Live 2026 ONL Official Livestream" type="button">
    <img src="/img/blog/gamescom-onl-2026-what-to-watch-for/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Gamescom Opening Night Live 2026 official livestream title card" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The official ONL 2026 stream, from The Game Awards channel. Nothing loads from YouTube until you press play.</figcaption>
</figure>

Confirmed for tonight: Final Fantasy 7 Revelation, Gears of War: E-Day, and a
Witcher 3 expansion called Songs of the Past. Keighley has been trailing
surprises, which is what he does every year, and roughly half the time there is
one.

## The fine print does most of the talking

Every trailer at a show like this carries a legal caption, usually bottom-left,
usually on screen for about four seconds, usually in a typeface chosen to be
technically present rather than readable. That caption is the most honest part
of the whole segment.

"In-engine" means the renderer that ships the game produced these pixels. It
does not mean a player could produce them — an in-engine cinematic can run at
four seconds per frame on a workstation with nothing else in memory, and still
be truthfully labelled in-engine.

"Captured on PlayStation 5" or "captured on PC" is a much stronger claim,
because now there is hardware named. Watch for what comes after it. "Captured on
PC" with no specification is doing a lot of work in the dark.

"Does not represent final gameplay" is the one to take seriously. It usually
means the vertical slice you are watching was built by a strike team to be
looked at, not played, and the thing that ships will be assembled differently.

## Tells that are harder to fake than a caption

Captions can be honest and still leave you with the wrong impression, so I tend
to watch the image itself.

Camera movement is the first thing. Real-time capture has a human on a
controller or a camera rig with some imperfection in it — a slight overshoot
when a pan stops, a correction. Offline renders move on splines. They are too
smooth, and once you notice it you cannot stop noticing it.

Then lighting. A scene with no light leaks anywhere, perfect contact shadows in
every crevice, and bounce light that reads correctly off every surface is
usually not running in sixteen milliseconds. Real-time global illumination has
gotten extraordinary, and it still has a look: slight temporal lag when a light
moves fast, a softness in indirect shadow that offline rendering does not need.

Motion blur is a giveaway in the other direction. Per-object motion blur that
holds up under a fast pan is expensive, and a lot of real-time footage either
skips it or does a cheaper screen-space version that smears in a recognisable
way at silhouette edges.

The last one is the least technical and the most reliable: what is the camera
avoiding? If it never looks at the ground, never turns to face where the
character came from, and cuts every two seconds, somebody is protecting
something. Trailers get edited to hide pop-in the same way a property listing
gets photographed to hide the neighbours.

None of this means a game is lying to you. Everyone builds vertical slices,
including studios that go on to ship exactly what they showed. It means the
footage is an argument, and arguments have authors.

## Why I care, specifically

The gap between the trailer and the shipped game is not usually marketing
dishonesty. It is production reality, and it lands on the environment team.

Somebody built that scene knowing it had to survive a camera move rather than a
player, with a light rig placed for that one angle and a memory budget nobody
was checking. Six months later the same scene has to open on a mid-range GPU
with the player facing a direction the layout never anticipated. That is when
the fog gets thicker, the draw distance comes in, the hero asset loses a texture
set, and the internet decides the game was downgraded.

Some of it is. A lot of it is a scene meeting the constraints it always had.

So when I watch tonight, I am half looking at the reveals like everyone else,
and half doing the thing I cannot switch off — counting light sources, watching
where the camera refuses to go, and trying to guess what somebody had to cut to
make that shot hold together for eleven seconds.

The show is at 20:00. I will probably be wrong about at least one of them.

---

*Times confirmed against the official stream listing on 25 August 2026. The
running order beyond the three announced titles is not public, because that is
the entire business model of a Geoff Keighley show.*
