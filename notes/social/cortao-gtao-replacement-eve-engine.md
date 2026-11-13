## LinkedIn

Ambient occlusion has had a slanted-surface problem for ten years, and this week someone open-sourced a fix for it.

GTAO — the technique that put physically based AO into real-time rendering in 2016 and has been in roughly every engine since — measures horizon angles. It slices the hemisphere above a pixel and asks how high the surrounding geometry rises in each slice. The slices skew when the surface is not facing the camera. A ground plane running away from you under a tree is exactly that case, which is why grounding on foliage has always looked confident and been subtly wrong.

Daniel Isheden at Fenris Creations (formerly CCP Games, of EVE Online) hit this on vegetation and rebuilt the approach. CORTAO — Circular Occluder Ray-Traced Ambient Occlusion — samples the depth buffer, builds crude circular occluder proxies around each pixel, and traces up to 32 rays per pixel against those instead of measuring angles. A precomputed lookup table resolves the intersections in bulk, which is the only reason 32 rays per pixel in screen space is affordable at all.

The benchmark headline: it matches GTAO in under half the GPU time in simple scenes, and converges to a much lower error in complex ones.

The detail I keep coming back to is what happens to the quality presets. GTAO tracks a maximum horizon angle, so dropping the sample count loses occlusion outright. Lower quality preset, brighter flatter scene. Everyone who has lit a level on a workstation and then seen it on a mid-range card knows that one — the contact shadows thin out and the whole set floats. CORTAO's error swings over and under instead, and cancels under filtering. The occlusion level holds across presets.

So the artistic look survives the settings menu. For a team shipping across a wide hardware spread that is worth more than a benchmark win.

MIT licence. It expects a temporal pass downstream, which it does not ship, and a compile-time sample count means one shader permutation per quality level.

#gamedev #rendering #realtimevfx

## X

Fenris Creations, the studio behind EVE Online, just open-sourced CORTAO under MIT: screen-space ambient occlusion that traces up to 32 rays per pixel against circular occluder proxies instead of measuring horizon angles the way GTAO does.

GTAO's limitation: it slices the hemisphere above a pixel and measures how high geometry rises in each slice. Those slices skew on surfaces not facing the camera. Sloped ground under foliage is the worst case, and the grounding drifts as you turn.

What makes 32 rays per pixel affordable is a precomputed lookup table that resolves ray-occluder intersections in bulk rather than one at a time. Three compute passes: a depth and normal prepass, the main trace, an optional sparse prefilter.
[image: shot-01.jpg]

The part that matters if you light things: GTAO tracks maximum horizon angles, so fewer samples finds fewer maxima and yields less occlusion. An Ultra-lit scene reads flat on Medium. CORTAO's error swings both ways and cancels under filtering.

So the occlusion level holds across quality presets, and the artistic look survives the settings menu. Bent normals come out at roughly half GTAO's overhead too, which makes the cheap indirect-light approximation cheaper rather than dearer.
[image: shot-02.jpg]

Costs, honestly: no temporal filter included, so it assumes TAA or an upscaler sits later in your frame. Sample count is a compile-time constant, meaning one shader permutation per quality level. HLSL needs Shader Model 6.7. Benchmarks are the vendor's own.
