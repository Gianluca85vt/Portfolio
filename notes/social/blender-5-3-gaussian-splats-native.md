## LinkedIn

Blender 5.3 is out, and a Gaussian splat now opens with nothing installed. No add-on, no version roulette, no waiting for someone to patch a repo after the next release breaks it.

Worth knowing what shipped, though, because "native splat support" covers a narrower thing than the headlines suggest.

A splat loads as a point cloud. Not a mesh, not a new datablock type with its own half-built editor — the existing PointCloud type, tagged. That strikes me as the right conservative call. It means splats arrive with selection, instancing, modifiers and Geometry Nodes already working, instead of arriving as a special case that reaches parity three releases later. Geometry Nodes even gets an Import SPZ node, so a capture becomes a procedural input you can swap without rebuilding the scene around it.

Import is PLY and SPZ. Rendering works in Workbench solid mode, EEVEE and Cycles, so the thing you block out in solid is the thing that renders.

Now the part to plan around. There is no export in 5.3 — neither format writes. And there is no built-in conversion from splat to mesh. A capture that goes into a .blend stays in that .blend. If the deliverable is geometry, the splat is reference, and reference is a fine job for it.

Two limitations in the release notes that will cost someone an afternoon. Apply Transform does not carry the splat scale, rotation and spherical-harmonic attributes, so the object transform and the splat's own data can quietly disagree after an operation you'd normally treat as a bake-and-forget. And most splat authoring tools work in sRGB while Blender works linear, so when a scan looks washed out in Cycles, check the colour pipeline before you touch a light.

Also in 5.3: DLSS 4.5 Ray Reconstruction as a Cycles denoiser alongside OptiX, native dispersion in the Principled BSDF, LoopTools now core C++, and the Vulkan backend as the default on Windows and Linux. That last one is getting the least attention and is the most likely to surprise someone on an old driver.

#b3d #3D #gamedev

## X

Blender 5.3 shipped today. A Gaussian splat now opens with no add-on installed: PLY and SPZ, rendering in Workbench solid mode, EEVEE and Cycles.
What it will not do is let you get one back out.

Splats load as a PointCloud, tagged, rather than as a mesh or a bespoke datablock type. Conservative call and the right one: selection, instancing, modifiers and Geometry Nodes all work on day one instead of reaching parity in 5.6.

No export in 5.3. Neither format writes, and there is no built-in splat to mesh conversion, so you cannot import a capture, retopo against it and ship geometry through Blender alone. If the deliverable is a mesh, the splat is reference.

The limitation that will cost someone a day: Apply Transform does not handle the splat scale, rotation and spherical-harmonic attributes. Scale a scan, apply, and the object transform and the splat's own data can stop agreeing. Silently.

Second one: most splat trainers work in sRGB, Blender works linear, and the notes say the mismatch can produce rendering inaccuracies. So when a capture reads washed out in Cycles, check the colour pipeline before you relight it.

Rest of 5.3: DLSS 4.5 Ray Reconstruction as a Cycles denoiser next to OptiX, native dispersion in Principled, LoopTools in core as C++, Vulkan default on Windows and Linux. Vulkan is the quiet one. Old driver, new default.
