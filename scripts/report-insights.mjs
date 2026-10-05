/**
 * The page of the report that says what the numbers mean, and what to do.
 *
 * Every report used to arrive as tables and get sent back to a chat with
 * "ecco il report" so somebody could read it. The readings kept landing on the
 * same handful of patterns — a spike that was one day of outreach, traffic
 * that is direct links to the home page rather than readers, pieces sitting
 * just off Google's first page, a review draft waiting while its search window
 * closes — so those patterns are written down here and checked every time.
 *
 * Italian, because it is his briefing; the rest of the report stays English.
 *
 * Pure: it takes what report-data gathered and returns text. Nothing here
 * fetches, so it is tested against real windows in report-insights.test.mjs.
 */

/**
 * Changes to how the site is measured. A window that straddles one compares
 * two different things, and the report has to say so before it says anything
 * else.
 */
export const MEASUREMENT_CHANGES = [
  {
    date: '2026-09-25',
    // Consent banner, commit fc46dde: GA4 loads only after "Accept".
    before: 'Dal 25 settembre Google Analytics conta solo chi accetta i cookie nel banner.',
    after:
      'Google Analytics conta solo chi accetta i cookie: è solo una parte dei visitatori reali. Per capire se il blog cresce, il numero affidabile è Search Console.',
  },
];

const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

/** '2026-09-25' or '20260925' as "25 settembre". */
export function giorno(d) {
  const s = String(d).replace(/-/g, '');
  return `${Number(s.slice(6, 8))} ${MONTHS[Number(s.slice(4, 6)) - 1]}`;
}

const num = (n, p = 0) =>
  (Number(n) || 0).toLocaleString('it-IT', { minimumFractionDigits: p, maximumFractionDigits: p });

function pct(now, before) {
  if (!before) return null;
  return ((now - before) / before) * 100;
}

const signed = (p) => `${p > 0 ? '+' : ''}${num(p)}%`;

function median(list) {
  if (!list.length) return 0;
  const s = [...list].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const slugOf = (path) => /^\/blog\/([a-z0-9-]+)\/?$/.exec(path ?? '')?.[1] ?? null;

/** An article path, as opposed to the home page, the index or a category. */
const isArticle = (path) => {
  const slug = slugOf(path);
  return !!slug && slug !== 'category' && slug !== 'reviews';
};

function dayRange(start, end) {
  const out = [];
  for (let t = Date.parse(`${start}T00:00:00Z`); t <= Date.parse(`${end}T00:00:00Z`); t += 86400000) {
    out.push(new Date(t).toISOString().slice(0, 10));
  }
  return out;
}

/* ------------------------------------------------- the 90-day growth plan */

/**
 * The growth plan of 5 October, as dates and thresholds: four phases each with
 * a gate, two deadlines that cannot slip, and four checkpoints where the plan
 * says to change course. The report measures what it can and names what has
 * to be checked by hand (X has no free API; vendor conversations live in his
 * mail).
 */
export const PLAN = {
  start: '2026-10-06',
  phases: [
    { name: 'Fase 0, fondamenta', from: '2026-10-06', to: '2026-10-19', gate: 'form live, X attivo, 70 commenti su Reddit' },
    { name: 'Fase 1, distribuzione', from: '2026-10-20', to: '2026-11-16', gate: '150 iscritti, 4 newsletter inviate, 1 ripresa esterna', subscribers: 150 },
    { name: 'Fase 2, leva', from: '2026-11-17', to: '2026-12-14', gate: '400 iscritti e 35 utenti al giorno', subscribers: 400, usersPerDay: 35 },
    { name: 'Fase 3, consolidamento', from: '2026-12-15', to: '2027-01-04', gate: '1 sponsor firmato o 3 trattative aperte' },
  ],
  deadlines: [
    { date: '2026-11-20', what: 'il media kit pronto' },
    { date: '2026-12-10', what: 'i primi pitch ai vendor chiusi (a gennaio i budget sono già decisi)' },
  ],
};

const dayDiff = (a, b) => Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86400000);

/**
 * Where the plan stands today: a line for the trend, and actions when a
 * checkpoint, a deadline or the end of a phase falls in the next few days.
 * A checkpoint stays on the report for a week after its day, so a report run
 * that skips a day cannot miss it.
 */
