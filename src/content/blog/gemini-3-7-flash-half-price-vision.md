---
title: Gemini 3.7 Flash halves the price of looking at everything
date: 2026-08-14
category: AI
author: davide-ronchetti
cover: /img/blog/gemini-3-7-flash-half-price-vision/cover.svg
excerpt: A 1M-token, image-and-video-reading model at half its old price, three weeks after the last one. The interesting part isn't the benchmark chart, it's what becomes worth automating once looking at something stops being expensive.
---

Google DeepMind shipped **Gemini 3.7 Flash** on 13 August, three weeks after 3.6 Flash. The
model card is upfront about what changed: this is not a new pretraining run. It is the same
base model as 3.6, with algorithmic improvements bolted onto its reasoning, and the gains
concentrate hard in three places — software engineering, document-heavy work, and web
development.

Three weeks between releases, on the same base model. That cadence is the actual story more
than any single benchmark in it.

## What it is

Text, images, audio and video go in, up to a **1-million-token context window**, with up to
**64K tokens** of output and adjustable thinking budgets so you can trade quality against
cost and latency per call. Knowledge cutoff is still March 2026, because nothing was
retrained.

And it is cheap. **$0.75 per million input tokens, $3.75 per million output**, introductory
pricing that holds until 31 December 2026 before reverting to $1.50 / $7.50. That is half
of 3.6 Flash's list price, for a model Google says beats it on coding and document
benchmarks. On paper you get more for less, twice this year already.

Google's own numbers put the coding gains at FrontierCode 43.6% versus 34.4%, and DeepSWE
65.3% versus 48.6%, over 3.6 Flash — figures that come from Google's model card, so treat
them the way you'd treat any vendor's own benchmark, useful as a direction, not gospel.

## Why a technical artist should care about the price, not the score

I do not write shaders with Gemini and I am not about to start grading it on a coding
leaderboard. What changes for me is the second half of that context window: **video and
image input, at a price where you can point it at a folder instead of a single frame.**

A 1M-token multimodal model that used to cost real money per call is now cheap enough to run
across a batch. That is the threshold that decides whether an idea like "have something scan
every turntable render in the library and flag the ones with visible UV seams or texture
stretching" stays a nice idea or actually gets built. Below a certain cost per call, nobody
scripts it. Above it, everything does.

Same logic applies to documentation. Engine changelogs, USD schema references, render
pipeline specs — the kind of document you used to read in chunks because nothing held the
whole thing in context at once — now fit in one pass, cheaply enough to do it more than once
when the doc updates.

None of this replaces the eye. Whether a silhouette reads, whether a material looks
convincing rather than merely correct, is still not a thing you hand off — I said as much
[writing about where AI actually earns its keep in a pipeline](/blog/ai-in-a-3d-pipeline/).
What a cheaper, faster Flash model changes is the boring first pass: the sorting, flagging
and triaging that used to be too tedious to do by hand and too expensive to automate, and now
is neither.

## The part worth watching

Three weeks between model releases, on the same base, is a pace that used to be reserved for
point patches. If DeepMind keeps shipping algorithmic refinements on this rhythm, the
interesting metric stops being "what can the frontier model do" and becomes "how cheap is
last month's frontier by the time I actually build something on it." For anyone budgeting a
pipeline tool around an API call, that second number is the one that matters.

Sources: [Google's announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/),
the [model card](https://deepmind.google/models/model-cards/gemini-3-7-flash/), and pricing
as reported by [VentureBeat](https://venturebeat.com/technology/googles-gemini-3-7-flash-targets-coding-and-agents-with-a-50-introductory-price-cut)
and [MarkTechPost](https://www.marktechpost.com/2026/08/13/google-ai-just-released-gemini-3-7-flash/).
