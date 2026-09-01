# Architectures of the Void — the cover style

One illustration a week, made for that week's argument, and recognisable at a
glance as the same column every time. This file is the half that never changes.
The Monday routine writes the half that does, into
`notes/editorial-covers/<slug>.md`.

Read this before writing a brief. Every line below is a constraint, not a
suggestion — the point of a column cover is that twelve of them in a row look
like a set.

---

## The constant

**Style.** Grand Theft Auto VI key art. Hand-painted digital illustration with
clean confident linework, cel-shaded forms lifted by airbrushed gradients, hard
rim light and deep saturated shadow. Poster illustration, not a render and not a
photograph. No 3D look, no photoreal skin, no film grain.

**Palette.** The Leonida heat: hot magenta, turquoise, sun gold, with a violet
to deep indigo ground. It shares the site's own magenta–purple–orange range on
purpose, so the column sits inside the blog rather than beside it.
`#B600A8`, `#7621B0`, `#BE4C00`, `#18011F` are the anchors.

**Light.** Low sun. Long shadows, strong rim on one side of the figure, humid
air with visible haze. Late afternoon, never midday and never night.

**The character is always Gianluca.** Same man every week, same build, same
face. He wears **a shirt and shorts** — every single cover, whatever the
subject, whatever the setting. The shirt may change colour and pattern with the
week; it stays a shirt, and the shorts stay shorts. No jacket, no suit, no
trousers, no costume.

**Framing.** Three-quarter view, figure occupying the left or centre third,
knees-up or full body. He is doing something the argument is about, not posing
for a portrait. Eyes on the task or on the viewer, never a neutral stare.

**Format.** 1200×900, landscape, saved as JPEG at
`public/img/blog/editorial/<slug>.jpg`.

**Composition.** Keep the top-left quarter uncluttered — the headline sits over
it on the article page, and the card crops to 16:10 from the centre. Nothing
that matters should live in the bottom eighth.

**Never.** No visible logos or trademarks, no real people other than Gianluca,
no readable brand names on props, no text baked into the image. The style is
GTA's; nothing in the frame should be lifted from GTA itself — no Vice City
landmarks, no characters from the game, no in-game signage.

## The variable

One thing changes each week: **what he is doing, and where.** It comes from the
argument the editorial makes, and it should be readable without the headline —
a person who scrolls past should be able to guess the subject.

Concrete beats abstract every time. An editorial about studios shipping
remasters instead of new work is a man on a beach chair surrounded by stacked
arcade cabinets of the same game, not "a metaphor for stagnation". An editorial
about generative AI in the pipeline is him at a drafting table where the drawing
finishes itself badly while he is still holding the pencil.

## The likeness

The prompt cannot describe his face and should not try. Generate with his own
reference — a LoRA, an IP-Adapter image, or a reference-image field, whichever
the tool offers. The brief supplies the scene, the wardrobe, the light and the
treatment; the likeness comes from the reference every time, which is what keeps
him the same person across twelve covers.

## What happens if the artwork is not made

The article names its own cover and stays a draft until the file exists.
Approving it early is safe: the publish check refuses and says which file is
missing, and the column falls back to the permanent painting at
`/img/blog/editorial/cover.jpg` rather than rendering coverless.
