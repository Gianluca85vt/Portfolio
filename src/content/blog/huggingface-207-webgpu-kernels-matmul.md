---
title: "Hugging Face's WebGPU kernels: matmul gained 14%"
date: 2026-09-03
category: AI
excerpt: Hugging Face put 207 WGSL kernels on the Hub on 1 September. The geometric mean is 2.57x. Matmul, which dominates inference time, came in at 1.14x.
cover: /img/blog/huggingface-207-webgpu-kernels-matmul/shot-01.jpg
draft: true
---

Open one of the 207 repositories Hugging Face pushed to the Hub on 1 September
and you find something that looks less like a model than like a build target.
Take `ai.onnx.Add`. Inside it: a manifest declaring the operation's inputs,
outputs, attributes and type constraints. A metadata file recording where the
kernel came from. One file of correctness cases, another of benchmark cases. And
a Jinja template that expands into WGSL.

That last file is a compute shader. Same language a WebGPU renderer uses to
skin a mesh or build a light grid, doing a tensor add instead.

The library that fetches all this, `@huggingface/kernels`, is small on purpose.
You call `getKernel()` with a Hub repository ID and a version, hand it typed
tensor data, and it runs. Everything is Apache-2.0. The whole thing needs a
browser with WebGPU, and nothing else — no server, no native runtime, no CUDA.

## Shaders with a package manager

The part I keep turning over is the distribution model, because graphics has
never had it.

We ship shaders compiled into the binary, or baked into an engine-specific
asset, or generated at cook time by a material system nobody outside the studio
can read. There is no `npm install` for a well-tuned depth prepass. If somebody
writes a better parallel prefix sum than the one in your engine, the path from
their machine to your build goes through a fork, a merge, and a rebuild.

Hugging Face has just put 207 compute shaders behind a repository ID and a
version number, fetched at runtime, each one carrying its own tests and its own
benchmark cases. Whatever you think of the machine learning it exists to serve,
that is a piece of infrastructure the rest of us have been going without.

<figure>
  <button class="video-embed" data-video="SilGBAV4Lbw" data-title="AI at Scale with Nico Martin from Hugging Face | Transformers.js, Tokenizers, On-Device Inference" type="button">
    <img src="/img/blog/huggingface-207-webgpu-kernels-matmul/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from an interview with Nico Martin about on-device inference" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Nico Martin, one of the two authors credited on the release, on running models in the browser. The talk is from April 2026 and predates the kernel collection, so treat it as background on the runtime rather than coverage of this week's announcement.</figcaption>
</figure>

## The templates are there because WebGPU hides the hardware

A parameterised shader template is a familiar object to anyone who has shipped a
material. You do not author sixty variants; you author one and let the build
expand it across the switches that matter. Then you spend a week discovering how
many variants that produced.

The reason a kernel needs the same treatment is specific to WebGPU. The API is
deliberately portable, which means it refuses to expose the vendor intrinsics
that a CUDA or Metal programmer would reach for first — no warp shuffles you can
name, no vendor-specific memory hints. What is left to tune are workgroup sizes,
tile shapes, how much you unroll, how you stage through shared memory. Those are
exactly the things a Jinja template parameterises, and exactly what the
`bench.json` cases exist to search over.

And the same WGSL is going to be compiled by Metal on a Mac, D3D12 on a Windows
box, Vulkan on Linux, by three different shader compilers, on GPUs whose
occupancy characteristics have nothing in common. A tile size that is optimal on
an M4 can be actively bad on an Intel integrated part.

Which is why the release also ships Fleet, a browser page that collects
correctness and performance results from whoever runs it, across whatever
hardware they happen to have. Crowdsourced tuning data. Every studio that has
ever shipped a PC title recognises the problem it is solving.

## Reading the speedups honestly

The headline comparison is against ONNX Runtime WebGPU 1.30.0-dev on an Apple
M4: 2.57x faster by geometric mean, 1.90x by median, across 809 comparable test
cases.

Per operation, published in the same post:

- `Add` — 3.52x
- `LayerNormalization` — 2.22x
- `Softmax` — 2.11x
- `MatMul` — 1.14x

There are two outliers well outside that range. A bilinear Einsum came in around
10,000x, and a row-wise CumSum at 301x. Numbers that size do not describe a
faster kernel; they describe a baseline that had no real path for that case at
all and fell back to something miserable. Worth having. Not worth averaging.

Which brings me to the 1.14x. Matmul is where a transformer spends most of its
wall clock — the attention projections and the feed-forward blocks are matrix
multiplies, and everything else on that list is comparatively cheap glue between
them. A geometric mean over 809 test cases weights `Add` and `MatMul` the same.
Your actual model does not.

So the 2.57x and the 1.14x are both true, and they answer different questions.
Coverage across the long tail of operations improved a great deal. The hot path
improved by fourteen percent.

Fourteen percent on matmul is still a good afternoon's work. It is the single
most attacked kernel in computing; people have been grinding on it since before
WebGPU existed, and the remaining margin on a portable API with no vendor
intrinsics is thin. I would rather see 1.14x reported plainly next to a 3.52x
than see the two blended into one number and left there.

The tests and the benchmark cases sitting in every repository are what make that
checkable, which is a more useful thing to ship than any of the individual
speedups. You can disagree with a kernel's numbers by running its own bench file
on your own GPU and posting the result.
