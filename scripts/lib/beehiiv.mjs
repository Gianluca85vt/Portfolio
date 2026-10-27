/**
 * The newsletter's numbers, for the kits and the report. Reads the same two
 * keys the site's sign-up form uses.
 *
 * When it cannot get a number it answers null and records why, in Italian, for
 * the email that would otherwise just leave the line out. The first run with
 * the keys in place did exactly that, and "the line is missing" says nothing
 * about whether the key, the ID or the request was wrong.
 */

let problem = '';

/** Why the last call returned null, or an empty string if it did not. */
export function beehiivProblem() {
  return problem;
}

function describe(status) {
  if (status === 401) return 'beehiiv rifiuta la chiave API (401): ricopiala nel segreto BEEHIIV_API_KEY';
  if (status === 403) return 'la chiave non può leggere questa pubblicazione (403): controlla che sia della stessa pubblicazione e abbia accesso in lettura';
  if (status === 404) return "beehiiv non trova la pubblicazione (404): l'ID in BEEHIIV_PUBLICATION_ID deve essere quello che inizia con pub_, completo";
  if (status === 429) return 'beehiiv ha limitato le richieste (429): riprova più tardi';
  return `beehiiv ha risposto ${status}`;
}

const number = (v) => (typeof v === 'number' ? v : typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v)) ? Number(v) : null);

export async function newsletterStats() {
  problem = '';
  // Trimmed: a secret pasted with a trailing space or newline becomes part of
  // the URL or the header, and beehiiv answers as if the ID did not exist.
  const key = (process.env.BEEHIIV_API_KEY ?? '').trim();
  const pub = (process.env.BEEHIIV_PUBLICATION_ID ?? '').trim();
  if (!key || !pub) {
    problem = 'mancano BEEHIIV_API_KEY o BEEHIIV_PUBLICATION_ID tra i segreti di GitHub';
    return null;
  }

  const get = async (path) => {
    const res = await fetch(`https://api.beehiiv.com/v2${path}`, {
      headers: { authorization: `Bearer ${key}`, accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    const body = await res.json().catch(() => null);
    return { res, body };
  };

  try {
    // The reference documents `expand` without saying how an array is written
    // in a query string, so both spellings are tried before counting directly.
    for (const query of ['expand[]=stats', 'expand=stats']) {
      const { res, body } = await get(`/publications/${encodeURIComponent(pub)}?${query}`);
      if (!res.ok) {
        problem = describe(res.status);
        console.log(problem);
        return null;
      }
      const stats = body?.data?.stats ?? {};
      const active = number(stats.active_subscriptions);
      if (active != null) {
        return {
          subscribers: active,
          // Absent until the first issue goes out.
          openRate: number(stats.average_open_rate),
          clickRate: number(stats.average_click_rate),
          sent: number(stats.total_sent),
        };
      }
    }

    // No stats block either way: count the active subscriptions instead.
    const { res, body } = await get(`/publications/${encodeURIComponent(pub)}/subscriptions?status=active&limit=1`);
    if (!res.ok) {
      problem = describe(res.status);
      console.log(problem);
      return null;
    }
    const total = number(body?.total_results);
    if (total != null) return { subscribers: total, openRate: null, clickRate: null, sent: null };

    problem = 'beehiiv ha risposto ma senza il numero degli iscritti';
    console.log(problem, JSON.stringify(Object.keys(body ?? {})));
    return null;
  } catch (e) {
    problem = `beehiiv non raggiungibile (${e.message})`;
    console.log(problem);
    return null;
  }
}

export async function subscriberCount() {
  return (await newsletterStats())?.subscribers ?? null;
}
