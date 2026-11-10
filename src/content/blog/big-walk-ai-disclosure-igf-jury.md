---
title: "Big Walk AI disclosure: 0.1% of code, no policy"
date: 2026-11-10
category: AI
excerpt: House House says LLMs touched well under 0.1% of Big Walk's code, after 19 IGF jurors said they will not vote for any game that used generative AI.
cover: /img/blog/big-walk-ai-disclosure-igf-jury/shot-01.jpg
sources:
  - outlet: VGC
    url: https://www.videogameschronicle.com/news/big-walk-studio-says-it-used-ai-sparingly-in-response-to-indie-award-jury-statement-against-its-use/
  - outlet: Aftermath
    url: https://aftermath.site/big-walk-ai-igf-jurors-controversy/
artistView:
  take: "The admitted use sits in code, during the last weeks of a four-year project, where it leaves no trace in a shipped frame. That is also why it is the hardest kind of use to have a rule about, and House House says it shipped without one."
  works:
    - "Pipeline: under 0.1% of the code is a figure a studio can reconstruct from its own commit history, which is more than almost any disclosure in this industry offers. It is self-reported and nobody outside can check it, but it is at least checkable in principle."
    - "Art direction: the disclosure claims no generative AI anywhere else in the game, and Big Walk's flat-shaded, hand-placed look is consistent with that. Nothing in the frame reads as filled in by a model."
  misses:
    - "Policy: a studio that reaches the final stretch without an AI usage policy has handed the decision to whoever is awake at two in the morning fixing a build. House House calls the absence a failure. It is the right word."
    - "Timing: the disclosure arrived after the jury statement rather than in the release notes in August, which turns a few hundred lines of code into a week of headlines."
draft: true
---

Nineteen jurors for the Independent Games Festival signed a statement on Monday
saying they will decline to vote for any game that uses generative AI in any
capacity. The statement describes the discussion behind it as fairly intense
disagreement across the judge and jury pools. It does not name a game.

A day later, House House published a disclosure. The Melbourne studio behind
Untitled Goose Game, and behind **Big Walk** since August, said LLMs were used
sparingly to work through difficult technical problems and bugs, and that well
under 0.1% of Big Walk's code had anything to do with that use. No generative
AI in any other context. The studio apologised, said the disclosure is not an
endorsement or an argument for using these tools, and added that Big Walk was
made without an internal AI usage policy — which it called a failure.

Forum threads have tied the jury statement to a specific undisclosed use on a
specific game. Nobody has confirmed that, the statement itself points at no
title, and I am leaving it alone.

## What 0.1% of a codebase is

Big Walk is a co-op game shipped on PC, Mac, PS5 and Switch 2 on 4 August 2026,
$19.99, published by Panic, four and a half years after its reveal. A project
that size runs into the hundreds of thousands of lines once you count tools,
build scripts and editor code. Under 0.1% of that is a few hundred lines. A day of
work, maybe two. If the work was debugging, as the studio says, some of those lines are a model
suggesting what a stack trace meant and a person then writing the fix by hand,
which never shows up as generated code at all.

It is a number a studio can actually go and check. Open the commit log for the
last weeks, read what landed, count it. That is rare. Whether it is the right
number I cannot
tell you, and neither can anyone outside House House. A self-reported figure is
still better than the usual formulation, which is a spokesperson saying the
tools were used responsibly and declining to say where.

## The last weeks are where the line moves

Everyone who has shipped something knows the shape of that period. A shader
that compiles on three platforms and fails on the fourth. An importer choking
on a mesh that was fine last week. An engine version you cannot roll back
because QA has already signed off on a build that depends on it. Nobody makes
considered pipeline decisions in that window. You stop the bleeding. That is the
whole brief.

And this is where the distinction artists keep drawing gets awkward. A model
generating a texture produces something that lands in the frame, ships to the
player, and carries its provenance with it forever. A model reading an error
log produces a hypothesis you test and discard. From my desk those are not the
same act, and pretending otherwise costs the argument its edge.

But the blanket version of the rule exists for a reason, and the reason is that
studios kept moving the line on their own. Sega pulled the Shogun 2 remaster
two days after launch when players photographed artefacts that
[pointed past upscaling](/blog/shogun-2-complete-edition-pulled-ai-art/). That
was art, shipped, in the product people paid for. Once a few of those land, "in
any capacity" stops looking like an overreach and starts looking like the only
line that cannot be negotiated down a sprint at a time.

## The sentence worth taking away

Of everything in the House House statement, the admission that there was no
internal policy is the part that applies to anyone else making things.

A policy is not a press release. It is the document that answers a question
before the question is urgent: can a programmer paste a crash log into a chat
window, can a tech artist ask a model to write a Python snippet for a batch
rename, can anyone type a prompt into a texture tool. Decide that in month
three and the answer holds at 2am in month fifty. Decide it at 2am and you get
whatever the tired person decided.

Saber had an answer on Space Marine 3, and the answer was absolutely none —
[because Games Workshop required it](/blog/space-marine-3-no-generative-ai-games-workshop/).
That same studio had used generative tools on a small project of its own. The
rule came from the licence holder, from outside, written down in advance. House
House is a studio of a handful of people with no licensor standing over it, and
it discovered what its rule was after the game was out.

## The disclosure trap, stated honestly

The other thing in the statement is harder than it looks. House House said it
has some concern that voluntary disclosures like this one might help normalise
the technology.

That is a real bind. I have no clean way out of it either. Say nothing about a
few hundred lines of debugging and it passes unremarked, which is how the
practice spreads. Say something and the fact goes into headlines, gets
flattened to "studio used AI", and sits next to cases where a model painted the
backgrounds. There is no agreed unit of measurement here — no category
for debugging help that distinguishes it from asset generation, and no standard
form for saying so. Until it has one, every studio that volunteers a number is
choosing to be the example.

---

*Statement details, the juror count and the 0.1% figure as reported by VGC and
Aftermath on 9 and 10 November 2026. Big Walk's platforms, price, publisher and
4 August 2026 release date from the launch press release carried on Game
Developer. The jury statement names no game; claims circulating about which
title prompted it are unconfirmed.*
