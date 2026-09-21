---
title: "Wolverine's UV bug and the artist's new burden of proof"
date: 2026-09-21
category: Editorial
column: Architectures of the Void — the Monday editorial
cover: /img/blog/editorial/cover.jpg
excerpt: A UV mapping error on a bathroom door got read as generative AI, and a developer's wife got mistaken for text-to-speech. The industry spent a year adopting these tools and built nothing that lets an artist prove the work is theirs.
draft: true
---

I have shipped a broken UV before, and nobody accused me of being a machine.

That is the part that changed. Over the weekend a TikTok of a restroom sign in
**Marvel's Wolverine** — stick figures folded into each other on a door decal —
went past seven hundred thousand views with generative AI attached to it as the
explanation, on a game reported to have cost three hundred million dollars.
Insomniac's community director James Stevenson
[answered in two lines](https://www.eurogamer.net/insomniac-denies-generative-ai-marvels-wolverine-bathroom-sign):
it is a UV map bug, a fix is coming, there are no AI-generated assets in
*Marvel's Wolverine*.

He is telling the truth, and the artefact itself says so.

A UV map is the flattening. You cut a seam down the back of the model so the
texture can lie flat, the way a dress pattern lies flat, and every island of
that layout has an address in the atlas. Let two islands overlap, or let the
atlas repack after somebody re-exported the mesh, and pixels that belong to one
part of the sign land on another. Figures clip into each other. Nothing else in
the frame moves. It is the most ordinary failure in environment art, it has
been happening since the nineties, and it is the reason I knew what I was
looking at within a second of seeing the screenshot. A model gives you a sign
that is confidently wrong everywhere at once. A UV bug gives you a sign that is
perfect except for the one island that moved.

The bug is a human fingerprint. This week it counted for nothing.

## Her first time in front of a mic

Eight days earlier the same accusation landed somewhere with no padding at all.
**Luminary**, an early-access sandbox from Refractive Entertainment, has exactly
one voiced character. A Steam review posted after twenty-four minutes of play
said the awful AI-generated voice killed it, that the game felt off, like an AI
game. The studio replied on its own store page:
[the voice is the creative director's wife](https://www.gamespot.com/articles/indie-dev-says-ai-voice-in-his-game-was-actually-his-wife/),
it was her first time in a booth, and there is no AI anywhere in the game —
they are, in his words, just some indie devs doing their thing with the
resources they have.

Read that back slowly. A woman did an unpaid favour for her husband's game, and
the unfamiliarity in her read — the exact quality that marks out a person who
has never done this before — was filed as evidence of a machine.

The studio had to answer it in public, on the store page, because an
early-access game lives and dies on its Steam percentage and one negative
review on a small page is a real number with money attached.

[[ANEDDOTO: a time something you made was misread from outside — a bug, a
deliberate choice, a limitation of the budget — and you had to stand there
explaining what it really was to somebody who had already decided]]

## Eighty-five point eight

The number that makes both accusations plausible came out of Tokyo in the same
week. CESA's preview report, handed round at Tokyo Game Show, puts generative
AI use among Japanese developers at **85.8%**, up from 51% a year ago. We went
through [the methodology this morning](/blog/cesa-2026-survey-generative-ai-japan):
1,349 respondents behind the headline, fifty member companies behind the task
breakdown, producing visuals sitting sixth at 16%, under paperwork, code
assistance, pitching and localisation.

The survey is careful about what it measured. The headline cannot be, and the
headline is what travels. What 85.8% hands a player is permission — if nearly
nine in ten studios are using it, anything odd on screen is probably it. The
figure does not separate a producer having a schedule mail tidied into business
Japanese from a texture generated into a shipping build, so the reader supplies
the difference, and the reader supplies the worst version of it.

That is the bill, and it is being handed to the people the same survey says are
mostly using the thing for admin. I watch this industry from a country that
receives almost none of the money in it, so most weeks I am reading somebody
else's weather. Suspicion is the one export that costs nothing to ship and
lands everywhere at the same time.

## A camera that needs a fan

Photography saw this coming and started building hardware for it. The CAIM1 —
Counter Artificial Intelligence Machine 1, and that is genuinely the name —
[signs its footage at the moment of capture](https://www.tomshardware.com/pc-components/air-cooling/noctua-fans-prevent-the-caim1-anti-ai-4k-camera-from-throttling-unusual-cameras-processor-gets-toasty-as-it-records-while-performing-cryptographic-calculations):
sensor, security chip, cryptographic proof, written out to storage that someone
who was not present can check. Generating those proofs while recording 4K at
sixty heats the processor enough that the shell needs a 40mm Noctua fan in it
to stop the thing throttling. Noctua's own line for the collaboration: cooling
a camera built to prove reality.

Forty millimetres of moving air, so that a photograph can be established as a
photograph. It is a prototype, first batch aimed at early 2027, and it will not
be cheap.

We have nothing equivalent, and we cannot have it. What comes out of our
pipeline is not a capture of anything. There is no sensor to attest to and no
moment to timestamp — a lightmap bake is a computation, and a photogrammetry
scan gets rebuilt by hand until it has stopped being the scan. Every asset in a shipping game is synthetic in
the plain sense of the word, which is why the question "was a machine involved"
has no clean answer even when the honest answer is no. The only provenance we
own is file history and version control, and nobody outside the studio will
ever be shown it.

What players get instead is a checkbox. Steam has a disclosure field the
publisher fills in about itself. *Marvel's Wolverine* is a PlayStation
exclusive and does not even have that. So the proof offered to seven hundred
thousand people was a community director's word, typed into a reply box on a
Sunday.

## Built by hand, on a schedule nobody funds

The other defence turned up this week as well. CD PROJEKT RED's environment art
director Kacper Niepokólczycki and global art director Jakub Knapik went
through how Night City was assembled: every building, every advert, every piece
of litter placed by a person, at
[twice the texel density of The Witcher 3](/blog/night-city-hand-built-texel-density).
No procedural city generator, because the game is first person and you can put
your nose against any surface in it.

Nobody is ever going to accuse that city of being generated. The density of
small decisions in it reads as intention at every distance, from the skyline
down to a sticker on a vending machine, and that is what authorship looks like
from outside: labour visible in the surface.

It is also a seven-year budget, on a game that nearly killed the studio that
made it.

[[ANEDDOTO: a job where the handcrafted route got cut for time — what the
schedule was, what got swapped in for it (kit, library asset, procedural,
generated), and what it felt like to sign that off]]

So here is the position an environment artist is standing in this September.
The output cannot be attested to. The industry's own headline invites suspicion
of everyone whose name is in the credits. The single defence that reliably
works is more hand labour than current schedules pay for. And making the
accusation costs twenty-four minutes and a screenshot.

## Who carries it

The player who wrote that review is the wrong target for any of this. Somebody
who has spent a year being served generated images in every feed they open has
learned to scan for the tells, and they are doing exactly what the platforms
trained them to do. The tell they learned is wrongness. Wrongness is also what
a person looks like on a deadline, on a first take, on the Friday before a
milestone.

The companies that pushed adoption hardest are the ones that owe a mechanism
here — some way for the people in the credits to point at the work and have the
pointing count for something. What exists so far is a publisher-level checkbox
and a reply from marketing.

Doubt was the cheap thing to build, and it got built first. An industry that
now asks its artists to prove they are human owed them the proof.
