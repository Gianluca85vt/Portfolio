---
title: A Blender addon now picks your retopology algorithm for you
date: 2026-08-20
category: 3D
excerpt: Quadify Ultra ships an ML router for Blender 5.0 that reads a mesh's geometry and decides which of five retopology algorithms to run on it. It's not doing the retopology — it's doing the judgment call that used to be yours.
cover: /img/blog/quadify-ultra-ml-retopology-blender-5/cover.svg
---

Retopology tools are having a moment right now, and it says something that I nearly wrote
about the boring one. Today's feeds flagged **Quad Maker**, a manual quad-drawing addon for
Blender modelled on Maya's Quad Draw — click, drag, place a quad, repeat. That's the honest,
unglamorous version of the job, and it's had an update this week. But digging around it
turned up something a lot stranger sitting one tab over: **Quadify Ultra**, a Blender 5.0
addon that doesn't retopologize your mesh so much as decide *how* it should be retopologized,
before it touches a single vertex.

## What it actually does

Quadify already existed as a straightforward auto-retopo tool. Ultra adds a routing layer on
top: select a mesh, hit a hotkey, and it analyses **18 geometric features** of that specific
object — curvature, edge density, hard-surface breaks, that kind of thing — then picks which
of **five different algorithms** to run: a general Smart mode, a Hard Edge Preserving mode,
Dissolve + Requadify, QuadriFlow + Transfer, or Voxel Remesh + Transfer. It shows you a
confidence score before committing, and it claims to preserve your existing UV seams,
material boundaries and sharp edges through whichever path it picks — that's the part
separate from most one-click remeshers, which tend to nuke all three.

The developer describes it as a KNN-based routing engine rather than a single trained model,
and there's a **Community ML Model** option: opted-in users can contribute anonymous
telemetry on which algorithm worked for which mesh type, and the routing supposedly gets
sharper for everyone as more people use it. Posted production numbers — hard-surface vehicle
panels landing at 88–97% quads in under a second — are the developer's own benchmarks from
the release thread, not an independent test, so read them as a claim rather than a verdict.
It's a **$200 one-time purchase**, Blender 5.0 and up.

## The part worth sitting with

Automating the retopology *pass* isn't new — QuadriFlow, Instant Meshes and Blender's own
Voxel Remesher have been doing versions of that for years, with predictably mixed results
depending on the mesh. What's new here is automating the **decision about which of those
approaches to use**, which is a different kind of task entirely. Picking the right algorithm
for a given mesh is exactly the bit of retopology that actually requires judgment: a
hard-surface gun barrel and an organic creature torso do not want the same treatment, and
knowing that on sight is most of what separates a technical artist from someone who just
mashes the remesh button and hopes. Quadify Ultra is proposing to fold that judgment call
into the tool.

I don't think that replaces the skill — a router that's wrong 12% of the time on its own
published numbers still needs someone who can look at the output and know it's wrong, which
means it needs someone who already understands why each algorithm exists. But it does change
what the entry-level version of that judgment looks like. The thing junior artists used to
build by retopologizing a hundred different mesh types by hand, slowly learning which method
suits which shape, is exactly the thing this tool is trying to shortcut. That's a genuine
loss even if the tool works well, the same way spellcheck is a genuine loss for anyone who
never has to learn to spell.

## The telemetry angle

The Community ML Model is opt-in and anonymous, per the listing, and I have no reason to
doubt that as stated. But it's worth being clear-eyed about what it actually is: every
participating studio or freelancer is quietly training a shared model on the geometric
fingerprint of whatever they're modelling, in exchange for slightly better routing decisions.
For an indie prop pack that's a non-issue. For anyone under an NDA on an unannounced game or
film asset, "anonymous" doesn't automatically mean "fine to opt into" — check what your
contract actually says about sending derived data off-machine before you tick that box, not
after.

## Where I'd actually use this

Background and mid-ground hard-surface work is the obvious fit — the vehicle-panel numbers
in the release thread are believable for exactly that reason, since hard-surface geometry
with clean curvature breaks is the easiest case for any router to get right. I'd be far more
skeptical running it unsupervised on hero organic topology, faces especially, where the
"right" edge flow is about deformation and animation needs the router has no way to know
about. Worth trying on the parts of a scene nobody's going to be looking closely at; worth
checking by hand on the parts they are.

*This is based on the developer's release notes and forum threads (Blender Artists, Polycount)
covering Quadify Ultra's launch — I haven't run the addon myself, so treat the accuracy
numbers above as the maker's claim rather than something I've verified in production.*
