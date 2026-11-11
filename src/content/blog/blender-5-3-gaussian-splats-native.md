---
title: "Blender 5.3 Gaussian splats: import only"
date: 2026-11-11
category: 3D
excerpt: Splats are native point clouds in Blender 5.3 and render in EEVEE, Cycles and Workbench. No export, no mesh conversion, so plan the scene for it.
cover: /img/blog/blender-5-3-gaussian-splats-native/shot-01.jpg
sources:
  - outlet: 80 Level
    url: https://80.lv/articles/blender-5-3-has-finally-arrived/
  - outlet: Radiance Fields
    url: https://radiancefields.com/blender-5.3-will-bring-native-3d-gaussian-splat-import-and-rendering
  - outlet: heise online
    url: https://www.heise.de/en/news/Blender-5-3-imports-and-edits-Gaussian-Splats-11520011.html
artistView:
  take: "Treating a splat as a point cloud rather than a new object type is the conservative call and the right one: it inherits selection, instancing and Geometry Nodes on day one instead of waiting three releases for parity. The cost of that choice is visible in what Apply Transform drops."
  works:
    - "Pipeline: one import path feeding Workbench, EEVEE and Cycles means the thing you block out in solid mode is the thing that renders, which is not true of most add-on splat workflows."
    - "Geometry Nodes: an Import SPZ node makes a capture a procedural input, so a scan can be swapped without rebuilding the scene around it."
  misses:
    - "Colour: the release notes warn that most splat authoring tools work in sRGB while Blender works linear, and that mismatch lands on the artist to diagnose rather than on the importer to fix."
    - "Transforms: Apply Transform does not carry splat scale, rotation and spherical-harmonic attributes, which is the kind of gap that bites once, silently, in a shot that is already approved."
---

A `.ply` from a splat trainer now opens in Blender with nothing installed. That
is the whole headline, and for anyone who has spent the past two years
juggling 3DGS add-ons against whichever Blender version broke them last, it is
the part worth saying first.

Blender 5.3 is out as of today, 11 November 2026 — the release schedule had
carried 10 November for months, and the coverage landed a day behind it.
Gaussian splats are the feature everyone is leading with. Fair enough. "Native
support" is doing a lot of work in those headlines, though, and what shipped has
a specific shape that decides how useful it is to you.

## What a splat becomes when you open it

A point cloud. Not a mesh, not a volume, not a new datablock type with its own
half-finished editor. Blender loads the splat as a `PointCloud` and tags it,
and from there it rides on everything point clouds already do.

Import comes from PLY and SPZ. Blender's own release page is reported to list
glTF as a third route; the secondary coverage I can see names only PLY and SPZ,
and I could not reach developer.blender.org from here to settle it, so check
the notes in the build you download. Rendering works in Workbench solid mode,
EEVEE and Cycles. Geometry Nodes gets an Import SPZ node and a Set Point Cloud
Type node, which is the quietly useful pair: a capture becomes a procedural
input you can swap, scatter or instance without rebuilding the scene.

Reusing the point cloud type is the decision I would have argued for. It means
splats arrive with selection, instancing, modifiers and nodes working, rather
than arriving as a special case that gets a proper outliner entry in 5.6. The
release notes say as much about the future — transform behaviour on the point
cloud object, rigging included, is expected to change.

## There is no way back out

No export. Neither format writes, in 5.3. A splat that goes into a .blend stays
in that .blend.

And there is no built-in conversion to a mesh. You cannot import a capture,
retopologise against it and ship geometry — not through Blender alone. If the
deliverable is a mesh, the splat is reference, and reference is a perfectly
good thing for it to be.

This is the same wall Foundry hit from the other side. When Nuke 17.1 added
splat relighting, the honest caveat in the release was that
[a splat carries no normals and no position data to light against](/blog/nuke-17-1-gaussian-splat-relighting/),
so what you get is an approximation. Blender's limitation is the mirror of it:
plenty of render paths in, nothing out, because the format Blender would have
to write is the one it has deliberately not tried to interpret as surfaces.

## Three things that will cost you an afternoon

The release notes list limitations, and two of them are the sort you only find
by losing time to them.

Apply Transform does not handle the splat scale, rotation and spherical
harmonics attributes. So the object transform and the splat's own attributes can
disagree after an operation that normally means "bake this down and forget it".
Scale a scan, apply, and the lighting response can stop matching the geometry.

Then colour. Most splat authoring tools work in sRGB; Blender works linear, and
the notes say the difference can produce rendering inaccuracies. Which means
the first thing to check when a capture looks washed out in Cycles is not your
lighting.

Performance is still being optimised, in Blender's own words. Dense captures in
the viewport are a known cost, not a configuration error.

<figure>
  <button class="video-embed" data-video="u8V5qFaLD1E" data-title="How Gaussian Splats Actually Work in Blender 5.3 (Explained Simply)" type="button">
    <img src="/img/blog/blender-5-3-gaussian-splats-native/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a Blender 5.3 Gaussian splat walkthrough" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A walkthrough of the 5.3 splat workflow, from a phone scan of a desk to the point where pushing the camera in breaks the illusion. Useful for seeing the failure mode rather than the hero shot.</figcaption>
</figure>

## Where the captures come from now

The import path matters because the capture side stopped being exotic. A phone
is enough, and [training a splat on-device with no account and no upload](/blog/phone-gaussian-splat-scanning-offline/)
is the baseline rather than the novelty. Scan a stairwell on a recce, open it in
Blender on the train home, block a shot against it. That loop closes today in a
way it did not last week.

What it does not close is the handoff. A splat in a .blend is a splat in that
.blend, so the thing you send to a client, an engine or a comp is a render, a
camera, or geometry you modelled yourself with the scan sitting behind it. Set
expectations accordingly when someone asks for "the scan".

## The rest of the release

DLSS is the other item people noticed. Cycles gains DLSS 4.5 Ray Reconstruction
as a denoiser option alongside OptiX. NVIDIA's RTX-only, as you would expect,
and I have not found a published minimum spec specific to Blender beyond the
general statement that Ray Reconstruction runs across the RTX range. For
look-dev previews — the place where OptiX denoising already earns its keep — a
second temporally-aware option is worth testing on your own scenes before you
form a view, because denoiser quality is extremely scene-dependent and the
marketing comparisons never are.

Also in: native dispersion in the Principled BSDF, the LoopTools operators
landing in core as C++, and, per the release coverage, the Vulkan backend
becoming the default on Windows and Linux. That last one is the change most
likely to surprise someone on an older GPU driver, and it is the one getting the
least attention this week.
