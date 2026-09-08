# Showcases and conferences — two articles, every time

Gianluca's rule, 8 September 2026. Any dated industry broadcast gets **two**
pieces, not one:

1. **A preview, before it airs**, carrying the link to watch it.
2. **A round-up, after it ends**, carrying every announcement.

Not one piece written afterwards. The preview is what a reader searching
"what time is the Direct" actually wants, and it is the only window in which
that search exists. The round-up is what they want an hour later, and it is a
different article for a different reader.

## What counts

Anything with a date and a stream:

- Nintendo Direct, and its themed variants (Partner, Indie World, an
  anniversary Direct)
- PlayStation State of Play, and State of Play Japan
- Xbox Games Showcase, Developer Direct
- The Game Awards
- gamescom Opening Night Live
- Tokyo Game Show broadcasts
- Summer Game Fest
- Ubisoft Forward, Capcom Highlights, PC Gaming Show, Future Games Show
- Anything else announced with a start time and a stream, including film and
  animation: a Disney or Netflix slate presentation counts, an Annecy or SIGGRAPH
  keynote counts.

The test is a fixed start time and a public stream. If a reader can put it in a
calendar, it gets both articles.

## The preview

Write it as soon as the feeds carry the announcement — usually days ahead, and
the harvest picks these up reliably ("Direct announced for September 8" was in
`notes/feeds` before the show).

It must carry:

- The start time **in Italian time first**, then PT / ET / JST. He is writing
  from Italy and the reader is on his clock.
- How long it is expected to run, if the announcement says.
- The video facade, pointing at the stream's own YouTube id, so the page plays
  it when it starts. Verify the id through oEmbed before writing it in — the
  fetch step does that automatically and errors if the id is wrong.
- What is actually expected, sourced. Not a wishlist.

A preview is short. 300 to 500 words. It is a service piece and it should read
like one.

## The round-up

**One hour after the broadcast ends**, not after it starts. A thirty minute
show that opens at 16:00 gets its round-up at 17:30.

The hour is deliberate. It is long enough for the trade press to have filed,
which is what makes the two-source rule satisfiable, and long enough for the
reaction to have formed — which is frequently the story, as it was when Ocarina
of Time's remake showed its face on 8 September and the entire afternoon became
an argument about specular highlights.

It must carry:

- Every announcement, with dates and platforms. A round-up that omits things is
  worthless; it is the one format where completeness is the product.
- The same video facade as the preview, now pointing at the archived broadcast.
- His own read on one or two of them, per `article-voice.md`. The rest can be
  reported straight — a round-up is the one place where a plain list of facts is
  not a wire service, because the judgement sits in what gets the paragraph and
  what gets the line.

## The scheduling problem, stated honestly

The drafting routine runs at 06:00, 10:00, 14:00 and 18:00 UTC. An event that
ends at 14:30 cannot get a round-up at 15:30 from a job whose next run is at
18:00, and GitHub has been firing these late on top of that.

So "one hour after" is the target and the next run after the event is the
floor. Two things follow, and both are on whoever is writing:

- If a run starts and an event on the watchlist below ended since the previous
  run, the round-up is the priority for that run. It comes before the day's
  ordinary drafts.
- If Gianluca wants it closer to the hour than the cadence allows, he runs the
  routine by hand from claude.ai, or the draft waits for him. Neither is a
  failure — a round-up filed three hours late with everything in it beats one
  filed on the hour with half the show missing.

## Watchlist

Keep this current. Add a row the moment the feeds carry an announcement, delete
it once the round-up is published.

| Event | Starts (Italian time) | Round-up due | Preview | Round-up |
|---|---|---|---|---|
| _(nothing scheduled)_ | | | | |

The 8 September Zelda 40th Anniversary Direct was covered by a round-up only.
The preview never ran, which is the gap this file exists to close.
