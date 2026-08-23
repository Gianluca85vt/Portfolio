---
title: Everyone who left Epic is building an AI-native engine now. Here's the part that worries me.
date: 2026-08-18
category: Games
author: ruben-castellani
excerpt: Three separate teams of ex-Epic people are independently building AI-first alternatives to Unreal, all pitching the same promise — small teams doing the output of ten or fifteen. As a technical artist, that promise is exactly the part I'd want to interrogate first.
cover: /img/blog/ai-native-engines-ex-epic-founders/cover.svg
---

GamesIndustry.biz reported this week that **three more Epic veterans are building
their own AI-powered game engine**, explicitly framing it as a way to break the
industry out of what the piece calls its "doom cycle" — the layoffs-cancellations-crunch
loop that's been grinding through studios for the last couple of years.

That would be a one-off story, except it isn't. It's the third version of the same
pitch I've read about in the last few weeks.

## The same idea, from three different exits

**Arjan Brussee** — Guerrilla Games co-founder, and until recently Epic's global
director of product management for Unreal Engine — is building **The Immense
Engine**, based in the Netherlands and pitched explicitly as a European
alternative to Unreal and Unity. Brussee has been blunt about the goal: AI agents
doing "the work of ten or fifteen people," per his interview with Tom's Hardware.

**Sjoerd De Jong**, a former Epic "Unreal evangelist," left last month and is
also now building his own engine, aimed at what he describes as stagnation
caused by the Unreal/Unity duopoly, according to PC Gamer's reporting.

And now GamesIndustry.biz's three-founder team, name and engine still
unannounced as I write this, pitching the same story again: small teams, AI
doing the heavy lifting, breaking free of the two engines that — per that same
article — powered roughly **70% of everything released on Steam in 2025**.

Three different teams, from the same company, arriving at the same conclusion
within weeks of each other, is a signal worth taking seriously. It usually means
senior people inside a dominant platform have quietly agreed on something before
the rest of the industry says it out loud: that bolting AI features onto a
20-year-old engine architecture is structurally different from designing the
pipeline around AI from line one.

## What "AI-native" is actually supposed to fix

The pitch isn't "AI makes pretty renders." It's pipeline compression: agents
that scaffold a level layout, generate a first pass of rigging, populate a scene
from a text brief, iterate on lighting setups — the repetitive, high-volume
production work that currently needs bodies, not just talent. If that works at
even half the promised ratio, it changes headcount math for small and mid-size
studios in a way Unreal's bolt-on AI tooling in UE5.5 and the coming UE6 hasn't,
because Epic still has to keep two decades of C++ architecture and backward
compatibility intact underneath whatever they add.

That's the appeal. Here's the part I'd want answered before I trusted a single
production pipeline to any of these three.

## The bit that never shows up in the pitch deck

None of the coverage I've read — Tom's Hardware, PC Gamer, VGC, GamesIndustry.biz
— says anything about **what happens after the AI agent generates the asset**.

That's not a small gap. It's the actual job. An AI agent that populates a scene
from a brief still hands you geometry that needs a UV check, a poly budget
audit, LOD generation, naming-convention compliance, collision setup, and a pass
to make sure the material graph doesn't silently diverge from every other asset
in the level. Right now, on Unreal or Unity, that validation layer is built by
technical artists, using two decades of accumulated exporters, USD interop, and
DCC-roundtrip tooling that a brand-new engine — however AI-native — has none of
yet.

A team of ten doing the output of fifty isn't just an authoring problem. It's a
QA and consistency problem multiplied by however much faster the content now
gets produced. If anything, an engine that generates ten times the content needs
*more* validation tooling around it, not less, or the studio drowns in
plausible-looking assets that don't match scale, don't share a shading model,
and break the moment an artist tries to touch them by hand. That tooling is
exactly the layer none of these three companies have had time to build yet,
because they're all still pre-launch.

## Why the incumbents' moat is boring, and that's the point

Unreal and Unity's 70% Steam share isn't there because they're the most exciting
engines to demo. It's there because a decade of plugins, Perforce integrations,
render-target debuggers, console cert tooling, and every studio's in-house
pipeline glue already assumes one of those two engines exists underneath it. An
AI-native engine built from scratch in 2026 is starting that accumulation at
zero, no matter how good its generation demo looks in a keynote.

That doesn't mean these efforts are wrong to try — Godot's slow climb proves an
alternative can eventually earn real market share, and having Epic's own former
leadership split three ways to build competitors to their old employer is a
genuinely unusual vote of no confidence in where Unreal's roadmap is headed.
But if you're a technical artist evaluating whether to bet a pipeline on one of
these, the question isn't "how much can the AI generate." It's "what does this
engine's USD support, DCC roundtrip, and version-control story look like once
the demo ends" — and right now, for all three, that's the part nobody's talking
about yet.
