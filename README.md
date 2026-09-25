# Gianluca Scattarella — Portfolio e Backdrop

Il sito di [gianlucascattarella.it](https://www.gianlucascattarella.it): il portfolio
(rifacimento del vecchio sito Weebly, stile dark / Kanit / gradient) e **Backdrop**,
il blog su giochi, film, 3D e hardware letti dal lato della produzione.

Stack: **Astro 7 + React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide React**,
su **Vercel**. Commenti e account del CMS su **Supabase**.

Astro genera **HTML statico per ogni rotta**: ogni pagina ha i suoi meta tag, e gli
articoli sono HTML reale, leggibile dai crawler senza eseguire JavaScript. I componenti
React vengono idratati solo dove serve l'interattività. Poche rotte girano come
funzioni (`prerender = false`): le API, `/cms` e `/moderation`.

## Comandi

```bash
npm install
npm run dev     # sviluppo su http://localhost:4321
npm test        # test degli script e del filtro dei commenti
npm run build   # miniature delle card, astro check, build, e toglie le foto del blog dal pacchetto
```

`npm run build` esegue anche `astro check`, che valida i tipi e il frontmatter degli
articoli: un errore di battitura in una categoria fa fallire il build invece di finire
online. La CI (`.github/workflows/ci.yml`) esegue `npm test` e `npm run build` a ogni push
e pull request.

## Rotte

| URL | File | Note |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Portfolio, un'unica isola React (`HomePage`) |
| `/about/` | `src/pages/about.astro` | Chi scrive il blog |
| `/blog/` | `src/pages/blog/index.astro` | Indice, filtri e ricerca |
| `/blog/<slug>/` | `src/pages/blog/[...slug].astro` | Articolo |
| `/blog/category/<categoria>/` | `src/pages/blog/category/[category].astro` | Una pagina per sezione |
| `/blog/reviews/` | `src/pages/blog/reviews/index.astro` | Tutte le recensioni con voto |
| `/blog/search-index.json` | `src/pages/blog/search-index.json.ts` | Testo di tutti gli articoli, per la ricerca |
| `/rss.xml` | `src/pages/rss.xml.ts` | Feed RSS |
| `/privacy/` | `src/pages/privacy.astro` | Informativa e scelta sugli analytics |
| `/no-track/` | `src/pages/no-track.astro` | Esclude il proprio dispositivo dagli analytics (noindex) |
| `/cms` | `src/pages/cms.astro` | Backend per scrivere e pubblicare (noindex) |
| `/moderation` | `src/pages/moderation.ts` | Moderazione dei commenti (noindex) |
| `/authors/` | `src/pages/authors.astro` | Solo un redirect verso `/about/` |
| `/easyframe/`, `/easyframe/it/` | `src/pages/easyframe/` | Pagine a sé, con layout e analytics propri |

La pagina membri è parcheggiata in `src/pages/_members.astro`: il trattino basso la
esclude dal routing, quindi `/members/` oggi non esiste.

## Scrivere un articolo

Un file `.md` in `src/content/blog/`: il nome del file diventa l'URL. Si può scrivere
anche da `/cms`, che fa un commit per salvataggio. Frontmatter:

```yaml
---
title: Titolo dell'articolo
date: 2026-09-25
category: Games        # Editorial, 3D, Tech, AI, Games, Manga, Film & TV, Collecting
excerpt: Una riga che compare nella card e nei meta tag.
cover: /img/blog/<slug>/shot-01.jpg
draft: true            # finché c'è, l'articolo non è sul sito
updated: 2026-09-27    # opzionale: ultima revisione vera, per sitemap e dateModified
column: Architectures of the Void   # opzionale: rubrica, sopra il titolo
sources:               # due testate diverse prima di pubblicare
  - { outlet: IGN, url: https://… }
  - { outlet: Eurogamer, url: https://… }
# Solo per le recensioni:
score: 7.5             # media dei voti citati, a mezzi punti
reviewOf: EA Sports FC 27
scoreSources:
  - { outlet: IGN, score: 8 }
---
```

Lo schema è in `src/content.config.ts`, le categorie in `blogCategories` dentro
`src/data/portfolio.ts`. Regole che il build fa rispettare:

- dal 30 agosto 2026 un articolo pubblicato deve avere una copertina vera, non l'SVG
  disegnato, e il file deve esistere;
- `artistView` e `updated` non possono far fallire il build: se sono malformati
  vengono ignorati.

La regola delle due fonti **non** è nello schema (una volta ha bloccato tutto il sito):
la controlla `scripts/check-sources.mjs` prima che la bozza arrivi via email.

## Immagini

Le foto degli articoli stanno in `public/img/blog/<slug>/` e restano nel repository, ma
**non** vengono spedite a Vercel: `scripts/strip-blog-images.mjs` le toglie dal pacchetto
dopo il build e una rewrite in `vercel.json` manda `/img/blog/...` a jsDelivr, che le
serve dal repository. Motivo: lo spazio dei deployment del piano gratuito.

Le card delle liste usano invece miniature WebP da 800px, generate a ogni build da
`scripts/card-thumbs.mjs` in `public/img/cards/` (ignorata da git) e spedite con il
deployment. Se una miniatura manca, la card usa la copertina originale
(`src/lib/card-image.ts`).

## Backend

**Commenti.** `POST /api/comments` salva su Supabase e pubblica subito; il filtro in
`src/lib/moderation.ts` segnala nella mail di notifica i commenti offensivi, non li
blocca. C'è un limite di 3 commenti ogni 10 minuti per indirizzo (salvato solo come hash
con sale). La mail contiene un link firmato per cancellare; `/moderation` mostra tutto,
con accesso tramite `COMMENT_ADMIN_SECRET` e al massimo 10 tentativi ogni 15 minuti.

