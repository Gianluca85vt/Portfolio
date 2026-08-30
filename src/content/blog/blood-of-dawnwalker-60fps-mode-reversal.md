---
title: Blood of Dawnwalker found its 60fps mode in three days
date: 2026-08-25
category: Games
excerpt: The Blood of Dawnwalker will ship with a 60fps Performance mode on PS5, PS5 Pro and Series X after all, added to the day-one patch days after Rebel Wolves said the frame-rate ceiling wasn't moving. Series S still doesn't get one.
cover: /img/blog/blood-of-dawnwalker-60fps-mode-reversal/shot-01.jpg
---

Three days ago Rebel Wolves confirmed The Blood of Dawnwalker would launch
with a 30fps Quality mode and a 40fps Balanced mode on PS5, PS5 Pro and
Series X, and nothing faster on any of them. I wrote at the time that the
likely reason was the game's day/night split — two full lighting regimes,
human and vampire, sharing one frame-time budget — and that spending the
Pro's extra silicon on fidelity instead of frame rate read as the studio
protecting that split rather than under-delivering.

That held up for about a weekend. On 24 August, after what Rebel Wolves
itself called feedback making clear "how much this mattered to many of
you," the studio announced a Performance mode targeting 60fps will now
ship in the day-one patch on 3 September, on PS5, PS5 Pro and Xbox Series
X. Quality and Balanced stay as announced. The studio has said the mode
was already in testing before the backlash — it just wasn't ready to
promise.

## What actually changed, and what didn't

Nothing about Dawnwalker's renderer changed in three days. The day/night
lighting problem I described is still there: Lumen GI across an open,
sunlit map by day, a local-lights-and-readability pass by night, both
running through the same console hardware. What changed is Rebel Wolves'
confidence in publishing a number it hadn't finished validating — and its
tolerance for shipping that number with caveats attached, which is exactly
what happened. The studio describes Performance mode as "targeting" 60fps,
language that in this genre almost always means dynamic resolution
scaling doing the work: the frame rate holds by giving up pixels the
moment a scene gets expensive, which for this game means the moment
night's local lights and vampire-vision effects stack up.

That's not a criticism of the mode — it's the standard trade, and it's
the same trade every other open-world UE5 game on this hardware generation
makes to hit 60. What it confirms is that the lighting-budget read from
my earlier piece wasn't wrong, just incomplete: the two lighting states
weren't a hard wall that made 60fps impossible, they were a soft one that
made it inadvisable to promise before QA had run it through the game's
worst-case night scenes. Three days is enough time to finish that
validation pass and ship the mode with expectations set correctly. It is
not enough time to redesign a renderer.

<figure>
  <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Table comparing the three console graphics modes across PS5, PS5 Pro, Xbox Series X and Series S">
    <rect width="760" height="300" fill="#18011F"/>
    <text x="30" y="38" fill="#F4E9F7" font-family="Georgia, serif" font-size="17" font-weight="bold">Three modes, one console left out</text>

    <text x="30" y="75" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" font-weight="bold">PS5 / PS5 Pro / Series X</text>
    <rect x="30" y="88" width="210" height="30" rx="4" fill="#3a1245"/>
    <text x="40" y="108" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">Quality — dynamic 4K, 30fps</text>
    <rect x="250" y="88" width="210" height="30" rx="4" fill="#3a1245"/>
    <text x="260" y="108" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">Balanced — dynamic 4K, 40fps</text>
    <rect x="470" y="88" width="210" height="30" rx="4" fill="#c96a3f"/>
    <text x="480" y="108" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">Performance — targeting 60fps</text>

    <text x="30" y="160" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12" font-weight="bold">Xbox Series S</text>
    <rect x="30" y="173" width="210" height="30" rx="4" fill="#3a1245"/>
    <text x="40" y="193" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">One mode — 30fps only</text>

    <text x="30" y="240" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12">Series S got no reversal, because it never had the headroom the</text>
    <text x="30" y="260" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12">backlash was arguing about — the budget genuinely isn't there.</text>
  </svg>
  <figcaption>Series S staying at a single 30fps mode, even after the reversal, is the clearest evidence the lighting-budget constraint was real.</figcaption>
</figure>

## Series S is the control group

The detail that actually confirms the original read is what didn't
change: Xbox Series S keeps its single 30fps mode. If the 60fps ceiling
had been an arbitrary, conservative choice rather than a genuine hardware
limit, three days of PR pressure should have found some compromise there
too — a lower internal resolution, a cut LOD tier, something. Instead
Series S was left out of the reversal entirely, which is a much stronger
signal than the announcement itself: Rebel Wolves found spare frame-time
on the three more powerful boxes, and found none on the weakest one. That
asymmetry is what a real memory-and-fill-rate ceiling looks like from the
outside, as opposed to a studio simply being cautious.

## What to actually check on 3 September

The number to watch isn't whether Performance mode hits 60 in a
daylight village — it will, that's the easy half of this game's lighting
problem, and always was. It's whether it holds anywhere close to 60
during the nighttime vampire sections, where the GI, local lights and
supernatural VFX I described in the last piece all stack at once. If
digital-foundry-style frame-time analysis shows Performance mode sagging
specifically at night while Quality and Balanced hold their targets
across both, that's the two-lighting-problem theory confirmed in the
worst possible way for players who picked 60fps for the whole game and
get it for half of it.

*Console mode details from Rebel Wolves' own announcement on 24 August,
reported by Push Square, Game Informer, VGC, GamesRadar+ and RPG Site,
all confirming the same Performance/Balanced/Quality split with Series S
left on a single 30fps mode.*
