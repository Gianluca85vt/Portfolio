---
title: "Blender 5.3 makes LoopTools native, in C++"
date: 2026-10-12
category: 3D
excerpt: The most-downloaded Blender add-on is becoming a core C++ operator. What that changes for retopology work, and why sources disagree on which release.
cover: /img/blog/blender-5-3-looptools-native-cpp/shot-01.jpg
sources:
  - outlet: BlenderNation
    url: https://www.blendernation.com/2026/10/12/all-loop-tools-now-native-in-blender-5-3/
  - outlet: Blender Projects
    url: https://projects.blender.org/blender/blender/issues/153880
artistView:
  take: "Porting the most-used add-on in the ecosystem into C++ is unglamorous maintenance work, and it is the kind that quietly decides whether a modeling session feels responsive at 200,000 verts or feels like waiting. Judged from the release notes and the tracker task rather than from the beta."
  works:
    - "Pipeline: a core operator survives a version-locked studio build and a render-farm image, where an add-on somebody forgot to tick does not."
    - "Performance: the operators that get used on dense retopology meshes — Relax, Flatten, Space — are exactly the ones a Python implementation punished you for, so a C++ rewrite lands where the pain was."
  misses:
    - "Consistency: Relax is described as branching on select mode, running the LoopTools algorithm for verts and edges and Blender's own Smooth for faces. One menu entry, two behaviours, is a thing to re-learn."
    - "Documentation: with the port staged across releases and blender.org, the tracker and the coverage each describing a different subset, nobody reading from outside can currently say which operator is native in which build."
draft: true
---

You have a ring of vertices that should be a circle. What you have is an
eight-sided approximation of one, extruded out of something else twenty minutes
ago, and the bevel you are about to run across it will show every one of those
eight flat spots. So you select the ring, hit To Circle, and
move on.

That operator has lived in an add-on called LoopTools for about fifteen years.
Bart Crouch wrote it. It ships inside Blender and always has, sitting in
Preferences with its checkbox off until you go and tick it, which is the kind
of detail that sounds trivial until you are the person on a support call asking
somebody why their right-click menu is missing half the entries it should have.

As of Blender 5.3 it is not an add-on any more. The operators are being
rewritten from scratch in C++ and moved into core, and BlenderNation flagged on
12 October that the set is now native in the 5.3 beta.

## Why this one, and not the other four hundred add-ons

The reason is in Blender's own tracker task for the port. LoopTools is the
most downloaded Blender add-on there is — the task puts it at roughly 1.5
million downloads. For a thing that ships in the box and only needs enabling,
that number means an enormous amount of people went looking for it by name.

The task also says, in as many words, that the port is an opportunity to fix
long-standing bugs. Which is the honest reason to do this work. An add-on
accumulates a decade of edge cases that nobody wants to touch because the
Python is load-bearing and the author moved on. Rebuilding it in C++ means
somebody has to decide what each operator is actually supposed to do when you
feed it a non-manifold loop, and write that down.

Named in the port: To Circle, Space (Space Edge Loops Evenly), Flatten, To
Curve, and Relax. GStretch appears as a rename — To Annotation — which makes
sense, since what it does is snap a loop onto an annotation stroke. Bridge Edge
Loops is a separate thing and has been a native Blender operator for years,
independent of any of this.

## The part I cannot pin down

Here the sources disagree, and I would rather say so than pick one.

Blender's 5.2 LTS release page is reported to state that three LoopTools
operators — To Circle, Space, Flatten — are built in to 5.2, which shipped in
July. The 5.3 release notes describe the same three operators as now native and
rewritten from scratch in C++ for improved performance. The roadmap marks the
LoopTools port as done and slated for 5.3. BlenderNation, today, says all of
them are native in the 5.3 beta.

blender.org does not resolve from where I am writing, so I could not open the
release pages and settle it.

My reading of the muddle, offered as a reading: "bundled" and "native" are two
different claims and the word native is doing both jobs. LoopTools has been
bundled since forever. What 5.2 and 5.3 are doing is converting it, operator by
operator, into core C++ mesh operations, and a staged conversion described by
three different documents will produce three different answers about where the
line currently sits. If you need to know for a production decision, check the
build you are actually running rather than any page about it.

## What a C++ operator buys a modeler

Python in Blender is fine for a tool that runs once on a selection and fine for
anything that mostly calls into C. It gets expensive the moment it has to walk
a lot of geometry itself, element by element, in the interpreter.

Which is precisely what these operators do. Relax, Flatten and Space are loop
operations: they look at every vertex in a selection, work out where it should
go relative to its neighbours, and move it. On a twelve-vert ring, nobody
notices. On a retopology pass over a scan, where you are relaxing loops across
a mesh in the high tens or hundreds of thousands of verts, the interpreter is
the whole cost. Retopology is where Blender's modeling toolset has been getting
the most attention lately — there is now
[an add-on that reads a mesh and picks which of five retopology algorithms to
run on it](/blog/quadify-ultra-ml-retopology-blender-5/) — and it is the same
pressure showing up in a different place. Dense meshes, interactive editing,
and a tool stack that was written when meshes were smaller.

So the performance claim in the notes is the plain consequence of moving a
per-vertex loop out of the interpreter. It lands on the meshes where you felt
it.

The other thing it buys is boring and worth more. Add-ons break. Every Blender
release moves some part of the Python API, somebody has to update the add-on,
and in the gap your tool is gone. Core operators do not have that failure mode.
If your studio is pinned to one Blender build for a project, or your render
farm runs an image somebody baked six months ago, an operator in core is there
and an add-on is whatever was ticked when the image was made.

## The thing to re-learn

Relax does not come across unchanged. Per the port's design notes it becomes
contextual: in vertex and edge mode it runs the LoopTools relax, and in face
mode it runs Blender's own Smooth. One entry, two algorithms, chosen by what
your select mode happens to be.

I can see the argument — face mode relax never did what people expected
anyway, and Smooth is the operation they wanted. But the muscle memory for this
stuff is deep. Fifteen years of people hitting the same menu item and getting
one behaviour, and now it depends on a mode you changed with a keystroke and
forgot about. Expect a week of confusion and a few forum threads.

5.3 is in beta now, with release reported for November. The other change in
that cycle I have written about is [spectral dispersion in Cycles and why it
renders so slowly](/blog/blender-5-3-dispersion-caustify-spectral-rgb/), which
is the glamorous one. This is the other kind of release note: a tool thousands
of people use every day, moved somewhere it cannot fall off.
