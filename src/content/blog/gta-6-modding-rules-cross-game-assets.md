---
title: "GTA 6 mod rules: no ports, no cross-game assets"
date: 2026-09-22
category: Games
cover: /img/blog/gta-6-modding-rules-cross-game-assets/shot-01.jpg
excerpt: Rockstar's guidelines end the big extraction projects and route paid work through its own storefront. What survives is the mod that brings its own assets.
sources:
  - outlet: GamesRadar+
    url: https://www.gamesradar.com/games/grand-theft-auto/ahead-of-gta-6-rockstar-releases-modding-guidelines-that-axe-new-missions-maps-ports-and-more-respect-our-games/
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/grand-theft-auto/rockstar-asks-modders-to-please-take-its-games-very-seriously/
  - outlet: TechRadar
    url: https://www.techradar.com/gaming/rockstar-has-launched-its-own-mod-marketplace-ahead-of-the-launch-of-grand-theft-auto-6
  - outlet: Cfx.re Forum
    url: https://forum.cfx.re/t/introducing-the-cfx-marketplace/5369289
  - outlet: PC Gamer (Cfx.re acquisition)
    url: https://www.pcgamer.com/rockstar-buys-the-makers-of-the-gta-online-fivem-mod-it-banned-8-years-ago/
---

One clause in Rockstar's updated modding guidelines does more damage than the
rest of the page put together: you may not take a map, a character, a storyline
or an asset out of one Rockstar game and put it into another.

Read that as a list of specific projects. Liberty City rebuilt inside GTA V.
The Red Dead map walked over into Los Santos. San Andreas geometry re-imported
into the newer engine so the roads have proper collision again. Those are
multi-year efforts by teams who did the file-format archaeology themselves, and
they are the thing the clause names.

The guidelines went up under the heading *Respect Our Games* and were picked up
across the trade press on 21 September 2026, eight weeks before Grand Theft Auto
VI ships on 19 November. Alongside the asset clause: no expanding or rewriting
Rockstar's stories, missions or characters; no modifying a game to run on
hardware Rockstar has not shipped it on; no third-party IP or real-world
likenesses; nothing that touches official multiplayer or online services; and
monetisation only through storefronts Rockstar approves. Reporting on the day
also listed gambling mechanics, in-mod advertising and certain real-world
military roleplay.

## What a GTA mod is made of

<figure>
  <img src="/img/blog/gta-6-modding-rules-cross-game-assets/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Grand Theft Auto V, via the official Steam store page (Rockstar Games)</figcaption>
</figure>

The distinction that matters to anyone who builds these things is not legal. It
is where the geometry came from.

A visual mod for a RAGE-engine game usually starts inside Rockstar's own
archives. The assets sit in proprietary containers — textures in one format,
drawables in another, fragments in a third — and the community reverse
engineered every one of them. OpenIV to browse and replace, CodeWalker to read
the world, a long chain of exporters to get anything out into Blender or Max
and back in again. None of that tooling came from Rockstar. It exists because
people spent years working out what the bytes meant.

So a mod is, in practice, one of two things. It reuses Rockstar's shipped
assets, or it brings its own and fights the container format to get them in.
The new guidelines push hard toward the second, which is the harder craft and
the one with no supported path. There is no published GTA asset SDK, no
sanctioned exporter, no documented material spec. Rockstar has told modders to
author their own work and left the import problem exactly where it has always
been.

There is a version of this that works. The GoldenEye scene did it: [six and a
half years of reverse engineering that rebuilt the 1997 ROM byte for
byte](/blog/goldeneye-007-decompiled-what-it-reveals/), with everything that
followed built on top of understanding rather than extraction. It is also a
useful measure of the cost. Six and a half years, for a game that fits in 12
megabytes.

Scale that against [the 600,000-odd animations Rockstar says are in GTA
VI](/blog/gta-6-600000-animations-no-generative-ai/) and the reason for the
clause is obvious enough from Rockstar's side. That library is the product.

## The approved channel already exists

The monetisation rule is the part with infrastructure behind it. Cfx.re — the
team behind FiveM and RedM, which Rockstar acquired in August 2023 after years
of banning them — opened the Cfx Marketplace on 12 January 2026. Props, scripts,
maps, interiors, sold by approved creators, with Rockstar vetting what gets
listed. Reported price ranges vary by outlet; Take-Two's cut has not been
disclosed.

Which puts one company in an interesting position. It writes the rule that all
paid modding must run through an approved store, it owns the approved store,
and it decides what appears there. The FiveM roleplay economy has been selling
scripts and assets informally for the better part of a decade. That trade now
has a sanctioned venue and a landlord.

## The line has moved before

Worth remembering how recent the permission is. In 2015 Rockstar banned the
people behind FiveM from Social Club and called the project a piracy risk. In
June 2017 Take-Two sent OpenIV a cease and desist, then reversed it within days
after the community reaction — and later published language treating
non-commercial single-player modding as acceptable. In 2022 that was extended so
GTA Online's rules matched the single-player ones.

Eight years of loosening, then a fence. None of the individual clauses is
unreasonable from a publisher about to launch the most expensive game ever made,
and the community has heard each of them before in softer form.

What nobody has answered is the practical question. Teams are years into
projects that the asset clause describes. Some will be asked to stop, some will
quietly continue, and the difference will come down to how visible they are.
Rockstar has not said whether it will ship anything resembling asset tooling for
GTA VI, and until it does, the scene it has just told to build original work is
still doing that work with tools Rockstar did not write and has never endorsed.

---

*Guidelines content compiled from coverage published on 21 September 2026,
chiefly GamesRadar+, PC Gamer and ixbt.games; Rockstar's own support page could
not be reached directly from here. Cfx Marketplace launch date from the Cfx.re
forum announcement. Acquisition and enforcement history from contemporaneous
reporting.*
