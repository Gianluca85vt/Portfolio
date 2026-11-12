## LinkedIn

Valve has started printing measured framerates on Steam store pages, and then published a worked example explaining why you should not trust the headline number.

The example is Valve's own: a frame pattern of 90, 90, 45, 90, 90, 45. That averages to 75 fps. The game renders 90 or it renders 45. It never once renders 75.

Anyone who has spent an afternoon in a frame-time graph recognises that cadence. On a 90Hz panel it is the classic vsync fallback, and it reads to the eye as judder rather than slowdown. A player calls that game stuttery. The average calls it a comfortable 75.

Which is why the chart you can expand underneath matters, split by OLED and LCD, showing how often each framerate occurred. Two games can average 75 fps. One has all its mass sitting at 75. The other is the sawtooth. Those are not the same product, and for the first time on a storefront they no longer look the same.

Two limits. Valve samples only Decks on stock frame caps, 60 LCD and 90 OLED — good discipline, but it means the right edge of every chart is a hardware ceiling rather than a result. A game holding 90 with GPU budget spare and a game holding 90 by its fingernails draw the identical histogram. You can see a deficit on these charts. You cannot see margin, and margin is what survives the content patch six months later.

The second: Valve told developers the sampling includes loading screens. I have not seen it say the public figure strips them out.

What interests me most is what this does to the job. A performance histogram used to be an internal diagnostic. It now sits a few hundred pixels from the price, built from telemetry no publisher controls, updating whether anyone wants it to. You cannot write around it in marketing copy. You can only ship a better build.

Desktop support is in client beta. That is a far harder statistical problem.

#gamedev #steamdeck #technicalart

## X

Valve now prints measured Steam Deck framerates on store pages — then published its own example of why the number lies: a pattern of 90, 90, 45, 90, 90, 45 averages 75 fps. The game renders 90 or 45. Never 75.

That cadence is the classic vsync fallback on a 90Hz panel. Miss the window, get held to half rate. It reads as judder, not slowdown. A player calls it stuttery. The average calls it a comfortable 75 fps.

So the useful control is the histogram you expand underneath, split OLED and LCD. Two games average 75. One has its mass piled at 75. The other is the sawtooth. Not the same product — and now they don't draw the same picture.

[image: shot-01.jpg]

Limit one: Valve samples only Decks on stock caps, 60 LCD and 90 OLED. So the right edge of every chart is a hardware ceiling. Holding 90 with budget spare and holding 90 by your fingernails look identical. You see deficit. You never see margin.

Limit two: Valve told devs the sampling includes loading screens, and hasn't said the public figure strips them. Assume part of that left tail is a load screen and a load-heavy game reads worse than it plays.

The shift is in the job. A frame-time histogram was an internal diagnostic. It's now a few hundred pixels from the price, from telemetry no publisher controls, updating on its own. Marketing can't route around it. You ship a better build.
