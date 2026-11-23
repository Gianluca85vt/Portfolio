## LinkedIn

Two pixels of gutter on a palette atlas is one pixel at mip 1, and nothing at mip 2. That single line of arithmetic explains most of the muddy low-poly kits I have seen in engine.

HueAtlas Lite landed this weekend — a free, GPL Blender add-on for palette atlas texturing, Blender 4.2 and up. One material, one tiny texture, every face pointed at a coloured square inside it. It is a workflow as old as real-time 3D and people keep writing tools for it: Low Poly Palette, Pigment, Swatch Kit, Tintline. Generating a grid of squares is a solved problem five times over.

So the useful question is what each tool sells past the grid, because that maps where the technique actually hurts.

Two things stood out in HueAtlas.

First, it stores the swatch index per face. On the manual workflow your UVs ARE the colour assignment — you collapse an island to a point, drag it into a cell, and the position of that point is the only record anywhere that this roof wanted to be red. Reorder the palette and every model is wrong at once, silently. An index is the difference between a palette you can edit and a palette you got right first time.

Second, the free build gives you 2px edge-extended gutters, and the paid build sells mip-safe padding scaled to a chosen mip level. Put those side by side and you can see the whole problem. Point filtering is the advice everyone repeats, and it is only half the fix: filtering mode and mipmapping are separate settings, and the lower mip was already averaged before the sampler ever saw it. Pad for the mip count, or accept that the kit only reads correctly near camera.

The nastiest part is that Blender's viewport, sampling the full-res image on a close-up quad, will tell you everything is fine right up until it is in an engine.

Check your engine's mip count against your gutter before you commit a kit to this.

#Blender #TechArt #GameDev

## X

Palette atlas texturing: one material, one tiny texture, a whole low-poly kit in one batch.

HueAtlas Lite shipped free this weekend (GPL, Blender 4.2+). Worth reading for what its paywall reveals about the workflow.

Two pixels of gutter at mip 0 is one texel at mip 1. Half a texel at mip 2.

Past that the reduction has averaged across the boundary you were protecting, and your red cell and blue cell have agreed on a purple that is in no palette you authored.

"Set the sampler to Point" is in every tutorial on this technique and it is half the fix.

Filtering mode and mipmapping are separate settings. Point filtering stops interpolation WITHIN a mip. The lower mip was already averaged before the sampler saw it.

Turn mips off and the atlas shimmers at distance — the exact failure mips exist to prevent.

So: pad each cell for however many mip levels the engine generates, or accept the kit only reads near camera. That is why padding sits on the paid tier.

The other fix HueAtlas gets right: it stores the swatch index per face.

On the manual workflow the UV position IS the data. Reorder the palette and fifty objects are wrong at once, silently, with no error.

Its audit checks for "UVs spanning cells". Nobody writes that check from a design doc — it is a bug somebody shipped and found at distance, on one wall, after an hour.

An audit list is a confession. Read one before you trust a tool.

[image: cover.svg]
