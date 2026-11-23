// inferno.js — la mappa 3D dell'oltremondo per il sito di Oltremondo - Iter Animae.
//
// Sorgente in Marketing/sito/; sito.py la copia in public/oltremondo/ del portfolio.
// La pagina fornisce: #tdc-stage (contenitore, data-regno), #tdc-canvas, i luoghi in
// <script id="tdc-cerchi" type="application/json"> (Firenze e Inferno, Purgatorio, Paradiso, nell'ordine del viaggio),
// le etichette in #tdc-etichette, le luci (#tdc-pins), l'elenco (.tdc-index), il selettore dei regni (.tdc-regni),
// il pannello #tdc-panel, il velo nero .buio e il verso dei passaggi .passaggio. Three.js arriva da jsDelivr (import map).
//
// Due mondi, mai visibili insieme:
//  A — Firenze sulle colline, la selva oscura e l'imbuto dei nove cerchi fino al Cocito con Lucifero.
//  B — l'isola del Purgatorio all'alba (spiaggia, porta, sette cornici, l'Eden in cima) e, sopra la montagna, i nove
//      cieli del Paradiso con la rosa dell'Empireo. Si costruisce dopo l'introduzione, quando il browser è libero.
// Il passaggio A→B è quello di Dante: giù per i cerchi, oltre Lucifero, nel buio della "natural burella" e fuori sulla
// spiaggia dell'Antipurgatorio. Al Paradiso si arriva salendo la montagna fino all'Eden e poi in cielo.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const V3 = THREE.Vector3;
const SU = new V3(0, 1, 0);
const stage = document.getElementById('tdc-stage');
const canvas = document.getElementById('tdc-canvas');
const pinsLayer = document.getElementById('tdc-pins');
const panel = document.getElementById('tdc-panel');
const indiceNav = stage.querySelector('.tdc-index');
const velo = stage.querySelector('.buio');
const passaggio = stage.querySelector('.passaggio');
const LUOGHI = JSON.parse(document.getElementById('tdc-cerchi').textContent);
const ETICHETTE = JSON.parse(document.getElementById('tdc-etichette').textContent);
const quiete = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const piccolo = Math.min(window.innerWidth, window.innerHeight) < 700;

// ---------------------------------------------------------------- rumore
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
const chiaro = (x) => Math.min(1, Math.max(0, x));
const dirXZ = (a) => new V3(Math.cos(a), 0, Math.sin(a));

// ---------------------------------------------------------------- mondo A: forma dell'imbuto
// Raggi dei bordi (dall'esterno): bordo della selva, poi l'inizio di ogni cerchio.
const BORDO_SELVA = 92;
const BORDI = [84, 75, 67, 59.5, 52.5, 45.5, 38, 30, 21.5]; // inizio dei cerchi I..IX
const SALTI = [3, 7, 6, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 8];   // quanto scende ogni gradino
const PAVIMENTI = [];                                       // quota del pavimento di ogni cerchio
{ let q = -SALTI[0]; for (let k = 0; k < 9; k++) { q -= SALTI[k + 1]; PAVIMENTI.push(q); } }

// Firenze (23/11): la casa-torre di Dante è il punto della scheda "firenze"; la città le sta attorno, un po' più in fuori,
// su un ripiano spianato nelle colline della selva.
const FI = LUOGHI.find((d) => d.id === 'firenze');
// La città si costruisce piccola e poi si ingrandisce di SCALA_CITTA attorno al suo centro (a misura degli alberi).
const SCALA_CITTA = 1.5;
const CASA = FI ? new V3(Math.cos(FI.mappa.a) * FI.mappa.r, 0, Math.sin(FI.mappa.a) * FI.mappa.r) : null;
const CITTA = CASA ? CASA.clone().multiplyScalar((FI.mappa.r + 9) / FI.mappa.r) : null;
const QUOTA_CITTA = CASA ? (FI.mappa.r + 9 - BORDO_SELVA) * 0.09 + 0.4 : 0;
const R_CITTA = 12.4 * SCALA_CITTA;                       // il raggio delle mura

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
  // Firenze: il ripiano della città
  let citta = 0;
  if (CITTA) {
    citta = liscio(R_CITTA + 12, R_CITTA + 2.5, Math.hypot(x - CITTA.x, z - CITTA.z));
    if (citta > 0) h += (QUOTA_CITTA + 0.12 * fbm(x * 0.4, z * 0.4, 2) - h) * citta;
  }
  return { h, r, vicino, citta };
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
const NEBBIA_A = new THREE.FogExp2(new THREE.Color('#0c1020'), 0.0052);
const NEBBIA_B = new THREE.FogExp2(new THREE.Color('#52638b'), 0.0026);
scena.background = NOTTE;
scena.fog = NEBBIA_A;

const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 900);
const VISTA = { pos: new V3(0, 98, 182), target: new V3(0, -30, 0) };
const INIZIO = (() => {
  if (!CITTA) return { pos: new V3(58, 22, 128), target: new V3(10, -8, 40) };
  // dalle colline fuori città: in primo piano Firenze e la torre di Dante, dietro la selva e l'imbuto
  const fuori = CITTA.clone().normalize(), lato = new V3(-fuori.z, 0, fuori.x);
  const pos = CITTA.clone().addScaledVector(fuori, 34).addScaledVector(lato, -15);
  pos.y = QUOTA_CITTA + 24;
  const target = CASA.clone().addScaledVector(fuori, -10);
  target.y = QUOTA_CITTA + 1;
  return { pos, target };
})();
camera.position.copy(quiete ? VISTA.pos : INIZIO.pos);

const controlli = new OrbitControls(camera, canvas);
controlli.target.copy(quiete ? VISTA.target : INIZIO.target);
controlli.enableDamping = true;
controlli.dampingFactor = 0.06;
controlli.enablePan = false;
controlli.enableZoom = false;          // la rotella fa scorrere la pagina
controlli.minPolarAngle = 0.01;        // durante i voli niente limiti: si fissano a fine volo (limiti())
controlli.maxPolarAngle = Math.PI - 0.01;
controlli.rotateSpeed = 0.45;
controlli.autoRotate = !quiete;
controlli.autoRotateSpeed = 0.22;
controlli.enabled = false;             // si accende a fine introduzione

const mondoA = new THREE.Group();
scena.add(mondoA);
let mondoB = null;                     // costruito più tardi (costruisciMondoB)

mondoA.add(new THREE.HemisphereLight('#8798bd', '#1c130e', 1.7));
{
  const luna = new THREE.DirectionalLight('#b9c9ec', 2.4);
  luna.position.set(70, 140, 40);
  mondoA.add(luna);
  const controluce = new THREE.DirectionalLight('#6d4a8a', 0.9); // riflesso freddo-viola dal lato opposto
  controluce.position.set(-90, 50, -70);
  mondoA.add(controluce);
}

// ---------------------------------------------------------------- aiuti
function tessituraPunto(colore) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.25, colore); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function tessituraFumo() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(150,148,160,0.55)'); gr.addColorStop(0.6, 'rgba(110,108,120,0.25)'); gr.addColorStop(1, 'rgba(90,90,100,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
// una striscia che sfuma ai due capi (l'Arno, i fiumi dell'Eden)
function tessituraStriscia() {
  const cv = document.createElement('canvas'); cv.width = 4; cv.height = 64;
  const g = cv.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 64);
  gr.addColorStop(0, '#000'); gr.addColorStop(0.18, '#fff'); gr.addColorStop(0.82, '#fff'); gr.addColorStop(1, '#000');
  g.fillStyle = gr; g.fillRect(0, 0, 4, 64);
  return new THREE.CanvasTexture(cv);
}
function anello(gruppo, rIn, rOut, y, colore, emissivo, opac = 0.85) {
  const g = new THREE.RingGeometry(rIn, rOut, 160, 1);
  g.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
    color: colore, emissive: emissivo, emissiveIntensity: 1, roughness: 0.25, metalness: 0.1,
    transparent: true, opacity: opac, depthWrite: false,
  }));
  m.position.y = y;
  gruppo.add(m);
  return m;
}
// punti luminosi fermi (formazioni del Paradiso, finestre di Firenze)
function nuvola(gruppo, punti, colore, dim, colori = null, extra = {}) {
  const g = new THREE.BufferGeometry().setFromPoints(punti);
  if (colori) g.setAttribute('color', new THREE.Float32BufferAttribute(colori, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({
    map: tessituraPunto(colori ? '#ffffff' : colore), size: dim, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, vertexColors: !!colori, fog: extra.nebbia ?? true,
  }));
  gruppo.add(p);
  return p;
}
// il cammino di Dante: una traccia tratteggiata
function cammino(gruppo, punti, opacita = 0.55) {
  const g = new THREE.BufferGeometry().setFromPoints(punti);
  const linea = new THREE.Line(g, new THREE.LineDashedMaterial({ color: '#d9b46a', dashSize: 1.2, gapSize: 1.6, transparent: true, opacity: opacita }));
  linea.computeLineDistances();
  gruppo.add(linea);
  return linea;
}

// particelle che si muovono (aggiornate solo se il loro mondo è visibile)
const sciami = [];
function sciame(gruppo, n, colore, dim, nascita, passo, { additivo = true, opacita = 1, mappa = null, nebbia = true } = {}) {
  const v = new Float32Array(n * 3), dati = [];
  for (let i = 0; i < n; i++) { const d = nascita(i); dati.push(d); v[i * 3] = d.x; v[i * 3 + 1] = d.y; v[i * 3 + 2] = d.z; }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({
    map: mappa || tessituraPunto(colore), size: dim, transparent: true, opacity: opacita, depthWrite: false, fog: nebbia,
    blending: additivo ? THREE.AdditiveBlending : THREE.NormalBlending,
  }));
  gruppo.add(p);
  sciami.push({ gruppo, g, dati, nascita, passo, n });
}
const rotanti = [];   // oggetti che girano su sé stessi: { obj, asse, vel }

