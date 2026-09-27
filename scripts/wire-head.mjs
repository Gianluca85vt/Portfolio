/**
 * Makes the wireframe twin of the turning head on the home page.
 *
 *   FFMPEG=/path/to/ffmpeg node scripts/wire-head.mjs
 *
 * Reads public/img/video/rotazione faccia.mp4 and writes
 * public/img/video/rotazione faccia wire.mp4: the same 190 frames, the same
 * timing, drawn as a triangle mesh on black, cropped to the middle half. The page swaps between the two
 * for the wireframe view and the quarter-second glitch, seeking both to the
 * same time, so the frame count and rate have to match exactly.
 *
 * The head has no 3D model behind it that this site can reach, so the mesh is
 * built from the picture, frame by frame:
 *   - points along the silhouette, sampled at fixed angles from its centre so
 *     they slide along the outline rather than jumping between frames;
 *   - points on an ellipsoid standing in for the skull, turned by the head's
 *     yaw, so the interior of the mesh travels with the face as it turns;
 *   - points on the strongest edges — eyes, brows, the line of the beard —
 *     so the triangles gather where the features are, as a modeller's would.
 * They are triangulated (Delaunay), and every triangle whose centre falls
 * outside the silhouette is dropped. The yaw comes from where the dark
 * features sit across the head, smoothed over time.
 *
 * If a real wireframe render of the same turn ever exists, drop it in at the
 * same path with the same frame count and rate; nothing else has to change.
 *
 * Needs sharp (already a dependency, through astro) and an ffmpeg with libx264.
 */
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const SRC = 'public/img/video/rotazione faccia.mp4';
const OUT = 'public/img/video/rotazione faccia wire.mp4';

const W = 1280;
const H = 720;
/**
 * Only the middle half of the frame is written: the head never leaves it, and
 * the black either side is most of what an all-keyframe encode spends bytes
 * on. The page places the clip over the same half of the colour one.
 */
const CROP_X = 320;
const CROP_W = 640;
// Analysis runs at half size; drawing at full.
const AW = W / 2;
const AH = H / 2;
const FPS = 24;

/* ------------------------------------------------------------ geometry */

/** Bowyer–Watson. A few hundred points a frame, so the plain version is plenty. */
function delaunay(points) {
  const big = 1e5;
  const pts = [...points, [-big, -big], [big * 2, -big], [0, big * 2]];
  const n = points.length;
  let tris = [[n, n + 1, n + 2]];

  const circum = (t) => {
    const [ax, ay] = pts[t[0]];
    const [bx, by] = pts[t[1]];
    const [cx, cy] = pts[t[2]];
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 1e-12) return { x: 0, y: 0, r: Infinity };
    const a2 = ax * ax + ay * ay;
    const b2 = bx * bx + by * by;
    const c2 = cx * cx + cy * cy;
    const x = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d;
    const y = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d;
    return { x, y, r: (x - ax) ** 2 + (y - ay) ** 2 };
  };

  let circles = tris.map(circum);
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[i];
    const bad = [];
    const keep = [];
    const keepC = [];
    tris.forEach((t, k) => {
      const c = circles[k];
      if ((px - c.x) ** 2 + (py - c.y) ** 2 < c.r) bad.push(t);
      else {
        keep.push(t);
        keepC.push(c);
      }
    });
    const edges = new Map();
    for (const t of bad) {
      for (const [a, b] of [
        [t[0], t[1]],
        [t[1], t[2]],
        [t[2], t[0]],
      ]) {
        const key = a < b ? `${a},${b}` : `${b},${a}`;
        edges.set(key, edges.has(key) ? null : [a, b]);
      }
    }
    tris = keep;
    circles = keepC;
    for (const e of edges.values()) {
      if (!e) continue;
      const t = [e[0], e[1], i];
      tris.push(t);
      circles.push(circum(t));
    }
  }
  return tris.filter((t) => t[0] < n && t[1] < n && t[2] < n);
}

function fibonacciSphere(count) {
  const out = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    out.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return out;
}

const SPHERE = fibonacciSphere(420);

/* ------------------------------------------------------------ analysis */

