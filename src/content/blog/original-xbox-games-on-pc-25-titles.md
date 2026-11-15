---
title: "Original Xbox on PC: 21 games, mostly Star Wars"
date: 2026-11-15
category: Tech
excerpt: Xbox put 21 more original Xbox games on PC on 12 November. Eleven are Star Wars, four finally have achievements, and your discs are still worthless.
cover: /img/blog/original-xbox-games-on-pc-25-titles/shot-01.jpg
sources:
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/21-original-xbox-games-are-now-on-pc-via-backward-compatibility/
  - outlet: Neowin
    url: https://www.neowin.net/news/microsoft-brings-21-more-og-xbox-games-to-pc-and-finally-adds-achievements/
  - outlet: heise online
    url: https://www.heise.de/en/news/Xbox-backward-compatibility-21-more-original-Xbox-games-come-to-PC-11523831.html
artistView:
  take: "Backward compatibility runs the shipped executable, so the art arrives exactly as it was authored for a 64MB machine and a standard-definition television. That fidelity is the whole value of the thing, and it is also why these games look worse on a good monitor than they do in your memory."
  works:
    - "Preservation: running the original binary keeps the art as authored — vertex lighting, lightmaps baked into geometry, DXT1 blocks and all. For anyone studying how 2002 environments were assembled, these builds are better primary evidence than any remaster, because a remaster overwrites the evidence."
    - "Scope: four titles with achievements rather than twenty-five is the honest shape of per-title work. Retrofitting unlock conditions into a game that was built without a hook for them means finding the state changes in someone else's binary, one at a time."
  misses:
    - "Presentation: art authored for 480i on a CRT gets no help from a 1440p panel. Composite output was a free blur filter, and it hid compression blocks in gradients, LOD pops and the seams where lightmaps met. All of that is now the first thing you see."
    - "Curation: the catalogue's shape follows rights clearance, not technical interest. The Xbox's most instructive rendering work is not necessarily what arrives next, because what arrives next is whatever a lawyer signs off."
    - "Access: no disc support. A shelf of original Xbox games buys you nothing here — it is a digital licence or an eligible Game Pass tier, on Windows 11, in supported markets only."
draft: true
---

The original Xbox turned 25 today. It went on sale in North America on 15
November 2001, and Europe had to wait until March 2002, which is why a lot of
us met it secondhand and late.

Microsoft marked the anniversary three days early. On 12 November it added 21
original Xbox games to backward compatibility on PC, taking that library from
four titles to 25 — twenty-five games for twenty-five years, which is the sort
of symmetry a marketing calendar produces and I am not going to pretend it
isn't satisfying.

Eleven of the 21 are Star Wars games. Both *Knights of the Old Republic*
games, both original *Battlefront* games, *Republic Commando*, *Jedi
Outcast*, *Jedi Academy*, *Jedi Starfighter*, *Revenge of the Sith*. Outlets
do not agree on the count — most say eleven, at least one says thirteen, and
nobody has published the full list of 21 in a form I could check line by
line. Call it somewhere between half and two thirds of the batch coming from
a single licensor.

<figure>
  <button class="video-embed" data-video="sfmQhFj-pz0" data-title="Microsoft Announces Xbox Backward Compatibility on PC - IGN Daily Fix" type="button">
    <img src="/img/blog/original-xbox-games-on-pc-25-titles/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from IGN's Daily Fix segment on Xbox Backward Compatibility coming to PC" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>IGN's Daily Fix on the programme itself, from the July launch rather than this week's expansion. It is the clearest short explanation of what the PC side actually is, including the handheld angle.</figcaption>
</figure>

## The list is a rights list

That Star Wars number is the most informative thing in the announcement.

Twenty-five games in four months, from a library of roughly a thousand, is a
story about who holds what. One deal with one licensor delivered eleven titles in a single afternoon. The
other ten came from everywhere else.

