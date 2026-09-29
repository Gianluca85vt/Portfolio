# Passaggio di consegne: sessione Claude Code web (25–28 settembre 2026)

Questo file riassume quello che è stato fatto nella sessione cloud sul branch
`claude/wonderful-shannon-3gekht`, così che una sessione locale possa riprendere da qui.
**Tutto è già su `main` e online** su www.gianlucascattarella.it. Non c'è niente in sospeso da
unire.

Per la sessione locale: leggi prima questo file, poi il README (le sezioni "Portfolio: dove sta
cosa" e "Asset 3D da Blender" descrivono i file della home e gli script Blender).

---

## Regole fisse date da Gianluca

- **Non rompere nulla, e non toccare EasyFrame** (`public/easyframe/`, le rotte `/easyframe`,
  le eccezioni in `vercel.json`). Si lavora solo su portfolio e blog.
- **Recensioni provate di persona** (`handsOn: true` nel frontmatter): mai citare altre testate,
  il voto è solo il suo. La regola è scritta anche in `notes/article-voice.md`.
- **Email: solo bozze**, mai inviare.
- **Pubblicare = push su `main`**, che sovrascrive la produzione. Farlo solo dopo aver verificato
  che build, test e link funzionino (vedi sotto).
- Gli articoli pubblicati non devono linkare bozze: la bozza non viene costruita, quindi il link
  sul sito dà 404.

## Come si pubblica e cosa controllare prima

```sh
git pull                       # main riceve commit automatici più volte al giorno
npm run build                  # deve finire con 0 errori
npm test
node scripts/check-links.mjs   # deve dire broken: 0 e missing anchors: 0
git push origin HEAD:main
```

- Push su `main` → deploy di produzione su Vercel. `scripts/vercel-ignore.mjs` salta il deploy
  quando il push tocca solo `notes/`, `scripts/`, `.github/` o il README.
- `main` si muove da solo (feed, bozze, registro social, card per Instagram). Prima di pushare fai
  `git fetch` + **merge** (non rebase) di `origin/main`.
- Workflow GitHub Actions:
  - `ci.yml`: build + test su ogni push, tranne quelli che toccano solo `notes/`.
  - `notify-drafts`: IndexNow per gli articoli pubblicati che cambiano; le email partono solo per
    le bozze.
  - `social-post`: pubblica su Facebook e Instagram gli articoli nuovi o modificati **che non sono
    già** in `notes/social-posted.json`. Modificare un articolo già in quel file non lo
    ripubblica; pubblicarne uno nuovo sì.
- `scripts/check-links.mjs` è nuovo (aggiunto a fine sessione). Legge la build in
  `.vercel/output/static` e controlla ogni link, immagine e ancora interna. Esce con 1 se trova
  qualcosa di rotto.

---

## Cosa è stato fatto, in ordine

### 25 settembre — sicurezza, backend, SEO, pulizia

| Commit | Cosa |
|---|---|
| `d3064be` | Anteprima del CMS in un iframe sandbox: l'HTML di una bozza non può più eseguire script con la sessione dell'admin. |
| `e6686f1` | Il CMS legge gli articoli allo sha esatto e blocca i salvataggi per file (evitava di rimettere testo vecchio per via della cache di raw.githubusercontent). |
| `6c432ef` | `draft-notify` e `story-ready` richiedono l'header `x-hook-secret` se `HOOK_SECRET` è impostato su Vercel. |
| `fc46dde` | Banner di consenso prima di Google Analytics, Kanit servito dal sito (niente Google Fonts), pagina `/privacy/` linkata nel footer. |
| `3566f37` | Limite ai tentativi di login su `/moderation`, header di sicurezza in `vercel.json` (EasyFrame escluso), escape di `<` nel JSON-LD. |
| `c49d347` | `social-post` considera tutto il push, non solo l'ultimo commit; lo slug manuale viene validato. |
| `d7648ca` | Workflow CI e `npm test`. |
| `1e2d7b0` | Sitemap con date vere (campo opzionale `updated`), niente stelle aggregate da altre testate nei dati strutturati, miniature WebP per le card. |
| `6a2a1be` | Helper server condivisi (`src/lib/html.ts`, `src/lib/ip-hash.ts`), icone deprecate sostituite, note aggiornate. |
| `d343ac5` | README riscritto, `supabase/schema.sql` di riferimento, `HOOK_SECRET` in `.env.example`. |
| `75759ad` | `<meta charset>` di nuovo nei primi 1024 byte. |

### 26 settembre — recensione Pawbay

- `b45e152` / `89c96ed`: recensione di Pawbay riscritta in prima persona dalle note di
  Gianluca, con le sue due catture e il trailer ufficiale, poi pubblicata.
- `b8bf01c`: regola "hands-on": niente altre testate, voto suo. `handsOn: true` cambia il box del
  voto in "My score", e `check-sources` lo lascia passare senza fonti.
- `fa3b053`: le recensioni hands-on tornano a essere marcate come `Review` (con `itemReviewed`
  VideoGame); le rassegne restano `BlogPosting`.

### 27 settembre — redesign della home ("Viewport")

- `9354327`: home ridisegnata come un viewport 3D. Le immagini entrano a riquadri come un render
  (bucket), le opere stanno in cornici con angoli da mirino, e le etichette sono in JetBrains Mono.
  C'è una scelta "studio / cliente" che cambia alcune frasi e i pulsanti (salvata nel browser).
  Sezioni:
  - Hero con la testa che segue il puntatore
  - What I do
  - Work (filtri, vista valori/due toni, visore a tutto schermo con gli strumenti da art director)
  - Showreel
  - Try the job (3 esperimenti)
  - About
  - Direction
  - AI
  - Blog
  - Contatti
- `f9c7b80`, correzioni chieste da Gianluca:
  - I titoli si illuminano lettera per lettera al passaggio del mouse (`src/components/ui/useLetterGlow.ts`).
  - Testa con interruttore Shaded/Wireframe e un glitch in wireframe di 1/4 di secondo ogni
    5–11 secondi. Il video wire (`public/img/video/rotazione faccia wire.mp4`) è generato da
    `scripts/wire-head.mjs` a partire dal video a colori; non è un render vero.
  - La timeline dello showreel si trascina con la puntina.
  - `scripts/blender/portfolio_passes.py`: esporta GLB + passate clay e wire da una scena Blender.
- `94d43e7`: Work come stanza a gravità zero. Le immagini fluttuano su un anello, quelle dietro
  sono più scure e sfocate, e la vista si gira trascinando o con le frecce. Al passaggio del mouse
  un'immagine si ferma e si evidenzia; al clic si apre il visore, e alla chiusura la stanza torna
  sull'ultima immagine vista. C'è anche la vista Grid. File: `src/components/home/WorkSpace.tsx`,
  `Work.tsx`.
- `6ce9f07`: tolti i segnaposto `[[ANEDDOTO]]` da 4 articoli, cancellate 2 bozze vecchie e tolti i
  link che le richiamavano da 5 articoli.
- `633e140`: su telefono e tablet la testa non viene più tagliata. Sotto `lg` l'hero è una colonna.

### 28 settembre — EVA

- `ba527dd`, **"Detail budget" con EVA-01 al posto della roccia**:
  - `scripts/blender/detail_levels.py` ha convertito l'FBX di EVA-01 (330.000 triangoli) in 5
    livelli: 500 / 1.999 / 8.000 / 31.999 / 128.000 triangoli (`public/models/eva01-0..4.bin.gz`).
    1.999 e 31.999 sono i numeri reali: la decimazione toglie due triangoli alla volta.
  - Visualizzatore WebGL2 in `src/components/home/model-gl.ts`, pannello in `Lab.tsx`
    (`ModelStage`).
  - Viste: Wireframe, Clay, e Colour in cel shading con contorno.
  - Flat/Smooth, direzione della luce, rotazione trascinando.
  - Senza WebGL2 mostra `eva01.jpg`.
  - I dati (conteggi, file, etichette) sono in `lab.detail` in `src/data/home.ts`.
  - Rimossi `rock.ts` e `rock-gl.ts`.

  Comando per rigenerare i livelli:

  ```sh
  blender -b --python scripts/blender/detail_levels.py -- eva_01.fbx --out public/models --name eva01 --front +x
  ```

- `ba527dd` + `0489d3d`, **28 immagini EVA nella sezione 3D** (ora 38 in totale), ridimensionate a
  1600 px. Sono WebP dove il render era trasparente. Nomi originali → nomi nel repo:
  - **EVA-01** (cartella Drive "Eva 01"):
    - `cartoon def1.jpg` → `eva01-sky.jpg`
    - `cartoon1.png` → `eva01-closeup.webp`
    - `cartoon2.png` → `eva01-three-quarter.webp`
    - `cartoon4.png` → `eva01-front.webp`
    - `cartoon5.png` → `eva01-spotlight.webp`
    - `33.png` → `eva01-pose.webp`
    - `13.png` → `eva01-pylons.webp`
    - `19.png` → `eva01-legs.webp`
    - `8.png` → `eva01-head.webp`
    - `wireframe.png`, `wireframe2.png`, `wireframe3.png` → `eva01-wire-front.webp`,
      `eva01-wire-side.webp`, `eva01-wire-detail.webp`
    - `rush.png` → `eva01-charge.webp` (*)
    - `eva01.jpg` era già sul sito.
  - **EVA-00** ("eva 00"):
    - `copertina 00.jpg` → `eva00.jpg`
    - `1.png` → `eva00-front.webp`
    - `2.png` → `eva00-backlit.webp`
    - `4.png` → `eva00-closeup.webp`
    - `12.png` → `eva00-rifle.webp`
    - `14.png` → `eva00-aim.webp`
    - `15.png` → `eva00-lunge.webp`
    - `17.png` → `eva00-leap.webp`
    - `10.png` → `eva00-kneeling.webp` (*)
  - **EVA-02** ("Eva 02"):
    - `miniatura posa.jpg` → `eva02-cover.jpg`
    - `knife.png` → `eva02-knife.webp`
    - `7-2.jpg` → `eva02-eyes.jpg`
    - `8.jpg` → `eva02-viewport.jpg`
    - `5.png`/`6.png` → `eva02-front.webp`, `eva02-side.webp` (*)
    - `8.png` (viewport con il rig) (*) non è stato aggiunto perché uguale a `eva02-viewport.jpg`.
    - `eva02.png` era già sul sito, ora col titolo "EVA-02 — on the carrier".

  (*) Questi cinque file superavano i 6 MB e il connettore Drive della sessione web non riusciva
  a scaricarli. Gianluca li ha mandati in chat senza nome, quindi l'abbinamento al nome originale
  è dedotto dal contenuto. Le immagini sul sito sono comunque quelle giuste.

  Se la cartella locale `public/img/3d` contiene ancora gli originali con i nomi vecchi, sono
  file non tracciati: non vanno committati, perché le versioni nel repo sono già ridimensionate.
  L'ordine e i titoli sono in `modelGallery` in `src/data/portfolio.ts`.
- `28578b9`: l'articolo `gta-2-rtx-remix-d3d9-renderer` linkava la bozza
  `rtx-mega-geometry-2-vram-streaming` (404). Il link è stato tolto, la frase è rimasta.
- Aggiunto `scripts/check-links.mjs` e questo file.

---

## Cose aperte

1. **Tre bozze non toccate** — *chiuso il 29 settembre: eliminate tutte e tre, con le immagini, su richiesta di Gianluca*:
   - `ace-combat-8-wings-of-theve-review` (26/9)
   - `rtx-mega-geometry-2-vram-streaming` (27/9)
   - `the-helper-closes-warcraft-3-archive` (22/9)

   Se `rtx-mega-geometry-2-vram-streaming` viene pubblicata, si può rimettere il link in
   `gta-2-rtx-remix-d3d9-renderer.md`, sulla frase "RTX Mega Geometry 2.0 streaming 31GB of mesh
   through 1.5GB of VRAM".
2. **Bordi invisibili nel blog**: `border-[#D7E2EA]/12` (e `bg-[#D7E2EA]/14`) non è una classe
   valida per Tailwind 3, quindi quei bordi non vengono disegnati. Le classi sono in:
   - `RelatedPosts.astro`
   - `ArtistView.astro`
   - `ScoreBox.astro`
   - `Partnerships.astro`
   - `ArticleByline.astro`
   - `BlogList.tsx`
   - `pages/blog/category/[category].astro`

   La correzione è `/[0.12]` (e `/[0.14]`). Non è stata applicata perché cambia l'aspetto del blog
   e non era stata chiesta.
3. **Jian doppio in Concept Art**: `public/img/concept/jian-colore-2.jpg` e
   `public/img/jian/jian-key-art.jpg` sono lo stesso file (stesso md5), ed entrambi sono in
   `conceptGallery`. Se ne può togliere uno.
4. **Testa wireframe**: ora è ricostruita dal video. Per averla vera si può renderizzare la
   rotazione della testa in Blender con `portfolio_passes.py --only wire --turntable`: stessi 190
   fotogrammi a 24 fps, tagliato alla metà centrale dell'inquadratura. Poi si sostituisce
   `public/img/video/rotazione faccia wire.mp4`.
5. **Miniature in `astro dev`**: le card usano le WebP in `public/img/cards/`, che fa la build.
   Se aggiungi immagini e le vedi rotte in dev, lancia `node scripts/card-thumbs.mjs`.

## Stato alla consegna

- `main` a `28578b9`, più i commit automatici arrivati dopo.
- Deploy di produzione READY.
- Build con 0 errori, test passati, `check-links`: 0 link rotti.
