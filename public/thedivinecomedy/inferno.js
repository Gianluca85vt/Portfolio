// inferno.js — la mappa 3D dei nove cerchi per il sito di The Divine Comedy.
//
// Sorgente in Marketing/sito/; sito.py la copia in public/thedivinecomedy/ del portfolio.
// La pagina fornisce: #tdc-stage (contenitore), #tdc-canvas, i dati dei cerchi in
// <script id="tdc-cerchi" type="application/json">, i pulsanti dell'indice (.tdc-index [data-id])
// e il pannello #tdc-panel. Three.js arriva da jsDelivr con la import map della pagina.
//
// La forma: un imbuto di nove terrazze concentriche che scendono verso il centro (il Cocito
// ghiacciato con Lucifero), la porta e l'Acheronte sul bordo, la selva oscura tutt'intorno in alto.
// Ogni cerchio ha una luce: il pulsante che ci sta sopra apre la scheda del peccato.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const stage = document.getElementById('tdc-stage');
const canvas = document.getElementById('tdc-canvas');
const pinsLayer = document.getElementById('tdc-pins');
const panel = document.getElementById('tdc-panel');
const CERCHI = JSON.parse(document.getElementById('tdc-cerchi').textContent);
const ETICHETTE = JSON.parse(document.getElementById('tdc-etichette').textContent);
const quiete = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const piccolo = Math.min(window.innerWidth, window.innerHeight) < 700;

// ---------------------------------------------------------------- forma dell'imbuto
// Raggi dei bordi (dall'esterno): bordo della selva, poi l'inizio di ogni cerchio.
const BORDO_SELVA = 92;
const BORDI = [84, 75, 67, 59.5, 52.5, 45.5, 38, 30, 21.5]; // inizio dei cerchi I..IX
const SALTI = [3, 7, 6, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 8];   // quanto scende ogni gradino
const PAVIMENTI = [];                                       // quota del pavimento di ogni cerchio
{ let q = -SALTI[0]; for (let k = 0; k < 9; k++) { q -= SALTI[k + 1]; PAVIMENTI.push(q); } }

// Rumore di valore 2D (deterministico: la mappa è sempre la stessa)
function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function rumore(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, ottave = 4) {
  let s = 0, amp = 0.5, f = 1;
  for (let i = 0; i < ottave; i++) { s += amp * (rumore(x * f, y * f) - 0.5); f *= 2.03; amp *= 0.5; }
  return s;
}
const liscio = (a, b, x) => { const t = Math.min(1, Math.max(0, (a - x) / (a - b))); return t * t * (3 - 2 * t); };

// Quota del terreno nel punto (x, z)
function quota(x, z) {
  const r0 = Math.hypot(x, z);
  const ang = Math.atan2(z, x);
  // bordi irregolari: il raggio "vero" ondeggia con l'angolo
  const r = r0 + 1.6 * fbm(Math.cos(ang) * 2.2 + 7, Math.sin(ang) * 2.2 + 3, 3) * 2;
  let h = 0;
  // la selva: colline che salgono verso l'orizzonte
  if (r > BORDO_SELVA) h += (r - BORDO_SELVA) * 0.09 + 3.2 * fbm(x * 0.03, z * 0.03, 4) * 2;
  // i gradini
  const bordi = [BORDO_SELVA, ...BORDI];
  let vicino = 0;
  for (let k = 0; k < bordi.length; k++) {
    const e = bordi[k];
    h -= SALTI[k] * liscio(e + 1.3, e - 1.3, r);
    h += 1.1 * Math.exp(-(((r - (e + 1.7)) / 1.1) ** 2)); // labbro rialzato sul bordo
    vicino = Math.max(vicino, Math.exp(-(((r - e) / 2.4) ** 2)));
  }
  // l'Acheronte: un solco nel vestibolo
  h -= 1.3 * Math.exp(-(((r - 87.6) / 1.1) ** 2));
  // la palude dello Stige (cerchio V): il pavimento si avvalla
  h -= 1.1 * Math.exp(-(((r - 49) / 1.6) ** 2));
  // Lucifero: un'altura scura al centro del ghiaccio
  h += 9 * Math.exp(-((r0 / 2.4) ** 2));
  // rocce: più forti sulle pareti
  h += (0.45 + 1.7 * vicino) * fbm(x * 0.22, z * 0.22, 4) * 2;
  return { h, r, vicino };
}

