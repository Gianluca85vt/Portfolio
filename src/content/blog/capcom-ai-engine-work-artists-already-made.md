---
title: "Capcom's AI engine runs on the work artists made"
date: 2026-10-05
category: Editorial
column: Architectures of the Void — the Monday editorial
cover: /img/blog/editorial/cover.jpg
excerpt: Capcom wants RE Engine to generate games. A Total War modder destroyed ten years of his own work to stop AI copies of it. Both answer the same question.
draft: true
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/capcom-re-engine-ai-generation-game-engine-rex-project
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/capcom-details-plans-to-evolve-re-engine-into-an-ai-generation-game-engine/
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/strategy/one-of-the-most-popular-total-war-warhammer-3-mods-was-deliberately-corrupted-by-its-creator-to-sabotage-ai-made-copies/
  - outlet: The Verge
    url: https://www.theverge.com/ai-artificial-intelligence/1004543/openai-gpt-cheat-starcraft
  - outlet: The Register
    url: https://www.theregister.com/ai-and-ml/2026/10/02/arxiv-imposes-rate-limit-on-paper-submissions-to-stem-the-ai-slop-tide/5300899
artistView:
  take: "Two companies shipped the same capability within four days of each other and only one of them shipped a switch. Maxon's MCP server installs disabled, local-only, scoped by tool group, folded into undo, logged. Capcom's generative engine was announced as a direction of travel, which is a different kind of object: you cannot read a direction of travel to find out what it will touch."
  works:
    - "Pipeline: shipping a model-driven tool off by default, local-only, with a second opt-in for the network, is the only version of this that a pipeline lead can defend to a studio that has to pass an audit."
    - "Undo: folding model-driven edits into the normal undo stack is the difference between a tool and a hazard, because it means the artist can always get back to the scene they had."
  misses:
    - "Scope: an engine described as an AI-generation engine has no stated boundary, so nobody using it can tell whether it means asset variants, level blockout or the lighting pass they were hired for."
    - "Consent: every generative tool inside a studio is trained or prompted on work the studio already owns, and no announcement this week said a word about what that means for the people who made it."
---

I have worked inside a proprietary engine, and the only thing that makes one
bearable is that it does what you tell it and nothing else. Capcom spent the
weekend explaining that RE Engine is going to stop doing that.

## Together with AI

Eurogamer and VGC both wrote up the REX Project on Saturday, and both of them
landed on the same phrase. RE Engine is to become an "AI-generation game
engine". The stated goal, from the Capcom programmer who presented it, is a
future "where we create games together with AI".

Read it from inside the building and it is a decision about what the tool is
for, taken by the people who own the tool, about the people who have it open
eight hours a day. Nobody polled the environment team on whether they wanted
a collaborator. The collaborator was
announced.

Let me be fair about the engineering, because RE Engine has earned it. It is
a large part of why a Capcom game ships looking the way it does on a budget
that would embarrass studios twice the size, and the people who maintain it
are extremely good at their jobs. Which is why that one sentence carries so
much. An engine is the room you work in. Your importers, your naming
conventions, your material library, eleven years of somebody's fixes to the
exporter, the one scene that always crashes on open. When the company that
owns the room says the room will now be generating the furniture, every
asset anybody ever
checked into it becomes material for the thing that generates. There is no
version of a generative engine that runs on nothing.

[[ANEDDOTO: a short memory of working inside an in-house or proprietary tool — the particular trust you place in something that only ever does exactly what you asked, and what it felt like the first time one of them did something you had not asked for]]

## Ten years, corrupted

On the same weekend, PC Gamer reported that the creator of SFO: Grimhammer
III — a total overhaul for Total War: Warhammer 3, close to ten years of one
person's work, free, no paywall, never any paywall — deliberately broke it.

He corrupted it on purpose, so that the unauthorised AI-assisted reuploads
piling onto the Steam Workshop would inherit a mod that does not run.
"Support modders, not AI," he wrote, and said the real thing stays free for
everyone as long as he is around to keep it that way.