**Bozze via email.** Quando una bozza arriva su `main`, `notify-drafts.yml` chiama
`/api/draft-notify`, che manda una mail con i pulsanti Pubblica / Rivedi / Elimina.
I link sono firmati e agiscono solo dopo una conferma (GET mostra, POST esegue), perché i
client di posta aprono i link da soli. Pubblicare fa un commit su `main` tramite
`GITHUB_TOKEN`, dopo aver controllato le stesse regole del build (`publishRefusal`).

**CMS (`/cms`).** Account su Supabase con password scrypt: un admin, più editor invitati
con un link monouso che scelgono la propria password. Gli editor salvano solo bozze;
solo l'admin pubblica. Ogni salvataggio è un commit (testo e immagini insieme), bloccato
se nel frattempo qualcun altro ha cambiato lo stesso file. L'anteprima gira in un iframe
sandbox, quindi l'HTML di una bozza non può eseguire codice.

Lo schema delle tabelle è in [`supabase/schema.sql`](supabase/schema.sql).

## Variabili d'ambiente

Tutte in [`.env.example`](.env.example), con le istruzioni. In breve:

| Variabile | A cosa serve |
| --- | --- |
| `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` | Lettura dei commenti dal browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Scrittura commenti e account, solo lato server |
| `COMMENT_IP_SALT` | Sale per l'hash degli indirizzi |
| `COMMENT_ADMIN_SECRET` | Password di `/moderation`, firma dei link e dei cookie |
| `SMTP_*`, `NOTIFY_TO`, `NOTIFY_FROM` | Mail di notifica |
| `GITHUB_TOKEN` | Commit dal CMS e dai link delle bozze |
| `HOOK_SECRET` | Facoltativa: protegge `/api/draft-notify` e `/api/story-ready` |

Le API leggono `process.env` a ogni richiesta (`src/lib/env.ts`), non `import.meta.env`:
cambiare una variabile su Vercel ha effetto subito, senza un nuovo build.

## Automazioni (GitHub Actions)

