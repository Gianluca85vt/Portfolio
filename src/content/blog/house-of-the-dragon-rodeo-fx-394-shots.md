---
title: "House of the Dragon VFX: 394 shots, six dragons"
date: 2026-10-06
category: Film & TV
excerpt: Rodeo FX published its season 3 breakdown — 394 shots, six CG dragons, and around a hundred crowd shots inside the Battle of Tumbleton alone.
cover: /img/blog/house-of-the-dragon-rodeo-fx-394-shots/video-thumb.jpg
sources:
  - outlet: The Art of VFX
    url: https://www.artofvfx.com/house-of-the-dragon-season-3-rodeo-fx-brings-dragons-and-tumbleton-to-life/
  - outlet: befores & afters
    url: https://beforesandafters.com/2026/10/06/rodeo-fxs-house-of-the-dragon-s3-vfx-breakdown-is-here/
artistView:
  take: "Six dragons in one season is not six dragons built in one season, and the breakdown says so quietly: Silverwing came out of season 2. The expensive frames are the ones where crowd, dragonfire and collapsing architecture all want to be simulated last."
  works:
    - "Creature: reusing the season 2 Silverwing build is the decision that makes a six-dragon season affordable, and in the reel the asset holds up at the closer camera distances the finale asks of it."
    - "FX layering: dragonfire, destruction and crowd appear together in the breakdown's Tumbleton shots rather than cut apart, which is the harder and more honest way to show that work."
    - "Compositing: the rider plates sit convincingly inside CG air, where the usual tell is an actor lit for a stage and a dragon lit for a sky."
  misses:
    - "Credit: two of the season's eight vendors have now published anything at all. For a production this size, who solved what is still mostly undocumented."
    - "Documentation: the reel shows what was made and says almost nothing about how the sims were ordered, which is the part another studio would actually learn from."
---

Rodeo FX has put a number on its season 3 of House of the Dragon. **394 shots**,
six CG dragons, and a Battle of Tumbleton running to hundreds of shots with
roughly a hundred of those carrying crowds, per The Art of VFX's write-up of the
studio's breakdown, which went up this week alongside a reel. Four days ago the
best public record of who solved what on that season was [one conference talk
about scaling Tumbleton's fire](/blog/house-of-the-dragon-tumbleton-fire-simulation).
Now there is a shot count.

394 from a season worked by eight vendors. That is a large slice for one house,
and it is worth knowing what sits inside it before reading it as a league table —
set extensions for King's Landing, fuller CG for the market town itself, and the
dragons.

## The dragon carrying the finale was built two seasons ago

Silverwing was designed and animated by Rodeo FX for season 2. Season 3 flies her
over Tumbleton and sets her on an army.

This is how a six-dragon season gets paid for. Build one hero creature properly
once — skeleton, wing membrane, scale layout, shaders that hold from a mile out to
a close-up — and the cost lands in one season while the value spreads across
several. Six dragons on screen and six dragons in production are different
counts, and nobody says so in a press release.

Reuse is not free, though, and anyone who has inherited an asset knows where the
bill arrives. New shots mean new camera distances, and a membrane that read fine
in a wide from season 2 will show its displacement at half the range. New
lighting means the shaders get re-tuned. New choreography means the rig meets
poses it was never tested against, and something in the shoulder breaks. The
saving is real. It is a saving on the *first* eighty per cent.

## Crowd, fire and collapsing buildings in the same frame

About a hundred crowd shots inside the Tumbleton sequence, layered with dragonfire
and large-scale destruction simulations.

Those three systems in one shot are the expensive intersection in all of this,
because each one wants to run after the others. The destruction needs the fire's
forces to know what to push. The fire wants the geometry the destruction produced,
or it burns through a wall that is no longer standing. The crowd has to react to
both — to flinch at the right frame, fall in the right direction, be somewhere
else entirely once the roof has gone. And every time an artist changes one, the
caches downstream of it go stale.

You can solve that with brute force and a long calendar. Or you solve it with
workflow, which is precisely the word Rodeo FX's FX supervisor chose for the
title of his Houdini HIVE talk last month, and it reads differently now that the
shot count is public. A hundred crowd shots is a hundred opportunities for a
re-sim to invalidate three other departments.

<figure>
  <button class="video-embed" data-video="wO76wG5_43Q" data-title="House of the Dragon S3 VFX Breakdown — Rodeo FX" type="button">
    <img src="/img/blog/house-of-the-dragon-rodeo-fx-394-shots/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Rodeo FX's House of the Dragon season 3 VFX breakdown" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Rodeo FX's own season 3 breakdown reel. The Tumbleton shots are the ones to watch for the layering — crowd, dragonfire and destruction are shown together rather than split into separate passes.</figcaption>
</figure>

## The rider is a real person

The breakdown calls out plate integration for Silverwing's rider, and it is the
sort of line that passes without comment until you think about what it covers.

An actor is filmed on a motion rig against blue, given a performance by a
gimbal operator working from previs. The dragon then gets animated — and animation
will change, because notes exist. By the time the shot is final, the body is
reacting to a flight path that may not be the one it was pitched and rolled to on
the day. Closing that gap is warping, re-timing, and in the worst cases
re-projecting the actor onto geometry that follows the dragon the animators
settled on.

Lighting is the other half. A person lit on a stage and a dragon lit in volumetric
sky do not match until someone makes them, and the tell is usually the edge of the
hair.

## What the record still does not say

Wētā FX has also published on season 3. Two vendors out of eight, which beats the
one conference talk and a general featurette this season had a week ago, and is
still thin for a production whose other showpiece — the naval battle where
[the ships were the hard part](/blog/house-of-the-dragon-battle-of-the-gullet-vfx)
— has no per-vendor record at all.

What a reel cannot show is the order things were run in. The shot count tells you
how much Rodeo FX delivered. The sim dependency graph behind those hundred crowd
shots — who cached first, what got frozen to let the others finish, which passes
were given up on and comped instead — is the part that would be worth something to
the next crew who has to put an army under a dragon.