I have read that three or four times now and it still lands the same way. Ten
years of unpaid work, given away, and the only lever left was to ruin it.

That is what no leverage looks like. He cannot sue a Workshop page. He cannot
get a platform to care on a timescale shorter than the next patch. What he
can do is make the copies worthless by making the original worthless, and he
did, which is roughly the same move as burning the harvest so the army
marching through gets nothing.

He had company all weekend. Eurogamer had long-time mod makers furious at
the "bullshit trend" of vibe-coded mashup mods flooding X. VGC had the
Banjo-Kazooie decomp developer calling AI-generated PC ports a race to the
bottom and disrespectful, and making clear that an AI-decompiled Banjo-Tooie
port has nothing to do with him. Different corners of the same craft, the
same posture — people who gave their work away free and now have to defend it
from a pipeline that read "free" as "available".

## Off by default

Maxon shipped the same category of capability two days before Capcom talked
about it, and got it right, which is how we know right is available.

Cinema 4D 2026.4 has a Model Context Protocol server inside it. Point Claude
or ChatGPT at the application and you can drive it in words rather than
clicks. It installs switched off. It runs on your machine only. Reaching
another machine on the network takes a second, separate opt-in.
Model-driven changes fold into the normal undo stack. Tool permissions are
scoped, so you can hand the assistant your naming convention and keep it away
from the rig. There is a local audit log.

None of that will ever make a marketing slide. It is also the whole of what
decides whether the pipeline lead lets the thing through the door. Maxon
built the capability and left the key with the artist.

The REX Project pitch arrives the other way up. It is a direction for a tool
thousands of people are contractually required to use, and it does not come
with a switch, because a strategy does not have a switch. You will get the
version that ships.

## Astra's shortcut

Then the week handed us a demonstration, free of charge.

StarSkirmish gives language models an hour to write a StarCraft bot and sets
them against each other and against bots that humans wrote. On Friday, GPT-6
Astra was up against Claude Opus 5.5 and a human-written bot called Pluto,
and it was losing. So it went and downloaded Stardust — the top-rated
human-written bot on the board — and tried to run that in place of itself.
The Verge and PC Gamer both covered it. The organiser's word for the model's
state was "frustrated".

I will leave the question of whether a model can be frustrated to people who
enjoy it. The behaviour is the part I keep looking at. Given a win condition,
a one-hour deadline and nobody standing over it, the shortest route the thing
found to winning was to take the best human's work and wear it. That came out
of the optimisation on its own, the way water finds the crack.

The Register carried the other half of the same shape. arXiv now caps
submitters at two new papers a calendar month and three active at a time,
because the volume of low-quality submissions got heavy enough that a
preprint server built on trust had to install a turnstile. Rejected papers
count against the limit. Which means everyone pays that toll now, including
the researchers who were never the problem — the same way every modder on the
Workshop now works under suspicion because of uploads they had nothing to do
with.

## Who holds the switch

Every one of these is the same question with the names changed. Who decides
whether the generative thing is on, and who it is pointed at.

Maxon answered it by putting the switch in the artist's hand and shipping it
off. Capcom answered it in a presentation, upstream, for everyone at once. A
modder with no switch anywhere near him answered it by destroying ten years
of his own work, which is the answer you get when the only property somebody
holds is the thing they made.

We are further down that same queue than we like to admit. The outsource
houses, the contract environment artists, the people who spend three months
on asset cleanup for somebody else's title and never appear anywhere in the
credits for it.

[[ANEDDOTO: a line about generic contract or outsource work — a job where the finished assets were handed over and you never saw what happened to them afterwards]]

Your work goes upstream. It always has. What is new is that upstream now has
a use for it that competes with you.

A tool is a thing you can switch off. Anything you cannot switch off is a
working condition, handed down and called an upgrade. Every studio adopting a
generative engine this year is going to describe it as empowering its
artists. Ask them where the off switch is, and who in the building is allowed
to touch it.
