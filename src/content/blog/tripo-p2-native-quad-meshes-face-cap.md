---
title: "Tripo P2.0: native quad meshes, 25,000 face cap"
date: 2026-10-07
category: 3D
excerpt: Tripo P2.0 is the first AI 3D generator to output quad topology natively. Quads cap at 25,000 faces against 50,000 for triangles.
cover: /img/blog/tripo-p2-native-quad-meshes-face-cap/shot-01.jpg
sources:
  - outlet: VoxelMatters
    url: https://www.voxelmatters.com/tripo-ai-launches-p2-0-model-to-generate-native-quad-meshes-for-production-pipelines/
  - outlet: 3Dnatives
    url: https://www.3dnatives.com/de/tripo-ai-sammelt-3-milliarden-yuan-3d-modellgenerator-23092026/
artistView:
  take: "P2.0 moves the retopology pass inside the generator, which is genuinely useful for props and set dressing — the assets nobody was going to spend an artist's week on anyway. The 25,000-face quad ceiling and the word quad-dominant both mark the line it has not crossed."
  works:
    - "Pipeline: quads straight out of the generator delete a step on mid-ground geometry, and that step was never creative work. It was repair."
    - "Asset structure: clean part separation, as the coverage describes it, is what makes generated geometry openable at all. Separate shells mean separate materials and separate pivots."
  misses:
    - "Topology: quad-dominant output leaves its triangles where curvature gets hardest, and on a deforming mesh that is mouth, elbow and shoulder territory."
    - "Budget: 25,000 quad faces against 50,000 triangles halves the ceiling for the format you can rig, which puts hero characters out of reach for now."
---

Two numbers sit in Tripo P2.0's spec sheet and between them they describe the whole release. Triangle meshes: 500 to 50,000 faces. Quad meshes: 500 to 25,000. Same model, same prompt, half the face budget if you want topology a pipeline will take without an argument.

P2.0 shipped on 21 September. The trade coverage describes it as the first AI 3D generation model that produces quad meshes natively, rather than producing triangles and leaving the quads to a retopology pass afterwards. The Preview build from August topped out at 50,000 triangles and nothing else; the finished release added the quad path, several variants per prompt, and a Mesh Edit mode. Tripo closed about $446m before any of it landed — three billion yuan across Series B and B+, led by the MPCi fund, done on 1 September.

## Why quads, for anyone who has not had to care

<figure>
  <img src="/img/blog/tripo-p2-native-quad-meshes-face-cap/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Sphere wireframe, via Wikimedia Commons</figcaption>
</figure>

A quad mesh subdivides predictably, deforms predictably, and survives a human opening it up and moving things. Triangles manage none of that with any consistency. Character rigs, subdivision surfaces and sane UV layouts all assume four-sided faces, which is why "AI-generated 3D" has in practice meant AI-generated 3D that somebody then rebuilds by hand before it can go anywhere.

So a generator that emits quads removes a step nobody enjoys and nobody bills as creative work.

## The word doing the work is "dominant"

Quad-*dominant* is the phrasing in the coverage. Most faces are four-sided, some are not, and in any generated or remeshed mesh the leftover triangles do not scatter politely. They gather where the curvature gets complicated — the corner of a mouth, the inside of an elbow, the top of a shoulder. The places a deforming surface can least afford them.

This blog made the other half of this argument in August, about [a Blender add-on that picks which of five retopology algorithms to run on your mesh](/blog/quadify-ultra-ml-retopology-blender-5/). The objection there lands harder here. Edge flow is a statement about how a shape is going to move: a loop sits around an eye because the eye closes, and the loops across a shoulder are spaced for the arm's range, not for the shoulder's curvature. A generator that has never seen the rig, the blend shapes, or the shot has no way to know any of that. Training on a million finished meshes tells it what edge flow usually looks like. It cannot tell it what this character will be asked to do in episode four.

## 25,000 is a prop budget

Which puts the face cap back in the middle of the table. 25,000 quads is comfortable for a crate, a lamp, a chair, a rifle — the mid-ground and background objects that fill a set, the ones studios already buy in packs rather than model. For a hero character it is thin. A game character's head can eat most of that once it has the loops a face actually needs, and the body has not started.

Read P2.0, then, as a props and set-dressing tool whose output now arrives in a format you can open and change. That is a real improvement, and a narrower one than the phrase "production-ready" tends to imply.

Small teams are where that narrower version bites hardest, and in both directions. [Wolf Haus is shipping an open-world co-op sim with about a dozen people and no generative content tools at all](/blog/join-us-wolf-haus-12-person-no-generative-ai/), which is a position I respect and which also means somebody there is modelling an awful lot of crates. Set dressing scales worse than anything else at that headcount.

## The part getting one line and deserving more

Clean part separation. Fused geometry is the thing that makes a generated mesh unusable in a way no polycount explains: one welded shell where the cup, the handle and the saucer should be three objects. No way to select the handle, no way to give the saucer its own material, no pivot to put on a lid. If P2.0's separation holds up on real prompts, that is worth more on an average Tuesday than the quads are.

It is the same wall the rest of the pipeline keeps hitting. Scans, CAD exports and generated geometry all arrive as dense unstructured surfaces with no edge flow and no part boundaries, and all three need the identical work doing to them before anyone can touch them. P2.0 is the first of the three to attempt that work upstream, at the point the geometry is made, instead of downstream in somebody's afternoon.

*Figures here come from the trade coverage of the release and Tripo's own announcement, not from a test I ran. I have not put P2.0 through a production asset, so treat the quad percentages and the part-separation claim as the maker's position until somebody independent takes it apart.*
