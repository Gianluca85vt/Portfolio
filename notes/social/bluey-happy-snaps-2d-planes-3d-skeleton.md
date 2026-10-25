## LinkedIn

Gameloft Brisbane's Bluey game is one of the more honest pieces of technical art direction I have read about this year, and the trick is almost rude in how direct it is.

Bluey is a drawing. Drawings are allowed to be the wrong shape from the wrong angle and still read correctly — that licence is most of what makes the show look like the show. Put that character in a 3D world and the problem turns up the second anything rotates. In Bluey's Happy Snaps the camera is the controller, because the game is about taking photographs, so rotation is not an edge case. It is the core loop.

So the characters are not models. They are flat camera-facing planes, built in Maya, textured with signed distance fields instead of bitmaps — which is why the edges stay vector-crisp when a five-year-old shoves the viewfinder into Bluey's face, and why they cost almost nothing in texture memory on a machine as old as the original Switch. The eyes are reportedly SDF bezier curves rather than images of curves.

Then the flat plane is skinned to a 3D skeleton and rigged in Unreal's Control Rig. A drawing, bound to bones, posed in world space. The animators are doing 3D animation and what comes out looks hand-drawn.

The part I keep thinking about is the cost. A plane facing the camera stops working when the camera walks round it, so there are seven to eight rigs per character at 45-degree steps. That is eight times the animation on a game that ships a lot of animation. The team wrote tooling to author a pose once on a hero angle and propagate it across the rest. That tool is the project. Without it, the angle count multiplies the content budget by eight and nobody makes the game.

Compare Studio Orange, coming at the same problem from the other end: real models, warped per shot until the faces lie about anatomy, paid for in asset reuse. Start flat and you pay in rig count. Either way you are buying the same thing — permission to break perspective.

Gameloft, Ludo Studio, Unreal Engine.

#gamedev #technicalart #unrealengine

## X

Bluey is a drawing, and drawings get to be the wrong shape from the wrong angle. Gameloft Brisbane's Bluey game is built around taking photographs, so the camera rotates constantly. Their fix for that collision is more literal than I expected.

The characters are not models. Flat camera-facing planes, built in Maya, textured with signed distance fields rather than bitmaps. The edge stays sharp at any zoom and costs a fraction of the texture memory — which matters when the original Switch sets your floor.

Then the flat plane is skinned to a 3D skeleton and rigged in Unreal's Control Rig. A drawing, bound to bones, posed in world space. The animators work in 3D and the output reads hand-drawn. Eyes are reportedly SDF bezier curves, not images of curves.

A plane facing the camera breaks when the camera walks round it. So: seven to eight rigs per character, at 45-degree steps. Eight times the animation on a game full of animation. In-house tooling authors the pose once on a hero angle and carries it across the rest.

That tool is the whole project. Without it the angle count multiplies the content budget by eight and the game does not ship. With it you pay a tool programmer and a propagation step somebody has to check every time.

Also good: a shader faking an inverse-hull outline at constant screen thickness. Normal inverse hull is a world-space offset, so the line fattens up close and vanishes at distance. Measure it in pixels and the character keeps looking drawn.
