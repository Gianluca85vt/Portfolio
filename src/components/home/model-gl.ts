/**
 * EVA-01 on a turntable, drawn with WebGL2, for the "Detail budget" lab.
 *
 * The model comes in levels of detail made by scripts/blender/detail_levels.py:
 * one small binary per triangle count (the layout is described there), gzipped
 * on disk. Positions arrive as 16-bit integers and normals as 8-bit ones, and
 * go to the GPU as they are; the shader scales them back.
 *
 * Three looks, as in any 3D viewport: the edges of every triangle, grey clay
 * for the shape, and the finished colours, cel-shaded with an ink outline like
 * the renders in the Work section.
 *
 * No library: three small programs, a few buffers, a handful of matrix helpers.
 */

export type Look = 'wire' | 'clay' | 'colour';
export type View = { yaw: number; pitch: number; sun: number; look: Look; smooth: boolean };

export type Model = {
  tris: number;
  index: Uint16Array | Uint32Array;
  pos: Int16Array;
  normal: Int8Array;
  colour: Uint8Array;
  centre: [number, number, number];
  half: [number, number, number];
  /** sRGB, 0 to 1, three per entry. */
  palette: Float32Array;
};

const MAGIC = 0x31564c44; // "DLV1"
const MAX_PALETTE = 16;

export function parseModel(buf: ArrayBuffer): Model {
  const dv = new DataView(buf);
  if (dv.getUint32(0, true) !== MAGIC) throw new Error('not a detail level');
  const nv = dv.getUint32(4, true);
  const ni = dv.getUint32(8, true);
  const big = (dv.getUint32(12, true) & 1) === 1;
  const f = (o: number) => dv.getFloat32(o, true);
  const centre: Model['centre'] = [f(16), f(20), f(24)];
  const half: Model['half'] = [f(28), f(32), f(36)];
  const np = dv.getUint32(40, true);
  const palette = new Float32Array(MAX_PALETTE * 3);
  for (let i = 0; i < Math.min(np, MAX_PALETTE); i++) {
    for (let c = 0; c < 3; c++) palette[i * 3 + c] = dv.getUint8(44 + i * 4 + c) / 255;
  }
  const align = (o: number) => (o + 3) & ~3;
  let o = 44 + np * 4;
  const index = big ? new Uint32Array(buf, o, ni) : new Uint16Array(buf, o, ni);
  o = align(o + ni * (big ? 4 : 2));
  const pos = new Int16Array(buf, o, nv * 3);
  o = align(o + nv * 6);
  const normal = new Int8Array(buf, o, nv * 3);
  o = align(o + nv * 3);
  const colour = new Uint8Array(buf, o, nv);
  return { tris: ni / 3, index, pos, normal, colour, centre, half, palette };
}

/** Fetches a level. The files are gzipped; a server that already undid that is fine too. */
export async function loadModel(url: string): Promise<Model> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  let buf = await res.arrayBuffer();
  const head = new Uint8Array(buf, 0, 2);
  if (head[0] === 0x1f && head[1] === 0x8b) {
    const plain = new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'));
    buf = await new Response(plain).arrayBuffer();
  }
  return parseModel(buf);
}

type Mat4 = Float32Array;

function perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function lookAt(eye: number[], target: number[], up: number[]): Mat4 {
  const z = norm([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = norm(cross(up, z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
  ]);
}

function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      out[c * 4 + r] = s;
    }
  }
  return out;
}

function rotateY(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: number[]) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

// Shared by the surface and the outline: the stored integers back to metres,
// then to the viewer's scale, where the model stands two units tall.
const UNPACK = `
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in float aColour;
uniform vec3 uCentre;
uniform vec3 uHalf;
uniform float uScale;
uniform mat4 uModel;
uniform mat4 uViewProj;
vec3 unpack() { return (uCentre + aPos * uHalf) * uScale; }
`;

const MODEL_VS = `#version 300 es
${UNPACK}
uniform vec3 uPalette[${MAX_PALETTE}];
out vec3 vWorld;
out vec3 vNormal;
out vec3 vAlbedo;
out float vHeight;
void main() {
  vec3 p = unpack();
  vHeight = p.y;
  vec4 w = uModel * vec4(p, 1.0);
  vWorld = w.xyz;
  vNormal = mat3(uModel) * aNormal;
  vAlbedo = uPalette[int(min(aColour, ${MAX_PALETTE - 1}.0))];
  gl_Position = uViewProj * w;
}`;