export function planReading(d, todayIso) {
  const lines = [];
  const actions = [];
  const day = dayDiff(todayIso, PLAN.start) + 1;
  if (day < 1 || day > 100) return { lines, actions };

  const nl = d.growth?.newsletter ?? null;
  const subs = nl?.subscribers ?? null;
  const users = d.ga?.ok && d.days ? d.ga.current.users / d.days : null;
  const imps = d.sc?.ok && d.sc.current.days ? d.sc.current.impressions / d.sc.current.days : null;
  const phase = PLAN.phases.find((p) => todayIso >= p.from && todayIso <= p.to) ?? PLAN.phases[PLAN.phases.length - 1];

  const now = [
    subs == null ? 'iscritti non disponibili (servono le chiavi beehiiv nei segreti di GitHub)' : `${num(subs)} iscritti`,
    nl?.openRate != null ? `apertura media ${num(nl.openRate, 1)}%` : '',
    users != null ? `${num(users, 1)} utenti al giorno in Analytics` : '',
    imps != null ? `${num(imps)} impressioni al giorno su Google` : '',
    d.growth?.bluesky ? `${num(d.growth.bluesky.followers)} follower su Bluesky` : '',
  ].filter(Boolean);
  lines.push(
    `Piano dei 90 giorni: giorno ${day}, ${phase.name} (fino al ${giorno(phase.to)}). Per passare alla fase dopo: ${phase.gate}. Oggi: ${now.join(', ')}.`,
  );

  // The end of a phase, in the last week of it: what is met and what is not.
  const left = dayDiff(phase.to, todayIso);
  if (left >= 0 && left <= 7) {
    const misses = [];
    if (phase.subscribers && subs != null && subs < phase.subscribers) misses.push(`iscritti ${num(subs)} su ${num(phase.subscribers)}`);
    if (phase.usersPerDay && users != null && users < phase.usersPerDay) misses.push(`utenti al giorno ${num(users, 1)} su ${num(phase.usersPerDay)}`);
    actions.push({
      priority: 3,
      title: `${phase.name} finisce il ${giorno(phase.to)}`,
      body:
        `La soglia è: ${phase.gate}.` +
        (misses.length ? ` Mancano ancora: ${misses.join(', ')}.` : '') +
        ' Se la soglia non passa, il piano dice di non andare avanti ma di capire perché.',
    });
  }

  for (const dl of PLAN.deadlines) {
    const until = dayDiff(dl.date, todayIso);
    if (until >= 0 && until <= 14) {
      actions.push({ priority: 2, title: `Entro il ${giorno(dl.date)}: ${dl.what}`, body: `Mancano ${num(until)} giorni. È una scadenza che il piano non lascia slittare.` });
    }
  }

  const at = (n) => day >= n && day < n + 7;
  if (at(30) && subs != null && subs < 80) {
    actions.push({
      priority: 1,
      title: `Giorno 30: ${num(subs)} iscritti, sotto gli 80`,
      body: 'Il piano lo legge così: il problema è l’offerta (il tracker e la pagina newsletter), non i canali. Riscrivi quella prima di toccare altro.',
    });
  }
  if (at(45)) {
    actions.push({
      priority: 2,
      title: 'Giorno 45: controlla X a mano',
      body: 'Se sei sotto i 300 follower e i thread non hanno aperto nessuna conversazione, il formato thread non fa per te: passa a post singoli con un’immagine.',
    });
  }
  if (at(60) && imps != null && imps < 200) {
    actions.push({
      priority: 1,
      title: `Giorno 60: impressioni ferme a ${num(imps)} al giorno`,
      body: 'L’archivio non sta capitalizzando. Il piano dice di scendere a 2 pezzi al giorno e usare il tempo liberato per un pezzo lungo evergreen a settimana.',
    });
  }
  if (at(90)) {
    actions.push({
      priority: 1,
      title: 'Giorno 90: conta le conversazioni aperte con i vendor',
      body: 'Se sono zero, il piano dice che non è il pubblico: sono il pitch o il prezzo. Rivedi quelli, non la strategia.',
    });
  }
  return { lines, actions };
}

/* ------------------------------------------------------------ the reading */

