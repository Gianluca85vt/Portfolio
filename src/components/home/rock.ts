/**
 * A rock, drawn with nothing but the 2D canvas.
 *
 * An icosahedron subdivided 0–4 times (20 to 5,120 triangles), pushed in and
 * out by a noise field sampled on the unit sphere. Every level reads the same
 * field, so adding detail refines one rock rather than growing a new one —
 * which is the point the demo makes. No WebGL and no library: at these counts
 * a painter's sort and a fill per triangle holds 60fps on a laptop and is
 * cheap enough to pause the moment the rock is off screen.
 */

export type Mesh = { pos: Float32Array; faces: Uint16Array };
export type Look = 'wire' | 'clay' | 'colour';

type V3 = [number, number, number];

const norm = ([x, y, z]: V3): V3 => {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
};

function hash(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

const smooth = (t: number) => t * t * (3 - 2 * t);

function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const w = smooth(z - zi);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w
  );
}

function fbm(x: number, y: number, z: number) {
  let sum = 0;
  let amp = 0.55;
  let f = 1.3;
  for (let o = 0; o < 4; o++) {
    sum += amp * (noise(x * f + 11.3, y * f + 3.7, z * f + 7.1) - 0.5);
    f *= 2.1;
    amp *= 0.48;
  }
  return sum;
}

/** Where the surface sits along a direction from the centre. */
function surface(d: V3): V3 {
  const r = 1 + fbm(d[0], d[1], d[2]) * 0.9;
  // Wider than tall and a flatter underside, so it sits like a stone.
  const y = d[1] < 0 ? d[1] * 0.55 : d[1] * 0.78;
  return [d[0] * r * 1.1, y * r, d[2] * r * 0.95];
}