// ---------------------------------------------------------------- mondo A: terreno
{
  const LATO = 360, SEG = piccolo ? 240 : 380;
  const geo = new THREE.PlaneGeometry(LATO, LATO, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colori = new Float32Array(pos.count * 3);
  const cRoccia = new THREE.Color('#5d5650'), cBrace = new THREE.Color('#7d3b29'),
    cGhiaccio = new THREE.Color('#8fa9bd'), cMuschio = new THREE.Color('#2b3b30'),
    cParete = new THREE.Color('#2a231f'), cCitta = new THREE.Color('#3d362e'), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const { h, r, vicino, citta } = quota(x, z);
    pos.setY(i, h);
    const prof = Math.min(1, Math.max(0, -h / 60));
    if (r > BORDO_SELVA - 0.5 && h > -1.5) c.copy(cMuschio);
    else if (r < BORDI[8] - 1.2) c.copy(cGhiaccio).lerp(cRoccia, Math.min(1, Math.exp(-((r / 2.6) ** 2)) * 1.2));
    else c.copy(cRoccia).lerp(cBrace, Math.min(1, Math.max(0, (prof - 0.45) * 2.2)));
    c.lerp(cParete, vicino * 0.55);
    if (citta > 0) c.lerp(cCitta, citta * 0.9);
    const v = 0.88 + 0.24 * rumore(x * 0.5, z * 0.5);
    colori[i * 3] = c.r * v; colori[i * 3 + 1] = c.g * v; colori[i * 3 + 2] = c.b * v;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colori, 3));
  geo.computeVertexNormals();
  mondoA.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94, metalness: 0.02 })));
}

// acque: Acheronte, Stige, Flegetonte (sangue) e il ghiaccio del Cocito
anello(mondoA, 86.4, 88.8, -4.15, '#0d1a20', '#0c2a33');                         // Acheronte
anello(mondoA, 47.3, 50.7, PAVIMENTI[4] - 0.55, '#141a12', '#16220f', 0.9);        // Stige
anello(mondoA, 36.2, 37.6, PAVIMENTI[6] + 0.25, '#3a0806', '#7a1508', 0.95);        // Flegetonte
{
  const ghiaccio = new THREE.Mesh(
    new THREE.CircleGeometry(BORDI[8] - 1.4, 96).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: '#8fb3cb', emissive: '#142433', roughness: 0.2, metalness: 0.2, transparent: true, opacity: 0.5, depthWrite: false }));
  ghiaccio.position.y = PAVIMENTI[8] + 0.35;
  mondoA.add(ghiaccio);
}

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
  mondoA.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: '#1d2621', roughness: 1 })));
}

// la selva oscura: alberi scuri sul bordo (non dentro Firenze)
{
  const n = piccolo ? 900 : 2200;
  const g = new THREE.ConeGeometry(1, 1, 6, 1);
  g.translate(0, 0.5, 0);
  const alberi = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: '#17231b', roughness: 1 }), n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new V3(), p = new V3(), e = new THREE.Euler();
  let k = 0, prova = 0;
  while (k < n && prova < n * 6) {
    prova++;
    const a = hash(prova, 3.1) * Math.PI * 2, rr = BORDO_SELVA + 3 + hash(prova, 9.7) ** 0.7 * 78;
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    if (hash(x * 0.05, z * 0.05) < 0.18) continue; // radure
    if (CITTA && Math.hypot(x - CITTA.x, z - CITTA.z) < R_CITTA + 7) continue;
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
  mondoA.add(alberi);
}

// Firenze, 1300: le mura, l'Arno con il ponte, case e case-torri con le finestre accese, il Battistero, il cantiere
// del Duomo appena cominciato, il palazzo dei Priori e la torre di Dante con il lume acceso.
function costruisciFirenze(gruppo) {
  if (!CITTA) return;
  const C = new V3(CITTA.x, QUOTA_CITTA, CITTA.z);
  // tutto si costruisce a scala 1 attorno a C dentro g, che poi si ingrandisce attorno a C (il terreno lì è piano)
  const g = new THREE.Group();
  g.scale.setScalar(SCALA_CITTA);
  g.position.copy(C).multiplyScalar(1 - SCALA_CITTA);
  gruppo.add(g);
  const fuori = C.clone().setY(0).normalize(), lato = new V3(-fuori.z, 0, fuori.x);
  const punto = (u, v) => new V3(C.x + fuori.x * u + lato.x * v, QUOTA_CITTA, C.z + fuori.z * u + lato.z * v);
  const suolo = (p) => { p.y = QUOTA_CITTA; return p; };
  const casaLocale = C.clone().add(CASA.clone().setY(QUOTA_CITTA).sub(C).divideScalar(SCALA_CITTA));
  const mat = (colore) => new THREE.MeshStandardMaterial({ color: colore, roughness: 0.95 });
  const griglia = Math.atan2(fuori.x, fuori.z);
  const aggiungi = (geo, materiale, p, rot = griglia) => { const m = new THREE.Mesh(geo, materiale); m.position.copy(p); m.rotation.y = rot; g.add(m); return m; };

  // le mura e le loro torri
  const pietra = mat('#544a40');
  const mura = new THREE.Mesh(new THREE.CylinderGeometry(12.4, 12.4, 1.6, 72, 1, true), new THREE.MeshStandardMaterial({ color: '#4f463c', roughness: 1, side: THREE.DoubleSide }));
  mura.position.copy(C).add(new V3(0, 0.55, 0));
  g.add(mura);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + 0.2;
    const p = suolo(new V3(C.x + Math.cos(a) * 12.4, 0, C.z + Math.sin(a) * 12.4));
    aggiungi(new THREE.BoxGeometry(1.2, 2.8, 1.2).translate(0, 1.2, 0), pietra, p, -a);
  }

  // l'Arno attraversa la città, un po' storto, con il ponte
  const dirF = lato.clone().applyAxisAngle(SU, 0.35);
  const centroF = punto(2.6, 0);
  {
    const geo = new THREE.PlaneGeometry(2.4, 32, 1, 1).rotateX(-Math.PI / 2);
    const fiume = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      color: '#0f2636', emissive: '#0b2333', roughness: 0.3, metalness: 0.4, transparent: true, alphaMap: tessituraStriscia(), depthWrite: false,
    }));
    fiume.position.copy(centroF).add(new V3(0, 0.1, 0));
    fiume.rotation.y = Math.atan2(dirF.x, dirF.z);
    g.add(fiume);
    const ponte = aggiungi(new THREE.BoxGeometry(3.2, 0.5, 1.3).translate(0, 0.25, 0), mat('#6b5d4c'), centroF.clone().addScaledVector(dirF, -4), Math.atan2(dirF.x, dirF.z));
    ponte.position.y = QUOTA_CITTA + 0.05;
  }
  const distFiume = (x, z) => {
    const dx = x - centroF.x, dz = z - centroF.z;
    return Math.abs(dx * dirF.z - dz * dirF.x);
  };

  // Battistero (ottagonale), cantiere del Duomo, palazzo dei Priori con la torre
  const marmo = mat('#c7c0ae');
  const pB = punto(-1.8, 4.6), pD = punto(-1.6, 8.6), pP = punto(5.4, -3.6);
  aggiungi(new THREE.CylinderGeometry(1.9, 1.9, 2.5, 8).translate(0, 1.25, 0), marmo, pB);
  aggiungi(new THREE.ConeGeometry(2.1, 1.4, 8).translate(0, 3.2, 0), mat('#8e8a80'), pB);
  aggiungi(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 8).translate(0, 4.2, 0), marmo, pB);
  aggiungi(new THREE.BoxGeometry(2.6, 0.8, 6).translate(0, 0.4, 0), mat('#a39b8b'), pD);
  for (let i = 0; i < 6; i++) {
    const p = pD.clone().addScaledVector(lato, (i % 3 - 1) * 2.6).addScaledVector(fuori, i < 3 ? -1.2 : 1.2);
    aggiungi(new THREE.CylinderGeometry(0.06, 0.06, 3.6, 4).translate(0, 1.8, 0), mat('#5b4a36'), p);
  }
  aggiungi(new THREE.BoxGeometry(2.8, 2.8, 2.5).translate(0, 1.4, 0), mat('#7b6b55'), pP);
  aggiungi(new THREE.BoxGeometry(0.7, 4.6, 0.7).translate(0, 5.1, 0), mat('#7b6b55'), pP.clone().addScaledVector(lato, 0.9));

  // la torre di Dante, con il lume acceso alla finestra dello studio (ingrandita, cade proprio sul punto della scheda)
  const pT = casaLocale;
  aggiungi(new THREE.BoxGeometry(1.6, 6.4, 1.6).translate(0, 3.2, 0), mat('#6f6252'), pT);
  aggiungi(new THREE.ConeGeometry(1.25, 1.1, 4).rotateY(Math.PI / 4).translate(0, 6.95, 0), mat('#5a2e22'), pT);
  {
    const lume = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.6, 0.08), new THREE.MeshBasicMaterial({ color: '#ffcf86' }));
    const verso = INIZIO.pos.clone().sub(pT).setY(0).normalize();
    lume.position.copy(pT).addScaledVector(verso, 0.82).add(new V3(0, 4.6, 0));
    lume.lookAt(lume.position.clone().add(verso));
    g.add(lume);
  }

  // case e case-torri (istanze), con le finestre accese
  const occupati = [[pT, 2.8], [pB, 3.4], [pD, 4.6], [pP, 3.6]];
  const n = piccolo ? 60 : 95;
  const cubo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const tetto = new THREE.ConeGeometry(0.7071, 1, 4).rotateY(Math.PI / 4).translate(0, 0.5, 0);
  const muri = new THREE.InstancedMesh(cubo, mat('#77695a'), n);
  const tetti = new THREE.InstancedMesh(tetto, mat('#6a3527'), n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new V3(), p = new V3();
  const fatte = [], finestre = [];
  let k = 0, t = 0;
  for (let prova = 1; prova < 3000 && k < n; prova++) {
    const a = hash(prova, 7.7) * Math.PI * 2, rr = Math.sqrt(hash(prova, 8.8)) * 11.3;
    const x = C.x + Math.cos(a) * rr, z = C.z + Math.sin(a) * rr;
    if (distFiume(x, z) < 2.1) continue;
    if (occupati.some(([o, d]) => Math.hypot(x - o.x, z - o.z) < d)) continue;
    if (fatte.some((f) => Math.hypot(x - f.x, z - f.z) < 1.6)) continue;
    const torre = hash(prova, 3.3) < 0.12;
    const w = torre ? 0.85 : 0.9 + hash(prova, 1.1) * 0.8, d = torre ? 0.85 : 0.9 + hash(prova, 2.1) * 0.8;
    const alto = torre ? 3.6 + hash(prova, 4.1) * 2.8 : 0.9 + hash(prova, 5.1) * 0.9;
    const rot = griglia + (hash(prova, 6.1) - 0.5) * 0.25;
    const y = QUOTA_CITTA - 0.1;
    q.setFromAxisAngle(SU, rot);
    m.compose(p.set(x, y, z), q, s.set(w, alto, d));
    muri.setMatrixAt(k, m);
    if (!torre) { m.compose(p.set(x, y + alto, z), q, s.set(w * 1.08, 0.5, d * 1.08)); tetti.setMatrixAt(t++, m); }
    fatte.push({ x, z });
    k++;
    // una o due finestre accese su una faccia a caso
    const nf = hash(prova, 9.1) < 0.35 ? 0 : 1 + (hash(prova, 9.2) < 0.4 ? 1 : 0);
    for (let j = 0; j < nf; j++) {
      const faccia = Math.floor(hash(prova, 10 + j) * 4);
      const lx = faccia === 0 ? w / 2 + 0.03 : faccia === 1 ? -w / 2 - 0.03 : (hash(prova, 11 + j) - 0.5) * w * 0.7;
      const lz = faccia === 2 ? d / 2 + 0.03 : faccia === 3 ? -d / 2 - 0.03 : (hash(prova, 12 + j) - 0.5) * d * 0.7;
      const ly = y + 0.35 + hash(prova, 13 + j) * Math.max(0.2, alto - 0.6);
      const c = Math.cos(rot), sn = Math.sin(rot);
      finestre.push(new V3(x + lx * c + lz * sn, ly, z - lx * sn + lz * c));
    }
  }
  muri.count = k; tetti.count = t;
  g.add(muri, tetti);
  if (finestre.length) nuvola(g, finestre, '#ffb35c', 0.55);
}
costruisciFirenze(mondoA);

