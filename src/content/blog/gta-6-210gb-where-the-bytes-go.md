---
title: "GTA 6 is 210GB on PS5: where the bytes go"
date: 2026-10-28
category: Games
excerpt: Rockstar hasn't confirmed it. Phantom Blade Zero wants 300GB free to install 145GB. Both numbers come from the same shift in what a build assumes about disk.
cover: /img/blog/gta-6-210gb-where-the-bytes-go/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/gta-6-ps5-download-size
  - outlet: GamesRadar
    url: https://www.gamesradar.com/games/grand-theft-auto/gta-6-is-a-210gb-download-says-playstation-store-sleuth/
  - outlet: TwistedVoxel
    url: https://twistedvoxel.com/phantom-blade-zero-pc-system-requirements/
  - outlet: Kotaku
    url: https://kotaku.com/gta-6s-expectedly-massive-file-size-has-been-revealed-2000750298
artistView:
  take: "Install size is an output of art decisions. How much of a world is authored unique rather than tiled, how many channels a material carries, how many shader permutations a platform has to be handed — those choices get added up and printed on a store page as one number, and 210GB says Rockstar kept authoring uniqueness where most open worlds learned to repeat."
  works:
    - "Pipeline: a mandatory SSD lets the streaming budget go into world detail instead of into hiding loads, and from the footage published so far both of these builds spend it there."
    - "Packaging: the ten gigabytes Phantom Blade Zero saves on PS5 against its PC build is a clean demonstration of what one fixed GPU target and one hardware decompressor are worth."
  misses:
    - "Storage: asking for 300GB free to land a 145GB game is honest about how installers work and brutal on a console-sized drive. In-place and staged unpacking both exist, and almost nobody ships either."
---

A tracker that watches the PlayStation Store's back end put Grand Theft Auto VI
at **210GB** on PS5 this week. GamesRadar ran the figure as unconfirmed, which is
the right call: it came from PlayStation Game Size rather than from Rockstar,
and Rockstar has published no install number at all. Kotaku reports that
Insider Gaming's own sources match it. So — very likely, not yet official, and
worth writing down before launch day so it can be checked against the real
thing on 19 November.

The sharper number arrived from the other end of the same week. S-GAME's
Phantom Blade Zero, out this week and reviewed on Monday, is 145GB on Steam and
asks you to keep **300GB** free to install it.

That second figure is the one worth explaining, because it is a plain
consequence of how installers work and it keeps getting read as greed.

## Why 145 becomes 300

The installer does not unpack in place. What you download is a compressed
package. What you play is the unpacked game. For as long as the unpacking runs,
both of those sit on the drive together, and only when the write finishes does
the package get dropped. Double, plus change for the files being assembled, is
exactly the shape you would predict.

Anyone who has synced a large Perforce depot onto a fresh workstation has met
the same wall from the other side. The size a build is and the size a build
needs while it lands were never the same number.

<figure>
  <button class="video-embed" data-video="wSm9GTUttBs" data-title="GTA 6 (Grand Theft Auto 6) - Official Extended Gameplay" type="button">
    <img src="/img/blog/gta-6-210gb-where-the-bytes-go/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from Grand Theft Auto VI: An Extended Look" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>IGN's upload of Rockstar's 26-minute Extended Look, which is what 210GB of Leonida looks like in motion. Rockstar's own copy of the same video is age-restricted and will not play outside YouTube.</figcaption>
</figure>

## Where the gigabytes live

Textures, mostly. Count, more than resolution.

A PBR surface is not one image. Albedo, a normal map, then roughness, metal and
ambient occlusion usually packed into the three channels of a single map, and
sometimes height on top of that. Three or four textures per material before
anyone has argued about whether they are 2K or 4K. Each one carries a mip
chain, which adds roughly a third again on top of the base level, because the
renderer needs every smaller version precomputed rather than generated at
runtime.

So the budget question is how many unique materials a world contains, and
whether a given wall is one tiling material used four hundred times or an
authored one-off. Tiling is cheap on disk and shows its repeats. Uniqueness is
expensive on disk and reads as a place somebody built. Rockstar's house style
has always sat at the expensive end, and a Leonida with hand-placed signage,
graffiti, rust and shopfront clutter is a lot of one-offs.

Audio takes a serious share of the rest. Full voice performance, in several
languages if the game ships them, and in GTA's case radio stations full of
licensed music. Speech compresses well. Mastered music does not, and nobody
ships a radio station at a bitrate that makes the licensing look silly.

## The ten gigabytes between PC and PS5

Phantom Blade Zero is reported at roughly 134.9GB on PS5 against 145GB on
Steam. Same game, same week, about seven percent apart. That gap is the cost of
shipping to hardware you have not met.

- One GPU family versus several. A console build can bake shader permutations
  for one driver and ship them; a PC build either carries caches for multiple
  vendors or compiles on first run, and usually does some of both.
- One decompressor versus many. The PS5 has the block in silicon, so packaging
  can be tuned to the thing that will do the unpacking. A PC build is tuned to
  an unknown CPU.

Neither of those is a flaw in the PC version. It is what portability costs, and
seven percent is a fair price for it.

## The SSD requirement is the change

Both games require an SSD, at minimum and at recommended spec alike, and that
line does more work than the install figure does. Once a streaming system can
assume hundreds of megabytes a second off local disk, the old reasons to keep a
build small stop paying for themselves. Aggressive reuse, instancing, proxy
meshes, corridor geometry built to hide a load behind a door — a good share of
that was disk budget wearing a level-design hat.

Disk is now the cheapest thing in the build. So builds spend it, and the
install grows because nothing is being set aside to hide the load any more.

Which is also the reason GTA's performance argument lives somewhere else
entirely. The case that
[a locked 60 is unlikely on PS5 and PS5 Pro alike](/blog/gta-6-extended-look-30fps-question/)
rests on simulation work sitting on a CPU that the Pro barely improved. Storage
and frame rate are separate bills from the same ambition.

Square Enix already walked into the other end of this arithmetic: it put FF7
Revelation on
[a single Blu-ray you cannot play until the download finishes](/blog/ff7-revelation-one-disc-mandatory-download/).
A 100GB disc stopped being able to hold a game of this size a while ago, and
the physical edition of GTA 6 is reported to be a download code in a box.

A 1TB PS5 gives you something like 825GB to use. At 210GB plus whatever the
day-one patch weighs, Rockstar is asking for a quarter of it.
