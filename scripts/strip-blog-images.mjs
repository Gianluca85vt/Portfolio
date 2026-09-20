/**
 * Toglie le foto degli articoli dal pacchetto che viene spedito a Vercel.
 *
 * Il piano gratuito conta dieci GB-mese di deployment storage: ogni giorno
 * registra quanto pesa il magazzino e somma i giorni. Vercel tiene sempre gli
 * ultimi tre deployment di un progetto, quindi il conto e' "peso del build x 3
 * x giorni del ciclo". Con 111 MB di immagini dentro l'output si arrivava a
 * quaranta GB-mese: quattro volte il limite.
 *
 * Le immagini restano dove sono, in `public/img/blog`, e restano nel
 * repository: da li' le serve jsDelivr, e una riscrittura in `vercel.json`
 * manda gli stessi indirizzi a quel CDN. Per chi legge non cambia niente, gli
 * indirizzi `/img/blog/...` continuano a funzionare - comprese le foto delle
 * mail della sera, che sono gia' partite con quei link.
 *
 * Gira dopo `astro build`, sull'output vero (`.vercel/output/static`). Se la
 * cartella non c'e' non fa niente e non fa fallire la build: meglio un
 * deployment grasso che un deployment mancato.
 */
import { rm, stat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const CARTELLA = '.vercel/output/static/img/blog';

async function peso(dir) {
  let totale = 0;
  for (const voce of await readdir(dir, { withFileTypes: true })) {
    const percorso = join(dir, voce.name);
    totale += voce.isDirectory() ? await peso(percorso) : (await stat(percorso)).size;
  }
  return totale;
}

try {
  const byte = await peso(CARTELLA);
  await rm(CARTELLA, { recursive: true, force: true });
  console.log(`Fuori dal pacchetto ${(byte / 1048576).toFixed(1)} MB di foto: le serve jsDelivr.`);
} catch (errore) {
  if (errore.code === 'ENOENT') {
    console.log(`Niente da togliere: ${CARTELLA} non esiste.`);
  } else {
    console.warn(`Non sono riuscito a togliere le foto dal pacchetto: ${errore.message}`);
  }
}
