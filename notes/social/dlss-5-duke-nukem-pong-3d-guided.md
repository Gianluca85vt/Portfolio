## LinkedIn

Nvidia's own description of DLSS 5 contains the answer to every "why does this look weird" post about it. The model takes colour and motion vectors per frame, and the photoreal lighting it hands back is anchored to source 3D content. That last phrase is the whole specification.

So I have been watching Valery Kryzhanovsky run it on games that have no 3D content whatsoever. Duke Nukem, the 1991 Apogee platformer, at 320x200 in sixteen EGA colours, via DOSBox with ReShade carrying the injection and RenoDX supplying the parameter UI. Pong, from 1972. His test set runs all the way up to The Witcher 3, but the DOS end is where the interesting failure lives.

Rectangular level tiles come back embossed, so flat faces read as raised surfaces. The pass separates the player sprite, the enemies and the bullets from the background and mostly leaves their interiors alone, which is more silhouette discipline than I expected from something with no depth buffer to read.

But look at what that embossing means. Nothing in Duke Nukem's tile art encodes that a brick protrudes — the artist drew a face, not a volume. The model raised it because bricks are usually raised. It guessed correctly from training data rather than from reading the image, and that distinction is the entire argument about where generative passes belong in a pipeline.

The temporal weakness follows from the same place. Kryzhanovsky's conclusion is that it holds up best on stills and that the missing temporal element is the key drawback. Frame-to-frame consistency in DLSS 5 is bought with motion vectors. DOSBox has never had any to hand over, so every frame forms its own opinion about where the light is.

There is an accidental upside. The pass costs roughly half your frame rate in a modern game, which is why people started offloading it to a second GPU. On 64,000 pixels of EGA it is free. Which makes a 1991 platformer the cheapest honest test bench anyone has for what the weights know — because everything in the output that was not in the input came from them.

I have not run the stack. This is read off published footage and the write-ups.

#gamedev #graphics #techart

## X

Nvidia's DLSS 5 spec says the output is anchored to source 3D content and motion vectors.

Someone has been running it on Duke Nukem (1991, 320x200, 16 EGA colours) and Pong (1972), which supply neither.

The results are not broken. They are revealing.

Valery Kryzhanovsky's stack: DOS games in DOSBox, ReShade carrying the DLSS 5 injection, RenoDX for the parameter UI.

Where you inject matters a lot — render stage, post-upscale, or final output. A pass that truly read the scene would care less where in the chain it sat.

What comes out: rectangular level tiles get embossed, so flat faces read as raised. The pass holds the player, enemies and bullets apart from the background and mostly doesn't scribble inside them.

That's decent silhouette discipline for something with no depth buffer.

The embossing is the tell though. Nothing in Duke Nukem's art encodes that a brick protrudes — the artist drew a face, not a volume.

The model raised it because bricks are usually raised. Right answer, from the weights, not from the image.

Temporal stability dies for the same reason. Frame-to-frame consistency in DLSS 5 is bought with motion vectors, and DOSBox has none.

Kryzhanovsky's own read: best on stills, missing temporal element is the key drawback.

The accidental joke: neural rendering costs ~half your frame rate in a current game, hence the second-GPU offload mods.

On 64,000 EGA pixels it's free. Which makes 1991 the cheapest honest test of what the model knows.
