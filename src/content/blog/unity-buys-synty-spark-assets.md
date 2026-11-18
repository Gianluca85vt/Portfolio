---
title: "Unity bought Synty: 60,000 assets, one style"
date: 2026-11-18
category: 3D
excerpt: Unity now owns the POLYGON packs. Licences and pricing hold for now, and the whole library is headed into Unity Spark's closed beta.
cover: /img/blog/unity-buys-synty-spark-assets/video-thumb.jpg
sources:
  - outlet: GamesIndustry.biz
    url: https://www.gamesindustry.biz/unity-acquires-3d-asset-creator-synty-studios-artist-created-content-to-be-integrated-into-ai-game-creation-platform-unity-spark
  - outlet: PocketGamer.biz
    url: https://www.pocketgamer.biz/unity-acquires-synty-studios-to-bring-its-asset-library-to-unity-spark/
  - outlet: Unite.ai
    url: https://www.unite.ai/syntys-70-000-plus-3d-assets-will-feed-unity-sparks-closed-beta/
artistView:
  take: "Buying a library is a pipeline decision before it is a content one. What Synty has that an assembling machine wants is agreement: every pack in the range shares a scale, a shading model and a palette, which is the part of an asset store almost nobody gets right."
  works:
    - "Pipeline: a metre is a metre across the whole range, pivots sit where a modeller would put them, and the naming is regular enough to script against — which is why a fantasy pack and a city pack drop into one scene without a cleanup pass."
    - "Texturing: one shared palette atlas per pack keeps the draw calls down and turns recolouring a whole set into a texture swap, which is what makes this stuff viable on a phone and in a browser tab."
  misses:
    - "Art direction: flat shading and no normal maps hold up beautifully in a wide shot and show every seam once a camera gets within a few metres of a wall."
    - "Identity: the range is distinctive enough that a game built from it reads as a Synty game before it reads as yours, and a prompt-driven editor pulling from one library will make that more common."
---

Unity has bought Synty Studios. Announced yesterday, terms undisclosed, and the
headline number depends on which outlet you read: PocketGamer.biz and GameDev.net
put the catalogue above 60,000 assets, Unite.ai above 70,000. Nobody is publishing
a price. Most of the artists who built the POLYGON range are joining Unity full
time and carrying on making packs.

The destination is Unity Spark, which Unity announced on 7 October alongside
Google — a browser-based, prompt-driven editor wired to Google's Playground
platform and to the Unity Asset Store. Spark goes into closed beta later this
year, and Synty's library goes in with it. Unity's
[$50,000 fellowship for ten indie teams](/blog/unity-fellowship-50k-no-equity/)
arrived in the same week, which says something about where the company is
pointing its chequebook.

<figure>
  <button class="video-embed" data-video="IkcK7aeMw5A" data-title="Introducing Unity Spark | Prompt it. Perfect it. Publish it." type="button">
    <img src="/img/blog/unity-buys-synty-spark-assets/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Unity's Unity Spark announcement video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Unity's own announcement video for Spark, from the October reveal with Google. It is marketing rather than a demo of the editor at work, and it predates the Synty deal by six weeks.</figcaption>
</figure>

## Why a prompt editor goes shopping for art

Ask a machine for a street and the street is the easy half. The building it puts
on the corner has to live next to the car parked outside it — same scale, same
shading, same idea of how bright the world is. Generated meshes
do not come with that agreement built in. Neither does a storefront full of
assets from four hundred vendors, which is where the Asset Store has always sat:
a car boot sale of brilliant individual work at four hundred different texel
densities.

Synty's range is the opposite case, and it is close to unique at that size. The
packs were made to be mixed. That is the product. Someone building a prototype
can pull a dungeon set and a 1960s city set and a spy kit into one scene and the
join does not show, because the whole library was drawn to the same rules from
the start.

For a tool that assembles rather than invents, that is the expensive thing to
own. Unity's chief executive has been unusually blunt that Spark is not meant as
a one-shot game generator — prompting a machine to regurgitate a game somebody
already made does not make you the next Hideo Kojima, as he put it. Take him at
his word and the purchase follows: a tool that places art instead of dreaming it
needs a deep library that already speaks one language.

## The licence answers, and the one still missing

Unity has said the reassuring things, and said them promptly. Existing packs,
licences and workflows are unchanged. Pricing is unchanged "at this time". Free
assets, the Synty Store and the Synty Pass carry on as before. The packs stay
available for Unreal and Godot — for, in Unity's phrasing, the tools they support
today.

That last clause is an inventory statement with a roadmap-shaped hole in it. And
we have watched this film recently. Epic sold ArtStation and Sketchfab to KitBash
in August, where [the promises were also the reassuring kind](/blog/kitbash-buys-artstation-and-sketchfab/):
nothing changes today, in the present tense, about an indefinite future.

The question none of the coverage can answer yet is what a licence means once the
assets live inside a generative editor. If Spark drops a POLYGON building into a
scene because a prompt asked for a street, is that an ordinary seat-licence use
of an asset the user never bought? Does beta access carry asset rights with it?
Unity says the terms have not changed. They have not. They were also written for
a person dragging a prefab into a viewport.

Worth watching too: whether the Unreal and Godot releases keep pace. Synty's
packs have shipped for rival engines for years, a meaningful chunk of the
low-poly supply chain for everybody outside Unity. Nobody has to cancel anything
for it to quietly fall six months behind.
