---
title: "Nvidia buys Hugging Face: $12.9B for the models"
date: 2026-09-03
category: AI
cover: /img/blog/nvidia-buys-hugging-face-12-9-billion/shot-01.jpg
excerpt: Nvidia confirmed the $12.93 billion deal on 3 September. The models your local tools fetch on install now come from a repository the chip vendor owns.
draft: true
---

Install a ComfyUI custom node and watch the terminal. Somewhere in the wall of
text a progress bar appears, a few gigabytes crawl in, and the thing you wanted
starts working. That download almost always came from Hugging Face. Depth
estimators, segmentation models, upscalers, the LoRA someone trained on their
own material and put up for free — the fetch is usually a call to
`huggingface_hub`, buried three dependencies deep in a package nobody reads.

Nvidia confirmed on **3 September 2026** that it is buying the company that
runs it, for $12.93 billion.

## The terms

Roughly $11.9 billion goes to Hugging Face's investors. The remainder is an
equity retention programme worth up to $1 billion, paid out to employees who
stay through the move. The deal needs regulatory clearance and is expected to
close in the first half of 2027, so nothing about the platform changes tomorrow.

It is the second largest acquisition in Nvidia's history. The largest was
December's $20 billion purchase of assets from Groq.

The multiple is worth sitting with. Hugging Face raised something in the region
of $400 million across its life, and its last round in 2023 valued it at $4.5
billion. Just under three times that, three years later. Reporting from late
August put the figure nearer $14 billion before it settled where it did, and
Hugging Face's Clement Delangue has said his side made the approach — that
Nvidia was, in his words, a perfect home. There were other bidders.

<figure>
  <button class="video-embed" data-video="23woqEStrbs" data-title="Hugging Face Always Attracts Buyers, Co-Founder Says" type="button">
    <img src="/img/blog/nvidia-buys-hugging-face-12-9-billion/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a Hugging Face co-founder interview about the acquisition" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>A Hugging Face co-founder on why the company was always going to attract buyers. Useful for the framing from their side; the numbers below come from the announcement itself.</figcaption>
</figure>

## What is actually being bought

Three million models. Half a million datasets. A million apps, and somewhere
above eighteen million developers pulling from them, with more than 200,000
companies using what comes down.

Those numbers get quoted as if they measure a community, and they do, partly.
They also measure a distribution network. GitHub is the comparison everyone
reaches for and it is roughly right, except that git repositories are text and
these are multi-gigabyte weight files that need mirroring, versioning and a CDN
that can survive a Friday when a good model drops. Building that is expensive
and boring. Owning it, once built, is a position.

Jensen Huang's commitment, made in a blog post and repeated on CNBC the same
morning, is that Hugging Face stays an open platform for the whole ecosystem —
developers keep choosing their own models, frameworks, clouds, inference
providers and compute. Nobody gets obliged onto Nvidia hardware.

I have no particular reason to doubt he means it. Nvidia already contributes
more than 500 models and 250 open datasets to the platform, which is not the
behaviour of a company that wants to wall it off. And a hostile Hugging Face is
worth far less than a friendly one; the value here is the eighteen million
people, and they leave.

## The thing to watch is Optimum

Promises about neutrality are hard to audit. Maintenance is not.

Hugging Face ships a set of libraries called Optimum, which is the glue between
a model on the hub and the silicon underneath it. There is a path for Nvidia's
TensorRT-LLM. There are also paths for AMD, for Intel, and for AWS's own
accelerators. That is the part of the stack where hardware neutrality either
exists or quietly stops existing, and it does so in commit logs rather than
press releases.

Nobody has to decide to abandon a backend. It just gets a slower response on
issues. Then it lags a release. Then the install instructions grow a paragraph
about known limitations. Two years later everyone has drifted to the path that
works, and no announcement was ever made.

For an artist this is not abstract. If you are running local diffusion or a
denoiser on a Radeon, the ROCm route through Optimum is what keeps your
workstation viable, and the same goes for OpenVINO on Intel. The reason to care
about the ownership of a model repository is that it sits upstream of whether
your next GPU purchase is a real choice.

Analysts have landed on both sides of this. The optimistic read is that open
weights just acquired a very rich patron with an obvious interest in more
people running more models. The pessimistic one is that a neutral marketplace
becomes a channel. Both can be true for a while.

## The bit that keeps nagging

Nvidia sells the compute. It now owns the shelf the models sit on, and it has
spent the last two years buying its way through the layers above the chip.

There is a version of this where nothing bad happens, the CDN gets faster,
open weights get better funded, and the AMD path keeps working because letting
it rot would cost more in reputation than it saves. That version is plausible.

It is also entirely dependent on a company continuing to want something it
currently wants. Which is a thin thing for a whole ecosystem to rest on, and
the reason it is worth writing the date down: **3 September 2026**, the day the
open-weight commons got a landlord.

Nothing to do about it today. Keep an eye on those commit logs.
