---
title: "Samsung Odyssey G6: 1,100Hz, but only at 720p"
date: 2026-08-28
category: Tech
excerpt: Samsung's 1,100Hz Odyssey G6 only reaches that number at 720p. Its QHD mode moves more than twice as many pixels a second, so throughput is not the ceiling.
cover: /img/blog/samsung-odyssey-g6-1100hz-720p/cover.svg
draft: true
---

Do the multiplication first, because nobody covering this has.

The Odyssey G6 in HD mode: 1280 × 720 × 1,100 = **1.01 billion pixels a
second**. The same monitor in its native QHD mode: 2560 × 1440 × 600 = 2.21
billion. The mode with the smaller headline number moves more than twice as
much data.

Samsung introduced the 27-inch G6, model G60H, on screen during its Gamescom
keynote on 27 August, alongside the OLED G9 and OLED G7 that got the stage
time. Fast IPS panel, rated 1ms response, up to 1,100Hz at HD and up to 600Hz
at QHD through Dual Mode. Ahead of CES this year the spec was 1,040Hz. They
raised it. It ships globally in the second half of 2026, which makes it the
first of the 2027 Odyssey line to arrive.

## What the number actually buys

Refresh rate stopped being about input lag a long time ago. On any
sample-and-hold display — every LCD, every OLED you can buy — a frame is
painted and then held there for the entire frame interval. Your eye does not
hold still with it. When you track something moving across the screen your gaze
slides smoothly while the image sits frozen, and the held frame smears across
your retina by however far the object should have travelled during the hold.
The holding is the blur.

So the blur is the frame time, in pixels of motion:

| Refresh | Frame held for | Smear on a 1000 px/s object |
| --- | --- | --- |
| 60Hz | 16.67ms | 16.7 px |
| 240Hz | 4.17ms | 4.2 px |
| 600Hz | 1.67ms | 1.7 px |
| 1,100Hz | 0.91ms | 0.9 px |

Which is where the enthusiasm should start cooling. Going from 60Hz to 240Hz
removes twelve and a half pixels of smear, and you feel it immediately. Going
from 600Hz to 1,100Hz removes another three quarters of one pixel. On a 27-inch
panel that is a distance smaller than the anti-aliasing already sitting on the
edge you were looking at.

The curve is hyperbolic. Past a point you pay a great deal for its tail.

## Nothing here explains the 720p

Here is what I cannot make add up. If the panel can push 2.21 billion pixels a
second in QHD, throughput is not what stops it at 1,100Hz in HD, where it only
needs 1.01 billion. Line rate does not explain it either: QHD at 600Hz scans
864,000 lines a second, HD at 1,100Hz scans 792,000. The mode Samsung calls the
world's first 1,100Hz is doing less work, on both measures, than the mode
sitting next to it in the menu.

Something else sets that ceiling — minimum frame timing in the scaler, a
firmware limit, a driver IC that will not clock past a point, or simply a
number chosen because it sounded better than 1,000. Samsung has not said which,
and I am not going to guess in public. It is worth flagging that the trade-off
being sold here as a bandwidth compromise does not look like one.

Then there is the response time. A rated 1ms transition inside a 0.91ms frame
means the liquid crystal has not finished settling before the next frame is
already due. That figure is a manufacturer's best case — grey-to-grey, overdrive
on, measured the way that produces the smallest number — so the real transitions
are slower than the frames they are meant to display. Whatever motion clarity
you measure on this panel at 1,100Hz will land short of the arithmetic above,
and the gap is the panel chemistry, not the signal.

## The frame budget from the other side

Working in engine, 0.91ms is the entire budget. Everything: culling, the draw
submission, shadows, whatever post you failed to cut. A frame landing in under
a millisecond is one where the CPU has done almost nothing between submissions.

At 720p on low settings a competitive shooter with a deliberately cheap renderer
will run into the high hundreds on current hardware, and those are exactly the
games this monitor is aimed at. Eleven hundred is a further stretch. Frame
generation will not bridge it either, because interpolated frames carry no fresh
input, and fresh input is the thing the audience for a 1,100Hz panel says it
cares about.

Which leaves the mode people will actually run. QHD, 600Hz, native resolution,
1.7 pixels of smear, and the higher pixel rate of the two by a factor of more
than two. That is a very good monitor. The number on the box describes the
other mode.

---

*Specifications from Samsung's Gamescom 2026 Odyssey announcement, 27 August
2026, as carried in its global newsroom; the newsroom page itself was not
reachable from here, so the figures are taken from the quoted text in that
release. Pixel rates, line rates and persistence figures calculated from those
specifications. Samsung has not stated what limits the HD mode to 1,100Hz.*
