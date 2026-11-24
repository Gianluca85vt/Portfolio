## LinkedIn

Boltgun 2's pixel art comes out of a render pipeline wearing a 1996 costume. Once you know how it was built, the reviews stop contradicting each other.

Auroch Digital's lead artist Mark Chambers described the process to Creative Bloq: characters are modelled in 3D, run through a pixelisation step, captured from eight camera directions by a custom rig, packed into compressed sprite sheets by script, then projected onto billboarding planes that swivel to face the player. The team deliberately cut the frame count down to the angles that matter, because nobody studies a Chaos marine in three-quarter profile while sprinting down a corridor.

That is the right call. It is also a ceiling, and I think it explains the one complaint that survived the sequel.

Thirteen scored verdicts average 8 out of 10, and they run from 5 to 9.5 — a four-and-a-half point spread on a game nobody is confused about. Read the criticisms together and they are almost all variety: three bolters that feel like one, enemies that snag on geometry, ambushes that start to telegraph.

Now price that against the pipeline. A polygonal enemy is cheap to vary — reskin it, swap a head, change the animation set, and the renderer gives you the difference for nothing. A sprite enemy costs a full capture: model, pixelise, eight directions, every frame of every animation, packed and hand-checked. Variety stops being a modelling task and turns into a multiplication table. The cheapest way to fill an arena becomes more of what you already captured.

Auroch improved nearly everything that was improvable here — branching campaign, a second playable character, better geometry, Mick Gordon on part of the score. What they could not do was touch the constraint underneath, because that constraint is the reason the game looks as good as it does.

Worth remembering the next time a stylised pipeline gets pitched as the cheap option.

#gamedev #3dart #technicalart

## X

Boltgun 2's pixel art is rendered, not drawn. Characters are modelled in 3D, pixelised, captured from 8 camera directions, packed into sprite sheets, then billboarded at the player.

A 1996 silhouette built on 2026 asset counts.

Auroch's lead artist says they cut the frame count to only the most important angles. Correct call: down a gun barrel at speed, nobody studies an enemy in three-quarter profile.

Every angle of every animation is a frame a human signs off. The diagonals are where the bill lives.

The first game already hit a wall — UE4's own sprite tooling couldn't draw enough objects fast enough, so Auroch wrote their own renderer that runs on GPU or CPU.

A bespoke renderer, to make flat squares appear. Funny until you count the squares.

13 scored verdicts average 8/10, range 5 to 9.5 (collected 24 Nov 2026). The complaints cluster hard on variety: three bolters that feel like one, enemies snagging on geometry, ambushes that telegraph.

[image: shot-02.jpg]

The part nobody priced: a polygon enemy varies cheaply — reskin, swap a head, new anim set, renderer does the rest.

A sprite enemy costs a full capture: 8 directions x every frame, packed and checked. Variety becomes a multiplication table.

So the cheapest way to fill an arena is more of what you already captured. Which is exactly what reviewers mean when level six feels like level three.

Auroch fixed everything except the constraint — because the constraint is why it looks this good.