const MODEL_FS = `#version 300 es
precision highp float;
in vec3 vWorld;
in vec3 vNormal;
in vec3 vAlbedo;
in float vHeight;
uniform int uLook;      // 0 clay, 1 colour, 2 flat black (under the wireframe)
uniform bool uSmooth;
uniform vec3 uKey;
uniform vec3 uEye;
out vec4 outColor;

vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }

void main() {
  if (uLook == 2) {
    outColor = vec4(0.02, 0.02, 0.025, 1.0);
    return;
  }

  vec3 smoothN = normalize(vNormal);
  if (!gl_FrontFacing) smoothN = -smoothN;
  vec3 flatN = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  if (dot(flatN, smoothN) < 0.0) flatN = -flatN;
  vec3 N = uSmooth ? smoothN : flatN;

  vec3 L = normalize(uKey);
  vec3 V = normalize(uEye - vWorld);
  vec3 H = normalize(L + V);
  float ndl = dot(N, L);

  if (uLook == 1) {
    // Cel shading, as in the finished renders: each colour is either in the
    // light or in a cool shadow, with a line between them rather than a ramp.
    float w = max(fwidth(ndl), 0.002);
    float lit = smoothstep(-w, w, ndl - 0.04);
    vec3 shadow = vAlbedo * vec3(0.4, 0.36, 0.52);
    vec3 col = mix(shadow, vAlbedo, lit);
    // The greys are metal: a hard highlight on them, and a thinner one on the paint.
    float grey = 1.0 - smoothstep(0.04, 0.14, max(vAlbedo.r, max(vAlbedo.g, vAlbedo.b)) - min(vAlbedo.r, min(vAlbedo.g, vAlbedo.b)));
    float nh = dot(N, H);
    float hw = max(fwidth(nh), 0.002);
    col += lit * smoothstep(0.955 - hw, 0.955 + hw, nh) * mix(0.12, 0.3, grey);
    // A rim of light off the edges facing away from the key.
    float rim = smoothstep(0.66, 0.7, 1.0 - max(dot(N, V), 0.0)) * (1.0 - lit);
    col += rim * vec3(0.18, 0.12, 0.3);
    // The feet sit a little in their own shadow.
    col *= mix(0.8, 1.0, smoothstep(0.0, 0.25, vHeight));
    outColor = vec4(col, 1.0);
    return;
  }

  // Clay: plain grey under a key, a fill and the sky, to read the shape.
  vec3 albedo = lin(vec3(0.55));
  vec3 F = normalize(vec3(-L.x, 0.25, -L.z));
  float key = max(ndl, 0.0);
  float fill = max(dot(N, F), 0.0);
  vec3 sky = mix(vec3(0.02, 0.018, 0.025), vec3(0.1, 0.11, 0.14), N.y * 0.5 + 0.5);
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  float spec = pow(max(dot(N, H), 0.0), 28.0) * 0.06;
  float ao = mix(0.6, 1.0, smoothstep(0.0, 0.3, vHeight));
  vec3 keyCol = vec3(1.0, 0.92, 0.8) * 1.55;
  vec3 fillCol = vec3(0.55, 0.4, 0.9) * 0.28;
  vec3 rimCol = vec3(1.0, 0.5, 0.3) * 0.12;
  vec3 col = albedo * (keyCol * key + fillCol * fill + sky) * ao + rimCol * rim + keyCol * spec;
  col = vec3(1.0) - exp(-col * 1.05);
  outColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
}`;

// The ink line: the back faces, pushed out along their normals by a fixed
// number of pixels, drawn black behind the model.
const OUTLINE_VS = `#version 300 es
${UNPACK}
uniform vec2 uViewport;
uniform float uWidth;
void main() {
  vec4 clip = uViewProj * uModel * vec4(unpack(), 1.0);
  vec2 n = (uViewProj * vec4(mat3(uModel) * aNormal, 0.0)).xy;
  float l = length(n);
  if (l > 1e-5) clip.xy += n / l * uWidth / uViewport * 2.0 * clip.w;
  gl_Position = clip;
}`;

const OUTLINE_FS = `#version 300 es
precision mediump float;
out vec4 outColor;
void main() { outColor = vec4(0.03, 0.02, 0.05, 1.0); }`;

// Lines and the floor. Model edges arrive packed like the surface; the
// turntable and the shadow arrive as plain floats.
const FLAT_VS = `#version 300 es
layout(location = 0) in vec3 aPos;
uniform bool uPacked;
uniform vec3 uCentre;
uniform vec3 uHalf;
uniform float uScale;
uniform mat4 uModel;
uniform mat4 uViewProj;
out vec3 vLocal;
void main() {
  vLocal = uPacked ? (uCentre + aPos * uHalf) * uScale : aPos;
  gl_Position = uViewProj * uModel * vec4(vLocal, 1.0);
}`;