export function insights(d, { today = new Date() } = {}) {
  const { ga, sc, bing, editorial: ed, window: win } = d;
  const trend = [];
  const findings = [];
  const actions = [];
  const todayIso = today.toISOString().slice(0, 10);

  /* --- measurement first: it changes how everything below reads --------- */

  let gaComparable = true;
  for (const c of MEASUREMENT_CHANGES) {
    const straddles = c.date > win.previous.start && c.date <= win.current.end;
    if (straddles) {
      gaComparable = false;
      trend.push(
        `${c.before} Il confronto di Analytics con la finestra precedente quindi mette insieme due misure diverse: i numeri di Analytics qui sotto vanno letti da soli, senza la percentuale.`
      );
    } else if (c.date <= win.previous.start) {
      trend.push(c.after);
    }
  }

  /* --- the trend, led by the number the banner cannot touch ------------- */

  let headline = '';
  if (sc.ok && sc.current.days && sc.previous.days) {
    const impNow = sc.current.impressions / sc.current.days;
    const impBefore = sc.previous.impressions / sc.previous.days;
    const clkNow = sc.current.clicks / sc.current.days;
    const clkBefore = sc.previous.clicks / sc.previous.days;
    const imp = pct(impNow, impBefore);
    const posNow = sc.current.position;
    const posBefore = sc.previous.position;
    const better = posBefore && posNow < posBefore - 0.3;
    const worse = posBefore && posNow > posBefore + 0.3;

    const growing = imp !== null && imp >= 10;
    const shrinking = imp !== null && imp <= -10;

    if (growing && better) headline = 'Su Google stai crescendo: più impressioni e posizioni migliori.';
    else if (growing) headline = 'Su Google ti vedono più persone, anche se non sali ancora in classifica.';
    else if (shrinking && worse) headline = 'Su Google questa finestra è andata peggio: meno impressioni e posizioni più basse.';
    else if (shrinking) headline = 'Su Google le impressioni sono calate in questa finestra.';
    else if (better) headline = 'Su Google sei stabile come visibilità e sali in classifica.';
    else headline = 'Su Google la finestra è stabile.';

    trend.push(
      `Google Search: ${num(impNow)} impressioni e ${num(clkNow, 1)} click al giorno` +
        (imp !== null ? ` (impressioni ${signed(imp)} rispetto a prima` : ' (') +
        (clkBefore ? `, click da ${num(clkBefore, 1)} al giorno)` : ')') +
        `. Posizione media ${num(posNow, 1)}` +
        (posBefore ? `, era ${num(posBefore, 1)}` : '') +
        (posNow <= 10 ? ': in media sei in prima pagina.' : ': in media sei ancora in seconda pagina.') +
        (sc.current.days < d.days ? ` Google ha riportato ${sc.current.days} giorni su ${d.days}, per questo i confronti sono al giorno.` : '')
    );
  }

  if (ga.ok) {
    const days = (ga.daily ?? []).map((r) => ({ date: r.key, users: Number(r.value) || 0 }));
    const values = days.map((r) => r.users);
    const top = days.reduce((a, r) => (r.users > (a?.users ?? -1) ? r : a), null);
    const others = top ? values.filter((_, i) => days[i] !== top) : [];
    const spike = top && top.users >= 10 && others.length >= 2 && top.users >= 2.5 * Math.max(median(others), 1);

    const change = gaComparable ? pct(ga.current.users, ga.previous.users) : null;
    let line = `Google Analytics: ${num(ga.current.users)} utenti, ${num(ga.current.sessions)} sessioni` +
      (change !== null ? ` (${signed(change)} utenti rispetto a prima)` : '') + '.';

    if (spike) {
      const rest = others.reduce((a, b) => a + b, 0) / others.length;
      line += ` Quasi tutto viene da un giorno: il ${giorno(top.date)} con ${num(top.users)} utenti. Gli altri giorni stanno intorno ai ${num(rest)} utenti al giorno, che è il livello vero di questa finestra.`;
    }
    trend.push(line);

    const channels = ga.channels ?? [];
    const sessions = channels.reduce((a, c) => a + (Number(c.value) || 0), 0) || ga.current.sessions || 0;
    const direct = Number(channels.find((c) => c.key === 'Direct')?.value ?? 0);
    const views = ga.current.views || 0;
    const home = Number((ga.pages ?? []).find((p) => p.key === '/')?.value ?? 0);
    const directShare = sessions ? direct / sessions : 0;
    const homeShare = views ? home / views : 0;

    if (directShare >= 0.4 && homeShare >= 0.25) {
      findings.push({
        title: 'Metà del traffico sono link aperti da mail e messaggi',
        body: `Il ${num(directShare * 100)}% delle sessioni arriva senza provenienza (Direct) e il ${num(homeShare * 100)}% delle pagine viste è la home. È il segno dei link aperti da mail, messaggi e bio: persone vere, che guardano la home e se ne vanno. Chi arriva da Google invece atterra su un articolo.`,
      });
      actions.push({
        priority: 3,
        title: 'Nei messaggi linka un articolo preciso',
        body: 'Quando scrivi a qualcuno, manda il pezzo che parla del suo lavoro o del suo settore. Dalla home la gente esce in pochi secondi; da un articolo che la riguarda, legge.',
      });
    }

    const pps = ga.current.sessions ? views / ga.current.sessions : 0;
    if (ga.current.sessions >= 20 && pps <= 1.15) {
      findings.push({
        title: 'Quasi nessuno apre una seconda pagina',
        body: `${num(pps, 2)} pagine per sessione. Chi arriva legge un pezzo e chiude. I link interni tra articoli sono la leva: un lettore che trova il pezzo collegato al punto giusto resta.`,
      });
    }

    const best = (ga.pages ?? []).find((p) => isArticle(p.key));
    if (best) {
      const slug = slugOf(best.key);
      const cat = ed.meta?.[slug]?.category;
      findings.push({
        title: 'L’articolo più letto della finestra',
        body: `${slug} (${num(best.value)} visualizzazioni${cat ? `, categoria ${cat}` : ''}).`,
      });
    }

    const countries = ga.countries ?? [];
    const users = countries.reduce((a, c) => a + (Number(c.value) || 0), 0);
    const china = Number(countries.find((c) => c.key === 'China')?.value ?? 0);
    if (users && china / users >= 0.08) {
      findings.push({
        title: 'Una parte del traffico sono crawler',
        body: `${num(china)} utenti dalla Cina su ${num(users)}: per un blog in inglese su questi temi sono quasi sempre crawler, non lettori.`,
      });
    }
  }

  /* --- search: what ranks, and what is one step from ranking ------------ */

  if (sc.ok) {
    const pages = (sc.pages ?? []).filter((p) => isArticle(p.key));

    const clicked = pages.filter((p) => p.clicks > 0).sort((a, b) => b.clicks - a.clicks).slice(0, 3);
    if (clicked.length) {
      findings.push({
        title: 'I pezzi che portano click da Google',
        body: clicked
          .map((p) => `${slugOf(p.key)}: ${num(p.clicks)} click, posizione ${num(p.position, 1)}`)
          .join('; ') + '.',
      });
    }

    const near = pages
      .filter((p) => p.position > 7.5 && p.position <= 20 && p.impressions >= 3)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 3);
    if (near.length) {
      findings.push({
        title: 'A un passo dalla prima pagina',
        body:
          near.map((p) => `${slugOf(p.key)} (posizione ${num(p.position, 1)}, ${num(p.impressions)} impressioni)`).join('; ') +
          '. Sotto l’ottava posizione i click quasi non arrivano; qualche link vero da fuori basta spesso a farli salire.',
      });
      actions.push({
        priority: 4,
        title: `Condividi ${slugOf(near[0].key)} dove quel pubblico c’è già`,
        body: 'È il pezzo più vicino alla prima pagina. Un paio di link da posti frequentati da chi cerca quell’argomento (community, forum, il tuo LinkedIn) spesso bastano a farlo salire.',
      });
    }

    // Reviews that average other outlets' scores against everything else.
    const weighted = (list) => {
      const imp = list.reduce((a, p) => a + p.impressions, 0);
      return imp ? list.reduce((a, p) => a + p.position * p.impressions, 0) / imp : null;
    };
    const kind = (p) => ed.meta?.[slugOf(p.key)];
    const roundups = pages.filter((p) => kind(p)?.review && !kind(p)?.handsOn);
    const rest = pages.filter((p) => kind(p) && !kind(p).review);
    const posRoundups = weighted(roundups);
    const posRest = weighted(rest);
    if (roundups.length >= 2 && rest.length >= 2 && posRoundups && posRest && posRoundups - posRest >= 2) {
      findings.push({
        title: 'Le recensioni-rassegna stanno più in basso degli articoli tecnici',
        body: `Posizione media ${num(posRoundups, 1)} per le recensioni che fanno la media dei voti, ${num(posRest, 1)} per il resto. Per quelle query Google ha già molti siti con gli stessi voti; il box "The artist's view" è la parte che solo tu hai.`,
      });
    }
  }

  if (bing.ok && bing.clicks === 0 && bing.impressions < 10 * d.days) {
    findings.push({
      title: 'Bing ti vede ancora poco',
      body: `${num(bing.impressions)} impressioni e nessun click in ${d.days} giorni. Le query su cui compari sono quasi tutte tecniche 3D, dove sei ben posizionato: il limite è quanto Bing scansiona il sito.`,
    });
    actions.push({
      priority: 5,
      title: 'Bing Webmaster Tools: alza la frequenza di scansione, se non l’hai già fatto',
      body: 'Impostazioni → Crawl Control: sposta il grafico verso "più scansione". Ci vogliono due minuti e vale finché Bing non vede tutti gli articoli.',
    });
  }

  /* --- the blog itself --------------------------------------------------- */

  if (ed) {
    const days = dayRange(win.current.start, win.current.end);
    const dates = new Set((ed.inWindow ?? []).map((a) => a.date));
    const empty = days.filter((x) => !dates.has(x));
    trend.push(
      `Il blog: ${num(ed.inWindow?.length ?? 0)} articoli in ${d.days} giorni` +
        (empty.length ? `, nessuno il ${empty.map(giorno).join(' e il ')}` : ', almeno uno ogni giorno') +
        '.'
    );

    const missing = (ed.inWindow?.length ?? 0) - (ed.socialPosted ?? 0);
    if (missing > 0) {
      findings.push({
        title: 'Articoli non arrivati sui social',
        body: `${num(missing)} dei pezzi usciti in questa finestra non risultano pubblicati su Facebook e Instagram.`,
      });
    }

    for (const q of ed.quotas ?? []) {
      if (q.breached) {
        findings.push({
          title: `Quota ${q.label}: saltata`,
          body: `${num(q.since)} articoli di fila senza un pezzo ${q.label}; la regola è uno ogni ${q.every}.`,
        });
      }
    }

    const ageDays = (date) => Math.floor((Date.parse(`${todayIso}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86400000);
    const stale = (ed.draftList ?? []).filter((x) => x.date && ageDays(x.date) >= (x.review ? 2 : 4));
    const staleReviews = stale.filter((x) => x.review);
    const staleOther = stale.filter((x) => !x.review);
    if (staleReviews.length) {
      actions.push({
        priority: 1,
        title: 'Approva o scarta le recensioni in bozza',
        body:
          staleReviews.map((x) => `"${x.title}" aspetta dal ${giorno(x.date)}`).join('; ') +
          '. Una recensione si cerca nei giorni dell’uscita: dopo una settimana ha perso quasi tutto il suo pubblico.',
      });
    }
    if (staleOther.length) {
      actions.push({
        priority: 2,
        title: `${num(staleOther.length)} ${staleOther.length === 1 ? 'bozza aspetta' : 'bozze aspettano'} da più di tre giorni`,
        body: staleOther.map((x) => `"${x.title}" (dal ${giorno(x.date)})`).join('; ') + `. ${staleOther.length === 1 ? 'Pubblicala o cancellala' : 'Pubblicale o cancellale'}: una notizia vecchia di una settimana la legge pochissima gente.`,
      });
    }

    const handsOn = Object.values(ed.meta ?? {}).filter((m) => m.handsOn).length;
    if (handsOn < 3) {
      actions.push({
        priority: 6,
        title: `Recensioni giocate da te: ${handsOn} su 3`,
        body: 'Con tre recensioni tue (handsOn) puoi chiedere codici anche ai publisher medi, non solo agli indie. Vanno bene anche giochi comprati o gratuiti.',
      });
    }
  }

  const plan = planReading(d, todayIso);
  trend.push(...plan.lines);
  actions.push(...plan.actions);

  actions.sort((a, b) => a.priority - b.priority);

  return {
    headline: headline || 'Lettura della finestra',
    trend,
    findings,
    // Four at most: a list of nine is a list nobody acts on.
    actions: actions.slice(0, 4).map(({ title, body }) => ({ title, body })),
  };
}

/** The same reading as plain text, for the body of the email. */
export function insightsText(r) {
  const lines = [r.headline, '', ...r.trend];
  if (r.actions.length) {
    lines.push('', 'Cosa fare:');
    r.actions.forEach((a, i) => lines.push(`${i + 1}. ${a.title}. ${a.body}`));
  }
  return lines.join('\n');
}
