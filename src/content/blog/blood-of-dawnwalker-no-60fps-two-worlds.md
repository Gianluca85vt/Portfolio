---
title: "Blood of Dawnwalker skips 60fps: two worlds at once"
date: 2026-08-22
category: Games
excerpt: Rebel Wolves' vampire RPG ships with a 30fps Quality mode and a 40fps Balanced mode on PS5, PS5 Pro and Series X — no 60fps option at all.
cover: /img/blog/blood-of-dawnwalker-no-60fps-two-worlds/shot-01.jpg
---

> **This was overturned three days later.** Rebel Wolves announced a 60fps
> Performance mode for the day-one patch — [what changed, and what did
> not](/blog/blood-of-dawnwalker-60fps-mode-reversal/). The reading below, of
> why the frame budget was tight in the first place, still holds.

The Blood of Dawnwalker, Rebel Wolves' open-world vampire RPG, launches on 3
September. This week the studio confirmed its console graphics modes, and the
headline is what's missing: no 60fps option, on any console, including PS5
Pro. Quality mode targets dynamic 4K at 30fps. Balanced mode targets dynamic
4K at 40fps, and that one asks for a 120Hz display to even show the benefit.
PS5 Pro gets extra graphical fidelity in both modes — better shadows,
reflections, whatever the enhanced budget buys — but the frame-rate ceiling
doesn't move.

That's an unusual choice to make out loud, three months after most triple-A
console games learned to at least offer a compromise 60fps mode as a nod to
the players who'll take a resolution hit for it. Rebel Wolves didn't offer
one. I think the reason is baked into the game's core mechanic, not into
weak optimisation.

## Two games sharing one frame budget

Dawnwalker's hook is that Coen, the protagonist, is human by day and a
vampire by night, in the same open world, on the same map, with different
rules for each. That's not a lighting preset toggling on a timer — it
usually means two sets of traversal logic, two sets of combat abilities, and
critically for a technical artist, two lighting conditions that both have to
look considered rather than like one was patched over the other.

Daytime open-world lighting in an Unreal Engine 5 game leans on Lumen's
distance-field global illumination across a huge, mostly outdoor space —
expensive, but a well-worn expensive. Nighttime in a vampire game is where
the budget actually gets interesting: point lights, torches, glowing
supernatural effects, probably some kind of heightened vampire-vision
readability pass so players can navigate a genuinely dark world without it
turning into mush. Running Lumen's dynamic GI convincingly through both a
sunlit village and a black forest, in the same engine, on the same
frame-time budget, is two lighting problems for the price of one memory
footprint.

<figure>
  <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing one shared frame budget split between a daytime human lighting pass and a nighttime vampire lighting pass">
    <rect width="760" height="340" fill="#18011F"/>
    <text x="30" y="40" fill="#F4E9F7" font-family="Georgia, serif" font-size="18" font-weight="bold">One frame budget, two lighting problems</text>

    <text x="30" y="80" fill="#E8B4A8" font-family="Arial, sans-serif" font-size="13" font-weight="bold">DAY — Coen, human</text>
    <rect x="30" y="95" width="620" height="34" rx="4" fill="#3a1245"/>
    <rect x="30" y="95" width="380" height="34" rx="4" fill="#c96a3f"/>
    <text x="40" y="118" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">Lumen GI across open, sunlit terrain</text>

    <text x="30" y="165" fill="#8FA8E8" font-family="Arial, sans-serif" font-size="13" font-weight="bold">NIGHT — Coen, vampire</text>
    <rect x="30" y="180" width="620" height="34" rx="4" fill="#3a1245"/>
    <rect x="30" y="180" width="460" height="34" rx="4" fill="#3f4fc9"/>
    <text x="40" y="203" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="12">Local lights, dark-readability pass, supernatural VFX</text>

    <text x="30" y="250" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12">Both have to run through the same renderer, the same memory budget,</text>
    <text x="30" y="270" fill="#C9A8CF" font-family="Arial, sans-serif" font-size="12">and the same frame-time target — without one looking like an afterthought.</text>
    <text x="30" y="305" fill="#F4E9F7" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Result: the fidelity ceiling gets defended before the frame-rate ceiling does.</text>
  </svg>
  <figcaption>Two lighting regimes sharing one console-class frame budget is a plausible reason a 60fps mode never made the cut.</figcaption>
</figure>

## Where the Pro's extra silicon actually goes

The detail I keep coming back to is that PS5 Pro's improvements this time
are explicitly fidelity, not frame rate. That's a deliberate allocation
decision, not a shortfall — the Pro has meaningfully more GPU throughput
than base PS5, and a studio can always choose to spend that on getting to
60fps instead of on better shadows and reflections at 30 or 40. Rebel Wolves
chose the second.

That reads as the team deciding the two lighting states are the thing that
has to hold up under scrutiny, because they're the entire pitch of the
game — you're meant to feel the world change character between day and
night, not just watch a palette shift. A 60fps target would mean halving the
frame-time budget available to both lighting passes, which is exactly the
kind of cut that shows up first as flattened GI, then as nights that stop
looking meaningfully different from days with a blue filter over them. If
that's the trade being protected against, skipping 60fps isn't a
performance failure — it's the same kind of decision Cold Symmetry made with
darkness in Mortal Shell II: spend where the identity of the game actually
lives, and don't pretend you can afford both.

The 40fps Balanced mode gating behind a 120Hz display is its own tell. It's
not a mode built for "most players" — TV adoption of 120Hz is still
partial — it's a mode built for whoever already owns the hardware to notice
the difference, while everyone else defaults to Quality. That's a studio
optimising for the players who'll actually perceive the improvement rather
than chasing a number for the box.

## Worth watching once it ships

None of this is confirmed by Rebel Wolves in technical terms — the studio
announced the modes and the resolution/frame-rate targets, not the
underlying rendering reasoning, so the day/night lighting-budget explanation
above is my read on the likely cause, not their stated one. The real test
comes on 3 September, when digital-foundry-style breakdowns can measure
whether both lighting states hold their target resolution and frame time
in the busiest, most torch-lit nighttime scenes the open world can throw at
them. A day/night RPG on PS5 hardware skipping 60fps entirely, even on the
Pro, is the kind of restraint that either reads as confidence once people
see the nights, or as a game that needed the deadline pushed.

The game shipped on 3 September and the verdicts are in: [twelve scores
averaging an 8, across a three-and-a-half point
spread](/blog/blood-of-dawnwalker-review/).

*Console mode details from Rebel Wolves' own reveal, reported by Push
Square, RPG Site, eXputer and AltChar this week — all pointing at the same
30fps Quality / 40fps Balanced split with no 60fps option on any console.*
