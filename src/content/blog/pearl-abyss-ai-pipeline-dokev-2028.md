---
title: Pearl Abyss expands the AI it apologised for
date: 2026-11-14
category: AI
excerpt: Pearl Abyss says AI now runs through its entire pipeline. In March it apologised for AI props shipping in Crimson Desert. Same assets, new policy.
cover: /img/blog/pearl-abyss-ai-pipeline-dokev-2028/shot-01.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/crimson-desert-ai-pipeline-dokev-2028
  - outlet: Shane the Gamer
    url: https://www.shanethegamer.com/news/pearl-abyss-ai-development-pipeline-crimson-desert/
  - outlet: Video Games Chronicle
    url: https://www.videogameschronicle.com/news/crimson-desert-developer-apologizes-for-accidental-inclusion-of-ai-art-promises-comprehensive-audit
artistView:
  take: "Both halves of this story are about the same shelf of assets — the 2D props that dress a world and that nobody schedules properly. AI is genuinely good at that shelf now, which is exactly why a generated placeholder is harder to catch than a grey box: it looks finished at the one stage where looking finished is the whole review."
  works:
    - "Pipeline: automating repetitive tagging and asset-sweep work is the least controversial thing on the list, and the thing every environment artist has lost weeks to."
    - "QA: test optimisation on a world this size is a traversal problem, and a machine that can re-walk a region overnight beats a human doing it on Friday afternoon."
  misses:
    - "Art direction: using AI to validate design concepts before implementation is the item to watch on DokeV, because generated concepts average toward the median and DokeV's only real asset is a look that resembles nothing else."
    - "Process: Pearl Abyss says core content creation stays with the team, but the props it apologised for in March were content creation. The line has not been drawn anywhere a reader can see it."
draft: true
---

2D props are the assets nobody defends. A painting on a tavern wall, a poster, the
cover of a book on a shelf, the pattern woven into a rug. In a world the size of
Crimson Desert's there are thousands of them. They are scheduled last, cut first,
and no reviewer has ever praised one.

They are also where Pearl Abyss got caught.

The studio shipped Crimson Desert in March 2026 with generative AI in some of those
props and nothing on its Steam page saying so. Players found them within days —
paintings, mostly, which is where the giveaways surface first, the same way the
[artefacts players photographed in Shogun 2's remaster](/blog/shogun-2-complete-edition-pulled-ai-art/)
pointed somewhere past upscaling. Pearl Abyss apologised. It said the props had been
made with experimental generative tools "as part of early-stage iteration", conceded
it "should have clearly disclosed" the use, promised a comprehensive audit of every
in-game asset, and added the Steam notice after the fact: generative AI used "in a
supplementary capacity during the creation of some 2D prop assets."

That was eight months ago. On 12 November 2026 the same company told investors it is
expanding AI, in the wording the coverage quotes from its third-quarter earnings
letter, "throughout our entire development pipeline."

## The four things it is reportedly for

<figure>
  <img src="/img/blog/pearl-abyss-ai-pipeline-dokev-2028/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Pearl Abyss, via the official Crimson Desert Steam page</figcaption>
</figure>

The letter names automation of repetitive tasks, support for content creation,
development productivity, and test and QA optimisation. Two of those I would sign
tomorrow. Nobody became an environment artist to hand-tag forty thousand assets, and
nobody wants to re-walk a region looking for a hole in the collision at six on a
Friday. If a machine sweeps the set and flags the twelve meshes with flipped normals,
that is time back for work that shows.

"Content creation support" is the one with no edges. It is also the category the March
props fell into, and the letter does not come back to it.

Pearl Abyss also said — and this is the sentence the company clearly wants quoted —
that it views AI "not as a substitute for human developers, but as a tool to elevate
development efficiency and quality," and that on DokeV "the core gameplay experience
and actual content creation remain fully driven by our development team."

Read that against March. The things that shipped were 2D props: made, placed, lit,
and present in the retail build. If that was not content creation, somebody has a
definition of content that excludes a painting on a wall, and artists would like to
see it written down.

## Why a generated placeholder is worse than a grey box

March left a practical question behind for anyone who runs a pipeline.

The studio's explanation was that the props were early-stage iteration never meant to
survive. That is a completely ordinary failure, and placeholder art has been shipping in games
for thirty years. Half the props in any open world started
life as something temporary that nobody got back to.

But a grey box announces itself. So does a programmer-art checkerboard, a texture
reading PLACEHOLDER in 72pt, a sculpt with the subdivision still off. They are loud on
purpose, because the only reliable gate on a 2D prop at that stage is somebody's eye
passing over it in a review, and loud is what survives that gate.

A generated painting is quiet. It has composition, a palette, brush texture, a frame.
It reads as *done* at a glance, from three metres, in engine, under the lighting it
will ship under — which is the only distance and the only lighting most props ever get
looked at. It passes the eye test precisely because the eye test is all there is. The
artefacts that give it away live in the places nobody inspects on a prop: the hands in
the background figures, the text on the spine, a perspective that does not resolve.

And then a player walks up to the wall. That is the thing an open world does. You give
somebody a camera and twelve hours and they will put their face against every surface
you built, which is how three thousand decorative paintings became a news story.

So "strengthening internal processes", which is what the March statement promised,
means something quite specific here. It means a flag that travels with the asset, from
whatever generated it through to the build, loud enough to fail a review that a human
eye will otherwise pass. That is a tooling job. Nothing published since says it was
done, or whether the audit finished.

## DokeV, and the one use I would argue with

The letter's other news is a date. DokeV is targeted for the second half of 2028, with
public demos from late 2027, and Pearl Abyss has moved its main development weight off
Crimson Desert and onto it.

DokeV has been shown publicly for years — a cinematic reveal in 2019, then the
gamescom gameplay trailer in 2021 that went round the internet largely on the strength
of looking like nothing else. Creature collecting, skating, K-pop, a colour palette
that belonged to no other open world. People remembered it for the look.

On that game, per the coverage, AI is being used to "rapidly validate diverse design
concepts prior to actual implementation."

Concept validation. I understand the appeal — concepting is slow, most of it gets
thrown away, and a producer looking at a schedule sees waste. The problem is what
generated concepts are made of. They are an average of everything the model saw, and
averages pull toward the middle. A human concept artist's bad idea is specific and
wrong in an interesting direction; you can see where they were going and chase it. A
model's bad idea is the median of its training set, and it arrives looking competent,
which makes it much harder to throw away.

For most games that is a tolerable trade. For a game whose entire proposition is that
it does not look like anything else, running the look through an averaging machine
before implementation is the one place on that four-item list I would push back on.
Which is roughly the shape of the argument when
[Epic told its team to build a game with AI instead of hand-written code](/blog/epic-ai-first-mandate-disney-shooter/) —
the code half is a productivity question, and the art half is a different question
wearing the same word.

## Where it stands

Confirmed: the third-quarter letter was published on 12 November 2026; DokeV is
targeted at the second half of 2028 with demos from late 2027; Crimson Desert launched
in March 2026 and carries a Steam disclosure covering some 2D prop assets, added after
release.

Not confirmed: the exact wording of the letter against the letter itself, since the
quotes here come from coverage of it rather than a document I could open; whether the
comprehensive asset audit announced in March has concluded; and how much of any
Pearl Abyss game is now touched by the four uses, which the letter does not quantify.

Eight months is long enough to have replaced three thousand paintings. It would be an
easy thing to announce.
