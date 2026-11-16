## LinkedIn

A Cyberpunk 2077 weather mod published its frame budget this week, and that is
the part I keep coming back to.

Torrent, by CyanideX, replaces Night City's rain with individual 3D drops that
fall through the world in depth, pick up light from neon and headlights, and
stop at roofs and bridges. Nice screenshots. But the mod page also lists what
each piece costs: roughly 0.15 to 0.5ms a frame for the rain on Ultra in heavy
weather, around 0.4ms peak for tyre spray, about 0.15ms for storm mist drawn at
half resolution.

Add it up and you are near a millisecond. A 60fps frame is 16.67ms, so that is
about six per cent of the frame spent on weather, in a game where it is not
raining most of the time.

That number is the whole explanation for what CD Projekt Red shipped in 2020.
Rain in a real-time engine is usually a camera-locked volume of stretched
billboards plus a few scrolling cards in the distance. Cheap, predictable, and
flat — a quad that always faces you has no depth, and a drop that small takes
no local lighting unless you pay for it. In a city lit almost entirely by
emissive surfaces at short range, that is the expensive thing to skip, and it
is also the first thing to go when you are holding a fixed console budget set
by a 2013-era CPU.

The design decision that makes the mod affordable is the interesting one: it
adds a few draws to the rain pass the engine was already running, and does no
CPU simulation at all. Pure GPU work, free when the sky is clear.

A PC mod can also hand the setting to the player. A console build gets one
budget and has to hold it in the worst case you never see.

Worth noting the figures are the author's own, on unnamed hardware, with no
independent benchmarks yet.

#gamedev #realtimevfx #cyberpunk2077

## X

Cyberpunk 2077's rain mod Torrent published something studios almost never do:
a per-effect frame budget. 0.15-0.5ms for the rain on Ultra in heavy weather.
That one number explains the vanilla rain better than any screenshot.

[image: shot-01.jpg]

Rain in a real-time engine is rarely water. It's a camera-locked volume of
stretched billboards with a streak texture, plus big scrolling cards in the
distance for density. Cheap and predictable. Also flat: a quad that always
faces you can't sit convincingly behind a railing.

The bigger loss is lighting. A drop that small takes no local light unless you
pay for it. Night City is lit almost entirely by emissive surfaces at short
range - signage, windows, headlights. Rain that ignores all of it is rain
falling through a city it isn't in.

Torrent's stack, per the author: rain 0.15-0.5ms, wheel spray ~0.4ms peak,
storm mist ~0.15ms at half resolution. Call it a millisecond running hard. A
60fps frame is 16.67ms. That's ~6% of the frame on weather, in a game where
it's usually dry.

The move that makes it affordable: a few extra draws inside the rain pass the
engine already runs, and zero CPU simulation. All GPU, and it costs nothing
when the sky is clear. Half-res storm mist is textbook too - low-frequency
volumetrics upsample without anyone seeing it.

A PC mod can put Quality, Rain Cover and Storm Mist in a menu and assume a 2026
machine. A console build gets one budget, fixed six years ago, and has to hold
it during rain plus traffic plus a chase. Most "settling for less" is a line
being held in a case you never saw.

Caveat worth keeping: every figure is the author's own, on hardware nobody has
named, and no outlet has run independent numbers yet. Treat them as the shape
of the cost, not the cost.
