---
title: Where AI actually fits in a 3D pipeline
date: 2026-07-28
category: AI
author: davide-ronchetti
excerpt: Not concept-to-final-render. The useful places are smaller, less glamorous, and they compound.
cover: /img/concept/xiu-colore.jpg
---

The demos promise a prompt in and a finished asset out. In practice that is the one thing
AI is worst at, because a finished asset is defined by constraints — topology, scale,
UVs, how it sits next to the twelve other assets already in the scene — and a model
generating in isolation knows none of them.

The places it does earn its keep are duller and far more useful.

## Exploring before committing

The expensive part of concept work is not drawing, it is choosing. Generating twenty
directions in the time one used to take does not make the choice for you, but it makes it
an informed one. You reject nineteen faster and you reject them for better reasons.

The output is almost never the deliverable. It is the argument for what the deliverable
should be.

## The technical middle of the pipeline

This is where it quietly pays. Writing a script to rename three hundred objects by a
convention. Reading an error you have never seen. Roughing out a tool that would have
taken an afternoon and now takes twenty minutes, so it actually gets built instead of
being worked around forever.

None of this shows up in a showreel. All of it is time back.

## The part that does not delegate

Taste. Whether the shot reads. Whether the silhouette is doing its job at the distance the
camera sits. Whether the material is convincing or merely detailed.

A model will happily produce something competent and characterless, and it will do it
quickly enough that the speed is tempting. The judgement about whether the result is
actually good is the job, and it stays with you. Anyone who hands that over ships work
that looks like everyone else's.

## How I work now

AI is in the loop from the first idea to the last frame, and it never makes a decision
unsupervised. I direct it the way I would direct a render: knowing what the result should
be before I start, and rejecting everything that is not it.
