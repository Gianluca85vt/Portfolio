---
title: LinkedIn's AI slop button can't tell a render from AI
date: 2026-08-23
category: AI
excerpt: A "Seems like AI slop" button has been clicked over a million times since July, and LinkedIn says it's already suppressing reach by 40%.
cover: /img/blog/linkedin-ai-slop-button-portfolio-work/cover.svg
---

LinkedIn shipped a "Seems like AI slop" button on 30 July, tucked into the three-dot menu
on every post. Chief product officer Hari Srinivasan posted an update this week: **over a
million people** have clicked it, and posts flagged this way are now getting roughly
**40% less reach** than they were getting a few weeks earlier, according to LinkedIn's own
numbers as reported by Engadget and others. The button sits next to a quieter change —
LinkedIn also killed "enhance your post," the AI feature that used to rewrite your draft for
you, and replaced it with a narrower "proofreader" that's supposed to leave your actual
words alone rather than generate new ones.

The trigger for all this is a study nobody at LinkedIn commissioned. Pangram Labs, an AI
detection company, ran a browser extension that scanned roughly a million posts people
actually scrolled past across LinkedIn, X, Reddit, Substack and Medium since April, and
found that **41% of LinkedIn's longform posts** were fully AI-generated — reported first by
404 Media and picked up widely since. LinkedIn accounted for 62% of all AI-flagged content
Pangram found, despite being only about a third of what the extension scanned. Pangram's own
researcher called that a floor, not a hard number, since people who install a detector
extension aren't a random sample of LinkedIn users. Fair caveat. It's still a lot of posts
about "5 lessons I learned from a failed product launch" written by a model that has never
launched anything.

## Why I'm writing about a corporate networking site

I don't post much on LinkedIn, but I post *some* things there, the same as most people in
games and VFX do — render breakdowns, a shot from a project once it's cleared for public
work, the odd "here's what I shipped" update. That's the part of this story that isn't
really about thought-leadership spam. It's about what happens when a platform starts
training a million users to hit "report" on anything that pattern-matches to synthetic, and
the pattern it's training them on is *too polished, too consistent, too clean.*

That description also fits a lot of finished 3D work. A well-lit hero render, a texture set
with consistent PBR values across every surface, a lookdev pass where the materials all
agree with each other under the same HDRI — that is what several hours of knowing what you are doing looks like. But it is, visually,
close enough to the smoothed-over, slightly-too-perfect surface language that AI image tools
default to that a viewer skimming a feed on their phone can mistake one for the other in
under a second, and the "report" button is now one tap away.

I want to be precise about what I can and can't back up here. LinkedIn hasn't published
category-level data on who's getting flagged, and I haven't found reporting that ties this
specifically to 3D artists or game-dev portfolios — the closest documented version of this
problem is on Steam, where indie developers have had to change capsule art after players
mistook clean, competent illustration work for AI generation. That's a different platform
with a different mechanism, but it's the same underlying failure: **a detector, human or
algorithmic, that was tuned on "AI slop" ends up flagging "unusually competent" as a false
positive.** LinkedIn's button makes that failure mode faster and more visible than it's ever
been anywhere else, because it's a single click with an immediate reach penalty attached,
and there's no appeals process described anywhere in the coverage I've read.

## The actual defense is boring, and I already use it

The honest fix isn't a watermark or a badge — those get faked or ignored. It's the same
thing that's always separated a real production pipeline from a generated image: **process
that can be shown, not just a result that has to be taken on faith.** A viewport recording
with undo history intact. A wireframe pass before the smoothing. Layered PSDs instead of a
flattened final. I've written before about recording my process at real speed instead of a
sped-up timelapse, specifically because the boring, slow parts are the parts that prove
something — a diffusion model doesn't have twenty minutes of you adjusting a bevel and
squinting at it. If platforms are going to start treating "looks too finished" as a signal
worth punishing, the answer isn't to make your work look rougher. It's to keep the receipts
that show how it got that finished, and post those alongside it.

None of this makes LinkedIn's button a bad idea. A feed that's 41% synthetic
thought-leadership is a real problem and a report-and-suppress mechanism is a reasonable
first attempt at fixing it. I'd just watch, over the next few months, whether LinkedIn ever
publishes anything about false-positive rates — because a system with a mass-reporting
button and no visible appeals process is exactly the kind of thing that quietly punishes the
people doing the most careful work, right alongside the people doing none.
