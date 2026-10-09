/**
 * The release tracker: the latest version of each 3D and VFX tool the blog
 * covers, what changed in it, and what to watch for.
 *
 * The growth plan of 5 October named this the lead magnet: nobody keeps one
 * page that answers what every studio asks at every update, and the searches
 * that already find the blog ("what did blender 5.2.1 lts add") say the
 * question is there. Signing up to the newsletter from it is how a reader gets
 * told when it changes.
 *
 * Every fact here comes from a Backdrop article and the sources it cites. The
 * daily writer ADDS an entry when it covers a release (notes/tracker.md); the
 * page shows, for each tool, the newest entry whose article is published, so
 * an entry for a draft waits until the draft is approved. Nothing goes in that
 * the article does not say, and "watch" stays empty rather than guessed.
 */

export type TrackedRelease = {
  /** The tool, as its maker names it. */
  tool: string;
  maker: string;
  version: string;
  status: 'stable' | 'beta';
  /** YYYY-MM-DD: the release, or the beta build the entry describes. */
  date: string;
  /** What changed that matters to someone using it for work. */
  changed: string[];
  /** Limits, caveats and breakages the coverage found. Empty when none were reported. */
  watch: string[];
  /** Our article on it. */
  piece: string;
  /** Outside sources the article relied on. */
  sources: { label: string; url: string }[];
};

