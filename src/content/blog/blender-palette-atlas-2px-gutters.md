---
title: "Blender palette atlases: 2px gutters die at mip 2"
date: 2026-11-23
category: 3D
excerpt: HueAtlas Lite does palette atlas texturing free in Blender 4.2 and up. Its 2px gutter stops protecting your colours at mip level 2.
cover: /img/blog/blender-palette-atlas-2px-gutters/video-thumb.jpg
sources:
  - outlet: BlenderNation
    url: https://www.blendernation.com/2026/11/22/hueatlas-lite-free-palette-atlas-texturing-for-low-poly-game-kits/
  - outlet: HueAtlas Lite repository (Alex20090906)
    url: https://github.com/Alex20090906/hueatlas-lite
artistView:
  take: "The split between the free and the paid tier is the most informative thing about this add-on. Everything to do with making a palette is free, and everything to do with surviving a mip chain costs money, which is an accurate map of where the workflow actually hurts."
  works:
    - "Pipeline: storing the swatch index per face, rather than leaving the UV coordinate to be the only record of which colour a face wanted, fixes the one thing that made this workflow unmaintainable. A palette you cannot reorder is a palette you got right first time, and nobody does."
    - "QA: the audit checks for UVs that span two cells. That is not a feature anyone designs from a spec sheet — it is a bug somebody shipped, found at distance on one wall, and never wanted to find again."
  misses:
    - "Rendering: two pixels of edge-extended gutter is one pixel at mip 1 and half a pixel at mip 2. On a kit that gets any distance at all, the protection runs out well before the LODs do, and the viewport will not tell you."
    - "Pipeline: the release notes say the Unreal 5 engine pack is a texture set with import notes rather than something tested in Unreal. Shipping an engine integration you have not opened the engine to check is how import settings quietly become the user's problem."
---

One material. One texture, often smaller than the favicon on this page. A
village of low-poly buildings where every face points at one coloured square
inside it. The renderer never changes material state, so the kit draws in a
single batch.

That workflow is roughly as old as real-time 3D, and people keep writing tools
for it. **HueAtlas Lite** arrived on Sunday — free, GPL-3.0-or-later, Blender
4.2 and up, tested by its author on 4.2 LTS, 4.5 LTS, 5.2 LTS and 5.3. Only
BlenderNation has carried it so far, so the detail below comes from the
repository itself rather than from a second write-up.

<figure>
  <button class="video-embed" data-video="4tt3tW1Pz5U" data-title="This Blender Scene uses ONLY ONE TEXTURE (Texture Atlas/Colour Palette Tutorial)" type="button">
    <img src="/img/blog/blender-palette-atlas-2px-gutters/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Vertex Arcade's texture atlas tutorial" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Vertex Arcade's walkthrough of the manual version of this technique — load the atlas, set interpolation to Closest, collapse the UVs to a point, slide the point onto the colour you want. It predates HueAtlas and is about the workflow rather than the add-on, which is why it is the clearest thing to watch first.</figcaption>
</figure>

## Five tools for one problem

Here is the part that interested me more than the release. Search the Blender
add-on market for this and you do not find a gap — you find a queue. Low Poly
Palette. Pigment Color Atlas Generator. Swatch Kit. Tintline, which shipped
2.2 in October with one-click auto shading for colour atlases. Texture Gradient
Palette, which is just the atlas, sold as a file.

Generating a grid of coloured squares is a solved problem five times over. It
is also trivial — you could write it in an afternoon with the Python image
module. So the interesting question is not what any of these tools makes. It is
what each one sells past the grid, because that is a fairly honest map of where
the technique hurts once a kit gets real.

## The UV is the data, and that was always the bug

On the manual workflow, your UVs *are* the colour assignment. You collapse an
island to a single point, you drag that point into the cell you want, and the
position of that point is the only record anywhere that this roof is supposed
to be red. Nothing stores intent. Nothing stores "swatch 7".

So reorder the palette and every model in the kit is wrong at once, silently,
with no error and no way back except undo. Insert one colour in the middle and
everything after it shifts. Anyone who has worked this way for more than a week
has at some point rebuilt a palette by hand because moving a swatch was cheaper
than fixing the fifty objects that pointed at it.

