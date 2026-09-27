/**
 * The rock, drawn with WebGL2.
 *
 * The 2D canvas in rock.ts can only fill a triangle with one flat colour,
 * which is enough for facets and not for anything else. Here the same mesh
 * gets per-pixel light, a smooth-shading switch, and a material: stone with a
 * cap of moss where the surface faces up, the edge between them broken up by
 * noise and darkened where the moss holds the damp, as it does on a real rock.
 *
 * The texture is procedural and computed in the rock's own space, so it is
 * glued to the surface as it turns. (It was the lack of that which made the
 * old colour view flicker: its noise was read in camera space, and changed
 * every frame the rock moved.)
 *
 * No library: two small programs, a handful of buffers, a few matrix helpers.
 */
import { buildRock } from './rock';
import type { Look } from './rock';

export type GLView = { yaw: number; pitch: number; sun: number; look: Look; smooth: boolean };

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

const ROCK_VS = `#version 300 es
in vec3 aPos;
in vec3 aNormal;
uniform mat4 uModel;
uniform mat4 uViewProj;
out vec3 vObj;
out vec3 vWorld;
out vec3 vNormal;
void main() {
  vObj = aPos;
  vec4 w = uModel * vec4(aPos, 1.0);
  vWorld = w.xyz;
  vNormal = mat3(uModel) * aNormal;
  gl_Position = uViewProj * w;
}`;

const ROCK_FS = `#version 300 es
precision highp float;
in vec3 vObj;
in vec3 vWorld;
in vec3 vNormal;
uniform int uLook;      // 0 clay, 1 colour, 2 flat black (under the wireframe)
uniform bool uSmooth;
uniform vec3 uKey;
uniform vec3 uEye;
out vec4 outColor;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float s = 0.0;
  float a = 0.5;
  for (int o = 0; o < 5; o++) {
    s += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return s;
}
vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }

void main() {
  if (uLook == 2) {
    outColor = vec4(0.02, 0.02, 0.025, 1.0);
    return;
  }

  vec3 smoothN = normalize(vNormal);
  vec3 flatN = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  if (dot(flatN, smoothN) < 0.0) flatN = -flatN;
  vec3 N = uSmooth ? smoothN : flatN;

  vec3 p = vObj * 2.4;
  float n1 = fbm(p);
  float n2 = fbm(p * 4.0 + 7.3);

  // Stone: two greys and a warm one, strata, and thin cracks.
  vec3 rock = mix(lin(vec3(0.27, 0.26, 0.25)), lin(vec3(0.46, 0.44, 0.41)), smoothstep(0.3, 0.7, n1));
  rock = mix(rock, lin(vec3(0.5, 0.43, 0.36)), smoothstep(0.6, 0.85, n2) * 0.5);
  rock *= 0.9 + 0.1 * sin(vObj.y * 22.0 + n1 * 7.0);
  float crack = smoothstep(0.035, 0.0, abs(fbm(p * 1.7 + 3.1) - 0.5));
  rock *= 1.0 - crack * 0.55;

  // Moss where the surface faces up. The edge wanders with noise, and just
  // below it the stone is darker, where the moss keeps it wet.
  float edge = N.y + (fbm(p * 2.6 + 11.0) - 0.5) * 0.9;
  float moss = smoothstep(0.5, 0.68, edge);
  float damp = smoothstep(0.2, 0.5, edge) * (1.0 - moss);
  vec3 mossCol = mix(lin(vec3(0.17, 0.24, 0.08)), lin(vec3(0.33, 0.41, 0.14)), fbm(p * 7.0));
  mossCol *= 0.7 + 0.45 * noise(p * 38.0);
  vec3 albedo = mix(rock * (1.0 - damp * 0.45), mossCol, moss);
  if (uLook == 0) {
    albedo = lin(vec3(0.55));
    moss = 0.0;
  }

  vec3 L = normalize(uKey);
  vec3 V = normalize(uEye - vWorld);
  vec3 F = normalize(vec3(-L.x, 0.25, -L.z));
  float key = max(dot(N, L), 0.0);
  float fill = max(dot(N, F), 0.0);
  vec3 sky = mix(vec3(0.02, 0.018, 0.025), vec3(0.1, 0.11, 0.14), N.y * 0.5 + 0.5);
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), 28.0) * (1.0 - moss) * (uLook == 0 ? 0.06 : 0.08);
  // The underside sits in its own shadow.
  float ao = mix(0.45, 1.0, smoothstep(-0.55, 0.35, vObj.y));

  vec3 keyCol = vec3(1.0, 0.92, 0.8) * 1.55;
  vec3 fillCol = vec3(0.55, 0.4, 0.9) * 0.28;
  vec3 rimCol = vec3(1.0, 0.5, 0.3) * 0.12;
  vec3 col = albedo * (keyCol * key + fillCol * fill + sky) * ao + rimCol * rim + keyCol * spec;
  col = vec3(1.0) - exp(-col * 1.05);
  outColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
}`;

