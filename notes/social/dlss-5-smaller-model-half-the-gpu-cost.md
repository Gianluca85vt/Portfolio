## LinkedIn

Nvidia has spent six weeks making DLSS 5 cheaper rather than better, and the number they published on 13 October says a lot about how the September version shipped.

The revised 3D-Guided Neural Rendering model is around 118 million parameters, down roughly 24%. Nvidia says it runs about twice as fast, costs about half the GPU overhead, and uses 20% less VRAM at 4K, with image quality held at a similar level. Those are the company's own figures and nobody outside Nvidia has benchmarked them yet.

What makes them interesting is the arithmetic that does not work. A 24% parameter cut does not double inference speed on its own. Something else moved — layer shapes mapping better onto the tensor cores, lower precision in places, a graph restructured so fewer passes go out to memory. Which means the model that launched in NBA 2K27 on 3 September was not shaped for the hardware it ran on. Get it correct, then get it to fit. Every one of us has shipped a tool that way.

The cost it is climbing out of was real. Tom's Guide, citing PC Gamer, put the frame-rate drop at 50-60%. 91mobiles measured 126.8 fps falling to 41.8 on an RTX 5070 Ti at 4K. TechSpot pointed out that Nvidia's 370 fps marketing slide leans on 6X Multi Frame Generation, with a render rate near 39 fps underneath.

Here is the part that matters for anyone planning a frame budget. Shadow map resolution, screen-space reflections, ray counts — we all carry a rough feel for what those cost in milliseconds. A model's parameter count now sits in that same list. When Nvidia trims 37 million weights to buy back frame time, that is the trade you make dropping a shadow cascade. The difference is that you cannot retrain their model, and until last week the only lever was off.

The updated model hits NBA 2K27 on 16 October, Hogwarts Legacy on 5 November. NBA 2K27 is the one to watch — it is the only title with a September baseline anybody measured.

#gamedev #realtimerendering

## X

Nvidia's revised DLSS 5 model: ~118M parameters, down about 24% from the September version. They claim roughly 2x faster inference, half the GPU overhead, 20% less VRAM at 4K, same image quality. Their numbers, unbenchmarked so far.

The arithmetic doesn't close. Cutting 24% of the weights does not double inference speed. Something else moved: layer shapes fitting the tensor cores better, lower precision somewhere, fewer passes going out to memory.

Which tells you the model that shipped in NBA 2K27 on 3 September was sized at whatever they could get running. Get it correct, then get it to fit. Familiar order of events to anyone who has shipped a tool.

The cost it's escaping was not small. Tom's Guide via PC Gamer: 50-60% frame-rate drop. 91mobiles: 126.8 → 41.8 fps, RTX 5070 Ti at 4K. TechSpot: that 370 fps slide is 6X frame gen over a ~39 fps render rate.

For frame budgeting this is the shift. Shadow resolution, SSR, ray counts — you know what each costs in ms. A parameter count now sits in that list. Trimming 37M weights for frame time is the trade you make dropping a cascade.

Except you can cut your own cascades. You cannot retrain Nvidia's model, and until last week the only lever was off. Updated model lands in NBA 2K27 on 16 October, Hogwarts Legacy 5 November.
