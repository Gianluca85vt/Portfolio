## LinkedIn

Seams are the decision. Everything after them is arithmetic. That split is why UV unwrapping stayed a desk job long after the rest of the asset pipeline moved onto the farm.

Rizom-Lab shipped RizomUV 2027 on 8 October, and the arithmetic no longer needs a window open. The new headless mode runs RizomUV's tools with nothing on screen — the scripting surface, no interface, reporting through console output and exit codes. Two other changes in the same release decide whether that is usable, and both landed with it.

Python is now the default scripting language. RizomUV has been scriptable for years, in Lua, and Lua is a fine language that almost nothing else in a 3D pipeline speaks. Maya is Python. Houdini is Python. Blender is Python. Lua meant RizomUV automation sat in its own corner, written once by whoever learned it for this one application and rewritten from scratch when that person moved on. That friction keeps a tool off the farm for a decade after it is technically capable of being there.

RizomUVLink now works on every platform rather than Windows only. Farms are Linux. A headless mode that ran on Windows alone would be a trade-stand demo.

Nothing here places your seams, and Rizom-Lab is not claiming it does. So the job you can build starts from a mesh that already carries its cuts, then unfolds, optimizes, packs and writes out to a texel density the job declares rather than an artist remembers. On a team where three people each hold a different idea of what 10.24 px/cm means, that is worth having on its own.

The feature I would test first is the texture-budget control. A budget is only as good as what happens when it is exceeded, and a job that quietly halves density to make the atlas fit has made an art decision on your behalf at three in the morning.

Out now on Windows, macOS and Linux.

#b3d #gamedev #vfx

## X

RizomUV 2027 shipped on 8 October with a headless mode: the full scripting surface, no interface, console output and exit codes. The unwrap-and-pack half of UV work can finally live on a farm.

Two changes decide whether that headless mode is usable. Python replaces Lua as the default scripting language, and RizomUVLink now runs on every platform instead of Windows only. Farms are Linux. A Windows-only headless mode is a trade-stand demo.

Why Lua mattered: Maya is Python, Houdini is Python, Blender is Python. Lua meant RizomUV automation sat in its own corner, written once by whoever learned it for this one tool and rewritten when they moved on.

Seams are the decision. Everything after them is arithmetic. Nothing in 2027 places a seam, and Rizom-Lab isn't claiming it does — the farm job starts from a mesh that already carries its cuts.

Align Borders is the quieter win: it straightens island borders to U and V during the Unfold rather than as cleanup afterwards. A packer fed rectangles leaves fewer gutters than one fed blobs, and on a 4K atlas those gutters are resolution you paid for.

The "up to 5x faster" Optimize claim is Rizom-Lab's own and applies to large islands. Nobody outside the company has measured it. Parallel island processing is the believable half: 300 islands scale, 4 islands don't.
