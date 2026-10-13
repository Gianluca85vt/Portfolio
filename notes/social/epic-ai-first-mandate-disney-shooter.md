## LinkedIn

Epic Games has reportedly delayed its unannounced Marvel and Star Wars shooter out of March 2027, and told the team to rebuild it AI-first: no more hand-written code, art generated with full AI workflows.

The code half of that instruction is the easy half. Gameplay code in Unreal is already templated, there is a model on every programmer's second monitor, and a generated function either compiles and passes its test or it does not. The verdict is binary and it arrives the same day.

Art is where this gets expensive, and it is worth being specific about why.

Ask an environment or character artist what the slow part of the job is and nobody says coming up with the idea. The slow part is conformance. A prop that ships carries a UV layout that lands on the project's trim sheet, a topology budget it holds to, an LOD chain whose silhouette survives three reductions, a collision mesh that is not the render mesh, and a material instance parented to the right master so one art-direction note can change four hundred assets at once. A character has to be weighted to the skeleton the animation team already has hundreds of clips authored against.

None of that is aesthetic. All of it is the actual work, and generated output arrives with none of it attached. Somebody still has to retopo, lay UVs, bake, hook up materials and fit the rig. That somebody is an artist, doing art-pipeline work, on a project the reporting says was already short of people.

So the honest reading is that generation moves the cost rather than removing it. It can be a real saving on concepting and block-out. It is not the saving a slipping schedule needs, because the part it saves was never the part that slipped.

A hero shooter is the worst case to try it on, too. Twelve characters have to read as coloured shapes at forty metres through a particle effect. That is the most centrally art-directed work in games, enforced by a lead walking the lineup. It is the least like a prompt.

#gamedev #unrealengine #3dart

## X

Epic reportedly delayed its Marvel/Star Wars shooter out of March 2027 and told the team to go AI-first: no hand-written code, art "generated with full AI workflows".

The code half is the easy half. The art half is where this gets expensive.

The reported cause of the delay was ordinary: behind schedule, and Epic had underestimated the staffing and time the project needed.

Note what that means. AI is being applied to a schedule problem, which is a famous way to make a schedule problem worse.

Why art is the hard half: the slow part of game art is not invention, it is conformance.

UVs on the project trim sheet. A topology budget. An LOD chain whose silhouette survives three reductions. Collision that isn't the render mesh. Material instances parented correctly.

Generated geometry arrives with none of that attached. It arrives as a thing that looks like the brief from one angle.

Somebody then retopos it, lays the UVs, bakes it, hooks up materials, fits it to the rig. That somebody is an artist. The cost moved, it didn't vanish.

And a hero shooter is the worst possible test case. Twelve characters have to read as coloured shapes at 40m through a particle effect.

That is silhouette discipline enforced across a whole cast by a lead walking the lineup. Centrally art-directed. The least promptable work in games.

Epic is also dogfooding its own roadmap here: UE6's pitch is AI-centred, 5.8 shipped an experimental MCP plugin wiring a model into engine systems.

A first-party team with a Disney licence and a slipped date is the test case for the keynote. The incentive to report success is enormous.

The question nobody has put to Disney: does the licence even permit it?

Games Workshop forbade generative AI in Space Marine 3 by contract. Disney owns these characters and has spent two years arguing about generative likenesses. Disney declined to comment.
