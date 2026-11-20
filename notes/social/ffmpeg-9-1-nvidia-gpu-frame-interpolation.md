## LinkedIn

FFmpeg 9.1 shipped today with a filter that has been sitting in a mailing list archive since January 2023, blocked all that time by a licence.

The original patch wrapped NvOFFRUC, the frame rate up-conversion library in Nvidia's Optical Flow SDK. Closed, non-redistributable, and you needed the SDK present both to build and to run. FFmpeg does keep a corner for awkward licences, but the floor of that corner is that somebody can compile the project and walk away with something usable. A filter whose output binary nobody may pass on falls through it. So it sat, while the silicon it targeted shipped in four generations of graphics card.

What changed is the route. Optical Flow SDK 5.0 exposed VK_NV_optical_flow, an ordinary Vulkan extension that goes through the graphics driver. The new fruc_vulkan filter asks the GPU's optical flow accelerator for motion vectors and then does the rest itself, in an FFmpeg Vulkan compute shader: warping the two real frames along the motion and blending the one that goes between. Nothing closed remains in the picture except the driver every Nvidia owner already runs.

For anyone making images for a living, this is a review tool and a good one. A 24fps turntable brought up to 60 for a dailies call, a lookdev loop that needs to read as motion rather than a slideshow, reference footage matched to the plate rate so you can scrub it against the shot. Cheap enough to drop into a playblast script and forget about.

With one line worth saying out loud to whoever asked for the 60fps version: those frames do not exist. The renderer never made them. Fine for timing, silhouette and weight. Not fine for signing off a run cycle, a cloth sim or a camera move.

Also in 9.1: apv_encode_vulkan, the first Vulkan encoder for APV. Same lesson from the other end of the pipeline — GPU work that rides the driver instead of one vendor's terms.

#ffmpeg #vfx #pipeline

## X

FFmpeg 9.1 is out, and it finally carries GPU frame interpolation. The patch was posted to ffmpeg-devel in January 2023 and spent three and a half years stuck on a licence term.

The 2023 version wrapped NvOFFRUC from Nvidia's Optical Flow SDK: closed, non-redistributable, SDK needed to build and to run. FFmpeg's nonfree corner still requires that you can compile the thing and end up with a usable binary. That failed.

The fix was a different door. Optical Flow SDK 5.0 exposed VK_NV_optical_flow as a plain Vulkan extension, reachable through the graphics driver with no proprietary library in the chain.

So fruc_vulkan splits the job: the GPU's optical flow accelerator returns motion vectors, and FFmpeg's own Vulkan compute shader warps the two real frames along them and blends the in-between. The only closed part left is the driver.

Caveat nobody has reconciled: Nvidia's SDK docs put the optical flow accelerator in every GPU from Turing on, but coverage of the merge says the Vulkan path is Ampere and newer. If you own a 2080, test before you plan around it.

Worth it for turntables, lookdev loops and reference footage brought up to the plate rate. Worth remembering that the renderer never made those frames, so nothing gets signed off on motion from an interpolated playblast.
