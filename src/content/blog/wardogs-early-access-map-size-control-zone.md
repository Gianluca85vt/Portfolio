---
title: "Wardogs early access: 256km², one 2km fight"
date: 2026-09-10
category: Games
excerpt: Bulkhead's 100-player shooter hits Steam early access today at $39.99. The map is 256km², and every match is decided inside a 2km box drawn fresh each round.
cover: /img/blog/wardogs-early-access-map-size-control-zone/shot-01.jpg
draft: true
---

Two numbers came out of Wardogs before it reached Steam early access this
morning at **$39.99**. The map is 256 square kilometres. And Bulkhead planned
its servers for five thousand concurrent players.

Both are worth sitting with, because between them they explain most of how the
game is built.

<figure>
  <button class="video-embed" data-video="v1ISv_h_qXY" data-title="WARDOGS | Gameplay Trailer" type="button">
    <img src="/img/blog/wardogs-early-access-map-size-control-zone/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Wardogs gameplay trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Team17 and Bulkhead's gameplay trailer. It is a trailer, not a review — nobody has scored this yet, and an early access launch usually means nobody will for a while.</figcaption>
</figure>

## Where the 256 square kilometres goes

256 km² is sixteen kilometres on a side. Drop a hundred players into that and
you get roughly one player per two and a half square kilometres, which is a
hiking simulator with guns.

So the match doesn't happen there. Each round selects a random 2×2 km patch of
that terrain and designates it the Control Zone. Three teams push in, whoever
has the most bodies inside collects points on a tick, and the first team to a
hundred takes the match. A smaller hot zone can appear inside it, paying double
cash and double points to whoever holds it.

Four square kilometres, then. That's the playing field, and a hundred players
inside four km² is a density people already recognise from every large-scale
shooter of the last fifteen years.

Which makes the 256 a budget rather than a boast. What Bulkhead built is a
sixteen-kilometre *library*, from which one small battlefield is drawn each
time. For an environment team that is a very different brief. The terrain has
to be consistently
plausible and consistently fightable — no dead pockets, no accidental fortress,
no valley that only works if you approach it from the south. It does not have to
be individually memorable at every point, because no single square kilometre
carries a match on its own.

The technical dividend is the part I keep turning over. Only one 2×2 km window
is ever hot. Streaming, replication, physics, destruction state, the AI on
vehicles — all of it is scoped to a patch you can predict at the start of a
round and tear down at the end of one. Buildings in Wardogs can be damaged,
fortified and flattened as the match runs, and persisting that kind of state
across 256 km² of terrain would be ruinous. Across four km², for the length of
one round, it is ordinary work.

The size is what keeps the selection from repeating. Sixty-four possible
non-overlapping windows, before you count every offset in between.

## Three teams changes the level design, not just the tactics

Everyone writing about Wardogs has noticed that three-way fights behave
differently from two-way ones, and they do — every trade you make with one enemy
is a gift to the other. That part is easy to see in a trailer.

The consequence for whoever builds the zone is quieter. A two-team map can be
symmetrical, and most of them are: mirror the layout, mirror the cover, and the
argument about fairness is over. Three approach vectors into a central objective
cannot be mirrored. You are balancing sightlines, elevation and cover against
three positions at once, on terrain that was authored before anyone knew which
2×2 km slice would be chosen.

Which is the sort of problem [immersive sim designers spent decades on with far
smaller spaces](/blog/warren-spector-retirement-immersive-sim-environments) —
how a room reads from every door into it, rather than from the one the designer
imagined you using. Wardogs is asking a procedural selector to answer that
question sixty-four times over.

It helps that the mode is not new. Wardogs descends from *King of the Hill*, the
Arma 3 community mod, and Bulkhead has been working with Sa-Matra — the mod's
creator — from the start of the project. That mode has been load-tested by an
actual playerbase for years. Buying the design and the person who tuned it, at
the same time, is a cheaper route to a balanced objective than a year of
internal playtests.

## Five thousand, and then 245,118

Bulkhead's closed beta peaked at **245,118 concurrent players on Steam**. The
studio's planning figure was five thousand. Roughly forty-nine times the number
the infrastructure was scoped for.

CEO Joe Brammer's response to the surge was unusually plain about what comes
next: Wardogs will keep losing players for months as the hype dies down, that
this doesn't make it a bad game or a problem, that the studio planned for 5k
concurrent, and that it will build toward 1.0 and boom again. His words, roughly
— he wrote it on X while the beta numbers were still climbing.

Saying that out loud is rarer than it should be. The default posture for a
studio holding a 245,000-player weekend is to treat the peak as the new floor,
staff to it, scope to it, and then explain the cliff six weeks later. Bulkhead
named the cliff in advance and set the floor at a number it can actually
survive. That decision reaches the art and engineering teams directly: content
cadence, server spend, how much of the 1.0 roadmap is committed to now versus
kept flexible. Plenty of live games have been [cut back hard after scoping to a
launch spike](/blog/horizon-hunters-gathering-live-service-cut) rather than to a
sustainable one.

Worth noting on the studio itself: Bulkhead made Battalion 1944, was owned by
Tencent, and was sold last year to a consortium. The coverage generally calls it
independent again, which is true in the sense that its developers hold equity
and false in the sense that the consortium includes Everplay Group — the parent
company of Team17, which publishes Wardogs. Independent of Tencent, certainly.
Standing at arm's length from its publisher, less so.

None of which tells you whether the game is any good after week three. Early
access at $39.99 buys a version explicitly labelled unfinished. What I want to
see is whether the 2×2 km selection still throws up a fight worth turning up for
on the four hundredth round, once the novelty of sixteen kilometres of terrain
has worn off and what is left is the four square kilometres you are standing in.
