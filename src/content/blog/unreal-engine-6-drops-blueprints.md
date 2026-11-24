---
title: Unreal Engine 6 drops Blueprints and Actors
date: 2026-11-24
category: 3D
excerpt: Blueprints and the Actor Gameplay Framework are out of Unreal Engine 6, Early Access included. Epic is betting AI can convert your UE5 project.
cover: /img/video/3p3rGYd2THU.jpg
sources:
  - outlet: Unreal Engine (Epic Games newsroom)
    url: https://www.unrealengine.com/news/an-update-on-blueprints-and-the-path-to-ue6
  - outlet: Game Developer
    url: https://www.gamedeveloper.com/programming/unreal-engine-6-to-remove-blueprints-and-actor-gameplay-framework-from-the-beginning
artistView:
  take: "Epic has swapped a migration path for a migration promise. Converting a Blueprint graph into Verse is a translation job and a machine can plausibly do it; converting an Actor-and-Component architecture into Scene Graph is a design job, and those are not the same kind of problem wearing different hats."
  works:
    - "Scope: killing the dual-stack plan is the honest call. Shipping Blueprints into UE6 to deprecate them two versions later would have meant maintaining both frameworks for years, and the Blueprint half would have rotted."
    - "Pipeline: leaving Blueprints untouched in UE5, and backporting the UE6 AI tooling into the 5.9 preview, means nobody has to move this year or next."
  misses:
    - "Tooling: the Actor Gameplay Framework is the quieter half of this and the more expensive one. Editor utilities, placement scripts and asset-validation tools are written against Actors and Components, and a graph-to-Verse converter does nothing for any of them."
    - "Onboarding: Blueprints is the layer where people who do not write code ship work. Verse is text. Epic has not said what replaces the visual on-ramp, and a studio's environment artists wiring their own interactions is not a small thing to lose."
---

Epic has stopped pretending there is a gentle version of this. In a post from
Marcus Wassmer, the company's EVP of Development, Unreal Engine 6 will ship
without Blueprints and without the Actor Gameplay Framework — not deprecated in
6.0, not carried along for a version or two, but absent from the Early Access
build onward. Gameplay moves to Verse, running on the new Scene Graph
framework. The post went up on 20 November; the trade press caught it on the
23rd.

In June the plan was the opposite. Epic said both systems would sit alongside
Scene Graph through Early Access and 6.0 so that UE5 projects could come across
in stages. I wrote about that at the time and told people [Blueprints would
survive the early versions of UE6](/blog/unreal-engine-6-dont-panic/), because
that was Epic's stated commitment and it came with a promise of conversion
tools before anything got removed. The conversion tools are still the plan. The
grace period is not.

Epic's reason is AI. Wassmer's argument is that AI will "massively help" with
moving UE5 projects over, possibly to the point of doing it automatically, and
that this makes the dual-stack runway unnecessary. The cited evidence is
internal: Epic has been running experiments converting Fortnite Battle Royale's
Blueprints into Verse.

## The word "Blueprints" is carrying more than it can

Here is where I want to be careful, because I cannot open Epic's post from
where I am sitting and I am working from the reporting on it. What the coverage
describes is gameplay Blueprints and the Actor Gameplay Framework. Nobody has
said anything about the other graphs.

And a technical artist's week is mostly other graphs. Construction scripts that
assemble a modular kit and scatter trim. Animation Blueprints. Control Rig.
PCG. Niagara. Material graphs, which are a different system entirely and
plainly not going anywhere. Some of those share the Blueprint virtual machine,
some only share the word, and the announcement does not sort them for you. If
your pipeline leans on construction scripts to build geometry at edit time,
you do not currently know whether you are affected.

An engine company writing to gameplay programmers about gameplay programming
will scope its post that way, and fair enough. The question still needs asking,
and asking it now beats finding out in 2028.

## The Actor framework is the bill nobody is itemising

Converting a Blueprint graph to Verse is a tractable machine problem, and I
think Epic is probably right about it. A Blueprint is already a typed,
serialised graph. It has nodes with known signatures, explicit data flow, no
ambiguity about what connects to what. Walking that and emitting text in a
language you designed is the kind of task that works.

The Actor Gameplay Framework is a different animal. Actors, Components,
GameMode, PlayerController, the whole inheritance tree — that is an
architecture, and Scene Graph is a different architecture. There is no
one-to-one mapping between them, which means a converter has to make design
decisions, and design decisions make it a rewrite with a confident tone.

The part that lands on artists and tools people: every editor utility written
in the last decade assumes this model. Asset validators that walk a level and
check lightmap resolutions. Placement tools. Naming-convention linters. Batch
importers. LOD auditors. The scripts that make a big project survivable are
written against Actors and Components, and a Blueprint-to-Verse converter does
not touch them. Nobody is going to publish a press post about an in-house
asset-validation script breaking.

Fortnite Battle Royale is a poor sample for exactly this reason. It is the one
codebase Epic controls end to end, built by the people who designed the thing
it is being converted into, with Verse as a native target rather than a
destination. Your project has none of those advantages, and if it has [over 500
developers on it like The Witcher
4](/blog/witcher-4-2028-unreal-engine-transition-cost/), the migration is a
staffing plan rather than a tooling question.

## What this does not change

UE5 keeps Blueprints. They are not being deprecated there, existing projects go
on working, and Epic says it will continue shipping targeted features, fixes
and support through the transition. The 5.9 preview is already picking up AI
tooling built for UE6. If you are in production right now, nothing about this
week changes your afternoon.

The timeline is murkier than it was. Epic gave no Early Access date in this
post, and coverage notes the absence. The late-2027 Early Access window from
Unreal Fest, with full release twelve to eighteen months behind it, predates
the reversal — I would stop quoting it as though it still holds, mine included.

## The thing I keep turning over

Blueprints earned its place as the layer where people who do not write code
ship work. A level designer prototyping a door. An environment artist wiring a
light switch. A VFX artist triggering their own system without filing a ticket
and waiting three days. That visual layer is a staffing structure
disguised as a feature, and studios built their teams around it.

Verse is a text language. A good one, by the accounts of people who have used
it in UEFN. Epic has said nothing about what, if anything, gives
non-programmers the same reach in UE6 — and if the answer turns out to be
"prompt the AI", that is a very different studio from the one Blueprints made
possible. One developer quoted in the coverage said his team is staying on UE5
precisely because the current system lets them control things a prompt-based
model does not.

Unconfirmed, and worth watching: whether Animation Blueprints, construction
scripts, Control Rig and PCG are in scope; whether any visual scripting layer
exists for Verse; and when Early Access actually lands.
