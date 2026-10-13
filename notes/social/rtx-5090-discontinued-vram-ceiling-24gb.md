## LinkedIn

VRAM is a cliff, not a slope. Every other number on a graphics card is a slope — more cores, higher clocks, a few percent off the render. Memory is the one spec where the scene fits or it does not, and the two sides of that line are nowhere near 20% apart.

Which is why the reports this weekend about the GeForce RTX 5090 land differently at a render box than they do in a gaming headline. Hardware leakers MEGAsizeGPU, hongxing2020 and Zed Wang point to a factory notice dated around 10 October ending RTX 5090 production so Nvidia can route the GB202 die to professional and data centre cards. The same leak says a 24GB RTX 5080 becomes the top GeForce part. Nvidia has confirmed none of it, and it has denied this shape of story before — in January it told partners it continues to supply every GeForce SKU after a near-identical report about the 5070 Ti.

If it holds, the consumer memory ceiling goes 11, 24, 32, and then back down to 24.

Eight gigabytes sounds like a rounding error until you spend it. It is a 4K texture set on your hero assets. It is the cache for a medium Houdini sim. It is the headroom that lets you keep a Cycles viewport alive while something renders behind it. Redshift, Cycles and V-Ray GPU will all spill to system memory rather than fail, and they all crawl when they do, because the traffic leaves the board and goes over PCIe.

The tier above costs four to six times as much. The RTX Pro 6000 Blackwell has 96GB and ECC and is the right tool for it. The 5090 sat in the gap and did most of that job on a freelancer's budget. That is the rung going missing.

Practical version: stop budgeting scenes against the VRAM you expect to be able to buy. Instance more, stream textures, and stop shipping 8K maps on things nobody sees at 8K.

#3D #Rendering #Nvidia

## X

Nvidia has reportedly stopped making the RTX 5090 so the GB202 die can go to pro and data centre cards. Unconfirmed. The number that matters to artists is not the price — it is 32GB, and the replacement flagship is said to be a 24GB 5080.

VRAM is a cliff. Cores and clocks are slopes, where you lose a few percent. Memory is binary: the scene is resident on the card or it is not, and crossing that line costs far more than 20%.

Renderers mostly spill rather than die. Redshift was built around out-of-core, Cycles falls back to host memory, V-Ray GPU copes. All slow down hard, and not in proportion: a scene 1GB over can lose much of its speed, because what got evicted is what you keep touching.

8GB in practice: a 4K texture set on hero assets. A medium sim cache. The headroom to leave a Cycles viewport running during a background render. On 32GB those are not decisions. On 24GB they are.

The tier above costs four to six times as much. RTX Pro 6000 Blackwell: 96GB, ECC, the right tool for a heavy scene. The 5090 did most of that job at a quarter of the price. That is the rung disappearing from the ladder.

Caveat worth keeping: three leakers and a factory document is more than usual, and still not a statement from Nvidia. It denied an identical story about the 5070 Ti in January. Specify machines around what you can buy, not what you hope to buy.