| Workflow | Quando | Cosa fa |
| --- | --- | --- |
| `ci.yml` | ogni push e PR | `npm test` e `npm run build` |
| `harvest-sources.yml` | 5 volte al giorno | Scarica i feed delle fonti in `notes/feeds/` e il calendario delle recensioni |
| `notify-drafts.yml` | push su articoli o richieste immagini | Scarica le immagini richieste, avvisa IndexNow, manda la mail di revisione |
| `normalise-review-titles.yml` | push su articoli | Toglie il voto dai titoli delle recensioni |
| `social-post.yml` | push che pubblica un articolo | Disegna la card e posta su Facebook e Instagram |
| `social-digest.yml` | ogni sera | Disegna i frame della storia e li manda via mail |
| `report.yml` | ogni 4 giorni | Report PDF da Analytics e Bing via mail |
| `social-check.yml` | a mano | Controlla le credenziali Meta |

`vercel.json` usa `scripts/vercel-ignore.mjs` per saltare i deployment delle push che
non cambiano nulla di visibile (feed, ledger, bozze, card per Instagram).

## Privacy e analytics

Google Analytics si carica **solo dopo il consenso** dato nel banner (`src/layouts/Base.astro`);
la scelta si cambia da `/privacy/`. Kanit è servito dal sito (`@fontsource/kanit`), non da
Google Fonts. `/no-track/` esclude il proprio dispositivo dagli analytics in ogni caso.
Se aggiungi un servizio che riceve dati dei visitatori, va aggiunto anche a
`src/pages/privacy.astro`.

## Portfolio: dove sta cosa

Quasi tutto il contenuto sta in [`src/data/portfolio.ts`](src/data/portfolio.ts): testi,
email, voci di menu, skill, video, progetti, le due liste del marquee e le categorie del
blog. Per cambiare un'immagine basta metterne una nuova in `public/img/...` e aggiornare
il path lì.

| Sezione Weebly | Dove finisce ora |
| --- | --- |
| About | `HeroSection` (ritratto 3D) + `AboutSection` (bio animata carattere per carattere) |
| Concept | `ServicesSection` voce 01 + immagini nel marquee e nelle card |
| 3D | `ServicesSection` voce 02 + immagini nel marquee |
| Animations | `ServicesSection` voce 03 + `ShowreelSection` |
| Unreal Engine | `ServicesSection` voce 04 + `ShowreelSection` + card 02 |
| Architecture | `ServicesSection` voce 05 + card 03 + immagini nel marquee |
| JIAN: Claws of Destiny | Figura dell'hero + card progetto 01 + testo in `ContactSection` |
| Resume | Link al CV in `ContactSection` |
| — | `AiSection` e il blog sono nuovi |

Cliccando una card dei progetti si apre un popup: `conceptGallery` e `architectureGallery`
sono slideshow, la card Unreal apre la lista dei video. Nelle gallerie `title` è
opzionale ed è compilato solo dove il nome dell'opera è certo.

### Note sugli asset

- Le immagini del portfolio sono state scaricate dal sito Weebly e servite in locale,
  così il sito non dipende dal vecchio account.
- `public/img/me/avatar-3d.png` è il ritratto 3D scontornato dal fondo verde; è il
  sorgente degli altri file e della favicon.
- **Occhi che seguono il mouse**: per ogni occhio `eye-layer-*.png` è una copia del bulbo
  ritagliata dal render e `eye-mask-*.png` la sagoma della sclera. `AvatarEyes` fa
  scorrere il layer sopra il render, tagliato dalla maschera. Le coordinate in
  `AvatarEyes.tsx` sono in pixel del render sorgente 656x913: da rimisurare se cambi il
  ritratto.
- Le anteprime dei video sono scaricate da YouTube; l'iframe (youtube-nocookie) viene
  montato solo al click.
- `public/Resume.pdf` è il CV: per aggiornarlo basta sovrascrivere il file mantenendo il
  nome.