You can read the same shape in the achievements. Four of the 25 now have
them: both *Knights of the Old Republic* games, plus *BLiNX: The Time
Sweeper* and *Conker: Live and Reloaded* — two Microsoft-owned titles that
were already in the programme's launch batch in July, alongside *Crimson
Skies: High Road to Revenge* and *Fuzion Frenzy*. Achievements did not exist
until the 360, so there is no hook in a 2002 binary to hang them on. Somebody
has to go find the state changes that mean "you finished the level" inside
compiled code they did not write. That is per-title engineering, and it got
spent on titles Microsoft owns outright or has a clean licence to.

So the bottleneck on backward compatibility is paperwork and headcount, which
is the least interesting answer available and almost always the correct one.

## The Xbox is the easy console to do this with

If you are going to run twenty-five-year-old console games on a Windows PC,
the original Xbox is the one you want.

It was a PC wearing a green case. A 733MHz Intel CPU derived from the Pentium
III, an NVIDIA GPU — the NV2A — sitting somewhere between a GeForce3 and a
GeForce4, and a graphics API that was a modified Direct3D 8. x86 instructions
in, D3D calls out. Nothing about that is alien to the machine you are reading
this on.

Compare it to the PS3. The Cell processor's SPEs were a genuinely unfamiliar
architecture, and the games that got the most out of it were written hard
against its specific shape — [Metal Gear Solid 4 was designed around the limits
of the PS3's disc drive](/blog/mgs-master-collection-2-review/) rather than
despite them. A game fitted that tightly to one machine does not lift off it
cleanly. The Xbox has no equivalent problem. Its hard parts are narrower: the NV2A's register combiners, which did pixel work
through a fixed-stage setup rather than the programmable shaders we think in
now, and a unified memory model where the CPU and GPU shared one 64MB pool.
Get the combiners wrong and water, glass and shadows come out subtly off —
which is where accuracy work in original Xbox emulation has always
concentrated.

And none of it needs source code. Backward compatibility runs the retail
binary. That is a real advantage over the restoration route, where
[SNEG had to reverse-engineer a 2001 D&D game off its own retail discs](/blog/pool-of-radiance-remaster-no-source-code/)
before it would boot on a modern OS. Microsoft does not have to understand
the game. It has to understand the hardware the game expects.

## Sixty-four megabytes, and a television

Here is the part that matters if you make environments for a living.

Sixty-four megabytes was the budget for everything. Framebuffer, textures,
geometry, audio, game code, all of it, in one pool. Artists working on these
titles were not choosing between a 2K and a 4K texture; they were deciding
whether a wall got a 256-pixel diffuse map at all, or whether it could be
lit into its vertices and left flat. Lightmaps were baked and packed hard.
Normal maps existed on the platform — *Halo 2* used them — but sparingly, on
hero surfaces.

And the target display was a 480-line television, usually interlaced, usually
over composite. That signal was a free blur filter sitting between the art
and the viewer. It smeared DXT1 compression blocks in sky gradients. It hid
the seam where one lightmap chart met the next. It softened the LOD pop at
twelve metres into something you felt rather than saw.

Put that same binary on a 1440p IPS panel and the filter is gone. The art is
precisely what it always was; you are seeing it without the thing it was tuned
against. I find this genuinely useful. A
remaster repaints the evidence; backward compatibility leaves the fingerprints
on it, and you can go and read how somebody solved a corridor in 2002 with
four textures and no shadows.

## The Morrowind joke

*The Elder Scrolls III: Morrowind* is in the 21.

Which means the version of *Morrowind* Microsoft is now shipping on PC is the
Xbox port — a console build cut to fit that 64MB pool, with no mod support, of
a game that came out on PC in 2002 and has had a modding community larger than
most studios ever since. The uncompromised version has been one click away for
twenty-four years.

That is what happens when the unit of preservation is the shipped console
binary rather than the game.
*TimeSplitters 2* is in the list too, and for Free Radical's shooter this is
the closest thing to a proper PC release it has ever had, so the same rule
cuts both ways on the same day.

The requirements, for anyone counting: Windows 11, supported markets only, and
a digital licence or an eligible Game Pass subscription. You cannot put a disc
in a PC. Microsoft says more titles and more achievement lists are coming.
