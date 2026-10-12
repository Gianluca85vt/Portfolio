## LinkedIn

LoopTools is becoming a core C++ operator in Blender, and it is the least glamorous change in the 5.3 cycle that will matter most to anyone modeling for a living.

If you have not thought about LoopTools in a while: it is the add-on behind To Circle, Relax, Flatten and Space. Bart Crouch wrote it about fifteen years ago. It has shipped inside Blender the whole time, sitting in Preferences with its checkbox off until you tick it. Blender's own tracker task for the port puts it at roughly 1.5 million downloads, which for a thing that already ships in the box tells you how many people went hunting for it by name.

Two reasons the port is worth your attention.

The first is performance, and it is not marketing. Relax, Flatten and Space are per-vertex loop operations — they walk every element in your selection, work out where it belongs relative to its neighbours, and move it. In Python, the interpreter is the entire cost. On a twelve-vert ring you never notice. On a retopology pass over a scan in the high tens or hundreds of thousands of verts, you notice constantly. Moving that loop into C++ lands exactly where the pain was.

The second is pipeline, and it is the one I care about more. Add-ons break. Every release moves some part of the Python API, somebody has to update the add-on, and in the gap your tool is gone. If you are pinned to one Blender build for a project, or your farm runs an image somebody baked six months ago, a core operator is simply there. An add-on is whatever was ticked when that image was made.

One thing to re-learn: Relax is described as going contextual — the LoopTools algorithm in vertex and edge mode, Blender's own Smooth in face mode. One menu entry, two behaviours, picked by a select mode you changed with a keystroke and forgot about.

And a caveat worth stating plainly: blender.org, the 5.3 notes and the coverage currently describe three different subsets as native. Check the build you are running, not a page about it.

#b3d #3dmodeling #gamedev

## X

LoopTools is being rewritten from scratch in C++ and moved into Blender core. The least glamorous change in the 5.3 cycle, and the one most likely to show up in your day.

Blender's tracker task for the port puts LoopTools at ~1.5 million downloads — the most downloaded add-on there is. For something that already ships in the box and just needs enabling, that number is a lot of people searching by name.

Why C++ matters here: Relax, Flatten and Space walk every vertex in your selection and move it relative to its neighbours. In Python the interpreter is the whole cost. On a 12-vert ring, invisible. On a retopo pass over a scan, it is the job.

The quieter win is pipeline. Add-ons break when the Python API moves, and in the gap your tool is gone. A core operator survives a version-locked studio build and a render-farm image somebody baked six months ago.

One thing to re-learn: Relax goes contextual. LoopTools relax in vert and edge mode, Blender's own Smooth in face mode. One entry, two algorithms, chosen by whatever select mode you left yourself in.

Caveat: blender.org's 5.2 page, the 5.3 notes and today's coverage each describe a different subset as native. The port is staged. Check the build you are actually running.
