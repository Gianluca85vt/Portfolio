---
title: "Cyberpunk 2077: twice Witcher 3's texel density"
date: 2026-09-20
category: 3D
excerpt: CD PROJEKT RED's art directors say every building, advert and piece of litter in Night City was placed by hand. First person is why it had to be.
cover: /img/blog/night-city-hand-built-texel-density/cover.svg
draft: true
---

Twice the texel density of The Witcher 3. That is the number CD PROJEKT RED's
environment art director Kacper Niepokólczycki puts on the gap between the
studio's two open worlds, in an interview published on 18 September 2026
alongside Jakub Knapik, the studio's global art director.

Texel density is the boring one. It is how many pixels of texture land on a
metre of surface, and it sits in a spreadsheet somewhere near the start of
production, and once it is set every asset in the game inherits it. Double it
and you have doubled the memory each surface costs, doubled the authoring time
per material, and roughly quadrupled the number of arguments about streaming
budget that the tech art team is going to have over the next four years.

You do not double it for prettier screenshots. You double it because the camera
moved.

## The camera is 170cm off the ground and it stops

The Witcher 3 is a third-person game. Geralt sits between you and the world,
which means there is a floor under how close you can ever get to a wall — his
body, plus the collision capsule, plus the spring arm the camera rides on. A
metre and a half of guaranteed distance. An environment artist building for that
knows the worst case, and the worst case is forgiving.

Cyberpunk 2077 shipped on 10 December 2020 with the camera in V's head. There is
no floor any more. A player can put their face against a vending machine and
read the small print on it, and the small print has to be there, and it has to
be legible, and the normal map under it has to hold up at ten centimetres.
Niepokólczycki and Knapik describe first person as the thing that reorganised
environmental composition, and the texel figure is what that reorganisation cost
in texture memory.

This is the same pressure that runs through [the art discipline Moss was built
on](/blog/polyarc-closes-moss-vr-native-art/), just less extreme. VR takes the
distance floor away and then hands the player a head they can move independently
of anything else, and Polyarc's answer was to build fewer things properly rather
than more things at a distance. Night City had to do both.

## Hand-placed, down to the paper on the pavement

The claim in the interview that will get quoted everywhere is Niepokólczycki's:
all of it is hand-crafted. Every building, every advert, every bin, every sheet
of paper on the pavement, placed by an artist.

For a city that size this is an enormous thing to admit to, and it is worth
being precise about what it does and does not mean. It does not mean nobody
wrote tools. The closest CDPR came to procedural generation, per the interview,
was a road system driven by splines that auto-placed road, bridge and overpass
meshes — and artists then went in and adjusted the output by hand anyway.

So the tool did the topology and the humans did everything sitting on it. That
is a specific and fairly conservative position on a spectrum most studios have
been sliding along for a decade. The scatter-and-fix workflow — place ten
thousand props procedurally, then spend three months fixing the two hundred that
look wrong — is cheaper up front and produces a world where the eye keeps
catching a rhythm it cannot name. CDPR paid the bigger bill for the thing the
scatter does not give you, which is intent. A bin is where it is because someone
decided a bin should be there.

The bill is measured in people and years. Cyberpunk 2077 was in full production
for roughly five years with a studio that crossed a thousand heads, and a
meaningful slice of that went into placing objects nobody will ever look at
directly.

## Four styles, and a rule that keeps them apart

The architecture is split into four chronological styles — Entropism, Kitsch,
Neomilitarism, Neokitsch — which CDPR first laid out publicly in the Night City
Wire style segment back in 2020. Entropism is scarcity: necessity over style,
rebar and corrugated everything. Kitsch is cheap material pretending to be
expensive, designed to break. Neomilitarism is corporate money as architecture,
fortress geometry. Neokitsch is the tier above that, where the flex is real wood
and real leather in a world that has run out of both.

Read as lore that is a nice bit of worldbuilding. Read as a production document
it is a library schema. Four style buckets means four material libraries, four
kit sets, four silhouette languages — and an artist dropped into a new district
knows which shelf to pull from before they open the file. On a project where
every prop is placed individually, the constraint that stops the work exploding
is the one that tells you what *not* to consider.

The interview pairs this with what Knapik calls the rule of contrast: districts
stay distinctive by being unlike their neighbours. That is a composition rule
doing scheduling work. It gives you a way to review a district that is not
"does it look good" but "does it look like the one next door", which is a
question two people can agree on.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=Tk7Zbzd-6fs" target="_blank" rel="noreferrer">
    <img src="/img/blog/night-city-hand-built-texel-density/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from CD PROJEKT RED's Ray Tracing: Overdrive Mode technology preview" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>CD PROJEKT RED's own Ray Tracing: Overdrive technology preview, which shows the path-traced build the interview describes as an evolution rather than a rewrite. It opens on YouTube — Cyberpunk 2077 is rated 18 and the publisher's uploads are age-restricted, which YouTube will not play inside an embed.</figcaption>
</figure>

## Why path tracing landed softly

The part of the interview most useful to anyone building a pipeline is the
lighting answer. Knapik's position is that going to path tracing felt like a
natural evolution rather than a reinvention, because the studio's lighting was
already physically grounded — real units, real falloff, lights placed as if they
were fixtures rather than as if they were paint.

That is the whole argument for doing it the slow way. A team that fakes its
lighting builds up a debt of compensations: a bounce card here, a fill light
with no source there, an ambient term cranked to stop a corner going black. Turn
a path tracer on that scene and every one of those lies shows up at once,
because the renderer resolves the bounce the fill light was standing in for and
now the room is lit twice. A team that lit physically gets a scene that mostly
just resolves.

CDPR shipped the Overdrive preview on 11 April 2023, pointed at an RTX 3090 as
the entry ticket, and it remains the reference implementation everyone benchmarks
against. What it cost to get there was paid years earlier, in the decision to
keep the lighting honest while the hardware could not yet afford honesty.

It is worth putting next to the opposite bet. 4A Games can promise ray tracing
at 60fps on a base PS5 in Metro 2039 because [corridors are what make that
promise affordable](/blog/metro-2039-ray-tracing-60fps-base-ps5/) — a bounded
scene, a known light count, a ceiling you control. Night City has no ceiling and
no bounded scene, which is why the path-traced version of it needed a 3090 and a
lot of denoiser.

## The thing nobody costed

Six years on, Night City is still the reference people reach for when they want
to say a game world feels inhabited. The interview explains a good deal of why,
and the explanation is unglamorous: a spline tool for roads, four material
libraries, a doubled texel budget, and several hundred people placing objects
one at a time for five years.

Nobody is going to green-light that twice. Which is the interesting problem for
everyone working now — the industry has spent the years since building tools
specifically to avoid paying that bill, and the world that gets held up as the
target is the one that paid it in full.