const FLAT_FS = `#version 300 es
precision highp float;
in vec3 vLocal;
uniform vec4 uColor;
uniform vec2 uShadow;  // shadow centre on the floor, when drawing the shadow quad
uniform bool uIsShadow;
out vec4 outColor;
void main() {
  if (uIsShadow) {
    vec2 d = (vLocal.xz - uShadow) / vec2(0.62, 0.5);
    float a = smoothstep(1.0, 0.0, length(d));
    outColor = vec4(0.0, 0.0, 0.0, a * a * 0.75);
    return;
  }
  outColor = uColor;
}`;

function compile(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const prog = gl.createProgram()!;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
    gl.attachShader(prog, sh);
  }
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
  return prog;
}

type GPUMesh = {
  vao: WebGLVertexArrayObject;
  count: number;
  type: number;
  edgeVao: WebGLVertexArrayObject;
  edges: number;
  edgeType: number;
};

const RING = [0.8, 0.58];

export class ModelRenderer {
  private gl: WebGL2RenderingContext;
  private surface: WebGLProgram;
  private outline: WebGLProgram;
  private flat: WebGLProgram;
  private meshes = new WeakMap<Model, GPUMesh>();
  private ring: { vao: WebGLVertexArrayObject; count: number; ticks: number };
  private shadow: WebGLVertexArrayObject;