// ---------------------------------------------------------------- renderer e scena
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: !piccolo, powerPreference: 'high-performance' });
} catch (e) {
  stage.classList.add('nogl');
  stage.classList.remove('loading');
  throw e;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, piccolo ? 1.5 : 1.75));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scena = new THREE.Scene();
const NOTTE = new THREE.Color('#07080d');
scena.background = NOTTE;
scena.fog = new THREE.FogExp2(new THREE.Color('#0c1020'), 0.0052);

const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 900);
const VISTA = { pos: new THREE.Vector3(0, 98, 182), target: new THREE.Vector3(0, -30, 0) };
const INIZIO = { pos: new THREE.Vector3(58, 22, 128), target: new THREE.Vector3(10, -8, 40) };
camera.position.copy(quiete ? VISTA.pos : INIZIO.pos);

const controlli = new OrbitControls(camera, canvas);
controlli.target.copy(quiete ? VISTA.target : INIZIO.target);
controlli.enableDamping = true;
controlli.dampingFactor = 0.06;
controlli.enablePan = false;
controlli.enableZoom = false;          // la rotella fa scorrere la pagina
controlli.minPolarAngle = 0.32;
controlli.maxPolarAngle = 1.2;
controlli.rotateSpeed = 0.45;
controlli.autoRotate = !quiete;
controlli.autoRotateSpeed = 0.22;
controlli.enabled = false;             // si accende a fine introduzione

scena.add(new THREE.HemisphereLight('#8798bd', '#1c130e', 1.7));
const luna = new THREE.DirectionalLight('#b9c9ec', 2.4);
luna.position.set(70, 140, 40);
scena.add(luna);
const controluce = new THREE.DirectionalLight('#6d4a8a', 0.9); // riflesso freddo-viola dal lato opposto
controluce.position.set(-90, 50, -70);
scena.add(controluce);

// ---------------------------------------------------------------- terreno
const LATO = 360, SEG = piccolo ? 240 : 380;
const geo = new THREE.PlaneGeometry(LATO, LATO, SEG, SEG);
geo.rotateX(-Math.PI / 2);
const pos = geo.attributes.position;
const colori = new Float32Array(pos.count * 3);
const cRoccia = new THREE.Color('#5d5650'), cBrace = new THREE.Color('#7d3b29'),
  cGhiaccio = new THREE.Color('#8fa9bd'), cMuschio = new THREE.Color('#2b3b30'),
  cParete = new THREE.Color('#2a231f'), c = new THREE.Color();
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i), z = pos.getZ(i);
  const { h, r, vicino } = quota(x, z);
  pos.setY(i, h);
  const prof = Math.min(1, Math.max(0, -h / 60));
  if (r > BORDO_SELVA - 0.5 && h > -1.5) c.copy(cMuschio);
  else if (r < BORDI[8] - 1.2) c.copy(cGhiaccio).lerp(cRoccia, Math.min(1, Math.exp(-((r / 2.6) ** 2)) * 1.2));
  else c.copy(cRoccia).lerp(cBrace, Math.min(1, Math.max(0, (prof - 0.45) * 2.2)));
  c.lerp(cParete, vicino * 0.55);
  const v = 0.88 + 0.24 * rumore(x * 0.5, z * 0.5);
  colori[i * 3] = c.r * v; colori[i * 3 + 1] = c.g * v; colori[i * 3 + 2] = c.b * v;
}
geo.setAttribute('color', new THREE.BufferAttribute(colori, 3));
geo.computeVertexNormals();
const terreno = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94, metalness: 0.02 }));
scena.add(terreno);

// acque: Acheronte, Stige, Flegetonte (sangue) e il ghiaccio del Cocito
function anello(rIn, rOut, y, colore, emissivo, opac = 0.85) {
  const g = new THREE.RingGeometry(rIn, rOut, 160, 1);
  g.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
    color: colore, emissive: emissivo, emissiveIntensity: 1, roughness: 0.25, metalness: 0.1,
    transparent: true, opacity: opac, depthWrite: false,
  }));
  m.position.y = y;
  scena.add(m);
  return m;
}
anello(86.4, 88.8, -4.15, '#0d1a20', '#0c2a33');                         // Acheronte
anello(47.3, 50.7, PAVIMENTI[4] - 0.55, '#141a12', '#16220f', 0.9);        // Stige
anello(36.2, 37.6, PAVIMENTI[6] + 0.25, '#3a0806', '#7a1508', 0.95);        // Flegetonte
const ghiaccio = new THREE.Mesh(
  new THREE.CircleGeometry(BORDI[8] - 1.4, 96).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: '#8fb3cb', emissive: '#142433', roughness: 0.2, metalness: 0.2, transparent: true, opacity: 0.5, depthWrite: false }));
