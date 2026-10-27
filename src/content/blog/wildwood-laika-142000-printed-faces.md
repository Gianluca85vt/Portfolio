---
title: "Wildwood: 142,000 printed faces, $100m to make"
date: 2026-10-27
category: Film & TV
excerpt: Laika printed more than 142,000 faces for Wildwood and opened to $12.2 million. Most of that pipeline runs in software before anything is touched by hand.
cover: /img/blog/wildwood-laika-142000-printed-faces/video-thumb.jpg
sources:
  - outlet: IndieWire
    url: https://www.indiewire.com/news/box-office/wildwood-box-office-laika-analysis-1235223778/
  - outlet: The Hollywood Reporter
    url: https://www.hollywoodreporter.com/movies/movie-news/clayface-box-office-you-can-see-everything-wildwood-1236739530/
  - outlet: 3Druck
    url: https://3druck.com/en/case-studies/3d-printing-for-stop-motion-laika-produces-142000-facial-expressions-for-wildwood-50164388/
artistView:
  take: "Laika sells Wildwood as the handmade film, and the puppets genuinely are handmade. But the face department is a 3D pipeline with a printer bolted to the end of it: every one of those expressions was modelled, textured and colour-checked in software before any resin came out. The craft I recognise in it is asset management as much as sculpting."
  works:
    - "Rapid prototyping: full-colour PolyJet printing removed the hand-painting bottleneck, which is the only reason the count could go from Coraline's 20,000 faces to 142,000."
    - "Colour management: Cuttlefish is doing the job an ICC profile does in a texture pipeline, making layered resin land on the same albedo a painter approved on screen."
    - "Asset discipline: 142,000 unique parts, each tied to a frame of a specific shot, is a versioning problem before it is an art problem, and the studio appears not to have lost the thread of it."
  misses:
    - "Replacement animation: the technique carries a built-in tell, a micro-pop as one face swaps for the next and a seam where the face meets the skull, which is why the magnets and the cleanup pass exist at all."
draft: true
---

On *Coraline*, in 2009, Laika printed about 20,000 replacement faces and then
had to paint every one of them. The printer laid down a single colour of resin,
so freckles were a brush job — reporting from the studio puts one of Coraline's
faces at over a week to finish. That cost set the ceiling. You can only have as
many expressions as you can afford to paint.

*Wildwood* has more than 142,000.

<figure>
  <button class="video-embed" data-video="UI3KSM2Iouw" data-title="WILDWOOD Official Movie Trailer" type="button">
    <img src="/img/blog/wildwood-laika-142000-printed-faces/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the official Wildwood trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The official trailer for Wildwood, which Fathom Entertainment opened in US cinemas on 23 October 2026. Everything below is read off published footage and the studio's own process material rather than a set visit.</figcaption>
</figure>

## The printer is only the output device

The faces come off Stratasys J750 and J850 PolyJet machines, which print in
full colour by jetting photopolymer in layers. Getting a painted sculpt to
survive that trip is the interesting part, and it is handled by software called
Cuttlefish, built at Fraunhofer IGD. Cuttlefish takes a coloured 3D model and
works out how to stack translucent resin so the thing that comes out matches
the thing the artist approved on a monitor.

Anyone who has fought a texture through a render and then through a print knows
exactly what that is. It is a colour pipeline. Resin is not ink and it is not a
display, it scatters light under its own surface, and making a subsurface
material hit a target albedo is a problem I have watched eat whole afternoons
on jobs with none of this at stake.

So the "handmade" story has a large software stage in the middle of it. Each
face starts as a digital sculpt, gets painted and rigged, and only then becomes
an object. The animator picks up something physical. What they pick up was
specified in a DCC package first.

## 142,000 of anything is a database problem

My sympathy goes out to whoever ran that department. The studio
says it does not reuse expressions, so those are 142,000 distinct parts. Each
one belongs to a character, a frame, a shot. Each one has to be findable on a
shelf by a human being in a hurry, and traceable back to the sculpt it came
from when a note comes in and the whole set has to be reprinted.

Nobody gives you an award for that. It is naming conventions, version control
and a shelving system, and if it fails the animation stops. The published
figure of 142,030 comes from a joint Laika and Fraunhofer release, so treat the
precision as promotional — but the order of magnitude is not in doubt, and the
order of magnitude is the point.

Around it, the old crafts held. Armatures hold the poses. Magnets hold the
faces on. Eyes still get nudged by hand, frame by frame, because nothing has
beaten a thumb and a dental tool for that yet. Over 2,700 shots. More than 220
puppets — some outlets say 230, and Laika has not published a number I would
stand behind. Roughly 231 weeks of animation. Sixteen years from Colin Meloy
and Carson Ellis's book to a screen.

That pattern repeats whenever a production decides the camera should see a real
object. HBO's Lanterns [built a real ring suit instead of leaving it to
CG](/blog/lanterns-hbo-practical-suit-grounded-review/) and spent the money on
the build rather than the comp, for the same reason: the lighting is free and
correct when the thing exists.

## The number that decides whether Laika does this again

$12.2 million domestic, opening weekend, per IndieWire's Monday analysis —
third for the weekend. Earlier Sunday estimates had it nearer $11.6 million, so
the figure firmed up as actuals came in. An A CinemaScore. PG-13, which for an
animated feature is a bet in itself.

The comparisons cut both ways. That opening is roughly level with *Kubo and the
Two Strings*, which is the house's beloved film and not its profitable one.
It towers over *Missing Link*, which opened to $5.9 million and limped to $17
million domestic. Fathom points out that Laika's five previous features averaged
about 3.6 times their opening weekend at home, which lands *Wildwood* somewhere
in the low-to-mid $40 millions domestically.

Against a reported budget near $100 million.

International is still to come and a film like this has a long tail, so that is
not a verdict. But hold those two numbers next to each other and you can see
the shape of the problem for anyone whose job depends on this studio. The
pipeline worked. The reviews are the best the studio has had. The arithmetic is
still tight.

The film that beat it to the top of the same weekend was *Clayface*, which took
about $24 million — and which this blog liked for a related reason, that [the
practical makeup carried the film where the digital melting did
not](/blog/clayface-review-practical-face-cg-motion/). Two films, one weekend,
both of them better in the shots where something physically existed in front of
the lens. One of them cost a fraction of the other to make that true.

Sixteen years is a long time to spend proving that a printer can hold a colour.
