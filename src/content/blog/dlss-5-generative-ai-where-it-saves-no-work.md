---
title: DLSS 5 puts generative AI where it saves nobody any work
date: 2026-08-31
category: Editorial
column: Architectures of the Void — the Monday editorial
cover: /img/blog/editorial/cover.jpg
excerpt: The place a generative model would genuinely cut a studio's costs is the long tail of hand-authored content, and that is the one place Nvidia's neural pass does not go. It edits the finished frame instead, after the money is spent and the artists have gone home.
---

The neural pass in DLSS 5 runs after the frame has been assembled, lit and
graded. Everything it touches has already been paid for.

So it cannot make a game cheaper to build. It can only change the result once
the cost is sunk — arriving at the point in the schedule where the invoices are
settled and the people who authored the look are on another project.

Two other things happened this week, and between them they show where the money
in this job goes.

## Staffing the crowd

Rockstar put GTA 6 above 600,000 animations during its hands-on sessions,
against roughly 300,000 for Red Dead Redemption 2 and something like 55,000 for
GTA 5. In the same press cycle, relayed second-hand by two podcast hosts who
were invited to Edinburgh, came the other line: no microtransactions and no
generative AI at launch. It has not been disputed, it has not been written down
by Rockstar, and what it covers — the shipped game, or the making of it — is
still fuzzy.

The 600,000 counts clips in a database rather than performances, and most of a
modern character database is connective tissue. One believable sit-down at one
table is the approach, the turn, the weight shift, the settle — then the same
again for a stool and a booth, then the additive layers riding on top, then the
exits, which are not the entries played backwards. The Red Dead figure does not
agree with the one that circulated at that game's launch, so nobody should build
an argument on either being exact.

The direction is what matters. Ten times the corpus in a decade, and an office
in Los Angeles that worked on nothing but pedestrians.

That is the expensive part. The long tail of incidental motion, the filler
nobody looks at directly and everybody notices the absence of, is the least
glamorous content in a game and the most costly per unit of player attention. A
studio squeezing a budget squeezes there first. Rockstar staffed a building
instead, which is a payroll decision before it is an artistic one, and they can
make it because they are Rockstar.

[[ANEDDOTO: a stretch of work that was pure volume — the unglamorous long tail of assets nobody looks at directly — and what it took to get through it]]

Nobody is building the other tool for the studios that cannot. A generative pass
aimed at that long tail, opted into per project, tuned in the building, with an
art lead accountable for what comes out of it, would sell itself to every
mid-sized team in Europe. What is on the market is a filter for the last
millisecond.

## Month eight

The second thing: roughly 12TB of Valve's internal builds from 2003 to 2013
surfaced online, off an old content server that sat without a password for
about a decade after the company migrated away from it.
It is stolen work however easy it was to reach, I have not looked at it, and
none of what follows is a suggestion that you should.

But one detail has been reported everywhere and it is worth taking seriously.
The 2009 Portal 2 test chambers were built with Team Fortress 2 arms holding the
portal gun. There are Half-Life 2 zombies sitting in the files with no obvious
reason to be there.

If you have only ever seen shipped games you could be forgiven for assuming a
studio at that level works in some cleaner way than you do — that somewhere in
pre-production a real art bible descends, and every asset in the build from then
on is the intended one at an early stage of polish.

That is not what month eight looks like anywhere.

Month eight looks like the wrong arms on a first-person character, because
somebody needed to know whether the gun read correctly in the player's hands and
rigging new arms would have cost a week nobody had. It looks like a directory of
models left over from an encounter that got cut two years ago. Every one of
those is a decision to spend the day on the question in front of you rather than
on the asset that will eventually answer it.

[[ANEDDOTO: a placeholder or stand-in asset that survived far later into a project than it should have, and what finally forced it out]]

## What the pixel forgets

Put those two next to each other and the problem with the last stage becomes
obvious.

Every decision in a production survives into the shipped frame, and it survives
only as the frame. Albedo values kept inside a range so they still read once the
grade lands on top. Roughness authored to catch one key light at one hour of the
day. A LUT
that pulls the warm greens out because somebody decided this world does not have
any.

None of that arrives in the output as a reason. It arrives as a pixel.

Which leaves a model with no way to separate a choice from a defect. Skin that
reads waxy because the character is meant to look ill. Light that goes flat
because the scene is a memory. A colour missing on purpose. Arms borrowed from
another game because it was Tuesday. Seen from the end, those are the same
object: errors against photographic plausibility, which a system trained toward
plausibility will helpfully correct.

Stylisation goes first, every time, because from the outside a style and a
mistake are indistinguishable.

[[ANEDDOTO: a deliberate look-dev or art-direction choice that came back flagged as a bug or an error by somebody outside the art team, and what it took to defend it]]

## Somebody else's slider

The leaked library fell out of an NBA 2K27 early access build by accident and
was running in Control and Skyrim within hours, then a list past ten titles
inside a few days. Nvidia decided none of that, and there is real disagreement
about how finished the build even is. Judging a shipping product by a modded
injection is as unfair as judging a film by a workprint.

It does answer one question. We now know what a driver-level switch looks like
in the wild, because we have watched it for a week.

To be fair, the build people have is more considered than the memes suggest.
Presets, styles, separate controls for skin structure and tone, an intensity
slider for the pass itself. Somebody at Nvidia thought carefully about restraint,
then shipped it as a user preference.

Every other stage of a pipeline has one name against it and a chain of review
behind that name. This one terminates on a stranger's desktop, where the person
moving the slider has never read the art direction document and has no reason to
care what the greens were for. The studio ships a look. The slider gives it a
second author, retroactively, with no way to answer back.

And it is not free. Injected builds are reported losing close to half their
frame rate — one player posted Control on an RTX 5060 going from 86fps to 32,
which is one machine and should be read as such. DLSS built its name buying
frames back. This branch spends them.

## On the box

So why the end of the pipeline, when the cost is at the front?

Because the end is the only place you can demo it. A before-and-after on a stage
needs two finished frames and eight seconds. Generation applied at month eight,
to the six hundred thousandth sit-down animation, has no reel — it shows up as a
schedule that did not slip and a hiring plan that got smaller, and nobody has
ever put that on a keynote slide. The placement follows what can be
demonstrated. Nothing about it follows from where the work is.

Which makes this a hardware feature wearing production clothes. It exists to
move cards, and the finished output of every studio that ever shipped anything
is the free material it moves them with.

Rockstar can answer that with a building full of animators. Most of us are
working to a number, on somebody else's engine, with a delivery date, and the leverage we have is that the finished
frame is ours — that the last thing a player sees is the thing we decided they
would see.

We spent thirty years arguing our way into that. It now ships with a slider, and
the person holding it has never read the document.

---

*Written on 31 August 2026. The GTA 6 animation counts come from Rockstar's
hands-on press sessions the week of 24 August; the no-microtransactions and
no-generative-AI answers were relayed from a studio visit and have not been
issued by Rockstar in writing. The DLSS 5 library leaked out of an NBA 2K27
early access build around 26 August and Nvidia has not commented; the final
feature set is unannounced and the frame-rate figure is a single user report.
The Valve archive is described second-hand throughout — I have not examined it,
and nothing here links to it.*
