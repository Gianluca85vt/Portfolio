---
title: "Digger's miniature planes became Gaussian splats"
date: 2026-11-25
category: Film & TV
excerpt: ILM scanned the miniature planes from Iñárritu's Digger and splatted them to fill shots, which keeps the handmade surface a CG rebuild would smooth out.
cover: /img/blog/digger-miniatures-gaussian-splats-ilm/cover.svg
sources:
  - outlet: befores & afters
    url: https://beforesandafters.com/2026/11/23/a-visual-journey-through-the-miniatures-of-digger/
  - outlet: Variety India
    url: https://varietyindia.com/going-sideways-how-tom-cruise-and-alejandro-g-inarritu-resurrected-vistavision-for-digger/
artistView:
  take: "Scanning a finished miniature and splatting it is the right way round — the physical object stays the source of truth and the digital copy exists only to multiply it. The question I would put to the team is how those planes got relit once the model stage's light was already baked into the capture."
  works:
    - "Pipeline: splatting the model instead of rebuilding it as mesh and PBR keeps the view-dependent specular of a hand-sprayed finish, which is the first thing a roughness map averages away."
    - "Art direction: committing to models that read as models means a large negative stops being a liability. Resolving the wood grain and the sanding marks is the intent here, not a leak."
  misses:
    - "Lighting: a splat carries whatever light it was captured under, so every shot reusing those planes either matches the model stage or gets relit in comp. On a frame this wide, a mismatch in the specular roll-off is where it shows first."
draft: true
---

Simon Weisse's workshop sits in a backyard in Berlin-Neukölln. When a film
needs him he assembles about fifteen freelancers, and most of them are trained
carpenters, joiners and metalworkers rather than people who would describe
themselves as visual effects artists. That shop has been making Wes Anderson's
miniatures since The Grand Budapest Hotel, and more recently for The Phoenician
Scheme, The Swan, Queer and The Wonderful Story of Henry Sugar.

The approach for *Digger* came from producer Michael Sharp, and by Weisse's
account to befores & afters it was about as elaborate as a text message:
Alejandro wants miniatures, could you come to London next week. He went to
Leavesden, where the art department had knocked together some very simple test
setups to show what they were after.

What they were after is unusual. *Digger* is Alejandro G. Iñárritu's first
English-language feature since The Revenant, in North American cinemas and IMAX
from **2 October 2026** through Warner Bros. and Legendary, with Tom Cruise as
Digger Rockwell — an oil magnate whose company triggers the environmental
catastrophe he then sets out to fix. The film's visual world is deliberately
artificial. The models are not pretending to be locations. Dioramas turn into
story points.

That removes the usual brief. A model shop is normally asked to make something
indistinguishable from the real thing at the scale the camera implies, and
every decision in the build serves that lie. Here the job is to make an object
that is obviously an object, and still beautiful enough to hold a frame.

## What they built

The first model was a large landscape, the one you see in the opening as the
curtains part on Cruise's character in bed. After that, aircraft. Weisse's team
built a B-2 Spirit; The Magic Camera Company built other planes.

A B-2 is a nasty thing to hand to a model shop. There is no fuselage to hide
behind and no panel clutter to break up a surface — it is one continuous curved
flying wing, with a sawtooth trailing edge that has to stay dead straight along
every facet, finished in a flat grey-black that shows every seam, every patch of
filler, every sanding mark. Get the surface slightly wrong on a jet fighter and
the greebling covers for you. On a B-2 there is nothing to look at except the
surface.

I have not found a stated scale for any of it, which is a shame, because scale
is the number that tells you most about how a model was shot.

## Then ILM scanned them

ILM scanned the miniature planes and used Gaussian splatting to replicate them
for shots.

Read that in the normal order and it is backwards. Usually the miniature is
reference: it gets photographed, measured, maybe photogrammetried, and then a
modeller builds the asset that actually ships, which is cleaner, better
topologised and more controllable than the thing on the stand. The model is a
step on the way to the CG plane.

On *Digger* the physical object is the deliverable and the digital copy exists
to multiply it. You build one bomber properly and let the computer fill the
formation.

Splatting rather than meshing follows from the brief. A Gaussian splat is fitted to photographs, so it carries view-dependent
appearance for free — the way a specular highlight rolls across a lacquered
surface, the brush mark that catches light from one angle and disappears from
another, the faint unevenness of a finish laid down by hand with a spray gun.
Rebuild that as mesh plus PBR and somebody has to decide what the roughness map
says. They will make it consistent. A hand-finished model is not consistent,
and its inconsistency is the entire reason Iñárritu wanted models.

The bill arrives with the light. A splat is a reconstruction of a scene as it
was lit when it was captured, which means the model stage's lighting is sitting
inside the asset. Drop that plane into a shot with a different key and the
specular tells on you. This is the gap the comp packages have been closing all
year — [Nuke 17.1 can drop lights onto a Gaussian splat in comp](/blog/nuke-17-1-gaussian-splat-relighting/),
with some deliberate omissions that set an honest expectation about what you
can ask of it. For planes against sky it is a solvable problem, because sky is
a big soft source and there is not much around to bounce. For anything near the
ground it gets harder quickly.

## A bigger negative is unkind to a model

The other decision that shapes all of this is the format. Emmanuel "Chivo"
Lubezki shot the whole film on VistaVision — 35mm film run horizontally through
the gate, eight perforations to a frame, roughly 37.7 by 25.2mm of negative.
That is about twice the area of a standard four-perf Academy frame. The native
shape of that gate is close to 1.5:1, which lines up with the reported 1.50:1
framing for IMAX and VistaVision, with some scenes at 1.85:1. Reported lenses
were custom-adapted Panavision H Series and Panavision SLZ zooms along with a
Leitz, and much of the film was shot at 29mm.

Twice the negative resolves twice the detail, and on a miniature that detail is
all the stuff you spent the build trying to bury. Wood grain. Filler. The ridge
where two sheets meet. On most productions that is precisely why you keep models
away from a large format, or why you shoot them soft and let atmosphere do the
work. A film whose models are meant to look like models does not have that
problem, because the thing the negative is revealing is the thing the director
wants seen.

Then there is depth of field. Go to a larger format and hold the same field
of view and you need a longer lens, and a longer lens at the same aperture gives
you less depth of field — which is backwards from what a miniature needs, since
the subject sits close to the camera and you want the whole of it sharp. The
reported 29mm helps: on a negative that wide, 29mm is a properly wide lens,
behaving roughly like a 21mm would on standard 35mm. The rest has to come from
stopping down, and stopping down means pouring light onto a small object without
the light itself reading as small. That is the oldest problem in model
photography and it has not got any easier — the same arithmetic turned up when
[The Mandalorian and Grogu lit a 48-inch model ship](/blog/mandalorian-grogu-ilp-vfx-breakdown/),
where the size of the source relative to the subject is what gives the scale
away.

What I will be watching for when the effects breakdowns come out properly is the
relight. The splat pipeline is young enough that "we scanned the hero model and
cloned it" is still a sentence with a lot hidden inside it, and the honest
version of it includes how many of those cloned planes went back to a lighting
artist anyway.
