---
title: "Caddis 1.0: a node graph per layer, and Linux"
date: 2026-09-02
category: 3D
excerpt: Mike Gaynor's After Effects alternative left beta with more than 130 nodes and a $129 perpetual licence. The Linux build is what pipelines will notice.
cover: /img/blog/caddis-1-0-node-graph-per-layer/video-thumb.jpg
draft: true
---

Select a layer in the Caddis timeline and a node graph opens next to the
viewport. Not the composition's graph. That layer's graph, scoped to that
layer, with everything you do to the image laid out as boxes and wires while
the stack above and below it stays a stack.

That is the whole design, and it is a stranger decision than the press line
makes it sound.

<figure>
  <button class="video-embed" data-video="zjIr-0Mfm6Q" data-title="Introducing Caddis V1" type="button">
    <img src="/img/blog/caddis-1-0-node-graph-per-layer/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Introducing Caddis V1 video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The "Introducing Caddis V1" video that went out with the 1.0 release. Quickest way to watch a per-layer graph open and get rewired without leaving the timeline.</figcaption>
</figure>

## Two mental models that normally don't share a room

Motion design has been layer-shaped since After Effects turned up in 1993. You
stack things, you put keyframes on them, you read the composition top to
bottom. Time is the primary axis and everything else hangs off it.

Compositing went the other way. Nuke, Fusion, Houdini's image contexts — the
unit is an operation on an image, and you wire operations together so the path
from source to output is visible and re-orderable. Time is in there, but it is
not what the interface is organised around.

Both models are load-bearing and neither one absorbs the other cleanly. Ask a
compositor to keyframe forty title cards in Nuke and watch the enthusiasm
drain. Ask a motion designer to branch a layer's treatment three ways in After
Effects and recombine it, and you get pre-comps — a second timeline hidden
behind a thumbnail, holding state you cannot see from where you are working.
Everyone who has opened a project six months later and had to spelunk through
four nested comps to find where a blur came from knows the cost.

An effect stack on an AE layer is a list. Ordered, linear, one thing after
another. You can reorder it. You cannot fan it out and bring it back together
without leaving the layer.

So the pre-comp is where AE hides its graph. Caddis takes that hiding place and
puts it on screen, in the panel next to the picture, still attached to the layer
it belongs to.

## What that buys, and what I'd check first

The appeal for anyone who has done both jobs is obvious enough. Composition
order stays legible as a stack, which is how motion design work is actually
discussed — this over that, this from frame 40. Per-layer image work gets to
branch, which is how compositing work is actually built.

The question I would put to it in the first hour is whether a graph in one
layer can reach another layer's output. Cross-layer references are trivial in
Nuke and they are most of what makes a node graph worth having: one degrain,
read by six branches. If each layer's graph is a sealed island, this is a very
good effect stack rather than a compositor, and it should be judged as the
former. I have not put hands on it, and none of the write-ups I can reach
answer that directly.

Version 1.0 ships with more than 130 nodes, which is a real library rather than
a demo, and the renderer is GPU-accelerated.

## The line in the release notes that matters

Caddis runs on Linux.

After Effects never has, in thirty-three years, and that single absence has
shaped more facility pipelines than most people notice. Nuke runs on Linux.
Houdini, Maya, Katana, RV — Linux. A studio that standardised its workstations
on Rocky or RHEL has one motion design answer, which is to do it in Nuke and be
slightly miserable, or to keep a Windows island for the people doing titles and
graphics, with its own licences, its own storage mounts and its own reason to
break on a Thursday.

A GPU-accelerated motion tool that installs on the same boxes as the rest of
the pipeline is a smaller thing than a node graph on paper and a bigger one in
practice. It is also the kind of decision solo developers make and large vendors
don't, because the Linux motion design market is not large enough to justify a
port to anyone with a shareholder.

Whether it holds up under a facility's actual load — colour management, EXR
throughput, a farm — is unknown, and a 1.0 from one person should be expected
to have edges there.

## Money, and the calendar

As listed on **2 September 2026**: $129 for a perpetual licence, with a $99
launch price for early buyers. You can download it and keep using it for
nothing; export is open for the first seven days, and the licence unlocks it
permanently after that. No subscription. The current build is 1.0.5, on Windows
10 or later, macOS 12 or later, and Linux.

Pricing pages move, so that is the state of it today rather than a promise.

The beta opened in May and 1.0 landed in August — four months, one person, from
public beta to a paid release with a three-figure node library. That pace is
worth sitting with, whichever way you read it. It is either a story about how
much a single motion designer can now build, or a reason to look carefully at
the edges before a job depends on it. Probably both, and the trial is free
long enough to find out which.

---

*Node count, platform support, pricing and the beta timeline compiled from CG
Channel's and CGPress's coverage of the beta in May 2026 and the 1.0 release,
and from the product listing as reported. Caddis's own site was unreachable
from here at the time of writing, so nothing above is quoted from it directly.
Cross-layer graph references are unconfirmed either way.*
