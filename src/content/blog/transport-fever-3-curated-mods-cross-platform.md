---
title: "Transport Fever 3 mods: modders paid up front"
date: 2026-09-28
category: Games
excerpt: Urban Games paid its best modders, gave them early builds and a say in the tools. Their work ships on day one, on PS5 and Xbox as well as PC.
cover: /img/blog/transport-fever-3-curated-mods-cross-platform/shot-01.jpg
sources:
  - outlet: TheSixthAxis
    url: https://www.thesixthaxis.com/2026/04/22/transport-fever-3-curated-mods-program-revealed-closed-beta-testing-comes-to-console/
  - outlet: GamingOnLinux
    url: https://www.gamingonlinux.com/2026/04/transport-fever-3-takes-modding-to-a-new-level-with-a-curated-mods-program/
  - outlet: Paradox Interactive (press release)
    url: https://www.paradoxinteractive.com/media/press-releases/paradox-interactive/transport-fever-3-gets-on-track-for-september-29-launch-on-pc-and-consoles-deluxe-and-collectors-editions-revealed-as-pre-orders-open
  - outlet: Multiplayer.it
    url: https://multiplayer.it/recensioni/transport-fever-3-recensione.html
artistView:
  take: "A transport sim is an asset-count problem wearing a management game's clothes, and the vehicle roster is the part players extend. Building the mod pipeline with the modders in the room, before the format froze, is the decision in this launch I would defend in a meeting."
  works:
    - "Pipeline: paying the people who will stress-test your exporter, while the exporter can still change, buys you bug reports that would otherwise arrive as launch-week forum threads."
    - "Art direction: the screenshots keep the model-railway read — clean silhouettes, legible rolling stock at the zoom levels people actually play at — which is the right call when the camera spends most of its life far away."
  misses:
    - "Performance: reviewers list long loading times and frame-rate dips, and a sim that renders hundreds of moving vehicles pays for every one of them in draw calls. Loading time in this genre is usually the scene graph being rebuilt, not the disk."
    - "Rendering: the visual gain over Transport Fever 2 is described as modest, which for a seven-year gap suggests the budget went into simulation depth rather than the renderer."
draft: true
---

Console mod support has always died at certification. Sony and Microsoft both
require that what runs on the
box has been through a submission process, and a mod is by definition content
nobody at the platform holder has looked at. The usual resolution is to strip
mods down until they are safe — data only, no scripts, no outside assets — which
is why console mod lists have historically looked like a thin cousin of the PC
one.

Transport Fever 3 arrives tomorrow, 29 September, from Swiss developer Urban
Games and Paradox Interactive, on Windows, Mac and Linux as well as PS5 and Xbox
Series X|S. Mods are live on all of them on day one, through an in-game Mod Hub,
and the approval step is automated — a system Urban Games says it built in
collaboration with Sony and Microsoft. Script mods are in scope. So are
vehicles, maps, localisations and shared save games.

Getting a platform holder to accept an automated gate on user content is the
kind of work that does not show up in a trailer.

## The modders were in the room before the tools were finished

The Curated Mods Program was announced in April. A set of experienced series
modders got early builds, a financial grant, an in-game marker on their work,
and the part that matters more than any of it: a say in the final stretch of the
modding toolset, while it could still change. Their mods ship at launch.
Everyone else can publish from launch too — the program is a supported tier, not
a gate.

That ordering is what makes it work. A tool built without the people who will use it
produces an exporter that technically works and that nobody can get a model
through. The breakages are small and specific: pivot placement, whether
the LOD chain expects you to author it or generates it, what happens when a unit
is centimetres instead of metres, which naming convention the importer silently
depends on. Every one of those is ten minutes to fix in April and a frozen
documented behaviour in September. Ship the format first and you discover your
mistakes from the forum thread, then live with them for the life of the game,
because by then people have built on top of the bug.

Paying for that feedback is the unusual part. Most studios get it free and late.

Compare the direction Rockstar took: [GTA 6's modding guidelines rule out ports
and cross-game assets](/blog/gta-6-modding-rules-cross-game-assets) and route
paid work through Rockstar's own storefront, which is a legal perimeter drawn
around a mod scene that already exists. Urban Games is doing something closer to
the opposite — commissioning the perimeter's inhabitants to help build the door.
Both are rational. They are answers to different questions, one about liability
on a game with a hundred million owners, one about how a mid-sized studio keeps a
niche sim alive for seven years on community content.

## What the reviews are arguing about

Verdicts landed a few days before release, around 25 September, which is early
enough to be worth noting on its own. The shape of them: this is a deep,
generous overhaul of a formula that has not changed its mind about what it is.
Multiplayer.it gave it 8.5 on 26 September. GameStar's test calls it the
best-looking economic simulation of the year. PCGamesN headlined theirs "a
thorough overhaul with a familiar formula", which is about as fair a summary of a
third entry as you will get.

I am not putting an average on this one. I could reach one outlet's number
directly and would be guessing at the rest, and a mean built from a guess is
worse than no mean.

The disagreement worth flagging is performance. The same window that produced
"best-looking economic sim of 2026" also produced complaints about long loading
times and frame-rate drops, and both can be true of the same build — a scene
that looks superb parked on a station and falls apart when the simulation has
four hundred vehicles in flight. Transport sims are unusually exposed here
because what grows is the count of independently moving, individually drawn
objects on the map. That is a draw call problem and a
simulation-tick problem at the same time, and it gets worse in exactly the
late-game state that reviewers have the least time to reach.

Long loading in this genre is usually the scene graph, terrain mesh and pathing
data being rebuilt on load, and it scales with how much
you built, which is why a save that opens in fifteen seconds in hour two takes a
minute by hour sixty. Worth watching whether the console versions hold up, given
they are the ones that cannot be rescued with a resolution slider — the same
trap that left [Silent Hill: Townfall hitching at 60fps on a
5090](/blog/silent-hill-townfall-pc-stutter-shader-cache), where the headline
frame rate was fine and the frame *times* were not.

Either way, the mod hub is the part of this launch that other studios should be
reading. Cross-platform user content, approved automatically, with scripts
allowed, is a thing the platform holders have spent a decade saying no to.
