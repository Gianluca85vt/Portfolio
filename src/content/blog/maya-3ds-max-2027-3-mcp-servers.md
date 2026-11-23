---
title: "Maya and 3ds Max MCP servers: one undo step"
date: 2026-11-20
category: 3D
excerpt: "Autodesk put MCP servers into Maya and 3ds Max 2027.3, so Claude or Cursor can rewrite your scene. Read-write is off by default and each action is one undo."
cover: /img/blog/maya-3ds-max-2027-3-mcp-servers/cover.svg
sources:
  - outlet: CG Channel
    url: https://www.cgchannel.com/2026/11/autodesk-releases-maya-2027-3-with-new-agentic-ai-features/
  - outlet: Animation World Network
    url: https://www.awn.com/news/autodesk-adds-agentic-ai-and-mcp-servers-maya-and-3ds-max
  - outlet: Digital Production
    url: https://digitalproduction.com/2026/11/20/maya-3ds-max-mcp-arnold-viewport/
  - outlet: Autodesk Media & Entertainment blog
    url: https://blogs.autodesk.com/media-and-entertainment/2026/11/18/whats-new-in-ai-more-of-what-energizes-you-less-of-what-drains-you-with-autodesk-assistant-and-mcp-servers/
artistView:
  take: "Letting an agent write to the scene graph is a question about the undo stack before it is a question about intelligence. Autodesk answered it the conservative way — off by default, an approval click, one undo per action — which is the answer a supervisor would have asked for and a quieter launch than the feature list suggests."
  works:
    - "Pipeline: collapsing an agent's whole action into a single undo step is the detail that makes this usable on a shot. A tool that leaves forty entries on the stack is a tool you daren't run twice."
    - "Lookdev: Arnold as an accelerated viewport renderer, rather than a separate ActiveShade window, removes a window-management habit that has been in the way of lighting work for years."
  misses:
    - "Scope: the splat support reads differently depending on which write-up you trust, and the two readings are not close. A tech preview in a .3 update is a thing to test on a copy of the scene, never on the shot you owe on Friday."
draft: true
---

I went to the undo stack first.

That is where a tool that edits your scene for you either becomes usable or
becomes a liability, and the answer here is a good one: per Autodesk's own
write-up, each agent action can be undone as a single step. One ctrl-Z, whatever
the agent touched. Anyone who has run a script that renamed three hundred
objects and then had to click undo three hundred times knows why that line is
the one worth reading twice.

So. **Maya 2027.3 and 3ds Max 2027.3** both shipped this week — Autodesk posted
the AI write-up on **18 November 2026** and the trade coverage followed on the
19th. Both updates add an MCP server, in tech preview, and both upgrade the
built-in Autodesk Assistant from something that could look at your scene to
something that can change it.

## What the MCP server opens

An MCP server in a DCC means the application stops being the thing you drive and
starts being a thing something else can drive. Autodesk's documentation, as
quoted in the coverage, describes external MCP clients reading and changing your
3ds Max scene, and names Claude and Cursor as the examples. The Maya write-ups
describe the same arrangement with external tools including Claude and ChatGPT.
It runs on your machine, with token-based authentication.

The safeguards are deliberately dull, and worth listing in full:

- read-write access is **off by default**
- the Assistant shows you what it intends to run, and you click Allow
- external agents sit behind the same access levels and the same approval step
- each action, one undo

Autodesk includes this with a Maya or 3ds Max subscription while it is in tech
preview. Per the reporting, the agent itself is your own expense — the server
talks to whatever client you already pay for.

If that posture sounds familiar, it is because [Maxon shipped the same shape in
Cinema 4D 2026.4 with its MCP server off by default](/blog/cinema-4d-2026-4-mcp-server/)
back in October, and the questions I asked of it then are the questions I would
ask here: what is the permission scope, what does undo do, and is there a log of
what the thing did. Two of those three now have clear answers in Maya and 3ds
Max. I have not seen an audit log described.

On a facility network that gap counts. The person who has to explain a corrupted
publish is rarely the person who ran the agent.

## The splats, and a disagreement worth naming

3ds Max 2027.3's other headline is Gaussian splats, and my sources do not agree
on how far it goes.

One reading of Autodesk's help page has splats drawing directly in the viewport
through a splat shader, with their real colours, plus 4D Gaussian splat sequence
loading and PLY export. Another reading of the same notes describes PLY import
and export and improvements to import segmentation, without viewport display.
Those are not small differences — viewport display with 4DGS sequence support
is volumetric video in your scene, and PLY plumbing is a file format.

I could not resolve it from here. Autodesk's own pages are unreachable from
where I am writing, so take the splat feature list as reported rather than as
read, and check it against the release notes before you plan around it.

What I can say is which way the wind is going. When [Blender 5.3 made splats
native point clouds it stopped at import, with no export and no mesh
conversion](/blog/blender-5-3-gaussian-splats-native/) — fine for look, useless
for handoff. A PLY export in 3ds Max, if it is there, is the half that makes a
splat something you can pass to the next department instead of a dead end in one
artist's file.

4D sequences are the part I would want to test. A static splat is a capture. A
4DGS sequence is a capture that moves, which means a disk budget, a cache
strategy and a conversation with whoever owns storage.

## Arnold in the viewport

Quieter, and probably the change most people will feel every day. Maya 2027.3
ships with MtoA 5.6.4, which adds an Accelerated Mode for the Arnold viewport,
and in 3ds Max Arnold can be used as a viewport renderer instead of living in a
separate ActiveShade window.

Lighting a shot through a floating render window is a workflow everyone
tolerated and nobody liked. You lose the viewport navigation you have in your hands,
you lose the manipulators, and you spend the afternoon dragging a window to the
side of the screen. Putting the renderer in the viewport is an old idea, late to arrive here, and
the sort of fix that saves twenty minutes a day without appearing in a feature
announcement.

Maya also adds a `pointValues` node for the Dynamic Geometry Attributes work,
and 3ds Max gets new point object types and a Dead Vertices option in the Mesh
Cleaner. Small, specific, the kind of thing that was somebody's bug report.

## Who drove it

The demo everyone is reproducing was recorded by **Shirzad Bahrami**, a
technical animator at Activision Blizzard, who ran the Assistant through
pre-flight checks on a creature — converting its muscles to closed meshes, which
is exactly the chore an agent should be doing and nobody should be doing by
hand at eleven at night. Autodesk placed that example in 3ds Max. A separate
walkthrough covers the Maya side.

The shape of that demo is the honest version of this pitch. It is a checking
job — pre-flight, validation, naming, the pass before publish. Tedious,
rule-based, and expensive to get wrong. An agent with read-write access to a scene graph and an approval
click is a very good scene-checking robot and a fairly bad artist, and Autodesk
has, to its credit, demoed the former.

Whether I would turn the server on depends entirely on the log I have not seen
described yet.
