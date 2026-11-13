---
title: "Jensen Huang resigns: what changes for GPUs"
date: 2026-11-13
category: Tech
excerpt: Nvidia announced the transition on 12 November. Huang's exit touches no silicon roadmap, and it hands one decision behind GeForce pricing to a new owner.
cover: /img/blog/jensen-huang-resigns-nvidia-render-box/shot-01.jpg
sources:
  - outlet: NPR
    url: https://www.npr.org/2026/11/13/nx-s1-6038889/colette-kress-becomes-nvidias-interim-ceo-after-jensen-huang-resigns
  - outlet: CNBC
    url: https://www.cnbc.com/2026/11/12/nvidia-jensen-huang-ceo-live-updates.html
  - outlet: NBC News
    url: https://www.nbcnews.com/tech/tech-news/nvidia-ceo-jensen-huang-resigns-reports-extramarital-relationships-rcna608402
artistView:
  take: "A founder leaving changes nothing I can measure in a render. The one Nvidia decision that has shaped my working life is how many wafers go to data-centre parts instead of GeForce, and that decision now sits with a finance executive holding the job temporarily. I would watch the next two product launches rather than the next two press releases."
draft: true
---

Nvidia announced the change on 12 November 2026. Jensen Huang has resigned as
president, chief executive and board member, effective immediately. Colette
Kress — chief financial officer since 2013 — becomes interim chief executive
and keeps the CFO job while she does it. Harvey C. Jones becomes the first
chair in the company's history to sit separately from the chief executive, and
the board says it is considering both internal and external candidates for a
permanent appointment.

The reason has nothing to do with chips. Reporting across NBC News, CNN and
CNBC ties the resignation to extramarital relationships, one of them with a
woman US authorities have been investigating as a possible Chinese agent.
Huang has denied compromising national security or any Nvidia secret, and the
Justice Department has not concluded that the woman is an agent. Three House
committees have summoned him for a closed-door interview on 1 December. The
market took it badly: the stock fell more than 13% in Thursday trading before
clawing back part of that.

I am going to leave all of that to the business desks, because from where I
sit the question is much narrower. Does the box under the desk care?

## What a chief executive cannot move

<figure>
  <img src="/img/blog/jensen-huang-resigns-nvidia-render-box/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Jensen Huang at the Nvidia CES 2025 keynote, holding an RTX Blackwell card. Photos by Pronoia, released CC0, via Wikimedia Commons.</figcaption>
</figure>

Mostly, no. And the reason is lead time.

The GPU you will be able to buy in eighteen months is already finished
silicon in the sense that matters. Its architecture was frozen years ago, its
die taped out months ago, and the fab capacity to print it was booked and paid
for long before this week. Nobody arriving in the chief executive's office on
a Thursday can make a different chip appear in 2027. They can cancel things
far enough out that nobody has seen them yet, and little else. Harvey
Jones's own statement in the announcement says the board expects operations,
customer commitments and the product roadmap to continue without interruption,
which is the thing a board always says, and in this case is also the thing
physics requires.

The software is stickier still. The reason a render box is an Nvidia box has
very little to do with who runs Nvidia and everything to do with CUDA being
twenty years old. OptiX sits on it. Redshift, Octane and Arnold's GPU renderer
sit on it. Cycles has a CUDA and an OptiX backend and the OptiX one is the one
people actually use, because it gets the denoiser and the hardware ray
tracing. Thousands of engineer-years of driver and toolkit
work sit under that, and a replacement chief executive inherits every one of
them.

So the roadmap is safe, the ecosystem is safe, and the thing most of the
coverage this week is about — who sits in the chair — turns out to be the part
of Nvidia that reaches an artist last.

## Allocation is the lever

Here is the decision that has actually set the terms of my working life.

Nvidia makes a GeForce card and a data-centre part out of broadly the same
industrial capacity, and somebody decides the split. For three years that
split has gone one way, and the consequences land on anyone building a
workstation. It is why [an RTX 5090 that launched at 1,999 dollars was asking
4,929 on Nvidia's own store in August](/blog/why-gpus-cost-so-much-right-now/)
— a price that has nothing to do with how many people want to play games. It
is the pressure behind the reports in October that [the GB202 die is being
reserved for professional cards, which would drop the top GeForce from 32GB of
VRAM to 24](/blog/rtx-5090-discontinued-vram-ceiling-24gb/). A heavy scene
either fits in memory or it does not. There is no graceful degradation at that
boundary; you just stop being able to render the shot on the machine you own.

That split is genuinely a management decision. It can be revisited quarterly.
It does not need a tape-out. If anything at Nvidia is going to move because
the person in charge changed, it is this, and it is the only part of the story
I would spend attention on.

## A CFO in the chair

Which brings me to the uncomfortable arithmetic.

Kress is interim. No permanent successor has been named, the board has opened
a search that may go outside the company, and a results call lands next week.
She is also, still, the chief financial officer — the executive whose job for
the past three years has been to explain data-centre margins to investors
every ninety days.

Set those facts next to each other and I cannot construct a reading where
consumer graphics gets a bigger share of capacity in the next two quarters. An
interim leader under a congressional summons, a share price down double
digits, and an earnings call days away is the configuration least likely to
move silicon toward the lower-margin product line. That is inference, not
reporting — Nvidia has said nothing about allocation this week and I am
reasoning from who holds which job. I could be wrong, and there is a version
of this where a new chief executive wants an early, visible, popular win and
gives GeForce a generous generation to get it.

I have been doing this long enough to be suspicious of my own neatness here.
The honest position is that the founder leaving is a smaller event for a 3D
artist than a single line in a February product announcement about memory
configuration, and we will not know which way the capacity went until a card
with a price on it exists. The press release is not where that shows up.

What I will say is that Huang was personally the one who walked onto a CES
stage holding a GeForce card up to a camera. Whatever the spreadsheets said
about where the wafers should go, there was a founder at the top of that
company for whom the consumer graphics brand was something he did himself, in
front of people, once a year. That is not in any filing, and it is not nothing.
