## LinkedIn

Kinetic Games is moving Phasmophobia to Unity 6 on 24 November, and the most
informative thing in the update is the feature they took out of it.

The Player Character Visual Update was pulled from Resonance to keep the rest
stable. That decision tells you more about engine migration than any patch note
will.

Unity 6 arrived publicly in late 2024. A shipped game is getting there two
years later, and the gap is the honest part. Major version bumps are cheap on a
project that has not shipped and expensive on one that has, because the cost
does not land on the code. It lands on the content.

Look at what Unity's own URP 17 notes imply as work, not just as features. A
render graph that custom renderer features have to be rewritten against. A GPU
Resident Drawer that needs every custom shader checked for DOTS instancing
support. Adaptive Probe Volumes that, by most developer accounts, rebuild probe
data rather than convert it.

Now apply that to this specific game. Every Phasmophobia map is an interior.
The lighting is not decoration, it is the mechanic — a torch cone, a few
practical bulbs, and a lot of deliberate blackness. Relight a house in that game
and you have not changed the look, you have changed the difficulty. A hallway
that reads a quarter-stop brighter is a hallway where you spot the ghost a
second earlier.

So "improved lighting" is the riskiest line in Kinetic's own announcement, and
bundling the jump with dowsing rods and new voice commands is sensible cover:
one revalidation pass over every map, one window of player pain, something in
it for the people absorbing the risk.

Kinetic still has not said which Unity version the game is leaving. That is the
one number that would let anyone outside the studio size the job.

The patch notes land on the 24th. I will be reading the lighting lines first.

#gamedev #unity3d #techart

## X

Kinetic is moving Phasmophobia to Unity 6 on 24 November. The most informative
thing in the update is the feature they pulled out of it: the Player Character
Visual Update got cut to keep the rest stable.

Unity 6 shipped publicly in late 2024. A live game is getting there two years
later. That gap is the whole story. Major version bumps are cheap pre-ship and
expensive post-ship, because the cost lands on content, not code.

What URP 17 implies as work: custom renderer features rewritten against the
render graph, every custom shader audited for DOTS instancing if you want the
GPU Resident Drawer, and probe data rebuilt rather than converted if you move to
Adaptive Probe Volumes.

Now apply it here. Every Phasmophobia map is an interior and the lighting IS
the mechanic — torch cone, a few practical bulbs, deliberate blackness. Relight
that house and you have not changed the look, you have changed the difficulty.

Which makes "improved lighting" the riskiest line in the announcement. A hallway
a quarter-stop brighter is a hallway where you spot the Wraith a second earlier.
Nobody files that as a bug. Everybody feels it.

Kinetic has not said which Unity version the game is leaving. That is the one
number that would tell you whether this is a hop or a leap. Patch notes on the
24th.
