---
title: "Witcher 3's AI Geralt: the actor recorded it all"
date: 2026-11-13
category: AI
excerpt: Jacek Rozenek recorded every new line himself after a 2019 stroke, and a model moved the timbre back to 2015. The clause in the contract is why it holds.
cover: /img/blog/witcher-3-geralt-polish-ai-voice-consent/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/cd-projekt-red-geralt-gen-ai-voice-polish-jacek-rozenek
  - outlet: Game Developer
    url: https://www.gamedeveloper.com/production/polish-voice-actor-for-geralt-returns-for-the-witcher-3-with-ai
  - outlet: PC Gamer
    url: https://www.pcgamer.com/cyberpunk-2077-phantom-liberty-used-ai-to-reproduce-late-polish-voice-actors-performance-as-viktor-vektor-with-the-familys-blessing
artistView:
  take: "This is a retarget, run on a voice instead of a skeleton. The performance stays Rozenek's and the model only moves the timbre back eleven years, and that ordering is what makes it defensible."
  works:
    - "Pipeline: having the actor record every line first keeps authorship where it belongs and leaves a clean human take on disk if the conversion is ever thrown out."
    - "Reference: matching him to his own 2015 recordings rather than a generic Geralt gives the work a continuity target somebody can check."
  misses:
    - "Audio: a model built from the 2014 sessions learned a booth and a mic chain alongside a man, so a 2026 recording converted toward it risks importing the old room. Judged from what has been described, not heard."
    - "Consistency: with only the Polish track converted, Geralt's two biggest dubs are now matched to different reference points."
---

Jacek Rozenek has been the Polish Geralt since 2007. He had a stroke in 2019,
and the voice that came back from it is not the voice sitting on the Witcher 3
master.

CD Projekt Red has now described what it did about that for Songs of the Past,
[the expansion arriving in 2027 on the old engine](/blog/witcher-3-songs-of-the-past-remaster-old-engine/).
Rozenek recorded the new lines himself. All of them. A generative model then
shifted those recordings back toward his own performance in the base game,
work reported as going through Respeecher, the Ukrainian firm CD Projekt has
used before.

<figure>
  <button class="video-embed" data-video="-_3WC47w4dw" data-title="The Witcher 3: Wild Hunt — Songs of the Past World Premiere Trailer" type="button">
    <img src="/img/blog/witcher-3-geralt-polish-ai-voice-consent/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Songs of the Past world premiere trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>CD Projekt Red's premiere trailer for Songs of the Past, in English — the track that needed none of this. The Polish one is the job described below.</figcaption>
</figure>

## The order of operations is the whole thing

An actor performed, then a model converted. Nothing was generated from a
script, and no second performer was hired to stand in.

Anyone who has retargeted a skeleton knows this shape. The curves come off a
human being; what they drive is a different surface. You are not inventing
motion, you are moving an existing performance onto a new target and arguing
about how much the target distorts it. Here the performance is a man in a booth
in 2026 and the target is the same man in 2015.

Compare the case CD Projekt ran in October 2023. Miłogost Reczek, the Polish
Viktor Vektor in Cyberpunk 2077, died in 2021, and for Phantom Liberty the
studio hired a different actor to speak the new lines and converted that
performance into Reczek's voice, with his family's agreement. Technically
adjacent. A different question entirely at the level of who made the acting
choices — in 2023 those belonged to a living stand-in wearing a dead man's
timbre, and this time both the choices and the timbre are Rozenek's, eleven
years apart.

## A continuity problem that predates the tool

Every series that runs a decade hits this. Voices age, actors move on, actors
die, and the dialogue recorded in year eleven sits next to dialogue recorded in
year one whether it matches or not. The industry's existing answers are
recasting and hoping nobody notices, or writing around the character.

Rozenek's stated aim, per the reporting, was for the new voice to come as close
as possible to his voice from twelve years ago. That is a continuity target. It
is not a performance note, and the distinction matters when you are judging the
result: the question is not whether he acts well, it is whether the conversion
leaves his acting intact on the way through.

## What a voice model learns besides a voice

My reservation sits in the training data, and it is a reservation rather than a
finding.

A model built from the Witcher 3 sessions learned two things at once. It learned
Rozenek, and it learned the booth he stood in, the microphone in front of him,
and the processing chain a 2014 Polish localisation pass ran him through.
Conversion toward that reference can drag the room along with the age. If the
new recordings are cleaner — different room, twelve years of better converters,
a different engineer — some of what the model pulls them toward is 2014's signal
path rather than 2014's larynx.

Whether that shows depends on how much of the conversion is timbre transfer and
how much is a broader spectral match, and nobody outside the project can tell
that from a press line. It is the thing I would want to hear before calling the
job clean.

Doug Cockle, meanwhile, records English normally. One language gets a model and
the rest do not, which leaves the two most-played dubs matched to different
reference points. For a player that is invisible. For anyone auditing dialogue
consistency across localisations it is a new row in the spreadsheet.

## The clause travels further than the technique

CD Projekt says its contracts require a performer's consent for AI work, and its
localisation team framed this as a special case tied to Rozenek's health rather
than a general method.

For working performers the transferable part of this story is that sentence
about contracts. Voice conversion is cheap now and getting cheaper, and the
argument over it has mostly been conducted in public statements rather than in
paperwork. A consent clause is the mechanism — it is what makes the difference
between this and the cases that have gone badly, and it is checkable in a way
that a studio's good intentions are not. The same split runs through
[where AI earns a place in a 3D pipeline](/blog/ai-in-a-3d-pipeline/): the
techniques that survive contact with a working studio are the ones with a human
decision upstream of them and a named person accountable for the output.

Two things I could not confirm. The exact wording attributed to CD Projekt about
using AI ethically appears in headlines without a clearly named speaker, so I
have paraphrased rather than quote it. And Respeecher's involvement in this
specific job comes from the trade reporting rather than from a statement by
either company, which is worth knowing if you intend to cite it.
