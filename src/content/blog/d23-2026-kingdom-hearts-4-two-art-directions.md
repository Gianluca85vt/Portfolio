---
title: Kingdom Hearts 4 showed its first Disney world at D23, and set itself a hard problem
date: 2026-08-16
category: Games
cover: /img/blog/d23-2026-kingdom-hearts-4-two-art-directions/shot-03.jpg
excerpt: Four minutes of Coco, Donald and Goofy playable for the first time, and a release window Square Enix put a number on.
---

D23 is on in Anaheim as I write this — it runs **14 to 16 August** — and the
Deep Dive into Kingdom Hearts panel on the 15th finally gave **Kingdom Hearts
IV** something it has been missing since the announcement: a Disney world, and a
date.

Here is what was shown, and then the part I actually want to talk about.

## What they announced

**Coco is the first confirmed Disney world.** The panel ran an extended
four-minute trailer set in the Land of the Dead, considerably more than had been
seen before. Sora gets a Coco-themed Keyblade for it, and Benjamin Bratt is back
as Ernesto de la Cruz.

**Donald and Goofy are playable.** For the first time in a mainline Kingdom
Hearts, you control them directly rather than watching Donald forget to heal
you. Mickey gets playable segments too, and both Donald and Goofy have their own
Coco-world designs.

**Late 2027, and they committed to it.** Co-director Tai Yasue put it about as
plainly as a developer ever does — not eighty percent, not ninety, a hundred.
That is a striking thing to say out loud for a game announced in 2022, and it
either ages very well or very badly. Platforms are PS5, Xbox Series, Switch 2
and PC.

**Riku turns up in Quadratum** to help Sora, and Tetsuya Nomura said
**Maleficent will play a key role**, despite not appearing in any footage yet.
Nomura also mentioned the game does something that was considered back during
Kingdom Hearts III and could not be done then — he did not say what, which is
very much the house style.

**There is an anime.** An original Kingdom Hearts series is in development for
Disney+ and Disney Channel, telling a new story inside the same universe, with
Nomura involved.

And in the bit that got the room: **Haley Joel Osment and David Gallagher**, Sora
and Riku in English since 2002, recorded a scene together live on stage — the
final scene of Kingdom Hearts II.

## The part I keep thinking about

Kingdom Hearts IV runs on **Unreal Engine 5**, with Nanite and Lumen, and
Quadratum — the Shibuya-like city Sora wakes up in — has been shown as something
close to photoreal. Real signage, real traffic, hard midday sun doing what
midday sun does.

<figure>
  <img src="/img/blog/d23-2026-kingdom-hearts-4-two-art-directions/shot-01.jpg" loading="lazy" width="1440" height="810" alt="Strelitzia in Quadratum, softly lit with shallow depth of field and blurred neon signage behind her" />
  <figcaption>Skin shading with real subsurface response, shallow depth of field, signage bokeh. This is the baseline the Disney worlds now have to sit next to. Screenshot: Square Enix / Disney, from the official Kingdom Hearts IV Steam page.</figcaption>
</figure>

Now put the Land of the Dead next to it.

Coco's world is saturated orange and magenta, lit by marigold petals and paper
lanterns, populated by skeletons whose faces work because they are drawn, not
simulated. It is one of the most deliberately non-photoreal things Pixar has
made.

Those two have to be the same game. Same renderer, same lighting model, same
character shader stack, with Sora unchanged as he walks between them.

<figure>
  <img src="/img/blog/d23-2026-kingdom-hearts-4-two-art-directions/kh3-comparison.jpg" loading="lazy" width="1440" height="810" alt="A Disney world in Kingdom Hearts III — flat warm lighting, simplified storybook architecture, characters and set built to the same stylised rules" />
  <figcaption>Kingdom Hearts III, for comparison: everything stylised to the same degree, so nothing clashes. Screenshot: Square Enix / Disney, from the official Kingdom Hearts III Steam page.</figcaption>
</figure>

Kingdom Hearts III solved this by not really having the problem. Everything was
stylised, so a Pixar world and a Disney world and Sora all sat inside one
consistent, slightly plasticky look. Move the baseline to photoreal and that
compromise stops working, because now the stylised world is the outlier rather
than the norm.

There is no clean answer to this. The approaches I would expect, in rough order
of how much work they are:

- **Per-world lighting rigs.** Lumen does the physically correct thing, so you
  fight it with exposure curves, artificial fill and colour grading tuned per
  world. Cheap, and it looks cheap if that is all you do.
- **Per-world shading.** A different character shader in Coco — flatter diffuse
  response, clamped speculars, a hand-authored ramp instead of a physically
  based one. Expensive, and it means two sets of materials to maintain for every
  character who travels.
- **Sora as the constant.** Keep his shading fixed and let the worlds move
  around him, so the player's anchor never shifts. This is what I would bet on,
  and it puts the burden on environment art rather than character art.

The reason this matters beyond Kingdom Hearts: **this is the problem every
licensed crossover game now has.** Photoreal rendering became the default, and
the properties worth licensing mostly are not photoreal. Whoever works out how
to hold two art directions in one frame without either looking wrong is going to
be copied for a decade.

## What I would watch for

Trailers are graded shot by shot and tell you nothing about what holds up in
motion under player-controlled cameras.

Watch instead for the first **uncut gameplay** in Coco, and specifically the
transitions — the moment Sora arrives, the moment a cutscene hands back control.
That is where a per-world lighting trick shows its seams, because the grade has
to change and there is nowhere to hide the change.

And watch **Donald and Goofy**, for a duller reason. Making them playable is not
a small feature. It means full move sets, full animation coverage, camera work
and readability for three body shapes instead of one, in worlds where they also
get redesigned. Announcing that alongside a hard release date is confident. Late
2027 is eighteen months away.

---

*Details from the Deep Dive into Kingdom Hearts panel, D23, 15 August 2026, as
reported by the outlets covering it. The engine and rendering points are from
Square Enix's earlier statements about the move to Unreal Engine 5; nothing at
the panel changed them.*
