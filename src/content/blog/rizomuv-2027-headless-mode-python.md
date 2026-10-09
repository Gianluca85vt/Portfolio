---
title: "RizomUV 2027: headless mode, Python by default"
date: 2026-10-09
category: 3D
excerpt: RizomUV 2027 runs its tools with no window open, on Linux, in Python. The unwrap-and-pack half of UV work can finally live on a farm.
cover: /img/blog/rizomuv-2027-headless-mode-python/video-thumb.jpg
sources:
  - outlet: 80.lv
    url: https://80.lv/articles/rizomuv-2027-introduces-faster-unfolding-live-updates-full-ui-customization/
  - outlet: CGChannel
    url: https://www.cgchannel.com/2026/10/rizom-lab-releases-rizom-uv-2027-0/
  - outlet: Toolfarm
    url: https://www.toolfarm.com/news/rizomuv-2027/
artistView:
  take: "UV work splits cleanly into a decision and a calculation, and RizomUV 2027 is the first version of this tool built as though somebody at Rizom-Lab had drawn that line on a whiteboard. Headless mode, Python as the default language and RizomUVLink on Linux are one feature wearing three names, and it is aimed squarely at the calculation half."
  works:
    - "Pipeline: console output and exit codes are the detail that says someone who has written a build step was in the room — a batch tool that fails quietly is worse than no batch tool, because the bad atlas ships."
    - "Automation: Python replacing Lua as the default removes the reason RizomUV scripts lived in their own corner of the pipeline, maintained by whoever could be bothered to learn a second language for one application."
    - "Packing: aligning island borders to the U and V axes during Unfold or Optimize feeds the packer rectangles instead of blobs, and a rectangle is the shape that tiles into a sheet without leaving gutters nobody can use."
  misses:
    - "Performance: the five-times figure is Rizom-Lab's own, carries an 'up to' and applies to large islands, and as of 9 October nobody outside the company has measured it on a real asset."
    - "Scope: nothing here decides where a seam goes, so the farm job you can build with this starts from a mesh that already carries its cuts. The authored half of UV work is untouched, which is honest of them and worth saying out loud."
draft: true
---

Seams are the decision. Everything after them is arithmetic.

That split is why UV unwrapping has stayed a desk job long after the rest of the
asset pipeline moved onto the farm. Where you cut a shoulder, whether the seam
hides under a strap or runs down the outside of the arm, how much of the sheet a
face deserves against a boot — those are judgements about what a texture artist
will have to paint and what the camera will ever get close to. Unfolding the
island you cut, flattening it with as little distortion as the geometry allows,
rotating and packing it to a texel density: sums.

Rizom-Lab shipped RizomUV 2027 on 8 October. The sums no longer need a window
open.

<figure>
  <button class="video-embed" data-video="5IcaZBPnBo0" data-title="RizomUV 2027 Overview" type="button">
    <img src="/img/blog/rizomuv-2027-headless-mode-python/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Rizom-Lab's RizomUV 2027 Overview video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Rizom-Lab's own overview of the release. It is the vendor's video, so the feature claims in it are the vendor's too.</figcaption>
</figure>

## Headless, and the two things that make it count

The new headless mode runs RizomUV's tools without putting anything on screen —
the scripting surface, no interface, aimed at batch jobs, automated builds and
render-farm work. It reports through console output and exit codes.

Two other changes in the same release decide whether that is usable, and both
landed with it.

Python is now the default scripting language. RizomUV has been scriptable for
years, in Lua, and Lua is a perfectly good language that almost nothing else in
a 3D pipeline speaks. Maya is Python. Houdini is Python. Blender is Python. The
tools your pipeline team already maintains, the farm submitters, the asset
validators, the thing that walks a publish directory and complains — Python.
Lua meant RizomUV automation sat in its own corner, written once by whoever
learned it for this one application, and rewritten from scratch when that person
left. That is the kind of friction that keeps a tool off the farm for a decade
after it was technically capable of being there.

