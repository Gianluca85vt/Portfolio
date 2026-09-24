---
title: "Adobe buys Topaz Labs: the licence question"
date: 2026-09-24
category: AI
excerpt: Adobe closed its $340M Topaz Labs purchase on 23 September. Topaz keeps its own brand, and nothing was said about what the standalone apps will cost.
cover: /img/blog/adobe-topaz-labs-acquisition-licences/shot-01.jpg
draft: true
---

Adobe finished buying Topaz Labs on Wednesday 23 September. The agreement was
announced in late June and closed inside three months, at a figure reported
across the trade press as **$340 million**. Topaz keeps its own name, its apps
and models stay available on their own, and its upscaling already runs inside
Firefly and Photoshop. Topaz chief executive Eric Yang moves onto Adobe's
Digital Video and Audio team.

That is the announcement. The word missing from it is price.

## What Topaz is doing in a pipeline

If you have never used it, Topaz looks like a photographer's toy. It is not
shelved that way in a production environment. Gigapixel is what you reach for
when the only reference that exists for a prop is a 600-pixel catalogue scan
and you need something you can actually paint from. Topaz Photo cleans noise
out of texture source shot on a phone under bad light. Topaz Video is the one
that ends up on a render farm, taking a sequence out at half resolution and
bringing it back up, or rescuing an old plate nobody kept the negatives for.

None of that is glamorous work. It is the kind of thing that sits between two
other jobs, gets run in batch overnight, and nobody credits.

Which is exactly why the shape of the software mattered as much as the models
inside it. Topaz shipped as a binary that opened, did one job, and closed. No
creative-suite login, no asset manager wanting to sync, no per-seat entitlement
check before a background process could touch a frame. You could put it on a
machine that was not on the internet. Artists bought it for the upscaler and
kept it for the fact that it stayed out of the way.

## The licence question predates Adobe

It is worth being accurate about who changed what here, because the ownership
change gets blamed for a decision Topaz made on its own a year ago.

On 3 October 2025, Topaz stopped selling perpetual licences and launched Topaz
Studio as a subscription. The products were renamed at the same time — Gigapixel
AI, Photo AI and Video AI became Topaz Gigapixel, Topaz Photo and Topaz Video.
Before that, you paid once: $99 for Gigapixel, $199 for Photo AI, $299 for
Video AI. After it, Gigapixel ran $29 a month or $149 a year, Photo $39 a month
or $199 a year, and Video $299 a year, with Pro tiers at $499 and $599. All in
US dollars, all as of the change.

Existing perpetual licences were not revoked and Topaz has repeated that they
keep working. They stopped receiving new models, though, and in a field where
the model *is* the product, a frozen version is a slowly expiring one. The
company's stated reason for the switch was funding continued model development,
which is at least a coherent argument rather than a pretext.

So the subscription was already there when Adobe arrived. What Adobe brings is
a second layer of incentive on top of it. Adobe's interest in owning an
upscaler is keeping people inside Creative Cloud instead of exporting a
sequence, running it through something else, and coming back — and a standalone
app that works fine on its own is, from that angle, a leak rather than a
feature.

<figure>
  <button class="video-embed" data-video="Pfp-rc__WSo" data-title="Adobe Buys Topaz Labs &amp; Why I Unsubscribed | OP ED | Best Alternatives DXO, On1 &amp; More?" type="button">
    <img src="/img/blog/adobe-topaz-labs-acquisition-licences/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Matt Irwin's video on the Adobe and Topaz Labs deal" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Photographer Matt Irwin's op-ed on the acquisition, the subscription that preceded it, and the alternatives he moved to instead. A stills workflow rather than a 3D one, but the licensing argument is the same argument.</figcaption>
</figure>

## Standalone is doing a lot of work in that sentence

"Remains available as a standalone product" can mean several different things,
and the release does not say which one.

It can mean the installer stays on the site and the licence server stays up.
It can mean the app survives but new models land in Photoshop first and reach
Topaz Studio a version later. It can mean the app is maintained while the
subscription that unlocks it gets folded into a Creative Cloud plan at Adobe's
pricing rather than Topaz's. Every one of those is compatible with the wording
published on Wednesday.

For anyone running this on a farm the distinction is not academic. A node that
needs a Creative Cloud entitlement to process a frame is a different piece of
infrastructure from a node that needs a file on disk. That is a licensing
conversation, a firewall conversation, and in a facility with any security
posture at all, a procurement conversation.

The honest position today is that nobody outside Adobe knows. The close
announcement is a close announcement, and pricing decisions after an
acquisition tend to arrive at the next renewal cycle rather than in the press
release.

## The pattern artists already recognise

There is a well-worn response to this, and it has been building for years:
people buy the tool that cannot be taken away. ArmorPaint
[tagged 1.0 after eight years in early access](/blog/armorpaint-1-0-eight-years-six-build-targets/)
earlier this month, charging $19 for the binaries with the source free under
zlib, sitting opposite Substance 3D Painter's subscription. It is a thinner
tool than Adobe's. It is also one whose cost of going away is zero, and for a
lot of artists that has quietly become the deciding spec.

And the other half of that lesson arrived this month too. Zerply is
[going dark on 28 September after sixteen years](/blog/zerply-closing-export-your-work/),
taking a lot of VFX credit history with it, and the only people who kept
anything were the ones who exported in time. A service you rely on is not
yours. Neither is a model you rent.

Topaz earned its reputation honestly — the 2025 Emmy for its video technology
was for work that genuinely fixed footage other tools could not. The models are
good. That was never the worry. The worry is the same one artists have had
about every tool that gets absorbed: the thing keeps working right up until the
renewal terms change, and by then it is load-bearing.

If you are holding a perpetual Topaz licence, the sensible move this week is
unremarkable. Keep the installer. Keep the licence file somewhere that is not
one laptop. The software works, Adobe has said nothing to suggest otherwise,
and an archived installer costs you a few hundred megabytes against the chance
that a support page quietly changes in eighteen months.

---

*Close date, brand and integration details from Adobe's own announcement of 23
September 2026 as carried by PetaPixel, Forbes, TV Tech and Newsshooter; deal
value as reported, not confirmed in the release text seen here. Licence and
pricing history from the October 2025 Topaz Studio transition as covered by CG
Channel and Digital Production. Prices in US dollars, current to that change.
Adobe has announced no pricing change for the Topaz apps at the time of writing.*
