---
title: "AMD MEXT: half the server DRAM, not your desktop"
date: 2026-11-11
category: Tech
excerpt: AMD says MEXT holds 95% of server performance on half the DRAM by paging to flash. It is EPYC-only, closed-source, and the relief for artists is indirect.
cover: /img/blog/amd-mext-half-the-server-dram/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/pc-components/cpus/amd-shares-how-it-can-retain-95-percent-of-server-performance-with-just-half-the-dram-sidestepping-memory-shortages-with-mext-tech-powers-over-100-servers-already-running-with-plans-to-expand-to-2-000-servers-in-2027
  - outlet: The Register
    url: https://www.theregister.com/systems/2026/11/11/amd-where-were-going-we-dont-need-as-much-dram/5308953
  - outlet: Phoronix
    url: https://www.phoronix.com/news/AMD-MEXT
artistView:
  take: "MEXT is a page predictor sold as a memory upgrade, and the workload AMD benchmarked it on — Synopsys static timing analysis — is close to its best case: enormous, mostly read, touched in patterns a model can learn. Nothing in a 3D pipeline behaves like that."
  works:
    - "Economics: on AMD's own numbers memory is 60 to 90% of a large-memory server's bill, so trading DRAM for flash at 50x cheaper per bit is the right place to attack the cost."
    - "Power: 30x lower power per bit on the offloaded tier is a real saving for anyone running a farm where the electricity bill is a line item, not a rounding error."
  misses:
    - "Latency: flash is 500x slower than DRAM, so the whole product rests on the prediction landing. A miss on an interactive workload is a stall somebody watches happen."
    - "Transparency: the Linux driver is closed-source, which is a strange thing to ship in the one layer a farm admin most needs to be able to audit."
    - "Scope: EPYC servers with a MEXT Ready badge and a dedicated NVMe bay. There is no workstation story here at all, and AMD is not pretending there is."
draft: true
---

Sixty to ninety per cent. That, on AMD's own telling, is how much of a
large-memory server's cost can sit in the memory alone — and it is the number
that explains why the company spent money in June on a software startup
instead of on more DIMMs.

AMD bought MEXT on 15 June 2026. On 11 November it explained what it intends to
do with it, and the pitch is blunt: keep up to 99% of a full-DRAM machine's
performance while running as little as a quarter of the physical DIMMs.

The mechanism is a page file with a model attached. Cold memory pages get
pushed out to NVMe flash; an AI engine watches the access pattern and tries to
fly them back into DRAM before anything asks. To the operating system the
missing memory still reads as installed. Gary Smerdon, who ran MEXT before the
acquisition and is now a corporate vice president at AMD, puts the trade in
three numbers: flash is about 50 times cheaper per bit than DRAM, about 30
times lower power per bit, and about 500 times slower.

That last figure is the entire product. Everything else is prediction quality.

## The five-minute argument

<figure>
  <img src="/img/blog/amd-mext-half-the-server-dram/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>DDR5 server and desktop memory modules, via Wikimedia Commons</figcaption>
</figure>

Smerdon's justification for why this works at all is a Meta research paper he
cites, which found that between 50 and 80% of memory pages had gone untouched
for five minutes, ten minutes, or longer. Even on a server reporting 95%
memory utilisation, most of what is "in use" is not being used. "Five minutes
to Epyc is an eternity," he told The Register.

For a database holding a long tail of rarely-read rows, that is obviously
true. Sit with it from an artist's desk for a second, though, and five minutes
stops meaning cold.

Five minutes is a coffee. It is the gap between a comp render finishing and you
scrubbing back to frame one to check the roto. It is how long a Houdini sim
cache sits idle before you drag the timeline and ask for ninety gigabytes of it
at once, in order, immediately. The access pattern that makes MEXT look good is
a large working set touched sparsely and predictably. The access pattern in a
3D pipeline is a large working set touched rarely and then all at once, which
is the case a predictor cannot win — by the time it knows, you already needed
everything.

## What AMD actually measured

The headline figure comes from AMD's own IT department running Synopsys
PrimeTime at 95% of full-server performance on half the DRAM. PrimeTime is
static timing analysis on chip designs. Huge dataset, overwhelmingly read-only,
traversed in ways that repeat. If you were choosing a workload to flatter a
page predictor you would choose something very like it.

It is a real measurement of a real tool AMD runs a lot of. It is also one
workload, measured in-house, and nobody has yet published a MEXT result on
something that thrashes.

The deployment is small and honest about being small: 145 internal servers
today, a stated plan for 2,000 during 2027, and an HPE partnership to sell it
to customers. Smerdon reckons those 145 machines have already avoided about
$5 million in DRAM purchases. Phase one is 6th Gen EPYC "Venice" boxes
carrying a MEXT Ready badge and a dedicated NVMe drive or bay for the offload.
Phase two brings the licences and a monitoring app called RAM View. So this is
a paid add-on to a server you buy, not a feature of a chip you own.

## Nothing here is coming to your machine

There is no workstation story, and AMD does not claim one. This is EPYC,
rack-mounted, wanting a spare NVMe bay, licensed per server.

Phoronix flagged the part that should bother anyone running a farm on Linux:
there is a Linux driver, and it is not open-source. AMD has spent a decade
making open drivers the thing it is good at. The exception they have chosen is
the layer that sits underneath your memory map and decides what lives in RAM.
If a render node starts stalling at 03:00, that is the one component you cannot
read.

Which leaves the question of whether any of this helps the people who buy four
sticks at a time. Indirectly, and slowly.

The reason a workstation DIMM costs what it does now is not that DIMMs got
harder to make. It is that [DRAM is running into atomic limits](/blog/micron-drops-4f2-dram-atomic-limits/) at the cell level, so
supply cannot simply be scaled up to meet demand — and the demand is coming
from data centres, which is the same squeeze that has left
[Sony unable to put a date on the PS6](/blog/ps6-memory-crisis-next-gen-art-budgets/). Every RDIMM a hyperscaler
does not buy is wafer capacity that can become something else. If MEXT does
cut server DRAM demand by 20 to 75% across enough fleets, pressure comes off
the fabs that make the modules in your tower.

Enough fleets is the load-bearing phrase. Two thousand servers in 2027, against
global DRAM consumption, is a rounding error. The mechanism by which this
reaches an artist is real and the timescale is years.

Worth watching anyway, for a reason that has nothing to do with price. If
predictive paging to flash turns out to work on more than static timing
analysis, somebody will eventually point it at a DCC application, and the
first studio to run a 400GB scene on a 128GB box will find out quickly whether
five minutes means cold.
