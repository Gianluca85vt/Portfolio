---
title: "The Divine Comedy game: Dante fights by writing"
date: 2026-11-09
category: Games
excerpt: "I'm making The Divine Comedy, a souls-like in Unreal Engine 5.8 where every attack is a verse Dante writes. First devlog: from blockout to Minos."
cover: /img/blog/the-divine-comedy-game-dante-fights-by-writing/cover.jpg
sources:
  - outlet: Devlog 1 on YouTube
    url: https://www.youtube.com/watch?v=BETf6uSTv50
  - outlet: The Divine Comedy, official site
    url: https://www.gianlucascattarella.it/thedivinecomedy/
draft: true
---

This one is mine, so that goes first: everything below is about a game I'm
making, and you should read it as a developer talking about his own work.

It's called The Divine Comedy. It's a souls-like for PC, built in Unreal
Engine 5.8, that follows Dante from the dark wood down into Hell, and the idea
it hangs on fits in a sentence. Dante fights with a quill and his Book: every
attack is a verse he writes, and the letters tear off the page and hit whatever
is in front of him.

The first devlog went up on 2 November. It runs under two minutes, it's built
as a before and after, and here's what's in it.

<figure>
  <button class="video-embed" data-video="BETf6uSTv50" data-title="I’m Turning Dante’s Inferno into a Dark Fantasy Action-RPG (UE 5.8 Devlog)" type="button">
    <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Devlog 1 thumbnail: Dante in his red hood and laurel crown beside the title La Divina Commedia" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Devlog 1, on my YouTube channel: from the first blockout to the fight with Minos.</figcaption>
</figure>

## Combat written in verse

Combos are lines of poetry. Spells cost Inspiration, and landed hits give it
back, so the game pays you for staying in the fight and writing.

The names come from the poem too. The two spells on the HUD in the devlog are
Fiamma antica and Veltro: the old flame Dante feels when he sees Beatrice again
at the top of Purgatory, and the greyhound prophesied in the first canto of
Inferno.

<figure>
  <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/shot-03.jpg" loading="lazy" width="960" height="720" alt="A hand with a white quill writing 'la fiamma antica' across the open pages of Dante's Book" />
  <figcaption>The verse is written before it is thrown.</figcaption>
</figure>

Around the verses sits a familiar core: deliberate fights, stamina, parries,
and Souls you drop when you die and have to walk back for. That familiarity
does a job. The new thing is what comes out of Dante's hand, and someone
learning a new kind of attack still knows how a dodge works.

At one minute into the devlog you can see it in a sandstone corridor: Dante
raises the Book and "Nel mezzo del cammin" peels off the page and flies down
the corridor.

<figure>
  <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/shot-04.jpg" loading="lazy" width="1440" height="810" alt="Dante holding his Book out in a sandstone corridor as the letters of a verse fly off it down the corridor" />
  <figcaption>The opening line of the poem, used as a weapon. From the devlog.</figcaption>
</figure>

## From grey mannequins to the gate

The devlog opens on the prototype. Dante is a red figure in a fog test, Virgil
is a pale placeholder, the arena is a grey box, and Minos is a dark mannequin
with a tail made of spheres. That stage exists to answer one question cheaply:
is the fight any good, before anyone spends a week modelling a tail?

<figure>
  <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/shot-01.jpg" loading="lazy" width="1608" height="450" alt="Two frames side by side: on the left Dante and a pale placeholder Virgil in a flat grey fog, on the right Dante and Virgil before the Gate of Hell under a hanging inscription" />
  <figcaption>Dante and Virgil in the prototype, and at the Gate of Hell in the vertical slice. Both from the devlog.</figcaption>
</figure>

Then the vertical slice, which the main menu calls "la Selva Oscura e il
Giudice": the dark wood and the judge. The wood is cold and dark, the fog eats
the distance, and you get through it by not being seen. One of Dante's lines in
the devlog has him leave the path and climb through the brambles before
something spots him. Virgil comes out of the fog as the beasts close in.

<figure>
  <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/shot-02.jpg" loading="lazy" width="1600" height="900" alt="Dante in his red hood at the edge of a cliff in grey fog, crows wheeling overhead" />
  <figcaption>The edge of the dark wood, in the vertical slice.</figcaption>
</figure>

At the end of the wood the Gate of Hell is a door in a huge dead tree, with the
inscription from Canto III hanging in the air above it. Putting the two frames
side by side, the models are the obvious change; the one I'd point to as an
environment artist is the lighting. The prototype is lit like a fog test, flat and evenly
grey. The slice keeps the forest behind the gate cold, puts warm light under
the door, and makes the inscription the brightest thing on screen, so the eye
reads the words first.

Past the gate the slice goes underground: the sandstone corridor, a chamber
where pale souls drift through the mist, and the damned marching in single file
along a spine of rock over the dark.

<figure>
  <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/shot-05.jpg" loading="lazy" width="1440" height="810" alt="A long line of pale naked figures walking in single file along a narrow ridge of rock above a red-lit void" />
  <figcaption>The march of the damned. From the devlog.</figcaption>
</figure>

## Minos, the judge

The slice ends on Minos. In Canto V he sentences each soul by wrapping his
tail around himself as many times as the circle it's bound for. In the devlog
the boss bar reads "Il Giudizio: 2", and Minos tells Dante that the chains of
the second circle will hold him the way they hold the others. The tail of
spheres from the prototype is gone: he's half man and half serpent now.

<figure>
  <img src="/img/blog/the-divine-comedy-game-dante-fights-by-writing/shot-06.jpg" loading="lazy" width="1600" height="900" alt="Minos, a horned red-skinned figure with a cape and a bone necklace, lit from the side against a dark background" />
  <figcaption>Minos, from the game's site.</figcaption>
</figure>

## The weight of a soul

Every choice makes Dante's soul lighter or heavier. The judges of the dead read
it, and the fights change with it. Minos is the first of those judges Dante
meets.

Places, guardians and verses come from the Commedia. Dialogue is in Italian and
English, and the verses quoted in the game are the Italian text and Henry
Wadsworth Longfellow's translation, both in the public domain.

## Inferno first

The game follows the whole poem. Inferno comes first, from the dark wood to the
frozen lake of Cocytus; Purgatorio and Paradiso come after.

The game has its own site with
[a 3D map of the nine circles](/thedivinecomedy/), one card for each sin. A
devlog post goes up every few days on Instagram at
[@thedivinecomedy_game](https://www.instagram.com/thedivinecomedy_game/), and a
Steam page is on the way. This is the first of them, and the next ones will be
here too.