ghiaccio.position.y = PAVIMENTI[8] + 0.35;
scena.add(ghiaccio);

// oltre il bordo del terreno: una pianura scura con colline, perché l'orizzonte non finisca nel vuoto
{
  const g = new THREE.RingGeometry(150, 700, 180, 24);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i), r = Math.hypot(x, z);
    p.setY(i, 5.5 + (r - 150) * 0.05 + 22 * Math.max(0, fbm(x * 0.008, z * 0.008, 4)) * Math.min(1, (r - 150) / 120) - 1.5);
  }
  g.computeVertexNormals();
  scena.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: '#1d2621', roughness: 1 })));
}

// la selva oscura: alberi scuri sul bordo
{
  const n = piccolo ? 900 : 2200;
  const g = new THREE.ConeGeometry(1, 1, 6, 1);
  g.translate(0, 0.5, 0);
  const alberi = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: '#17231b', roughness: 1 }), n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler();
  let k = 0, prova = 0;
  while (k < n && prova < n * 6) {
    prova++;
    const a = hash(prova, 3.1) * Math.PI * 2, rr = BORDO_SELVA + 3 + hash(prova, 9.7) ** 0.7 * 78;
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (hash(x * 0.05, z * 0.05) < 0.18) continue; // radure
    const { h } = quota(x, z);
    const alto = 4 + hash(prova, 1.3) * 7;
    p.set(x, h - 0.3, z);
    e.set((hash(prova, 4.4) - 0.5) * 0.25, 0, (hash(prova, 5.5) - 0.5) * 0.25);
    q.setFromEuler(e);
    s.set(0.9 + hash(prova, 2.2) * 1.1, alto, 0.9 + hash(prova, 2.2) * 1.1);
    m.compose(p, q, s);
    alberi.setMatrixAt(k++, m);
  }
  alberi.count = k;
  scena.add(alberi);
}

// stelle: "e quindi uscimmo a riveder le stelle"
{
  const n = 900, v = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = hash(i, 1) * Math.PI * 2, el = 0.15 + hash(i, 2) * 1.2, R = 600;
    v[i * 3] = Math.cos(a) * Math.cos(el) * R; v[i * 3 + 1] = Math.sin(el) * R; v[i * 3 + 2] = Math.sin(a) * Math.cos(el) * R;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  scena.add(new THREE.Points(g, new THREE.PointsMaterial({ color: '#c9d4ee', size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.7 })));
}

