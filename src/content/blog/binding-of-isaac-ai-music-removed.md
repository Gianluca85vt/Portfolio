---
title: Binding of Isaac pulls AI music from GTA 6 mode
date: 2026-11-24
category: AI
excerpt: Nicalis shipped a GTA 6 parody mode into Repentance+ on launch day. Players named its soundtrack as generated over the weekend, and it is already gone.
cover: /img/blog/binding-of-isaac-ai-music-removed/shot-01.jpg
sources:
  - outlet: Rock Paper Shotgun
    url: https://www.rockpapershotgun.com/undisclosed-ai-generated-music-pulled-from-the-binding-of-isaac-repentance-update-as-attempt-to-get-satirical-on-gta-6-launch-day-goes-awry
  - outlet: GamesIndustry.biz
    url: https://www.gamesindustry.biz/nicalis-removes-ai-generated-music-from-the-binding-of-isaac-repentance-after-player-backlash
  - outlet: 80.lv
    url: https://80.lv/articles/nicalis-removed-ai-music-from-the-binding-of-isaac-repentance-after-users-noticed-it/
artistView:
  take: "This mode was built to hit a date rather than a standard, and audio is the discipline a date eats first, because to anyone not wearing headphones a placeholder and a deliverable sound identical. Shipping a finished stereo master also costs the mix: nothing inside it can be ducked under a sting or thinned out for a quiet room, so you buy a week and give up the ability to direct the sound for the life of the build."
draft: true
---

Isaac players argue about the soundtrack. They have been doing it since 2014, when
Rebirth shipped with a new score by Ridiculon — Matthias Bossi and Jon Evans — in
place of Danny Baranowsky's music from the 2011 original. Years of threads about it.
People who will tell you which floor theme they prefer and why, at length. Ridiculon
stayed through Afterbirth, Afterbirth+ and Repentance in 2021, and the argument
eventually settled into something close to affection.

So a free update that drops new music into this game is landing in front of an
audience with a trained ear for exactly that.

Nicalis put one out on 19 November, GTA 6's launch day: a Grand Theft Auto parody
daily run for The Binding of Isaac: Repentance+, cops and guns and a soundtrack of its
own, named Grand Terry Auto. Players flagged the new tracks as AI-generated. Steam
reviews turned negative. By Monday 23 November the publisher had announced what Rock
Paper Shotgun quotes as the "removal of generated music files".

Four days, start to finish.

## Audio is the asset nobody looks at

<figure>
  <img src="/img/blog/binding-of-isaac-ai-music-removed/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Nicalis, via the official The Binding of Isaac: Repentance+ Steam page</figcaption>
</figure>

A prop crosses several desks before it reaches a retail build. Reference, a modeller,
a tech-art check on the UVs and the texel budget, art direction signing off the
silhouette, a lighting pass that discovers it was never meant to be seen from that
angle. Ten people have had it on screen by the time it ships.

A music file goes from a folder into the build.

That gap is not anybody's conspiracy. It is where the review gates happened to get
built. Visual pipelines grew checkpoints because visual mistakes are cheap to spot and
expensive to leave in — a z-fighting wall reads as wrong to the producer walking past
your monitor, and you will hear about it before lunch. Audio gets checked by one
person in headphones, usually late, and when the schedule tightens the bar it clears
is "does it play". That is why generated assets keep surfacing in audio first, and why
I would bet on audio again next time.

The visual gates are not airtight either, to be fair to them. Pearl Abyss shipped
generated 2D props in Crimson Desert in March, apologised for it, and in November
[described AI running through its entire development pipeline](/blog/pearl-abyss-ai-pipeline-dokev-2028/)
anyway. Paintings on walls got past a whole art department. The difference is that
somebody can walk the level and find them.

## What players were hearing

I have not heard these tracks. They were pulled before I got to them, which leaves me
with what players described and with what is generally true of generated audio, so
treat the specifics as the second of those rather than a transcript of the first.

Generated music arrives as a finished stereo master. That one fact causes most of the
tells.

**Loop seams.** Isaac keeps a track running for as long as you are on a floor, which
means the loop point is load-bearing — a composer writing for this game writes the
seam first and builds the phrase around it. A generated bounce comes with an intro and
a tail instead, and when a tool wraps it into a loop you hear the gear change. Once a
listener has noticed one, they cannot stop noticing it.

**No stems.** A master has no separable drums, bass or lead. Nothing can be ducked
under a boss sting, nothing can be thinned out in a quiet room, and the mix cannot be
touched again without going back to a prompt and re-rolling the whole cue. For a game
that swaps tracks per floor and per boss, that is a real loss of control.

**Even loudness.** Generated output tends to come out of the oven loud and flat,
compressed into a narrow dynamic range. Put it next to a human master in the same
playlist and the dynamics give it away before the melody does.

And the writing circles. A bed that keeps approaching a motif and never commits to one
is the thing people mean when they say a track sounds like nothing.

## Nobody commissions a composer for a joke

The mode is a gag. A daily run, a nod to the biggest launch of the year, content with
a short shelf life, built to be live while the joke was still current. That is exactly
the category where standards get relaxed, because the reasoning is always available:
it's temporary, it's a bit, who is going to score a week-long parody.

Which is why it is the useful place to look. A standard that only covers the work a
studio is proud of is a marketing position. The policy is whatever happens to the
throwaway content on a deadline.

Nothing in the update said where the music came from, and the statement as reported
does not name a tool either. The word doing the work in it is "generated", which
concedes the point without filling in any of it. Disclosure keeps getting built and then
filed where nobody trips over it. ArtStation now makes uploaders declare generative AI
use and then
[keeps the declared work out of browse unless a viewer asks for it](/blog/artstation-ai-declarations-hidden-by-default/),
so the label exists and the default is to not see it. A line in a patch note would work the
same way: present, and present only after you have already downloaded the thing.

A library licence for four loops costs less than a week of negative Steam reviews.
Steam reviews are also the part of this that does not get patched out: the files are
gone, the score stays on the page.
