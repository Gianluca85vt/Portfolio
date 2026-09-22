---
title: "Raspberry Pi 5 RAM lock: why a swap won't boot"
date: 2026-09-22
category: Tech
excerpt: A Pi 5 compares its fitted memory against a record burned into the chip and stops the boot on a mismatch. The check shipped in 2024. DRAM prices made it news.
cover: /img/blog/raspberry-pi-5-ram-lock-otp-firmware/shot-01.jpg
draft: true
---

Somebody desoldered the memory package off a Raspberry Pi 5, put a 16GB one in
its place, did the rework cleanly enough that the board powered up — and got a
machine that stops dead before anything reaches the screen.

That story went around the Raspberry Pi forums, then Tom's Hardware, then
Hackaday, and on 21 September Jeff Geerling published a full write-up of it. The response from Raspberry Pi's own engineers, posted on the
company's forum, was that this is deliberate and has been for a while.

## What the bootloader is doing

A Pi 5's RAM is a soldered LPDDR4X package. There is no slot, no SPD chip to
read, nothing you can swap with a screwdriver — changing it means hot air and a
steady hand.

Since the EEPROM firmware build dated 23 September 2024, the bootloader does
something it did not do before: it checks the memory it finds against a record
of the memory the board is supposed to have, held in the SoC's one-time
programmable memory. OTP is exactly what it sounds like. Fuses, blown once at
the factory, readable forever, not rewritable by you or by anyone else. If the
part on the board disagrees with the fuses, the boot stops there.

Reports of what that failure looks like do not agree, and I could not confirm
either first-hand. Some describe an explicit SDRAM mismatch reported as code 9.
Others describe the activity LED blinking out the Pi's SDRAM failure pattern,
with nothing on screen because nothing has got far enough to put anything there.
Both are the same wall from the user's side.

The awkward part is that the fuses record more than a capacity number. An
engineer posting as timg236 said a swap using an identical part code, for
repair, can still work for someone skilled enough — which tells you the check is
matching the part, not just the size. Fit a same-capacity chip from a different
supplier and you can still end up outside the allowlist. Another engineer,
posting as PhilE, put the policy plainly: the company has been locking devices
to their original RAM size for some time.

## Why anyone would bother faking it

Here is what makes this worth a Pi's engineering time rather than a shrug.

Buy a 1GB or 2GB Pi 5 at the low end of the range. Solder on an 8GB package of
uncertain provenance — untested, possibly reclaimed, possibly failing at
temperature. Sell it as a genuine 8GB board. The margin on that swap used to be
modest. It is not modest now.

Memory is the component that has broken the pricing of every small computer this
year. Valve's standalone headset landed at $1,059 in September, and the
[16GB of LPDDR5X inside the Steam Frame was the part Valve could not shrink to
hit a cheaper number](/blog/steam-frame-1059-ram-market/). A Tom's Hardware headline this week reads
like a joke until you sit with it: memory chips now cost more per unit of die
area than compute chips do. Acer's chief executive told
reporters in Taipei on 20 September that the talk of a shortage lasting to 2030
is nonsense, that warehouses are full, and that
[the peak lands somewhere in mid-2027](/blog/ram-prices-acer-peak-mid-2027/).
Whatever the endpoint, the gap between a 2GB board and an 8GB board right now is
wide enough that counterfeiting it pays.

So the lock is a supply-chain defence wearing firmware clothes. The
counterfeiters were arbitraging DRAM, and the Pi happened to be a convenient
wrapper for it.

## The cost lands on repair

Fraud prevention that works by refusing to boot has a second population it hits,
and it is the one Raspberry Pi built its name on.

A board with a cracked memory package is now a board you can only fix with a
chip of the same part code, sourced from somewhere, fitted at BGA rework
temperatures. Get it wrong by one supplier and the machine you repaired is a
machine that blinks at you. For a company whose product sits in school
electronics clubs and on hackspace benches, that is a strange place to end up —
the board is still open, still documented, still yours to solder, and the
bootloader has an opinion about what you soldered.

There is a way around it, which is the part that makes the whole thing feel
unfinished. Stay on an EEPROM image from 10 September 2024 or earlier and turn
off the automatic firmware updater, and the check is simply not there. So the
capability is locked, the lock is a software policy, and rolling back the
software rolls back the policy. Anyone running a counterfeit operation can read
that paragraph as easily as anyone repairing a board. The person likeliest to be
stopped is the one who let their Pi update itself, which is everybody sensible.

Part pairing is ordinary now. Phones do it, consoles do it, and a component that
knows its own serial number is standard practice across the industry. Seeing it
here still stings. A Pi 5 is open hardware with published schematics, sold to
people who are told to take it apart, and somewhere in that SoC sits a small
permanent statement about what it shipped with that you are not invited to
edit.
