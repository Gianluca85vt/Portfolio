---
title: "Silent Hill: Townfall stutters at 60fps on a 5090"
date: 2026-09-25
category: 3D
excerpt: A 5090 clears 60fps at native 4K with ray tracing and still hitches. Konami has now confirmed a performance patch. Two separate faults are doing the damage.
cover: /img/blog/silent-hill-townfall-review/shot-03.jpg
sources:
  - outlet: DSOGaming
    url: https://www.dsogaming.com/articles/silent-hill-townfall-hits-60-fps-at-native-4k-with-max-settings-and-ray-tracing-on-nvidia-rtx-5090-but-has-major-stutters/
  - outlet: TechPowerUp
    url: https://www.techpowerup.com/review/silent-hill-townfall-performance-benchmark/9.html
  - outlet: SILENT HILL Townfall on Steam, upcoming update notice
    url: https://store.steampowered.com/news/app/1636440/view/702154493559571529
  - outlet: DualShockers
    url: https://www.dualshockers.com/silent-hill-townfall-update-coming-after-fans-complain-about-poor-performance-on-pc/
  - outlet: Notebookcheck
    url: https://www.notebookcheck.net/Early-access-Silent-Hill-Townfall-reviews-warn-poor-performance-may-sour-release-date.1406359.0.html
draft: true
---

A GeForce RTX 5090, a Ryzen 9 7950X3D and 32GB of DDR5 at 6000 will run SILENT
HILL: Townfall at native 4K, everything maxed, ray tracing on, north of sixty
frames a second. That is DSOGaming's test bench and DSOGaming's number. The same
write-up describes severe shader-compilation stutter, erratic frame times and
heavy CPU load.

Both things are true at once. Frames per second and frame *times* are different
measurements, and a game can pass the first while failing the second badly
enough that nobody wants to play it.

TechPowerUp ran the same question across thirty-five cards and came out with a
ladder rather than a headline: an RTX 4060 Ti or an RX 9060 XT for 1080p60, an
RX 7900 XT, RX 9070 or RTX 4070 Ti and up for a comfortable 1440p, and native
4K60 reserved for the 5090 alone. So the 5090 result is the top of the ladder,
not a surprise — and the hitching sits on every rung of it.

## Two faults, one symptom

Everyone calls it stutter. On a frame time graph they look identical — a spike
where a flat line should be. Underneath they are unrelated problems with
unrelated fixes, and Townfall appears to have both.

The first is pipeline state compilation. Before a GPU can draw anything, the
driver needs a compiled pipeline for that exact combination of shader, vertex
layout, blend mode, render target format and lighting path. Change any one of
those and it is a different pipeline. If the engine reaches a draw call and the
pipeline for it does not exist yet, something has to build it right then, on the
CPU, while the frame waits. That is where the multi-hundred-millisecond pauses
come from when you walk into a room with a light type you have not seen before.

The second is streaming. Cross into a new cell and the engine is creating
meshes, uploading textures, spinning up audio and running whatever construction
scripts the level designer left in. Players are calling this traversal stutter
and the reports cluster on zone transitions and on vegetation coming into view.

<figure>
  <img src="/img/blog/silent-hill-townfall-review/shot-04.jpg" loading="lazy" width="1440" height="810" alt="Fog-bound street in SILENT HILL: Townfall" />
  <figcaption>Screen Burn / KONAMI, via the official SILENT HILL: Townfall Steam page</figcaption>
</figure>

They overlap in the worst possible way. Streaming in a new area is exactly the
moment a pile of never-seen material permutations arrives, so the streaming
hitch and the compile hitch land on the same frame and get blamed on whichever
one you already believed in. TechPowerUp's own note is the tell: the stutter
settles down once you have explored an area properly or come back to it later,
which is the signature of something being cached on first contact rather than a
GPU that cannot keep up.

## Precaching only catches what it can see coming

Unreal has had an automatic PSO precaching system for several versions now, and
it works. It walks the materials a scene is about to need, hands the driver the
pipeline descriptions ahead of time, and the compile happens on a worker thread
instead of in front of the player.

The catch is in "about to need". Precaching sees the material instances that
exist in the level, on the components, in the loaded assets. It does not see a
dynamic material instance gameplay conjures the moment a mechanic fires. It does
not see a permutation that only exists once a particular vertex factory meets a
particular light and a particular shadow pass, if nothing in testing ever put
those three together. Anything behind a switch nobody flipped during the
gathering pass shows up at runtime as a surprise, and a surprise is a stall.

