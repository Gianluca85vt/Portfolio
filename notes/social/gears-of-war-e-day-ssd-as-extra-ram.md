## LinkedIn

The Coalition got Gears of War: E-Day running on an Xbox Series S by treating the console's NVMe drive as a tier of memory. A few gigabytes of the SSD are set aside as a buffer, cold city data gets moved out to flash, and access-pattern heuristics decide what comes back. Reported net gain: around a gigabyte of effective RAM.

On a machine where games see roughly eight gigabytes, a tenth of your budget is the difference between a district loading and a district getting cut.

Tom's Hardware tested the same system on PC today and measured up to 3.7 GB/s of SSD streaming, saving several gigabytes of system RAM on a modest configuration as well as a high-end one. A technique built for the weakest console paying out on a mid-range PC is the right way round, and rarer than it should be.

The part I keep thinking about is where the work happened. Digital Foundry's reading was that the clever bit lives in data management rather than hardware, and data management here means authoring decisions. Eviction granularity is authored. If a building is one 400MB blob, you page 400MB or nothing — split it along what is visible together and you page what the camera can see. Nobody writes that split in engine code. Somebody decides it while building the asset, often without being told that is the decision they are making.

Locality on disk is the other half, and chasing it means duplicating: the same prop stored six times so each district reads contiguously. That is one of the honest reasons installs are enormous now.

Nanite has streamed geometry clusters this way since it shipped. Extending the bet to the rest of the scene's data is a logical step, not a leap. Flash still answers three orders of magnitude slower than DRAM, so a frame waiting on a page-in is a frame you dropped — The Coalition said as much, that moving data too often spends the gain on stutter.

AMD is running the same play on EPYC servers with MEXT. The reasoning is identical in both places: DRAM has stopped getting cheaper.

#gamedev #unrealengine #technicalart

## X

The Coalition ran Gears of War: E-Day on a Series S by using the NVMe drive as a memory tier. A few GB of SSD as a buffer, cold city data paged out to flash, heuristics deciding what went cold. Reported gain: ~1GB of effective RAM.

Series S games see roughly 8GB. So that gigabyte is more than a tenth of the whole budget — on this class of box, the difference between a district loading and a district getting cut from the build.

Tom's Hardware tested it on PC today: up to 3.7 GB/s of SSD streaming, several GB of system RAM saved, on a modest config as well as a high-end one. Built for the weakest console, pays out on a mid-range PC.

Digital Foundry's point was that the clever part is data management, and that means authoring. Eviction granularity is authored. One 400MB building blob pages 400MB or nothing. Split by what's visible together and you page what the camera sees.

Locality on disk is the rest of it. Things needed in the same frame want to be adjacent in the package, which means duplicating props per district so each reads contiguously. One honest reason installs are enormous.

Flash answers in tens of microseconds, DRAM in tens of nanoseconds. A frame waiting on a page-in is a dropped frame — move data too often and the gain comes back as stutter. AMD's MEXT makes the same bet on EPYC. DRAM stopped getting cheaper.
