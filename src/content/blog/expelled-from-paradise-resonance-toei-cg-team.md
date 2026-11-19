---
title: "Expelled from Paradise Resonance: Toei's CG team"
date: 2026-11-19
category: Manga
excerpt: The 2014 film proved full-3DCG anime could look good. Graphinica made it. Twelve years on, Toei built a CG team from scratch rather than hire them again.
cover: /img/blog/expelled-from-paradise-resonance-toei-cg-team/video-thumb.jpg
sources:
  - outlet: Anime News Network
    url: https://www.animenewsnetwork.com/news/2026-11-19/rakuen-tsuiho-expelled-from-paradise-kokoro-no-resonance-film-opens-at-no.5-in-japan/.243961
  - outlet: Anime News Network
    url: https://www.animenewsnetwork.com/review/expelled-from-paradise/resonance-anime-film/.243778
  - outlet: Tokyo Anime Dispatch
    url: https://tokyoanimedispatch.substack.com/p/expelled-from-paradise-resonance
artistView:
  take: "Standing up a CG team from nothing for a single film, around a package the host studio did not run, is a bill most productions refuse to pay. The shading gains reviewers are describing are roughly what that bill buys."
  works:
    - "Shading: reviewers describe a drastic improvement on the 2014 film, and shading is where owning your own renderer and your own lookdev usually shows up first."
    - "Pipeline: posing by hand inside the CG, instead of drawing over the top of it, keeps the model as the one source of truth — which is how the asset reuse survives to the end of a film."
  misses:
    - "Tooling: a 3ds Max crew inside a Maya studio means two sets of habits and, per Tokyo Anime Dispatch, a pipeline rebuilt from scratch. A team assembled for one film pays that cost once and may never amortise it."
    - "Animation: a B- for animation from ANN's reviewer, twelve years on from the original, reads as the gap to drawn character acting narrowing rather than closing."
---

*The production details below rest on reporting by Tokyo Anime Dispatch. Toei
Animation has not published an announcement I can find about the team, so treat
the pipeline specifics as one outlet's account.*

*Rakuen Tsuihō -Expelled from Paradise- Kokoro no Resonance* opened in Japan on
Friday 13 November 2026 and placed fifth on its first weekend, with *Godzilla
Minus Zero* holding the top spot — Anime News Network reported the chart on 19
November. Fifth is a respectable result for a sequel to a film that opened in
thirteen theatres in 2014.

The interesting line is in the credits. The original *Expelled from Paradise*
was a Toei Animation production **animated by Graphinica**, and it mattered
because it was one of the first full-3DCG anime features that nobody felt
obliged to apologise for. Seiji Mizushima directed, Gen Urobuchi wrote it, and
Graphinica did the work.

Mizushima is back. Urobuchi is back. Character designer Masatsugu Saitō and
composer NARASAKI are back. Graphinica is not.

<figure>
  <button class="video-embed" data-video="gdqs6y-6R3g" data-title="『楽園追放 心のレゾナンス』本予告｜11月13日劇場公開" type="button">
    <img src="/img/blog/expelled-from-paradise-resonance-toei-cg-team/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the official main trailer for Expelled from Paradise: Resonance" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The official main trailer, from the film's own channel, cut for the 13 November opening. I have not watched the film; everything about how it looks on screen below is attributed to the people who have.</figcaption>
</figure>

## A team assembled for one film

According to Tokyo Anime Dispatch, Toei started a new in-house CG team in early
2023 — a label called noise animation label, NOISE — specifically to make this
picture — a team of their own, hired for the job.

And then the part that made me sit up. Toei's Oizumi studio, finished in
January 2018, already ran a pipeline built on Maya. Most of the artists NOISE
gathered preferred 3ds Max, which is what the first film used. So the team
built a new pipeline from scratch.

Anyone who has carried a show through a DCC migration knows what that sentence
is hiding. The software is the smallest part of a pipeline. The rest is the
asset naming, the publish and load steps, the rigs and the scripts that drive them, the render submission,
the shader library, the dozen small tools somebody wrote in a week three years
ago that forty people now depend on. None of it ports. You rewrite it, and you
rewrite it while the film is in production, which is the worst possible time to
be debugging your own plumbing.

Toei had a working Maya pipeline sitting right there. They chose the artists
over the plumbing. For a company with Toei's volume that is a strange,
expensive, and — I think — correct call, because the thing you cannot rebuild in
eighteen months is a crew's muscle memory.

Mizushima has reportedly said he hopes NOISE becomes more than a one-film team.
He would. The economics only work if it does.

## Posed by hand, inside the CG

The technique is the other thing worth stopping on. Per the same reporting, the
animation is still largely done by hand *inside* the CG, with almost no drawn
animation at all except for elements like smoke.

Set that beside the other route into 3D anime. When I wrote about how [Studio
Orange bends its models by hand so the CG reads as
drawn](/blog/studio-orange-3d-anime-2d-look/), the striking thing was the price:
dropped frames, warped geometry, faces redrawn on top, every one of which eats
into the asset reuse that justified going 3D in the first place. Orange buys the
2D read by giving back the savings.

NOISE appears to be buying it a different way — in the posing. Keep the model
honest, keep the renderer doing the stylisation, and let animators hit the poses
a drawn key would have hit. Nothing gets redrawn on top, so a character built
once stays built. Smoke gets drawn because smoke is cheaper to draw than to
simulate convincingly at anime scale, and because hand-drawn smoke is a look
rather than a shortcut.

Whether it works is a question for people who have seen it. ANN's reviewer gave
the film a B- overall and a B- for animation, said it shows how much CG
animation has improved in twelve years, and singled out the shading as
drastically better. B- for animation is not a rave. Paired with "drastically
better shading" it describes something quite specific: the surfaces have caught
up faster than the performances.

That tracks with everything I have seen in this corner of the craft. Lookdev
scales. You solve a skin shader once and it serves the whole cast. Character
acting does not scale, because the only thing that fixes a flat performance is
an animator spending more days on it, and days are the one resource a film
schedule cannot print.

## Twelve years, in both directions

The gap between the two films is long enough to be a measurement. In 2014 a
full-3DCG anime feature was an argument you had to win. Now the argument is
about which seat the work sits in — vendor or in-house, Maya or Max, drawn over
or posed within.

Not everyone is walking toward it. Haruko Ichikawa, whose *Land of the Lustrous*
is the other landmark case for CG in anime, has [started a new series built from
softer material](/blog/cosmic-mimimi-ichikawa-after-the-gems/), and the choice
of subject reads as a deliberate step away from the thing that made CG the right
answer last time. Her gems were mineral. CG was the honest tool for mineral.

Toei's answer was to hire the artists and throw away the plumbing.

---

*Release date, chart position and review grades from Anime News Network. The
NOISE team, the Maya-to-3ds-Max pipeline rebuild and the hand-posing description
come from Tokyo Anime Dispatch and are not corroborated elsewhere that I could
reach. Oizumi studio completion date from Toei Animation's own corporate
history. I have not seen the film.*
