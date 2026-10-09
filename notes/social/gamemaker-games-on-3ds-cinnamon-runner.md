## LinkedIn

Export a game from GameMaker: Studio and you do not get a native executable with your logic inside it. You get bytecode, plus a stock interpreter — the YoYo runner — whose job is to read it at runtime. Which means the bytecode in a shipped GameMaker title will run on any runner that speaks the same version of it.

Butterscotch is an open-source reimplementation of that runner. Cinnamon forks it for old Nintendo hardware: 3DS, Wii U, Wii, GameCube listed as future work. Project Sunshine has been using it to put Undertale and Deltarune on consoles that never saw either.

The interpreter is the easy half. Asset conversion is where a 3DS starts saying no.

Cinnamon does not read textures off the game's data file on the console. A host-side tool runs on a desktop and writes a converted bundle: atlas pages, a packed sprite blob with seek metadata, a sound bank, streamed music. The format choices inside it are the kind of per-page decision most pipelines never bother to make.

It defaults to a hybrid atlas. Sprite and background pages stay at rgba5551, sixteen bits a pixel. Other pages compress to etc1a4 — four bits of colour plus a four-bit alpha plane, block-compressed.

That asymmetry costs real memory, and it is correct. Block compression approximates each block of pixels with a pair of endpoint colours. Feed it a photograph and you will struggle to see the damage. Feed it hand-drawn pixel art, where every edge is a deliberate one-pixel transition between two unrelated colours, and it smears exactly what the artist spent their time on. Outlines go muddy.

Audio takes the opposite ruling: music re-encoded to 4-bit ADPCM, because the sound hardware plays that back without spending CPU.

Same logic both times, and it is the logic of every constrained pipeline I have worked inside. Find the one channel the audience is scrutinising, protect it, let the rest take the hit.

#gamedev #techart

## X

GameMaker: Studio does not export your code as machine code. It exports bytecode, read at runtime by a stock interpreter. So it runs on any runner speaking the same version — the gap Butterscotch, an open-source reimplementation of the YoYo runner, climbed into.

Cinnamon forks Butterscotch for old Nintendo hardware: 3DS, Wii U, Wii, GameCube planned. It handles bytecode versions 16 and 17. Anything compiled with YYC or GMRT ships native code and is off the table — Forager, Hyper Light Drifter, Rivals of Aether.

The interpreter is the easy half. Assets are where a 3DS says no. Conversion runs ahead of time on a desktop: atlas pages, a packed sprite blob with seek metadata, a sound bank, streamed music. Every cycle spent packing a texture is one the console does not have.

The default is a hybrid atlas. Sprite and background pages stay rgba5551, 16bpp. Other pages compress to etc1a4: 4 bits of colour plus a 4-bit alpha plane, block-compressed. Doubling the sprite pages is a deliberate concession.

Because block compression approximates each block with two endpoint colours. Photographs survive it. Pixel art does not — every edge is a deliberate one-pixel jump between unrelated colours, which is exactly what gets smeared. Outlines go muddy.

Audio goes the other way: Vorbis re-encoded to 4-bit ADPCM, so the sound chip plays it without CPU cost. Protect what people scrutinise, let the rest take the hit. Note: Undertale runs on real 3DS hardware; the showcase's Pizza Tower is a 2019 demo under emulation.