// stelle: "e quindi uscimmo a riveder le stelle"
{
  const n = 900, v = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = hash(i, 1) * Math.PI * 2, el = 0.15 + hash(i, 2) * 1.2, R = 600;
    v[i * 3] = Math.cos(a) * Math.cos(el) * R; v[i * 3 + 1] = Math.sin(el) * R; v[i * 3 + 2] = Math.sin(a) * Math.cos(el) * R;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  mondoA.add(new THREE.Points(g, new THREE.PointsMaterial({ color: '#c9d4ee', size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.7 })));
}

// braci che salgono dai sepolcri e dal sabbione (cerchi VI e VII)
sciame(mondoA, piccolo ? 260 : 520, '#ff8a3c', 0.7, () => {
  const a = Math.random() * Math.PI * 2, rr = 31 + Math.random() * 14;
  return { x: Math.cos(a) * rr, y: PAVIMENTI[5] - 2 + Math.random() * 14, z: Math.sin(a) * rr, v: 1.5 + Math.random() * 2.5 };
}, (d, dt, i, s) => { d.y += d.v * dt; d.x += Math.sin(d.y * 0.4 + i) * dt * 0.6; if (d.y > PAVIMENTI[5] + 16) Object.assign(d, s.nascita(i), { y: PAVIMENTI[6] }); });
// la bufera dei lussuriosi (cerchio II)
sciame(mondoA, piccolo ? 220 : 420, '#c7a6ff', 0.55, () => {
  const a = Math.random() * Math.PI * 2, rr = 67.5 + Math.random() * 7;
  return { a, rr, x: Math.cos(a) * rr, y: PAVIMENTI[1] + 1 + Math.random() * 7, z: Math.sin(a) * rr, w: 0.35 + Math.random() * 0.5, f: Math.random() * 6 };
}, (d, dt) => { d.a += d.w * dt; d.f += dt; d.x = Math.cos(d.a) * d.rr; d.z = Math.sin(d.a) * d.rr; d.y += Math.sin(d.f * 1.7) * dt * 0.8; });
// la pioggia fredda dei golosi (cerchio III)
sciame(mondoA, piccolo ? 160 : 320, '#9fb6d6', 0.35, () => {
  const a = Math.random() * Math.PI * 2, rr = 60 + Math.random() * 7;
  return { x: Math.cos(a) * rr, y: PAVIMENTI[2] + Math.random() * 16, z: Math.sin(a) * rr };
}, (d, dt) => { d.y -= 9 * dt; if (d.y < PAVIMENTI[2]) d.y += 16; });

// ---------------------------------------------------------------- luci dei luoghi
// Ogni luogo ha un marcatore: la luce nella scena (sprite, a volte una luce vera) e il pulsante in pagina.
// Quelli del mondo B si accendono quando il mondo B viene costruito.
const LUCE = piccolo ? 170 : 260;
const marcatori = LUOGHI.map((d) => ({ d, p: null, sp: null, luce: null, scala: 8, fase: 0, pin: pinsLayer.querySelector(`[data-id="${d.id}"]`) }));
function accendi(m, p, gruppo, { luce = true, scala = 8, raggio = 44, nebbia = true } = {}) {
  m.p = p;
  m.fase = hash(p.x, p.z) * 6;
  m.scala = scala;
  m.sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tessituraPunto(m.d.colore), color: '#ffffff', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: nebbia }));
  m.sp.position.copy(p);
  m.sp.scale.setScalar(scala);
  gruppo.add(m.sp);
  if (luce) {
    m.luce = new THREE.PointLight(new THREE.Color(m.d.colore), LUCE, raggio, 1.5);
    m.luce.position.copy(p).add(new V3(0, 2.5, 0));
    gruppo.add(m.luce);
  }
}
function puntoSul(r, ang) { const x = Math.cos(ang) * r, z = Math.sin(ang) * r; return new V3(x, quota(x, z).h, z); }
const delRegno = (r) => marcatori.filter((m) => m.d.regno === r);
for (const m of delRegno('inferno')) {
  const p = puntoSul(m.d.mappa.r, m.d.mappa.a);
  p.y += m.d.mappa.su ?? 1.8;
  accendi(m, p, mondoA);
}
// il cammino di Dante: da Firenze nella selva, poi giù di cerchio in cerchio
{
  const ms = delRegno('inferno'), punti = [];
  for (let k = 0; k < ms.length - 1; k++) {
    const a = ms[k].d.mappa, b = ms[k + 1].d.mappa;
    for (let t = 0; t < 1; t += 0.04) {
      const p = puntoSul(a.r + (b.r - a.r) * t, a.a + (b.a - a.a) * t); p.y += 0.5; punti.push(p);
    }
  }
  punti.push(ms.at(-1).p.clone());
  cammino(mondoA, punti);
}

// ---------------------------------------------------------------- mondo B: il Purgatorio
// L'isola: fondale, spiaggia, il pendio dell'Antipurgatorio fino al ripiano della porta, poi sette cornici piatte
// separate da pareti, e in cima l'Eden. Davanti (A_FRONTE) è il lato da cui la si guarda arrivando dal mare.
const A_FRONTE = Math.PI / 2;
const SOLE = new V3(0.82, 0.14, -0.55).normalize();        // l'alba: a destra, dietro la montagna (dalla spiaggia)
const P_SPIAGGIA = [113, 128];                             // dentro, fuori
const P_PORTA = 44;                                        // quota del ripiano della porta (r 76..71)
const P_GRADINI = [[71, 68, 10], [63, 60.5, 11], [55.5, 53, 11], [48, 45.5, 11], [40.5, 38, 11], [33, 30.5, 11], [25.5, 23, 11], [18, 15.5, 11]];
const P_CORNICI = [[68, 63], [60.5, 55.5], [53, 48], [45.5, 40.5], [38, 33], [30.5, 25.5], [23, 18]];
const P_QUOTE = [54, 65, 76, 87, 98, 109, 120];
const P_VETTA = 131;
// gli anelli delle schede (purgatorio.py, "anello"): 0 spiaggia, 1 porta, 2..8 cornici, 9 vetta
const P_ANELLI = [120.5, 73.5, ...P_CORNICI.map(([a, b]) => (a + b) / 2), 6];
const BURELLA = A_FRONTE + 0.27;                           // il foro nella roccia da cui Dante esce dal buio
const A_VALLETTA = A_FRONTE - 1.05;                        // la valletta dei principi

