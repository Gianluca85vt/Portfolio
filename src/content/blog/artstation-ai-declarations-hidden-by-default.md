---
title: "ArtStation AI declarations: hidden by default"
date: 2026-11-10
category: 3D
excerpt: "Publishing on ArtStation now means declaring generative AI use: primarily, mixed, or none. The browse filter hides declared AI work unless you ask for it."
cover: /img/blog/artstation-ai-declarations-hidden-by-default/cover.svg
sources:
  - outlet: ArtStation Magazine
    url: https://magazine.artstation.com/2026/11/more-transparency-and-control-for-generative-ai-on-artstation/
  - outlet: 80 Level
    url: https://80.lv/articles/artstation-adds-ai-declarations-default-ai-filtering-for-artwork/
  - outlet: Creative Bloq
    url: https://www.creativebloq.com/art/digital-art/artstation-is-finally-taking-action-against-ai-art-but-theres-one-question-it-doesnt-want-to-answer
artistView:
  take: "Three radio buttons on a publish form are being asked to describe a 2026 production pipeline, and the middle one is where almost all professional work sits. The design is honest about that, which is more than the binary everybody was demanding would have been, and it also means the label with the least information in it is the one most people will click."
  works:
    - "UI: offering mixed as a first-class option rather than a confession is the right call. A yes-or-no question about generative AI would have made liars out of people doing ordinary cleanup, and a label nobody can answer truthfully is worse than no label."
    - "Discovery: putting the filter on the viewer's side, defaulted to hide, settles the question the 2022 protest was actually about, which was whose feed gets buried. Artists were never asking for a tag. They were asking not to compete with volume."
  misses:
    - "Pipeline: the form asks a question the declaration cannot resolve. A neural denoiser on a render, a delight pass on a photoscan, an upscale, automated retopology — none of that is generative in the sense anyone means, and all of it is a model in the chain. Nothing published so far draws that line."
    - "Moderation: the suspected-AI strictness slider runs on user reports, and a clean render with no brush texture reads as generated to plenty of people who have never seen a render. 3D work is the category most likely to be reported by someone who is wrong, and no appeal route has been described."
draft: true
---

When you publish a project on ArtStation now, the form asks you a question about
how you made it. Three options: primarily generative AI, a mix of generative and
non-generative methods, or 100% non-generative. That is the whole mechanism on
the artist's side, and it went live this month alongside a much larger change on
the viewer's side.

ArtStation's own November post lays out the rest. Anyone browsing can report a
project they believe is unlabelled AI work. And the browse filter has been
rebuilt with defaults that matter more than the declaration does: out of the box
it hides projects declared as AI-generated, projects tagged `CreatedWithAI`, and
projects tagged with the names of generative AI tools, with the separate
"suspected as AI" control set to strict. A viewer can loosen all of it — allow
mixed workflows, dial the suspicion filter down — but has to go and do that
deliberately.

So the default state of the site, for a logged-in person scrolling, is now one
where declared generative work does not appear.

## Two flags, two different jobs

It is worth separating these, because the coverage keeps treating them as one
policy and they are not even aimed at the same problem.

NoAI is about training. It is a signal attached to your work saying it should not
be ingested to train a model, and it dates back to the December 2022 protest,
when thousands of portfolios turned into the same red placard and Epic — then
the owner — amended its FAQ and shipped the tag. In 2022 you had to go and set it
yourself, per project, which is a thing almost nobody does. Early this September
it became the default on new uploads and was applied retroactively across
existing projects and profiles, with Cloudflare bot management now blocking known
AI crawlers before they reach the page at all. That second half is the part with
teeth. A tag is a request. An edge rule is a refusal.

The declaration is about provenance, and it points the other way. It describes
what went into the work rather than what may be done with it later. A different
question, and a different enforcement model — self-reported, with a crowd-sourced appeal to suspicion
layered on top.

Both of these were on the list of things to watch [when KitBash bought ArtStation
and Sketchfab from Epic](/blog/kitbash-buys-artstation-and-sketchfab/) in August.
A company that had been publicly enthusiastic about putting AI through its
operations now owned the shop window of every artist who had spent 2022
protesting against exactly that. Three months later the answer is in: more
labelling, more viewer control, no ban.

## Mixed is where the work lives

Here is the problem with the middle button, and it is not a complaint about
ArtStation so much as a description of 2026.

Think about what sits in a normal environment or character pipeline right now.
The denoiser on your final render is a neural network — OptiX and OIDN have been
models for years, and nobody thinks of hitting render as using AI. Delighting a
photoscanned texture, so the baked-in sun comes out and you get albedo, is a
model. Automated retopology is a model. Upscaling a 2K texture you inherited from
a 2018 project is a model. Today's BlenderNation feed has an add-on bundle
shipping something called AI Mesh Fixer for repairing print geometry, which is a
mesh-repair tool with a model in it and a name chosen by marketing.

None of that is generative in the sense people mean when they argue about this.
All of it is a model in the chain. A pipeline has forty steps and the form has
three buttons, and nothing published so far says where the line falls.

Which means "mixed" will absorb everything from a denoise pass to a generated
concept somebody traced over. It is the honest answer for a huge number of
working artists and it carries almost no information for the person reading it.

## The incentive is pointing the wrong way

Now put the two halves together. Declared generative work is hidden by default.
Viewers can separately decide whether to let mixed through. Which means a
declaration is not only a statement about your process, it is a decision about
your reach — and the platform has not said how heavily the mixed bucket is
filtered in practice, or whether the people who leave the defaults alone are
seeing it.

A label that costs you views is a label people will fudge. That is the arithmetic
anyone applies to a portfolio that doubles as a job application. The artist who used a generated reference and painted over it from
scratch has a genuine case for "100% non-generative" on the file that shipped,
and every reason to make it.

The same gap showed up here this morning from the other end, when House House
[said LLMs touched well under 0.1% of Big Walk's
code](/blog/big-walk-ai-disclosure-igf-jury/) and had no written policy defining
what the number was counting. A figure with no definition behind it is a gesture.
A three-way radio button with no definition behind it is the same gesture, scaled
to several million portfolios.

What would make honesty cheap is a published taxonomy — this counts, this does
not — so that declaring "mixed" because you denoised a render does not put you in
the same bucket as a prompt output. That has not arrived.

## What it still does not do

AI-generated work is not banned. Creative Bloq put that question directly and got
an answer about the complexity of AI-assisted workflows and the risk of harming
artists in the process, which is a real consideration and leaves the question where it was.
ArtStation has said more changes to discovery are coming, and discovery is where
the 2022 argument actually lived — the protest was triggered by a homepage, not
by a tag.

Two things worth doing if your portfolio is there. Check what your projects now
say about themselves, because the declaration is new and retroactive defaults
have a way of surprising people. And check your filter settings as a viewer,
since the strict suspicion default is going to hide some human work, possibly
yours, from people who went looking for it.
