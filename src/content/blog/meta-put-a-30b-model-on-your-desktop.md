---
title: Meta just put a 30B model on a desktop GPU, and gave it away
date: 2026-08-11
category: Tech
author: piero-lanzoni
cover: /img/blog/covers/local-llm-30b.svg
excerpt: Muse Glimmer runs offline on one consumer card, the weights are Apache 2.0, and nothing you type leaves your machine. That last part matters more than the benchmarks.
---

On 10 August, Meta Superintelligence Labs released **Muse Glimmer**: a 30-billion-parameter
model built for local agent work, with the weights open-sourced under **Apache 2.0**.

That licence is the headline, not the size. Apache 2.0 means you can use it commercially,
modify it, and ship things built on it, without asking anyone.

## The trick is compression

A 30B model at full precision needs over **55GB of memory**. No consumer GPU on earth has
that. So it would normally be a data-centre-only thing.

Meta squeezed the weights down to roughly **4-bit precision**, which drops the language
model to **under 20GB**. That leaves enough headroom in a 24GB or 32GB card for the KV
cache, the image encoder and the speculative decoding drafter to all sit alongside it.

Translation: if you own a card with 24GB of VRAM, you can run this. On a Mac too.

## What it is actually built for

This is not a chatbot. Meta aimed it squarely at the boring, useful stuff:

- function calling
- local coding
- long tool-use sessions, the kind agents actually need
- LLM-as-a-judge evaluation

In other words, the jobs where you want a model that works reliably for hours, not one that
writes you a nice paragraph.

The weights are on Hugging Face now. Optimised integrations for **llama.cpp, MLX and
ExecuTorch** are landing over the following days, which is what will make it genuinely easy
to run rather than merely possible.

## Why I care, and why you might

Here is the bit that made me stop and read twice: **it works with or without an internet
connection.**

If you work with client material under NDA — and if you do 3D for anyone serious, you do —
every cloud AI tool is a conversation with legal waiting to happen. Where does the prompt
go. Who stores it. For how long. Is the concept art I just described now training data.

A model running on your own GPU, offline, sidesteps all of it. The scene description never
leaves the room. There is no subscription that can change its terms next quarter, no
service that can deprecate the endpoint you built a workflow around.

There is an obvious irony in the timing, mind you. The same AI boom that makes this model
useful on a desktop card is the reason [that desktop card now costs a
fortune](/blog/why-gpus-cost-so-much-right-now/).

Still. Open weights, permissive licence, runs on hardware you already own. That is a good
week.
