---
title: CD Projekt Red is shipping a Witcher 3 expansion in 2027 on the engine it already walked away from
date: 2026-08-26
category: Games
cover: /img/blog/witcher-3-songs-of-the-past-remaster-old-engine/cover.jpg
excerpt: Songs of the Past lands eleven years after Blood and Wine, and a free Remastered upgrade arrives on 29 September. Both are being built in REDengine — the technology the studio publicly moved off in 2022. Running two pipelines at once is the interesting part.
---

Eleven years.

That's the gap between Blood and Wine and Songs of the Past, the expansion CD
Projekt Red premiered at Opening Night Live last night. It arrives in 2027 on
PC, PS5, Xbox Series X|S and Switch 2, co-developed with Fool's Theory, and it
takes Geralt to a region called Letten — rural, pastoral, and hiding the usual
thing under the usual surface.

The same announcement carried a second one: The Witcher 3: Wild Hunt —
Remastered, a **free** upgrade for anyone who already owns the game, out
29 September.

<figure>
  <button class="video-embed" data-video="-_3WC47w4dw" data-title="The Witcher 3: Wild Hunt — Songs of the Past World Premiere Trailer" type="button">
    <img src="/img/blog/witcher-3-songs-of-the-past-remaster-old-engine/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from the Songs of the Past world premiere trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The world premiere trailer from Opening Night Live. Nothing loads from YouTube until you press play.</figcaption>
</figure>

## The bit nobody put in a headline

Yesterday I wrote about The Witcher 4 targeting 2028, built in Unreal Engine 5,
with over 500 people on it. CD Projekt Red announced that engine move in March
2022 and has talked about little else since.

Songs of the Past is not being built in Unreal Engine 5. Neither is the
remaster. Both are REDengine work — the in-house technology the studio very
publicly moved off four years ago.

So there are two live pipelines in that building. One is the future everyone
talks about. The other is an engine with no roadmap, whose tooling nobody new
is being trained on, shipping paid content into 2027.

That is a strange and quite expensive place to be, and I don't think it's an
accident.

## Why you'd do it anyway

The alternative was worse. Rebuilding Witcher 3 in Unreal to make one expansion
means re-authoring a world of hand-placed detail, remaking every material,
re-baking lighting that was art-directed around a 2015 renderer, and then
convincing an audience of millions that the thing they remember still looks
like itself. You'd spend Witcher 4 money to ship a Witcher 3 add-on.

Staying in REDengine means the world already exists, the tools already work,
and the people who know where the bodies are buried are — some of them, still —
around.

<figure>
  <img src="/img/blog/witcher-3-songs-of-the-past-remaster-old-engine/shot-01.jpg" loading="lazy" width="1920" height="1080" alt="A Witcher 3 landscape: rolling countryside under heavy cloud, with dense hand-placed vegetation" />
  <figcaption>Witcher 3's countryside as it shipped. Screenshot: CD Projekt Red, from the official Steam page.</figcaption>
</figure>

Handing it to Fool's Theory makes more sense once you notice they are already
inside this codebase — they're the studio working on the Witcher 1 remake. They
are not learning REDengine for this job. They were always going to be the people
who still knew it.

Read the two announcements together and it looks less like nostalgia and more
like a use for a team and a technology that would otherwise be idle while the
Unreal transition eats everything else.

## What "remastered" has to mean on an eleven-year-old world

Here's where it gets interesting for anyone who builds environments.

Witcher 3 has already been through this once. The Complete Edition next-gen
update in December 2022 added ray-traced global illumination and reflections,
higher-resolution textures, and a photo mode. So a 2026 remaster is a third pass
over the same geometry, and the obvious question is what's actually left to
improve.

Very little, if a remaster means resolution to you. Quite a lot, once you know
what a 2015 open world is made of underneath.

The original was built for a memory budget that assumed a PS4. That shows up in
places the marketing screenshots never go: LOD chains authored by hand with hard
switches you can see if you look sideways while riding, foliage cards that read
as flat the moment you get close, terrain that was sculpted knowing the draw
distance would hide the far half of it, and interiors lit with baked solutions
that had the limitations designed into the art direction rather than fought.

You can bolt ray tracing onto that. CD Projekt Red did, in 2022. But
ray-traced light lands on the geometry you actually have, and a bush made of
four intersecting planes lit accurately is still a bush made of four
intersecting planes. Better lighting on 2015 assets mostly reveals that they are
2015 assets.

A remaster that means anything at this point is asset work: denser meshes where
the silhouette matters, materials rebuilt so they respond to light that moves,
foliage that survives being stood next to. That is slow, unglamorous, and
exactly the kind of thing you can put a smaller team on while the big team is
elsewhere.

And it's free, which tells you something about what it's for.

## The chain

One detail from the trailer that I liked more than I expected: Geralt is using a
new chain-like weapon, and CD Projekt Red's level design lead Miles Tost said on
stage that it's a weapon from the intro of the studio's first Witcher game,
from 2007.

Nineteen years of continuity, cashed in as a prop.

That's the kind of thing a team does when it has been living inside the same
fiction long enough to have a memory of it — and it's the argument for keeping
the old pipeline alive that nobody makes in a shareholder call, because it
doesn't have a number attached.

---

*Details from CD Projekt Red's press centre and the Opening Night Live broadcast
of 25 August 2026. Songs of the Past is dated 2027 with no month; Remastered is
dated 29 September 2026.*
