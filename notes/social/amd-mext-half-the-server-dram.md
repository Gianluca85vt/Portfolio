## LinkedIn

Sixty to ninety per cent of a large-memory server's cost can be the memory
itself. That is AMD's own figure, and it explains why the company bought a
software startup in June instead of buying more DIMMs.

MEXT is the result, and AMD detailed the rollout yesterday: keep up to 99% of a
full-DRAM machine's performance while running as little as a quarter of the
physical DIMMs. Cold pages get pushed to NVMe flash, an AI engine watches the
access pattern and tries to pull them back before anything asks, and the OS
still reports the memory as installed. Flash is roughly 50x cheaper per bit
than DRAM and 30x lower power per bit. It is also about 500x slower, so the
whole product is prediction quality and nothing else.

The justification is a Meta paper finding 50 to 80% of memory pages untouched
for five minutes or more. For a database with a long tail of rarely read rows,
fine. From an artist's desk, five minutes is not cold. It is the gap between a
comp render finishing and scrubbing back to frame one, or a Houdini cache
sitting idle before you drag the timeline and ask for ninety gigabytes of it at
once, in order, now. MEXT wants a working set touched sparsely and predictably.
A 3D pipeline touches a huge one rarely and then all at once.

The headline number came from AMD's IT department running Synopsys PrimeTime —
static timing analysis, enormous, mostly read-only, repeating traversal. If you
were picking a workload to flatter a page predictor, you would pick something
very like it.

Two things worth watching. There is no workstation version and AMD does not
claim one: EPYC, rack-mounted, licensed per server, wants a spare NVMe bay. And
the Linux driver is closed-source, from the company that spent a decade making
open drivers its calling card, in the one layer a farm admin needs to read when
a node stalls at 03:00.

#hardware #vfx #gamedev

## X

AMD says it can hold 95% of a server's performance on half the DRAM. The trick
is paging cold memory out to NVMe and using a model to guess what you'll need
before you ask. Flash is 500x slower than DRAM, so the product is entirely
prediction quality.

AMD bought MEXT on 15 June 2026. Pitch: up to 99% of full-DRAM performance with
as little as 25% of the physical DIMMs installed. The OS still sees the missing
memory as present. Flash is ~50x cheaper per bit and ~30x lower power per bit.

The justification is a Meta paper: 50-80% of memory pages untouched for five
minutes or more, even on a server reporting 95% utilisation. Smerdon's line is
"five minutes to Epyc is an eternity."

Five minutes is not cold on an artist's machine. It's the gap before you scrub
a comp back to frame one, or drag a timeline and ask for 90GB of Houdini cache
at once, in order, now. Rarely then all-at-once is the pattern a predictor
can't win.

The 95% figure is AMD's IT dept running Synopsys PrimeTime. Static timing
analysis: huge, mostly read, repeating traversal. Close to the best case for a
page predictor. Nobody has published a MEXT number on a workload that thrashes.

No workstation version, and AMD isn't pretending otherwise — EPYC, rack-mount,
licensed per server, wants a spare NVMe bay. The Linux driver is closed-source,
which is a strange choice for the layer sitting under your memory map.
