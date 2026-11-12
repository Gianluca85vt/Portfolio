---
title: "Steam Deck FPS on store pages: read the histogram"
date: 2026-11-12
category: Tech
excerpt: Valve now publishes measured Steam Deck framerates on store pages. The average sits on top, and the distribution underneath it is where hitching shows up.
cover: /img/blog/steam-deck-fps-store-pages-histogram/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/steam-deck-framerate-average-data-store-widget
  - outlet: TechPowerUp
    url: https://www.techpowerup.com/354634/valve-adds-steam-deck-fps-data-to-game-compatibility-screen-in-latest-update
  - outlet: GamingOnLinux
    url: https://gamingonlinux.com/2026/10/valve-give-game-developers-more-steam-deck-framerate-data
artistView:
  take: "Valve shipped a performance number to the storefront and then published a worked example showing why that number lies, which is a strange and quite honest thing for a platform holder to do. The chart underneath is the part worth anything to someone optimising a build, because the shape of the left tail is where shader compilation and streaming stalls live."
  works:
    - "Performance: giving buyers the distribution instead of one figure puts hitching somewhere a person can see it before paying, which is more than any compatibility badge has ever done."
    - "Measurement: sampling only Decks left on the stock 60 and 90 frame caps keeps unlocked and oddly configured sessions from flattering the result."
  misses:
    - "Measurement: Valve told developers the sampling includes loading screens and has not said the public figure strips them out, so part of that left tail may be time nobody was playing."
    - "Scope: the cap truncates the top of the chart, so a game sitting on comfortable headroom and one scraping the limit draw the same picture."
---

Open a game's store page on a Steam Deck this week and there is a number under
the compatibility badge that was not there before: the average framerate real
Deck owners got out of the thing, measured on their own machines. Valve pushed it out in a client update on **10 November 2026**, sitting
behind the "Learn more" link in the Steam Deck Compatibility block, covering
thousands of games across the Verified, Playable and Unsupported tiers.

Then Valve did something I did not expect. It explained, in its own
documentation, why you should not trust the number it had just put on the page.

## The 75 that never renders

<figure>
  <img src="/img/blog/steam-deck-fps-store-pages-histogram/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Valve, via the official Steam Deck store page</figcaption>
</figure>

The example Valve gives is a frame pattern of 90, 90, 45, 90, 90, 45. Average
that and you get 75 frames a second. The game renders 90 or it renders 45. It
never once renders 75.

Anyone who has spent an afternoon staring at a frame-time graph knows that
cadence. On a 90Hz panel it is the classic vsync fallback — miss the window and
you are held to half rate until you catch up — and it reads to the eye as a
judder rather than a slowdown. A player would describe that game as stuttery. An
average describes it as a comfortable 75, which is better than most handheld
games manage.

The chart you can expand underneath it is where the update earns its keep,
split into OLED and LCD panels, showing how often each framerate occurred. Two games can average 75. One of them has all
its mass piled at 75. The other is the 90/45 sawtooth above. Those are not the
same product and now, for the first time on a storefront, they do not look the
same either.

This is the measurement the blog has wanted for a while. When I wrote about
[a 5090 that stutters at 60fps in Silent Hill: Townfall](/blog/silent-hill-townfall-pc-stutter-shader-cache/),
the whole difficulty was that no single number could express the problem: the
hardware was comically overspecified, the average was fine, and the game hitched
anyway because shaders were compiling while you walked. A distribution catches
that. An average buries it.

## What the chart cannot tell you

Two limits, and both matter if you are going to read these things seriously.

Valve counts only sessions from Decks running their default frame limits — 60 on
the LCD, 90 on the OLED. Good discipline, since it keeps unlocked and docked
oddities out of the sample. It also means the right-hand edge of every chart is
a hardware ceiling rather than a performance result. A game holding 90 with
forty per cent of its GPU budget spare and a game holding 90 by the skin of its
teeth draw an identical histogram. You can see a deficit on these charts. You
cannot see margin — and margin is what survives the content patch six months
later.

The other one is the left tail, and here I am less sure than I would like to be.
Valve's earlier note to developers said plainly that the framerate sampling
includes loading screens, where the rate drops through the floor. I have not
seen Valve say whether the public store figure filters them out. Until it does,
assume some portion of the scary end of that distribution is a load screen, and
that a game with lots of short loads reads worse than it plays. Valve also
cautions that vsync settings, user frame caps and custom configurations can bias
the sample, while arguing the data tends to cluster tightly enough to be useful.

There is a minimum data threshold before any of it appears, and a
last-updated stamp on the panel, which is the right call for a figure that
drifts with every patch.

## Nine months of telemetry becoming a price-tag neighbour

The sequence is worth laying out, because this did not arrive in one go.

February 2026: Valve adds the opt-in to Steam, asking players to send anonymous
performance data. April: developers get average framerates and survey results
for their own titles, as a trailing thirty-day figure. **1 October 2026**: the
distribution chart lands in Steamworks, under Technical Tools and the Steam
Hardware Compatibility Review, restricted to Steam Deck Verified titles. Six
weeks after that, the whole thing is pointed at the public.

A diagnostic became a sales-page number. That is a different object. Internally,
a framerate histogram is something a performance lead looks at on a Tuesday and
assigns to somebody. On a store page it sits a few hundred pixels from the
price, built from telemetry no publisher controls, and it updates whether or not
anyone wants it to. Marketing cannot write around it. You can only ship a
better build.

Which cuts against the way frame targets normally get discussed. Rockstar spent
months letting people deduce GTA 6's console frame rate from footage —
[the 30fps question](/blog/gta-6-extended-look-30fps-question/) ran on
inference, because the studio would not state a number and nobody could measure
one. On Deck that argument is now settled by the platform, publicly, with a
sample size, before you buy. It is a small loss of control and I suspect a few
publishers will feel it.

## The desktop version is the one to watch

Buried in the coverage: Valve is prompting Steam client beta users to opt in to
the same anonymised framerate collection on desktop PCs, with wider support
planned. Earlier client strings spotted by KitGuru pointed at a store interface
where you pick your own CPU and GPU and get a chart back, though Valve has not
announced that, so treat it as unconfirmed.

If it ships, it is a much harder problem than the Deck one. The Deck is a single
pair of fixed configurations, which is exactly why the statistics hold together.
A desktop sample has to be sliced by GPU, CPU, resolution, upscaler, settings
preset and driver version before the average means anything, and each slice gets
thinner as you cut. Do it badly and you publish confident nonsense about tens of
thousands of machine combinations. Do it well and PC gaming acquires the thing
it has never had: a performance claim with a sample behind it instead of a
minimum-spec box nobody believes.

The Deck chart is the easy case. Valve got the easy case mostly right, and was
candid about where it is still wrong.

---

*Store-page rollout, panel location and tier coverage from Eurogamer's report
and TechPowerUp's write-up of the client update; outlets differ by a day on the
exact release date. Valve's averaging example, the 60 and 90 frame-cap sampling
rule and the vsync caveat as quoted in that coverage. Developer-side timeline
from GamingOnLinux's October report on the Steamworks distribution chart. The
desktop store interface remains unannounced.*
