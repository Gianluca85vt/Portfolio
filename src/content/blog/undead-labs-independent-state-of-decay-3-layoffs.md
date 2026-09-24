---
title: "Undead Labs layoffs: what State of Decay 3 loses"
date: 2026-09-24
category: Games
cover: /img/blog/undead-labs-independent-state-of-decay-3-layoffs/shot-01.jpg
excerpt: Undead Labs went independent from Xbox and cut staff on the same day, 22 September. That timing follows from how runway funding works.
draft: true
---

Undead Labs completed its separation from Xbox on 22 September and posted the
layoff news the same day, hours apart. That interval is the detail worth sitting
with.

The studio is independent now and employee-owned. It keeps State of Decay, keeps
the back catalogue, and by its own account leaves with funding to carry it for a
while. It did not say how many people are going, only that the number is
significant and that some of them were working on State of Decay 3. It now needs
a new publisher, and the game is still promised on Game Pass day one, which is an
odd pair of sentences to read together.

[Ninja Theory got the other outcome from the same
announcement](/blog/ninja-theory-closure-xbox-268-cuts/) — closure consultation
opened on 22 September, 268 roles cut across the restructure. Divestment is the
better of the two doors, and it still put people out of work this week.

## Why the cuts landed on day one

Runway funding is a number. Burn rate is headcount multiplied by time. Divide the
first by the second and you get a team size, and that arithmetic does not improve
by waiting six months to do it.

While the studio was first-party, payroll was somebody else's line item and the
question was how many people the project needed. From 22 September it is the
studio's own money, and the question inverts: how many people can the money hold
until a publisher advance arrives. Anyone who has watched a small studio take
over its own books knows the answer arrives on the first day, because every month
you delay is a month of runway spent on a headcount you were always going to have
to cut.

So the timing is a spreadsheet being solved the moment it becomes solvable.

## The plumbing nobody credits

Leaving a first-party umbrella costs you things that never appeared on your
budget. Build and test farms. Automated capture running on real retail hardware
overnight. Certification and submission handling. Localisation. Accessibility
review. Playtest recruitment and the people who read the results. Shared engine
support when Unreal does something unexpected in a build.

None of that is creative work, which is why it is invisible in every article
about a studio going independent, and all of it has to be replaced by somebody.
In a shrinking team that somebody is usually an existing senior — a lead
environment artist who now also owns the build pipeline, an engineer who now also
owns submission. The hours come from the same place they always come from.

## Where a smaller team shows up in an open world

The June reveal put numbers on the thing. First proper gameplay at the Xbox
Games Showcase on 7 June 2026, built in Unreal Engine 5, a map around four times
the size of a single State of Decay 2 map, shared-world co-op for up to four
players, targeting 2027 on Xbox Series X|S, PC, cloud, Steam and PS5. Undead Labs
said the footage was game capture rather than CGI, logo aside.

<figure>
  <button class="video-embed" data-video="Q8LK86QqnyA" data-title="State of Decay 3 - Official Gameplay Reveal Trailer | Xbox Games Showcase 2026" type="button">
    <img src="/img/blog/undead-labs-independent-state-of-decay-3-layoffs/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from the State of Decay 3 gameplay reveal trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The gameplay reveal from the Xbox Games Showcase on 7 June 2026 — the only footage of the current build anyone outside the alpha has seen, and the benchmark the shipped game will be measured against.</figcaption>
</figure>

A map four times the size is four times the fill. Interiors that have to be enterable because this is a looting game.
Props with wear passes, because a house nobody has lived in for two years reads
wrong if the dust is uniform. LODs, streaming cell tuning, collision that holds
up when a player drives a truck through it at an angle nobody planned for.

That work scales with people almost linearly. Systems work does not — one
engineer can redesign a melee system and the design holds at any map size. Cut
environment artists from an open-world project and the map does not get smaller.
The density drops, or the schedule slips, or a region ships greyer than the
vertical slice promised.

Co-op multiplies it again. Four players in a shared world means four cameras in
four districts, so the streaming budget you tuned for one viewpoint gets split,
and the memory headroom that let you push texture resolution in a single-player
build quietly disappears. Every art decision has to survive being looked at from
four places at once.

This is the same reckoning [Polyarc ran into with the art discipline Moss was
built on](/blog/polyarc-closes-moss-vr-native-art/), from the other end: there,
a specialism was exactly right for a platform that stopped funding it. Here a
content pipeline sized for publisher money has to keep producing on studio money.

## The schedule is the open question

The game is in alpha, with a closed beta said to be planned before the end of
2026, shipping in 2027. Alpha is a comfortable word that covers an enormous
amount of remaining work — the polish tail on an open world is where most of the
hours live, and it is the phase that eats artists rather than designers.

Three things are unconfirmed and all three matter more than the headline. How
many people actually left. Who publishes it. Whether 2027 survives contact with
both answers.

The Game Pass day-one commitment is the strange survivor here. A studio with no
publisher signed is still holding a distribution promise on a platform it no
longer belongs to, which suggests Microsoft's side of the divestment included
more than a cheque and a handshake. Nobody has said what.

---

*Separation date, employee-owned status and the layoff wording from Undead Labs'
own LinkedIn post of 22 September 2026 and Game Developer's report on it.
State of Decay 3 platform, engine, map-scale and co-op details from Xbox Wire's
gameplay-reveal post of 7 June 2026. Layoff headcount, the new publisher and any
change to the 2027 window are unstated at the time of writing.*
