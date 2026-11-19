## LinkedIn

Rockstar published GTA 6's resolution table the day before launch, and it is the most useful technical document the studio has put out in years.

PlayStation 5: native 1440p, upscaled to 4K, using Rockstar's own TAA.
Xbox Series X: the same.
PlayStation 5 Pro: also native 1440p to 4K, reconstructed with PSSR2.
Xbox Series S: 720p to 1080p with FSR 4.

Look at the third line. A mid-generation console with a substantially larger GPU renders at exactly the same base resolution as the machine it is meant to outclass. Normally that extra compute shows up as pixels, or as frames. Here it shows up as neither.

That is the answer to the 60fps argument, written in numbers rather than in a statement. If the GPU had been setting the frame budget, the base PS5 would have landed under 1440p and the Pro over it. They match because neither is waiting on the GPU. They are both waiting on the simulation, and the Pro's CPU is the same Zen 2 part clocked a little higher — Digital Foundry puts the gap at around seven per cent. Seven per cent more CPU does not buy a hundred per cent more frames.

So the Pro's headroom went into PSSR2 doing a better reconstruction job, and into ray-traced shadows. On a frame this simulation-bound that is the correct call.

The part I keep thinking about is the cost on the content side. Rockstar built a physically-based material library for this game, and that library now has to survive being resolved three different ways. TAA, PSSR2 and FSR 4 fail differently — thin geometry, foliage, fine specular detail all smear or shimmer in their own way under each, and a fix for one teaches you nothing about the other two. Four consoles, three validation passes, one of them starting from 720p.

Rockstar has also ruled out a 60fps mode in future patches, which breaks the GTA V and RDR2 habit. That says the tick rate is structural, not a setting somebody unlocks later.

#gamedev #realtime #techart

## X

Rockstar published GTA 6's resolution table on 18 Nov. PS5: native 1440p to 4K. PS5 Pro: also native 1440p to 4K. A mid-gen console with a far bigger GPU renders at the same base resolution as the machine it outclasses.
[image: shot-01.jpg]

If the GPU were setting the frame budget, base PS5 would sit below 1440p and Pro above it. They match because neither is GPU-bound. Both wait on the simulation, and the Pro's CPU is the same Zen 2 part clocked slightly higher.

Digital Foundry puts that CPU gap at roughly 7%. Seven per cent more CPU does not buy a hundred per cent more frames. Which is why Rockstar says the Pro cannot manage 60fps or 40fps, and why no patch is coming for current-gen consoles.

So the Pro's GPU headroom went into PSSR2 reconstruction and ray-traced shadows instead, at an unchanged 1440p. On a frame this simulation-bound, that is where the silicon can actually help.

The content-side cost: Rockstar's physically-based material library has to survive three reconstruction paths. TAA, PSSR2, FSR 4. Each smears thin geometry and fine specular its own way. Four consoles, three validation passes, one starting at 720p.

Ruling out 60fps in future patches breaks the GTA V and RDR2 habit. The tick rate is structural, not a setting somebody unlocks later. PC stays unmentioned, and it is now the only place this world could run at 60.
