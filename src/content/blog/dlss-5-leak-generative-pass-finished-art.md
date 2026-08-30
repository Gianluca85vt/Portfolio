---
title: "DLSS 5 leak: a generative pass over finished art"
date: 2026-08-30
category: 3D
excerpt: DLSS 5 leaked out of an NBA 2K27 build before release. Modders put it in Control and Skyrim, where it repaints finished art and halves frame rates.
cover: /img/blog/dlss-5-leak-generative-pass-finished-art/cover.svg
draft: true
---

The thing that leaked is a file. `nvngx_dlssnr.dll`, version 310.8.0.0 — DLSS
Neural Rendering, the piece of DLSS 5 that Nvidia announced back in March and
said would arrive in the autumn. It shipped inside the early access build of
**NBA 2K27**, a basketball game, because somebody packaged it there by mistake.
Dataminers had it around 26 August. Modders had it running in Control within
hours, then Skyrim, then a list that passed ten titles inside a few days and
took in several of Sony's PC ports along the way.

Nvidia decided none of that.

So it is worth being plain about what people are running: an unfinished library,
pulled out of a game that had no business carrying it, injected into engines
with no support for it, at settings nobody outside Nvidia fully understands.
Reports disagree on how unfinished. Most of the coverage treats it as a
pre-release drop; at least one write-up on the 29th argued the version number
looks more like a release build than an early one. That is unsettled, and it
changes how much weight the screenshots deserve.

## The pass sits at the end

Neural rendering runs late. The frame gets assembled, lit and graded, and then a
model looks at the result and hands back a different one. Everything a look-dev
artist does happens upstream of that.

It is a lot of upstream. Albedo values kept inside a range so they still read
once the grade lands on top of them. Roughness maps built to catch one key light
at one hour of the day. Silhouettes drawn to stay legible at fifty metres on a
1080p panel. A LUT that pulls certain colours out on purpose, because somebody
decided this world has no warm greens in it.

None of those decisions survive into the finished pixel as reasons. They survive
only as the pixel.

Which leaves a model with no way to tell a choice from a defect. Skin reads waxy
because the character is meant to look ill. Lighting goes flat because the scene
is a memory. Trained toward photographic plausibility, the pass reads all of
that as something to correct, and corrects it. Stylisation goes first every
time, since from the outside a style and a mistake look identical.

<figure>
  <button class="video-embed" data-video="5dTTfjBAFzc" data-title="DF Direct Q+A: The Big DLSS 5 ML Debate + Why We Should Have Waited With Our Coverage" type="button">
    <img src="/img/blog/dlss-5-leak-generative-pass-finished-art/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Digital Foundry's DLSS 5 Q&amp;A video" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Digital Foundry's Q+A from March, after the reveal coverage went badly. This is the debate video rather than their original preview, and it predates the leak by five months.</figcaption>
</figure>

## The sliders, and who gets to move them

"AI slop filter" stuck fast as a description, and the March reveal earned some of
it — the before-and-after reel Nvidia showed drew a week of memes about
yassified faces and got a shrug from the company, whose CEO said the people
complaining were completely wrong.

The build people have now is more considered than the meme suggests. There are
presets and styles, separate controls for skin structure and tone, and an
intensity slider for the neural pass itself. Someone thought about restraint.

That tuning is the part I keep turning over. Every other stage of a pipeline has
one person accountable for it, and a chain of review behind them. This one ends
on a stranger's desktop, where the person moving the slider has never seen the
art direction document and has no reason to care what the greens were for. A
studio ships a look. The slider gives it a second author.

Then the cost. Injected builds are reported losing something close to half their
frame rate depending on the game and the card — one player posted Control on an
RTX 5060 falling from 86fps to 32, which is one anecdote from one machine and
should be read as such. DLSS made its name buying frames back. This branch of it
spends them.

## What ships in the autumn

None of the above tells you much about the shipping product. A modded injection
into Skyrim is not a supported feature, and judging the released version by it
would be unfair in the same way judging a film by a workprint is unfair.

The question worth holding until then is who holds the switch. A per-title
feature a developer opts into, tuned by the people who authored the look, is one
product. A driver-level toggle a player applies to anything, at whatever
intensity, is a different one wearing the same name. Nvidia has not said clearly
which it is building, and the leak does not answer it either.

Digital Foundry, who previewed the tech in March and posted a positive breakdown
on the day, came back with a Q+A walking a good deal of it back — Richard
Leadbetter said they had gone straight from the demos into making the video and
had not done a good enough job. Alex Battaglia has since been the loudest
technical voice on the artistic-vision problem and called the ethical questions
serious ones. The team also reported receiving death threats over the original
coverage, which is worth naming and not worth dwelling on.

For anyone whose work is the look of a thing, this is the first time the last
stage of the pipeline has been up for grabs by someone outside it.

---

*Leak details, file name and version number from datamining coverage published
between 26 and 29 August 2026; the modded-game list and performance figures are
compiled from that reporting and from single-user posts, unverified. March
reveal, the CEO's remarks and Digital Foundry's follow-up from contemporaneous
coverage. Nvidia has not published a statement on the leak at the time of
writing, and DLSS 5's final feature set is unannounced.*