HueAtlas's answer is the sentence in its README: each face stores which swatch
it uses, so the palette can change without breaking the UVs. That is the whole
reason to install it. Everything else — importing GIMP `.gpl` files and hex
lists, selecting faces by swatch, picking a swatch off a face — follows from
having an index to hold onto.

The full version, not yet out, puts the payoff behind the paywall: an edit-safe
palette where you can reorder, insert, delete, change the column count or the
cell size. Which is consistent. Free gets you the index; paid gets you to use
it.

## Two pixels, and what the mip chain does to them

The Lite build generates its atlas with exact colours and edge-extended 2px
gutters. The full build advertises mip-safe padding up to a chosen mip level.
Put those two lines next to each other and the arithmetic does the rest.

Two texels of gutter at mip 0 is one texel at mip 1. Half a texel at mip 2.
Past that there is no gutter — the reduction has averaged across the boundary
you were trying to protect, and the red cell and the blue cell next to it have
agreed on a purple that exists in no palette you authored.

Everyone who does this knows to set the sampler to Point or Nearest, and that
advice is in every tutorial on the technique, including the one above. It is
also only half the fix, and the half that matters less. Filtering mode and
mipmapping are separate settings. Point filtering stops the sampler
interpolating *within* a mip; it does nothing about the fact that the lower mip
was built by averaging before the sampler ever saw it. Turn mips off instead and
the atlas shimmers at distance, which is the failure the mip chain exists to
prevent.

So the real options are: pad each cell by enough texels to survive however many
mip levels the engine will generate, or accept that the kit only looks correct
near the camera. Padding properly means knowing the mip count in advance and
scaling the gutter to it, which is actual work, and it is why that feature sits
on the paid tier rather than being a cynical split.

The nasty part is where it shows up. Near camera, perfect. Mid-ground, fine.
The buildings at the back of the shot, on their third LOD, go muddy — and
Blender's viewport, sampling the full-resolution image on a close-up quad, will
tell you everything is fine right up until it is in an engine.

## An audit list is a confession

The Lite build checks three things: faces with no swatch assigned, UVs that
fall outside the atlas, and UVs that span two cells.

That third one is the tell. Nobody writes a "UVs spanning cells" check from a
design document. A face whose island straddles the boundary between two
swatches samples a blend of both and renders as a colour that is in neither,
and you find it in an engine, at distance, on one wall, after an hour of
wondering why that building is slightly wrong. The check is there because
somebody shipped it.

The full version extends the list to mip bleed, region placement, colour space
and power-of-two sizing. Same confession, four more chapters.

It is worth putting all this next to the other end of the texel-budget
argument. A while back I wrote about [one sci-fi hand prop carrying four
separate texture sets](/blog/tears-in-rain-sci-fi-prop-texture-sets/) — metal,
glass and plastic each given their own 4K sheet so that none of them had to
fight for pixels. Both decisions are the same decision, made at opposite
extremes: how much texture does this surface actually need to read correctly at
the distance a player will see it. Palette atlases are the answer when the
honest number is "one texel", and a flat-shaded roof genuinely does only need
one.

## The disclosure in the README

The repository says the project was written with AI assistance, names the tool
(Claude Code), and says in the same breath that every feature has an automated
test, with a headless suite you can run yourself —
`blender --background --factory-startup --python tests/run_all.py`. Layout
maths, exact pixel colours, a glTF round trip, mip levels, the engine files,
the audit.

Compare that with the shape these disclosures usually take. When House House
[put a number on the AI in Big
Walk](/blog/big-walk-ai-disclosure-igf-jury/) — under 0.1% of the code — it
arrived after a jury statement rather than in the release notes, and the studio
admitted it had shipped a four-year project without a policy. Nobody outside
could check the figure.

A GPL add-on with a runnable test suite is a different situation entirely. The
code is there, the tests are there, and anyone who cares can run them against
the build they installed. That is about as far as a solo developer can take a
disclosure, and putting it in the README on day one rather than in a reply to a
complaint is the part worth noticing.

## Before you commit a kit to this

Check what mip count your target engine generates for a texture the size of your
atlas, and compare it with your gutter. Two pixels buys you one level. If your
kit never recedes — a UI prop, a diorama, a card game — it genuinely does not
matter and the free build is the whole tool. If it is an open-world kit on LODs,
the padding is the feature you are actually shopping for, and right now it is in
a version that has not shipped.
