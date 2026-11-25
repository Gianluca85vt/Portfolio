## LinkedIn

Simon Weisse's model shop is in a backyard in Berlin-Neukölln, and when a film needs him he pulls together about fifteen freelancers who are mostly trained carpenters, joiners and metalworkers. For Alejandro G. Iñárritu's Digger they built a landscape and a B-2 Spirit. Then ILM scanned the miniature planes and used Gaussian splatting to replicate them across shots.

Read in the normal order that is backwards. A miniature is usually reference. It gets photographed and measured, a modeller builds the asset that actually ships, and the CG plane is cleaner and more controllable than the thing on the stand. On Digger the physical object is the deliverable and the digital copy exists to multiply it. You build one bomber properly and let the computer fill the formation.

Splatting instead of meshing follows from the brief. Iñárritu wanted a deliberately artificial world where the models read as models, and a Gaussian splat is fitted to photographs, so it carries view-dependent appearance for free: the specular rolling across a lacquered surface, the brush mark that catches light from one angle and vanishes from another, the unevenness of a finish laid down by hand with a spray gun. Rebuild that as mesh plus PBR and somebody has to author a roughness map. They will make it consistent. A hand-finished model is not consistent, and that is the whole point of having built one.

The bill arrives with the light. A splat is a reconstruction of a scene as it was lit when captured, so the model stage's lighting sits inside the asset. Foundry shipped splat relighting in Nuke 17.1 this year for exactly this reason.

And the format sharpens all of it. Emmanuel Lubezki shot the whole film on VistaVision, eight perforations of 35mm run horizontally, roughly twice the negative area of an Academy frame. Twice the negative resolves twice the detail, which on a miniature is everything you normally try to bury. Here that is the intention.

#VFX #vistavision

## X

Simon Weisse's shop built a B-2 Spirit miniature for Iñárritu's Digger. Then ILM scanned the model planes and used Gaussian splatting to replicate them for shots. The physical object is the deliverable; the digital copy just multiplies it.

Normally a miniature is reference. You photograph it, a modeller builds the asset that ships, and the CG version is cleaner than the thing on the stand. Digger inverts that. Build one bomber properly, let the splat fill the formation.

Why splat instead of mesh: a splat is fitted to photographs, so view-dependent appearance comes for free. Specular rolling over lacquer, a brush mark that catches light from one angle and not another. Mesh + PBR means someone authors a roughness map, and they'll make it consistent.

A hand-sprayed model is not consistent, and its inconsistency is why Iñárritu wanted models in the first place. The splat preserves the thing a rebuild averages away.

The cost is light. A splat bakes in the lighting it was captured under, so the model stage comes along with the asset. Which is why Nuke 17.1 shipping splat relighting in comp stopped being a curiosity this year.

Format makes it sharper still: Lubezki shot it all on VistaVision, 8 perfs of 35mm sideways, ~37.7 x 25.2mm. Twice an Academy frame resolves twice the detail. On a miniature that's the wood grain and the sanding marks. Here, that's the idea.
