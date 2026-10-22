---
title: "Cmoa leaked 4.2m records; MANGA Plus down for PHP"
date: 2026-10-22
category: Manga
excerpt: NTT Solmare pulled Comic Cmoa on 15 October after a breach of up to 4.2 million records. A PHP patch took Kodansha and Shueisha offline six days later.
cover: /img/blog/cmoa-manga-plus-down-no-offline-copy/shot-01.jpg
sources:
  - outlet: Anime Corner
    url: https://animecorner.me/magazine-pocket-k-manga-manga-plus-and-more-enter-emergency-maintenance-due-to-critical-php-security-flaws/
  - outlet: Help Net Security
    url: https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/
  - outlet: Datadog Security Labs
    url: https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/
  - outlet: Anime UK News
    url: https://animeuknews.net/2026/10/how-secure-is-your-access-to-your-digital-titles-a-japanese-cyberattack-sounds-the-alarm/
artistView:
  take: "Nothing here is a drawing, but the whole mess is a build decision. These reading apps were architected so that the entitlement record and the delivery pipeline are the same system, which buys airtight anti-piracy and costs the reader every fallback they might have had."
  works:
    - "Incident response: Kodansha and Shueisha taking the apps down the same night the PHP patch landed is the right call on a 9.2 unauthenticated RCE, and saying so in the maintenance notice is better disclosure than most platforms manage."
  misses:
    - "Architecture: there is no degraded mode. A manga app that streams tiled, wrapped page images on demand has no local cache worth the name, so a patch window and a breach both present to the reader as an empty bookshelf."
    - "Communication: Cmoa has been dark since 15 October with no reopening date, which is the part a reader can neither plan around nor appeal."
draft: true
---

Comic Cmoa has been offline for a week.

NTT Solmare, the NTT West subsidiary that runs it, cut the service on 15
October to shut out unauthorised access, and confirmed the next day that member
data had gone — up to roughly 4.2 million records. Email addresses, hashed
passwords, birth dates, gender, nicknames. No card numbers and no purchase
history, which is the only good sentence in the whole disclosure. The company
says it is still counting how many accounts were actually touched, that
everyone will need to set a new password when the shop reopens, and that it
does not know when that is. It has also warned about phishing messages wearing
its name, which is what always follows a leak of four million live email
addresses.

Cmoa is not a boutique. It is one of the biggest digital manga stores in Japan.
A week of nothing there is a lot of people who cannot open books they paid for.

Then on Wednesday night the rest of the shelf went dark too, for a completely
unrelated reason.

## Two nines and a patch nobody could defer

PHP shipped 8.5.12, 8.4.27, 8.3.36 and 8.2.35 on 21 October, fixing
CVE-2026-109618 and CVE-2026-109619. The security industry has already named
the pair PHP2Shell. Both are rated 9.2 under CVSS 4.0, and both allow code
execution on a web server by somebody who never logged in.

The two bugs are different animals with the same ending. The first,
GHSA-w8hw-w9fx-j79w, is an out-of-memory problem: the interpreter can be
interrupted while a request's internal data is only half set up, and the
cleanup pass afterwards then treats that half-built data as if it were real.
The second, GHSA-6wmf-4rv5-p3rp, is filed under the title "RCE via stale global
state" and is exactly what it sounds like. Anyone who has debugged a render
farm node that came back from a crash still holding the previous job's globals
will recognise the shape of it.

PHP 8.1 and everything older got no fix from the project, so those branches are
waiting on a distribution or an LTS vendor to backport. CISA told organisations
to patch immediately. Reports of what is happening in the wild do not line up
yet: watchTowr has described active exploitation attempts, while SecurityWeek
reported that watchTowr had not seen a successful one. Either way, nobody
sensible waits for that question to settle.

Magazine Pocket and K MANGA, both Kodansha, went into emergency maintenance
from 22:30 JST on 21 October, app and web together, citing the urgent PHP
update. K MANGA's notice warned that new chapter releases could slip while the
work ran on into the 22nd. Shueisha's MANGA Plus went down in the same window.

Taking three reading platforms offline at ten-thirty at night, on the evening a
9.2 drops, is the correct decision. It is also, from the reader's side,
indistinguishable from the breach.

## The serving layer is the receipt

Here is the part that interests me as somebody who spends his working life
thinking about how assets get delivered.

A manga reading app is not a bookshelf with a sync button. It is an entitlement
list on a server, plus an image pipeline that cuts each page into tiles,
wraps them, and hands them over one screenful at a time as you scroll. There is
no complete file on your phone, by design. That design exists for a reason the
Japanese publishers have never been coy about: an industry that spent years in
court over scanlation sites built reading apps that cannot be ripped, and they
largely succeeded.

The cost shows up on a night like Wednesday. When the thing that serves your
pages is also the thing that records that they are yours, there is no degraded
mode to fall back into. A CDN can be cached. A licence check can be stubbed for
offline use for a week — plenty of software does exactly that. Neither of those
is in the build. So patching the interpreter, suffering a breach, or simply
going bankrupt all look identical from the outside: the app opens, the library
is empty, and there is nothing on the device to argue with.

This blog has made the same argument from the games side, where
[a digital library turned out to be a revocable licence rather than a purchase](/blog/ps5-discs-end-2028-license-not-ownership/)
the moment Sony had to put it in writing. Manga is further down the same road,
not behind it. Japanese digital manga sales passed print years ago, and the
stores that carry them are a handful of platforms with no resale, no lending,
and no export.

What is different is the failure mode. A revoked games licence is a policy
choice somebody made and could unmake. A reading platform taken down by an
interpreter patch is not a policy at all — it is four lines in a release note
on php.net, deciding whether several million people can read tonight.

## For anyone whose own work lives in the same shape

The uncomfortable bit, if you make things for a living: this is your pipeline
too.

Asset libraries behind a launcher. Project files in a vendor's cloud with the
local copy quietly reduced to a cache stub. Licence servers that need a
heartbeat. Every one of those is the same architecture as Cmoa — the authority
and the delivery in one system — and every one of them fails the same way on
the same kind of Wednesday. The fix is not clever. It is the one nobody does,
because [the only copies anyone really keeps are the ones sitting on a shelf](/blog/nobody-is-keeping-a-copy-for-you/):
export the thing, put it somewhere you control, do it on a schedule.

A few threads from this week are not nailed down, and I would rather say so
than round them off. Reports tying the manga platform outages to a ransomware
attack on the cloud provider IDC Frontier are circulating, but I could not
confirm a causal chain between that incident and these; on the evidence
available the Cmoa breach and the PHP patch are separate events that happened
six days apart. Readers say Renta! has been down in both its Japanese and
English versions, and no statement from Papyless confirms it. A separate
disclosure in the same stretch is firmer: ACCESS confirmed that the CROS
service run by its Taiwanese subsidiary exposed 155,280 customer IDs and 1,305
accounts carrying credit card data — a smaller number than Cmoa's, with much
worse data in it.

Cmoa's reopening, when it comes, arrives with a forced password reset and
presumably an apology. The library will be there. It was always going to be
there, because it never left the server. That is the whole problem.
