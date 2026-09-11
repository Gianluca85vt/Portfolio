---
title: "Physint on Xbox: the engine belongs to Sony"
date: 2026-09-11
category: Games
cover: /img/blog/physint-xbox-decima-engine-sony/shot-01.jpg
excerpt: Sony cancelled Physint in June. Xbox picked it up. The game runs on Decima, built by Sony's own Guerrilla, and no Decima game has shipped on an Xbox.
draft: true
---

In mid-June, Kojima Productions received a notice from PlayStation Studios
saying Physint was being cancelled. The studio then spent roughly three months
finding someone else to fund it, and said nothing publicly the whole time. On
Thursday it named the new publisher: Xbox, which already publishes the studio's
horror project OD.

Sony has given no reason. There is no release date, and no platform list.

The bare facts are strange enough — this was announced on Sony's own stage, at
the State of Play on 31 January 2024, with PlayStation Studios boss Hermen Hulst
standing next to Kojima while Kojima called it the culmination of his career. He
turns forty years in the industry in 2027. The cast was revealed at the studio's
tenth-anniversary event last September: Charlee Fraser, Ma Dong-seok, Minami
Hamabe. A game with that much sunk into it does not get quietly dropped for no
reason, and whatever the reason was, both parties are keeping it.

What interests me is further down, in the part nobody announces.

## Physint runs on Decima

<figure>
  <img src="/img/blog/physint-xbox-decima-engine-sony/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Kojima Productions, via the official DEATH STRANDING 2: ON THE BEACH Steam page</figcaption>
</figure>

Kojima Productions has used Decima for close to a decade. Both Death Strandings
are built on it, and before the cancellation the studio had said Physint uses an
advanced version of the same engine — the Death Stranding 2 branch, essentially,
pushed further.

Decima was written by Guerrilla Games in Amsterdam. Guerrilla is a Sony studio.
The engine shipped Killzone Shadow Fall, then both Horizons, and after Kojima's
split from Konami in 2015 left him with a studio and no technology, Guerrilla
handed over the source. That gift is why Death Stranding exists at all in the
form it does.

So the situation now is a game funded by Microsoft, built by an independent
Japanese studio, running on a renderer owned by Sony.

I have no idea whether that is allowed, and neither does anyone writing about it
today. Having the source code is not the same as having permission to ship a
build of it on a competitor's console. That is a contract question, and it is
the one I would want answered before anyone gets excited about a platform list.

## The technical side is smaller than it looks

Decima has carried a second graphics backend for years, and a mature one.
Horizon Zero Dawn, Horizon Forbidden West and Death Stranding all shipped on
Windows. Death Stranding 2 has a Steam listing of its own.

Xbox Series consoles run a variant of D3D12 and the same broad AMD RDNA2 GPU
family as the PS5. A team that already maintains a Windows D3D12 path is adding
a third target to an abstraction that already exists. Months of tedious work,
and none of it architectural.

The things that genuinely don't come free are the unglamorous ones. Platform
services — saves, achievements instead of trophies, install and storage
behaviour — get rewritten per platform every time, for every game, and always
have. The IO stack is worse: PS5 decompresses Kraken in dedicated silicon and
Xbox does BCPack through its own hardware path, so anything that was tuned
against PS5 streaming rates gets measured again. And the build farm, the
automated test rigs, the certification pipeline all need a second lane.

## Series S is the part artists will feel

A platform change stops being an engineering ticket somewhere around here, and
becomes rework on the floor.

Microsoft has historically required Series S parity from what it publishes. A
Series S has roughly 10GB of usable memory and a much smaller GPU than either of
the other two machines. If Physint has been in production since 2024 authored
against PS5-only budgets — and it has — then every memory decision in that game
was made against a ceiling that no longer applies.

Texture budgets set at PS5 sizes. Streaming volumes drawn on the assumption of
PS5 load rates. LOD ranges tuned so the pop happens where a PS5 can hide it.
Particle counts, shadow cascade budgets, the size of the resident pool. None of
that scales by pulling a slider, whatever the engine's quality-preset system
suggests. Somebody re-authors it, level by level, and the person doing that is an
environment artist rather than a graphics programmer.

Three months of silence while the studio looked for a publisher means three
months where nobody on that team knew which machine they were building for. You
can keep modelling through that. You cannot keep budgeting through it.

## The other reading

Kojima has now had two projects wobble under two different platform holders —
Konami in 2015, Sony in 2026 — and in both cases landed somewhere else and kept
going. There is a version of this story where that is a triumph.

There is also the version where a first-party publisher looked at a prestige
auteur project, priced the remaining work, and decided the number was wrong.
[Sega killed Super Game after five years and a ¥100 billion plan](/blog/sega-super-game-cancelled-100bn-plan/)
by doing exactly that arithmetic, and its president was candid about it
afterwards in a way Sony has not been here. Big-budget projects are being
re-costed across the industry this year and some of them are not surviving the
exercise.

Whatever the reason, the engine question outlives it. Studios stay on the
technology they know because leaving costs years — [CD Projekt moved off its own
engine onto Unreal and pushed The Witcher 4 to 2028](/blog/witcher-4-2028-unreal-engine-transition-cost/),
and that was a transition planned in advance, between games. Kojima Productions
knows Decima better than any team outside Guerrilla. Moving off it now, this
deep into a production, would cost more than the port ever could.

Which probably tells you which way this goes. Sony's engine, Microsoft's money,
and a contract somewhere that nobody is going to publish.
