---
title: "Godzilla Minus Zero shot for IMAX: the VFX cost"
date: 2026-10-30
category: Film & TV
excerpt: Toho's sequel is the first Japanese film shot for IMAX, and Yamazaki says every VFX shot is harder than Minus One's. The near-square frame is why.
cover: /img/blog/godzilla-minus-zero-imax-vfx-crew/video-thumb.jpg
sources:
  - outlet: The Hollywood Reporter
    url: https://www.hollywoodreporter.com/movies/movie-news/godzilla-minus-zero-first-reactions-toho-1236743206/
  - outlet: The Week
    url: https://www.theweek.in/news/entertainment/2026/04/16/godzilla-minus-zero-to-have-bigger-budget-more-complex-vfx-to-be-released-in-imax.amp.html
artistView:
  take: "Minus One got praised for doing a lot with a 35-person team, and almost every account of it reads as a budget story. Shooting the sequel for IMAX makes it a resolution story instead, and resolution is the one axis where a small effects crew cannot trade cleverness for compute."
  works:
    - "Framing: a 1.43:1 frame puts ground and sky in the same shot as the monster, which suits a creature whose whole design language is scale against architecture."
    - "Continuity: keeping Shirogumi on the sequel means the Godzilla asset, the rigging and the water and debris setups carry over, and nobody rebuilds a dorsal fin from a reference board."
  misses:
    - "Simulation: destruction and water do not get cheaper with a bigger grant. Sim resolution is where an IMAX finish bites hardest, and it is the slowest thing in the building to iterate."
    - "Disclosure: Toho has published no shot count and no crew size for the sequel, so the numbers everyone will compare against Minus One do not exist yet."
draft: true
---

Thirty-five people. That is the number attached to *Godzilla Minus One* in
almost every account of how it won the visual effects Oscar in March 2024 — a
team of thirty-five working in one open room at Shirogumi's Tokyo office,
delivering somewhere between 610 and 620 effects shots, in Houdini and Maya
with Nuke on the back end. The Academy's own interview page says 610. Animation
World Network credits 620 to supervisor Kiyoko Shibuya. Nobody seems to have
reconciled the two, which tells you how the film was covered: the headline was
the crew size and the money, and the money figure is itself unsteady — widely
reported as under $15 million, never confirmed by Toho.

*Godzilla Minus Zero* opens in Japan on 3 November and in North America on
6 November, with first reactions out of its press screenings this week running
hot. Takashi Yamazaki is back as director, writer and visual effects
supervisor, and Shirogumi is back doing the effects. What has changed is the
container.

<figure>
  <button class="video-embed" data-video="kw0YhiqOPFg" data-title="GODZILLA MINUS ZERO — Official 1.43:1 Trailer, Filmed For IMAX" type="button">
    <img src="/img/blog/godzilla-minus-zero-imax-vfx-crew/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Toho's Godzilla Minus Zero IMAX trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Toho and GKIDS cut a trailer in the 1.43:1 ratio to advertise the IMAX framing itself, which is an unusual thing for a marketing department to do and a useful thing for anyone trying to see what the format changes.</figcaption>
</figure>

## The frame is nearly square

Minus Zero is being sold as the first Japanese production filmed for IMAX, and
Yamazaki has said a high percentage of its shots are full-frame. IMAX's
full-frame ratio is 1.43:1. Set that beside the 2.39:1 most of this kind of film
is finished in and the difference is not width. It is height.

A wide frame is forgiving in ways that only become obvious when you lose it.
Crop top and bottom and a great deal of an environment never has to exist:
ceilings, the upper floors of a building the camera tilts past, the ground
immediately under a creature's feet. Artists have been budgeting around that
crop for as long as the crop has existed, and it is honest work — you build what
is in frame. A 1.43 frame puts the sky and the pavement in the same shot as the
monster. Every set extension grows upward, every digital building needs a roof,
and the thing standing in the middle of it is lit from a sky that is now
visible rather than implied.

Then there is what IMAX does downstream. Disney's Infinity Vision certification
earlier this month was [a projection standard rather than a frame
spec](/blog/avengers-doomsday-imax-infinity-vision/) — brightness, screen size,
sound, nothing about aspect ratio. Real IMAX runs the other way. It reaches back
into production and finishing and dictates what shape and what resolution the
work has to be carried at, which is the expensive end.

## Resolution is not a slider on a simulation

Here is where a VFX supervisor's pleasure at a bigger budget meets arithmetic.

Raise the delivery resolution and a render gets slower roughly in proportion to
the pixels. Annoying, predictable, solvable with more machines. Simulation does
not behave like that. A destruction setup or a water sim is solved on a grid,
and holding fine detail at a 1.43 frame projected onto a screen several storeys
tall means raising that grid's resolution — at which point cost climbs with the
cube of the increase, plus the storage for every cached frame. Double the detail
in a volumetric sim and you have roughly eight times the work and eight times
the disk.

Yamazaki's own framing of the sequel, from his CinemaCon and Collider
interviews in April, was that each shot requiring effects is more complex than
Minus One's, and that Toho gave him more money, which meant more people on the
team. Both statements point the same way. Compute buys render farm. It does not
buy iterations on a sim that takes a night to solve, and iterations are what a
destruction shot is made of. People do.

This is precisely the bottleneck the research community has been poking at.
A multi-layered rigid-body workflow presented at SIGGRAPH this year [adds a
second fracture to motion a director has already
approved](/blog/houdini-layered-rbd-fracture-approved-sim/) without resolving
the whole thing — which is the IMAX problem stated as a technique. Detail goes
up, the approved performance stays put, the overnight solve does not happen
again.

## What the reactions are and are not

Slant's Eli Friedberg wrote that the mass-destruction sequences exceed Minus
One's in complexity, creativity and fidelity. Others have called the scale
unmatched. Those are impressions from a screening, and they are worth exactly
what impressions from a screening are worth — which is something, because the
people writing them have seen the film and I have not.

What nobody has published is a number. No shot count, no crew size, no vendor
breakdown. Minus One's figures only reached the trade press once its Oscar
campaign was under way, and the breakdowns that let anyone compare one show's
effects load with another's exist because a vendor decided to publish them.
Toho has decided nothing of the sort yet.

So the comparison everybody wants to make next week, thirty-five artists then
against however many now, is not available. Worth remembering before someone
makes it up.

---

*Release dates, the IMAX framing and Yamazaki's comments on crew size and
per-shot complexity are from Toho and GKIDS announcements and the April
interview coverage. Minus One's shot count is given as 610 by the Academy's own
interview page and 620 by Animation World Network; its budget has never been
confirmed by Toho. Reaction quotes are from the first-screening round-ups
published this week.*
