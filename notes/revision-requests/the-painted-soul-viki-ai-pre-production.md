# Revision requests for the-painted-soul-viki-ai-pre-production

## 2026-10-20T10:17:22.029Z

Search artwork

### Writer's log — 2026-10-20 14:xx UTC (run 3)

Prose half **done**: the piece no longer claims there are no press stills. It now
says what the visual record actually is (the 13 October teaser plus the handout
art from the announcement) and adds the craft point that key art is illustrated
on its own terms and tells you nothing about technique. Do not redo that part.

Image half **not done — still open**. What I found and where it stuck:

- There *is* official handout art. Omelete ran the announcement crediting
  "Rakuten Viki e Imaginus/Divulgação", and Viki's series page carries key art.
  The PR Newswire release (9 Oct) has a multimedia asset on `mma.prnewswire.com`.
- I could not get a direct URL for any of it. `prnewswire.com`, `viki.com`,
  `rakuteninternational.com` and `imaginus.co.kr` are all refused from this
  sandbox (proxy 403 / DNS), and `i.ytimg.com` and `upload.wikimedia.org` are
  blocked too, so nothing could be read or verified.
- No YouTube upload of the teaser is findable. It went out on Viki's own page
  and Viki's X post; OtakuKart's credit reads "via YouTube" but no id surfaced.
  No id was guessed.

To finish: get the `mma.prnewswire.com/media/<id>/...jpg` asset id off the 9
October release, or the key-art URL off Viki's series page, into
`notes/image-requests/the-painted-soul-viki-ai-pre-production.json`. Cover is
still the drawn SVG until then.

## 2026-10-20T14:19:16.268Z

Search for and artwork

### Writer's log — 2026-10-20 (run 4)

Artwork **still not found, and this run the reason was the network rather than the
search.** Every host outside WebSearch was unreachable:

```
https://www.animenewsnetwork.com/ -> 000
https://www.prnewswire.com/       -> 000
https://mma.prnewswire.com/       -> 000
https://www.vitalthrills.com/     -> 000
```

WebFetch returned `getaddrinfo ENOTFOUND` for every host tried (webull,
morningstar, advfn, rakuteninternational, animenewsnetwork). The agent proxy
reports itself healthy, so this is egress policy, not a broken sandbox. Nothing
could be read, so nothing could be verified, and no URL was guessed.

What six searches did establish:

- The 9 October release (PRN id 302903505) **does** carry a multimedia asset —
  the ADVFN syndication shows Cision's "View original content to download
  multimedia" link — but no copy exposes the `mma.prnewswire.com/media/<id>/`
  path as text, so the asset id is not obtainable by search.
- No YouTube upload of the 13 October teaser surfaced again. It lives on Viki's
  own series page and Viki's X post. OtakuKart's "via YouTube" credit still
  leads nowhere.

**Why this cannot be closed from inside the job.** `scripts/fulfil-image-requests.mjs`
accepts exactly three inputs: `steamAppId`, a list of direct `urls`, and
`youtubeId`. It does not scrape a page for its images. This is not a game, so
Steam is out; that leaves a direct URL, which needs a host I cannot reach.

**One line from you closes it.** Open the release or Viki's series page in a
browser, right-click the key art, copy the image address, and file it as a
revision request. I will write the JSON and point `cover:` at it:

```json
{
  "slug": "the-painted-soul-viki-ai-pre-production",
  "urls": ["<the key-art URL>"],
  "credit": "Rakuten Viki and Imaginus, via the official announcement",
  "comparison": false
}
```

**What is at stake if it stays open.** `src/content.config.ts` exempts drafts
from the real-cover rule and nothing else, so approving this piece as it stands
flips `draft: false` on a `.svg` cover and **fails the build** — the article
would not deploy. The three live options are: send a URL, tell me to spike the
piece, or lower nothing and leave it as a permanent draft. I have not deleted
this request, because the work you asked for is not done.