function quotaP(x, z) {
  const r0 = Math.hypot(x, z), ang = Math.atan2(z, x);
  const r = r0 + 1.3 * fbm(Math.cos(ang) * 1.9 + 11, Math.sin(ang) * 1.9 + 5, 3) * 2;
  let h, vicino = 0, zona;
  if (r >= P_SPIAGGIA[1]) { h = 0.15 - (r - P_SPIAGGIA[1]) * 0.16; zona = 0; }
  else if (r >= P_SPIAGGIA[0]) { const s = (P_SPIAGGIA[1] - r) / (P_SPIAGGIA[1] - P_SPIAGGIA[0]); h = 0.15 + 1.5 * s ** 1.5; zona = 1; }
  else {
    const s = Math.min(1, (P_SPIAGGIA[0] - r) / (P_SPIAGGIA[0] - 76));
    h = 1.65 + (P_PORTA - 1.65) * (0.55 * s * s * (3 - 2 * s) + 0.45 * s);
    zona = s < 1 ? 2 : r < 15.5 ? 4 : 3;
    for (const [fuori, dentro, su] of P_GRADINI) {
      h += su * liscio(fuori, dentro, r);
      vicino = Math.max(vicino, Math.exp(-(((r - (fuori + dentro) / 2) / 1.7) ** 2)));
    }
    const da = Math.abs(((ang - A_VALLETTA + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    h -= 3.5 * Math.exp(-(((r - 92) / 6) ** 2)) * Math.exp(-((da / 0.22) ** 2));
  }
  const ruvido = zona === 2 ? 1.5 : zona === 0 ? 0.6 : zona === 4 ? 0.45 : 0.12;
  h += (ruvido + 1.6 * vicino) * fbm(x * 0.13, z * 0.13, 4) * 2;
  return { h, r, vicino, zona };
}
function puntoSulP(r, ang) { const x = Math.cos(ang) * r, z = Math.sin(ang) * r; return new V3(x, quotaP(x, z).h, z); }

// ---------------------------------------------------------------- mondo B: i cieli
// Nove anelli sopra la montagna, ognuno con il suo pianeta, che si allargano salendo; in cima la rosa dell'Empireo.
const CIELI_Y0 = 186, CIELI_DY = 30, CIELI_R0 = 34, CIELI_DR = 9;
const cieloY = (k) => CIELI_Y0 + k * CIELI_DY, cieloR = (k) => CIELI_R0 + k * CIELI_DR;
const EMPIREO_Y = cieloY(8) + 60;

const REGNI = {
  inferno: { mondo: 'A', vista: VISTA, polare: [0.32, 1.2] },
  purgatorio: { mondo: 'B', vista: { pos: dirXZ(A_FRONTE).multiplyScalar(290).setY(34), target: new V3(0, 62, 0) }, polare: [0.45, 1.95] },
  paradiso: { mondo: 'B', vista: { pos: dirXZ(A_FRONTE).multiplyScalar(460).setY(120), target: new V3(0, 330, 0) }, polare: [1.4, 2.75] },
};
const ORDINE = ['inferno', 'purgatorio', 'paradiso'];

let cieloB = null, barca = null, bocca = null;
function costruisciMondoB() {
  if (mondoB) return;
  mondoB = new THREE.Group();
  mondoB.visible = false;
  scena.add(mondoB);
  const g = mondoB;

  // luci dell'alba
  g.add(new THREE.HemisphereLight('#a9bce2', '#3a2d24', 1.9));
  const sole = new THREE.DirectionalLight('#ffc48e', 2.6);
  sole.position.copy(new V3(SOLE.x, 0.38, SOLE.z).normalize().multiplyScalar(300));
  g.add(sole);
  const riempi = new THREE.DirectionalLight('#8fa3d8', 1.5);   // la luce fredda del cielo sul lato che si guarda
  riempi.position.set(-120, 160, 260);
  g.add(riempi);

  // il cielo all'alba: segue la telecamera (non ha bordo), con le stelle, le quattro stelle e Venere
  cieloB = new THREE.Group();
  g.add(cieloB);
  {
    const geo = new THREE.SphereGeometry(700, 48, 24);
    const pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
    const zenit = new THREE.Color('#071030'), mezzo = new THREE.Color('#1b3064'), orizzonte = NEBBIA_B.color.clone(),
      alba = new THREE.Color('#e49a62'), c = new THREE.Color(), d = new V3();
    const sh = new V3(SOLE.x, 0, SOLE.z).normalize();
    for (let i = 0; i < pos.count; i++) {
      d.fromBufferAttribute(pos, i).normalize();
      const el = d.y;
      if (el <= 0) c.copy(orizzonte);
      else {
        const hl = Math.hypot(d.x, d.z) || 1;
        const sol = Math.max(0, (d.x * sh.x + d.z * sh.z) / hl) ** 4 * (1 - el) ** 4;
        c.copy(orizzonte).lerp(alba, sol);
        c.lerp(mezzo, 1 - liscio(0.35, 0, el));   // dall'orizzonte al blu dell'alba
        c.lerp(zenit, 1 - liscio(1, 0.35, el));   // e al blu notte in alto
      }
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const cupola = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
    cupola.renderOrder = -1;
    cieloB.add(cupola);
    // stelle che svaniscono verso l'alba
    const n = 600, v = [];
    for (let i = 0; i < n; i++) {
      const a = hash(i, 21) * Math.PI * 2, el = 0.3 + hash(i, 22) * 1.25, R = 650;
      v.push(new V3(Math.cos(a) * Math.cos(el) * R, Math.sin(el) * R, Math.sin(a) * Math.cos(el) * R));
    }
    cieloB.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(v),
      new THREE.PointsMaterial({ color: '#d6e0ff', size: 1.4, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.55, depthWrite: false })));
    // le quattro stelle "non viste mai fuor ch'a la prima gente" (Purg. I 22-24): Dante si volta a man destra
    const o = dirXZ(BURELLA), destra = new V3().crossVectors(o, SU);
    const q = o.clone().multiplyScalar(0.72).addScaledVector(destra, 0.42).addScaledVector(SU, 0.55).normalize();
    const u = new V3().crossVectors(q, SU).normalize(), w = new V3().crossVectors(u, q).normalize();
    [[0, 0.05], [0.045, 0], [0, -0.06], [-0.04, 0.005]].forEach(([a, b]) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tessituraPunto('#cfe0ff'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
      s.position.copy(q.clone().addScaledVector(u, a).addScaledVector(w, b).normalize().multiplyScalar(640));
      s.scale.setScalar(20);
      cieloB.add(s);
    });
    // Venere sull'alba: "lo bel pianeto che d'amar conforta" (Purg. I 19)
    const ve = new THREE.Sprite(new THREE.SpriteMaterial({ map: tessituraPunto('#fff1d6'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    ve.position.copy(new V3(SOLE.x, 0.2, SOLE.z).normalize().multiplyScalar(640));
    ve.scale.setScalar(16);
    cieloB.add(ve);
  }

  // il mare
  {
    const mare = new THREE.Mesh(new THREE.CircleGeometry(1200, 96).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: '#123049', emissive: '#081622', roughness: 0.32, metalness: 0.5 }));
    g.add(mare);
  }

  // l'isola: una griglia circolare (anelli × raggi), con anelli fitti sulle pareti delle cornici, così i bordi
  // restano lisci (una griglia quadrata li taglierebbe a dente di sega)
  {
    const raggi = [];
    for (let r = 0; r < 165;) {
      raggi.push(r);
      const pareti = r > 13 && r < 78;
      r += pareti ? (piccolo ? 0.6 : 0.35) : r < 13 ? 0.9 : (piccolo ? 2 : 1.2);
    }
    const nAng = piccolo ? 260 : 520;
    const geo = new THREE.BufferGeometry();
    const vert = new Float32Array(raggi.length * nAng * 3), idx = [];
    raggi.forEach((r, i) => {
      for (let j = 0; j < nAng; j++) {
        const a = (j / nAng) * Math.PI * 2, k = (i * nAng + j) * 3;
        vert[k] = Math.cos(a) * r; vert[k + 2] = Math.sin(a) * r;
      }
    });
    for (let i = 0; i < raggi.length - 1; i++) {
      for (let j = 0; j < nAng; j++) {
        const a = i * nAng + j, b = i * nAng + (j + 1) % nAng, c = (i + 1) * nAng + j, d = (i + 1) * nAng + (j + 1) % nAng;
        idx.push(a, b, c, b, d, c);
      }
    }
    geo.setAttribute('position', new THREE.BufferAttribute(vert, 3));
    geo.setIndex(idx);
    const pos = geo.attributes.position, colori = new Float32Array(pos.count * 3);
    const cF = new THREE.Color('#22333a'), cS = new THREE.Color('#c4ad88'), cB = new THREE.Color('#83725d'), cR = new THREE.Color('#6e6358'),
      cE = new THREE.Color('#4f5f3e'), cP = new THREE.Color('#a69e90'), cW = new THREE.Color('#564d45'), cV = new THREE.Color('#4f7f3f'), c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const { h, r, vicino, zona } = quotaP(x, z);
      pos.setY(i, h);
      if (zona === 0) c.copy(cF);
      else if (zona === 1) c.copy(cS).lerp(cB, chiaro((r - 123.5) / 4.5));
      else if (zona === 2) { c.copy(cR).lerp(cE, chiaro(0.45 + fbm(x * 0.05, z * 0.05, 3) * 1.8 - (h / P_PORTA) * 0.55)); c.lerp(cW, vicino * 0.6); }
      else if (zona === 3) c.copy(cP).lerp(cW, chiaro(vicino * 1.3));
      else c.copy(cV);
      const v = 0.88 + 0.24 * rumore(x * 0.5, z * 0.5);
      colori[i * 3] = c.r * v; colori[i * 3 + 1] = c.g * v; colori[i * 3 + 2] = c.b * v;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colori, 3));
    geo.computeVertexNormals();
    g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0.02 })));
  }

  // i giunchi sulla riva (Purg. I 100-105): Virgilio ne cinge Dante
  {
    const n = piccolo ? 260 : 520;
    const gj = new THREE.ConeGeometry(0.07, 1, 4).translate(0, 0.5, 0);
    const giunchi = new THREE.InstancedMesh(gj, new THREE.MeshStandardMaterial({ color: '#66713f', roughness: 1 }), n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new V3(), p = new V3(), e = new THREE.Euler();
    for (let i = 0; i < n; i++) {
      const a = A_FRONTE + (hash(i, 31) - 0.5) * 2.6, rr = 124 + hash(i, 32) * 3.5;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      p.set(x, Math.max(0, quotaP(x, z).h) - 0.1, z);
      e.set((hash(i, 33) - 0.5) * 0.5, 0, (hash(i, 34) - 0.5) * 0.5);
      q.setFromEuler(e);
      m.compose(p, q, s.set(1, 0.8 + hash(i, 35) * 1.1, 1));
      giunchi.setMatrixAt(i, m);
    }
    g.add(giunchi);
  }

  // la "natural burella": un masso con il foro da cui si esce dal buio
  {
    const o = dirXZ(BURELLA);
    const base = puntoSulP(110.5, BURELLA);
    const geo = new THREE.IcosahedronGeometry(1, 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const k = 1 + 0.25 * fbm(p.getX(i) * 2 + 3, p.getZ(i) * 2 + p.getY(i), 3) * 2;
      p.setXYZ(i, p.getX(i) * k, p.getY(i) * k, p.getZ(i) * k);
    }
    geo.computeVertexNormals();
    const masso = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#463d35', roughness: 1 }));
    masso.position.copy(base).add(new V3(0, 1.4, 0)).addScaledVector(o, -1.5);
    masso.scale.set(6.5, 4.2, 6.5);
    g.add(masso);
    bocca = base.clone().addScaledVector(o, 5.4).add(new V3(0, 1.5, 0));
    const foro = new THREE.Mesh(new THREE.CircleGeometry(1.7, 24), new THREE.MeshBasicMaterial({ color: '#040303' }));
    foro.position.copy(bocca);
    foro.lookAt(bocca.clone().add(o));
    g.add(foro);
  }

  // la porta: tre gradini (marmo bianco, pietra scura e crepata, porfido rosso) e gli stipiti nella parete
  {
    const dp = LUOGHI.find((d) => d.id === 'porta-purgatorio');
    const a = dp ? dp.mappa.a : A_FRONTE + 0.2;
    const o = dirXZ(a), rot = Math.atan2(o.x, o.z);
    ['#ebe7de', '#3b2b36', '#94231b'].forEach((colore, i) => {
      const gr = new THREE.Mesh(new THREE.BoxGeometry(4.2 - i * 0.5, 0.38, 0.9), new THREE.MeshStandardMaterial({ color: colore, roughness: 0.6 }));
      gr.position.copy(dirXZ(a).multiplyScalar(73.4 - i * 0.7)).setY(P_PORTA + 0.2 + i * 0.38);
      gr.rotation.y = rot;
      g.add(gr);
    });
    const stipite = new THREE.MeshStandardMaterial({ color: '#4c443d', roughness: 0.9 });
    const lato = new V3(-o.z, 0, o.x);
    [-1.5, 1.5].forEach((v) => {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4, 0.5), stipite);
      s.position.copy(o.clone().multiplyScalar(71.2)).addScaledVector(lato, v).setY(P_PORTA + 2.6);
      g.add(s);
    });
    const arch = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.5, 0.6), stipite);
    arch.position.copy(o.clone().multiplyScalar(71.2)).setY(P_PORTA + 4.8);
    arch.rotation.y = rot;
    g.add(arch);
  }

  // l'Eden: la foresta viva in cima, con il fiume che nasce da una fonte e si divide (Letè ed Eunoè)
  {
    const n = piccolo ? 90 : 170;
    const tronco = new THREE.CylinderGeometry(0.12, 0.16, 1, 5).translate(0, 0.5, 0);
    const chioma = new THREE.IcosahedronGeometry(1, 0);
    const tronchi = new THREE.InstancedMesh(tronco, new THREE.MeshStandardMaterial({ color: '#4a3a2a', roughness: 1 }), n);
    const chiome = new THREE.InstancedMesh(chioma, new THREE.MeshStandardMaterial({ color: '#5f9a4c', roughness: 0.9, emissive: '#10200a' }), n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new V3(), p = new V3();
    let k = 0;
    for (let i = 0; i < n * 4 && k < n; i++) {
      const a = hash(i, 41) * Math.PI * 2, rr = Math.sqrt(hash(i, 42)) * 14;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      if (Math.abs(z * 0.94 - x * 0.34) < 1.3) continue;      // il fiume
      const y = quotaP(x, z).h, alto = 1.2 + hash(i, 43) * 1.4;
      q.setFromAxisAngle(SU, hash(i, 44) * 6);
      m.compose(p.set(x, y - 0.1, z), q, s.set(1, alto, 1)); tronchi.setMatrixAt(k, m);
      const ch = 0.9 + hash(i, 45) * 0.8;
      m.compose(p.set(x, y + alto + ch * 0.5, z), q, s.set(ch, ch * 1.15, ch)); chiome.setMatrixAt(k, m);
      k++;
    }
    tronchi.count = chiome.count = k;
    g.add(tronchi, chiome);
    const fiume = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 30, 1, 1).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#9ee7ff', transparent: true, opacity: 0.75, alphaMap: tessituraStriscia(), depthWrite: false }));
    fiume.position.set(0, P_VETTA + 0.35, 0);
    fiume.rotation.y = Math.atan2(0.94, 0.34);
    g.add(fiume);
  }

  // particelle del Purgatorio: il fumo degli iracondi, i corridori dell'accidia, il muro di fuoco, le luci dell'Eden
  const corn = (k, f) => { const [fuori, dentro] = P_CORNICI[k]; return dentro + 0.4 + f * (fuori - dentro - 0.8); };
  sciame(g, piccolo ? 140 : 260, '#8a8794', 6, () => {
    const a = Math.random() * Math.PI * 2, rr = corn(2, Math.random());
    return { a, rr, x: Math.cos(a) * rr, y: P_QUOTE[2] + 0.8 + Math.random() * 5.5, z: Math.sin(a) * rr, w: 0.02 + Math.random() * 0.04, f: Math.random() * 6 };
  }, (d, dt) => { d.a += d.w * dt; d.f += dt; d.x = Math.cos(d.a) * d.rr; d.z = Math.sin(d.a) * d.rr; d.y += Math.sin(d.f * 0.6) * dt * 0.25; },
  { additivo: false, opacita: 0.85, mappa: tessituraFumo() });
  sciame(g, piccolo ? 60 : 110, '#fff0c8', 1.1, () => {
    const a = Math.random() * Math.PI * 2, rr = corn(3, Math.random());
    return { a, rr, x: Math.cos(a) * rr, y: P_QUOTE[3] + 0.9, z: Math.sin(a) * rr, w: 0.35 + Math.random() * 0.2 };
  }, (d, dt) => { d.a += d.w * dt; d.x = Math.cos(d.a) * d.rr; d.z = Math.sin(d.a) * d.rr; });
  // il muro di fuoco: la parete lo scaglia sulla cornice, il vento dal bordo lo ricaccia indietro (Purg. XXV 112-114)
  sciame(g, piccolo ? 380 : 760, '#ff7a2e', 2.0, () => {
    const a = Math.random() * Math.PI * 2, rr = corn(6, Math.random() * 0.75);
    return { a, rr, x: Math.cos(a) * rr, y: P_QUOTE[6] + Math.random() * 6, z: Math.sin(a) * rr, v: 2.5 + Math.random() * 3.5 };
  }, (d, dt, i, s) => { d.y += d.v * dt; d.x += Math.sin(d.y * 1.3 + i) * dt * 0.4; if (d.y > P_QUOTE[6] + 7) Object.assign(d, s.nascita(i), { y: P_QUOTE[6] }); });
  sciame(g, piccolo ? 70 : 140, '#e2ffb8', 0.9, () => {
    const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * 13;
    return { x: Math.cos(a) * rr, y: P_VETTA + 1 + Math.random() * 6, z: Math.sin(a) * rr, f: Math.random() * 6 };
  }, (d, dt) => { d.f += dt; d.y += Math.sin(d.f) * dt * 0.4; d.x += Math.cos(d.f * 0.7) * dt * 0.3; });

  // il vasello dell'angelo che porta le anime alla spiaggia (Purg. II): una luce che arriva dal mare
  barca = new THREE.Sprite(new THREE.SpriteMaterial({ map: tessituraPunto('#fff6e0'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  barca.scale.setScalar(10);
  g.add(barca);

  // ---- i cieli
  const datoCielo = (k) => LUOGHI.find((d) => d.regno === 'paradiso' && d.mappa.anello === k);
  const fermi = { fog: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
  const RAGGI_PIANETI = [1.6, 1.2, 1.6, 3.0, 1.6, 2.2, 2.0];   // piccoli: la luce la fa l'alone
  for (let k = 0; k < 9; k++) {
    const d = datoCielo(k);
    const colore = new THREE.Color(d ? d.colore : '#ffffff');
    const R = cieloR(k), Y = cieloY(k);
    const tubo = k === 8 ? 0.42 : 0.24;
    const giro = new THREE.Mesh(new THREE.TorusGeometry(R, tubo, 6, 260).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: colore, opacity: k === 8 ? 0.8 : 0.55, ...fermi }));
    giro.position.y = Y;
    g.add(giro);
    const alone = new THREE.Mesh(new THREE.RingGeometry(R - 3.5, R + 3.5, 180).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: colore, opacity: 0.07, side: THREE.DoubleSide, ...fermi }));
    alone.position.y = Y;
    g.add(alone);
    // le anime che girano nel cielo
    const n = piccolo ? 26 : 52, verso = k % 2 ? 1 : -1;
    sciame(g, n, d ? d.colore : '#ffffff', 2.1, () => {
      const a = Math.random() * Math.PI * 2, rr = R + (Math.random() - 0.5) * 4;
      return { a, rr, x: Math.cos(a) * rr, y: Y + (Math.random() - 0.5) * 2.5, z: Math.sin(a) * rr, w: verso * (0.04 + Math.random() * 0.08) };
    }, (dd, dt) => { dd.a += dd.w * dt; dd.x = Math.cos(dd.a) * dd.rr; dd.z = Math.sin(dd.a) * dd.rr; }, { nebbia: false });
    if (k < 7) {
      const p = dirXZ(d ? d.mappa.a : 1.5).multiplyScalar(R).setY(Y);
      const pianeta = new THREE.Mesh(new THREE.SphereGeometry(RAGGI_PIANETI[k], 24, 16), new THREE.MeshBasicMaterial({ color: colore.clone().multiplyScalar(1.15), fog: false }));
      pianeta.position.copy(p);
      g.add(pianeta);
    }
  }
  // le figure dei cieli, nel piano rivolto verso l'esterno
  const piano = (k) => {
    const d = datoCielo(k), n = dirXZ(d.mappa.a), c = n.clone().multiplyScalar(cieloR(k)).setY(cieloY(k));
    const u = new V3(-n.z, 0, n.x);
    return (s, t, f = 0) => c.clone().addScaledVector(u, s).addScaledVector(SU, t).addScaledVector(n, f);
  };
  const reggi = (k) => {     // un supporto orientato verso l'esterno: i figli nel suo piano XY
    const d = datoCielo(k), n = dirXZ(d.mappa.a);
    const o = new THREE.Object3D();
    o.position.copy(n.clone().multiplyScalar(cieloR(k)).setY(cieloY(k)));
    o.lookAt(o.position.clone().add(n));
    g.add(o);
    return o;
  };
  const cerchio = (raggio, n, z = 0) => Array.from({ length: n }, (_, i) => new V3(Math.cos((i / n) * Math.PI * 2) * raggio, Math.sin((i / n) * Math.PI * 2) * raggio, z));
  // Sole: due corone di dodici luci che girano in versi opposti (Par. X, XII)
  if (datoCielo(3)) {
    const o = new THREE.Object3D();
    o.position.copy(dirXZ(datoCielo(3).mappa.a).multiplyScalar(cieloR(3)).setY(cieloY(3)));
    o.rotation.x = -Math.PI / 2;
    g.add(o);
    [[8, 0.35], [11.5, -0.25]].forEach(([r, vel]) => { const p = nuvola(o, cerchio(r, 12), '#fff0a8', 2.4, null, { nebbia: false }); rotanti.push({ obj: p, asse: 'z', vel }); });
  }
  // Marte: la croce di luci (Par. XIV 100-108), alta sopra il pianeta
  if (datoCielo(4)) {
    const at = piano(4), pts = [], su = 16;
    for (let t = -10; t <= 12.01; t += 0.9) pts.push(at(0, su + t, 0.5));
    for (let s = -8; s <= 8.01; s += 0.9) if (Math.abs(s) > 0.4) pts.push(at(s, su + 5, 0.5));
    nuvola(g, pts, '#ffd2bd', 2.2, null, { nebbia: false });
  }
  // Giove: l'aquila di luci (Par. XVIII-XX), sopra il pianeta
  if (datoCielo(5)) {
    const at0 = piano(5), su = 13, at = (s, t, f) => at0(s, su + t, f), pts = [];
    for (let t = -5; t <= 3; t += 0.75) pts.push(at(0, t, 0.5));                       // corpo
    cerchio(0.9, 8).forEach((p) => pts.push(at(p.x, 4.3 + p.y, 0.5)));                 // testa
    pts.push(at(1.1, 4.1, 0.5), at(1.6, 3.8, 0.5));                                   // becco
    for (let t = 0.08; t <= 1.001; t += 0.07) {                                       // ali
      for (const lato of [-1, 1]) {
        pts.push(at(lato * t * 11, 2 + 4 * Math.sin(t * Math.PI * 0.85) - t * 1.5, 0.5));
        pts.push(at(lato * t * 11, 1.2 - t * 2.4, 0.5));
        if (t > 0.3) pts.push(at(lato * t * 11, 0.2 + 2.6 * Math.sin(t * Math.PI * 0.85) - t * 2.4, 0.5));
      }
    }
    for (let a = -0.6; a <= 0.61; a += 0.15) pts.push(at(Math.sin(a) * 3, -5.4 - Math.cos(a) * 2.6, 0.5)); // coda
    nuvola(g, pts, '#eef6ff', 2.0, null, { nebbia: false });
  }
  // Saturno: la scala d'oro che sale oltre la vista (Par. XXI 28-30)
  if (datoCielo(6)) {
    const at = piano(6), pts = [], col = [];
    const metti = (p, t) => { pts.push(p); const b = chiaro(1 - t / 150); col.push(1 * b, 0.82 * b, 0.4 * b); };
    for (let t = -3; t < 150; t += 0.8) { metti(at(-1.7, t, 0.6), t); metti(at(1.7, t, 0.6), t); }
    for (let t = -2; t < 150; t += 2.6) for (let s = -1.1; s <= 1.11; s += 0.55) metti(at(s, t, 0.6), t);
    nuvola(g, pts, '#ffd56a', 1.6, col, { nebbia: false });
  }
  // le Stelle fisse: una fascia di stelle attorno all'ottavo cielo
  {
    const pts = [], col = [], R = cieloR(7), Y = cieloY(7), n = piccolo ? 450 : 900;
    for (let i = 0; i < n; i++) {
      const a = hash(i, 51) * Math.PI * 2, rr = R + (hash(i, 52) - 0.5) * 14;
      pts.push(new V3(Math.cos(a) * rr, Y + (hash(i, 53) - 0.5) * 9, Math.sin(a) * rr));
      const b = 0.45 + hash(i, 54) * 0.55; col.push(0.85 * b, 0.9 * b, b);
    }
    nuvola(g, pts, '#ffffff', 1.5, col, { nebbia: false });
  }
  // il Primo Mobile: il punto di luce con i nove cerchi di fuoco degli angeli; il più vicino gira più veloce (Par. XXVIII)
  if (datoCielo(8)) {
    const o = reggi(8);
    const caldo = new THREE.Color('#fff3c0'), fuoco = new THREE.Color('#ff7a3a'), c = new THREE.Color();
    for (let i = 0; i < 9; i++) {
      c.copy(caldo).lerp(fuoco, i / 8);
      const p = nuvola(o, cerchio(2 + i * 1.35, 12 + i * 6, 3), '#' + c.getHexString(), 2.0, null, { nebbia: false });
      rotanti.push({ obj: p, asse: 'z', vel: (9 - i) * 0.32 });
    }
  }
  // l'Empireo: la candida rosa, gradini di petali attorno al lago di luce (Par. XXX-XXXI)
  {
    const rosa = new THREE.Object3D();
    rosa.position.y = EMPIREO_Y;
    g.add(rosa);
    const pts = [], col = [], strati = piccolo ? 12 : 17;
    for (let t = 0; t < strati; t++) {
      const raggio = 7 + t * 2.6, n = Math.round((Math.PI * 2 * raggio) / (piccolo ? 1.6 : 1.15)), petali = 10 + t;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + t * 0.13;
        const rr = raggio + 0.6 * Math.cos(a * petali);
        pts.push(new V3(Math.cos(a) * rr, t * 1.7 + 0.04 * t * t, Math.sin(a) * rr));
        const b = 0.55 + 0.45 * hash(i, t + 61);
        col.push(b, b * (0.93 + 0.05 * (t / strati)), b * (0.78 + 0.18 * (t / strati)));
      }
    }
    nuvola(rosa, pts, '#ffffff', 2.0, col, { nebbia: false });
    rotanti.push({ obj: rosa, asse: 'y', vel: 0.03 });
    const lago = new THREE.Mesh(new THREE.CircleGeometry(7, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#fff2c4', opacity: 0.55, side: THREE.DoubleSide, ...fermi }));
    lago.position.y = EMPIREO_Y + 0.2;
    g.add(lago);
    const luce = new THREE.Sprite(new THREE.SpriteMaterial({ map: tessituraPunto('#fff3d0'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    luce.position.set(0, EMPIREO_Y + 1, 0);
    luce.scale.setScalar(46);
    g.add(luce);
  }

  // ---- i marcatori del Purgatorio e del Paradiso, e il cammino dalla spiaggia alla rosa
  for (const m of delRegno('purgatorio')) {
    const k = m.d.mappa.anello;
    const p = puntoSulP(P_ANELLI[k], m.d.mappa.a);
    p.y += m.d.mappa.su ?? (k === 9 ? 5 : 2.4);
    accendi(m, p, g, { scala: 9, raggio: 46 });
  }
  for (const m of delRegno('paradiso')) {
    const k = m.d.mappa.anello;
    const p = k === 9 ? new V3(0, EMPIREO_Y + 3, 0) : dirXZ(m.d.mappa.a).multiplyScalar(cieloR(k)).setY(cieloY(k));
    accendi(m, p, g, { luce: false, scala: k === 8 ? 7 : 13, nebbia: false });
  }
  {
    // sulla montagna il cammino segue il terreno; fra i cieli è più tenue (in aria i trattini sembrano pioggia)
    const ms = [...delRegno('purgatorio'), ...delRegno('paradiso')], monte = [], cielo = [];
    const posa = (m) => ({ r: m.d.regno === 'purgatorio' ? P_ANELLI[m.d.mappa.anello] : m.d.mappa.anello === 9 ? 0 : cieloR(m.d.mappa.anello), a: m.d.mappa.a });
    for (let k = 0; k < ms.length - 1; k++) {
      const A = ms[k], B = ms[k + 1], a = posa(A), b = posa(B);
      for (let t = 0; t < 1; t += 0.03) {
        const r = a.r + (b.r - a.r) * t, ang = a.a + (b.a - a.a) * t;
        if (B.d.regno === 'purgatorio') { const p = puntoSulP(r, ang); p.y += 0.6; monte.push(p); }
        else cielo.push(dirXZ(ang).multiplyScalar(r).setY(A.p.y + (B.p.y - A.p.y) * t));
      }
    }
    if (monte.length) { monte.push(delRegno('purgatorio').at(-1).p.clone()); cammino(g, monte, 0.6); }
    if (cielo.length) { cielo.push(ms.at(-1).p.clone()); cammino(g, cielo, 0.22); }
  }
  precompila();
}

// I materiali del mondo B vengono compilati subito (con il mondo B acceso per un attimo, senza disegnare):
// al primo passaggio non c'è lo scatto della compilazione.
function precompila() {
  const a = mondoA.visible, b = mondoB.visible, f = scena.fog, bg = scena.background;
  mondoA.visible = false; mondoB.visible = true; scena.fog = NEBBIA_B;
  try { renderer.compile(scena, camera); } catch (e) { /* non è grave: compila al primo fotogramma */ }
  mondoA.visible = a; mondoB.visible = b; scena.fog = f; scena.background = bg;
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
// Spostamento dell'obiettivo (non della telecamera: la rotazione resta attorno al centro del regno).
// Sugli schermi larghi la mappa sta a destra del titolo; con la scheda aperta il luogo scelto va a
// sinistra della scheda (o sopra, sui telefoni, dove la scheda sale dal basso).
const sposta = { x: 0, y: 0, mx: 0, my: 0 };
function metaSpostamento() {
  const w = stage.clientWidth, h = stage.clientHeight, largo = w / h > 1.25;
  if (aperto >= 0) { sposta.mx = largo ? 0.17 : 0; sposta.my = largo ? 0 : 0.3; }
  else { sposta.mx = largo ? -0.15 : 0; sposta.my = largo ? 0 : -0.17; } // sul telefono la mappa scende sotto il titolo
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

// ---------------------------------------------------------------- regni e mondi
let regno = 'inferno', mondoAttivo = 'A';
function limiti() { const [a, b] = REGNI[regno].polare; controlli.minPolarAngle = a; controlli.maxPolarAngle = b; }
function impostaMondo(m) {
  if (m === mondoAttivo) return;
  mondoAttivo = m;
  mondoA.visible = m === 'A';
  if (mondoB) mondoB.visible = m === 'B';
  scena.fog = m === 'A' ? NEBBIA_A : NEBBIA_B;
  scena.background = m === 'A' ? NOTTE : NEBBIA_B.color;
  renderer.toneMappingExposure = m === 'A' ? 1.3 : 1.18;
  bloom.strength = m === 'A' ? 0.75 : 0.62;
}
function impostaRegno(r) {
  regno = r;
  stage.dataset.regno = r;
  for (const m of marcatori) m.pin && m.pin.classList.toggle('altrove', m.d.regno !== r);
  indiceNav.querySelectorAll('[data-id]').forEach((b) => b.classList.toggle('altrove', b.dataset.regno !== r));
  stage.querySelectorAll('.tdc-regni [data-regno]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.regno === r ? 'true' : 'false'));
  if (ETICHETTE.indici) indiceNav.setAttribute('aria-label', ETICHETTE.indici[r]);
}
function entra(r) { impostaMondo(REGNI[r].mondo); impostaRegno(r); }

// ---------------------------------------------------------------- voli della telecamera
// Un volo passa per una serie di punti (curva morbida) con un bersaglio che si sposta insieme alla telecamera.
let volo = null, salta = false, inViaggio = false, buioVal = 0;
let riprendi;                          // il timer che fa ripartire la rotazione lenta dopo un trascinamento
const morbido = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const dolce = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
function vola(posizioni, bersagli, durata, alPasso) {
  return new Promise((ok) => {
    controlli.minPolarAngle = 0.01; controlli.maxPolarAngle = Math.PI - 0.01;
    if (quiete) {
      camera.position.copy(posizioni.at(-1)); controlli.target.copy(bersagli.at(-1)); controlli.update();
      alPasso && alPasso(1);
      if (!inViaggio) limiti();
      ok();
      return;
    }
    const pp = [camera.position.clone(), ...posizioni], tt = [controlli.target.clone(), ...bersagli];
    volo = {
      pp, tt, durata, alPasso, poi: ok, t0: performance.now(), lungo: pp.length > 2,
      cp: pp.length > 2 ? new THREE.CatmullRomCurve3(pp, false, 'centripetal') : null,
      ct: tt.length > 2 ? new THREE.CatmullRomCurve3(tt, false, 'centripetal') : null,
    };
  });
}
function volaA(pos, target, durata = 1.7, poi) { vola([pos], [target], durata).then(() => poi && poi()); }
function attesa(ms) {
  return new Promise((ok) => {
    const t0 = performance.now();
    const f = () => (salta || performance.now() - t0 >= ms ? ok() : requestAnimationFrame(f));
    f();
  });
}
function scurisci(v, ms) {
  return new Promise((ok) => {
    const da = buioVal, t0 = performance.now();
    const f = () => {
      const k = salta ? 1 : chiaro((performance.now() - t0) / ms);
      buioVal = da + (v - da) * k;
      velo.style.opacity = buioVal;
      if (k < 1) requestAnimationFrame(f); else ok();
    };
    f();
  });
}
function mostraVerso(chiave) {
  const v = ETICHETTE.passaggi && ETICHETTE.passaggi[chiave];
  if (!v) return;
  passaggio.querySelector('.v-it').textContent = v.it;
  passaggio.querySelector('.v-en').textContent = v.en;
  passaggio.querySelector('.v-cita').textContent = v.cita;
  passaggio.classList.add('visibile');
}
function nascondiVerso() { passaggio.classList.remove('visibile'); }

function vistaDi(m) {
  const fuori = new V3(m.p.x, 0, m.p.z);
  if (fuori.lengthSq() < 4) fuori.set(camera.position.x, 0, camera.position.z);
  fuori.normalize();
  const k = m.d.mappa.anello;
  if (m.d.regno === 'purgatorio') {
    // da fuori e un po' dall'alto: la cornice, la parete dietro e quella sotto. Dalla spiaggia si guarda in su, verso il monte
    if (k === 0) return { pos: m.p.clone().addScaledVector(fuori, 46).add(new V3(0, 7, 0)), target: m.p.clone().add(new V3(0, 16, 0)).addScaledVector(fuori, -20) };
    const [via, su] = k === 9 ? [34, 17] : [36, 11];
    return { pos: m.p.clone().addScaledVector(fuori, via).add(new V3(0, su, 0)), target: m.p.clone().add(new V3(0, 3, 0)) };
  }
  if (m.d.regno === 'paradiso') {
    // da fuori e dal basso, come chi guarda il cielo
    const [via, giu] = k === 9 ? [78, 50] : [48, 22];
    return { pos: m.p.clone().addScaledVector(fuori, via).add(new V3(0, -giu, 0)), target: m.p.clone().add(new V3(0, 2, 0)) };
  }
  // dall'alto e un po' da fuori: si vede la terrazza del cerchio e la parete sotto
  const [via, su] = m.d.mappa.r > 95 ? [34, 30] : [30, 44];
  return { pos: m.p.clone().addScaledVector(fuori, via).add(new V3(0, su, 0)), target: m.p.clone() };
}

// I percorsi dei passaggi fra i regni. a0 = da che lato dell'imbuto o della montagna si comincia.
function percorsoDiscesa(a0) {
  // a spirale giù per i cerchi, fino a Lucifero e sotto il ghiaccio
  const R = [86, 66, 49, 34, 20, 8], Y = [16, -1, -15, -28, -39, -47];
  const pos = [], tgt = [];
  R.forEach((r, k) => {
    const a = a0 - 0.8 * (k + 1), at = a - 0.9;
    pos.push(new V3(Math.cos(a) * r, Y[k], Math.sin(a) * r));
    tgt.push(new V3(Math.cos(at) * r * 0.35, Y[k] - 22, Math.sin(at) * r * 0.35));
  });
  // sopra Lucifero (la sua altura arriva a circa -54), poi dentro: a quel punto lo schermo è già nero
  pos.push(new V3(1.5, -49, 1.5)); tgt.push(new V3(0, -95, 0));
  pos.push(new V3(0.2, -80, 0.2)); tgt.push(new V3(0, -130, 0));
  return { pos, tgt };
}
function percorsoRisalita() {
  // fuori dal foro nella roccia, lo sguardo al mare e alle quattro stelle, poi si gira verso la montagna
  const o = dirXZ(BURELLA), destra = new V3().crossVectors(o, SU), C = bocca.clone();
  const at = (fo, de, su) => C.clone().addScaledVector(o, fo).addScaledVector(destra, de).add(new V3(0, su, 0));
  return {
    inizio: { pos: at(-0.5, 0, 0), tgt: at(40, 6, 12) },
    pos: [at(8, 0.5, 1.6), at(26, 3, 5), at(52, 6, 12), REGNI.purgatorio.vista.pos.clone()],
    tgt: [at(60, 32, 34), at(18, 48, 26), at(-30, 26, 42), REGNI.purgatorio.vista.target.clone()],
  };
}
function percorsoAscesa(a0) {
  // su per le cornici girando attorno alla montagna, sopra l'Eden, poi in cielo
  const pos = [], tgt = [];
  P_QUOTE.forEach((y, k) => {
    const a = a0 + 0.55 * (k + 1);
    pos.push(dirXZ(a).multiplyScalar(P_CORNICI[k][0] + 15).setY(y + 9));
    tgt.push(dirXZ(a + 0.7).multiplyScalar(8).setY(y + 12));
  });
  const a = a0 + 0.55 * 8;
  pos.push(dirXZ(a).multiplyScalar(26).setY(P_VETTA + 14)); tgt.push(new V3(0, P_VETTA + 2, 0));
  pos.push(dirXZ(a).multiplyScalar(12).setY(P_VETTA + 44)); tgt.push(new V3(0, cieloY(4), 0));
  pos.push(REGNI.paradiso.vista.pos.clone()); tgt.push(REGNI.paradiso.vista.target.clone());
  return { pos, tgt };
}

// Il viaggio da un regno all'altro. Avanti segue Dante (giù per l'Inferno e fuori sulla spiaggia; su per la montagna
// e in cielo). Indietro non si rifà la strada al contrario (dal Paradiso all'Inferno erano venti secondi di voli già
// visti): si sfuma sul nero e si riappare sulla vista del regno (Gianluca, 23/11). subito = la stessa dissolvenza, più
// breve (link diretti, movimento ridotto). Un clic o Esc durante il viaggio lo fa finire subito.
async function vaiRegno(dest, { subito = false } = {}) {
  if (!REGNI[dest]) return false;
  if (introT < 1) { history.replaceState(null, '', '#' + dest); return false; }
  if (inViaggio) return false;
  if (dest === regno) { if (aperto >= 0) chiudi(); return true; }
  inViaggio = true; salta = false;
  stage.classList.add('in-viaggio');
  chiudiScheda();
  clearTimeout(riprendi);
  controlli.autoRotate = false; controlli.enabled = false;
  // niente limiti di rotazione durante il viaggio: tornano a destinazione (limiti() nel finally)
  controlli.minPolarAngle = 0.01; controlli.maxPolarAngle = Math.PI - 0.01;
  if (REGNI[dest].mondo === 'B') costruisciMondoB();
  const da = ORDINE.indexOf(regno), a = ORDINE.indexOf(dest);
  const veloce = Math.abs(a - da) > 1 ? 0.72 : 1;
  try {
    if (subito || quiete || a < da) {
      const lenta = !subito && !quiete;  // all'indietro con un clic: un respiro in più, nel nero
      await scurisci(1, lenta ? 650 : 350);
      entra(dest);
      camera.position.copy(REGNI[dest].vista.pos); controlli.target.copy(REGNI[dest].vista.target); controlli.update();
      if (lenta) await attesa(250);
      await scurisci(0, lenta ? 950 : 700);
    } else {
      if (regno === 'inferno') {
        const d = percorsoDiscesa(Math.atan2(camera.position.z, camera.position.x));
        // nero pieno quando la telecamera passa sopra Lucifero (k ≈ 0,77 con la curva dolce)
        await vola(d.pos, d.tgt, 6.8 * veloce, (k) => { buioVal = chiaro((k - 0.57) / 0.2); });
        buioVal = 1;
        entra('purgatorio');
        const r = percorsoRisalita();
        camera.position.copy(r.inizio.pos); controlli.target.copy(r.inizio.tgt); controlli.update();
        mostraVerso('stelle');
        await attesa(2400 * veloce);
        nascondiVerso();
        await vola(r.pos, r.tgt, 6.6 * veloce, (k) => { buioVal = 1 - chiaro(k / 0.2); });
      }
      if (dest === 'paradiso') {
        const s = percorsoAscesa(Math.atan2(camera.position.z, camera.position.x));
        let detto = 0;
        await vola(s.pos, s.tgt, 10 * veloce, (k) => {
          if (detto === 0 && k > 0.62) { detto = 1; mostraVerso('salire'); }
          if (detto === 1 && k > 0.9) { detto = 2; nascondiVerso(); }
        });
      }
    }
  } finally {
    buioVal = 0; velo.style.opacity = 0;
    nascondiVerso();
    entra(dest);
    inViaggio = false; salta = false;
    stage.classList.remove('in-viaggio');
    limiti();
    controlli.enabled = true;
    controlli.autoRotate = !quiete;
    history.replaceState(null, '', dest === 'inferno' ? location.pathname + location.search : '#' + dest);
  }
  return true;
}

// ---------------------------------------------------------------- scheda del luogo
const campo = (sel) => panel.querySelector(sel);
async function apri(i) {
  const m = marcatori[i];
  if (!m || inViaggio) return;
  if (m.d.regno !== regno) {
    const ok = await vaiRegno(m.d.regno);
    if (!ok || regno !== m.d.regno) return;
  }
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
  indiceNav.querySelectorAll('[data-id]').forEach((b) => b.setAttribute('aria-current', b.dataset.id === d.id ? 'true' : 'false'));
  controlli.autoRotate = false;
  metaSpostamento();
  history.replaceState(null, '', '#' + d.id);
  const v = vistaDi(m);
  volaA(v.pos, v.target);
}
function chiudiScheda() {
  if (aperto < 0) return false;
  aperto = -1;
  panel.classList.remove('aperto');
  stage.classList.remove('scheda');
  setTimeout(() => { if (aperto < 0) panel.hidden = true; }, 350);
  for (const mm of marcatori) mm.pin && mm.pin.classList.remove('scelto');
  indiceNav.querySelectorAll('[data-id]').forEach((b) => b.setAttribute('aria-current', 'false'));
  metaSpostamento();
  return true;
}
function chiudi() {
  if (inViaggio || !chiudiScheda()) return;
  history.replaceState(null, '', regno === 'inferno' ? location.pathname + location.search : '#' + regno);
  const v = REGNI[regno].vista;
  volaA(v.pos, v.target, 1.8, () => { controlli.autoRotate = !quiete; });
}
campo('.p-chiudi').addEventListener('click', chiudi);
campo('.p-prec').addEventListener('click', () => aperto > 0 && apri(aperto - 1));
campo('.p-succ').addEventListener('click', () => aperto >= 0 && aperto < marcatori.length - 1 && apri(aperto + 1));
document.addEventListener('keydown', (e) => {
  if (inViaggio) { if (e.key === 'Escape') salta = true; return; }
  if (aperto < 0) return;
  if (e.key === 'Escape') chiudi();
  if (e.key === 'ArrowRight' && aperto < marcatori.length - 1) apri(aperto + 1);
  if (e.key === 'ArrowLeft' && aperto > 0) apri(aperto - 1);
});
stage.addEventListener('pointerdown', () => { if (inViaggio) salta = true; });
const indice = (id) => marcatori.findIndex((m) => m.d.id === id);
document.querySelectorAll('[data-apri]').forEach((b) => b.addEventListener('click', () => apri(indice(b.dataset.apri))));
for (const m of marcatori) m.pin && m.pin.addEventListener('click', () => apri(marcatori.indexOf(m)));
indiceNav.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => apri(indice(b.dataset.id))));
stage.querySelectorAll('.tdc-regni [data-regno]').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.regno === regno) chiudi(); else vaiRegno(b.dataset.regno);
}));
// le cantiche in fondo alla pagina: si torna alla mappa e si parte per quel regno
document.querySelectorAll('.cantica .vai[data-regno]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const dest = a.dataset.regno;
  stage.scrollIntoView({ behavior: quiete ? 'auto' : 'smooth' });
  let n = 0;
  const prova = () => {
    if ((visibile && Math.abs(stage.getBoundingClientRect().top) < 40) || n++ > 50) setTimeout(() => (dest === regno ? chiudi() : vaiRegno(dest)), 200);
    else setTimeout(prova, 60);
  };
  prova();
}));

