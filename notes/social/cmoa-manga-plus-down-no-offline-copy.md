## LinkedIn

Comic Cmoa, one of the largest digital manga stores in Japan, has been offline
since 15 October. NTT Solmare cut the service to stop unauthorised access and
confirmed the next day that up to roughly 4.2 million member records had
leaked: email addresses, hashed passwords, birth dates, gender, nicknames. No
card data, no purchase history. No reopening date either.

Six days later, on the night of 21 October, Kodansha's Magazine Pocket and K
MANGA and Shueisha's MANGA Plus all went into emergency maintenance. Different
cause entirely. PHP shipped 8.5.12, 8.4.27, 8.3.36 and 8.2.35 that day to fix
CVE-2026-109618 and CVE-2026-109619, two unauthenticated remote code execution
flaws rated 9.2 under CVSS 4.0. Taking the apps down at 22:30 JST was the right
call. From the reader's side it was indistinguishable from the breach.

That is the part worth sitting with. A manga reading app is not a bookshelf
with a sync button. It is an entitlement list on a server plus an image
pipeline that cuts each page into tiles, wraps them, and hands them over one
screenful at a time. There is no complete file on your device, by design, and
that design worked: these apps are very hard to rip. The cost is that the
system which serves your pages is also the system that records they are yours,
so there is no degraded mode. A patch window, a breach, and a bankruptcy all
look the same from outside.

Which is also a description of a lot of our own pipelines. Asset libraries
behind a launcher. Project files in a vendor's cloud with the local copy
reduced to a cache stub. Licence servers that want a heartbeat. Same
architecture, same failure, waiting for the same kind of Wednesday.

Export it. Put it somewhere you control. Do it on a schedule.

#manga #security #pipeline

## X

Comic Cmoa has been offline for a week. NTT Solmare pulled it on 15 October
over unauthorised access and confirmed up to ~4.2m member records leaked:
emails, hashed passwords, birth dates, gender, nicknames. No card data. No
reopening date.

Then on 21 Oct, separately, Kodansha's Magazine Pocket and K MANGA plus
Shueisha's MANGA Plus went into emergency maintenance at 22:30 JST — for the
PHP patch. 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35, fixing CVE-2026-109618 and
CVE-2026-109619.

Both are 9.2 on CVSS 4.0, unauthenticated RCE. One is an out-of-memory bug
where cleanup treats half-initialised request data as real. The other is filed
as "RCE via stale global state" — a shape anyone knows who has debugged a farm
node holding the last job's globals.

Here is the architecture bit. A manga app is an entitlement list on a server
plus a pipeline that tiles each page, wraps it, and serves one screenful at a
time. No complete file on the device, deliberately. Very hard to rip. It
worked.

The cost: the thing that serves your pages is the thing that records they are
yours. No degraded mode. So a patch window, a breach and a bankruptcy are the
same event from the reader's chair — app opens, library empty, nothing local to
argue with.

Which is most of our pipelines too. Launcher-gated asset libraries. Cloud
project files with the local copy as a cache stub. Heartbeat licence servers.
The fix is boring and nobody does it: export, store somewhere you control,
on a schedule.
