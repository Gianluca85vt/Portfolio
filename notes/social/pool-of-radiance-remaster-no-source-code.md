## LinkedIn

SNEG put a 2001 Dungeons & Dragons RPG on Steam last Friday without a single
line of its source code.

Pool of Radiance: Ruins of Myth Drannor, built by Stormfront Studios and
published by Ubi Soft, has never been sold digitally anywhere. No source, no
build tools, no documentation survived. What SNEG had was the international
retail discs, so the team worked back from the shipped binary until it
understood enough to change the engine from the inside.

Having got that far, they stayed on the 2001 engine rather than port the game.
Anyone who has inherited an undocumented pipeline will recognise why: porting
means re-authoring every format you do not understand, and the legacy build
already understands all of them.

The hardest piece was not rendering. It was building an internal API to reach
data buried deep in the original code — stats, inventory, party state, map
information, all sitting at offsets somebody chose in 1999 and wrote down
nowhere. You establish by inspection where an inventory lives in memory and
what shape it is, then wrap that in something stable enough for the rest of the
work to depend on. Get it right and the modern features become tractable. Get
it wrong and every new panel is a separate archaeology project.

On top of it: a new interface in Dear ImGui, which draws whatever state you
hand it frame by frame with no retained widget tree to keep in sync. For two
people working inside someone else's executable, that is the whole appeal.

For sharpening they used AMD FSR 1.0 and left the original artwork untouched.
FSR 1.0 is the spatial one — no motion vectors, no temporal history — and it is
the only upscaler you can drop into a renderer you did not write. The modern
ones need depth and velocity from inside the engine, which is exactly what a
binary will not give you.

Upscale the frame and you get the original intent, larger. Repaint the assets
and you get somebody in 2026 guessing what a Stormfront artist meant.

#gamedev #preservation #3D

## X

SNEG shipped a 2001 D&D RPG on Steam on 6 November with 4K and a new UI, and it
never had the source code. No build tools either. It worked back from the
retail discs until it could change the engine from inside the binary.

Having done the reverse-engineering, they stayed on the 2001 engine instead of
porting. Porting means re-authoring every format you don't understand. The
legacy build already understands all of them.

The hardest part wasn't rendering. It was building an internal API to reach data
buried in the original code — inventory, party state, maps — all at offsets
someone picked in 1999 and documented nowhere.

New UI is Dear ImGui: it draws whatever state you hand it each frame, no
retained widget tree to sync against the game. Exactly the right property when
you're a two-person team working inside someone else's executable.

Sharpening is AMD FSR 1.0, with the original art untouched. FSR 1.0 is spatial
only — no motion vectors, no temporal history — and it's the one upscaler you
can bolt onto a renderer you didn't write. DLSS and the rest need engine-side
depth and velocity.

Which is the honest outcome anyway. Upscale the frame and you get the 2001
intent at a larger size. Repaint the textures and you get a 2026 artist
guessing what a Stormfront artist meant.