// ---------------------------------------------------------------- ciclo
const proietta = new V3();
const orologio = new THREE.Clock();
let visibile = true, primo = true, introT = quiete ? 1 : 0, inizioIntro = 0;
new IntersectionObserver((v) => { visibile = v[0].isIntersecting; }, { threshold: 0.02 }).observe(stage);

function posizionaPin() {
  const w = stage.clientWidth, h = stage.clientHeight;
  const cx = camera.position.x, cz = camera.position.z, cl = Math.hypot(cx, cz) || 1;
  for (const m of marcatori) {
    if (!m.pin || !m.p || m.d.regno !== regno) continue;
    proietta.copy(m.p).project(camera);
    let dietro = proietta.z > 1;
    // sulla montagna le luci del lato opposto sono nascoste dalla montagna stessa
    if (m.d.regno === 'purgatorio' && m.d.mappa.anello < 9) {
      const l = Math.hypot(m.p.x, m.p.z) || 1;
      if ((m.p.x * cx + m.p.z * cz) / (l * cl) < -0.15) dietro = true;
    }
    const x = (proietta.x * 0.5 + 0.5) * w, y = (-proietta.y * 0.5 + 0.5) * h;
    m.pin.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -150%)`;
    m.pin.classList.toggle('fuori', dietro || x < -40 || x > w + 40 || y < -40 || y > h + 40);
  }
}

let tBarca = 0;
function fotogramma() {
  requestAnimationFrame(fotogramma);
  if (!visibile || document.hidden) { orologio.getDelta(); return; }
  const dt = Math.min(orologio.getDelta(), 0.05), t = orologio.elapsedTime;
  // introduzione: da Firenze alla vista dall'alto (a tempo vero: con pochi fotogrammi finisce lo stesso)
  if (introT < 1) {
    if (!inizioIntro) inizioIntro = performance.now();
    introT = Math.min(1, (performance.now() - inizioIntro) / 4200);
    const k = morbido(introT);
    camera.position.lerpVectors(INIZIO.pos, VISTA.pos, k);
    controlli.target.lerpVectors(INIZIO.target, VISTA.target, k);
    if (introT >= 1) finisciIntro();
  } else if (volo) {
    const vt = salta ? 1 : Math.min(1, (performance.now() - volo.t0) / (volo.durata * 1000));
    const k = volo.lungo ? dolce(vt) : morbido(vt);
    if (volo.cp) volo.cp.getPoint(k, camera.position); else camera.position.lerpVectors(volo.pp[0], volo.pp[1], k);
    if (volo.ct) volo.ct.getPoint(k, controlli.target); else controlli.target.lerpVectors(volo.tt[0], volo.tt[1], k);
    volo.alPasso && volo.alPasso(vt);
    if (vt >= 1) { const ok = volo.poi; volo = null; if (!inViaggio) limiti(); ok(); }
  }
  if (inViaggio) velo.style.opacity = buioVal;
  controlli.update();
  if (Math.abs(sposta.mx - sposta.x) + Math.abs(sposta.my - sposta.y) > 1e-4) {
    const k = quiete ? 1 : Math.min(1, dt * 3.2);
    sposta.x += (sposta.mx - sposta.x) * k; sposta.y += (sposta.my - sposta.y) * k;
    applicaSpostamento();
  }
  // con una scheda aperta o durante un viaggio la telecamera passa vicino alle luci: luci e aloni più tenui
  const vicino = inViaggio ? 0.15 : aperto >= 0 ? 0.45 : 1;
  for (const m of marcatori) {
    if (!m.sp || REGNI[m.d.regno].mondo !== mondoAttivo) continue;
    const k = 1 + 0.18 * Math.sin(t * 2.1 + m.fase);
    // in viaggio le luci vicinissime alla telecamera si spengono, sennò riempiono lo schermo
    const presso = inViaggio ? chiaro((m.p.distanceTo(camera.position) - 4) / 26) : 1;
    m.sp.scale.setScalar(m.scala * (inViaggio ? 0.5 : aperto >= 0 ? 0.75 : 1) * k * presso);
    if (m.luce) m.luce.intensity = LUCE * vicino * (0.85 + 0.15 * Math.sin(t * 3.3 + m.fase));
  }
  if (!quiete) for (const s of sciami) {
    if (!s.gruppo.visible) continue;
    const arr = s.g.attributes.position.array;
    for (let i = 0; i < s.n; i++) { const d = s.dati[i]; s.passo(d, dt, i, s); arr[i * 3] = d.x; arr[i * 3 + 1] = d.y; arr[i * 3 + 2] = d.z; }
    s.g.attributes.position.needsUpdate = true;
  }
  if (mondoB && mondoB.visible) {
    cieloB.position.copy(camera.position);
    // più in alto, meno foschia: i cieli restano nitidi
    NEBBIA_B.density = 0.0026 - 0.0019 * chiaro((camera.position.y - 90) / 140);
    if (!quiete) for (const r of rotanti) r.obj.rotation[r.asse] += r.vel * dt;
    // la barca dell'angelo: dal largo alla spiaggia, ogni 26 secondi
    tBarca = (tBarca + dt / 26) % 1;
    const dir = dirXZ(A_FRONTE + 0.55);
    barca.position.copy(dir.multiplyScalar(470 - 335 * tBarca)).setY(1.4);
    barca.material.opacity = chiaro(tBarca / 0.1) * chiaro((1 - tBarca) / 0.12);
  }
  composer.render();
  posizionaPin();
  if (primo) { primo = false; stage.classList.remove('loading'); if (quiete) finisciIntro(); }
}
function finisciIntro() {
  introT = 1;
  limiti();
  controlli.enabled = true;
  stage.classList.add('pronto');
  apriDaIndirizzo();
  // il mondo B si prepara quando il browser è libero, così il primo passaggio parte senza attese
  setTimeout(() => (window.requestIdleCallback || ((f) => setTimeout(f, 1)))(() => costruisciMondoB(), { timeout: 4000 }), 2500);
}
// un link come /oltremondo/#lussuria apre direttamente quel luogo (anche ?cerchio=lussuria: alcune app tolgono la
// parte dopo il #); #purgatorio e #paradiso portano al regno
function apriDaIndirizzo() {
  const q = new URLSearchParams(location.search);
  const nome = decodeURIComponent(location.hash.slice(1)) || q.get('cerchio') || q.get('luogo') || '';
  if (REGNI[nome]) { if (nome !== regno) vaiRegno(nome, { subito: true }); return; }
  const i = indice(nome);
  if (i < 0 || i === aperto) return;
  if (marcatori[i].d.regno !== regno) vaiRegno(marcatori[i].d.regno, { subito: true }).then((ok) => ok && apri(i));
  else apri(i);
}
window.addEventListener('hashchange', apriDaIndirizzo);
fotogramma();

// trascinare ferma la rotazione lenta; dopo un po' riparte
controlli.addEventListener('start', () => { controlli.autoRotate = false; clearTimeout(riprendi); });
controlli.addEventListener('end', () => { clearTimeout(riprendi); riprendi = setTimeout(() => { if (aperto < 0 && !quiete && !inViaggio) controlli.autoRotate = true; }, 6000); });

window.__tdc = { apri, chiudi, vaiRegno, camera, controlli, scena, renderer, ETICHETTE, get regno() { return regno; }, get mondoB() { return mondoB; } };
