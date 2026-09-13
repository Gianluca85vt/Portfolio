---
title: "Polyarc closes: what Moss cost to build in VR"
date: 2026-09-13
category: Games
excerpt: Polyarc shut on 11 September with 29 people out. The art discipline Moss was built on was the right answer to a platform that stopped paying for it.
cover: /img/blog/polyarc-closes-moss-vr-native-art/shot-01.jpg
draft: true
---

The closure notice went up on LinkedIn on 12 September, a day after the studio
actually stopped. Attached to it was a Google Doc listing every person who had
been at Polyarc when the lights went out — names, job titles, contact details,
links to portfolios. Twenty-nine of them. A studio spending its last
administrative act on getting its own team hired somewhere else is not a thing
you see often, and it is the detail I keep going back to.

Polyarc was founded in Seattle by three people who came off Destiny at Bungie —
Chris Alderson, Danny Bulla and CEO Tam Armstrong. Most of the write-ups say
twelve years. The founding is usually dated to 2015, which makes eleven. I
cannot reconcile the two and it does not change anything below.

<figure>
  <button class="video-embed" data-video="70UdE94-ASw" data-title="Moss: The Forgotten Relic - Official Gameplay Launch Trailer" type="button">
    <img src="/img/blog/polyarc-closes-moss-vr-native-art/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Moss: The Forgotten Relic launch trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Polyarc's own launch trailer for Moss: The Forgotten Relic, the July 2026 flatscreen edition. A trailer rather than a review — this piece has no score attached.</figcaption>
</figure>

## What Moss actually was

The first one landed on PSVR in 2018. You play a mouse called Quill, except you
do not, quite — Quill is down in the diorama and you are above it, a presence
she can see and occasionally asks for help. The book is open in front of you.
You lean in. Book II followed in 2022 and kept the frame.

That setup reads as a storytelling conceit. It is also, and I suspect first, a
budget decision, and a very good one.

## What VR does to an art pipeline

Start with the frame contract, because everything follows from it. Ninety
frames a second, two eyes, roughly eleven milliseconds to do both. A flatscreen
game that drops frames gets complained about in a Digital Foundry video. A VR
game that drops frames makes the player's inner ear disagree with their eyes,
and they take the headset off and do not put it back on. There is no graceful
degradation. You hold the budget or you lose the person.

Then stereo takes away the toolkit. Nearly every trick real-time art has
accumulated for faking depth is a trick played on one eye:

- Normal-mapped brick reads as a sticker on a flat wall the moment both eyes
  look at it.
- Foliage cards read as cards.
- Parallax occlusion mapping, which is genuinely convincing on a monitor, reads
  as a slightly swimmy painting.
- Screen-space reflections resolve differently per eye, so the reflection sits
  in two places at once.
- Motion blur and heavy depth-of-field, which flatscreen art leans on to hide
  aliasing and pop-in, are actively unpleasant in a headset.

What survives is geometry, silhouette and honest materials. Scale gets strict
too. On a monitor you can quietly scale a prop up fifteen percent because it
reads better in the composition, and nobody will ever know. In VR the player's
own arm is the ruler. A door at the wrong height is immediately a wrong door.

So the diorama. Bound the scene like a model box, fix roughly where the player's
head will be, and suddenly every polygon can go where someone will actually look
— no horizon to render, no streaming, no LOD chain running out to two
kilometres, light you can bake and trust. Moss looks expensive because the
budget was spent in a box eighteen inches across instead of spread over a
landscape.

That is a constraint turned into a house style, which this blog has an
affection for: [Orbitals animating its characters at 12 and 24fps on
purpose](/blog/orbitals-review/) is the same instinct arriving from a different
direction.

## The last move

On 16 July 2026 Polyarc shipped Moss: The Forgotten Relic — both games
reimagined into one, on PS5, Xbox, both Switches and Steam, with Blackbird
Interactive alongside. No headset required. It had gathered more than two
hundred thousand wishlists before launch and did not convert them into the kind
of revenue that keeps twenty-nine people employed.

Take the headset off a VR-native design and the diorama becomes a fixed camera.
Careful, pretty, and competing with everything else on Steam that has a fixed
camera. The leaning in was the mechanic.

## The market underneath

None of this happened to Polyarc alone. Reality Labs lost $19.1 billion across
2025 by Meta's own Q4 filing, against something north of $70 billion since 2020.
In January Meta cut around 1,500 jobs there, roughly a tenth of the division,
and shut first-party VR studios — the reports named Armature, Sanzaru, Twisted
Pixel and Within, though the exact list moved around depending on who was
writing. External funding and publishing support went with it. nDreams, one of
the larger independents, laid off 78 people and closed two locations in March.
Meta's public enthusiasm has moved to smart glasses, where it can point at
Ray-Ban growth of 211% in 2025 rather than a decade of headset subsidy.

A platform holder stepping back from first-party output is survivable. A
platform holder that was also most of the third-party funding stepping back is a
different shape of problem, and it arrives about eighteen months later, which is
roughly now.

There is a version of this week's news that reads as a studio failing. It did
not. Polyarc shipped two well-reviewed games in a category with almost no
audience, then did the sensible commercial thing and ported them out of that
category, and the sums still did not work. It sits next to [Bit Reactor
furloughing most of its staff while its game was in Steam's top
sellers](/blog/bit-reactor-zero-company-furlough/) — two studios doing the work
and two teams out of a job anyway.

Twenty-nine people now on the market know how to hit a hard real-time budget,
model to true scale, and build depth with geometry rather than with texture
tricks. Every one of those habits makes a flatscreen game better. The category
that taught them is the part that is gone.

---

*Closure date, headcount and the staff list from Polyarc's own LinkedIn post
and the Seattle coverage at GeekWire; Forgotten Relic release details from its
Steam page; Reality Labs figures from Meta's Q4 2025 earnings as reported, with
the studio-closure list compiled from Engadget and The Game Business and noted
above where accounts differ.*
