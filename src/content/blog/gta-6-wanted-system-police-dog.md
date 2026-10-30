---
title: "GTA 6 police: the dog is the expensive part"
date: 2026-10-30
category: Games
excerpt: Edge's GTA 6 feature describes cops who remember your clothes and a K9 unit that pins you down. Storing the outfit is nearly free. The dog is animation work.
cover: /img/blog/gta-6-wanted-system-police-dog/video-thumb.jpg
sources:
  - outlet: GameSpot
    url: https://www.gamespot.com/articles/gta-6s-cops-will-send-dogs-to-get-you/
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/grand-theft-auto/im-calling-it-gta-6-is-officially-an-immersive-sim-based-on-what-you-can-do-with-npcs/
artistView:
  take: "Read the new police details as a production schedule and they split cleanly. Everything the cops remember about you is cheap to build. The one system that touches the player's body is where the animation budget went."
  works:
    - "Systems design: hanging the wanted state on clothing, vehicle and what a witness actually saw hands the player legible tools for breaking a pursuit, which is a better answer than improving the police's aim."
    - "Animation: a K9 takedown has to land on two differently proportioned protagonists, on uneven ground, with a believable recovery. That is paired animation authored more than once, and keeping it in the build is not a small decision."
  misses:
    - "Scope risk: a tackle that reads on kerbs, stairs and sand is the coverage problem that usually ends in one canned animation reused everywhere. A single print description tells us nothing about how often it plays."
draft: true
---

A German Shepherd gets Jason on the ground, and a Rockstar developer standing
behind the journalist playing says: don't shoot the dog.

That is from Edge's new Grand Theft Auto VI feature, the last long look anybody
gets at the game before it ships on **19 November 2026**. Rob Nelson drove the
preview. Rockstar's head of development, Phil Hooker, talked about how the team
tests the thing. Both write-ups I have read are reading the same print feature,
which I have not, so treat the specifics as their reporting rather than mine.

Of everything the police do in those pages, the dog is the line item I would
least like to have signed off.

## What the cops know now

Per GameSpot's account, the police are off the minimap and track a suspect by
what they have on file: face, clothing, vehicle. A CCTV camera that catches you
says so, and the footage is a physical thing you can go and destroy. The wanted
meter is reported as back up to six stars, though that detail has been doing the
rounds from footage for a while rather than coming off a Rockstar press release,
so I would hold it loosely.

<figure>
  <button class="video-embed" data-video="wSm9GTUttBs" data-title="GTA 6 (Grand Theft Auto 6) - Official Extended Gameplay" type="button">
    <img src="/img/blog/gta-6-wanted-system-police-dog/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from Grand Theft Auto VI: An Extended Look" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>IGN's upload of August's Extended Look, 26 minutes and 48 seconds. Rockstar's own copy is age-restricted and will not play outside YouTube. None of the police detail below is in this footage — it comes from the print preview.</figcaption>
</figure>

Hooker's anecdote is the one being passed around, and it earns it. He wanted to
rob a store full of people, so he picked fights with the customers and then
backed out of every one of them — provoke, apologise, repeat — until they all
walked out and the room had nobody in it to witness anything.

Sort that list by what it cost to make and it comes apart in a useful way.

## The memory is the cheap half

A cop who remembers your shirt is a comparison between two ids. The outfit is
already live data, because the game cannot draw you without it. So the police
system subscribes to something that already exists, copies an id at the moment a
witness gets a clean look, and checks it later. A few bytes per suspect record.
CPU cost you could not find with a profiler if you went looking.

Where it gets expensive is design, which is a different department. Somebody
has to decide what counts as a change of clothes. A hat? A jacket over the same
shirt? Then build the feedback that tells you the outfit is burned, then tune it
until swapping clothes feels like relief instead of admin. Weeks of a designer's
time, almost none of a programmer's.

The piece of it I would watch is persistence. A camera you have not got to yet
is world state that has to survive you driving four blocks away and coming back. Same
bill as when Rockstar
[moved the weather from one global system to localized, persistent simulation](/blog/gta-6-weather-localized-persistent/).
Keeping that state is where the cost lands, and the save file grows every time
you add one more thing the world is allowed to remember.

## The dog is where the money went

A quadruped that tackles a human being is paired animation, and paired animation
does not retarget for free.

Start with the obvious problem: Jason and Lucia are different heights and
different builds. A takedown that reads correctly against one has to be
re-authored, or at minimum re-tuned hard, against the other — contact points,
timing, where the weight goes. Then the ground. Vice City is kerbs, verges,
stairs, sand, loading bays. A pin that plays beautifully on flat tarmac and
leaves the dog's back feet hovering on a 15-degree slope is exactly the kind of
thing that gets a system cut four months out from ship.

And a takedown is not one clip. It is an approach at a speed that varies because
the dog is chasing you, an arrival that has to land on a contact point rather
than near it, the transition into the pin, the pin itself as a loop, then one
exit for shaking it off and another for an officer arriving to cuff you, plus a
get-up from the floor for whichever protagonist you were. Every branch is
authored. Most of it the player sees for two seconds.

Then there is the dog itself. Convincing quadruped locomotion at several speeds
is among the harder rigging and animation jobs in a game like this, for the
boring reason that everybody already knows what a dog looks like. Nobody can
tell you if a helicopter's rotor wash is wrong. Everyone can tell when a dog
runs funny.

All of that coverage is data, which is the other end of a thing I wrote about
when the install size leaked: animation sets and audio are
[most of what fills a 210GB install](/blog/gta-6-210gb-where-the-bytes-go/), and
a system with eleven authored branches for a two-second interaction is how a
install gets that big without anybody being wasteful.

Worth saying that the developer's aside — don't shoot the dog — implies you can,
as you could in GTA 5. That is a press problem rather than a craft one, and
Rockstar has three weeks to think about it.

The thing to count at launch is how often the dog turns up. If it is in every
five-star chase, somebody fought for that budget and won. If it plays once, in a
mission, on flat ground, you have just watched the coverage problem win instead.