function analyse(rgb) {
  // Half-size luminance.
  const lum = new Float32Array(AW * AH);
  for (let y = 0; y < AH; y++) {
    for (let x = 0; x < AW; x++) {
      let s = 0;
      for (const [dx, dy] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]) {
        const i = ((y * 2 + dy) * W + (x * 2 + dx)) * 3;
        s += 0.2126 * rgb[i] + 0.7152 * rgb[i + 1] + 0.0722 * rgb[i + 2];
      }
      lum[y * AW + x] = s / (4 * 255);
    }
  }

  // Background is whatever dark region touches the frame edge; anything else,
  // dark pupils included, is head. A plain threshold punched holes at the eyes.
  const mask = new Uint8Array(AW * AH).fill(1);
  const stack = [];
  for (let x = 0; x < AW; x++) stack.push(x, (AH - 1) * AW + x);
  for (let y = 0; y < AH; y++) stack.push(y * AW, y * AW + AW - 1);
  while (stack.length) {
    const i = stack.pop();
    if (!mask[i] || lum[i] > 0.045) continue;
    mask[i] = 0;
    const x = i % AW;
    if (x > 0) stack.push(i - 1);
    if (x < AW - 1) stack.push(i + 1);
    if (i >= AW) stack.push(i - AW);
    if (i < AW * (AH - 1)) stack.push(i + AW);
  }
  // Compression leaves the odd speck above the threshold near the frame edge;
  // a column or row only counts as head with a few pixels in it.
  const cols = new Uint16Array(AW);
  const rows = new Uint16Array(AH);
  let sx = 0;
  let sy = 0;
  let count = 0;
  for (let y = 0; y < AH; y++) {
    for (let x = 0; x < AW; x++) {
      if (mask[y * AW + x]) {
        cols[x]++;
        rows[y]++;
        sx += x;
        sy += y;
        count++;
      }
    }
  }
  const SPECK = 6;
  let minX = cols.findIndex((c) => c > SPECK);
  let maxX = AW - 1 - [...cols].reverse().findIndex((c) => c > SPECK);
  let minY = rows.findIndex((c) => c > SPECK);
  let maxY = AH - 1 - [...rows].reverse().findIndex((c) => c > SPECK);
  // Specks outside the head go back to background.
  for (let y = 0; y < AH; y++) {
    for (let x = 0; x < AW; x++) {
      if (x < minX || x > maxX || y < minY || y > maxY) mask[y * AW + x] = 0;
    }
  }
  const cx = sx / count;
  const cy = sy / count;

  // Where the dark features (brows, eyes, beard) sit across the head says which
  // way it is facing.
  let fx = 0;
  let fn = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const v = lum[y * AW + x];
      if (mask[y * AW + x] && v < 0.22) {
        fx += x;
        fn++;
      }
    }
  }
  const facing = fn ? (fx / fn - (minX + maxX) / 2) / ((maxX - minX) / 2) : 0;

  // Edge strength.
  const edge = new Float32Array(AW * AH);
  for (let y = 1; y < AH - 1; y++) {
    for (let x = 1; x < AW - 1; x++) {
      const p = (xx, yy) => lum[yy * AW + xx];
      const gx = -p(x - 1, y - 1) - 2 * p(x - 1, y) - p(x - 1, y + 1) + p(x + 1, y - 1) + 2 * p(x + 1, y) + p(x + 1, y + 1);
      const gy = -p(x - 1, y - 1) - 2 * p(x, y - 1) - p(x + 1, y - 1) + p(x - 1, y + 1) + 2 * p(x, y + 1) + p(x + 1, y + 1);
      edge[y * AW + x] = Math.hypot(gx, gy);
    }
  }

  return { lum, mask, edge, box: { minX, maxX, minY, maxY }, cx, cy, facing };
}

function inside(mask, x, y) {
  const xi = Math.round(x);
  const yi = Math.round(y);
  return xi >= 0 && yi >= 0 && xi < AW && yi < AH && mask[yi * AW + xi] === 1;
}

