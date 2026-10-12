---
title: "Wing Commander 3: EA found the FMV source tapes"
date: 2026-10-12
category: Games
excerpt: Jim Vessella went looking for Command & Conquer's cutscene masters in 2020 and came back empty. Digitising EA's video archive turned up Wing Commander III's.
cover: /img/blog/wing-commander-3-fmv-source-tapes/shot-01.jpg
sources:
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/sim/it-looks-like-wing-commander-3-is-getting-a-remaster-after-ea-producer-discovers-the-original-fmv-source-tapes-in-the-companys-archives/
  - outlet: Kotaku
    url: https://kotaku.com/ea-producer-announces-wing-commander-3-remaster-at-portland-retro-gaming-expo-2000744166
artistView:
  take: "A remaster made from the camera original and a remaster made from a compressed copy are two different jobs, and only one of them is restoration. Going back to the tape means the detail is already recorded rather than guessed, which is the part no upscaler has ever been able to fake."
  works:
    - "Pipeline: shipping the source transfer alongside the upscale, as the expo slide lists, is the right call — it leaves the unretouched scan on the disc for anyone who wants it and for whoever remasters this again in twenty years."
    - "Preservation: the find is worth more than the re-release. Two hours of live-action footage at its mastered quality is a record of how studios shot FMV in 1994, which the 320x240 version on the original discs is not."
  misses:
    - "Expectations: the masters are standard definition, so the ceiling here is clean 480-line footage and not HD. Any marketing that implies otherwise will be selling an upscale with better input."
draft: true
---

In 2020, when EA put the Command & Conquer Remastered Collection together,
producer Jim Vessella went looking for the source of those live-action
cutscenes. He did not find it. The team ended up working from low-quality
archival copies, running each scene through an AI upscaler and interpolating
the result to 30 frames a second — the coverage at the time disagreed about
whether some of it came off the higher-bitrate PlayStation discs, and that
disagreement has never really been settled. The unit art got better treatment:
Lemon Sky Studios redrew it rather than enlarging it.

Six years later the same producer has been digitising EA's video archive, and
this time the tapes were there. Around six hundred of them turned up in the
process, which is the figure doing the rounds, though nothing in the reporting
pins down how many of those carry **Wing Commander III: Heart of the Tiger**.
Enough of them, apparently, to build a remaster around.

Nobody at EA has announced it. What exists is a slide from Vessella's talk at
the Portland Retro Gaming Expo, photographed and posted to Bluesky by Video
Game History Foundation board member Steve Lin, listing source and upscaled
versions of the FMVs, 60fps, controller support and Kilrathi Saga integration.
Treat the shape of the thing as firm and the details as a slide.

## What shipped in 1994, and what was behind it

Wing Commander III came out in December 1994 with more than two hours of
live-action video in it — Mark Hamill flying the missions, Malcolm McDowell
and John Rhys-Davies around him. It was the kind of production CD-ROM had
just made possible, and the discs are also where it got destroyed. Per PC
Gamer, that footage was squeezed down to 320x240 and compressed in Origin's
own Xanmovie format to fit.

320x240. A player window the size of a large app icon, at a bitrate chosen so
four hundred megabytes of disc could hold a film.

So the gap between the tape and the shipped game here is enormous, and it is a
gap in the direction that matters. An upscaler fed the 1994 video has to invent
the eyelashes, the fabric weave, the edges of McDowell's uniform, because none
of that survived the encode. It guesses, plausibly, and a plausible guess is
still a guess. A master has that detail recorded. You transfer it once and you
have it.

## The ceiling is still the ceiling

Here is where the enthusiasm needs a brake. Those tapes are standard
definition. A 1994 production of this scale would have been shot and mastered
on professional video rather than film, and the best of that era resolves to
something in the region of 480 lines — clean, properly colour-sampled, vastly
better than what shipped, and nowhere near HD.

This is the same wall that [a 4K scan of Ninja Scroll's 35mm negative runs
into](/blog/ninja-scroll-4k-restoration-cel-scan/) from the other side. There,
the resolution was available and the artwork was the limit. Here the artwork is
fine and the recording medium is the limit. Either way the honest version of
"remastered" is *everything the source holds*, which is a real and
worthwhile thing to ship, and not the same promise as a number with a K after
it.

Which makes the slide's two-version approach the right one. Put the straight
transfer on the disc and put the upscale next to it, let people choose, and
leave the unretouched scan sitting there for whoever does this again in 2046.

## Someone has to play the tapes

The part I keep thinking about is the machine.

Reporting hasn't said what format the six hundred tapes are, and that detail
decides how much of this is a pipeline problem. Whatever they are, they need a
deck that still runs, heads that still track, and a capture chain on the other
end — and the professional video formats of 1994 are now maintained by a small
number of specialists and a smaller number of working transports. Spares come
from other dead machines.

Archives have been losing this race for years, which is the thing [LTO-10
dropping backwards compatibility](/blog/lto-10-cannot-read-lto-9-tapes/) made
concrete for anyone running a render farm: the tape in the box is only an
archive for as long as something can read it. The difference is that LTO is a
format with a roadmap and a vendor, and a Betacam-class master from an
Origin Systems shoot is a physical object with a clock on it. Oxide sheds.
Binders go sticky. The window for a clean transfer closes whether or not
anyone is paying attention.

Vessella's digitisation project is that transfer happening while it still can,
and the remaster is a by-product of it. Six hundred tapes going to files is
worth more to the historical record than the re-release ever will be, and it
only looks like a games story because a games company happened to own the
shelf.

<figure>
  <img src="/img/blog/wing-commander-3-fmv-source-tapes/shot-02.jpg" loading="lazy" width="1200" height="800" alt="A Sony Betacam SP deck with a stack of Betacam cassettes beside it" />
  <figcaption>Professional video tape and a deck of the era, for illustration — EA has not said what format its Wing Commander III masters are on. Photos via Wikimedia Commons.</figcaption>
</figure>

One more thing worth saying about the 2020 job. The C&C remaster took the
criticism it got for those soft, interpolated cutscenes, and most of that
criticism was aimed at a team who had already looked for the originals and
failed to find them. The lesson EA seems to have drawn is to go and digitise
the whole archive rather than go hunting per project. That is the correct
lesson, and it is cheap compared to the alternative, which is finding out in
2040 what the shelf used to hold.
