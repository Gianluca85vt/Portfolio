---
title: Rayman Legends Retold delayed after going gold
date: 2026-09-15
category: Games
excerpt: Ubisoft moved Retold from 1 October to 3 December on 14 September, after the build had already gone gold. A Snowdrop rebuild is why that reads oddly.
cover: /img/blog/rayman-legends-retold-gold-delay-snowdrop/shot-01.jpg
draft: true
---

Going gold used to be the end of the conversation. The build is final, it goes
off for certification, the discs get pressed, and the team stops touching it. On
**14 September** Ubisoft's Rayman team posted that Rayman Legends Retold had
gone gold — and in the same message moved it from 1 October to **3 December**.

Two months, on a game that was already done.

The stated reason was that "while the game has officially gone gold, we have
decided to take extra time to make sure every detail gets the care it deserves."
That is the whole of it. Ubisoft has not said what the extra time is for, and
everything below is reading the shape of the project rather than anything the
publisher confirmed.

<figure>
  <button class="video-embed" data-video="rcSlFTpBj_o" data-title="Rayman Legends Retold - Official Reveal Trailer | State of Play 2026" type="button">
    <img src="/img/blog/rayman-legends-retold-gold-delay-snowdrop/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Ubisoft's Rayman Legends Retold reveal trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The reveal trailer from the June 2026 State of Play, which is the best look at the new lighting anyone has had. Ubisoft says a Game Overview trailer and the first hands-on impressions arrive on 22 September.</figcaption>
</figure>

## This is a rebuild, in a different engine

Ubisoft Milan and Ubisoft Montpellier did not upscale Rayman Legends. They
rebuilt it in Snowdrop, the engine behind The Division and Avatar, as a 2.5D
game with real geometry, a camera that moves, and lighting that is calculated
rather than painted. Backgrounds are re-authored and far denser. The characters
have been remodelled. There is a sixth realm that never existed, a new villain,
four new musical stages, voiced cinematics, some on-rails dragon sequences, and
an expanded score from Christophe Héral and Grant Kirkhope. The standard edition
also carries Rayman Origins: Enhanced Edition, the 2011 game at 4K and 60fps.

The engine change under that list is where the work went.

The original Legends shipped in 2013 on UbiArt Framework, and UbiArt's entire
reason to exist was to delete the pipeline. An artist drew a figure, rigged it
with bones over the drawing, and that drawing was the asset that reached the
screen. No unwrapping, no material author, no lightmaps, no shading pass —
the light in a Legends level was painted into the art by the person who made it,
and the engine's job was to not get in the way. Anyone who has spent a week
hand-tuning a normal map understands exactly how radical that was.

Snowdrop works the other way round. It is a physically based renderer with
dynamic lights and ray tracing, which means every one of those painted surfaces
has to become a surface that answers to a light source it does not control.
Flat art re-lit by a moving light is new art. The albedo has to be stripped of
the shadow that was drawn into it, the shape it implied has to be modelled, and
the roughness that was a brushstroke becomes a value someone has to pick.

All of it gets made again.

## What "gold" covers when the art is new

On a port, done is a fixed target. Match the original, hit the frame rate, pass
cert. On a re-authored art pass with a moving camera, done is a judgement, and
here it is four judgements, because the game ships on Switch 2, PS5, Xbox Series
and PC on the same day.

The Switch 2 build is the interesting one. In a VGC interview earlier this year
the team put its Switch 2 target roughly level with an Xbox Series S, and said
it was pushing Snowdrop to run ray tracing at 60fps, using DLSS to reach 1080p
in handheld and 4K docked. That is an aggressive promise on that hardware. It
is the same class of promise 4A Games made about [ray tracing and 60fps on a
base PS5](/blog/metro-2039-ray-tracing-60fps-base-ps5/), and there the answer
was that corridors make it affordable — a tightly framed 2.5D platformer has a
similar advantage, since the camera only ever sees a slice of the world.

That advantage has limits, though. A ray-traced 60 either holds or
it does not, and it is the one class of problem you cannot ship and patch
quietly. A missing collectible goes out in a day-one update. A frame rate that
drops in the water levels means cutting lighting, which means going back to the
art, which is weeks and not days.

Ubisoft has not said this is what happened. It is simply the kind of thing two
months buys on a build that is otherwise finished, and it is more plausible than
the alternative — that a certified game needed eight more weeks of polish on
content nobody has complained about yet.

## Moving out of an empty week into a full one

1 October was a quiet date. Retold would have had most of that fortnight to
itself, and it was Ubisoft's only new release this autumn outside Just Dance,
which made it the entire autumn slate.

3 December is a different proposition. It lands inside the holiday window,
against everything else that wants to be under a tree, with a marketing beat
that has to restart from scratch. Studios do not make that trade for fun. When a
publisher moves a finished game from a calm week into the busiest four weeks of
the year, whatever it is fixing is worth more to it than the shelf space.

There is a smaller cost too, and it is the one I would be watching if I were on
the team. Ubisoft has a habit of continuing to adjust the visual layer of its
remasters after launch — Black Flag Resynced shipped with an emissive aura on
Edward's gear that the studio [eventually let players switch
off](/blog/black-flag-resynced-perk-vfx-toggle/) in a title update. Re-lighting
someone else's art is a taste problem as much as a technical one, and taste
problems keep arriving after gold.

**22 September** is the date that will tell you something. Ubisoft has
a Game Overview trailer and the first hands-on impressions going out that day,
from people who have held a controller. If the coverage talks about how the new
lighting reads on the old designs, the extra two months were about the art. If
it talks about frame rate, they were not.

---

*Delay date, gold status and the 3 December release taken from Ubisoft's own
statement of 14 September 2026 as reported by Push Square and Kotaku. Engine,
developer, platform and feature details from the Steam and Nintendo store
listings and Nintendo Life's coverage of the June 2026 reveal. Switch 2
performance targets from Videogameschronicle's interview with the development
team; those targets are stated intentions and have not been independently
measured.*
