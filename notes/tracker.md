# The release tracker — how the writer keeps it

`/tracker/` lists the latest version of each 3D and VFX tool the blog covers,
from `src/data/tracker.ts`. It is the newsletter's lead magnet (growth plan,
5 October 2026): readers sign up to be told when it changes, so it has to be
current and it has to be right.

**When a piece you write covers a new version of a tool** — a stable release or
a public beta of Blender, Nuke, Mari, Cinema 4D, Houdini, Maya, 3ds Max,
ZBrush, Substance, Marvelous Designer, tyFlow, ArmorPaint, Unreal Engine,
Unity, Godot, Krita, DaVinci Resolve and the like — add an entry for it to
`src/data/tracker.ts` in the same commit as the draft:

- **Add** a new entry; do not edit or remove the older one for that tool. The
  page shows, for each tool, the newest entry whose article is published — so
  yours appears when your draft is approved, and if it is rejected it never
  appears at all.
- `version`, `status` (`stable` or `beta`), `date` (YYYY-MM-DD of the release or
  beta build) exactly as your sources give them.
- `changed`: two or three lines on what matters to someone using it for work.
  Plain, specific, no marketing words.
- `watch`: limits, caveats, breakages, pricing changes — only what the coverage
  actually found. **Leave it empty rather than guess.** An invented caveat on a
  page people use to decide whether to upgrade is worse than none.
- `piece`: `/blog/<your-slug>/`. `sources`: the outlets you cited, with URLs.

Never remove or change an existing entry, and never add one for a version you
did not cover.
