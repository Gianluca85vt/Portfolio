---
title: OpenAI ran the benchmarks on its own chip and came out up to 3.6x ahead on latency
date: 2026-08-26
category: AI
excerpt: Jalapeño's first silicon results landed on 25 August — three open-weight models, two Nvidia rack generations, and a benchmark platform that isn't MLPerf. The chip goes into OpenAI's own datacentres by the end of the year and nowhere else.
cover: /img/blog/openai-jalapeno-first-benchmarks/cover.svg
---

Three models, two rack generations, and the company that built the chip doing
the measuring.

On 25 August OpenAI published the first numbers from working Jalapeño silicon.
The tested models were GPT-OSS 120B, DeepSeek R1 and Kimi K2.5. Against Nvidia's
GB200 NVL72 and GB300 NVL72 racks, the claimed results were 1.5x to 1.9x more
work at peak, 1.7x to 3.6x lower end-to-end latency, and 2.1x to 4.1x on the
most interactive workloads — the ones where a person is sitting there waiting.
All figures as published on that date.

<figure>
  <button class="video-embed" data-video="0wdFzrDqBII" data-title="OpenAI Unveils First Custom AI Chip With Broadcom | Bloomberg Tech 6/24/2026" type="button">
    <img src="/img/blog/openai-jalapeno-first-benchmarks/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Bloomberg Tech's segment on OpenAI's first custom AI chip" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Bloomberg Tech's segment from the original June announcement, not this week's benchmark release — useful for the Broadcom side of the story. Nothing loads from YouTube until you press play.</figcaption>
</figure>

## The benchmark is not MLPerf

Jalapeño was measured on InferenceX, a public benchmarking platform from
SemiAnalysis that times the whole business of serving a request rather than a
single forward pass. That is a defensible choice — MLPerf's inference suite has
long been accused of measuring a shape of workload nobody actually ships, and
"time to first token, then tokens per second, under real concurrency" is closer
to what a serving stack does all day.

It is still not a neutral referee submitting a result. OpenAI picked the
platform, picked the comparison racks, and published the run.

Two caveats came out alongside the numbers and both matter. Speculative decoding
was excluded from the tests, which is a technique Nvidia's stack leans on hard
and which can move latency substantially. And the comparison racks are GB200 and
GB300 — silicon from 2024 and 2025. Nvidia's Vera Rubin platform is the thing
Jalapeño will be sharing a datacentre floor with, and it isn't in the chart.

One choice does read as fair. All three benchmarked models are open-weight, and
two of them are somebody else's. You cannot run GPT-5 on a Blackwell rack you
don't control, so if you want a cross-hardware comparison at all, open models
are the only honest way to get one. Using DeepSeek R1 and Kimi K2.5 rather than
three OpenAI checkpoints was the right call.

## Per watt is doing a lot of work in that sentence

OpenAI's own summary talks about getting more intelligence from every watt.
Reporting around the release says system-level power was not disclosed, which
would make the peak figure a throughput number rather than an efficiency one.

Those two things can both be true, and the gap between them is the whole
question. Chip-level power and rack-level power are different measurements, and
in an NVL72 the difference is enormous — the switch fabric, the HBM, the
optics and the cooling all draw real current, and a rack-scale interconnect is
precisely where Nvidia has spent its engineering. A part that wins on
joules-per-token at the die and loses at the rack is a completely ordinary
outcome in this industry.

Until someone publishes wall power for both configurations, treat the
efficiency claim as unresolved. The latency claim is the sturdier one.

## Nine months

The part I keep coming back to is the schedule. Jalapeño was announced on
24 June 2026, co-designed with Broadcom and fabricated by TSMC, and the reported
gap from initial design to tape out was **about nine months**. Working silicon
posting benchmarks two months after the announcement fits that timeline.

Nine months from design to tape out on a part this size is fast. Not
unprecedented for a fixed-function accelerator built by a team that has done it
before — which is exactly what Broadcom is, and why OpenAI went to them instead
of building a silicon organisation from scratch. You buy the schedule.

The schedule is the competitive move here, more than any multiplier in the
chart. Nvidia's moat is CUDA, the interconnect, and the fact that everyone's
stack already runs on it. OpenAI is the rare customer with no exposure to any of
that, because it only ever has to run one stack: its own.

## It will not be in your machine

OpenAI says Jalapeño starts going into its own compute infrastructure by the end
of 2026, and that it will keep deploying Nvidia and other accelerators
alongside. No external sale has been announced. So for anyone building things
for a living, this is a change to a rental price and a rental latency, not to
what sits under the desk.

Worth being clear about what that does and doesn't touch.

It could matter for the batch work a studio actually farms out to an API —
tagging a decade of asset libraries, generating variant naming, first-pass
descriptions for a store page, shader boilerplate. Those jobs are priced per
token and run overnight, and cheaper inference is cheaper inference. Interactive
latency matters too, in a narrower way: the assistant panel bolted into your DCC
is unusable at two seconds and fine at four hundred milliseconds, and that
difference is exactly what the 2.1x–4.1x figure is describing.

What it does not touch is everything that runs locally. The denoiser in your
render, the upscaler, diffusion for texture and material work, mesh and
segmentation tooling — all of that lives on the GPU in the box, on its VRAM,
and none of it gets faster because a datacentre in Texas got a new part.

And even in a world where OpenAI sold this thing, it would not be your chip.
A custom inference accelerator is shaped around transformer serving: enormous
matrix multiplies, KV cache traffic, memory bandwidth tuned to autoregressive
decode. Local creative AI is convolution-heavy, diffusion-shaped, latency-
tolerant and VRAM-starved. Different problem, different silicon. The general
GPU stays general for a reason, and it stays the thing artists buy.

What I'd watch for next is a price change. If custom silicon is doing what
OpenAI says it is, the place it shows up for the rest of us is the per-token
line on an invoice, some months from now. That is a number anybody can check.

---

*Benchmark figures as published by OpenAI on 25 August 2026 and relayed by CNBC,
TechCrunch and The New Stack; announcement date, Broadcom co-design and TSMC
fabrication from the 24 June 2026 announcement and Broadcom's own investor
release. The InferenceX platform and the speculative-decoding and power caveats
come via SemiAnalysis. OpenAI's own post could not be read directly from here,
so every figure above is as relayed by those outlets.*