  /** Throws when WebGL2 is not there; the caller shows a still instead. */
  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) throw new Error('no webgl2');
    this.gl = gl;
    this.surface = compile(gl, MODEL_VS, MODEL_FS);
    this.outline = compile(gl, OUTLINE_VS, OUTLINE_FS);
    this.flat = compile(gl, FLAT_VS, FLAT_FS);
    this.ring = this.buildRing();
    this.shadow = this.buildShadow();
  }

  private floats(data: Float32Array) {
    const gl = this.gl;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    return vao;
  }

  private buildRing() {
    const pts: number[] = [];
    const seg = 96;
    // Two circles as line segments, then the tick marks round the outer one.
    for (const r of RING) {
      for (let i = 0; i < seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const b = ((i + 1) / seg) * Math.PI * 2;
        pts.push(Math.cos(a) * r, 0, Math.sin(a) * r, Math.cos(b) * r, 0, Math.sin(b) * r);
      }
    }
    const count = pts.length / 3;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      pts.push(Math.cos(a) * RING[0], 0, Math.sin(a) * RING[0], Math.cos(a) * (RING[0] - 0.06), 0, Math.sin(a) * (RING[0] - 0.06));
    }
    return { vao: this.floats(new Float32Array(pts)), count, ticks: pts.length / 3 - count };
  }

  private buildShadow() {
    const s = 1.3;
    const y = 0.002;
    return this.floats(new Float32Array([-s, y, -s, s, y, -s, s, y, s, -s, y, -s, s, y, s, -s, y, s]));
  }

  private mesh(model: Model): GPUMesh {
    const hit = this.meshes.get(model);
    if (hit) return hit;
    const gl = this.gl;
    const nv = model.pos.length / 3;
    const big = model.index instanceof Uint32Array;

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, model.pos, gl.STATIC_DRAW);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.SHORT, true, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, model.normal, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.BYTE, true, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, model.colour, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.UNSIGNED_BYTE, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.index, gl.STATIC_DRAW);
    gl.bindVertexArray(null);

    // Each edge once, for the wireframe.
    const seen = new Set<number>();
    const edges: number[] = [];
    const ix = model.index;
    for (let t = 0; t < ix.length; t += 3) {
      for (let k = 0; k < 3; k++) {
        const a = ix[t + k];
        const b = ix[t + ((k + 1) % 3)];
        const key = a < b ? a * nv + b : b * nv + a;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push(a, b);
      }
    }
    const edgeVao = gl.createVertexArray()!;
    gl.bindVertexArray(edgeVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.SHORT, true, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, big ? new Uint32Array(edges) : new Uint16Array(edges), gl.STATIC_DRAW);
    gl.bindVertexArray(null);

    const type = big ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
    const m = { vao, count: ix.length, type, edgeVao, edges: edges.length, edgeType: type };
    this.meshes.set(model, m);
    return m;
  }

  /** Draws the turntable, and the model on it once there is one. */
  draw(model: Model | null, view: View) {
    const gl = this.gl;
    const c = this.canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(c.clientWidth * dpr);
    const h = Math.round(c.clientHeight * dpr);
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // The model stands two units tall with its feet at 0; the camera looks at
    // its middle from a little above, and keeps the whole height in frame
    // however narrow the stage gets.
    const aspect = w / h;
    const D = 3.9;
    const target = [0, 0.97, 0];
    const eye = [0, target[1] + Math.sin(view.pitch) * D, Math.cos(view.pitch) * D];
    const fov = aspect >= 0.75 ? 0.62 : 2 * Math.atan((Math.tan(0.31) * 0.75) / aspect);
    const viewProj = multiply(perspective(fov, aspect, 0.1, 50), lookAt(eye, target, [0, 1, 0]));
    const rot = rotateY(view.yaw);
    // 0 degrees puts the key light behind the camera; the slider walks it round.
    const key = norm([Math.sin(view.sun) * 0.85, 0.72, Math.cos(view.sun) * 0.85]);
    const scale = model ? 1 / model.half[1] : 1;

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.CULL_FACE);

    // Floor first: the turntable and, under a lit model, its shadow.
    gl.useProgram(this.flat);
    const fl = (n: string) => gl.getUniformLocation(this.flat, n);
    gl.uniformMatrix4fv(fl('uViewProj'), false, viewProj);
    gl.uniformMatrix4fv(fl('uModel'), false, rot);
    gl.uniform1i(fl('uPacked'), 0);
    gl.depthMask(false);
    gl.uniform1i(fl('uIsShadow'), 0);
    gl.bindVertexArray(this.ring.vao);
    gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.2);
    gl.drawArrays(gl.LINES, 0, this.ring.count);
    gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.3);
    gl.drawArrays(gl.LINES, this.ring.count, this.ring.ticks);
    if (model && view.look !== 'wire') {
      // The shadow is laid in the model's own frame, so pull the light back into it.
      const s = [-key[0] * 0.3, -key[2] * 0.3];
      const cy = Math.cos(view.yaw);
      const sy = Math.sin(view.yaw);
      gl.uniform1i(fl('uIsShadow'), 1);
      gl.uniform2f(fl('uShadow'), s[0] * cy - s[1] * sy, s[0] * sy + s[1] * cy);
      gl.bindVertexArray(this.shadow);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.uniform1i(fl('uIsShadow'), 0);
    }
    gl.depthMask(true);
    if (!model) {
      gl.bindVertexArray(null);
      return;
    }

    const m = this.mesh(model);
    const packed = (prog: WebGLProgram) => {
      const u = (n: string) => gl.getUniformLocation(prog, n);
      gl.uniform3fv(u('uCentre'), model.centre);
      gl.uniform3fv(u('uHalf'), model.half);
      gl.uniform1f(u('uScale'), scale);
      gl.uniformMatrix4fv(u('uViewProj'), false, viewProj);
      gl.uniformMatrix4fv(u('uModel'), false, rot);
      return u;
    };

    gl.useProgram(this.surface);
    const sl = packed(this.surface);
    gl.uniform3fv(sl('uKey'), key);
    gl.uniform3fv(sl('uEye'), eye);
    gl.uniform3fv(sl('uPalette'), model.palette);
    gl.uniform1i(sl('uSmooth'), view.smooth ? 1 : 0);
    gl.uniform1i(sl('uLook'), view.look === 'clay' ? 0 : view.look === 'colour' ? 1 : 2);

    if (view.look === 'wire') {
      // Denser meshes get fainter lines, or the top level is a solid sheet.
      const dense = Math.log2(Math.max(model.tris, 500) / 500) / 8;
      // The far side's edges faintly, through the model...
      gl.useProgram(this.flat);
      packed(this.flat);
      gl.uniform1i(fl('uPacked'), 1);
      gl.disable(gl.DEPTH_TEST);
      gl.bindVertexArray(m.edgeVao);
      gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.07 - 0.05 * dense);
      gl.drawElements(gl.LINES, m.edges, m.edgeType, 0);
      gl.enable(gl.DEPTH_TEST);
      // ...then a black body to hide them where the near side is, pushed back
      // a hair so the near edges win the depth test cleanly...
      gl.useProgram(this.surface);
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(1, 1);
      gl.bindVertexArray(m.vao);
      gl.drawElements(gl.TRIANGLES, m.count, m.type, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);
      // ...and the near edges bright.
      gl.useProgram(this.flat);
      gl.bindVertexArray(m.edgeVao);
      gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.85 - 0.4 * dense);
      gl.drawElements(gl.LINES, m.edges, m.edgeType, 0);
      gl.uniform1i(fl('uPacked'), 0);
    } else {
      gl.bindVertexArray(m.vao);
      gl.drawElements(gl.TRIANGLES, m.count, m.type, 0);
      if (view.look === 'colour') {
        gl.useProgram(this.outline);
        const ol = packed(this.outline);
        gl.uniform2f(ol('uViewport'), w, h);
        gl.uniform1f(ol('uWidth'), 1.4 * dpr);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        gl.drawElements(gl.TRIANGLES, m.count, m.type, 0);
        gl.disable(gl.CULL_FACE);
      }
    }
    gl.bindVertexArray(null);
  }

  dispose() {
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
