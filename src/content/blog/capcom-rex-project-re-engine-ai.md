---
title: "Capcom REX Project: rebuilding RE Engine for AI"
date: 2026-10-04
category: Games
excerpt: Capcom's REX project rebuilds the RE Engine so AI can drive its tools. Two subsystems are already public, partly so models have something to learn from.
cover: /img/blog/capcom-rex-project-re-engine-ai/shot-01.jpg
sources:
  - outlet: The Verge
    url: https://www.theverge.com/games/1004418/capcom-ai-game-development
  - outlet: PC Gamer
    url: https://www.pcgamer.com/gaming-industry/game-development/capcom-announces-plans-to-transform-its-re-engine-into-an-ai-generation-game-engine/
artistView:
  take: "REX is a plumbing project with an AI badge on it, and the plumbing is the good part. Collapsing a decade of bespoke formats into one structure and putting logs in a searchable store are the fixes that make an engine cheaper to work in whether or not a model ever touches it. Publishing two subsystems so models have training material is the first genuinely novel move I have seen a studio make about its own toolchain."
  works:
    - "Pipeline: RE:Dox folding mismatched data formats into a common structure is the unglamorous fix that makes everything downstream faster, and it pays off for humans before it pays off for machines."
    - "Tooling: open-sourcing RE:Log and RE:Dox is the only honest answer to the obscurity problem, because a model cannot assist in a toolchain it has never read a line of."
  misses:
    - "Pipeline: none of the five named systems faces the DCC round-trip, so export, validation and re-import — the part of the day that actually eats an artist's time — is still waiting its turn."
    - "Scope: automated test plays catch broken states rather than ugly ones, and a detector that flags a LOD pop or a lightmap seam is a far harder build than one that flags a crash."
draft: true
---

Capcom has put two pieces of its in-house engine out in the open so that
language models have something to read.

That is the detail from **2 October** I keep turning over. At the CAPCOM Open
Conference RE:2026, in Tokyo's Ariake Convention Hall, programmer Satoshi Ishida
gave a talk with a title only an engine team would write — "The Outlook and
Future of the REX Project, Further Evolving the RE Engine for the Next
Generation" — and laid out a staged plan to grow the RE Engine into what Capcom
calls an AI-generation game engine. Two of its subsystems, RE:Dox and RE:Log,
have already been released publicly, and according to GameBiz's report one of
the reasons is AI training.

Sit with that for a second. The reason an assistant is useless inside a
proprietary engine is that it has never seen one. Unreal has a decade of public
documentation, forum answers, plugin source and tutorials behind it, so a model
can say something sensible about a Blueprint node. An engine that exists only on
a studio intranet has none of that, and no amount of general competence covers
the gap. Capcom appears to have worked out that if it wants tooling a model can
drive, it has to publish enough of the toolchain for the model to learn the
shape of it.

## REX has been coming since 2023

<figure>
  <img src="/img/blog/capcom-rex-project-re-engine-ai/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Capcom, via the official PRAGMATA Steam page</figcaption>
</figure>

REX stands for RE neXt Engine, and Capcom first put the name in public in
**October 2023**. The RE Engine is not being thrown away. REX is a staged
modernisation of what is already there, which is the correct way to do this and
the slow one — the alternative is a from-scratch rewrite that eats four years
and ships nothing, and plenty of studios have tried it.

Ishida named three pressures behind the work. Games have grown large enough that
iteration has slowed badly. The developer base has become more varied and needs
tools that are easier for everyone to use. And AI has moved fast enough that
getting it into the workflow has stopped being optional.

The first of those is the one I believe hardest. Anybody who has worked on a
project as it crossed from big to enormous knows the moment when the build
stops being something you can poke at and starts being something you submit a
request to.

## Five boxes on one slide

The presentation listed the project's main systems:

- RE:Dox — converts mismatched data formats into one common structure for faster processing
- RE:UI — the interface layer for development tools
- RE:Log — logging and communication, collecting logs into a central store developers can search
- RE:Flows — scripting for users
- RE:Runtime — the game runtime itself

Every one of those is plumbing. There is no asset generator on the list, no
texture synthesiser, nothing that makes a picture. The named targets are data
handling, tool optimisation, code assistance, runtime processing, logging, and
above all QA through automated test plays and bug detection.

Which is roughly where I have argued the technology earns its keep — the same
conclusion I came to about
[where AI actually fits in a 3D pipeline](/blog/ai-in-a-3d-pipeline/), and it is
reassuring to see an engine team arrive at it with a budget attached.

## Machine-legible and junior-legible are the same thing

Here is the part worth stealing for your own studio, whatever engine you are in.

Everything on that slide that makes the toolchain easier for a model also makes
it easier for a person who joined last Tuesday. One data format instead of nine.
A consistent interface layer instead of twelve tools that each invented their
own. Logs in one searchable place instead of scattered text files and someone's
memory of which flag to pass. Scripting a non-programmer can read.

Those are the things every in-house pipeline is supposed to have and most do
not, because the work is invisible and nobody gets promoted for it. "The AI
needs it" turns out to be an argument that gets the work funded. I will take it.

## The line on finished assets, and where it sits

Capcom drew its boundary in public at the shareholder meeting of
**23 March 2026**: the company will not implement AI-generated assets in its
game content. No generated faces, no generated backdrops, no synthetic voice
acting. The phrasing it used was that fans should know what they see on screen
is real artist work. Internally, it said, AI would be used to improve
development efficiency, with methods being tested across the graphics, sound and
programming departments.

That boundary is holding so far, and it sits exactly where the
[CESA survey found Japanese studios already were](/blog/cesa-2026-survey-generative-ai-japan/)
— heavy adoption, concentrated on admin and process rather than on the frame
the player sees. Capcom is not out in front of its industry here. It is writing
down what the industry is doing and committing to the half of it that is
defensible.

Whether a line between tooling and assets survives contact with a deadline is a
different question, and one nobody can answer from a conference slide. Code
assistance that writes a shader is tooling by Capcom's definition. The shader
ships. I would want to know where that gets filed.

## QA is where it bites first

Automated test plays and bug detection are the near-term prize, and they are a
genuinely good fit. A machine that will replay the same traversal four hundred
times overnight and flag the forty where the character fell through the floor is
doing work no human should be asked to do, and it does not get bored and stop
noticing on run two hundred.

It also only catches the broken, and for an environment artist the expensive
failures are rarely broken. A seam in a lightmap, a LOD that pops in the
player's eyeline, a decal fighting the surface it sits on, a kit piece rotated a
degree out — all of those pass every automated test ever written and all of
them get caught by somebody walking the level with their eyes. Detecting those
is a far harder problem than detecting a crash, and no part of Ishida's slide
claims to.

The conference ran on in Tokyo through 3 October, with an Osaka leg on the
17th and 18th. Capcom publishing the talks afterwards is how most of what we
know about the RE Engine got out in the first place, and on current form the
RE:Dox repository will tell us more about REX than the keynote did.
