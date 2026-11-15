## LinkedIn

The original Xbox is 25 years old today, and the anniversary present tells you
more about backward compatibility than any technical post would.

On 12 November Microsoft added 21 original Xbox games to backward
compatibility on PC, taking that library from four titles to 25. Eleven of the
21 are Star Wars games. Both Knights of the Old Republic games, both original
Battlefronts, Republic Commando, Jedi Outcast, Jedi Academy, Jedi Starfighter,
Revenge of the Sith.

One licensor, eleven titles, one afternoon. The other ten came from everywhere
else. Four titles out of 25 got achievement lists, and two of those are
Microsoft's own from the July launch batch. The pattern is rights clearance and
headcount, not emulator performance — which is the dullest possible answer and
almost always the right one.

The technical side is genuinely easy by comparison. The original Xbox was a PC
in a green case: a 733MHz Pentium III derivative, an NVIDIA NV2A between a
GeForce3 and a GeForce4, a modified Direct3D 8. Nothing alien. Its awkward
corners are narrow — the register combiners that did pixel work through fixed
stages, and a unified 64MB pool shared by CPU and GPU.

That 64MB is the part I keep thinking about as an environment artist. Sixty-four
megabytes for framebuffer, textures, geometry, audio and code. Nobody was
choosing between 2K and 4K maps. They were deciding whether a wall got a
256-pixel diffuse at all or got lit into its vertices and left flat.

And the target was a 480-line interlaced television over composite — a free
blur filter that hid DXT1 blocks in sky gradients, lightmap seams and LOD pops.
Put the same binary on a 1440p panel and that filter is gone. The art is exactly
what it always was. You are just seeing it without the thing it was tuned
against.

Which is why this is better reference than a remaster. A remaster repaints the
evidence. Backward compatibility leaves the fingerprints on it.

#gamedev #environmentart

## X

The original Xbox is 25 years old today. Microsoft's present: 21 original Xbox
games added to PC backward compatibility on 12 Nov, taking that library from 4
titles to 25. 11 of the 21 are Star Wars games.

One licensor delivered 11 titles in an afternoon. The other 10 came from
everywhere else. 4 of the 25 got achievement lists, two of them Microsoft's own
from the July launch batch. The bottleneck on BC is paperwork and headcount.

Technically the OG Xbox is the easy console to do this with. It was a PC in a
green case: a 733MHz Pentium III derivative, an NVIDIA NV2A sitting between
GeForce3 and GeForce4, a modified Direct3D 8. x86 in, D3D calls out.

Its hard parts are narrow: the NV2A's register combiners did pixel work through
fixed stages rather than programmable shaders, and the CPU and GPU shared one
64MB pool. Get the combiners wrong and water, glass and shadows come out off.

64MB for framebuffer, textures, geometry, audio and code. Artists weren't
picking 2K vs 4K — they decided whether a wall got a 256px diffuse at all or got
lit into its vertices and left flat. Target display: 480i over composite.

That signal was a free blur filter. It smeared DXT1 blocks in sky gradients, hid
lightmap seams, softened the LOD pop at 12m. On a 1440p panel it's gone, and the
art is unchanged — better reference than any remaster.
[image: shot-01.jpg]
