## LinkedIn

AMD and Microsoft have announced FSR 4.1 for the Xbox Series X and Series S. Both machines are RDNA 2. Neither has a single matrix unit in it.

That is the part worth sitting with, because it decides what this feature actually costs the people shipping on those boxes.

On a desktop RDNA 4 card, FSR 4.1 runs its model in FP8 on silicon designed to do that work. RDNA 2 has no FP8 path, so AMD built a separate INT8 version that executes on the general-purpose shader units — the same units that are shading your pixels. Upscaling stops being overhead on the side and starts competing with the frame.

The PC measurements give you a sense of scale. ComputerBase had FSR 4 INT8 landing roughly 9 to 13 per cent below FSR 3.1 at the same Quality preset on an RX 6800 XT and an RX 7800 XT. GameGPU put the spread at 10 to 20 per cent depending on the scene. In Cyberpunk 2077 at 4K with ray tracing, reported figures have the uplift over native at 168 per cent where the older upscaler managed 200. You stay well ahead of native. You hand some of the win back to pay for the model.

A console is a fixed target with a hand-tuned compiler, and Microsoft says its engineers have been on this optimisation with AMD, so the console number may land better. Nobody has published it.

Series X has 52 compute units. Series S has 20. An upscaler costing a tenth of your GPU is a very different proposition on each, and somebody has to do that arithmetic per title on the weaker one.

Two other things. Nothing is injected at system level — developers implement it, which means the back catalogue mostly will not see it. And AMD's desktop roadmap has RDNA 2 getting FSR 4.1 in early 2027, while the console is simply "coming soon". Those two statements do not obviously fit together, and neither company has explained it.

#gamedev #graphics

## X

AMD is bringing FSR 4.1 to Xbox Series X and Series S. Both are RDNA 2. Neither has matrix units. So where does a neural upscaler run? On the shader cores — the ones already shading your pixels.

On RDNA 4 the model runs in FP8 on dedicated silicon. RDNA 2 has no FP8 path, so AMD built a separate INT8 version that executes on general-purpose compute. Upscaling stops being free overhead and becomes a line item in the frame budget.

How big? ComputerBase measured FSR 4 INT8 at roughly 9-13% below FSR 3.1 Quality on RX 6800 XT and 7800 XT. GameGPU saw 10-20% by scene. Cyberpunk 2077 at 4K with RT: 168% over native, where the older upscaler managed 200%.

Those are desktop numbers on desktop drivers. A console is a fixed target with a hand-tuned compiler, and Microsoft says its engineers worked this optimisation with AMD. The console figure could land better. It has not been published.

Series X: 52 CUs. Series S: 20 CUs and about 4 TFLOPS, chasing a 1440p target it has never comfortably hit. A tenth of your GPU buys you something different on each box, and the sums get done per title.

No system-level injection on console — developers integrate it per game. Reopening a certified branch for a title living on sale weekends is a real cost, so most of the catalogue will skip it. Project Helix gets FSR Diamond instead.
