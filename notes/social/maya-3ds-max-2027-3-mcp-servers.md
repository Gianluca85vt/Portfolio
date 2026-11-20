## LinkedIn

Autodesk shipped MCP servers into Maya 2027.3 and 3ds Max 2027.3 this week, and the spec line I went looking for was the undo behaviour.

Each agent action can be undone as a single step. One ctrl-Z, whatever the agent touched.

If you have ever run a script that renamed three hundred objects and then clicked undo three hundred times, you know why that sentence decides whether a tool like this gets used on a shot or quietly banned by your supervisor.

The rest of the posture is just as conservative, and I mean that as praise:

— read-write access is off by default
— the Assistant previews what it intends to run and waits for you to click Allow
— external clients sit behind the same access levels and the same approval step, with token-based authentication, on your own machine
— Autodesk names Claude and Cursor for 3ds Max; the Maya coverage adds ChatGPT

Maxon took the same shape with Cinema 4D 2026.4 back in October. The DCC vendors have converged on one answer to whether an agent may write to the scene graph, and it is yes, with the safety on.

One thing I have not seen described anywhere: an audit log. On a facility network the person explaining a corrupted publish is rarely the person who ran the agent, and "the AI did it" is not a pipeline report. That is the feature I would want before turning this on for a team rather than for myself.

The demo doing the rounds was recorded by Shirzad Bahrami, a technical animator at Activision Blizzard, running the Assistant through pre-flight checks on a creature. Validation, naming, the pass before publish. An agent with scene access and an approval click makes a very good scene-checking robot and a fairly ordinary artist, and Autodesk demoed the former.

3ds Max also lists Gaussian splat work here, including 4DGS sequences and PLY export. The write-ups disagree on scope, so read the release notes before you plan around it.

#3D #gamedev #vfx

## X

Autodesk put MCP servers into Maya 2027.3 and 3ds Max 2027.3 this week. The spec line that decides whether anyone uses it: each agent action collapses into a single undo step. One ctrl-Z, whatever the agent touched.

Run a rename script across 300 objects, then click undo 300 times, and you understand why that one sentence separates a tool that gets used on a shot from one your supervisor quietly bans.

The safeguards are deliberately dull: read-write off by default, preview-then-Allow before anything runs, external clients behind the same access levels, token auth, local machine. Autodesk names Claude and Cursor for 3ds Max; Maya coverage adds ChatGPT.

Maxon did this with Cinema 4D 2026.4 in October — MCP server, off by default. The DCC vendors have converged on one answer to whether an agent may write to the scene graph, and it is yes, with the safety on.

Missing from every write-up I can find: an audit log. On a facility network the person explaining a corrupted publish is rarely the person who ran the agent. That is what I would want before switching this on for a team.

Quieter win, bigger daily payoff: Arnold as an accelerated viewport renderer instead of a floating ActiveShade window. 3ds Max also lists Gaussian splat work — 4DGS sequences, PLY export — though my sources disagree on scope, so read the notes.
