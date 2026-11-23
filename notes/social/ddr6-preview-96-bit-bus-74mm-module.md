## LinkedIn

Two hardware outlets covered JEDEC's DDR6 preview yesterday. One headline said four times the bandwidth of DDR5. The other said almost double the maximum speed. Both are arithmetically correct, and the gap between them is worth understanding before anyone specs a workstation on it.

Here is the spec. Server RDIMMs start at 12.8 GT/s, roadmap to 14.4 and beyond. The data bus widens from 64 bits to 96. Die density goes to 128Gb. The module shrinks to a proposed 74mm, from 133mm for a DDR5 DIMM.

A 96-bit bus at 12.8 GT/s moves 153.6 GB/s. DDR5 at its original launch grade, DDR5-4800 on 64 bits, moves 38.4 GB/s. That is exactly 4.00. Compare against the top of DDR5's own ladder at 9.2 GT/s, which is 73.6 GB/s, and you get 2.09. So the multiplier depends entirely on which DDR5 you stand the new part next to, and the two defensible choices are a factor of two apart. If you are replacing a machine, 2.09 describes your upgrade. JEDEC's own preview is more cautious than either number: it claims more than 50% at introduction and states in writing that this is not a claim of equal application performance.

The 74mm module is the part I find genuinely interesting. At 12.8 GT/s a single bit gets 78 picoseconds on the wire. Signal travels a centimetre or so of PCB trace in 50 picoseconds, so the entire budget for one bit is a few centimetres of copper. On a 133mm card the far-end traces are long against that, and every stub is a reflection. Halving the card halves the worst-case run. That is engineering admitting what the physics costs and redesigning the object, instead of keeping the familiar shape and capping the speed grade.

The caution: every rate, power mode and capacity ceiling here is quoted for RDIMMs. UDIMM and CAMM are listed as possible. No pin count, no connector, no date, and reported windows run 2027 to 2029. Micron has already said DRAM is nearing atomic limits, so those 128Gb dies arrive through stacking and packaging that somebody has to pay for.

For scene work, bandwidth was never the wall anyway. A dense USD scene or a heavy sim cache falls over on capacity long before it starves for throughput, and the capacity story in this preview is a server story with a desktop footnote.

#hardware #3d #vfx

## X

JEDEC previewed DDR6 this week. One outlet headlined "4x the bandwidth of DDR5". Another headlined "almost double the max speed".
Both are arithmetically right. They measured against different DDR5s.

A 96-bit bus at 12.8 GT/s moves 153.6 GB/s per module.
DDR5-4800 on 64 bits: 38.4 GB/s. Ratio exactly 4.00.
DDR5 at 9.2 GT/s: 73.6 GB/s. Ratio 2.09.
Replacing a real machine? 2.09 is your number. Per pin the launch gain is 39%.

JEDEC's own claim sits below both headlines: more than 50% at introduction, with a written caveat that it is not a claim of equal application performance.
That is the careful number. The 4x is the generous one.

The detail I keep coming back to: the module shrinks to 74mm, from 133mm.
At 12.8 GT/s one bit gets 78 picoseconds. Signal covers roughly 1cm of PCB trace in 50ps.
Halving the card halves the worst-case trace. The shrink is signal integrity, paid in millimetres.

Die density doubles to 128Gb, which is 16GB per die. One write-up rendered that as "128 GB", a factor of 8 out, and it will get copied.
Micron shelved 4F² in October and said DRAM is near atomic limits. Doubling density now means stacking and packaging.

Caveat on all of it: every rate, power mode and capacity ceiling is quoted for RDIMMs. UDIMM and CAMM are "possible". No pin count, no connector, no date, windows reported from 2027 to 2029.
And a heavy sim cache dies on capacity, not throughput.
