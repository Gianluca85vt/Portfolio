---
title: "Cinema 4D 2026.4: an MCP server, off by default"
date: 2026-10-02
category: 3D
excerpt: Maxon built an MCP server into Cinema 4D so Claude or ChatGPT can drive it. Undo, scoped permissions and an audit log decide whether it is usable.
cover: /img/blog/cinema-4d-2026-4-mcp-server/video-thumb.jpg
sources:
  - outlet: CGChannel
    url: https://www.cgchannel.com/2026/09/maxon-releases-cinema-4d-2026-4-with-a-new-mcp-server/
  - outlet: DEVELOP3D
    url: https://develop3d.com/visualisation/cinema-4d-mcp-server/
artistView:
  take: "Cinema 4D has had a scripting API since before most of us started. What 2026.4 changes is who writes the script, and a caller that guesses means the trustworthy parts of this release are undo integration, scoped tool permissions and a local audit log rather than anything in the feature list."
  works:
    - "Pipeline: shipping it disabled, local-only, with a separate opt-in for other machines on the network is the answer a studio's IT will want before anyone gets to argue about whether it is any good."
    - "Undo: folding model-driven changes into the normal undo stack is the one thing that makes this safe to point at a scene you have already spent a week on."
    - "Permissions: letting an artist choose which groups of tools the assistant may touch means you can hand it naming and hierarchy while keeping it away from the rig."
  misses:
    - "Scope: Maxon's own task list runs from renaming objects to UV mapping, rigging and liquid simulation, and a list that broad in a launch release is a statement of intent rather than a description of what works reliably today."
    - "Verification: an audit log tells you what the assistant did, after it did it. There is still nothing that tells you a 400-object rename went where you meant before you look."
draft: true
---

Maxon shipped Cinema 4D 2026.4 on 30 September with a Model Context Protocol
server built into the application. Point Claude Desktop or ChatGPT's desktop
client at it and you can ask Cinema 4D to do things in words instead of
clicking them. It is off when you install it, it runs on your own machine, and
reaching another machine on the network takes a second, separate opt-in.

Cinema 4D has had a Python API for a very long time. Renaming four hundred
objects to a convention, spinning out twelve material variants, assembling a
multipass comp — all of that was scriptable in 2015, and most of it was
scripted by whoever on the team could be bothered to learn the SDK. The barrier
was the cost of writing the script, which ran higher than doing the job by hand
unless you were going to do the job forty times.

What 2026.4 removes is that step in front of the automation.

## What changes when the caller guesses

A Python script is wrong in the same way every time you run it. You find the
bug, you fix the bug, it stays fixed. A language model holding the same tools
is wrong differently on Tuesday, which is a different engineering problem
entirely, and it is the reason the interesting items in this release are the
unglamorous ones.

Maxon put three of them in: authentication on the connection, configurable
permissions so you choose which groups of Cinema 4D tools the assistant is
allowed to call, separate controls for Python specifically, and local audit
logging of what it did. Undo integration too, which matters more than the rest
combined. If a model reorganises your hierarchy at four in the afternoon and
gets it wrong, ctrl-Z is the difference between a shrug and an evening.

The permission scoping is the bit I would actually use. Hand it naming,
hierarchy and scene organisation — the tedium, where a mistake is visible and
cheap. Keep it away from the rig.

<figure>
  <button class="video-embed" data-video="H53drzzUFfo" data-title="What is the Cinema 4D MCP Server?" type="button">
    <img src="/img/blog/cinema-4d-2026-4-mcp-server/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Maxon's video explaining the Cinema 4D MCP server" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Maxon's own explainer for the MCP server. Useful for the setup shape; it is a vendor video, so the claims in it are claims.</figcaption>
</figure>

## The task list is a wish

Here is what Maxon says the server can be used for: project-wide scene
hierarchy, naming and organisation; scene, object and material variations;
managing, executing and compositing multipass renders; 3D camera tracking and
scene prep; basic modelling; particle and liquid simulations; UV mapping,
rigging and animating.

Read that as a boundary of what the tools expose rather than a report on what
comes out well. Renaming and reorganising a scene is deterministic work with an
obvious correct answer, and I would expect it to be good almost immediately.
UV mapping by description is a different animal — the judgement in a good UV
layout is spatial and it is about where seams will be forgiven, and describing
that in a prompt is harder than doing it. Rigging, more so.

Which is roughly the pattern every automation layer in a DCC has followed.
[A Blender addon that picks your retopology algorithm for you](/blog/quadify-ultra-ml-retopology-blender-5/)
landed in August doing something narrow very well, and the narrowness was the
whole reason it worked: one decision, five options, a mesh to read. Breadth is
what makes these things miss.

## Architecturally this is not new

The shape of it — an external application holding a live connection into the
DCC, sending instructions and reading state back — is something 3D software has
been doing for years without anyone calling it AI. PaintBridge
[sends Blender's viewport passes into Krita and projects the paint back](/blog/paintbridge-krita-blender-projection-painting/)
over a WebSocket, normals and depth and colour ID included. Same architecture.
The novelty in 2026.4 sits entirely in what is on the other end of the socket.

Worth saying because it sets expectations correctly. The connection is a solved
problem. Maxon did not have to invent the plumbing, which is probably why the
release is a point release rather than a version, and why the engineering
attention visibly went to the permission model instead.

David McGavran, Maxon's CEO, framed it as making Cinema 4D "more powerful
without taking the creative process away from the artist", and the
implementation does back that up more than the usual version of that sentence
does. Disabled by default. Local by default. Scoped by choice. An artist who
wants none of this gets none of it, which is not how every vendor has handled
the last two years.

Cinema 4D MCP support needs 2026.4 or later, on Windows and macOS.