RizomUVLink now works on every platform rather than Windows only. Farms are
Linux. A headless mode that ran on Windows alone would be a demo you show at a
trade stand, and 2027 ships on Windows, macOS on both Apple Silicon and Intel,
and Linux as an AppImage.

Exit codes are the difference between a batch step and a liability. A tool that
unwraps four hundred props overnight and reports nothing when island seventeen
folds back on itself has moved the day rather than saved it, onto whoever opens
the atlas in Substance and wonders why the trim is smeared.

## What it does not automate

None of this decides where your seams go, and Rizom-Lab is not claiming it
does.

So the job you can build is the second half: take a mesh that already carries
its cuts — authored by hand, inherited from a previous version of the asset, or
arriving from a generator — then unfold, optimize, pack and write out, to a
texel density and an atlas size the job declares rather than an artist
remembers. On a team where three people each hold a different idea of what
10.24 px/cm means, a density the job states in writing is worth having.

It also puts a floor under the machine-generated end of the pipeline. Tripo's
P2.0 made the case that [sane UV layouts all assume four-sided
faces](/blog/tripo-p2-native-quad-meshes-face-cap/), which is why generated
geometry has in practice meant geometry somebody rebuilds before it goes
anywhere. A generator that emits quads and a UV tool that unwraps them without a
human present are two halves of the same bet.

## Align Borders earns its place in the packer

Align Borders straightens island borders along the U and V axes during an Unfold
or an Optimize, rather than as a separate cleanup afterwards.

Anybody who has packed a sheet by hand knows why that matters. A packer fed
organic blobs leaves gutters between them that no texture can use, and on a 4K
atlas those gutters are real money — resolution you paid for and cannot paint
on. Straight borders pack tighter. They also behave when a texture artist works
in 2D: a straight edge in UV space is a straight edge in Photoshop, which is the
difference between painting a seam along a panel line and chasing it around a
curve.

Doing it during the unfold rather than after is the part that reads as
production experience. Straightening a border afterwards fights the distortion
the unfold already baked in.

## The desk side

Live Update recalculates the affected island the moment you add or remove an
edge constraint. The old loop was constrain, apply, look, undo, try a different
edge — four actions to answer one question. Now the answer arrives with the
question.

The rest of it is ergonomics, and ergonomics is most of a working day: panels
that dock, float, collapse or move to a second monitor, complete layouts saved as presets with custom toolbars, and a
Ctrl+K search across tools and settings. RizomUV has a lot of settings. Many of
them live two panels deep behind names you have to already know.

## The number

Islands can be processed in parallel now, and a new Optimize algorithm is
claimed to be up to five times faster on large islands.

As of 9 October that figure is Rizom-Lab's, repeated by the coverage and
measured independently by nobody. Both "up to" and "on large islands" are
carrying weight in it. Parallel island processing is the more believable half
and the easier one to reason about: islands unfold independently of each other,
so throwing cores at a mesh with two hundred of them scales in a way a single
large island never will. A character with four islands will see less of that
than a hard-surface kit with three hundred.

## Scene scale, and the part to verify

The Scene Outliner now spans objects, materials and polygon groups, large FBX
scenes can be partially loaded, and there are texture-budget controls for
deciding what a scene's sheets are allowed to cost.

Those three belong together, and they are the ones to test before you trust an
unattended pack. A budget control is only as good as what happens when the
budget is exceeded: a job that silently drops everything to half density to make
the atlas fit has made an art decision on your behalf at three in the morning.
Maxon's MCP server [shipped disabled, local-only, with a local audit
log](/blog/cinema-4d-2026-4-mcp-server/) for the same class of reason. Once a
tool acts on a scene with nobody watching, what it reports afterwards matters as
much as what it can do.

The feature list here comes from the coverage and Rizom-Lab's own announcement
rather than release notes read end to end, so treat the specifics as the
vendor's description until you have the build in front of you. RizomUV 2027 is
out now on all three platforms.
