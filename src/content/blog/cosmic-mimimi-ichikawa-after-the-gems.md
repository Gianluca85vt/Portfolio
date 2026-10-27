---
title: "Cosmic Mimimi: Ichikawa draws away from CG"
date: 2026-10-27
category: Manga
excerpt: Land of the Lustrous worked in CG because its cast were literally mineral. Ichikawa's new Afternoon series, starting 25 November, is built from softer stuff.
cover: /img/blog/cosmic-mimimi-ichikawa-after-the-gems/video-thumb.jpg
sources:
  - outlet: Anime News Network
    url: https://www.animenewsnetwork.com/news/2026-10-25/land-of-the-lustrous-haruko-ichikawa-launches-new-manga-cosmic-mimimi/.243167
  - outlet: MyAnimeList News
    url: https://myanimelist.net/news/74862294
  - outlet: jbox
    url: https://www.jbox.com.br/2026/10/26/cosmic-mimimi-autora-de-terra-das-gemas-anuncia-novo-manga
artistView:
  take: "Land of the Lustrous gets credited to Orange's pipeline, and Orange earned that, but half the win was decided at a drawing desk years earlier: Ichikawa wrote a cast made of minerals, and minerals are what a renderer is already good at. The new series appears to be made of the opposite material."
  works:
    - "Shading: the gems read as translucent because subsurface scattering is a lighting problem a renderer solves every frame, with nobody drawing the falloff by hand."
    - "Art direction: faceted crystal hair gives a silhouette that survives rotation, which is the exact place CG characters normally come apart."
    - "Modelling: a smooth, near-mannequin skull keeps the topology clean, so the model can be reused across a whole series without fighting it."
  misses:
    - "Faces: in close-up the 2017 trailer shows a mesh that cannot lie about anatomy the way a drawing can, and Orange has spent the years since redrawing faces by hand to get round it."
---

Land of the Lustrous is the show people reach for when they want to argue that
CG anime can be beautiful. The credit usually goes to Studio Orange, and Orange
earned it. A good part of that result, though, was settled years before anyone
opened a scene file — at a drawing desk, when Haruko Ichikawa decided her cast
would be made of gems.

Think about what a gem is as geometry. Hard surface. Flat facets that catch a
highlight cleanly and hold it. Translucency, which a renderer handles with
subsurface scattering, every frame, without an animator painting the falloff.
Hair that is crystal, so it gets modelled as a solid and never has to be
simulated as hair. A smooth, near-mannequin skull underneath. Every item on
that list is something 3D does cheaply and hand-drawn animation pays dearly
for.

She has started something else now.

## What was announced

The December 2026 issue of Kodansha's Monthly Afternoon carried the
announcement: Ichikawa launches a new series called Cosmic Mimimi in the
following issue, on sale 25 November 2026. Kodansha's own billing for it is
"neo kawaii sci-fi". Mimimi lives in a city the publisher calls cool and
dreaming, and the character's stated purpose is to make everybody happy.

Lustrous ran in the same magazine from October 2012 to April 2024, with the
thirteenth and final volume shipping that November. Kodansha USA has been
publishing it in English since 2016. Two and a half years off after twelve
years on one title is not a long rest.

The announcement came with a visual, which I am going by secondhand rather than
having seen at any size worth judging. Brazilian outlet jbox, working from
Comic Natalie's coverage of 22 October, describes the designs as running from
humanoid figures through to creatures shaped like caterpillars and springs.

A caterpillar. A spring.

## Why those two words land differently for a rigger

Soft, segmented, compressible bodies are the opposite of a gem in every way
that costs money. A caterpillar is a long chain of joints with skin that has to
bulge where it bunches and thin where it stretches, and getting that to read
without the mesh creasing is days of weight painting, not an afternoon. A
spring is worse. A spring's whole character is that it does not conserve its
silhouette.

Kawaii as a drawing idiom runs on exactly that licence. A cheek balloons for a
single frame. A body abandons its own volume to sell a feeling and snaps back
before anyone counts the mass. A pencil can do that for free, because a drawing
was never claiming to be a solid object in the first place. A mesh has a volume
and keeps it, stubbornly, until somebody builds the machinery to make it lie.

Which is the work Orange has been doing for years. Their look comes from
[bending 3D models until they read as hand-drawn](/blog/studio-orange-3d-anime-2d-look/)
— dropped frames, deliberately warped geometry, faces redrawn by hand in the
shots where the model will not hold up. All of it throws away the asset reuse
that was supposed to be the reason for going 3D at all.

Lustrous asked for much less of that. The source material arrived already made
of the things a pipeline wants.

## The thing I am not claiming

Nobody has announced an adaptation of Cosmic Mimimi, and I am not predicting
one. Lustrous took five years from its first chapter to broadcast, and most
series in Afternoon never get that call. The first chapter is not out yet. My
read on the shapes comes from other people's descriptions of one promotional
image, which is thin evidence and I would rather say so than dress it up.

What interests me is narrower, and it holds either way: a mangaka's choice of
material decides, years ahead, which production methods will be able to follow
her. The last time a Japanese production wanted a specific artist's line to
survive contact with motion, it
[handed the drawing to a rotoscope director](/blog/look-back-live-action-rotoscope-sequence/)
and shot the reference with actors — a solution nobody would pick if the easy
route were available.

<figure>
  <button class="video-embed" data-video="AMHFleh4oPM" data-title="Land of the Lustrous HIDIVE Trailer" type="button">
    <img src="/img/blog/cosmic-mimimi-ichikawa-after-the-gems/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from HIDIVE's trailer for the Land of the Lustrous anime" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>HIDIVE's trailer for Orange's 2017 Land of the Lustrous adaptation — a trailer, not a review. Watch the highlights travel across the faceted hair: that is the shot the material was doing the work in.</figcaption>
</figure>

Ichikawa spent twelve years drawing people who were hard all the way through.
Starting again from something soft is a real change of hand, whoever ends up
having to animate it.
