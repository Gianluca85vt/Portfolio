## LinkedIn

Edge's new Grand Theft Auto VI feature has a dog in it, and the dog is the most
expensive thing in the whole police system.

The write-ups picked out the headline details: cops off the minimap, a wanted
state that tracks your face, your clothes and your vehicle, CCTV footage you can
go and destroy, and a K9 unit that chases Jason down and pins him to the floor.
Rockstar's Phil Hooker also described clearing a store before robbing it by
picking fights with the customers and immediately defusing each one, until
everybody walked out and there was nobody left to witness anything.

Sort that list by production cost and it comes apart neatly.

A cop who remembers your shirt is a comparison between two ids. The outfit is
already live data — the game cannot draw you without it — so the system copies
an id when a witness gets a clean look and checks it later. A few bytes per
suspect record. The real cost there is design time: deciding whether a hat
counts, building the feedback that tells you the outfit is burned, tuning it
until changing clothes feels like relief rather than admin.

The dog is a different budget entirely. A quadruped that tackles a human is
paired animation, and paired animation does not retarget for free. Jason and
Lucia are different heights and builds, so the takedown has to be re-authored
against both. The ground is kerbs, verges, stairs and sand, not flat tarmac. And
it isn't one clip: a variable-speed approach, an arrival that lands on a contact
point, a transition, a pin loop, one exit for shaking it off and another for an
officer cuffing you, a get-up for each protagonist. Eleven or so authored
branches, for two seconds of screen time.

Then the animal itself. Convincing quadruped locomotion is one of the harder
rigging jobs in a game this size, for a boring reason: nobody can tell you when
a helicopter's rotor wash is wrong, and everybody can tell when a dog runs funny.

The thing I'll be counting on 19 November is how often the dog actually turns up.

#gamedev #animation #3D

## X

Edge's new GTA 6 feature: cops track your face, clothes and vehicle, CCTV you
can destroy, and a police dog that pins Jason to the ground.

Sort those by what they cost to build and the list splits in half.

A cop remembering your shirt is a comparison between two ids. Your outfit is
already live data — the game can't draw you without it. Copy the id when a
witness gets a clean look, check it later. A few bytes per suspect record.

The real cost of the memory systems is design, not code. Does a hat count as a
change of clothes? A jacket over the same shirt? Somebody spends weeks on that
question and on the feedback that tells you your outfit is burned.

The dog is the expensive one. A quadruped tackling a human is paired animation,
and paired animation doesn't retarget for free. Jason and Lucia are different
heights and builds, so the takedown gets authored against both.

And it isn't one clip: variable-speed approach, arrival on a contact point,
transition, pin loop, an exit for shaking it off, another for getting cuffed,
a get-up per protagonist. ~11 branches for two seconds of screen time.

Plus the animal. Convincing quadruped locomotion at several speeds is among the
harder rigging jobs in a game this size. Nobody clocks wrong rotor wash.
Everybody clocks a dog that runs funny.

What I'll count on 19 November: how often the dog shows up. Every five-star
chase means somebody fought for that budget and won. Once, in a mission, on flat
ground, means the coverage problem won.
