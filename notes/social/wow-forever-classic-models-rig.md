## LinkedIn

A skeleton is not a skin, and that one sentence explains most of the argument
about World of Warcraft: Forever's character models.

Blizzard's Classic+ answer launches on 4 November. Early beta builds shipped
only the modern high-definition character models, testers pushed back, and
Blizzard added a toggle between SD and classic-style models plus the original
character-creation portraits. Then the complaints changed shape — from "where
are the old models" to "these are not quite the old models". That second
complaint is the one worth reading as a technical artist.

Price the feature as you would receive it in a ticket. Two body meshes,
switchable per character, at any time.

If both meshes share one skeleton, the bill is small. One animation library.
Weapons on the same hand bones. One set of attachment points for shoulders,
helms and cloaks. A re-weight pass per mesh and you are finished.

If each mesh carries its own skeleton, almost nothing is shared. Two animation
sets maintained in parallel, including every emote added over twenty years. Two
sets of attachment transforms. And then gear — WoW armour is modelled geometry
conformed to a specific body, so a second body means a second fit for every
shoulder pad, helm, belt and boot in the game. Thousands of items, each costing
an art pass that produces nothing a player can point at.

Nobody funds that for a toggle. Beta testers describe what you would expect
instead: older meshes on the retail skeleton. Blizzard has not published the
construction, so treat that as inference — but it matches the specific
complaints. The Night Elf thread objects to a broad chest and thin shoulders.
That is not a texture note. It is what happens when a mesh authored against one
bone hierarchy is bound to another whose clavicles sit wider and whose spine
segments run longer. The vertices follow the bones, the silhouette shifts a few
world units, and two decades of muscle memory catches it instantly.

The stated aim, as relayed from the beta, was a version of what people remember
Classic looking like rather than a replica. That is a legitimate brief. It is
also the opposite of a restoration's brief, which is why this argument will not
end.

#gamedev #3dart #rigging

## X

A skeleton is not a skin.

Most of the argument about WoW: Forever's SD character models comes down to
that. Blizzard added the toggle after beta pushback. What it could not add
cheaply is a second rig.

[image: video-thumb.jpg]

Two body meshes on ONE skeleton: one animation library, weapons on the same
hand bones, one set of attachment points for shoulders and helms. A re-weight
pass each and you ship.

Two meshes with TWO skeletons: two animation sets maintained in parallel,
including every emote from twenty years of patches. Two sets of attachment
transforms. Then gear.

Gear is what kills it. WoW shoulders, helms, belts and boots are modelled
geometry conformed to a specific body. A second body means a second fit for
thousands of items — art passes producing nothing a player can point at.

So beta testers report the obvious compromise: older meshes riding the retail
skeleton. Not confirmed by Blizzard, but it fits the complaints.

The Night Elf thread objects to a broad chest and thin shoulders. That is a rig
note, not a texture note.

Bind a mesh authored for one bone hierarchy to another with wider clavicles and
longer spine segments and the silhouette moves a few world units. Nobody wrote
that number down. Twenty years of muscle memory finds it in about four seconds.
