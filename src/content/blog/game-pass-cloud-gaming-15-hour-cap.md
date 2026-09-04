---
title: "Game Pass cloud gaming: 15 hours a month"
date: 2026-09-04
category: Tech
cover: /img/blog/game-pass-cloud-gaming-15-hour-cap/shot-01.jpg
excerpt: From November, Ultimate gets 15 streaming hours a month, Essential gets 5. Divide the price by the cap and all three tiers land on roughly the same hourly rate.
---

Microsoft announced on **3 September** that Xbox Cloud Gaming stops being
all-you-can-eat. From November the monthly streaming allowance is 15 hours on
Game Pass Ultimate at $23 a month, 10 hours on Premium at $15, and 5 hours on
Essential at $10. Run out and you can buy more time from the Xbox Store, though
no price for that has been published and it will vary by market. Downloads are
untouched — this is only about frames rendered in a datacentre and shipped to
you as video.

Ultimate has included unlimited streaming since 2020, back when the service was
still called Project xCloud. Six years is a long run for a promise like that.

Microsoft's stated reason is the honest one. The cost of running the service
grows with how much people use it, so the company moved to limits rather than
stop investing in it. It also says around 4% of subscribers currently play
enough to hit the new ceiling. One in twenty-five.

## Divide the price by the cap

<figure>
  <img src="/img/blog/game-pass-cloud-gaming-15-hour-cap/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Xbox Series X hardware, via Wikimedia Commons, Creative Commons licensed</figcaption>
</figure>

Do that for each tier and the numbers converge in a way the tier names don't
suggest.

- Ultimate: $23 ÷ 15 hours = **$1.53 an hour**
- Premium: $15 ÷ 10 hours = **$1.50 an hour**
- Essential: $10 ÷ 5 hours = $2.00 an hour

Ultimate and Premium sit three cents apart. Those two tiers were built as
different catalogues — different games, different day-one access — and the caps
have been laid over the top at a flat rate per hour, near enough. That reads
like someone worked out what a streaming hour costs to serve, took the tier
price, and divided.

15 hours across a month is about half an hour a day. As a fraction of the month
it is 2.1% — the amount of wall-clock time Microsoft is willing to hold a
machine for you at that price.

## A stream holds a whole console

This is the part that makes cloud gaming behave unlike almost everything else
sold as a cloud service.

When xCloud launched, the racks were built from customised Xbox One S units,
eight of them in a 2U enclosure. Four players per rack unit. Microsoft has since
finished replacing that fleet with Series X-class hardware, which bought faster
loading and better frame rates, and did not change the shape of the problem:
one player, one machine, for the whole session.

A web server does not work that way. Nor does a game server — a multiplayer
host carries hundreds of players on one box, because it is tracking state and
resolving collisions, not drawing anything. You can oversubscribe that.
Rendering resists it. A 60Hz frame budget is 16.6 milliseconds and a well-made
game will spend all of them, so there is nothing left over to lend anybody.
Then add the video encoder, compressing every one of those frames in real time
at low latency. The box is yours until you put the controller down.

So the cost curve is a straight line. Every extra streaming hour is an extra
hour of hardware, power and cooling. Storage gets cheaper per terabyte and CPU
gets cheaper per instruction, but a rendered hour has never fallen at anything
like that slope.

## The 4% is why the cap exists

One subscriber in twenty-five plays enough to notice this, and that thin slice
is the slice that sets the size of the estate.

Capacity has to be provisioned for peak concurrent sessions rather than average
ones. Sunday evening in a region decides how many blades sit in that
region, and those blades then idle through Tuesday morning burning rack space
and depreciating. Heavy users move the peak; light users cost almost nothing.
Trimming the top of the curve is worth far more per subscriber than the raw
share of subscribers implies.

There is a second option coming for people without a Game Pass membership,
which fits the same logic — meter the hours, sell them to whoever wants them,
stop bundling an unbounded resource inside a flat fee.

## What it changes for the people who actually used it

Cloud streaming has always had two honest use cases. One is trying a game for
twenty minutes before committing an install to a drive that is already full.
Fifteen hours a month covers that comfortably; a lot of people will never see
the meter.

The other is playing on hardware that cannot run the game at all — a work
laptop, a phone with a clip-on pad, a TV with the app built in, a Mac. For those
people streaming is the whole console. Half an hour a day is not a console.
They were the face of xCloud in the marketing, and the ceiling lands squarely
on them.

I would want the per-hour top-up price before judging how bad this is. If extra
hours land near the $1.50 the tiers imply, streaming becomes a metered utility
that is honest about being one. If they land well above it, the cap is a fence
around an upsell. Microsoft has not said, and November is the moment we find
out.

Whatever the number turns out to be, a rendered frame in Azure costs what it
costs. Nobody has found a way to make one console serve two players at once, and
six years of unlimited streaming were six years of Microsoft paying the
difference.
