## LinkedIn

House House has published a disclosure about Big Walk, and buried in it is the
sentence every studio should read twice: the game was made without an internal
AI usage policy, and the studio calls that absence a failure.

The facts first. Nineteen Independent Games Festival jurors signed a statement
on Monday saying they will not vote for any game that used generative AI in any
capacity. The statement names no title. A day later House House said LLMs were
used sparingly on Big Walk to work through hard technical problems and bugs,
that well under 0.1% of the code had anything to do with it, and that no
generative AI was used anywhere else in the game. It apologised, and said the
disclosure is not an endorsement.

Under 0.1% of a codebase that size is a few hundred lines. If the use really
was debugging, some of those are a model guessing what a stack trace meant and
a person writing the fix by hand afterwards. From my desk, a model reading an
error log and a model generating a texture are not the same act: one produces a
hypothesis you throw away, the other ships in the frame and carries its
provenance forever.

But the blanket rule exists because studios kept moving that line themselves.
Sega pulled the Shogun 2 remaster two days after launch over artefacts in the
art. Once a few of those land, "in any capacity" reads less like an overreach
and more like the only line that cannot be negotiated down one sprint at a
time.

The practical lesson is the policy, not the percentage. A policy answers the
question before it is urgent: can a programmer paste a crash log into a chat
window, can a tech artist ask for a batch-rename snippet, can anyone type a
prompt into a texture tool. Decide it in month three and the answer holds at 2am
in month fifty. Decide it at 2am and you get whatever the tired person decided.

Saber had an answer on Space Marine 3 — absolutely none — because Games
Workshop required it in writing. House House found out what its rule was after
the game was out.

#gamedev #techart

## X

House House has disclosed LLM use on Big Walk: sparingly, on hard technical
problems and bugs, well under 0.1% of the code, nothing generative anywhere
else in the game. It came a day after 19 IGF jurors said they won't vote for any
game that used genAI.

Under 0.1% of a project that size is a few hundred lines. And if it was
debugging, some of those are a model guessing at a stack trace and a human
writing the actual fix. It's a number a studio can reconstruct from its own
commit log, which beats "used responsibly".

From a tech art desk these are different acts. A model reading an error log
gives you a hypothesis you test and discard. A model generating a texture ships
in the frame and carries its provenance forever. Flattening the two costs the
argument its edge.

The blanket rule exists because studios kept moving the line on their own. Sega
pulled the Shogun 2 remaster two days after launch over artefacts players
photographed in the art. After a few of those, "in any capacity" stops looking
like an overreach.

The useful sentence in the statement: Big Walk shipped without an internal
AI usage policy, and House House calls that a failure. A policy decides what a
tired person may do in week 140. Saber had one on Space Marine 3
because Games Workshop wrote it down.

House House also said it worries that voluntary disclosure normalises the tech.
That bind is real. Stay quiet and the practice spreads unremarked. Speak and it
gets flattened to "studio used AI". The industry has no agreed unit of
measurement yet.
