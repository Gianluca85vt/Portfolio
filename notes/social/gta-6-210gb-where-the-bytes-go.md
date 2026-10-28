## LinkedIn

A tracker reading PlayStation Store's back end put Grand Theft Auto VI at 210GB on PS5 this week. Rockstar has confirmed nothing, so treat it as likely rather than official. The number I keep thinking about came from the other end of the same week: S-GAME's Phantom Blade Zero is 145GB on Steam and asks you to keep 300GB free to install it.

That one is a plain consequence of how installers work. An installer doesn't unpack in place — you download a compressed package, you play the unpacked game, and for the length of the write both of them live on the drive at once. Double plus change. Anyone who has synced a big Perforce depot onto a fresh workstation has hit the same wall from the other side.

Where does the install itself go? Textures, mostly, and count matters more than resolution. A PBR surface isn't one image: albedo, normal, then roughness/metal/AO packed into three channels of one map, sometimes height on top. Three or four maps per material before anyone argues about 2K versus 4K, each carrying a mip chain that adds about a third again. So the real budget question is how many unique materials a world holds — whether a wall is a tiling material used four hundred times or an authored one-off. Tiling is cheap on disk and shows its repeats. Uniqueness costs disk and reads as a place somebody built. Rockstar has always sat at the expensive end.

The line doing the most work in both spec sheets is the mandatory SSD. Once a streaming system can assume hundreds of megabytes a second off local disk, the old reasons to keep a build small stop paying: instancing, aggressive reuse, proxy meshes, corridors built to hide a load behind a door. A lot of that was disk budget wearing a level-design hat. Disk is the cheapest thing in the build now, so builds spend it.

Worth noting Phantom Blade Zero lands at about 134.9GB on PS5 against 145GB on PC. Seven percent is what portability costs you.

#gamedev #3D #realtime

## X

Grand Theft Auto VI is reported at 210GB on PS5 — from a PS Store back-end tracker, not from Rockstar. The number I find more interesting: Phantom Blade Zero is 145GB on Steam and wants 300GB free to install.

Why 145 becomes 300: the installer doesn't unpack in place. Compressed package in, unpacked game out, both on the drive until the write finishes. Double plus change. Same wall you hit syncing a large Perforce depot onto a fresh workstation.

Where an open-world install goes: textures, and count beats resolution. A PBR surface is 3-4 maps — albedo, normal, packed roughness/metal/AO, sometimes height — each with a mip chain adding ~a third on top.

So the budget question is how many UNIQUE materials a world holds. Tiling is cheap on disk and shows its repeats. Authored uniqueness costs disk and reads as a place somebody built. Rockstar has always paid for the second one.

The mandatory SSD matters more than either number. Once streaming can assume hundreds of MB/s off disk, instancing and proxy meshes and corridors-that-hide-a-load stop paying for themselves. A lot of that was disk budget wearing a level-design hat.

Phantom Blade Zero: ~134.9GB on PS5, 145GB on PC. One GPU family and one hardware decompressor versus an unknown machine. Seven percent is a fair price for portability.
