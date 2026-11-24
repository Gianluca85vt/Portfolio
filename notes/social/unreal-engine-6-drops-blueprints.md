## LinkedIn

Epic has reversed its own plan: Blueprints and the Actor Gameplay Framework will not be in Unreal Engine 6 at all, Early Access included. In June the commitment was that both would run alongside Scene Graph through 6.0 so projects could migrate in stages. That runway is gone.

The stated reason is AI. Marcus Wassmer, Epic's EVP of Development, says AI will "massively help" convert UE5 projects to UE6, possibly automatically, and the evidence offered is internal work converting Fortnite Battle Royale's Blueprints into Verse.

I think Epic is probably right about the easy half. A Blueprint is already a typed, serialised graph with explicit data flow and known node signatures. Walking that and emitting Verse is a translation job, and translation jobs are exactly what these tools do well.

The Actor Gameplay Framework is not a translation job. Actors, Components, GameMode, PlayerController — that is an architecture, and Scene Graph is a different architecture. There is no one-to-one mapping, so a converter has to make design decisions, and that is a rewrite with a confident tone rather than a conversion.

The bill nobody is itemising lands on tools people. Every editor utility written in the last decade assumes Actors and Components: asset validators that walk a level checking lightmap resolutions, placement tools, naming linters, batch importers, LOD auditors. A Blueprint-to-Verse converter does nothing for any of them.

And the quieter loss: Blueprints is the layer where people who do not write code ship work. A level designer prototyping a door. An environment artist wiring a light switch. That visual layer is a staffing structure disguised as a feature, and studios built their teams around it. Verse is a text language, and Epic has not said what gives non-programmers the same reach.

UE5 is untouched. Blueprints are not deprecated there, and the 5.9 preview is already picking up UE6's AI tooling. Nothing about this week changes your afternoon.

Still unclear: whether Animation Blueprints, construction scripts, Control Rig and PCG are in scope at all.

#unrealengine #gamedev #technicalart

## X

Epic has reversed course: Blueprints and the Actor Gameplay Framework will not be in Unreal Engine 6 at all — Early Access included. In June both were meant to run alongside Scene Graph through 6.0 so projects could migrate in stages. That runway is gone.

The reason given is AI. Epic's EVP of Development Marcus Wassmer says AI will "massively help" convert UE5 projects, possibly automatically. The evidence is internal: converting Fortnite Battle Royale's Blueprints into Verse.

On the easy half, Epic is probably right. A Blueprint is already a typed, serialised graph — known node signatures, explicit data flow, no ambiguity about what connects to what. Walking that and emitting Verse is a translation problem. Those work.

The Actor framework is not that. Actors, Components, GameMode, PlayerController is an architecture; Scene Graph is a different one. No one-to-one mapping means the converter makes design decisions. That is a rewrite with a confident tone.

The cost nobody itemises hits tools people. Asset validators walking a level for lightmap resolutions, placement tools, naming linters, batch importers, LOD auditors — all written against Actors and Components. A graph-to-Verse converter touches none of it.

Quieter loss: Blueprints is where people who don't write code ship work. Designers prototyping a door, environment artists wiring a light switch. Verse is text, and Epic hasn't said what replaces that on-ramp. UE5 keeps Blueprints, so nobody has to move yet.
