---
title: Sony still can't give PS6 a launch date, and the reason is a budget I recognise
date: 2026-08-19
category: Tech
excerpt: Sony's CEO says PS6 pricing and timing are still undecided because DRAM stays expensive through FY2027. For anyone who plans texture streaming pools for a living, that's not investor-call noise, it's the exact budget problem I run into on every environment.
cover: /img/blog/ps6-memory-crisis-next-gen-art-budgets/shot-01.jpg
draft: true
---

Sony CEO Hiroki Totoki said this week that the company still hasn't fixed a launch date for
PlayStation 6. Not a vague "when it's ready," a specific, on-record admission that the memory
market is the thing holding the calendar hostage. His own words: *"Looking at the current
circumstances, the memory price is also expected to be very high FY 2027, because there will
still be a shortage of supply."* He went further in a separate comment, calling the situation
serious enough that "we need to take some action, otherwise we cannot survive in this
landscape."

That is an unusually blunt thing for a console maker to say out loud, and I want to explain why
it matters to me specifically, not just to anyone waiting on a preorder.

## The numbers behind the statement

<figure>
  <img src="/img/blog/ps6-memory-crisis-next-gen-art-budgets/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Wikimedia Commons, CC BY-SA</figcaption>
</figure>

Sony has said it has enough RAM secured to keep building PS5 units through **March 2027**. Next
year's RAM production, separately, is already **entirely sold out**. That is the same DRAM
shortage I wrote about a few days ago when DDR5 workstation kits went from roughly 95 dollars to
over 550 in about a year, driven by AI data centres buying up memory fabs' output ahead of
everyone else. It has now reached the point where it is dictating the launch window of a
hundred-million-unit console platform, not just PC part pricing.

That is the part worth sitting with. This isn't a shortage that resolves before the next
generation starts. It is shaping what the next generation *is*.

## Why a technical artist reads this differently

Every console generation I've worked around has had one constant: the jump in available memory
is what actually unlocks the art. PS3 to PS4 meant textures stopped needing to be so aggressively
tiled and reused. PS4 to PS5 meant streaming pools got big enough that open-world games could
stop pre-baking so much and start loading detail on the fly, because there was finally enough
RAM and bandwidth to gamble on it. The generational leap in *memory*, more than raw GPU flops, is
usually what changes the brief an environment artist gets handed.

If DRAM stays this expensive into 2027, Sony has two bad options, and both change what a PS6
environment art pipeline looks like. Ship with a memory config that is not the leap developers
were expecting, so the whole generation launches budgeting closer to PS5 numbers than to the jump
we're used to. Or eat the memory cost and price the console high enough that it can't sell the
volume a platform holder needs, which is its own kind of pressure that lands back on
studios through tighter budgets elsewhere.

Either way, the practical effect on my side of the fence is the same: **don't assume the next
generation buys you a free doubling of texture and streaming budget.** The instinct after every
hardware jump is to loosen constraints, bump up texel density, add another mip tier, rely on the
platform to carry more unique geometry per scene. That instinct might not pay off this time, or
might not pay off on schedule, because the hardware it depends on is being built against a memory
market that is not behaving like previous cycles.

## What I'm actually watching for

Not the launch date itself, that's Sony's problem to solve. What I want to see once real specs
leak is the **memory bandwidth and total pool figures relative to PS5**, not just the number on a
spec sheet. A modest bump there is the tell that virtualized texturing, aggressive streaming, and
instance-heavy techniques stop being "nice to have" tools for saving memory and become the
default way next-gen environments get built, the same way Nanite and World Partition style
systems went from novelty to baseline this generation because the alternative stopped being
affordable.

The GPU and RAM shortages already forced that discipline onto anyone building a workstation. It
looks like the console side of the industry is about to get the same lesson, just a generation
later and at a much bigger scale.

Sources: [GameDeveloper on the memory crisis driving PS6 uncertainty](https://www.gamedeveloper.com/business/memory-crisis-is-causing-uncertainty-over-playstation-6),
[TechPowerUp on Sony's DRAM pricing comments](https://www.techpowerup.com/348894/playstation-6-price-and-launch-date-remain-uncertain-in-face-of-dram-pricing-uncertainty),
and [TechRadar on Totoki's "cannot survive in this landscape" remark](https://www.techradar.com/gaming/sony-ceo-confirms-the-ps6-launch-date-is-still-undecided-due-to-the-ongoing-component-shortage-considering-that-importance-we-need-to-take-some-action-otherwise-we-cannot-survive-in-this-landscape).
Sony has not confirmed a PS6 launch window, price, or final memory configuration as of this
writing, all of the above rests on the company's own public statements, not a leaked spec sheet.
