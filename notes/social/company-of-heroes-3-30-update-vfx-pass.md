## LinkedIn

Buried in the patch notes for Company of Heroes 3's 3.0 update, between the artillery rebalancing and the economy rework, is a line saying sand, snow and mud can now accumulate on the tops of objects.

That is the most informative line in the document, because it tells you where the camera is.

If you make art for a shooter, your texture budget goes into the sides of things. Eye height, waist height — the band of a model that a player's face ends up level with. The top of a shipping container can be a flat tiling pass, because nobody will ever look at it.

An RTS inverts that completely. The camera looks down. The upward-facing surface of every prop on the map is permanently presented to the player, everywhere, all the time. Which produces a very specific failure: put your weather system on the terrain only, and the first time it snows the ground goes white while every crate, wall cap and wrecked chassis stays summer-brown. The map reads as two seasons stacked on top of each other.

The fix is cheap. Project a mask down the world Y axis, gate it on how far each surface normal points at the sky, blend a snow or mud material over whatever was already there. Shader cost near zero. Art cost near zero. And it repairs the one discontinuity an overhead camera cannot hide.

The same logic runs through the rest of Relic's visual list. "Better soldier lighting" at that camera distance is not a beauty job — a rifleman is a smear of pixels, and what you need to read in a quarter of a second is how many, facing where, and whose. That read comes from value separation against the ground. Rim light that would look cheap at head height becomes load-bearing from above.

Relic shipped it free, on 5 November 2026, to a game that launched in February 2023 — while also making a DLC and a spinoff. A developer told Rock Paper Shotgun it "was a lot".

#gamedev #technicalart #RTS

## X

Buried in Company of Heroes 3's 3.0 patch notes: sand, snow and mud can now be painted onto the tops of objects.

It's the most informative line in the document, because it tells you exactly where the camera is.

[image: shot-01.jpg]

Shooter art puts the texture budget in the sides of things. Eye height, waist height — the band of the model a player's face ends up level with.

The top of a shipping container? Flat tiling pass. Nobody will ever look at it.

An RTS inverts that. The camera looks down, so the upward-facing surface of every prop is presented to the player permanently, everywhere, at once.

Put weather on the terrain only and the first snowfall gives you a white ground and summer-brown crates. Two seasons, stacked.

The fix is cheap: project a mask down world Y, gate it on how far each normal points skyward, blend snow or mud over what was there.

Near-zero shader cost. Near-zero art cost. Fixes the one discontinuity an overhead camera can't hide.

Same thinking behind "better soldier lighting". At that distance a rifleman is a smear of pixels. You read how many, facing where, and whose — all from value separation against the ground.

Rim light that looks cheap at head height is load-bearing from above.

Relic shipped the whole pass free on 5 Nov 2026, to a game that launched Feb 2023, while also building a DLC and a spinoff.

A dev told Rock Paper Shotgun it "was a lot". Visible in the notes: somebody there knows which surfaces players actually look at.