export function buildRock(level: number): Mesh {
  const t = (1 + Math.sqrt(5)) / 2;
  const dirs: V3[] = (
    [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
    ] as V3[]
  ).map(norm);
  let faces: number[][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  for (let l = 0; l < level; l++) {
    const cache = new Map<string, number>();
    const mid = (a: number, b: number) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      const hit = cache.get(key);
      if (hit !== undefined) return hit;
      const [p, q] = [dirs[a], dirs[b]];
      dirs.push(norm([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2]));
      cache.set(key, dirs.length - 1);
      return dirs.length - 1;
    };
    const next: number[][] = [];
    for (const [a, b, c] of faces) {
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }

  const pos = new Float32Array(dirs.length * 3);
  dirs.forEach((d, i) => pos.set(surface(d), i * 3));
  return { pos, faces: Uint16Array.from(faces.flat()) };
}

export type View = {
  yaw: number;
  pitch: number;
  /** Direction of the key light around the rock, in radians. */
  sun: number;
  look: Look;
};

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Draws one frame. `w` and `h` are in CSS pixels; the context is already scaled. */
export function drawRock(ctx: CanvasRenderingContext2D, mesh: Mesh, w: number, h: number, view: View) {
  const { yaw, pitch, sun, look } = view;
  ctx.clearRect(0, 0, w, h);

  const D = 4.2;
  const f = Math.min(w, h) * 1.3;
  const cx = w / 2;
  const cy = h * 0.5;

  const cyw = Math.cos(yaw);
  const syw = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  const toView = (x: number, y: number, z: number): V3 => {
    const x1 = x * cyw + z * syw;
    const z1 = -x * syw + z * cyw;
    // Tilted so the camera looks down on the rock, the way it sits on a desk.
    const y2 = y * cp + z1 * sp;
    const z2 = -y * sp + z1 * cp;
    return [x1, y2, z2];
  };
  const project = (p: V3) => {
    const s = f / (p[2] + D);
    return [cx + p[0] * s, cy - p[1] * s];
  };

  // Turntable: a ring under the rock that turns with it.
  const floorY = -0.62;
  ctx.lineWidth = 1;
  for (const [r, a] of [
    [1.75, 0.22],
    [1.25, 0.1],
  ] as const) {
    ctx.beginPath();
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      const [px, py] = project(toView(Math.cos(t) * r, floorY, Math.sin(t) * r));
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(215,226,234,${a})`;
    ctx.stroke();
  }
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 2;
    const [ax, ay] = project(toView(Math.cos(t) * 1.75, floorY, Math.sin(t) * 1.75));
    const [bx, by] = project(toView(Math.cos(t) * 1.62, floorY, Math.sin(t) * 1.62));
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.strokeStyle = i === 0 ? 'rgba(255,138,61,0.9)' : 'rgba(215,226,234,0.22)';
    ctx.stroke();
  }

  // Light in view space: a turntable under fixed studio lights. `sun` walks
  // the key light round the rock — 0 is from the camera, 180 from behind.
  const L = norm([Math.sin(sun) * 0.85, 0.7, -Math.cos(sun) * 0.85]);
  const F = norm([-L[0], 0.2, -L[2]]);

  // Contact shadow, pushed away from the light.
  if (look !== 'wire') {
    const fc = toView(0, floorY, 0);
    const [sx, sy] = project([fc[0] - L[0] * 0.45, fc[1], fc[2] - L[2] * 0.45]);
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, f * 0.3);
    g.addColorStop(0, 'rgba(0,0,0,0.75)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(1, 0.32);
    ctx.translate(-sx, -sy);
    ctx.fillStyle = g;
    ctx.fillRect(sx - f * 0.3, sy - f * 0.3, f * 0.6, f * 0.6);
    ctx.restore();
  }

  const { pos, faces } = mesh;
  const n = pos.length / 3;
  const vx = new Float32Array(n * 3);
  const sx = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const p = toView(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
    vx[i * 3] = p[0];
    vx[i * 3 + 1] = p[1];
    vx[i * 3 + 2] = p[2];
    const [px, py] = project(p);
    sx[i * 2] = px;
    sx[i * 2 + 1] = py;
  }

  const count = faces.length / 3;
  const order: number[] = [];
  const depth = new Float32Array(count);
  const front = new Uint8Array(count);
  const shade = new Float32Array(count * 3);

  for (let t = 0; t < count; t++) {
    const a = faces[t * 3] * 3;
    const b = faces[t * 3 + 1] * 3;
    const c = faces[t * 3 + 2] * 3;
    const e1x = vx[b] - vx[a], e1y = vx[b + 1] - vx[a + 1], e1z = vx[b + 2] - vx[a + 2];
    const e2x = vx[c] - vx[a], e2y = vx[c + 1] - vx[a + 1], e2z = vx[c + 2] - vx[a + 2];
    let nx = e1y * e2z - e1z * e2y;
    let ny = e1z * e2x - e1x * e2z;
    let nz = e1x * e2y - e1y * e2x;
    const nl = Math.hypot(nx, ny, nz) || 1;
    nx /= nl;
    ny /= nl;
    nz /= nl;
    const mx = (vx[a] + vx[b] + vx[c]) / 3;
    const my = (vx[a + 1] + vx[b + 1] + vx[c + 1]) / 3;
    const mz = (vx[a + 2] + vx[b + 2] + vx[c + 2]) / 3;
    // Facing the camera when the normal points back along the line of sight.
    const facing = nx * mx + ny * my + nz * (mz + D) < 0;
    front[t] = facing ? 1 : 0;
    depth[t] = mz;
    if (!facing && look !== 'wire') continue;
    order.push(t);

    const key = clamp01(nx * L[0] + ny * L[1] + nz * L[2]);
    const fill = clamp01(nx * F[0] + ny * F[1] + nz * F[2]);
    const rim = Math.pow(clamp01(1 + nz), 3) * 0.35;
    if (look === 'clay') {
      const v = 0.1 + key * 0.72 + fill * 0.08 + rim * 0.3;
      shade[t * 3] = shade[t * 3 + 1] = shade[t * 3 + 2] = v * 205;
    } else if (look === 'colour') {
      // Warm key, magenta fill, a purple rim: the site's own palette as light.
      // The grain is read at the face's position on the rock, not on screen,
      // so it stays put as the rock turns instead of flickering.
      const oa = faces[t * 3] * 3;
      const grain = 0.85 + hash(pos[oa] * 9, pos[oa + 1] * 9, pos[oa + 2] * 9) * 0.3;
      const base = [0.5 * grain, 0.46 * grain, 0.43 * grain];
      shade[t * 3] = (base[0] * (0.08 + key * 1.05 * 1.0 + fill * 0.5 * 0.71) + rim * 0.46) * 255;
      shade[t * 3 + 1] = (base[1] * (0.07 + key * 1.05 * 0.6 + fill * 0.5 * 0.0) + rim * 0.13) * 255;
      shade[t * 3 + 2] = (base[2] * (0.1 + key * 1.05 * 0.32 + fill * 0.5 * 0.66) + rim * 0.69) * 255;
    }
  }

  order.sort((p, q) => depth[q] - depth[p]);

  const tri = (t: number) => {
    const a = faces[t * 3] * 2;
    const b = faces[t * 3 + 1] * 2;
    const c = faces[t * 3 + 2] * 2;
    ctx.beginPath();
    ctx.moveTo(sx[a], sx[a + 1]);
    ctx.lineTo(sx[b], sx[b + 1]);
    ctx.lineTo(sx[c], sx[c + 1]);
    ctx.closePath();
  };

  ctx.lineJoin = 'round';
  if (look === 'wire') {
    ctx.lineWidth = 0.8;
    for (const t of order) {
      tri(t);
      if (front[t]) {
        ctx.fillStyle = '#050505';
        ctx.fill();
        ctx.strokeStyle = 'rgba(215,226,234,0.75)';
      } else {
        ctx.strokeStyle = 'rgba(215,226,234,0.1)';
      }
      ctx.stroke();
    }
    return;
  }

  // Each triangle is stroked in its own colour as well as filled, which closes
  // the hairline seams the canvas leaves between neighbouring fills.
  ctx.lineWidth = 0.9;
  for (const t of order) {
    const r = Math.min(255, shade[t * 3]) | 0;
    const g = Math.min(255, shade[t * 3 + 1]) | 0;
    const b = Math.min(255, shade[t * 3 + 2]) | 0;
    const col = `rgb(${r},${g},${b})`;
    tri(t);
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
    ctx.fill();
    ctx.stroke();
  }
}