/** Points for one frame, in analysis pixels. */
function pointsFor(a, yaw) {
  const pts = [];
  const { mask, edge, box, cx, cy } = a;

  // Silhouette: march out from the centre at fixed angles to the last inside pixel.
  const RAYS = 120;
  for (let i = 0; i < RAYS; i++) {
    const t = (i / RAYS) * Math.PI * 2;
    const dx = Math.cos(t);
    const dy = Math.sin(t);
    let last = null;
    for (let r = 2; r < 400; r += 0.75) {
      const x = cx + dx * r;
      const y = cy + dy * r;
      if (x < 0 || y < 0 || x >= AW || y >= AH) break;
      if (inside(mask, x, y)) last = [x, y];
    }
    if (last) pts.push(last);
  }

  // The skull stand-in: an ellipsoid the size of the head, turned by the yaw.
  const rx = (box.maxX - box.minX) * 0.46;
  const ry = (box.maxY - box.minY) * 0.52;
  const ecy = box.minY + ry;
  const ecx = (box.minX + box.maxX) / 2;
  const cyaw = Math.cos(yaw);
  const syaw = Math.sin(yaw);
  for (const [x, y, z] of SPHERE) {
    const x1 = x * cyaw + z * syaw;
    const z1 = -x * syaw + z * cyaw;
    if (z1 > -0.12) continue; // the side facing away, and the rim where points bunch up
    const px = ecx + x1 * rx;
    const py = ecy - y * ry;
    if (inside(mask, px, py)) pts.push([px, py]);
  }

  // Features: the strongest edge in each cell, if it is strong enough.
  const CELL = 9;
  for (let y0 = box.minY; y0 < box.maxY; y0 += CELL) {
    for (let x0 = box.minX; x0 < box.maxX; x0 += CELL) {
      let best = 0.42;
      let at = null;
      for (let y = y0; y < Math.min(y0 + CELL, AH - 1); y++) {
        for (let x = x0; x < Math.min(x0 + CELL, AW - 1); x++) {
          const e = edge[y * AW + x];
          if (e > best && mask[y * AW + x]) {
            best = e;
            at = [x, y];
          }
        }
      }
      if (at) pts.push(at);
    }
  }

  // Drop points closer than a few pixels to one already kept.
  const kept = [];
  const grid = new Map();
  const MIN = 4.2;
  for (const p of pts) {
    const gx = Math.floor(p[0] / MIN);
    const gy = Math.floor(p[1] / MIN);
    let close = false;
    for (let dy = -1; dy <= 1 && !close; dy++) {
      for (let dx = -1; dx <= 1 && !close; dx++) {
        for (const q of grid.get(`${gx + dx},${gy + dy}`) ?? []) {
          if ((q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 < MIN * MIN) close = true;
        }
      }
    }
    if (close) continue;
    kept.push(p);
    const key = `${gx},${gy}`;
    grid.set(key, [...(grid.get(key) ?? []), p]);
  }
  return kept;
}

/* --------------------------------------------------------------- drawing */

function svgFor(a, pts) {
  const tris = delaunay(pts).filter(([i, j, k]) => {
    const x = (pts[i][0] + pts[j][0] + pts[k][0]) / 3;
    const y = (pts[i][1] + pts[j][1] + pts[k][1]) / 3;
    const longest = Math.max(
      Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]),
      Math.hypot(pts[j][0] - pts[k][0], pts[j][1] - pts[k][1]),
      Math.hypot(pts[k][0] - pts[i][0], pts[k][1] - pts[i][1])
    );
    return inside(a.mask, x, y) && longest < 60;
  });

  const S = W / AW;
  const fill = [];
  const edges = new Map();
  for (const t of tris) {
    const [p, q, r] = t.map((i) => pts[i]);
    // A faint fill from the picture's own brightness keeps the volume readable.
    const v = a.lum[Math.round((p[1] + q[1] + r[1]) / 3) * AW + Math.round((p[0] + q[0] + r[0]) / 3)] ?? 0;
    // Flat-shaded from the picture: each face takes the brightness under it,
    // so the eyes, the nose and the beard still read through the wires.
    const g = Math.round(5 + Math.pow(v, 0.9) * 88);
    const d = `M${(p[0] * S).toFixed(1)} ${(p[1] * S).toFixed(1)}L${(q[0] * S).toFixed(1)} ${(q[1] * S).toFixed(1)}L${(r[0] * S).toFixed(1)} ${(r[1] * S).toFixed(1)}Z`;
    const c = `rgb(${Math.round(g * 0.92)},${Math.round(g * 0.86)},${Math.round(g * 1.08)})`;
    fill.push(`<path d="${d}" fill="${c}" stroke="${c}" stroke-width="0.6"/>`);
    for (const [i, j] of [
      [t[0], t[1]],
      [t[1], t[2]],
      [t[2], t[0]],
    ]) {
      const key = i < j ? `${i},${j}` : `${j},${i}`;
      edges.set(key, (edges.get(key) ?? 0) + 1);
    }
  }

  let inner = '';
  let outline = '';
  for (const [key, uses] of edges) {
    const [i, j] = key.split(',').map(Number);
    const seg = `M${(pts[i][0] * S).toFixed(1)} ${(pts[i][1] * S).toFixed(1)}L${(pts[j][0] * S).toFixed(1)} ${(pts[j][1] * S).toFixed(1)}`;
    // An edge only one triangle uses is on the outline.
    if (uses === 1) outline += seg;
    else inner += seg;
  }

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
      `<rect width="${W}" height="${H}" fill="#000"/>` +
      fill.join('') +
      `<path d="${inner}" fill="none" stroke="rgba(215,226,234,0.62)" stroke-width="1" stroke-linejoin="round"/>` +
      `<path d="${outline}" fill="none" stroke="#ff8a3d" stroke-width="1.6" stroke-linejoin="round"/>` +
      `</svg>`
  );
}

