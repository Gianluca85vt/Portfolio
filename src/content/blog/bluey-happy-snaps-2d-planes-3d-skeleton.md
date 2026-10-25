---
title: "Bluey's Happy Snaps: 2D planes on a 3D skeleton"
date: 2026-10-25
category: 3D
excerpt: Gameloft Brisbane built Bluey's cast as flat camera-facing planes with SDF textures, rigged at 45-degree steps. The photography mechanic is what forced it.
cover: /img/blog/bluey-happy-snaps-2d-planes-3d-skeleton/shot-01.jpg
sources:
  - outlet: 80 Level
    url: https://80.lv/articles/bluey-s-simple-2d-look-required-gameloft-s-most-technically-challenging-art-pipeline
  - outlet: Nintendo Everything
    url: https://nintendoeverything.com/blueys-happy-snaps-interview-dev-on-replicating-the-shows-look-making-a-photography-centric-game-nintendo-switch-1-and-2-versions-more/
artistView:
  take: "A flat character in a 3D world is a trick that holds right up until the camera moves, and a game whose whole verb is taking photographs moves the camera constantly. Building seven or eight rigs to cover the turn is the brute-force answer, and on this show it is the right one."
  works:
    - "Art direction: SDF textures hold a clean vector edge at any zoom, which is what lets a photography game survive a child shoving the viewfinder into a character's face."
    - "Pipeline: skinning flat planes to a real skeleton in Control Rig keeps animators working in 3D space, so a studio staffed with 3D animators did not have to retrain as 2D ones."
  misses:
    - "Animation: reviewers describe characters facing the camera rather than whoever they are speaking to in cutscenes, which is where a billboarded cast shows its seams most plainly."
---

Most of the deeper pipeline detail below comes from a single interview, 80
Level's, so treat the specifics as reported rather than independently
confirmed. The broad shape of it — 2D characters, 3D environments — is
corroborated by the studio in a second interview.

The hard part of putting Bluey in a game is not drawing Bluey. It is the head
turn.

Ludo Studio's show is flat. Not stylised-flat, not cel-shaded-flat: the
characters are drawings, with the licence a drawing has to be the wrong shape
from the wrong angle and still read correctly. Put that character in a 3D
world and the problem announces itself the moment anything rotates. Which, in
*Bluey's Happy Snaps*, is constantly — the game is about taking photographs,
so the camera is the controller.

Gameloft Brisbane's answer, per the breakdown that went round last week, is
more literal than I expected.

<figure>
  <button class="video-embed" data-video="8uYZrfXjPfY" data-title="Bluey's Happy Snaps - Play For Real Life gameplay trailer" type="button">
    <img src="/img/blog/bluey-happy-snaps-2d-planes-3d-skeleton/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Gameloft's Bluey's Happy Snaps gameplay trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Gameloft's own gameplay trailer, put out around the 15 October launch. A publisher trailer rather than captured play, so read it for the look and not for how the game runs.</figcaption>
</figure>

## The characters are planes

They are modelled in Maya as flat, camera-facing planes. No volume, no skull,
nothing to rotate. The surface is textured with signed distance fields rather
than bitmaps, which is the choice doing most of the visual work: an SDF stores
the shape as a distance to an edge instead of a grid of pixels, so the edge
stays sharp at any magnification and costs a fraction of the texture memory a
bitmap of equivalent crispness would. The eyes are reportedly built from SDF
bezier curves — a curve definition rather than an image of a curve.

Then the flat plane gets skinned to a 3D skeleton, rigged in Unreal Engine 5's
Control Rig.

That last sentence is the one worth sitting with. A drawing, bound to bones,
posed in world space. It means the animators are doing 3D animation — keys on
a rig, in a viewport, in the engine — and what comes out the other end looks
hand-drawn. The studio has said Unreal 5.6's animation work is what made it
practical to stop living in Maya.

## Seven or eight of everything

A plane facing the camera is fine until the camera walks round it. So there
isn't one rig per character. Game manager Karl von der Lühe told Nintendo
Everything the team built multiple versions of each rig based on 45-degree
angles; 80 Level's account puts it at seven to eight camera-facing angles per
character. Those agree — a full turn in 45-degree steps is eight — and the odd
seven suggests at least one character didn't need the full set, which is the
sort of thing you find out in production rather than plan for.

Eight rigs is eight times the animation, and a children's game ships with a
lot of animation. The team wrote in-house tooling so an animator authors the
pose once on a hero angle and it is carried across the rest. **That tool is
the whole project.** Without it the angle count multiplies the content budget
by eight and the game doesn't get made; with it, the cost is a tool
programmer and a propagation step that someone has to check.

I'd want to know what happens at the boundaries. Somewhere between two of
those angles there is a swap, and a swap in a flat character is a pop unless
something hides it. Fast motion hides a lot. A slow, deliberate pan while a
child lines up a photograph hides nothing at all.

## The outline that doesn't thin out

The other detail I like: a custom shader that fakes an inverse-hull outline
holding constant thickness no matter how far away the character is.

Inverse hull is the old trick — duplicate the mesh, flip the normals, push it
out slightly, render it black. It gives you an outline for free, and it has a
well-known failure: the line is a world-space offset, so it grows as you
approach and thins to nothing as you retreat. In a show, the ink weight is
whatever the artist drew. In a game with a camera the player controls, the
line has to be measured in screen pixels or the character stops looking drawn
at distance.

That is a small fix with an outsized effect, and it is the kind of thing that
separates a stylised game from one that just has a filter on it.

## The other way round

Compare it to how anime studios solve the same problem. Studio Orange goes at
it from the opposite end — real 3D models, [warped and redrawn until the faces
lie about anatomy the way a drawing is allowed
to](/blog/studio-orange-3d-anime-2d-look/) — and pays for it in asset reuse,
because a model you bend per shot is not a model you can reuse across shots.
Gameloft starts flat and pays for it in rig count. Both are buying the same
thing: permission to break perspective.

The SDF decision also reads differently once you remember where this game has
to run. It launched 15 October 2026 across Switch, Switch 2, PlayStation and
Xbox consoles and PC, and the original Switch is the machine setting the
floor. Texture memory is the first thing to go on that hardware — it is most
of [what a Switch 2 port costs an art
team](/blog/diablo-4-switch-2-age-of-hatred-what-porting-costs-art/), never
mind a Switch 1 one. Characters whose entire appearance is a handful of
distance fields and a shader are very cheap to keep resident. Eight rigs are
not free either, but rigs are CPU and memory for skeletons, not VRAM for maps.

What reviewers have flagged lands about where you'd predict. One noted
characters gazing forward instead of at whoever they're talking to in
cutscenes. A cast that only exists at eight discrete facings will struggle
with an eyeline, and cutscenes are precisely where an audience looks for one.
