---
title: "Skinny Steve: Lola VFX shrank Chris Evans in 2D"
date: 2026-09-26
category: Film & TV
excerpt: Lola VFX built Skinny Steve across 300-plus shots by warping the photographed plate instead of building a CG double. Fifteen years on it still holds.
cover: /img/blog/skinny-steve-lola-vfx-2d-compositing/cover.svg
sources:
  - outlet: befores & afters
    url: https://beforesandafters.com/2026/09/24/the-making-of-skinny-steve/
  - outlet: Variety
    url: https://variety.com/2011/film/features/the-skinny-on-captain-america-vfx-1118040631/
artistView:
  take: "Lola solved a character-creation problem with compositing tools, and the reason the shots survive is that almost every pixel on screen is still photography. The cost sits where nobody sees it: three hundred bespoke solves and no asset at the end of it."
  works:
    - "Compositing: warping the original plate keeps grain, lens falloff and skin translucency intact, so the shots age at the same rate as the rest of the film rather than ahead of it."
    - "Art direction: the thinning is anatomical rather than uniform — sunken eyes, thinned neck, shadow added into clothing — which reads as underfed instead of scaled down."
  misses:
    - "Pipeline: a per-shot 2D warp leaves no reusable asset behind, so the work does not amortise across the film and carries nothing to the next one."
    - "Cleanup: every pixel the shrunken body stops covering has to be painted back plate by plate, which is invisible when it holds and the first thing to fail when it does not."
draft: true
---

Ian Failes put out another episode of his *Great Moments in Effects History*
series on Thursday, and this one goes back to *Captain America: The First
Avenger* — the 2011 film, and the sequence everyone remembers even if they
have forgotten the rest of it. Chris Evans, who had spent months getting large
enough to be plausible as a super soldier, playing a man who weighs about as
much as a coat.

The number in the breakdown that stopped me is this one: Lola VFX delivered
over 300 shots of it. And for the large majority of them there was no double
in frame and no CG Steve. They took the plate of Evans and made him smaller.

## Warping a photograph is not the same as replacing it

The technique is mesh warping, which is about as old as digital compositing
gets. You put a grid over the image, you push the grid around, the pixels
follow. Every artist reading this has done it to fix a bad silhouette or pull
a stray elbow back into frame.

Doing it to a lead actor, for two-thirds of his screen time, is a different
proposition. Per Variety's reporting at the time, roughly 5% of the shots put
Evans' face onto body double Leander Deeny using the method Lola had developed
on *The Social Network*, and another 10% or so did a fuller head replacement.
Everything else — the bulk of it — is Evans himself, squeezed.

And squeezing is the wrong word for what the work involves. A uniform scale
gives you a small man with a healthy man's face, which the eye rejects
immediately. The description from the time lists what they were doing instead:
gaunting the face, taking out the soft tissue under the chin, sinking the eyes,
thinning the neck, painting shadow into clothing so fabric hangs off a frame
that is no longer filling it.

That last one is the tell of somebody who understands the problem. Clothes do
not shrink with the person inside them. If you thin the body and leave the
shirt reading as taut, you have built a small man wearing a small man's shirt,
and the illusion that he is starving evaporates.

## What you keep by staying in 2D

Here is the part that matters to anyone who builds characters for a living.
When you warp the plate, you keep the photograph. Grain structure, lens
distortion, the specific way that lamp fell across that cheek on that day,
motion blur that is correct because a real shutter produced it, and skin that
scatters light the way skin does because it *is* skin.

A CG Steve has to reconstruct all of it. Every one of those is a solved problem
in 2026 and was a much less solved problem in 2010, and each one is a place
where a render drifts half a percent away from the plate it has to sit in.
Half a percent, times eight, is the uncanny feeling you cannot point at.

Lola did use 3D on the show — as reference, to check geometry and light, with
the final image still assembled in 2D. That is a sane division of labour and
one I wish I saw more often: build the thing in 3D to find out what is true,
then go and make the picture somewhere else.

The trade is severe, though, and worth being honest about. A CG character is an
asset. You build it once, you rig it, you light it, and shot 290 costs a
fraction of shot 1 because the expensive part is behind you. A 2D warp
amortises nothing. Shot 290 costs roughly what shot 1 cost: its own track, its
own mesh, its own roto, its own paint work to rebuild the background that the
shrunken body has stopped covering. Three hundred shots is three hundred
solves. Nothing carries.

That is why the industry drifted the other way. Not because 2D stopped working
— *Skinny Steve* holds up on a 2026 screen, which is more than can be said for
a lot of what shipped alongside it — but because a pipeline that scales beats
one that does not, once the shot count climbs. The same pressure showed up in
[Appa's fur going fully CG for season two](/blog/avatar-season-2-appa-fur-practical-cg-groom/),
where the practical option photographed wrong and the digital one was the
option that could be art-directed.

## The unsung part

Deeny is worth a paragraph. A stage actor, Shakespeare-trained, who dieted for
the job, watched Evans' takes back on a monitor, and then performed them again
with matching timing so his body could carry Evans' face. Lola's supervisor
Edson Williams called him the unsung hero of the sequence, and noted the
obvious irony — the biggest credit of his career, in a role where you never
see his face.

There is a whole category of this work. Match-movers, cleanup artists, the
person who painted out three hundred backgrounds so a shoulder could move
eleven pixels inward. It belongs next to [the VFX shot you never
notice](/blog/enola-holmes-3-invisible-vfx/), which is the same observation
from a different film: the work that succeeds completely is the work nobody
writes about.

Fifteen years on, the reason to revisit *Skinny Steve* is less nostalgia than
calibration. A lot of what gets pitched now as impossible-before-this-tool was
done in 2010 by a small team with a warp grid, a good eye for anatomy, and a
director who insisted on keeping the lead actor's performance in frame. The
tool was never the hard part.
