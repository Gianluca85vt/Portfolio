---
title: One hand-prop, four texture sets — the interesting number in a Blade Runner-inspired breakdown
date: 2026-08-18
category: 3D
excerpt: Dragoslav Vugdelija's Tears in Rain project is a small sci-fi prop with metal, glass and plastic sculpted into believable wear. The number worth stealing isn't the sculpt — it's how many texture sets he spent on something you'd hold in one hand.
cover: /img/blog/tears-in-rain-sci-fi-prop-texture-sets/cover.svg
draft: true
---

80.lv ran a short piece today on a personal project called **Tears in Rain** —
the title lifted from Roy Batty's monologue, which tells you the reference
before you've even seen the render. Character artist **Dragoslav Vugdelija**
built a single sci-fi hand-prop, sculpted its surface damage and wear by hand,
and split it into metal, glass and plastic materials. The write-up is thin —
a paragraph, no walkthrough — so treat everything below as commentary on the
premise, not a review of the execution I haven't seen in full.

## The number that stopped me

**Four texture sets, for one prop.** Not a vehicle, not a weapon rig with
attachments — something sized to fit in a character's hand. That ratio is the
whole story.

Splitting UVs across multiple sets is a texel-density decision before it's
anything else. One 4K set spread across metal, glass and plastic means all
three materials fight for the same pixel budget, and grazing-light materials
like glass need more of that budget than they'd get in a fair split — glass
reads as glass largely through how cleanly its edge highlights and refraction
noise hold up close to camera, and a starved UV shell is where that falls
apart first. Four sets means each material gets its own resolution ceiling,
its own shader complexity if it needs one, and its own room for
hand-authored wear instead of a shared generator mask doing all the work at
once.

That's an expensive choice for something this small, and expensive-for-its-size
is usually the tell that an asset is meant to carry a story rather than sit
in the background. Environment art makes the opposite trade constantly — trim
sheets and shared atlases exist precisely because most of what fills a scene
can't afford a dedicated set. A prop that gets one anyway is being treated
like a hero asset, and that's a legitimate call when the whole point of the
piece is the prop.

## Wear is an authorship problem, not a shader problem

The other half of the write-up — hand-sculpted damage and wear across three
material types — is the part I'd actually want the full breakdown for. Wear
patterns are a readability problem before they're a technical one: a scratch
across a matte plastic housing reads as impact, the same scratch on polished
glass reads as scoring from something dragged across it, and getting both to
look like they happened to the *same object* at the *same time* is where a
lot of "damage generators" fall down. Procedural cavity and curvature masks
get you edge wear fast, but they don't know the object's history — they don't
know which scratch came first, or which surface would actually take the hit
in a fall. Hand-placing at least some of that is how a prop stops looking
generated and starts looking used.

There's a nice, unintentional echo here: the actual blaster built for the
1982 film was itself a practical kitbash, assembled from a Steyr Mannlicher
target rifle receiver and a Charter Arms Bulldog revolver frame, and aged by
the prop department to look like standard-issue hardware that had already
seen a career of use before the camera ever rolled. A digital hard-surface
prop chasing the same film's title is solving a version of the same problem
with a different toolset — sell the object's implied history through its
surface, not its silhouette.

## Why I'm flagging a paragraph-length post

Because the ratio — four sets on a hand-prop — is a more honest signal of
production intent than a finished render is. A render tells you the outcome;
a texture-set count tells you what the artist decided was worth the budget
before they knew if it would pay off. That's the kind of decision worth
noticing even from a thin write-up, and exactly the kind of number I'd want
in *my* breakdown if I built something at this scale.

*Everything above comes from 80.lv's brief coverage of the project — a single
paragraph, no linked case study I could open myself — plus my own read of
what a four-set split implies. The historical detail on the film prop's
construction is well documented separately and isn't from that write-up.*
