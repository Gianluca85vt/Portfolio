---
title: "Netflix cut 1,000 jobs, mostly product and tech"
date: 2026-10-14
category: Film & TV
excerpt: Netflix laid off about 1,000 people on 14 October, 6% of staff. The co-CEOs say most of the cuts sit in product, technology, legal and HR.
cover: /img/blog/netflix-1000-layoffs-product-and-tech/shot-01.jpg
sources:
  - outlet: The Hollywood Reporter
    url: https://www.hollywoodreporter.com/business/business-news/netflix-hit-layoffs-growth-slows-1236720435/
  - outlet: Deadline
    url: https://deadline.com/2026/10/netflix-layoffs-underway-1237156351/
  - outlet: Variety
    url: https://variety.com/2026/film/news/netflix-film-vp-doug-belgrad-layoff-1236911877/
artistView:
  take: "The content side came through this almost untouched, which will read as reassuring to anyone whose work Netflix buys. The group that took the cut is the one that writes the delivery specs and builds the measurement tools the rest of us conform to, and that bill arrives later and in smaller pieces — a spec that drifts, a validation tool that stops getting attention, an answer from a partner engineer that takes three weeks instead of three days."
draft: true
---

Netflix laid off around 1,000 people on Wednesday, about 6% of its global
workforce. Ted Sarandos and Greg Peters sent the note to staff themselves, and
the line everybody is quoting back at them is that the business "is strong and
growing" and remains on track to hit its full-year forecast. The cuts, they
said, are about being "disciplined about where we prioritize our people and
resources".

The framing varies by outlet. The Hollywood Reporter and Deadline both call it
the largest round since 2022; Variety calls it the biggest in the company's
history. Both can be right — the 2022 rounds were smaller, and came in two
goes.

The detail worth sitting with is where it landed. Per the co-CEOs' own email,
the majority of the cuts are in product, technology, legal and human resources.
Not production. Not the content organisation, which is where you would look
first if you thought a streamer in trouble starts by buying fewer things.

One senior content casualty did go: Doug Belgrad, VP of film, out after two
years. He joined in 2024 as one of Dan Lin's first hires, having run Columbia
Pictures and then Sony's motion picture group before that. Netflix declined to
comment on his exit.

## Why a technical artist should care about a product-and-tech cut

Because of what Netflix's technology organisation actually produced.

If you have delivered a shot, a master, or a mix to Netflix in the last ten
years, you have conformed to their specifications. Not loosely — Netflix's
delivery requirements are the most prescriptive in the business, and they are
published rather than negotiated. IMF packaging. Approved camera lists. Colour
and HDR requirements written down to the metadata field. Photon, their IMF
validation tool, is open source, which means half the post houses in the world
are checking their own packages with Netflix's code before they ship them
anywhere.

Then there is VMAF. Netflix co-invented it to replace PSNR in their own
encoding decisions, because PSNR correlates poorly with what a person actually
sees, and then open-sourced it. It is now in FFmpeg and in most encoding
toolchains that care about quality, used daily by people who have never
delivered a frame to Netflix. Per-title encoding came out of the same group,
and then per-shot after it — the idea that a bitrate ladder should be built
from the content in front of it rather than from a table.

That is a lot of industry infrastructure to have come out of one company's
"product and technology" bucket.

## What nobody has said

Which teams inside that bucket. And the bucket is enormous.

Netflix product and tech covers the recommendation system, the ads stack, the
games effort, the player on every device ever manufactured, the live
infrastructure, and the encoding and delivery pipeline. A thousand people, 6%,
weighted toward product and tech, tells you nothing about whether the encoding
group lost two people or forty. I have not seen a single report break it down,
and I would not trust one that claimed to this afternoon.

So treat the paragraphs above as a description of what is in that building,
rather than a claim about what came out of it. The honest version is that the
risk exists and the shape of it is unknown.

What I would watch for, over months rather than weeks: how fast partner
engineering answers a delivery question, whether the open-source repositories
keep getting commits, and whether the specification documents get their usual
revisions. Those are the observable symptoms, and they are slow.

## The pattern

Netflix has done this before in a smaller way, and this blog has covered it.
In August the company [closed Night School Studio, the maker of
Oxenfree](/blog/netflix-closes-night-school-studio-oxenfree/), six weeks after
its last release — a team acquired during the games expansion, cut when the
expansion stopped being the priority. The same logic is visible here, one order
of magnitude up: the things built during a growth phase get reassessed when
growth slows, and the group holding them has no show to point at.

A content team has a title and a release date. It is legible to everyone,
including whoever is drawing up the list. An encoding team's best year is one
where nobody noticed anything, because the picture held up on a bad connection
and the colour arrived the way the DP intended. That work is invisible by
design and, come a reorganisation, invisible work is the easiest to under-count.

Meanwhile the commissioning goes on. The craft Netflix buys is as demanding as
it has ever been — season two of their Avatar put [Appa's entire coat into
CG](/blog/avatar-season-2-appa-fur-practical-cg-groom/) after the first season
did it partly practically, which is not a company economising on pictures. The
shows are not the worry. The plumbing those shows travel down is maintained by
the part of the company that just got smaller, and plumbing is not something
you notice until the day it fails.
