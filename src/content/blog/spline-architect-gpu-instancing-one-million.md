---
title: A Unity spline tool just went from 100,000 objects to a million
date: 2026-08-13
category: 3D
excerpt: Spline Architect's new update adds GPU instancing along splines at a scale that used to mean switching to Houdini. Here is why that number matters more than it sounds.
cover: /img/blog/spline-architect/cover.svg
---

Mike Danielsson's **Spline Architect**, a Unity Asset Store tool for shaping roads,
terrain, vegetation and pipes along splines, shipped an update this week that adds
**GPU instancing along splines at up to 1,000,000 objects**, according to 80.lv's
coverage. The tool's own store listing still advertises "over 100,000 instances" as
the headline figure, which tells me that copy simply has not caught up yet — but the
jump itself is the actual story, not the exact round number.

I want to explain why, because "a bigger number of objects" undersells what changed.

## What scattering along a spline actually costs

Anything that repeats along a curve — guardrail posts, cobblestones, cable runs,
tree lines, pipe segments bolted to a wall — is usually built the same way. You place
one mesh, tell the tool to repeat it along a path at a spacing and rotation rule, and
it fills in the rest. Cheap to author, expensive to render, because each of those
copies used to mean either a separate draw call or a CPU loop deciding where every
single instance goes before the GPU ever sees a triangle.

That CPU step is the ceiling. Somewhere in the tens of thousands of instances, most
spline-scatter tools start dropping frames in the editor before you have even hit
Play, because placement math for instance ten thousand and one is competing with
everything else on the main thread.

## Why moving it to the GPU changes the ceiling, not just the speed

GPU instancing along a spline means the placement math — position, rotation, scale
variance, spacing — runs on the GPU alongside the draw itself, instead of being
precomputed on the CPU and handed over as a fixed list. That is the difference
between "faster" and "a different order of magnitude." A ten-times speedup on a CPU
loop still hits a wall. Moving the work off the CPU entirely removes the wall, at
least until you hit VRAM or fill rate instead — which is a much friendlier ceiling to
run into, because it degrades gracefully instead of stalling the editor.

A million objects along a spline is not a number most environment scenes need in one
go. But it is the number that tells you the tool stopped being a convenience feature
for medium-density set dressing and started being infrastructure you could build a
city block or a mountain pass out of, dense vegetation and all, without profiling it
to death first.

## Where this actually sits against Houdini and geometry nodes

This is the part worth being honest about. Houdini has done GPU-friendly,
massively-instanced scattering along curves for years, and Blender's geometry nodes
can get most of the way there with enough patience. Neither is what a solo Unity dev
or a small studio's environment artist reaches for on a Tuesday, because both come
with a learning curve and, in Houdini's case, a licence cost that a $39 Asset Store
plugin does not.

That is the actual pitch here, and it is a good one: procedural, GPU-scale scattering
inside the engine you are already shipping in, without round-tripping through a DCC
just to lay out a road's worth of streetlights. It will not replace Houdini for
anyone doing genuinely complex procedural generation. It does mean a lot of
mid-scope environment work that used to justify that round trip might not need to
anymore.

## The part I'd actually check before relying on it

One figure, one outlet, and a store listing that has not been updated to match — that
is not a reason to distrust the claim, but it is a reason to test it on your own
hardware before you plan a scene budget around it. "Up to a million" is doing a lot
of work in that sentence, and it almost certainly assumes a specific GPU tier, a
simple enough mesh, and instancing settings tuned for the demo. I would want to see
it running on mid-range hardware with an actual production-weight mesh before I
treated a million as anything other than a ceiling that exists, rather than one I
could plan a shot around.

Still: GPU-instanced spline scattering landing in a $39 Unity plugin instead of
staying locked behind a Houdini licence is the kind of small tooling shift that does
not make headlines outside 80.lv, and quietly changes what a two-person team can
attempt.
