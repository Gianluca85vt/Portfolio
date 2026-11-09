---
title: Wing Commander's masters were gone, so EA went to videotape
date: 2026-11-09
category: Editorial
column: Architectures of the Void — the Monday editorial
cover: /img/blog/editorial/cover.jpg
excerpt: Three games came back this week and not one came off its own source files. The archive is a deliverable, and no schedule has ever had a line for it.
draft: true
sources:
  - outlet: Ars Technica
    url: https://arstechnica.com/gaming/2026/11/ea-producer-tells-the-inside-story-behind-new-wing-commander-remasters/
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/rpg/one-of-the-buggiest-d-and-d-games-ever-released-pool-of-radiance-ruins-of-myth-drannor-is-back-and-actually-playable-again/
  - outlet: 80.lv
    url: https://80.lv/articles/this-forgotten-classic-d-d-rpg-was-revived-without-source-code-or-tools/
  - outlet: Eurogamer
    url: https://www.eurogamer.net/mass-effect-5-save-cost-200m-bioware-co-founder-trent-oster
---

I can tell you exactly what happens when you open a project nobody has touched
in five years. The geometry loads. The textures load. Every material comes up
grey, because the shader library sat on a network path that belonged to a
company structure that no longer exists, and the exporter that wrote those
files was a plugin for a version of a package that will not install on anything
you own.

The game is fine. The game shipped, it runs, you can buy it. What is gone is
the ability to ever open it again.

Three games came back this week, from three different directions, and the
direction each one came from tells you precisely what its owner still had in a
drawer.

## Three ways back

On Thursday EA put twenty-five of its own PC classics on Steam and GOG — nine
mainline *Ultima* games, both *Underworlds*, *Road Rash*, *Crusader*, *Theme
Hospital*, a stack of *Wing Commander*. Seven are badged Anniversary Editions,
and the restoration on those seven was done by pulling the cinematics out of
the company's own videotape archive.

Videotape. In 2026 the road back to a 1994 full-motion-video sequence ran
through a physical tape library, because that was the surviving copy at a
quality anybody would ship.

On Friday SNEG released *Pool of Radiance: Ruins of Myth Drannor*, a 2001
dungeon crawl whose launch was so broken it is still the reference anyone
reaches for. No source code. No tools. No documentation. The team worked
backwards out of the retail builds — the discs, the object on the shelf — and
from that got to something they could widen to 4K, fit with an action bar, hang
tooltips on and sell for twenty dollars. They also had to clear rights with
three separate parties, because the licence holder, the original developer and
the original publisher are three different companies and two of them stopped
doing the thing they were doing in 2001 a long time ago.

Then on Sunday one of BioWare's co-founders put a number on the third
direction. Anyone who wants to buy *Mass Effect* from EA and finish what the
studio started should be budgeting north of two hundred million dollars.

So: take the disc apart, raid the tape library, or write a cheque with nine
digits in it. Those were the week's options, and nobody got a fourth.

## The master nobody owns

"No source code, no tools, no documentation" is a sentence that reads like
negligence from outside and reads like a Thursday from in here.

Think about what a build of a game from 2001 depended on. A custom exporter
somebody wrote in a fortnight to get geometry out of a package nobody licenses
any more. A texture conversion step that existed as a batch file on one
machine. Middleware with a version number nobody wrote down, because at the
time everyone knew which version it was. A lightmap bake that reproduces on
exactly one build of one tool and shows seams on every other. Source art at
working resolution, which went when the drive filled, because the drive always
filled and the shipped compressed copy was right there.

Every one of those is what a pipeline *is* while it is alive: a set of
agreements held in people's heads and in the layout of a network share, and the
shipped build is the only artefact that ever gets checked for completeness. We
hand over the thing that runs. Nobody has ever once asked me to hand over the
thing that rebuilds.

[[ANEDDOTO: a time he had to go back into an old project — his own, or one handed to him cold — and the one specific thing that was missing, plus what the workaround cost in days]]

This is the part that should irritate you if you do this for a living.
Everything in that list is a technical artist's job. Reproducible bakes,
version-pinned tools, source files a stranger can open, naming nobody has to
decode: that is the whole discipline, and it is the first budget line struck
when a schedule compresses, because none of it shows up in a build review. You
cannot screenshot a working pipeline.

## Two hundred million

The two hundred million is the figure I keep turning over, because I do not
think it is mostly a figure about art.

*Mass Effect* exists. The models exist, the writing exists, three shipped games
and a remaster exist, and there are people walking around right now who know
where every system in it is buried. Most of nine figures buys the work of
getting all of that back into a state where a team which has never met it can
pick it up: re-establish the tools, document what was undocumented, rebuild the
content chain, work out which of forty branches was the one, and relearn by
excavation what fifty people knew by Tuesday and took with them when the badges
went off.

Dispersal is the expensive part, and dispersal is a decision somebody makes on
a spreadsheet in an afternoon.

You can watch the alternative happening in public this week, for nothing. A mod
team is remastering the *Mass Effect 3* co-op mode that the Legendary Edition
left behind, and they talk about it as a responsibility now. One of the
original composers put out his re-scored version of the leaked trailer as a
goodbye. A documentary two years into filming turned into a eulogy the week the
studio shut. That is continuity work, done by volunteers, a composer on his own
time and a film crew, while the entity that owns the trademark quotes two
hundred million to touch it.

[[ANEDDOTO: something on a project or a tool that survived only because one person happened to keep a copy — the informal archive all of us run and none of us are paid for]]

## Eighty-seven percent

Here is why none of this is sentiment.

Capcom's last half-year moved 36.86 million games. 32.18 million of them were
catalogue — things released in earlier years, some of them more than a decade
back. Eighty-seven percent. Seven units in eight that the company shipped in
six months were games it had already finished.

That is the business. The majority of the volume, in the biggest half the
company has had. Every publisher sitting on a back catalogue is looking at some
version of that ratio right now, which is why twenty-five EA classics landed on
Steam in one afternoon and why a twenty-five-year-old dungeon crawl was worth
clearing rights with three companies over.

So the asset class that pays is the old work, and the condition the old work is
kept in belongs to nobody. Those two facts sit in the same annual report and
never meet.

Access on its own fixes nothing, mind. The *Ocarina of Time* remake had the lot
— every asset, every document, the company that made it still standing — and I
have already argued on this blog that the team missed 1998 anyway. A complete
archive is the floor. You cannot get off the floor without one.

## Tape

The detail I cannot get past is still the videotape.

Somewhere inside EA there is a shelf, and on that shelf is the only copy of a
cutscene at a quality worth shipping, and the way it got there is that in 1994
the video people did what video people do with masters. They labelled them and
they put them somewhere dry. The software side, with a hundred times the
storage and every advantage going, kept the compiled result and let the rest
go.

Film learned this by burning its own negatives and then spending fifty years
paying to undo it. We are still at the stage of treating the shipped build as
the archive, when it is a rendering of one, and every year it holds a little
less of what made it.

Archive the project. The build is what you sold once. The project is the only
thing that lets you sell it again.
