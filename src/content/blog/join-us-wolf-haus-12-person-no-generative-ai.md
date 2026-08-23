---
title: A 12-person studio is building a large-scale open world, and refusing generative AI on principle
date: 2026-08-18
category: Games
author: ruben-castellani
excerpt: Wolf Haus Games is shipping the open-world co-op cult sim Join Us with about a dozen people and no generative content tools. That's not a marketing line — it's a scoping constraint, and it says something about where the rest of the industry is quietly not going.
cover: /img/blog/join-us-wolf-haus-12-person-no-generative-ai/shot-01.jpg
---

**Join Us** is a co-op survival game where you run a doomsday cult — recruit
followers, build a belief system, ride around your compound on a pig with a
machine gun. It's dark comedy from **Wolf Haus Games**, a Montreal studio
funded by Krafton (the PUBG people) and founded by a pair of horror
filmmakers. It's out on Xbox and Game Pass, day one, in **March 2027**.

None of that is what stopped me scrolling. This did, from
[GamesIndustry.biz's profile of the studio](https://www.gamesindustry.biz/the-hollywood-disruptors-making-a-large-scale-game-with-a-12-person-team-and-no-generative-ai):
Wolf Haus is about a dozen people — ten full-time, two part-time — building
an open-world game with systems ambitious enough that the press is calling it
"large-scale," and they've committed to doing it without generative AI.

## Twelve people is not enough headcount for "large-scale," normally

<figure>
  <img src="/img/blog/join-us-wolf-haus-12-person-no-generative-ai/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Wolf Haus Games, via the official Steam page for Join Us</figcaption>
</figure>

I mean that literally, not as a knock on the team. A modern open-world
project usually gets its scale from one of three places: a large in-house
art department, a large outsourcing budget, or — increasingly, and this is
the part that made the headline — a generative pipeline that lets a small
team produce content at a rate their headcount doesn't support. Take the
third option off the table on principle, as Wolf Haus says it has, and you
haven't removed a shortcut. You've removed the thing most twelve-person teams
attempting this scope would currently reach for first.

So the scale has to come from somewhere else, and the "somewhere else" is
the part of this story that's actually interesting to build, not the part
that's interesting to read a headline about.

## Where the scale probably comes from instead

I haven't seen Wolf Haus's pipeline, so this is informed reasoning about how
I'd have to solve it at that headcount, not confirmed detail from the studio.
But the shape of the problem is familiar — I've scoped environments for teams
this size before, and the levers are the same short list every time:

- **Modular kits over unique assets, aggressively.** A cult compound built
  by a handful of environment artists survives contact with an open world
  only if almost everything on screen is a reassembled piece of a small kit
  — wall panels, roof modules, trim sheets — not a bespoke prop for every
  building. The visual variety has to come from arrangement, not from asset
  count.
- **Systems doing the content's job, not art doing it.** PC Gamer's early
  coverage describes the cult's belief system as "a dynamic skill tree that
  evolves as the game goes on" — that's design and code generating player-
  facing novelty that a small art team would otherwise have to hand-build.
  Every hour of gameplay variety that comes from a system instead of a new
  asset is an hour the environment team doesn't have to cover.
- **World Partition and streaming discipline, not a hand-placed world.**
  At twelve people you cannot afford to art-direct every square metre of an
  open map individually. You build rules — biome kits, placement logic,
  density curves — and let the engine's streaming tools do the layout at a
  scale no one on the team hand-touches directly. That's not generative AI;
  it's the same procedural placement environment artists have used for a
  decade, just under more pressure to carry more of the map.

None of this is exotic. It's the standard small-team playbook for punching
above your headcount. What's notable is that Wolf Haus is publicly
committing to run that playbook *instead of* the generative shortcut, at a
moment when plenty of studios are reaching for the shortcut quietly and
hoping nobody asks.

## The contrast that makes this worth flagging

This is the same week Saber Interactive is still cleaning up after [its own
AI-writer controversy](/blog/saber-rideshare-ai-writer-controversy/) — a
studio that reportedly moved toward AI-generated writing and then had to
walk it back publicly, disclaimer and apology included. Put the two stories
next to each other and the interesting thing isn't that one studio uses AI
and one doesn't. It's that "we don't use generative AI" is now a strong
enough differentiator that a trade outlet leads a headline with it, for a
twelve-person team nobody had heard of a year ago.

That's a marketing choice as much as a production one — Wolf Haus's founders
have Hollywood roots, and "no generative AI" reads well to an audience that's
increasingly primed to ask the question unprompted. But marketing choices
that also function as scoping constraints are the ones I actually pay
attention to, because they force real decisions downstream: which kit gets
built, which system carries the weight a bigger art team would otherwise
carry, and which parts of the world simply don't get built at all. Join Us
is over a year from release. Whether the compound holds up once the belief
system stops being a novelty is the actual test — but the production
approach getting a hearing at all is the part I'll keep watching for.

*Team size, funding and release details from GamesIndustry.biz's profile of
Wolf Haus Games and the studio's press materials; the belief-system detail is
from PC Gamer's early preview coverage. The pipeline breakdown is my own
reasoning about how a team this size would have to approach the scope, not a
confirmed account of Wolf Haus's actual tools.*
