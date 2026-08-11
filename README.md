# Gianluca Scattarella — Portfolio

Rifacimento del portfolio [gianlucascattarella.weebly.com](https://gianlucascattarella.weebly.com/),
mantenendo le stesse sezioni del sito precedente con lo stile dark / Kanit / gradient
del brief, più una pagina membri e un blog.

Stack: **Astro + React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide React**.

Astro genera **HTML statico per ogni rotta**: ogni pagina ha i suoi meta tag, e gli
articoli del blog sono HTML reale nel sorgente, leggibili dai crawler senza eseguire
JavaScript. I componenti React vengono idratati solo dove serve l'interattività.

## Comandi

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Il build finisce in `dist/` come sito statico, pronto per Vercel o qualsiasi hosting.
`npm run build` esegue anche `astro check`, che valida i tipi e il frontmatter dei post:
un errore di battitura in una categoria fa fallire il build invece di finire online.

## Rotte

| URL | File |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/members/` | `src/pages/members.astro` |
| `/blog/` | `src/pages/blog/index.astro` |
| `/blog/<slug>/` | `src/pages/blog/[...slug].astro` |

## Scrivere un articolo

Aggiungi un `.md` in `src/content/blog/`. Il nome del file diventa l'URL. Frontmatter:

```yaml
---
title: Titolo dell'articolo
date: 2026-08-11
category: 3D        # 3D, AI, Games, Manga, Film o Collecting
excerpt: Una riga che compare nella card.
cover: /img/arch/soggiorno-1.jpg   # opzionale
draft: true                        # opzionale, lo esclude dal build
---
```

Lo schema è validato in `src/content.config.ts`.

## Mappa: sito vecchio → sito nuovo

| Sezione Weebly    | Dove finisce ora                                                  |
| ----------------- | ----------------------------------------------------------------- |
| About             | `HeroSection` (ritratto 3D) + `AboutSection` (bio con animazione carattere-per-carattere) |
| Concept           | `ServicesSection` voce 01 + immagini nel marquee e nelle card      |
| 3D                | `ServicesSection` voce 02 + immagini nel marquee                   |
| Animations        | `ServicesSection` voce 03 + `ShowreelSection` (6 video)            |
| Unreal Engine     | `ServicesSection` voce 04 + `ShowreelSection` (6 video) + card 02  |
| Architecture      | `ServicesSection` voce 05 + card 03 + immagini nel marquee         |
| JIAN: Claws of Destiny | Figura dell'hero + card progetto 01 + testo in `ContactSection` |
| Resume            | Link al CV in `ContactSection`                                     |
| —                 | `AiSection` è nuova, non c'era sul sito Weebly                      |

## Membership e blog

Il sito ha tre rotte: `/` (home), `/members`, `/blog` e `/blog/:slug`.

**Membership.** Pagamenti, account e consegna dei contenuti stanno su **Ko-fi**, non qui.
Vendere abbonamenti digitali in proprio renderebbe Gianluca il venditore di record, con
obblighi IVA/OSS in tutta l'UE: Ko-fi se li assume ed è la piattaforma con le commissioni
più basse a questo prezzo. La pagina `/members` è una landing che vende il valore e porta
lì. Prezzo e testi stanno in `members` dentro [`portfolio.ts`](src/data/portfolio.ts);
l'URL Ko-fi va aggiornato lì quando l'account è attivo.

**Blog.** Gli articoli sono file Markdown in `src/content/blog/`, con un blocco
frontmatter in cima:

```
---
title: Titolo dell'articolo
date: 2026-08-06
category: 3D
excerpt: Una riga che compare nella card.
cover: /img/video/U9QQZWzm9Ac.jpg
---
```

`category` deve essere uno dei valori in `blogCategories` (3D, AI, Games, Manga,
Film & TV, Collecting). `excerpt` e `cover` sono opzionali. Per pubblicare basta
aggiungere il file e fare push: Vite li incorpora nel bundle, nessun CMS e nessuna
chiamata a runtime.

`vercel.json` contiene una rewrite verso `index.html`: senza, aprire `/blog/qualcosa`
direttamente darebbe 404, perché il routing è lato client.

## Struttura

```
src/
  data/portfolio.ts        ← tutti i testi, le liste di immagini e i video
  components/
    HeroSection.tsx        ← navbar, titolo gradient, figura di Jian
    MarqueeSection.tsx     ← due file di immagini che scorrono con lo scroll
    AboutSection.tsx       ← bio + 4 immagini decorative negli angoli
    ServicesSection.tsx    ← blocco bianco, le 5 discipline
    AiSection.tsx          ← i tre ruoli IA + il toolkit
    ShowreelSection.tsx    ← griglia video YouTube (iframe caricato solo al click)
    ProjectsSection.tsx    ← 3 card sticky che si impilano scrollando, ognuna apre un popup
    ContactSection.tsx     ← contatti, CV, Discord, footer
    ui/                    ← FadeIn, Magnet, AnimatedText, AvatarEyes, Modal,
                             GalleryViewer, VideoListViewer, ContactButton
public/img/
  3d/ concept/ arch/ jian/ me/ video/
```

## Modificare i contenuti

Quasi tutto sta in [`src/data/portfolio.ts`](src/data/portfolio.ts): testi, email, voci di menu,
descrizioni delle skill, elenco dei video, dati dei progetti e le due liste del marquee.
Per cambiare un'immagine basta metterne una nuova in `public/img/...` e aggiornare il path lì.

Cliccando una card dei progetti si apre un popup sopra la pagina: `conceptGallery` e
`architectureGallery` sono slideshow, mentre la card Unreal apre la lista dei video.
Nelle gallerie il campo `title` è opzionale — l'ho compilato solo dove il nome dell'opera
è certo (i pezzi di Jian e gli archviz); sugli altri compare solo il contatore, così non
ci sono titoli inventati. Aggiungili lì quando vuoi.

## Note sugli asset

- Tutte le immagini sono state scaricate dal sito Weebly e servite in locale: nessuna
  dipendenza da domini esterni, così il sito non si rompe se il vecchio account viene chiuso.
- `public/img/me/avatar-3d.png` è il ritratto 3D scontornato dal fondo verde (chroma key
  con despill sul bordo). È il sorgente da cui derivano gli altri file, e la favicon.
- **Occhi che seguono il mouse**: il render non viene ritoccato, `avatar-3d.png` è mostrato
  così com'è. Per ogni occhio, `eye-layer-*.png` è una copia dell'intero bulbo ritagliata
  dal render e `eye-mask-*.png` la sagoma della sclera.
  `AvatarEyes` fa scorrere il layer sopra il render, tagliato dalla maschera perché non
  arrivi mai sulle ciglia. A riposo il layer ricade esattamente su sé stesso, quindi
  l'avatar è identico all'originale; mentre scorre, ciò che scopre torna a essere la
  sclera vera sottostante. Le coordinate in `AvatarEyes.tsx` sono in pixel del render
  sorgente 656x913: da rimisurare se cambi il ritratto.
- `public/img/jian/jian-cutout.png` è la key art di Jian scontornata dal fondo bianco.
  Non è più usata nell'hero, ma resta a disposizione.
- Le tre immagini della card "Real-Time Environments" sono frame dei video Unreal
  (Ocean Cliff, Alleyway, Lighthouse), non render di modelli 3D.
- Le anteprime dei video sono scaricate da YouTube; l'iframe viene montato solo quando si
  clicca su un video, quindi la pagina non carica 12 player all'avvio.
- `public/Resume.pdf` è il CV. Sta nella root del sito apposta: URL, nome del file scaricato
  ed etichetta nella pagina risultano tutti "Resume". Per aggiornarlo basta sovrascrivere
  quel file mantenendo il nome. Il vecchio scan `cv-2023.jpg` preso da Weebly è stato rimosso.
