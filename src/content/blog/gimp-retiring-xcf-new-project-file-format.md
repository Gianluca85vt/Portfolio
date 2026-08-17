---
title: GIMP is finally retiring XCF as its project format
date: 2026-08-17
category: Tech
excerpt: A zipped-XML format that only rewrites what changed, autosave finally within reach, and a PSD importer that stopped choking on adjustment layers. The boring parts are the ones that matter for a real pipeline.
cover: /img/blog/gimp-retiring-xcf-new-project-file-format/cover.svg
draft: true
---

GIMP posted its August development update this weekend, and the headline is one of
those changes that sounds dull until you have actually waited on a save bar. **XCF**,
GIMP's native project format since 1997, is getting a successor: a **zipped XML
structure** that the team is building for GIMP 3.4.

XCF itself is not going anywhere. The team was explicit that loading old XCFs will
keep working indefinitely — this is an addition, not a break. But new projects will
default to the new format once it lands, and the reasoning behind it is worth reading
if you have ever worked with a DCC tool's save file as more than a black box.

## Why the format itself is the story

XCF has always been a monolithic dump: every save rewrites the entire file, layers,
history and all, from scratch. That is fine for a flat sketch. It stops being fine the
moment a project is a few thousand layers deep, which is exactly what a texture-heavy
environment file, a matte painting, or anything with baked-in masks and adjustment
stacks turns into.

The new format saves incrementally — only the parts that actually changed get
rewritten — which is the same trick most serious project formats eventually learn
(Blender's `.blend` does something conceptually similar with its block-based writer).
The payoff isn't just faster saves. Incremental writes are also what makes **autosave**
practical, because you can no longer justify not doing it once a save stops meaning
"rewrite everything and hope nothing corrupts halfway through."

If you have ever lost forty minutes of paint-over work to a crash because saving felt
expensive enough that you kept putting it off, this is the fix for that specific,
entirely preventable kind of pain.

## The PSD work matters more than it looks

Buried in the same update: contributor Frank Teklote has been overhauling GIMP's
**PSD import**. Text layers are now editable instead of flattening on import, several
adjustment-layer types and modern layer styles now map onto GEGL equivalents instead
of getting silently dropped, and solid-color shapes come in as vector layers rather
than baked pixels.

That is a pipeline story, not a feature-list story. Plenty of small studios and solo
environment artists run a mixed toolchain — someone paints in Photoshop, someone else
touches the file up in GIMP because that is what the budget allows — and every one of
those adjustment layers that used to vanish on import was a reason to avoid the round
trip entirely. A PSD that survives contact with GIMP with its layer structure intact
is a PSD you can actually hand off both ways, which is the whole point of a project
file format in the first place: it is supposed to be a contract between tools, not
just a save slot for one of them.

## What I'd actually watch for

Format migrations are where DCC tools go to have their worst year. The design goal
here — full backward compatibility, new format opt-in rather than forced — is the
right instinct, but the real test is what happens to third-party tooling. Anyone with
a Script-Fu or Python-Fu pipeline that parses XCF structure directly, or a batch
export tool built against the old format's assumptions, is going to want to know
exactly when "default" becomes "the only thing new files are," because that is the
day those scripts either get updated or start failing quietly.

None of this ships yet — it is dev-update news, aimed at GIMP 3.4, with the animation
work planned for 3.6 built to lean on the same format. Worth bookmarking, not worth
changing anything about your workflow today.

---

*Details from GIMP's [August 2026 development update](https://www.gimp.org/news/2026/08/16/dev-update-august-2026/), also covered by [Phoronix](https://www.phoronix.com/news/GIMP-New-File-Format-2026) and [9to5Linux](https://9to5linux.com/gimp-3-4-promises-new-project-file-format-psd-support-improvements-and-more).*
