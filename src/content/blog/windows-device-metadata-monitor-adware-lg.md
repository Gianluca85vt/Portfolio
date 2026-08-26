---
title: Plug in a new monitor and Windows can install software you never approved. Here's how.
date: 2026-08-25
category: Tech
excerpt: LG's monitor app has been showing McAfee pop-ups since 2024, installed through Windows Update with no consent screen. The ad is the part that made news. The mechanism that let it happen is the part worth understanding before you plug in your next monitor.
cover: /img/blog/windows-device-metadata-monitor-adware-lg/cover.svg
---

Ars Technica ran a piece this week rounding up how ads and tracking have spread
from smart TVs to computer monitors, and the case study doing most of the work
is one that's been building since July: **LG monitors quietly installing an
app that pushes McAfee pop-up ads**, through Windows Update, with nothing on
screen asking permission first. The Register, Windows Latest, Engadget and
Slashdot all covered pieces of this over the past month, and the mechanism
underneath it is more interesting, and more relevant to a work machine, than
the ad itself.

## What actually happened

Since at least 2024, some LG monitors have caused connected Windows PCs to
silently install an app called the **LG Monitor App Installer**, delivered
under cover of what looks like a routine driver update through Windows
Update. Once installed, it's been showing McAfee promotional pop-ups on
login. Nobody clicked "install." Nobody saw a permissions dialog. The app
just arrived.

**Gamers Nexus** put out a video on it that got enough attention to reach
Microsoft directly. In late July, **Pavan Davuluri**, Microsoft's EVP of
Windows and devices, said LG had agreed to disable the McAfee pop-up
specifically. LG's own changelog confirmed the app was doing this. That
closes the one visible symptom. It does not close the mechanism that let it
happen without your say-so, and reporting from Ubergizmo and others notes
similar companion-app prompts showing up through Dell and Alienware monitors
too, not just LG's.

## The part that's actually the story: device metadata

<figure>
  <img src="/img/blog/windows-device-metadata-monitor-adware-lg/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>An LG monitor, not the specific model implicated in the reporting. Via Wikimedia Commons.</figcaption>
</figure>

Windows has a feature called **device metadata**. When you plug in a new
peripheral — a monitor, a printer, sometimes a GPU — and the machine is
online, Windows checks Microsoft's servers for information tied to that
hardware's ID. Vendors can register a companion app against that ID through
the Microsoft Store. If they have, Windows fetches and installs the app in
the background, no prompt required, as part of what looks to the user like
ordinary driver setup.

The conditions for this are the Windows defaults for most people, not an
edge case: the machine needs to be online, signed into the Microsoft Store,
and set up with **Recommended Settings**, which is what Windows suggests
during first setup and what most consumer and prosumer installs run with.
Vendors don't need to trick anyone into anything. They just tag the metadata
and Windows does the rest.

That's the design LG's ad happened to ride in on. It's also, unresolved, the
design any vendor could ride in on next, with something less obviously
annoying than a pop-up and therefore less likely to end up in a Gamers Nexus
video.

## Why this is worth a second thought on a work machine

A gaming monitor picking up an unwanted ad app is an annoyance. A **monitor
you bought specifically for accurate colour** — the kind of purchase a
technical artist or anyone doing client-facing review work actually makes
deliberately, calibrated and left alone — is a different case. The whole
point of that machine is that you know what's running on it and why. An app
you didn't install, tied to hardware you plugged in for a completely
unrelated reason, is one more unknown variable sitting on a box that's
supposed to be predictable. It doesn't have to be malicious to be a problem;
it just has to be there, using cycles or popping a window mid-review, with
no install log you'd have thought to check.

For a freelancer or a small studio, that machine is often also the render
box or the one doing client screen-shares. You don't want to find out a
vendor's "companion app" phoned home or threw a notification in the middle
of a session you're being paid to run cleanly.

## What I'd actually do about it

**Check before you plug in, not after.** Windows Update's advanced options
include a setting for automatically installing apps associated with device
metadata — turning that off means new hardware still gets its drivers, but
stops silently pulling in whatever companion software the vendor has tagged
alongside them. Worth doing once, on any machine you use for paying work,
before your next monitor purchase rather than after you notice something
you didn't put there.

**Audit what showed up after your last monitor swap.** If you added a new
display in the past year or two and never looked at what installed itself
alongside the driver, it's a five-minute check in Settings > Apps.

**Don't assume this is an LG problem specifically.** LG got the press because
the symptom was loud and Gamers Nexus went looking. The mechanism is a
Windows feature available to any hardware vendor with a Microsoft Store
listing, and Dell and Alienware have already shown up in the same reporting.
Treat the fix as "know the setting exists," not "avoid one brand."

Sources: [Ars Technica](https://arstechnica.com/gadgets/2026/08/ads-and-tracking-infiltrated-tvs-now-theyre-coming-for-monitors/),
[The Register](https://www.theregister.com/personal-tech/2026/07/21/lg-monitors-are-using-windows-11-feature-to-serve-adware/5275486),
[Windows Latest](https://www.windowslatest.com/2026/07/21/lg-admits-its-monitor-app-installs-bloatware-via-windows-update-and-microsoft-is-letting-it-happen/),
[Engadget](https://www.engadget.com/2222348/lg-monitor-mcafee-spam-ads-microsoft/),
and [Ubergizmo on other affected brands](https://www.ubergizmo.com/2026/07/disable-monitor-ads/).
