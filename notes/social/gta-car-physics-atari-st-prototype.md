## LinkedIn

Pat Kerr has published the vehicle physics he wrote for the original Grand Theft Auto, and rebuilt it in JavaScript so you can drive it in a browser tab. It started as a wireframe demo in GFA BASIC on his Atari ST at home, over one weekend in late August 1996, and was ported to C to go into the game.

The technical detail that stopped me is what he chose to be rigorous about.

Kerr describes the system as a simple classical 2D rigid body dynamics simulation, and notes that most game vehicles of that period used basic high-school point physics — F = ma, a position, a velocity, a shove forward. The difference matters more than it sounds in a changelog. Point physics gives you something that accelerates and turns. A rigid body gives you a mass with a moment of inertia: it resists rotation, keeps rotating once it has started, and can be pushed around its centre rather than through it. Oversteer comes out of that for free. So does the handbrake slide, and the way a GTA car keeps swinging after you let go.

Then there are the tyres, which he calls simple, approximate and technically incorrect — his fairly educated guess. On a 1996 home machine you were never going to evaluate a real slip-angle curve inside a frame budget. So he approximated it and tuned until the car behaved like a car.

Correct structure, guessed surface. That is still the order vehicle handling gets built in, in studios with physics engineers and telemetry rigs.

The other thing worth opening the demo for: the controls expose the camera's dead zone and its speed-based zoom as separate toggles. Turn them off and the same simulation stops reading as fast. Half of every handling argument I have sat through was a camera argument wearing a physics hat.

Thirty years on, the solver is still legible and the guess is still doing most of the work you remember.

#gamedev #physics #retrocomputing

## X

Pat Kerr, DMA Design programmer, has published the vehicle physics behind the original Grand Theft Auto — and rebuilt it in JavaScript so it runs in a browser.

Written over one weekend in late August 1996. GFA BASIC. On an Atari ST at home.

He calls it a simple classical 2D rigid body dynamics simulation, and notes most game cars of the era ran basic high-school point physics: F = ma, position, velocity, a shove forward.

That gap is the whole feel of the game.

Point physics gives you a thing that accelerates and turns. A rigid body gives you mass with a moment of inertia — resists rotation, carries it, can be pushed around its centre.

Oversteer falls out of that. So does the handbrake slide.

The tyres he owns up to: simple, approximate and technically incorrect, his fairly educated guess.

No 1996 home machine was evaluating a real slip-angle curve in a frame budget. So he approximated and tuned until it drove like a car.

Correct structure, guessed surface. Vehicle handling still gets built in that order, in studios with telemetry and physics engineers. The solver is what you cannot bolt on later. A friction curve is a number you turn.

The demo also exposes the camera dead zone and speed-based zoom as toggles (Z and X). Switch them off and the same maths stops feeling fast.

Most handling arguments are camera arguments in disguise. [image: shot-02.jpg]
