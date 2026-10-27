---
title: "3ds Max rebuilt on Blender in a week with AI"
date: 2026-10-27
category: 3D
excerpt: "Jake Denham vibe-coded Max's hotkeys, quad menu and modifier stack onto Blender. His cold start: 14.8 seconds against Max's 57."
cover: /img/blog/3ds-max-rebuilt-on-blender-ai/shot-01.jpg
sources:
  - outlet: BlenderNation
    url: https://www.blendernation.com/2026/10/26/203024/
  - outlet: CGPress
    url: https://cgpress.org/archives/3ds-max-doppelganger-built-on-top-of-blender.html
artistView:
  take: "An interface is the part of a DCC an artist has memorised, and it is turning out to be the cheapest part to reproduce. A week of vibe coding got the hotkeys, the quad menu and the modifier stack; the twenty years of production edge cases underneath them are still Autodesk's."
  works:
    - "UI architecture: Blender's Python API exposes enough of the event system that a quad menu and a modal hotkey map become a configuration problem, which is why a week was enough for the parts Denham demonstrates."
    - "Modifier stack: hanging it on Blender's own modifier list is the sensible call. The two data models already line up closely enough that most of the work is presentation, and presentation is exactly where Max's version wins."
  misses:
    - "Scope: hotkeys and menus are the visible tenth of a DCC. Scene translation, render-farm behaviour and twenty years of plugins are the parts nobody rebuilds in a week, and nothing in the coverage claims he did."
    - "Verification: the .max loading and the 4x cold start are one artist's numbers on one machine, with nobody else having opened the same files. On a format with no public specification, that is the claim I would want checked first."
---

Every studio has the argument. Somebody suggests Blender, somebody who has
used 3ds Max since university says no, and the reason given is never really
about features. It is about the fifty things a day you do without looking —
the quad menu under the right mouse button, Alt-W to maximise a viewport, the
modifier stack you read top to bottom like a sentence. Twenty years of that
lives in your hands, not your head. Asking an artist to switch DCC is asking
them to be slow at their own job for six months.

Jake Denham has been using Max for eighteen years and got tired of being told
to switch. So he spent a week building Max on top of Blender instead.

<figure>
  <img src="/img/blog/3ds-max-rebuilt-on-blender-ai/shot-01.jpg" loading="lazy" width="1440" height="810" alt="Blender's default interface, the base layer Denham built a 3ds Max workflow on top of" />
  <figcaption>Blender's stock interface, via Wikimedia Commons. The Max layer sits on top of this.</figcaption>
</figure>

## What a week bought

Max hotkeys. The quad menu. The modifier stack. That is the list both
BlenderNation and CGPress report, and it is a shrewd choice of three — they
are the three things a Max user's hands actually know. He wrote it by vibe
coding, which is to say he described what he wanted to an AI and corrected it
until it worked, which is how a single artist gets a week of output out of a
week.

He is clear about what it is not. A personal project, not for sale, no
download. CGPress describes it as closer to a standalone Max-style layer than
a conventional add-on, which sounds right for something that has to intercept
the whole event system rather than add a panel.

Two numbers came out of it. His cold start is 14.8 seconds against Max's 57.0
on the same PC — that is the four-times figure doing the rounds, and it is one
machine, measured by the person who built the thing. And the one that made me
sit up: he says it opens his real .max files without 3ds Max installed. 23 out
of 23 old scenes so far.

## The .max claim is the one I would want checked

.max has no public specification. Autodesk has never documented it, the route
in has always been the SDK or an export to FBX, and a scene file is not one
format anyway — it is a container holding whatever every plugin that touched
it decided to write. Open a ten-year-old archviz scene and you are reading
V-Ray's data, and Forest Pack's, and a modifier from a plugin whose author
stopped answering email in 2019.

So "it opens 23 of my 23 scenes" is a sentence with a lot of room in it. It
could mean the geometry, transforms and hierarchy come through, which would
already be good work and is probably what happened. It could mean something
much stronger. Nobody outside his machine has opened the same files, and
because the project cannot be downloaded, nobody will. Call it plausible and
unverified, by design. The headline number is travelling faster than the
caveat, which is how this usually goes.

## Why nobody switches, and what this says about that

Blender has been able to look like Max for a long time. People have written
Max keymaps for it; BsMax has been on GitHub for years. What is new here is
the hour count. One artist, one week, no C++, and the
result is apparently close enough to his muscle memory that he prefers it to
the real thing.

That lands somewhere specific for anyone who has priced a pipeline. When we
[worked out where AI earns its place in a 3D pipeline](/blog/ai-in-a-3d-pipeline/),
the answer was the small unglamorous plumbing — the tool nobody budgets a
developer for, the script that saves four minutes two hundred times. A UI
compatibility layer is the purest version of that. It is pure glue code,
deeply boring to write, enormous in effect, and it has never been worth a
studio's TD time because the payoff is one department's comfort.

It is worth a week now. That is the shift, and it does not need a .max reader
to be true.

None of which makes Max a dead tool. Tyson Ibele shipped
[PhysX vehicles driven from tyFlow's own flow graph](/blog/tyflow-2-100-physx-vehicles-3ds-max/)
last month, which is serious engineering aimed at people who are clearly still
working in Max and intend to keep doing it. The lock-in was always the
hands, plus the plugins, plus the farm, plus the client who wants a .max
file.

<figure>
  <button class="video-embed" data-video="74TsKdNWEaA" data-title="I Rebuilt 3ds Max With AI" type="button">
    <img src="/img/blog/3ds-max-rebuilt-on-blender-ai/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Jake Denham's video about rebuilding 3ds Max on Blender" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Denham's own walkthrough. It is the only demonstration of the project that exists, which is also the problem with checking any of it.</figcaption>
</figure>

One week got the hands. The hands were only ever the cheap part.
