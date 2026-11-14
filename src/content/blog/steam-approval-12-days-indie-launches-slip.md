---
title: "Steam approvals take 12 days: indie launches slip"
date: 2026-11-14
category: Games
excerpt: Valve says checking a build can take 12 business days against a usual three to five. The re-review loop is where a small studio loses its date.
cover: /img/blog/steam-approval-12-days-indie-launches-slip/shot-01.jpg
sources:
  - outlet: GamesIndustry.biz
    url: https://www.gamesindustry.biz/steams-submission-and-approval-backlog-is-forcing-indie-devs-to-delay-game-launches
  - outlet: PC Gamer
    url: https://www.pcgamer.com/gaming-industry/valve-admits-its-running-behind-on-approving-steam-games-because-it-has-to-keep-re-reviewing-them-which-surely-has-nothing-to-do-with-ai
artistView:
  take: "Valve's fix is a config checklist, and the items on it are exactly the things that look fine in your editor and break the moment a stranger launches your build through the client. That is a well-aimed patch to a submission pipeline. It is a small patch against a queue this long."
  works:
    - "Pipeline: pushing verification upstream is correct. A reviewer who spends a slot discovering your depots are mis-assigned has burned the slot and sent you back in the queue, so making the developer prove the build launches is the cheapest possible gate."
    - "Pipeline: the five-minute playtime window is tied to the current build rather than to any build, which closes the obvious workaround of a tick from a run three versions ago."
  misses:
    - "Pipeline: a checklist cuts the failure rate, not the queue. Studios still cannot plan backwards from a date when the last step in the chain takes somewhere between three and twelve business days."
    - "Process: the Community page stays open while a game sits unapproved, so a developer watches complaints accumulate under a product nobody can buy. That is a storefront problem Valve has not addressed."
---

A release date is a promise made to a dozen other people —
the person cutting the launch trailer, whoever booked the influencer codes, the
localisation contractor whose invoice is dated to it, the artist who agreed to
stop touching the key art on a Tuesday because marketing needs it on the
Wednesday. Move the date and all of that moves with it.

Valve has told developers that
checking a build before release can now take as long as **12 business days**,
against the three to five it used to quote, and the reason it gives is a
significant increase in submissions plus builds it has to review more than
once. I could not open the Steamworks post from here — `steamcommunity.com`
is outside this session's allowed domains — so the wording above is as
reported by GamesIndustry.biz and PC Gamer in the first week of November.

Twelve business days is close to three weeks on a calendar.

## Who it has hit

<figure>
  <img src="/img/blog/steam-approval-12-days-indie-launches-slip/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Studio Daimon, via the official Steam page for Food Devils</figcaption>
</figure>

Food Devils, a strategy-RPG roguelite from the Italian studio Studio Daimon,
submitted its Early Access build on **12 October** and was still waiting when
its launch date arrived. Game director Alfred Kamon said the team could only
assume the queue was clogged. The planned date was 3 November, though earlier
coverage of the game listed 5 November, so the two sources disagree by two
days; either way it passed with the build sitting in a queue. Price was set at
$19.99.

2 Left Thumbs said Wheel Make It missed its window by nearly two weeks. It then
launched to **15 concurrent players** against more than 11,000 wishlists, which
is the kind of number that ends a small studio rather than annoying it. A
wishlist is a notification waiting to fire on a specific day, next to a trailer
and a press beat. Fire it a fortnight late into nothing and you have spent the
only launch you get.

Caravan Carnage: Fruity Road went in on 16 October and came out approved on 1
November. Sixteen calendar days. The psychological adventure Abashed was dated
4 November. Elsewhere a developer described watching player complaints pile up
on their game's Steam Community page while the build sat unapproved — a
storefront arguing with customers about a product they cannot buy yet.

## The re-review loop

Valve's own explanation names re-reviews. Do the arithmetic on that one.

A twelve-day review is survivable if you schedule for it. Fail one on a
configuration error and the bill comes to twelve days, a fix, and a fresh
position at the back of the line — and the fix itself takes an afternoon,
which makes the arithmetic absurd. Two rounds of that eats a
month to correct something a launch script would have caught.

So look at what Valve put on the new checklist, announced on 3 or 4 November
depending on which outlet you read. Developers must now run the game through
the Steam client for at least five minutes before requesting review, with that
playtime falling inside the last seven days or since the most recent build
upload. They must declare required redistributables or confirm there are none.
Someone in the Steamworks partner group has to write a save to Steam Cloud and
confirm it lands. Achievement setups flagged for missing names, duplicate
entries or absent icons have to be cleaned up first.

Read that list as a bug report on the submissions Valve has been receiving,
because that is what it is. Every item is a thing that works perfectly on the
machine it was built on and dies the first time a stranger launches it through
the client.

Launch options are the classic. You have been running the game from your IDE
or straight off the executable for two years; the Steam launch configuration
points at the wrong binary, or the wrong working directory, and nobody notices
until someone who is not you presses Play. Content depots are worse, because
a depot that was never assigned to the right branch produces a build that
starts and then has no audio, or no level two. It looks like a broken game.
From a reviewer's chair it is indistinguishable from a broken game. Cloud saves
fail silently in exactly the same way — the path is right locally and the
quota or the pattern is wrong in the Steamworks config, so the feature your
store page promises simply does not happen.

None of that is exotic. It is the unglamorous last mile of shipping, the week
where the work is reading your own config back to yourself, and it is the week
that gets compressed when the art and the design ran long. Valve installs the
build, plays it, and compares what it finds against the store page and the
content survey. If the store page says cloud saves and the build does not do
cloud saves, that is a mismatch, and a mismatch is a second review.

[Going gold stopped meaning shippable](/blog/rayman-legends-retold-gold-delay-snowdrop/)
some time ago, and this is a smaller, meaner version of the same thing: the
build is finished and the date still is not yours.

## The AI question, stated carefully

Valve has not blamed generative AI for any of this. Its stated reason is volume.

Developers have been less careful, and you can see why: Steam Next Fest in
October 2026 carried more than 8,000 demos, a substantial share of them made
partly or wholly with generative tools, per GamesIndustry.biz. A reviewer
queue is a fixed number of humans installing and playing things. Double the
things and the queue doubles, whatever made them.

A Valve representative at Steam Indie Connect put the platform's position
plainly — the company does not want to be a gatekeeper telling developers
which tools to use. That is consistent with everything Valve has done for a
decade, and it has a cost, and the cost is currently being paid in two-week
delays by studios of four people. Worth remembering what the storefront's
thirty per cent is meant to cover: hosting, payments, the client, and
[a revenue share that has not moved since 2003](/blog/valve-turns-30-steam-cut-small-studios/).
Build review is in there too.

## What a small team should do with this

Submit earlier than feels necessary. Budget three weeks of slack. Treat the
submission build as a release candidate that has to pass a cold-start test on
a machine that has never seen your project — install from the client, launch
from the library, play five minutes, save, quit, check the save came back.
Valve now requires it, which tells you how many builds were arriving without
it.

And set the announced date after approval lands, not before. That is the
expensive advice, because a date is how a small game gets covered at all, and
nobody wants to hold one. The alternative is 11,000 wishlists firing into an
empty room.
