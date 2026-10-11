---
title: "WoW Forever classic models: the rig is the cost"
date: 2026-10-11
category: 3D
excerpt: Blizzard added an SD/HD character toggle after beta pushback. Two mesh sets on one skeleton is cheap; the proportion complaints show where that lands.
cover: /img/blog/wow-forever-classic-models-rig/video-thumb.jpg
sources:
  - outlet: 80 Level
    url: https://80.lv/articles/world-of-warcraft-forever-almost-launched-without-classic-models/
  - outlet: GameSpot
    url: https://www.gamespot.com/articles/wow-forever-players-love-it-when-things-look-old/
artistView:
  take: "Judging from the gameplay trailer and what beta testers report rather than from a login: a per-character mesh toggle is only affordable if both mesh sets bind to one skeleton, and the proportion complaints coming out of the beta are what that compromise looks like from outside the studio."
  works:
    - "Pipeline: one skeleton for both model sets means one animation library, one set of weapon and shoulder attachment points, and one gear-fitting pass. It is the version of this feature that ships on a date."
    - "Art direction: restoring the original character-creation portraits was the cheapest win on the board, because those are 2D plates and nothing downstream had to be refitted to take them."
  misses:
    - "Character modelling: an older mesh re-weighted onto a newer skeleton inherits the newer bone lengths and pivot placements, so the silhouette drifts even where the texture is exactly right. The Night Elf chest-and-shoulder complaints are that drift being noticed."
    - "Scope: Skyborne arriving with no SD option, and its SD models reported for early 2027, says the toggle is a retrofit rather than a rule the character pipeline was built around from the start."
draft: true
---

A skeleton is not a skin. That sentence is the whole argument about World of
Warcraft: Forever's character models, and it is worth unpacking before the
launch on 4 November, because the thing players are asking Blizzard for and the
thing Blizzard has shipped are different objects with very different costs.

Start with what happened. Forever is Blizzard's answer to the Classic+ question,
revealed at BlizzCon 2026, with a beta that ran from 17 September to 21 October.
Early builds showed the modern high-definition character models, and testers
pushed back hard — 80 Level's account has beta regulars, Savix among them,
making the case that an original-model option was not a nice extra. Blizzard
moved. The character-creation portraits went back to the originals, and a toggle
between SD and HD models went in.

Then the complaints changed shape. They stopped being "where are the old models"
and became "these are not quite the old models", which is the more interesting
problem.

<figure>
  <button class="video-embed" data-video="uQuKE0KDgiM" data-title="World of Warcraft: Forever - Gameplay Trailer" type="button">
    <img src="/img/blog/wow-forever-classic-models-rig/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Blizzard's World of Warcraft: Forever gameplay trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Blizzard's Forever gameplay trailer, about three minutes, posted to the World of Warcraft channel on 12 September 2026. It is the publisher's own footage, so read it as a showcase rather than evidence.</figcaption>
</figure>

## What a toggle actually asks for

Picture the feature request as a technical artist would receive it. Every
character in the game can be drawn with either of two body meshes, switchable,
per player, at any moment. Now price it.

If the two meshes share a skeleton, the bill is small. One animation library
covers both. Weapons hang off the same hand bones. Shoulder pads, helmets and
cloaks keep their single set of attachment points. Your skinning work is one
re-weight pass per mesh and you are done.

If the two meshes carry their own skeletons, almost nothing is shared. Two
animation sets, authored and maintained in parallel, including every emote
anybody has ever added in twenty years. Two sets of attachment transforms.
And the part that kills it: gear. WoW armour is modelled geometry conformed to
a specific body — shoulders, helms, belts and boots are built against a torso
and then fitted to it, so a second body means a second fit for every one of
them. Thousands of items,
each needing an art pass that produces no new content a player can see.

Nobody ships that for a toggle. So the toggle you get is the first version, and
beta testers describe exactly that: older meshes and textures riding the retail
skeleton. Worth saying plainly that this part is player reporting from forum
threads rather than anything Blizzard has published, and the accounts disagree
among themselves — one says the idle animations are straight from retail, another
that the run and the auto-attack are the only classic-derived animations left.
Blizzard has not laid out the construction, and until it does, the mechanism is
inference from what people are seeing on screen.

But the inference fits the complaints unusually well. Look at the Night Elf
thread: broad chest, thin shoulders. That is a rigging complaint in a texture
complaint's clothes. Bind a mesh authored against one bone hierarchy to another
whose clavicles sit further out and whose spine segments run longer, and the
shape has to change. The vertices follow the bones. The silhouette moves a
few centimetres, in world units nobody wrote down, and twenty years of muscle
memory notices immediately.

## Remembering is not restoring

The most honest thing to come out of the beta is a stated aim, relayed through
those same threads: the goal was not to replicate Classic but to build a version
of what people remember Classic looking like. Which is why the animations, the
lighting, the fog and the water are all altered rather than reproduced.

That is a defensible brief. It is also the opposite of the one a restoration
takes, and the gap between the two is where the arguments live. When HIDIVE put
a [4K scan of Ninja Scroll's original negative](/blog/ninja-scroll-4k-restoration-cels)
into cinemas, what the audience got was the dust, the paint texture and the cel
edges — the film as it was photographed, not as it is remembered. Memory
smooths. Scans do not. Blizzard has picked memory, deliberately, and will
therefore keep hearing from the people whose memory differs.

The Skyborne situation is the clearest tell about where this sits in the
pipeline. The new race, sold with the Skyborne Heroic Pack and above, arrives
with no SD model at all, and the SD version is reported for early 2027. A race
designed after the toggle existed still did not get both bodies at launch. That
is the cost of the second mesh showing up in a schedule, in public.

None of which makes Forever a worse client than the alternative. Blizzard is now
maintaining three live versions of the same game, and the engineering question
underneath that — what can actually be shared between them — is the same one
Jagex is facing from the other end, where
[the untested part of RuneScape 4 is the MMO, not the engine](/blog/runescape-4-unreal-engine-mmo).
Shared systems are what make a third client affordable. A shared skeleton is one
of them, and the players who want the 2004 silhouette back are, without using
the word, asking for the one piece that was never going to be cheap.
