---
title: "Orbitals review: an 8, and 12fps on purpose"
date: 2026-09-04
category: Games
cover: /img/blog/orbitals-review/shot-01.jpg
excerpt: Ten verdicts average 8 and run from 6 to 9.5, a three-and-a-half point spread. The characters animate at 12 and 24fps on purpose.
reviewOf: Orbitals
score: 8
scoreSources:
  - outlet: CGMagazine
    score: 9.5
  - outlet: Nintendo Life
    score: 9
  - outlet: Screen Rant
    score: 9
  - outlet: Noisy Pixel
    score: 8.5
  - outlet: DualShockers
    score: 8
  - outlet: GameReactor
    score: 8
  - outlet: Respec
    score: 8
  - outlet: Game Informer
    score: 7
  - outlet: Cubed3
    score: 7
  - outlet: Eurogamer
    score: 6
---

Shapefarm's co-op puzzle adventure landed on Switch 2 on 3 September 2026,
published by Kepler Interactive, and the scores came in split. Across the ten
scored verdicts I could verify as of 4 September, the arithmetic mean is
**8**. The range runs from 6 to 9.5. That is three and a half points of daylight
on a ten-point scale, which is a lot. Metacritic has the game at 81, OpenCritic
at 83.

A gap that size usually means the reviewers were answering two different
questions.

## Two questions, two scores

The low end is scoring originality. Orbitals is a two-player, always-split-screen
adventure about a pair of astronauts working separate halves of the same
problem. Hazelight has been building that shape for a decade — It Takes Two,
then Split Fiction. Kotaku's write-up put "derivative" in the
headline. Game Informer's was titled *Space For Improvement*. Eurogamer's three
stars, the lowest number in the set, comes with the complaint that the second
half stops introducing ideas and starts repeating them.

The high end is scoring execution. Nine and above from Nintendo Life, Screen
Rant and CGMagazine, and the reasons are art direction, level design, and puzzles
that genuinely need two people talking rather than two people pressing buttons.
Both readings are defensible and neither is wrong, which is why averaging them
into an 8 is the honest answer and also the least interesting sentence in this
piece.

## The split screen never turns off

<figure>
  <img src="/img/blog/orbitals-review/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Nintendo, from the official Orbitals Creator's Voice video</figcaption>
</figure>

Here is the decision I would want to ask Shapefarm about. The screen is divided
the whole time — local couch co-op, or online through the Switch 2's GameShare,
and either way you are looking at both halves. Several reviewers point out the
design consequence: you can see the wall your partner is stuck behind, which
makes it very hard to stop yourself telling them how to solve it.

The rendering consequence is the one that interests me more. Two viewports means
two cameras, and two cameras means the scene gets submitted twice per frame.
What that costs is widely misunderstood. Pixels stay roughly flat — each viewport
is half the screen, so you are shading about the same number of fragments as one
full-screen view. What roughly doubles is everything upstream of the pixels:
culling, draw calls, skinning, and any shadow or reflection pass that has to be
rendered per view. On a handheld-class part that CPU-side doubling is the thing
that kills you, long before fill rate does.

So a game built this way is built backwards from that constraint. Low unique
draw-call counts. Aggressive instancing. Static geometry that can be culled once
and shared between both views. Lighting baked or cheap enough that running it
twice is not a decision.

And then the art direction has to survive being viewed at half width. A detailed
physically-based look falls apart at that size — the material response you paid
for stops being legible and you are left with noise. Flat, high-contrast,
graphic shading holds up. The 80s-anime style everyone is praising is also the
style that reads in a small window, and I would bet those two facts are not
independent.

## Animating on twos, in real time

The other thing worth stopping on: reviewers report that the characters animate
at 12 and 24 frames per second while the game itself runs smoothly. That is a
style choice, and a very old one.

Hand-drawn Japanese animation has always been shot this way. A 24fps base, most
action held for two frames — "on twos", so twelve drawings a second — key beats
punched through on ones, quiet held poses stretched to fours. Limited animation
started as a budget measure and turned into a grammar. The snap you associate
with 80s TV anime is that grammar.

Doing it in a real-time 3D engine is a different job. You sample the skeleton at
a fixed low rate and hold the pose, which means switching off the interpolation
the animation system exists to provide. The trouble starts with everything that
is not keyframed. Cloth solvers, hair, IK foot placement and physics props all
want to run at display rate, so if you step the skeleton and leave those alone
you get a character whose body snaps while their ponytail glides — the single
ugliest failure in the whole technique. Step them too and you have to make sure
the stepping is phase-locked, or the hair lands on a different frame from the
head it is attached to.

Then you decide what stays smooth. Camera moves, environment motion and UI
almost always do, because a world that steps along with the characters stops
reading as style and starts reading as a bad frame rate. Arc System Works worked
all of this out for Guilty Gear Xrd more than a decade ago: stepped character
animation, sixty frames a second on the screen. Getting the same effect on
Switch 2 hardware, with two viewports live, is a harder version of that problem.

The cutscenes come from Studio Massket, and Nintendo's own listing has full voice
acting in English, Japanese and six other languages. For a two-player game that
mostly happens in split halves, spending on cinematics is a choice worth noting.

<figure>
  <button class="video-embed" data-video="wRg2FsqxTb4" data-title="Orbitals Nintendo Switch 2 Review &amp; Performance Analysis!" type="button">
    <img src="/img/blog/orbitals-review/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a video review and performance analysis of Orbitals on Switch 2" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A video review and performance analysis of the Switch 2 build, useful for seeing the stepped animation running against a smooth camera. Its verdict is not counted in the average above.</figcaption>
</figure>

## The number

**8**, from ten scores between 6 and 9.5, collected on 4 September 2026.

Treat that mean with more suspicion than usual. An average is a reasonable
summary when the verdicts cluster and a poor one when they do not, and a
three-and-a-half point spread is not a cluster. What the numbers are telling you
is that this game is very well made and not very new, and where you land depends
entirely on which of those two you were shopping for.

---

*Scores collected on 4 September 2026 from the outlets' own pages and published
round-ups, converted to a 1-10 scale and averaged. Eurogamer's three stars
converts to 6, DualShockers' 80 to 8. The Metacritic and OpenCritic figures at
the top are those sites' own aggregates, not part of the average.*
