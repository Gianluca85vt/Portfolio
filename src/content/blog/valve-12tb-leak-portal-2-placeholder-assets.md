---
title: "Valve's 12TB leak: Portal 2 was built on TF2 arms"
date: 2026-08-30
category: Games
excerpt: A decade of Valve's internal builds surfaced this weekend. The 2009 Portal 2 test rooms used Team Fortress 2 arms and leftover Half-Life 2 zombies as stand-ins.
cover: /img/blog/valve-12tb-leak-portal-2-placeholder-assets/shot-01.jpg
draft: true
---

The 2009 Portal 2 test chambers were built with Team Fortress 2 character arms
holding the portal gun, and there are Half-Life 2 zombie models sitting in the
files with no obvious reason to be there.

That detail comes out of roughly 12TB of Valve's internal builds and assets,
dated between 2003 and 2013, which surfaced online this weekend. Reporting so
far describes early Portal 2, Left 4 Dead and CS:GO builds, plus material from
F-Stop, the abandoned project that became Portal 2. The dataminer credited with
spotting it is GabeFollower. No hack appears to have been involved: the files
sat on a publicly reachable endpoint belonging to Steam2, the content delivery
system Valve migrated off around 2013, and the YouTuber Scolcer describes the
host as having been open to anyone, with no password on it at all.

An old door nobody had closed.

I want to be careful here, because this is somebody's stolen work regardless of
how easy it was to reach, and none of what follows is a recommendation to go
looking for it. But the arms are worth talking about.

## Placeholder is not a stage. It is the whole middle of the project.

<figure>
  <img src="/img/blog/valve-12tb-leak-portal-2-placeholder-assets/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Valve, via the official Portal 2 Steam page. Shipped 2011 build, not the leaked development material.</figcaption>
</figure>

If you have only ever seen shipped games, you would be forgiven for thinking
that studios like Valve work in some cleaner way than you do. That somewhere
around pre-production a real art bible descends, and from then on every asset in
the build is the intended asset at an early stage of polish.

That is not what a build looks like at month eight.

What a build looks like at month eight is Team Fortress 2 arms on a first-person
character in a puzzle game, because somebody needed to test whether the portal
gun read correctly in the player's hands and rigging a new pair of arms would
have taken a week they did not have. It is Half-Life 2 zombies left in a
directory for two years after the encounter that needed them got cut. It is grey
boxes with a texture that says NOTEXTURE, and a door that opens because a
designer wired it to a trigger they meant to replace.

Every one of those is a decision to spend a day on the question in front of you
rather than on the asset that will eventually answer it.

## What F-Stop actually proves

The most substantial thing in the dump, going by the coverage, is visual
evidence of F-Stop: the abandoned concept where the player carried a camera,
photographed an object, and placed the photograph back into the world at a
different size.

Portal 2 shipped in 2011 with none of that in it.

Which means a studio with Valve's resources spent a serious chunk of a
development cycle building a mechanic, looking at it, and putting it in a
drawer — and then shipped one of the best-reviewed games of its generation out
of the wreckage. The version of that story artists usually get is the postmortem
talk, five years later, with the failure sanded into an anecdote. Raw build files
are less flattering and considerably more useful. They show how long the studio
stayed with the idea before letting go of it.

## The pipeline detail underneath all of this

Steam2 is the part I keep coming back to.

Valve moved to SteamPipe around 2013 and, on the evidence of this weekend, the
old system's contents did not go anywhere. Twelve terabytes of intermediate work
kept sitting on infrastructure that had been superseded, reachable without
authentication, for something in the region of a decade.

Nobody at Valve decided to publish this. Somebody almost certainly filed a
ticket about decommissioning Steam2, and it got deprioritised behind work that
had a date attached, the way that ticket always does. Migrations get counted as
done when the new thing serves traffic. The old thing keeps running, because
turning it off is nobody's deadline and there is always a chance something still
points at it.

Anyone who has moved a studio's asset library from one server to the next knows
exactly which half of that job gets finished.

## For what it is worth

A leak like this will be mined for Episode 3 for months. Researchers have already
turned up models for the Weaponizer, the weapon long associated with the
cancelled project, and nobody has confirmed whether a playable build is in there
at all. Treat every claim about it this week as unverified, including that one.

The arms are the better story anyway. The studio that made Portal 2 got there the
same way you get anywhere — by putting the wrong model in the scene on purpose,
because the question that morning was about the gun, and by not going back to fix
it until fixing it was the actual job.

---

*Contents, size and the 2003-2013 date range are as described in reporting from
Tom's Hardware, VideoCardz, Dexerto, GamesRadar and Neowin, published 29-30
August 2026, all of it tracing back to the dataminer GabeFollower rather than to
Valve. Valve had not commented publicly at time of writing, and the contents are
described second-hand throughout; I have not examined the archive and this piece
does not link to it. No Episode 3 build has been confirmed.*
