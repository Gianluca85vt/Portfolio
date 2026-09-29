---
title: "Toptoon's owner is now Ankey AX, an AI company"
date: 2026-09-29
category: Manga
excerpt: Topco Media became Ankey AX on 10 September and filed virtual humans as a business purpose. Its in-house studio runs Grok, NovelAI and ComfyUI.
cover: /img/blog/toptoon-owner-ankey-ax-ai-company/shot-02.jpg
sources:
  - outlet: Anime News Network
    url: https://www.animenewsnetwork.com/news/2026-09-28/topco-media-rebrands-as-ankey-ax-expanding-webtoon-ip-business-into-ai/.242254
  - outlet: The Outerhaven
    url: https://www.theouterhaven.net/topco-to-use-ai-for-short-form-webtoon-animation/
artistView:
  take: "A vertical-scroll comic is the cleanest input an image-to-video model will ever be handed: flat layers, a locked character sheet, no camera to solve. The studios that industrialised that separation built the seam a generative pass now slides into, and model quality has very little to do with it."
  works:
    - "Pipeline: going by the company's own description of its stack, putting ComfyUI at the centre means graph-based, versioned, reviewable steps rather than prompts in a box. That is the right shape for production work."
    - "Art direction: webtoon houses keep tight character sheets and reusable background plates because the format demands weekly output, and a locked reference set is exactly what keeps a generated frame on model."
  misses:
    - "Animation: motion applied to a finished panel gives you parallax and a mouth flap, not weight. Published short-form promos lean on slow pushes and drifting hair for that reason."
    - "Pipeline: a claimed three-to-five-times output speed only helps if a direction note is still cheap. Regenerating a shot is not the same as correcting one, and retakes are where animation schedules go."
---

Only Anime News Network has carried this one in English so far, so the second
source below covers the AI-animation strand rather than the name change itself.

Read the paperwork rather than the name. Topco Media — the Korean
publisher behind the webtoon platform Toptoon and the web-novel platform
Novelpia — approved a change to **Ankey AX Co., Ltd.** at an extraordinary
shareholders' meeting on 10 September 2026. At the same time it added AI
content, AI chatbots, virtual humans and AI solutions to its stated business
purposes.

Filing virtual humans as a business purpose is a statement about where the
revenue is expected to come from. Faster comics does not need that clause.

## The stack they already built

The rename lands on top of about a year of work. In September 2025 Topco
announced short-form animation for its webtoons, driven in-house: motion over
existing panels, with AI-produced shorts as a premium-tier perk. By early
December 2025 it was reporting that its first AI-produced adult animation,
*Office Romances Are Strictly Forbidden*, had done well enough in Taiwan to
justify a global rollout, and it put a number on it — returns of roughly five
times the original webtoon's production cost. Treat that figure as the
company's own, because it is; nobody has audited it.

The pipeline description is harder to wave away. An in-house AI studio,
expanded NVIDIA GPU capacity, and a custom production chain combining Grok,
NovelAI and ComfyUI, producing output the company says runs three to five times
faster than its traditional process.

ComfyUI sitting in the middle of that is the detail I keep turning over. It is
a node graph. Load a checkpoint, mask a region, run a controlnet off a pose or
a depth pass, composite, save. You can version it, hand it to someone else, and
diff it when a shot comes back wrong. That is a pipeline tool in the sense a
studio means the word, and it is a long way from the "type a sentence, get a
picture" framing most coverage still uses. Somebody there has built graphs.

<figure>
  <button class="video-embed" data-video="icZ145Q4rUk" data-title="How S. Korean webtoons are integrating AI for tech-savvy global audiences" type="button">
    <img src="/img/blog/toptoon-owner-ankey-ax-ai-company/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a news segment on Korean webtoon studios adopting AI tools" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A 2024 news segment on Korean webtoon studios folding AI into production. It predates Topco's own studio by a year and is useful for how ordinary the practice already sounded then.</figcaption>
</figure>

## Why webtoons went first

Every format that generative video has chewed through early had the same
property: the source art was already separated.

Vertical-scroll comics are the extreme case. A webtoon episode is produced as
stacked layers — line, flats, shading, background, effects, lettering — because
it has to ship weekly and the work is split across a team. Character sheets are
locked early and enforced, since three different colourists have to produce the
same face. Backgrounds are frequently blocked in 3D and traced or rendered
over, which means the geometry exists somewhere in the studio. There is no
camera solve, no lighting continuity between shots, no lip-sync tradition to
violate.

Hand that to an image-to-video model and you are asking it for something close
to its easy case: hold this design, move this layer, give me four seconds.

Which is the part worth sitting with. The division of labour that made webtoon
studios fast — every stage handing the next a clean, standardised file — is the
same division that makes a stage removable. An assembly line is legible. A
legible process is one you can describe to a machine.

## The number that does not mean what it says

Three to five times faster output is a real claim and I believe some version of
it. Animation schedules are governed by revisions, and drawing frames sits well
down the list of what consumes them.

Notes are the expensive thing. A director looks at a cut, says the hand reads as
wrong, and somebody fixes that hand while the other four hundred frames stay
exactly as they were. Diffusion does not do that. You regenerate and take a new
roll of the dice on everything else in the shot, or you paint over the output
by hand, at which point the human labour you removed walks back in through the
compositing door. Level-5 ran into the shape of this problem from the other
direction when Akihiro Hino
[apologised for AI and restated the five-to-two plan in the same broadcast](/blog/level-5-ai-apology-five-to-two-plan/)
— the ambition is schedule compression, and schedules are made of revisions.

So a five-times throughput figure is most plausible on work nobody will give
notes on. Short-form promotional loops. Adult content sold on volume. Chat
avatars. Look at the business purposes again and that is roughly the product
list.

## What this costs the people drawing

I have watched enough pipeline tooling arrive to know the pattern, and the
honest version is not that the tool is bad. The places where generative work
[earns its keep in a production pipeline are small, unglamorous and
compounding](/blog/ai-in-a-3d-pipeline/) — cleanup, variants, the fourth
iteration of something already approved. A background plate you needed anyway,
in a style already locked.

What changed here is the size of the unit being replaced. A whole stage of the
line, rather than a task inside somebody's day.

Toptoon's catalogue was drawn by working artists under contract, and the
company's plan now is to develop those properties into AI-generated
conversations, stories and images. Whether the original creators see anything
from a derivative their contract never imagined depends entirely on Korean
platform contracts nobody outside those studios has read, and I am not going to
guess at terms I cannot see. It is the question I would want answered before
signing the next one.

Ankey AX also shipped Toptoon Chat, a service that lets readers talk
one-to-one with characters from its webtoons, first in Korea and since extended
to Japan, Taiwan and North America. A character someone designed, now answering
questions the designer never wrote. That is the business, described plainly,
and it is why the new name has AX in it rather than toon.