const FLAT_VS = `#version 300 es
in vec3 aPos;
uniform mat4 uModel;
uniform mat4 uViewProj;
out vec3 vLocal;
void main() {
  vLocal = aPos;
  gl_Position = uViewProj * uModel * vec4(aPos, 1.0);
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
    vec2 d = (vLocal.xz - uShadow) / vec2(1.25, 0.95);
    float a = smoothstep(1.0, 0.0, length(d));
    outColor = vec4(0.0, 0.0, 0.0, a * a * 0.8);
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

type GPUMesh = { vao: WebGLVertexArrayObject; tris: number; edgeVao: WebGLVertexArrayObject; edges: number };

const FLOOR_Y = -0.62;

export class RockRenderer {
  private gl: WebGL2RenderingContext;
  private rock: WebGLProgram;
  private flat: WebGLProgram;
  private meshes = new Map<number, GPUMesh>();
  private ring: { vao: WebGLVertexArrayObject; count: number; ticks: number };
  private shadow: WebGLVertexArrayObject;

  /** Throws when WebGL2 is not there; the caller falls back to the 2D rock. */
  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) throw new Error('no webgl2');
    this.gl = gl;
    this.rock = compile(gl, ROCK_VS, ROCK_FS);
    this.flat = compile(gl, FLAT_VS, FLAT_FS);
    this.ring = this.buildRing();
    this.shadow = this.buildShadow();
  }

  private attrib(prog: WebGLProgram, name: string, data: Float32Array, size: number) {
    const gl = this.gl;
    const loc = gl.getAttribLocation(prog, name);
    if (loc < 0) return;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  private buildRing() {
    const gl = this.gl;
    const pts: number[] = [];
    const seg = 96;
    // Two circles as line segments, then the tick marks round the outer one.
    for (const r of [1.75, 1.25]) {
      for (let i = 0; i < seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const b = ((i + 1) / seg) * Math.PI * 2;
        pts.push(Math.cos(a) * r, FLOOR_Y, Math.sin(a) * r, Math.cos(b) * r, FLOOR_Y, Math.sin(b) * r);
      }
    }
    const count = pts.length / 3;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      pts.push(Math.cos(a) * 1.75, FLOOR_Y, Math.sin(a) * 1.75, Math.cos(a) * 1.62, FLOOR_Y, Math.sin(a) * 1.62);
    }
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    this.attrib(this.flat, 'aPos', new Float32Array(pts), 3);
    gl.bindVertexArray(null);
    return { vao, count, ticks: pts.length / 3 - count };
  }

  private buildShadow() {
    const gl = this.gl;
    const s = 2.4;
    const y = FLOOR_Y + 0.002;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    this.attrib(this.flat, 'aPos', new Float32Array([-s, y, -s, s, y, -s, s, y, s, -s, y, -s, s, y, s, -s, y, s]), 3);
    gl.bindVertexArray(null);
    return vao;
  }

  private mesh(level: number): GPUMesh {
    const hit = this.meshes.get(level);
    if (hit) return hit;
    const gl = this.gl;
    const { pos, faces } = buildRock(level);

    // Smooth normals: each vertex averages the faces around it, weighted by area.
    const normals = new Float32Array(pos.length);
    for (let t = 0; t < faces.length; t += 3) {
      const [a, b, c] = [faces[t] * 3, faces[t + 1] * 3, faces[t + 2] * 3];
      const e1 = [pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]];
      const e2 = [pos[c] - pos[a], pos[c + 1] - pos[a + 1], pos[c + 2] - pos[a + 2]];
      const n = cross(e1, e2);
      for (const v of [a, b, c]) {
        normals[v] += n[0];
        normals[v + 1] += n[1];
        normals[v + 2] += n[2];
      }
    }
    for (let i = 0; i < normals.length; i += 3) {
      const n = norm([normals[i], normals[i + 1], normals[i + 2]]);
      normals.set(n, i);
    }

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    this.attrib(this.rock, 'aPos', pos, 3);
    this.attrib(this.rock, 'aNormal', normals, 3);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);
    gl.bindVertexArray(null);

    // Each edge once, for the wireframe.
    const seen = new Set<number>();
    const edges: number[] = [];
    const n = pos.length / 3;
    for (let t = 0; t < faces.length; t += 3) {
      for (const [a, b] of [
        [faces[t], faces[t + 1]],
        [faces[t + 1], faces[t + 2]],
        [faces[t + 2], faces[t]],
      ]) {
        const key = a < b ? a * n + b : b * n + a;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push(a, b);
      }
    }
    const edgeVao = gl.createVertexArray()!;
    gl.bindVertexArray(edgeVao);
    this.attrib(this.flat, 'aPos', pos, 3);
    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW);
    gl.bindVertexArray(null);

    const m = { vao, tris: faces.length, edgeVao, edges: edges.length };
    this.meshes.set(level, m);
    return m;
  }

  draw(level: number, view: GLView) {
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

    // Framed like the 2D version: the rock fills about the same share of the
    // stage whatever its shape, with the camera a little above it.
    const aspect = w / h;
    const D = 4.4;
    const eye = [0, Math.sin(view.pitch) * D, Math.cos(view.pitch) * D];
    const fov = aspect >= 1 ? 0.62 : 2 * Math.atan(Math.tan(0.31) / aspect);
    const viewProj = multiply(perspective(fov, aspect, 0.1, 50), lookAt(eye, [0, -0.08, 0], [0, 1, 0]));
    const model = rotateY(view.yaw);
    // 0 degrees puts the key light behind the camera; the slider walks it round.
    const key = norm([Math.sin(view.sun) * 0.85, 0.72, Math.cos(view.sun) * 0.85]);

    const m = this.mesh(level);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Floor first: the turntable and, under a lit rock, its shadow.
    gl.useProgram(this.flat);
    const fl = (n: string) => gl.getUniformLocation(this.flat, n);
    gl.uniformMatrix4fv(fl('uViewProj'), false, viewProj);
    gl.uniformMatrix4fv(fl('uModel'), false, model);
    gl.depthMask(false);
    gl.uniform1i(fl('uIsShadow'), 0);
    gl.bindVertexArray(this.ring.vao);
    gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.2);
    gl.drawArrays(gl.LINES, 0, this.ring.count);
    gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.3);
    gl.drawArrays(gl.LINES, this.ring.count, this.ring.ticks);
    if (view.look !== 'wire') {
      // The shadow is laid in the rock's own frame, so pull the light back into it.
      const s = [-key[0] * 0.45, -key[2] * 0.45];
      const cy = Math.cos(view.yaw);
      const sy = Math.sin(view.yaw);
      gl.uniform1i(fl('uIsShadow'), 1);
      gl.uniform2f(fl('uShadow'), s[0] * cy - s[1] * sy, s[0] * sy + s[1] * cy);
      gl.bindVertexArray(this.shadow);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.uniform1i(fl('uIsShadow'), 0);
    }
    gl.depthMask(true);

    gl.useProgram(this.rock);
    const rl = (n: string) => gl.getUniformLocation(this.rock, n);
    gl.uniformMatrix4fv(rl('uViewProj'), false, viewProj);
    gl.uniformMatrix4fv(rl('uModel'), false, model);
    gl.uniform3fv(rl('uKey'), key);
    gl.uniform3fv(rl('uEye'), eye);
    gl.uniform1i(rl('uSmooth'), view.smooth ? 1 : 0);
    gl.uniform1i(rl('uLook'), view.look === 'clay' ? 0 : view.look === 'colour' ? 1 : 2);

    if (view.look === 'wire') {
      // The far side's edges faintly, through the rock...
      gl.useProgram(this.flat);
      gl.disable(gl.DEPTH_TEST);
      gl.bindVertexArray(m.edgeVao);
      gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.08);
      gl.drawElements(gl.LINES, m.edges, gl.UNSIGNED_SHORT, 0);
      gl.enable(gl.DEPTH_TEST);
      // ...then a black body to hide them where the near side is, pushed back
      // a hair so the near edges win the depth test cleanly...
      gl.useProgram(this.rock);
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(1, 1);
      gl.bindVertexArray(m.vao);
      gl.drawElements(gl.TRIANGLES, m.tris, gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);
      // ...and the near edges bright.
      gl.useProgram(this.flat);
      gl.bindVertexArray(m.edgeVao);
      gl.uniform4f(fl('uColor'), 0.84, 0.89, 0.92, 0.8);
      gl.drawElements(gl.LINES, m.edges, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.bindVertexArray(m.vao);
      gl.drawElements(gl.TRIANGLES, m.tris, gl.UNSIGNED_SHORT, 0);
    }
    gl.bindVertexArray(null);
  }

  dispose() {
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
