---
title: "Epic EULA to allow AI training on Unreal output"
date: 2026-10-28
category: 3D
excerpt: Tim Sweeney says Epic is removing the clause that blocks AI training on Unreal Engine and MetaHuman output. Which makes your renders training data.
cover: /img/blog/epic-eula-ai-training-unreal-output/shot-01.jpg
sources:
  - outlet: Game Developer
    url: https://www.gamedeveloper.com/programming/epic-is-updating-the-eula-to-allow-ai-training-on-outputs-from-unreal-engine-and-metahuman
  - outlet: TechPowerUp
    url: https://www.techpowerup.com/354186/epic-games-will-soon-train-ai-on-unreal-engine-outputs
  - outlet: Kotaku
    url: https://kotaku.com/now-that-the-shoe-is-on-the-other-foot-microsoft-and-epic-games-suddenly-agree-that-ai-is-theft-2000749316
artistView:
  take: "MetaHuman output is unusually good training material, and that is a compliment to the people who built it. Consistent topology, named animation curves, a rig that behaves the same way on every head — the qualities that make a character pipeline survive a production are the same qualities that make a clean dataset."
  works:
    - "Facial rig: the curve set is standardised across every MetaHuman, so a performance authored on one face retargets onto another without a technical artist in the loop. That portability is the tool's best engineering."
    - "Lookdev: skin, eyes and hair in recent Unreal footage hold up under moving light, which is where most real-time humans fall apart. The subsurface response does the heavy lifting."
  misses:
    - "Provenance: nothing in a MetaHuman asset records who performed the capture it was retargeted from. The format carries the motion and drops the person."
    - "Neck and shoulders: the faces have outrun the bodies under them, and in wide shots the join still reads as two separate pieces of work."
draft: true
---

On 27 October, in a reply on X, Tim Sweeney set out Epic's position on AI
training in about four lines. Does Epic restrict AI training on the outputs of
Unreal Engine and MetaHuman? Yes, currently — and Epic is working to remove
that restriction from the EULA.

That is the whole announcement. No change log entry, no blog post, no date.

The restriction being removed is not a technicality. Epic put express language
in the Unreal Engine EULA against using the licensed technology as a training
input or a prompt-based input into generative AI programs, and a separate
clause covering MetaHuman digital characters and animation curves. Somebody
drafted those on purpose. Now they are going.

<figure>
  <img src="/img/blog/epic-eula-ai-training-unreal-output/shot-02.jpg" loading="lazy" alt="A close-up of Senua's face in Senua's Saga: Hellblade II, rendered in Unreal Engine 5" />
  <figcaption>What "output" means in practice: Senua's Saga: Hellblade II, the best-known facial pipeline shipped on Unreal Engine 5 to date. Shots from the official Steam page. Ninja Theory has no part in the EULA story — this is what the clause is describing.</figcaption>
</figure>

## "Output" is doing a lot of work in that sentence

If you have never shipped anything in Unreal, the word sounds like exhaust.
Something the engine emits on its way to doing the real job.

The output of Unreal Engine is a Sequencer render of a level somebody lit. It is a lightmap bake that took four hours and three attempts.
It is a MetaHuman animation curve set, which is a recording of a face —
usually a real one, captured on a stage, retargeted onto a rig. It is the
beauty pass, the depth pass, the velocity buffers, the whole set of images a
diffusion model would most like to be fed.

In other words, an artist's output and the engine's output are the same file.
There is no version of "training on engine output" that does not mean training
on somebody's lookdev, somebody's animation, somebody's art direction. The
engine contributes the maths. The thing that makes one UE5 frame worth
learning from and another worthless is a person.

Which is why the clause existed in the first place.

## The developer choice, and who actually makes it

Sweeney's caveat is that individual games stay under the terms their
developers choose. Ship a game in Unreal, and whether AI may train on it is
your call.

True, and narrower than it reads. The person who sets a game's terms is
whoever signs the publishing agreement. It is not the environment artist who
spent nine months on the city, and it is not the contractor who did the
facial capture on a two-week booking. Studio-level consent has never been
artist-level consent, and the gap between the two is where every argument
about this is actually happening.

There is also the Fab question. Content other creators sell there follows the
NoAI tag each provider sets, per German-language coverage of the same remarks
— which puts marketplace assets on a different footing from engine output, and
is the one part of this with a mechanism attached.

## Removing a restriction is not the same as granting a right

Worth being careful here, because the EULA text does not exist yet and I am
reading a tweet.

A EULA restriction binds licensees. The clause as it stands does not only stop
Epic training on your renders — it stops everybody who accepted the agreement
from training on anybody's. Strike it, and the contractual bar comes off in
every direction at once. Copyright still applies to the assets themselves;
what goes away is the extra layer Epic had bolted on top.

So the headline reading — Epic is clearing the way to train on its licensees'
work — is plausible and not the only one available. The open question nobody
has answered is whether anything trained on that material stays inside Epic's
own models or gets licensed onward. Until the text is published, that is
unknown, and I would not guess at it.

What is on the record is Sweeney's legal framing. He cited the Anthropic
ruling, where the training itself was found to be fair use while the torrenting
of pirated books was not, and argued that whether an AI output infringes turns
on how similar it is to the work. That is a coherent position. It is also the
position Epic was arguing against two weeks ago.

## The Fortnite problem

Epic and Microsoft have been going after an AI-generated Fortnite clone,
on the grounds you would expect: that is our work, you fed it to a model, give
it back. Kotaku's framing — that the two companies discovered AI was theft the
moment the shoe was on the other foot — is unkind and hard to argue with.

This is in character. Epic [told its teams to go AI-first, with
no hand-written code and generated art](/blog/epic-ai-first-mandate-disney-shooter/)
earlier this month, and a company on that trajectory needs training data more
than it needs a clause protecting its licensees from the same thing. The EULA
was in the way. The EULA is being moved.

Then there is the method. A term governing the work of every artist on the
industry's dominant engine got reversed in a reply on a social network, with no
effective date and no published text. The blog has
already watched a licence do this once, when [the PS5 disc business turned out
to be a licence rather than a sale](/blog/ps5-discs-end-2028-license-not-ownership/)
and the terms moved without anyone being asked. A EULA is not a promise. It is
a document the other party can edit.

Go and read yours. Specifically, read what your contract says about derived
works and machine learning, because the engine's terms are no longer the
backstop they were in October.