// ---------------------------------------------------------------- particelle
function tessituraPunto(colore) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.25, colore); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const sciami = [];
function sciame(n, colore, dim, nascita, passo) {
  const v = new Float32Array(n * 3), dati = [];
  for (let i = 0; i < n; i++) { const d = nascita(i); dati.push(d); v[i * 3] = d.x; v[i * 3 + 1] = d.y; v[i * 3 + 2] = d.z; }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({
    map: tessituraPunto(colore), size: dim, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scena.add(p);
  sciami.push({ g, dati, nascita, passo, n });
}
// braci che salgono dai sepolcri e dal sabbione (cerchi VI e VII)
sciame(piccolo ? 260 : 520, '#ff8a3c', 0.7, (i) => {
  const a = Math.random() * Math.PI * 2, rr = 31 + Math.random() * 14;
  return { x: Math.cos(a) * rr, y: PAVIMENTI[5] - 2 + Math.random() * 14, z: Math.sin(a) * rr, v: 1.5 + Math.random() * 2.5 };
}, (d, dt, i, s) => { d.y += d.v * dt; d.x += Math.sin(d.y * 0.4 + i) * dt * 0.6; if (d.y > PAVIMENTI[5] + 16) Object.assign(d, s.nascita(i), { y: PAVIMENTI[6] }); });
// la bufera dei lussuriosi (cerchio II)
sciame(piccolo ? 220 : 420, '#c7a6ff', 0.55, (i) => {
  const a = Math.random() * Math.PI * 2, rr = 67.5 + Math.random() * 7;
  return { a, rr, x: Math.cos(a) * rr, y: PAVIMENTI[1] + 1 + Math.random() * 7, z: Math.sin(a) * rr, w: 0.35 + Math.random() * 0.5, f: Math.random() * 6 };
}, (d, dt) => { d.a += d.w * dt; d.f += dt; d.x = Math.cos(d.a) * d.rr; d.z = Math.sin(d.a) * d.rr; d.y += Math.sin(d.f * 1.7) * dt * 0.8; });
// la pioggia fredda dei golosi (cerchio III)
sciame(piccolo ? 160 : 320, '#9fb6d6', 0.35, () => {
  const a = Math.random() * Math.PI * 2, rr = 60 + Math.random() * 7;
  return { x: Math.cos(a) * rr, y: PAVIMENTI[2] + Math.random() * 16, z: Math.sin(a) * rr };
}, (d, dt) => { d.y -= 9 * dt; if (d.y < PAVIMENTI[2]) d.y += 16; });

// ---------------------------------------------------------------- luci dei cerchi
const marcatori = [];
const LUCE = piccolo ? 170 : 260;
function puntoSul(r, ang) { const x = Math.cos(ang) * r, z = Math.sin(ang) * r; return new THREE.Vector3(x, quota(x, z).h, z); }
for (const d of CERCHI) {
  const p = puntoSul(d.mappa.r, d.mappa.a);
  p.y += d.mappa.su ?? 1.8;
  const col = new THREE.Color(d.colore);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tessituraPunto(d.colore), color: '#ffffff', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  sp.position.copy(p); sp.scale.setScalar(8);
  scena.add(sp);
  const luce = new THREE.PointLight(col, LUCE, 44, 1.5);
  luce.position.copy(p).add(new THREE.Vector3(0, 2.5, 0));
  scena.add(luce);
  const pin = pinsLayer.querySelector(`[data-id="${d.id}"]`);
  marcatori.push({ d, p, sp, luce, pin, fase: hash(p.x, p.z) * 6 });
}

// il cammino di Dante: una traccia tratteggiata che scende di cerchio in cerchio
{
  const punti = [];
  for (let k = 0; k < marcatori.length - 1; k++) {
    const a = marcatori[k].d.mappa, b = marcatori[k + 1].d.mappa;
    let da = b.a - a.a;
    for (let t = 0; t < 1; t += 0.04) {
      const r = a.r + (b.r - a.r) * t, ang = a.a + da * t;
      const p = puntoSul(r, ang); p.y += 0.5; punti.push(p);
    }
  }
  punti.push(marcatori.at(-1).p.clone());
  const g = new THREE.BufferGeometry().setFromPoints(punti);
  const linea = new THREE.Line(g, new THREE.LineDashedMaterial({ color: '#d9b46a', dashSize: 1.2, gapSize: 1.6, transparent: true, opacity: 0.55 }));
  linea.computeLineDistances();
  scena.add(linea);
}

// ---------------------------------------------------------------- post-processing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scena, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.75, 0.5, 0.74);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function ridimensiona() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  bloom.setSize(Math.round(w / 2), Math.round(h / 2));
  camera.aspect = w / h;
  // su schermi stretti la vista si allontana per far stare l'imbuto
  camera.fov = w / h < 1 ? 52 : 38;
  applicaSpostamento();
}
// Spostamento dell'obiettivo (non della telecamera: la rotazione resta attorno al centro dell'Inferno).
// Sugli schermi larghi l'imbuto sta a destra del titolo; con la scheda aperta il cerchio scelto va a
// sinistra della scheda (o sopra, sui telefoni, dove la scheda sale dal basso).
const sposta = { x: 0, y: 0, mx: 0, my: 0 };
function metaSpostamento() {
  const w = stage.clientWidth, h = stage.clientHeight, largo = w / h > 1.25;
  if (aperto >= 0) { sposta.mx = largo ? 0.17 : 0; sposta.my = largo ? 0 : 0.3; }
  else { sposta.mx = largo ? -0.15 : 0; sposta.my = largo ? 0 : -0.17; } // sul telefono l'imbuto scende sotto il titolo
}
function applicaSpostamento() {
  const w = stage.clientWidth, h = stage.clientHeight;
  if (Math.abs(sposta.x) < 1e-4 && Math.abs(sposta.y) < 1e-4) camera.clearViewOffset();
  else camera.setViewOffset(w, h, sposta.x * w, sposta.y * h, w, h);
  camera.updateProjectionMatrix();
}
new ResizeObserver(() => { metaSpostamento(); ridimensiona(); }).observe(stage);
let aperto = -1;
metaSpostamento(); sposta.x = sposta.mx; sposta.y = sposta.my;
ridimensiona();

// ---------------------------------------------------------------- voli della telecamera
let volo = null;
const morbido = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
function volaA(pos, target, durata = 1.7, poi) {
  if (quiete) { camera.position.copy(pos); controlli.target.copy(target); controlli.update(); poi && poi(); return; }
  volo = { da: camera.position.clone(), a: pos.clone(), tda: controlli.target.clone(), ta: target.clone(), t0: performance.now(), durata, poi };
}
function vistaDi(m) {
  const fuori = new THREE.Vector3(m.p.x, 0, m.p.z);
  if (fuori.lengthSq() < 4) fuori.set(camera.position.x, 0, camera.position.z);
  fuori.normalize();
  // dall'alto e un po' da fuori: si vede la terrazza del cerchio e la parete sotto
  const [via, su] = m.d.mappa.r > 95 ? [34, 30] : [30, 44];
  return { pos: m.p.clone().addScaledVector(fuori, via).add(new THREE.Vector3(0, su, 0)), target: m.p.clone() };
}

// ---------------------------------------------------------------- scheda del cerchio
const campo = (sel) => panel.querySelector(sel);
function apri(i) {
  const m = marcatori[i];
  aperto = i;
  const d = m.d;
  campo('.p-kicker').textContent = d.kicker;
  campo('.p-titolo').textContent = d.nome;
  campo('.p-nome-it').textContent = d.nome_it || '';
  campo('.p-canto').textContent = d.canto;
  const img = campo('.p-img');
  if (d.immagine) { img.src = d.immagine; img.alt = d.immagine_alt || ''; img.hidden = false; } else { img.hidden = true; img.removeAttribute('src'); }
  const corpo = campo('.p-sezioni');
  corpo.replaceChildren();
  for (const s of d.sezioni) {
    const h = document.createElement('h3'); h.textContent = s.titolo;
    const p = document.createElement('p'); p.textContent = s.testo;
    corpo.append(h, p);
  }
  campo('.p-verso-it').textContent = d.verso_it;
  campo('.p-verso-en').textContent = d.verso_en;
  campo('.p-cita').textContent = d.cita;
  const g = campo('.p-gioco');
  g.textContent = d.gioco; g.dataset.stato = d.stato;
  campo('.p-prec').disabled = i === 0;
  campo('.p-succ').disabled = i === marcatori.length - 1;
  panel.hidden = false;
  stage.classList.add('scheda');
  requestAnimationFrame(() => panel.classList.add('aperto'));
  panel.scrollTop = 0;
  for (const mm of marcatori) mm.pin && mm.pin.classList.toggle('scelto', mm === m);
  document.querySelectorAll('.tdc-index [data-id]').forEach((b) => b.setAttribute('aria-current', b.dataset.id === d.id ? 'true' : 'false'));
  controlli.autoRotate = false;
  metaSpostamento();
  history.replaceState(null, '', '#' + d.id);
  const v = vistaDi(m);
  volaA(v.pos, v.target);
}
function chiudi() {
  if (aperto < 0) return;
  aperto = -1;
  panel.classList.remove('aperto');
  stage.classList.remove('scheda');
  setTimeout(() => { if (aperto < 0) panel.hidden = true; }, 350);
  for (const mm of marcatori) mm.pin && mm.pin.classList.remove('scelto');
  document.querySelectorAll('.tdc-index [data-id]').forEach((b) => b.setAttribute('aria-current', 'false'));
  metaSpostamento();
  history.replaceState(null, '', location.pathname + location.search);
  volaA(VISTA.pos, VISTA.target, 1.8, () => { controlli.autoRotate = !quiete; });
}
campo('.p-chiudi').addEventListener('click', chiudi);
campo('.p-prec').addEventListener('click', () => aperto > 0 && apri(aperto - 1));
campo('.p-succ').addEventListener('click', () => aperto < marcatori.length - 1 && apri(aperto + 1));
document.addEventListener('keydown', (e) => {
  if (aperto < 0) return;
  if (e.key === 'Escape') chiudi();
  if (e.key === 'ArrowRight' && aperto < marcatori.length - 1) apri(aperto + 1);
  if (e.key === 'ArrowLeft' && aperto > 0) apri(aperto - 1);
});
const indice = (id) => marcatori.findIndex((m) => m.d.id === id);
document.querySelectorAll('[data-apri]').forEach((b) => b.addEventListener('click', () => apri(indice(b.dataset.apri))));
for (const m of marcatori) m.pin && m.pin.addEventListener('click', () => apri(marcatori.indexOf(m)));
document.querySelectorAll('.tdc-index [data-id]').forEach((b) => b.addEventListener('click', () => apri(indice(b.dataset.id))));

// ---------------------------------------------------------------- ciclo
const proietta = new THREE.Vector3();
const orologio = new THREE.Clock();
let visibile = true, primo = true, introT = quiete ? 1 : 0, inizioIntro = 0;
new IntersectionObserver((v) => { visibile = v[0].isIntersecting; }, { threshold: 0.02 }).observe(stage);

function posizionaPin() {
  const w = stage.clientWidth, h = stage.clientHeight;
  for (const m of marcatori) {
    if (!m.pin) continue;
    proietta.copy(m.p).project(camera);
    const dietro = proietta.z > 1;
    const x = (proietta.x * 0.5 + 0.5) * w, y = (-proietta.y * 0.5 + 0.5) * h;
    m.pin.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -150%)`;
    m.pin.classList.toggle('fuori', dietro || x < -40 || x > w + 40 || y < -40 || y > h + 40);
  }
}

function fotogramma() {
  requestAnimationFrame(fotogramma);
  if (!visibile || document.hidden) { orologio.getDelta(); return; }
  const dt = Math.min(orologio.getDelta(), 0.05), t = orologio.elapsedTime;
  // introduzione: dalla selva alla vista dall'alto (a tempo vero: con pochi fotogrammi finisce lo stesso)
  if (introT < 1) {
    if (!inizioIntro) inizioIntro = performance.now();
    introT = Math.min(1, (performance.now() - inizioIntro) / 3400);
    const k = morbido(introT);
    camera.position.lerpVectors(INIZIO.pos, VISTA.pos, k);
    controlli.target.lerpVectors(INIZIO.target, VISTA.target, k);
    if (introT >= 1) { controlli.enabled = true; stage.classList.add('pronto'); apriDaIndirizzo(); }
  } else if (volo) {
    const vt = Math.min(1, (performance.now() - volo.t0) / (volo.durata * 1000));
    const k = morbido(vt);
    volo.t = vt;
    camera.position.lerpVectors(volo.da, volo.a, k);
    controlli.target.lerpVectors(volo.tda, volo.ta, k);
    if (volo.t >= 1) { const poi = volo.poi; volo = null; poi && poi(); }
  }
  controlli.update();
  if (Math.abs(sposta.mx - sposta.x) + Math.abs(sposta.my - sposta.y) > 1e-4) {
    const k = quiete ? 1 : Math.min(1, dt * 3.2);
    sposta.x += (sposta.mx - sposta.x) * k; sposta.y += (sposta.my - sposta.y) * k;
    applicaSpostamento();
  }
  for (const m of marcatori) {
    const k = 1 + 0.18 * Math.sin(t * 2.1 + m.fase);
    // con una scheda aperta la telecamera è vicina: luci e aloni più tenui, niente abbagli
    const vicino = aperto >= 0 ? 0.45 : 1;
    m.sp.scale.setScalar(8 * (aperto >= 0 ? 0.75 : 1) * k);
    m.luce.intensity = LUCE * vicino * (0.85 + 0.15 * Math.sin(t * 3.3 + m.fase));
  }
  if (!quiete) for (const s of sciami) {
    const arr = s.g.attributes.position.array;
    for (let i = 0; i < s.n; i++) { const d = s.dati[i]; s.passo(d, dt, i, s); arr[i * 3] = d.x; arr[i * 3 + 1] = d.y; arr[i * 3 + 2] = d.z; }
    s.g.attributes.position.needsUpdate = true;
  }
  composer.render();
  posizionaPin();
  if (primo) { primo = false; stage.classList.remove('loading'); if (quiete) { controlli.enabled = true; stage.classList.add('pronto'); apriDaIndirizzo(); } }
}
// un link come /thedivinecomedy/#lussuria apre direttamente quel cerchio
// (anche ?cerchio=lussuria: alcune app tolgono la parte dopo il #)
function apriDaIndirizzo() {
  const nome = decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get('cerchio') || '';
  const i = indice(nome);
  if (i >= 0 && i !== aperto) apri(i);
}
window.addEventListener('hashchange', apriDaIndirizzo);
fotogramma();

// trascinare ferma la rotazione lenta; dopo un po' riparte
let riprendi;
controlli.addEventListener('start', () => { controlli.autoRotate = false; clearTimeout(riprendi); });
controlli.addEventListener('end', () => { clearTimeout(riprendi); riprendi = setTimeout(() => { if (aperto < 0 && !quiete) controlli.autoRotate = true; }, 6000); });

window.__tdc = { apri, chiudi, camera, controlli, ETICHETTE };