Foliage is the hardest case there is for this. Take one grass type: it needs a
pipeline for the base pass, another for shadow depth, another for the velocity
pass, more again once world position offset is doing wind on it, and Lumen —
which TechPowerUp confirms is doing the lighting here — adds its own. Multiply
by however many plant species the environment team placed. Then note that all of
it arrives in bulk, at once, the instant you walk over a streaming boundary into
a wooded stretch. Which is precisely where players say the hitching is worst.

Foliage has a habit of being the thing that breaks the budget. FromSoftware
[thinned out Limgrave's grass to hold 30fps on Switch 2](/blog/elden-ring-switch-2-limgrave-grass-30fps/),
and that was a considered decision made by people who knew exactly what the
plants cost. The Townfall case is the same bill arriving without anyone having
opened the envelope.

## The sixty seconds in the menu

The community remedy doing the rounds is to launch the game, leave it sitting on
the main menu for a minute, and only then press start. People report it helps.

That is diagnostic. It means the compilation is happening — there is a
background pass chewing through pipelines while you look at the title screen.
TechPowerUp puts it plainly: there is a shader step at launch, and it does not
compile all the shaders. So the work starts, nothing gates you behind it, and
whatever the step missed finishes during act one, in pieces, on your frame
budget.

Compare that with the version of this that works. Infinity Ward's Modern
Warfare 4 beta [moved shader compilation out of your first match entirely](/blog/modern-warfare-4-shader-preloading-stutter/),
running it as a background task from the moment the install finished, before you
ever pressed play. Different genre, vastly different budget, same underlying
bill — and one of the two decided who pays it and when.

I have seen that trade made in enough projects to know it is not an oversight.
A blocking "preparing shaders" screen on first boot is honest and it is also
four to eight minutes of a black progress bar, which is the first thing a
launch-day reviewer photographs and the last impression you want on a horror
game that opens on atmosphere. Somebody weighed a visible wait against invisible
hitching and picked the hitching. Plenty of shipped Unreal titles have made the
same call.

There is no frame generation in the build, for any vendor, which TechPowerUp
notes alongside the missing XeSS support — an odd omission on a 2026 Unreal 5
title, where wiring it up is closer to an afternoon than a milestone. Worth
saying that frame gen would not have saved this anyway. Interpolation needs two
frames to work between, and a 300ms compile stall is a frame that never arrived.

## Konami has admitted it

Screen Burn and Konami are not disputing any of the above. A notice went up on
the game's Steam news page and on the official Silent Hill account confirming an
update is in development for the performance problems on the PC builds, Steam
and Epic both. No date, and no detail on which of the faults it targets.

The timeline explains why the complaints arrived before the game did. Deluxe
edition buyers got in on 22 September, two days ahead of the standard release on
the 24th, which gave the reports a head start on the review cycle. Steam's user
sentiment through the first days has been reported both as mixed and as mostly
positive at around seven in ten — the counts were small and moving fast enough
on 25 September that I would not lean on either figure. Performance and crashes
are what the negative ones are about, consistently.

## What this does to the review

Eleven verdicts [averaged 8.0 across a four-point spread](/blog/silent-hill-townfall-review/)
when the embargo lifted on the 21st, with the atmosphere getting near-universal
praise and the stealth taking most of the damage. None of that was wrong. Those
were review builds, on review hardware, played by people who had already sat
through whatever first-boot compile there was before they started taking notes.

A score describes a game. Frame pacing describes a build, and builds get
patched — this class of fault more often than most, because the fix is usually
a wider precache gather rather than a rewrite. What it costs in the meantime is
the one thing Townfall was reviewed well for. Fog, silence, a village you are
frightened of walking into, and a 300ms freeze every time the village gives you
a new tree.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=WARs8turgnM" target="_blank" rel="noreferrer">
    <img src="/img/blog/silent-hill-townfall-pc-stutter-shader-cache/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from KONAMI's SILENT HILL: Townfall launch trailer" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>KONAMI's own launch trailer, the PEGI cut. It opens on YouTube rather than playing here because the game is rated 18 and the video is age-restricted. It is a trailer, not a performance capture — nothing in it tells you anything about frame times.</figcaption>
</figure>

---

*Hardware figures above are DSOGaming's single-bench result and TechPowerUp's
thirty-five-card benchmark, both published after the 24 September release. The
patch confirmation is Konami and Screen Burn's own notice on the game's Steam
news page and the official Silent Hill account, reported on 25 September; no
release date has been given for it.*
