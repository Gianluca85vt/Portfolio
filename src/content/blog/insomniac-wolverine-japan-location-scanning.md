---
title: "Insomniac's Wolverine: 189,589 photos of Japan"
date: 2026-09-04
category: 3D
excerpt: Six people, four regions, 5.6TB and 189,589 frames. What a location-scanning trip actually brings home, and which parts of Japan refuse to be scanned at all.
cover: /img/blog/insomniac-wolverine-japan-location-scanning/shot-01.jpg
---

Insomniac put up a post on the PlayStation Blog on 1 September about a
location-scanning trip its team took to Japan early in production on Marvel's
Wolverine. Six people. Four regions. Over 600 scans, 5.6 terabytes, and
189,589 photographs, walked out over more than a hundred miles with something
like twenty pounds of gear each. Principal Technical Artist Nathaniel Bell led
it, and called it the studio's most ambitious trip of this kind so far.

Studios publish this sort of thing two weeks before launch because it plays
well, and it does play well. It also happens to be one of the rare marketing
beats that hands you real numbers, and the numbers are worth doing something
with.

## Divide them and see what kind of capture this was

<figure>
  <img src="/img/blog/insomniac-wolverine-japan-location-scanning/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Arashiyama bamboo grove, Kyoto. Wikimedia Commons, free licence</figcaption>
</figure>

189,589 photographs across a bit over 600 scans is roughly 316 frames per
scan. That is not a number you get by walking around with a phone. A ground
material — a patch of gravel, a paving slab, a stretch of moss — is thirty to
sixty frames if you are being careful. A full orbit of an object, two or three
elevations, overlapping properly, is anywhere from 150 to 400. An average of
316 means these were proper captures, shot to solve, not snapshots for a
reference folder.

Now the other division. 5.6TB over 189,589 files is about
29 megabytes a frame. Insomniac did not publish a kit list and I am not going
to invent one, but that file size is a full-frame raw file in the 45 to 60
megapixel class. Nobody carries twenty pounds up a mountain to shoot JPEG.

Raw is a pipeline decision rather than a gear preference. A JPEG has the camera's
tone curve baked into it and its highlights clipped to white. Photogrammetry's
worst problem is that the lighting of the day arrives welded into the colour
map — every shadow under every pebble, permanently — and the whole de-lighting
pass is an attempt to subtract it. You can subtract from linear raw data. You
cannot recover a highlight that was thrown away in-camera; it stays a flat
white hole in the albedo, and it shows the moment you light the asset
differently in engine.

## The list of what they captured is a confession

Rock, bark, pavement, moss, metal, signage, soil. That is the sort of list
that gets published as *look how thorough we were*, and read the other way it
is a precise description of what photogrammetry is willing to do.

Every item on it is matte, static, and covered in high-frequency detail. Those
are the three things a solver needs. It finds features, matches them between
frames, and triangulates. Give it a surface with texture and no specular
behaviour and it will hand you geometry accurate to the millimetre.

Now look at the biomes named in the same post: snowy mountains, bamboo
forests, city streets, stations. Two of those four are among the least
scannable things in the world.

Snow has no trackable features. It is a smooth, bright, subsurface-scattering
surface that reads as the same pixel value across a metre of terrain, and a
solver staring at it finds nothing to match. Bamboo is worse in a different
direction — thin cylinders, glossy, near-identical to one another, and
swaying. Repeating geometry actively poisons a solve, because the matcher
confidently pairs features on two different stalks. Add wind and there is no
rigid scene left to reconstruct.

So the honest reading is that the bamboo forest and the snowfield came home
mostly as photographs. Bark material off a single stalk, the way light falls
through a canopy, the specific grey-green of it, the density of planting, how
tall they actually are when you stand under them. All of which an artist can
use. None of which is a mesh.

## Twenty pounds and a hundred miles

The logistics line is the one I keep thinking about, because it is the part of
scanning nobody puts in a portfolio. You shoot what you can carry. You shoot
in the light you are given, and the light you want is a flat overcast day,
which Japan in most seasons is happy to refuse. A crew of six walking a
hundred miles is a crew that spent a large fraction of the trip deciding what
not to capture.

There is a version of this job that looks like archaeology and a version that
looks like tourism, and the difference is entirely in the planning done
beforehand. Four regions across mountains, forest, city and underground
transit is a spread chosen to cover material families rather than landmarks.
Concrete, tile, painted steel, rusted steel, wet asphalt, cut stone, packed
earth. Get the family and you can build a hundred surfaces that were never in
front of the camera.

## What comes back on the drive

A solved scan is a twenty-million-triangle blob with a texture that has the
afternoon baked into it. Before it goes near a level it needs de-lighting,
retopologising or decimating to something a budget can hold, UVs, a bake from
the high to the low, and usually a conversion into a tiling material rather
than a unique object, because one photographed rock is one rock and a rock
material is a whole cliff.

Weeks of it. The trip is the cheap part, and the reason studios still keep
doing trips is that the alternative is worse. Buy a scan library and you get
somebody else's Utah, somebody else's Scottish coast, and a subtle wrongness
in a game set in Japan that nobody on the team can name.

Which is the argument for scanning a place even when your game never intends
to look photoreal. Insomniac's Spider-Man games are stylised —
cleaner, warmer, more graphic than a photograph — and Wolverine looks to be
cut from the same cloth. Scanning gives you correct proportion and correct
weathering as a base to stylise away from. Wear patterns are the giveaway:
invented grime sits where an artist thought it looked good, and real grime
sits where water ran, where hands touched, where a wheel clipped the kerb for
thirty years. Nobody consciously spots the difference. Everybody feels it.

Wolverine is dated 15 September on PS5, with reviews reported to lift on the
10th, so we will get to see how much of the 5.6TB survived contact with a
frame budget in about a week.

---

*Trip figures — six team members, four regions, 600-plus scans, 5.6TB,
189,589 photos, 100-plus miles, roughly 20lb of gear — and the quote from
Principal Technical Artist Nathaniel Bell are from Insomniac's 1 September
post on the PlayStation Blog, as carried by 80.lv and other outlets; the blog
itself would not load from here. Per-frame file size and per-scan frame counts
are my arithmetic on those published totals, not figures Insomniac stated. The
release date is Sony's; the 10 September review embargo is reported rather
than announced on a first-party page.*