export const tracker: TrackedRelease[] = [
  {
    tool: 'RizomUV',
    maker: 'Rizom-Lab',
    version: '2027.0',
    status: 'stable',
    date: '2026-10-08',
    changed: [
      'A headless mode runs the scripting surface with no interface, reporting through console output and exit codes, for batch jobs, automated builds and render-farm work.',
      'Python replaces Lua as the default scripting language, and RizomUVLink now works on every platform rather than Windows only.',
      'Align Borders straightens island borders along the U and V axes during Unfold or Optimize; Live Update recalculates an island as soon as an edge constraint changes.',
      'Islands can be processed in parallel, the Scene Outliner spans objects, materials and polygon groups, large FBX scenes load partially, and there are texture-budget controls.',
    ],
    watch: [
      'The "up to five times faster" Optimize figure is Rizom-Lab\'s own, applies to large islands, and no independent measurement has been published.',
      'Nothing in the release places seams, so an unattended job starts from a mesh that already carries its cuts.',
    ],
    piece: '/blog/rizomuv-2027-headless-mode-python/',
    sources: [
      { label: '80.lv', url: 'https://80.lv/articles/rizomuv-2027-introduces-faster-unfolding-live-updates-full-ui-customization/' },
      { label: 'CGChannel', url: 'https://www.cgchannel.com/2026/10/rizom-lab-releases-rizom-uv-2027-0/' },
    ],
  },
  {
    tool: 'Tripo',
    maker: 'Tripo AI',
    version: 'P2.0',
    status: 'stable',
    date: '2026-09-21',
    changed: [
      'Generates quad-dominant meshes natively, rather than triangulating and leaving retopology to a separate pass.',
      'Quad output runs 500 to 25,000 faces; triangle output runs 500 to 50,000. Choosing quads halves the face ceiling.',
      'Adds several variants per prompt and a Mesh Edit mode over the August P2.0 Preview, which produced triangles only.',
    ],
    watch: [
      'The output is described as quad-dominant, not pure quad, so some triangles remain in the mesh.',
      'At 25,000 quad faces the budget suits props and set dressing; a hero character head can use most of it on its own.',
      'The quad percentages and the part-separation claim are the maker\'s own, reported by the trade press; no independent test has been published.',
    ],
    piece: '/blog/tripo-p2-native-quad-meshes-face-cap/',
    sources: [
      { label: 'VoxelMatters', url: 'https://www.voxelmatters.com/tripo-ai-launches-p2-0-model-to-generate-native-quad-meshes-for-production-pipelines/' },
      { label: '3Dnatives', url: 'https://www.3dnatives.com/de/tripo-ai-sammelt-3-milliarden-yuan-3d-modellgenerator-23092026/' },
    ],
  },
  {
    tool: 'Cinema 4D',
    maker: 'Maxon',
    version: '2026.4',
    status: 'stable',
    date: '2026-09-30',
    changed: [
      'A Model Context Protocol server built in, so Claude Desktop or ChatGPT can drive Cinema 4D in words.',
      'Authentication on the connection, permission groups for which tools the assistant may call, separate controls for Python, and a local audit log.',
    ],
    watch: [
      'The MCP server is off after install and runs on your own machine; reaching another machine on the network is a second, separate opt-in.',
    ],
    piece: '/blog/cinema-4d-2026-4-mcp-server/',
    sources: [
      { label: 'CG Channel', url: 'https://www.cgchannel.com/2026/09/maxon-releases-cinema-4d-2026-4-with-a-new-mcp-server/' },
      { label: 'DEVELOP3D', url: 'https://develop3d.com/visualisation/cinema-4d-mcp-server/' },
    ],
  },
  {
    tool: 'Mari',
    maker: 'Foundry',
    version: '8.0 beta 2',
    status: 'beta',
    date: '2026-09-24',
    changed: [
      'A Hex Tile node that breaks up texture repetition on a hexagonal grid, plus a Tri-Planar Tiled node and a Compare node for A/B wipes.',
      'Over fifty new nodes across the 8.0 cycle, most of them small maths operations.',
    ],
    watch: [
      'Still an open beta, with no stable date; CG Channel estimates three to six months.',
      'Priced at $86 a month or $689 a year for an individual when the beta was announced.',
    ],
    piece: '/blog/mari-8-hex-tile-node/',
    sources: [{ label: 'CG Channel', url: 'https://www.cgchannel.com/2026/09/foundry-releases-mari-8-0-in-open-beta/' }],
  },
  {
    tool: 'ArmorPaint',
    maker: 'Lubos Lenco',
    version: '1.0 (26.09)',
    status: 'stable',
    date: '2026-09-03',
    changed: [
      'The first 1.0, after eight years of early access.',
      'Builds for Windows, Linux, macOS, iOS, Android and WebAssembly, painting on the GPU through Direct3D 12, Vulkan and Metal.',
    ],
    watch: ['The source stays free under zlib; the ready-made binaries cost $19.'],
    piece: '/blog/armorpaint-1-0-eight-years-six-build-targets/',
    sources: [],
  },
  {
    tool: 'tyFlow',
    maker: 'Tyson Ibele',
    version: '2.100',
    status: 'stable',
    date: '2026-09-02',
    changed: [
      'A PhysX Vehicles operator: chassis, wheels, suspension and tyre model driven by PhysX in the same flow graph as particles and rigid bodies.',
      'The usual round of Inferno improvements.',
    ],
    watch: [],
    piece: '/blog/tyflow-2-100-physx-vehicles-3ds-max/',
    sources: [],
  },
  {
    tool: 'Marvelous Designer',
    maker: 'CLO Virtual Fashion',
    version: '2026.1',
    status: 'stable',
    date: '2026-08-24',
    changed: [
      'A Seamline Ripping Tool that tears a garment along a seam, the way real fabric fails.',
      'Brush Pinching and a Pinching Simulation Override, for shaping cloth by hand while the simulation runs.',
    ],
    watch: [],
    piece: '/blog/marvelous-designer-2026-1-seamline-ripping-tool/',
    sources: [],
  },
  {
    tool: 'Nuke',
    maker: 'Foundry',
    version: '17.1 beta',
    status: 'beta',
    date: '2026-08-21',
    changed: [
      'Basic relighting for Gaussian splats: Direct, Point and Spot lights rendered through the updated SplatRender node.',
      'A GeoSequencer node that turns a splat sequence into an animatable USD stream, .splat export, and a 3D viewer on Hydra 2.0.',
    ],
    watch: [
      'The relighting needs no normals or position data, because a splat has none: expect an approximation, not light falling on real geometry.',
    ],
    piece: '/blog/nuke-17-1-gaussian-splat-relighting/',
    sources: [
      { label: 'CG Channel', url: 'https://www.cgchannel.com/2026/08/foundry-releases-nuke-17-1/' },
      { label: 'Radiance Fields', url: 'https://radiancefields.com/nuke-17.1-open-beta-adds-dynamic-gaussian-splats-and-basic-relighting' },
    ],
  },
  {
    tool: 'Blender',
    maker: 'Blender Foundation',
    version: '5.2 LTS',
    status: 'stable',
    date: '2026-07-14',
    changed: [
      'Long-term support until July 2028.',
      'Colour management: HDR output, ACES 1.3 and 2.0, and an ACEScg or Rec.2020 working space.',
      'Cycles: an unbiased null-scattering method for volumes, faster GPU volume sampling, adaptive subdivision out of experimental, thin-film interference on metals.',
    ],
    watch: [],
    piece: '/blog/blender-5-2-lts-what-changed/',
    sources: [],
  },
];
