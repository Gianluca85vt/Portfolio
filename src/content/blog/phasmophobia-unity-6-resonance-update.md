---
title: "Phasmophobia on Unity 6: lighting is the bill"
date: 2026-11-22
category: Games
excerpt: Kinetic bundled the engine upgrade into Phasmophobia's Resonance update on 24 November, and pulled a planned character rework to keep it stable.
cover: /img/blog/phasmophobia-unity-6-resonance-update/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/phasmophobia-resonance-update-release-date-dowsing-rods-unity-6
  - outlet: Worthplaying
    url: https://worthplaying.com/article/2026/11/17/news/151459-phasmophobia-resonance-update-next-week-adds-new-equipment-revamped-sound-sensor-ui-expanded-voice-recognition-custom-map-pools-unity-6-upgrade/
  - outlet: Unity
    url: https://docs.unity3d.com/6000.0/Documentation/Manual/urp/whats-new/urp-whats-new.html
artistView:
  take: "Judged from Kinetic's own description of Resonance and from the game's published footage, the engine jump is being treated as maintenance rather than a showcase, which is the right instinct for a game whose whole visual identity is one torch beam in a dark corridor. The feature they cut to protect it tells you where they think the risk is."
  works:
    - "Pipeline: bundling the engine upgrade with a content update means one revalidation pass over every map instead of two, and one window of player pain instead of two."
    - "Scope: pulling the Player Character Visual Update out of the same patch is discipline. New character art riding on top of a fresh engine build makes every bug report ambiguous."
  misses:
    - "Lighting: the promised improvement is the hardest thing to deliver here. Probe-lit interiors are exactly what a major version change disturbs, and a house that reads a quarter-stop brighter ruins a game built on not being able to see."
    - "Communication: Kinetic has not said which Unity version the game is leaving, which is the one number that would tell players whether to expect a tidy patch or a month of fixes."
---

The most informative thing in Phasmophobia's next update is the feature that
is no longer in it. Kinetic Games has pulled the Player Character Visual
Update out of Resonance, which arrives free on all platforms on **24 November
2026**, to keep the rest of it stable.

That is an engine upgrade talking.

Resonance moves the game to **Unity 6**. Alongside it come dowsing rods for
locating an entity — genuinely useful on the larger maps, where the current
hunt is a lot of walking — a reworked Sound Sensor, custom map pools with
small, medium and large buttons and a dice button in place of the old Random
Map polaroid, and a wider set of voice commands. You can now ask a ghost to
open a door, flip a switch, throw something, or show you a sign, with a Journal
page listing every phrase the parser actually accepts. That last detail is a
small kindness. Voice recognition in this game has always had an invisible
vocabulary and players have been guessing at it for six years.

Kinetic says the two things shipped together because splitting them looked
unreasonable for everyone involved. I believe that, and I would guess the
calculation was narrower than it sounds: shipping an engine jump on its own
means asking a live playerbase to absorb a destabilising patch with nothing in
it for them.

## Why a version bump is a content job

<figure>
  <img src="/img/blog/phasmophobia-unity-6-resonance-update/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Kinetic Games, via the official Steam page</figcaption>
</figure>

Unity 6 arrived publicly in late 2024. Phasmophobia is getting there in late
2026, and the gap is the honest part of this story. Engine major versions are
cheap to adopt on a project that has not shipped and expensive on one that
has, because the cost does not land on the code. It lands on the content.

Unity's own notes for URP 17, the pipeline that ships with Unity 6, describe a
render graph that reduces memory use and handles synchronisation between
compute and graphics queues, and improvements to Adaptive Probe Volumes:
lighting scenario blending, sky occlusion, disk streaming. Good things. Each
one also implies work. Custom renderer features written against the older API
need reworking against the render graph. The GPU Resident Drawer, which batches
GameObjects through the BatchRendererGroup API to cut draw calls, needs shaders
that support DOTS instancing — so every custom shader in the project gets
audited.

And if a project moves off Light Probe Groups and onto Adaptive Probe Volumes,
the probe data gets rebuilt rather than converted. That specific claim comes
from developer write-ups rather than Unity's own upgrade guide, so treat it as
the shape of the problem rather than a documented rule. But the shape is right,
and it is the shape that matters for this game.

Think about what Phasmophobia is. Every map is an interior. The lighting is the
mechanic — a torch cone, a few practical bulbs you can switch on at the breaker,
and a lot of deliberate blackness. Relight a house in that game and you have
not changed the look, you have changed the difficulty. A hallway that reads a
little brighter is a hallway where you spot the Wraith a second earlier.

There is nothing glamorous about the week that produces. You open the project
on the new version, wait out an import that takes long enough to go and make
something to eat, and come back to a console full of warnings and a handful of
materials rendering pink. Then you walk every map with the old build open on a
second monitor, comparing corners. Nobody writes a patch note for that.

## The claims, and what they are worth on Monday

Kinetic's pitch for the upgrade is stability and performance: fewer crashes,
better CPU, GPU, VRAM and RAM usage, memory leaks fixed, improved lighting. At
least one outlet has already pointed out that none of this is verified, and
that is fair. A promise about frame time is a promise until the build is on
people's machines.

Two things are worth watching when it lands. The first is shader compilation.
A pipeline change invalidates the cached variants, which means the first boot
after the update is the slowest one, and however gracefully it is handled
somebody will file it as a performance regression — the same confusion
[Call of Duty eventually took ownership
of](/blog/modern-warfare-4-shader-preloading-stutter/) rather than leaving to
its players. The second is mods and custom content. Phasmophobia's community
has built a large amount of it, and a major version change is where that breaks
quietly.

The number Kinetic has not given is which version the game is leaving. That is
the one that tells you whether this is a hop or a leap, and without it, nobody
outside the studio can size the job.

Which is the practical version of an argument I made about Epic's next engine
in August: [a new major version existing is not a reason to
move](/blog/unreal-engine-6-dont-panic/). A shipped game moves when the
features are worth the revalidation, and not before. Kinetic appears to have
waited until memory leaks and crash reports made the sums work, then bought
itself cover by attaching dowsing rods to the invoice.

The patch notes land in full on the 24th. The interesting ones will be the
lighting lines.
