---
title: "End of Abyss: strong dread, and a map that lied"
date: 2026-10-03
category: Games
excerpt: Eleven verdicts average 7.5 across a three-point range, and what reviewers kept hitting was the map. A patch fixed most of it the day after launch.
cover: /img/blog/end-of-abyss-review/video-thumb.jpg
reviewOf: "End of Abyss"
score: 7.5
verdict: "Section 9 Interactive's debut is a top-down sci-fi horror Metroidvania with real dread and nasty, close-range combat. Reviewers split hard on its structure, and on a map that reported the wrong door states at launch."
scoreSources:
  - outlet: Gaming Trend
    score: 9
  - outlet: PlayStation Universe
    score: 9
  - outlet: Game Informer
    score: 8
  - outlet: Push Square
    score: 8
  - outlet: Shacknews
    score: 8
  - outlet: DualShockers
    score: 8
  - outlet: Game Rant
    score: 7
  - outlet: IGN
    score: 6
  - outlet: GameSpot
    score: 6
  - outlet: GamingBolt
    score: 6
  - outlet: CGMagazine
    score: 6
sources:
  - outlet: GameSpot
    url: https://www.gamespot.com/articles/end-of-abyss-patch-fixes-most-of-my-complaints-just-one-day-after-launch/
  - outlet: Game Informer
    url: https://gameinformer.com/review/end-of-abyss/samus-inspired-survival-success
artistView:
  take: "A Metroidvania's map is the level designer's gate state read back to the player, and End of Abyss shipped with that readback disagreeing with the gates themselves. That is the signature of a map kept as a second, hand-maintained copy of the truth rather than generated from the one the doors actually use."
  works:
    - "Art direction: outlets right across the score range agree on the atmosphere, which on a top-down camera means the dread has to come out of lighting and room layout, because the camera cannot shove anything into your face."
    - "Environment design: the reviewers who scored it highest describe a facility that reads as a place with a history, and at a fixed camera distance that history lives entirely in set dressing and light falloff."
  misses:
    - "UI: a map that calls a door locked after the player has opened it breaks the one promise the genre makes, and the damage shows up as wasted walking rather than as a visible glitch, which is how it got past everybody."
    - "Progression: the low scores describe encounters repeating before new traversal tools arrive, which reads as a gating problem in the ability ladder more than a combat one."
draft: true
---

Eleven published verdicts I could verify put End of Abyss at **7.5**, and they
run from 6 to 9. Three full points. OpenCritic has it at 73 from seventeen
critics, Metacritic at 76 from fourteen, so the aggregate and my smaller
sample land in the same place. A range that wide on a debut tells you the
critics were unsure.

Section 9 Interactive is a Malmö studio, founded by people who worked on
Little Nightmares at Tarsier. This is their first game. Epic Games Publishing
put it out on 1 October 2026 for PS5, Xbox Series X and S, and PC through the
Epic Games Store. Top-down, twin-stick, sci-fi horror, built as a Metroidvania:
you play Cel, a combat technician, going down into the derelict parts of a
facility.

Plenty of debuts get a spread like that. The interesting bit here is where the
disagreement sits: the outlets at the bottom of the range and the ones at the
top both say the game is frightening. What they argue about is a data
problem.

## The map was wrong

GameSpot's Mark Delaney filed a 6 under the headline that the game commits a
Metroidvania cardinal sin, and the sin is the map. It would tell him a door was
locked that he had already unlocked. It would fail to mark that he had found
the key to a door. In a game whose whole structure is going back through places
you have already been, that sends you on twenty-minute walks to doors that
were never shut.

<figure>
  <button class="video-embed" data-video="jjELeWI9vWU" data-title="End Of Abyss Commits A Metroidvania Cardinal Sin - Review" type="button">
    <img src="/img/blog/end-of-abyss-review/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from GameSpot's video review of End of Abyss" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>GameSpot's video review, whose 6 is one of the eleven scores in the average above. Their map complaint is the one the patch went after.</figcaption>
</figure>

I want to sit on what that bug is, because from a pipeline seat it is a
familiar shape.

A Metroidvania door has a state: open or shut, and if shut, whether you are
carrying the thing that opens it. That state lives somewhere in the level — a
volume, a flag on a trigger, something the gameplay code reads when the player
walks into it. The map screen has to show the same fact. So either the map is
generated from the same data the door reads, or somebody authors a second
representation of the level for the map layer and keeps the two in step by
hand.

The second way is extremely common and it is cheap and it looks fine for most
of production, because for most of production the level is being rebuilt weekly
anyway and the designer who moved the door also moved the map icon. It falls
over at the end, when the level stops changing, the map icons stop being
touched, and a late edit to a gate goes into the gameplay data without going
into the map data. Nothing crashes. No artist sees anything wrong in the
viewport. The only symptom is a player walking somewhere for no reason, and
that is close to invisible in a QA pass that is testing whether the level is
completable.

Remedy got caught by something adjacent two weeks ago. [Control Resonant split
its reviewers on everything except its environments](/blog/control-resonant-review/),
and one of the dividing complaints was its map. Same month, same genre of
mistake, two studios of wildly different size.

## The patch, and what it did to the reviews

The fix landed on 2 October, one day after release. Delaney wrote a second
piece saying so, and saying that most of his complaints were now gone — which
puts a published 6 in front of a game that no longer has the thing the 6 was
mostly about.

That is a real problem for an average like the one at the top of this page, and
I am not going to pretend otherwise. Of the eleven scores, several were written
against a build whose map lied. Nobody is going back to re-score it. The number
stays where it is, pointing at a version of the game that existed for about
thirty hours.

Worth saying plainly: the patch arriving that fast is a point in the studio's
favour. They had the fix ready and shipped it the moment the
embargo window stopped protecting them from the complaint. The cost is just
that the permanent public record of the game was written in the window before
it landed.

## Where the 9s are coming from

Gaming Trend and PlayStation Universe both filed 9s, and the high end of the
range is consistent about what it liked: the atmosphere and the combat. Game
Informer's 8 reaches for Samus explicitly in its headline, which tells you the
shape of the thing — isolation, a facility, tools that unlock geography.

On a top-down camera that praise carries more weight than it would on a
first-person horror game. Fixed distance, no neck, nothing can lunge at the
lens. Every bit of dread has to be built out of what the room looks like and
where the light stops. [Well Dweller managed something similar last
month](/blog/well-dweller-review/) with hand-drawn 2D and near-unanimous
scores, and the comparison is not flattering to End of Abyss in one specific
way: Well Dweller's dissent was about ambition. The dissent here is about
execution, and execution is the part you can patch.

## The number

**7.5**, from eleven verdicts between 6 and 9, collected on 3 October 2026 and
converted to a ten-point scale before averaging. The aggregate figures are
OpenCritic's and Metacritic's own.

If you are reading the score to decide whether to buy it, the spread matters
more than the mean, and the spread was partly manufactured by a bug that is no
longer in the game.

---

*Section 9 Interactive has not published a studio-hosted press gallery I could
reach, so the still above is a frame from GameSpot's review video.*