/* ------------------------------------------------------------------ run */

/** Decodes the clip and hands each frame, as RGB, to `each`. */
async function eachFrame(each) {
  const dec = spawn(FFMPEG, ['-loglevel', 'error', '-i', SRC, '-vf', `scale=${W}:${H}`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  const size = W * H * 3;
  let buf = Buffer.alloc(0);
  let n = 0;
  for await (const chunk of dec.stdout) {
    buf = Buffer.concat([buf, chunk]);
    while (buf.length >= size) {
      await each(buf.subarray(0, size), n++);
      buf = buf.subarray(size);
    }
  }
  return n;
}

async function main() {
  // Two passes over the clip rather than one: holding every frame's analysis
  // for the smoothing would take a few hundred megabytes.
  const raw = [];
  let left = W;
  let right = 0;
  await eachFrame((rgb) => {
    const a = analyse(rgb);
    raw.push(a.facing);
    left = Math.min(left, a.box.minX * 2);
    right = Math.max(right, a.box.maxX * 2);
  });
  console.log(`wire-head: measured ${raw.length} frames, head spans x ${left}–${right}`);
  if (left < CROP_X + 8 || right > CROP_X + CROP_W - 8) {
    throw new Error(`the head leaves the cropped band ${CROP_X}–${CROP_X + CROP_W}; widen CROP_W`);
  }

  // Facing, smoothed, then mapped to a yaw. The clip turns roughly 40 degrees
  // either side, so the extremes of the measure are pinned there.
  const smooth = raw.map((_, i) => {
    let s = 0;
    let n = 0;
    for (let k = -6; k <= 6; k++) {
      const v = raw[i + k];
      if (v !== undefined) {
        s += v;
        n++;
      }
    }
    return s / n;
  });
  const lo = Math.min(...smooth);
  const hi = Math.max(...smooth);
  const MAX_YAW = (42 * Math.PI) / 180;
  const yaws = smooth.map((v) => ((v - lo) / (hi - lo)) * 2 * MAX_YAW - MAX_YAW);

  const enc = spawn(
    FFMPEG,
    [
      '-loglevel', 'error', '-y',
      '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${W}x${H}`, '-r', String(FPS), '-i', '-',
      // Every frame a keyframe, like the colour clip: the page seeks, it never plays.
      '-vf', `crop=${CROP_W}:${H}:${CROP_X}:0`,
      '-c:v', 'libx264', '-g', '1', '-crf', '29', '-preset', 'veryslow', '-tune', 'animation',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', OUT,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] }
  );

  await eachFrame(async (rgb, i) => {
    const a = analyse(rgb);
    const pts = pointsFor(a, yaws[i]);
    const frame = await sharp(svgFor(a, pts)).removeAlpha().raw().toBuffer();
    if (!enc.stdin.write(frame)) await new Promise((r) => enc.stdin.once('drain', r));
    if (i % 40 === 0) console.log(`wire-head: frame ${i}, ${pts.length} points`);
  });
  enc.stdin.end();
  await new Promise((resolve, reject) => enc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)))));
  console.log(`wire-head: wrote ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
