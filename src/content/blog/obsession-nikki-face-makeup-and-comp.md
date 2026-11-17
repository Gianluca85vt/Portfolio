---
title: "Obsession's Nikki: TikTok makeup, then 2D comp"
date: 2026-11-17
category: Film & TV
excerpt: The face reviewers called a practical effect started as an uncanny-valley TikTok look. Queen's artists then pushed it further in 2D, performance intact.
cover: /img/blog/obsession-nikki-face-makeup-and-comp/shot-03.jpg
sources:
  - outlet: befores & afters
    url: https://beforesandafters.com/2026/11/17/behind-the-tools-and-techniques-used-to-craft-those-subtle-facial-enhancements-in-obsession/
  - outlet: Bloody Disgusting
    url: https://bloody-disgusting.com/movie/3952963/freaky-nikkis-terrifying-look-in-obsession-was-a-practical-effect-inspired-by-a-tiktok-trend/
artistView:
  take: "Nikki's face is a makeup design doing the heavy lifting with a compositing pass finishing it, and the order is what makes it work: the comp follows the take instead of replacing it. Horror has spent a decade reaching for rebuilt CG faces, and the cheaper route here lands somewhere better."
  works:
    - "Makeup: the uncanny-valley design reads at distance and in shadow, which is what lets the film park her in a dark corner of a bedroom and get a scare out of someone standing still."
    - "Compositing: holding the augmentation in 2D keeps the performance on screen, because a tracked warp over a real face carries micro-expression that a rebuilt head has to earn back from scratch."
    - "Shooting plan: cropping her out of frame and dropping her into shadow is a comp-friendly schedule as much as a directing instinct, since less visible face is less to track and less to tear."
  misses:
    - "Coverage: reviewers describe a face kept in shadow or pushed out of frame for much of the run, which protects the effect and rations it — the design carrying the film rarely gets a clean, well-lit look at itself."
---

There is a moment in *Obsession* where Nikki stands in the dark corner of Bear's
bedroom and something about her is wrong. Reviewers kept reporting the same
experience, which is the useful part: you can see that the face is off, and you
cannot name which bit of it moved. The Post Athens called the film a masterclass
in subtlety and put that shot down to special-effects makeup. Most of the write-ups
that noticed it at all said some version of the same thing — practical work,
not the computer.

Half right, as it turns out.

Curry Barker's debut premiered at TIFF's Midnight Madness in 2025, got picked
up by Focus Features with Blumhouse's Jason Blum on as an executive producer,
and opened in US theatres on 15 May 2026 in a little over 2,600 screens. Michael
Johnston plays Bear, the romantic who breaks a novelty charm called the One Wish
Willow and wishes his childhood friend would love him more than anyone alive.
Inde Navarrette plays Nikki, who gets the wish. Six months after release, a
befores & afters interview published today with production visual effects
supervisor Peter Timberlake sets out what his studio, Queen, actually did to her
face — a mix of practical make-up and 2D compositing, built around an in-house
toolset they call Plastik, aimed at what he describes as a deliberate uncanny
valley. The enhancements are, in his words, of the invisible variety: subtle
shifts to the actor's features and nothing more.

## The design came off a phone

<figure>
  <img src="/img/blog/obsession-nikki-face-makeup-and-comp/shot-03.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Inde Navarrette at TIFF 2025, and Curry Barker with Navarrette and Michael Johnston at the Obsession Q&A in Century City on 13 May 2026, via Wikimedia Commons</figcaption>
</figure>

The makeup it was built on has a stranger lineage. Bloody Disgusting reports that
Nikki's look was drawn from an uncanny-valley trick popularised on TikTok by a
beauty creator, Emilia Blarth, around 2023, with key makeup artist Kate Oja
sharing the design images. So the scariest face in a studio horror release
traces back to amateurs working out, on a phone camera and with a shelf of
drugstore products, which small deviations in a human face make a viewer
uneasy.

The makeup department earns more credit for that, not less. Figuring out
*which* deviations is the entire problem, and it is a perceptual question before
it is a technical one. A beauty creator chasing views on a short vertical video
is running the same experiment a facial rig gets run through in a review
session, with a faster feedback loop and a larger sample.

## Why the top-up stayed in 2D

Here is where it gets interesting for anyone who builds faces for a living.

The obvious route for "make this actress look subtly inhuman" is a 3D one: scan
the performer, build the head, solve the performance onto it, render, comp. It
is the route a lot of films take, and it buys you total control. Every
millimetre of the face becomes a parameter you can dial.

It also throws the take away. Once the head is rebuilt, every flicker the actor
did on the day has to be recovered through a solve, and solves lose exactly the
things that make a face read as alive — the asymmetric micro-expressions, the
small timing offsets between one side of the mouth and the other, the eyes
arriving a frame before the brow. On a film where the lead performance is the
engine, and most reviews of *Obsession* agree that Navarrette's is, spending
money to rebuild the thing you hired her for is a poor trade.

A 2D warp keeps her on screen. The cost lands elsewhere, and it is real work:

- Tracking skin that deforms. A face is not a rigid object, so there is no
  single transform to lock to. You are tracking regions that stretch and
  occlude each other.
- Warping without tearing, frame over frame, while the head moves and the light
  on it changes.
- Matching grain, lens softness and the falloff at the edge of the warp, which
  is where invisible work usually stops being invisible.

Do all that well and nobody can point at it. Which is the trap.

## The credit problem

Work this good gets attributed to the makeup chair by default, because makeup is
the explanation a viewer already has available. The comp pass has no visible
signature, so it collects no credit, and for six months the public record of
that shot said "practical effect" with nothing after it.

The blog has watched the same accounting run the other way. When *Clayface*
landed in October, critics [agreed about the prosthetics and split on everything
the computer had to finish](/blog/clayface-review-practical-face-cg-motion/) —
praise to the physical department, blame to the digital one, from the same
screening. Both halves of that habit come from the same place. Makeup is a thing
in the room; compositing is an absence of a seam, and absences do not get
reviewed.

Set it beside the other way this problem gets solved. Danny Boyle's *Ink* put
[an AI Thatcher over a real performer](/blog/ink-ai-thatcher-face-replacement/)
for about thirty seconds — an impersonator played the scene and the face went on
top of her. That approach announces itself, gets argued about, and generates a
week of coverage about what it means. Queen's approach generated none, and did
more for the film.

## The rest of the sheet

Two other things in Timberlake's account are worth a note. The interview
describes a previs approach he calls unusual, which is itself a flag — previs
on a first-time director's horror feature at this budget is not a given, and it
tends to show up where a filmmaker has a specific effect he cannot afford to
discover on the day. And there is a final-scene shot he calls completely
undetectable, which he has now volunteered in public, presumably because nobody
would ever have found it.

I have not seen the breakdown reel, only the interview and the coverage. Judge
the rest when the frames turn up. But the pattern is already clear enough, and
it is the one worth stealing: let the department that can solve the perceptual
problem solve it in front of the lens, then spend the digital budget on four
pixels of nudge rather than a whole new head.
