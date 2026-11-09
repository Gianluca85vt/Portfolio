# Tech — harvested 2026-11-09T23:08:37.506Z

## Ars Technica

### DCU shake-up: James Gunn and Peter Safran out post-merger
Mon, 09 Nov 2026 21:55:35 +0000 — https://arstechnica.com/culture/2026/11/dcu-shake-up-james-gunn-and-peter-safran-out-post-merger/

It's barely been two months since the controversial Paramount and Warner Bros. merger, and we've already got a shockingly unexpected ouster : Co-CEOs of the rebooted DC Universe, James Gunn and Peter Safran, are stepping down from that role despite the Hollywood rumor mill assuming that the duo would be safe. It's unclear whether the pair chose to resign or were forced out, or what will happen to their planned slate of projects beyond 2028's Superman: Man of Tomorrow , which is in post-production. Producer Jeremy Latcham—a protege of Marvel's Kevin Feige who worked with Gunn on Guardians of the Galaxy among other MCU films—will replace them. Per Gunn and Safran's joint statement : Four years ago, we set out to unite DC under one creative vision. In that time, we helped restore Superman to the heart of DC, while opening new doors and telling new stories in film and television with Peacemaker , Creature Commandos, Lanterns and Clayface. We’re immensely proud of the team that turned that ambition into something real, including the actors, crews and executives we had the opportunity to collaborate with. We’ve shared a creative history with Jeremy going back to Marvel, and we’re eager to see the perspective he brings to DC’s next chapter. We’re excited to return to what drew us to this job in the first place, which is telling the stories we love, including the next chapter of Clark and Lex’s journey in Man of Tomorrow . DCU fans are mourning the news and what it could mean for the

### Man who lost $308,000 on sports bets sues Kalshi for offering illegal gambling
Mon, 09 Nov 2026 21:13:39 +0000 — https://arstechnica.com/tech-policy/2026/11/man-who-lost-308000-on-sports-bets-sues-kalshi-for-offering-illegal-gambling/

A man who lost over $308,000 making sports wagers on Kalshi is suing the prediction market for violating the state of Washington's ban on online gambling. He's trying to turn those losses into an overall victory with a lawsuit seeking a payment of over $580,000. Bellevue, Washington, resident Scott Bright's "wagering occurred at a time when it was unlawful in Washington and when the Washington Attorney General had already sued KalshiEX LLC in this Court alleging precisely that," said the gambler's lawsuit filed on October 23 in King County Superior Court. While state attorneys general throughout the US are trying to shut down Kalshi for allegedly violating state gambling laws, Bright's case tests whether unsuccessful gamblers can obtain restitution from the company through individual lawsuits. Read full article Comments ]]>

### A Sam Altman parody offers an amusing lesson in memory management
Mon, 09 Nov 2026 20:49:09 +0000 — https://arstechnica.com/gadgets/2026/11/a-sam-altman-parody-offers-an-amusing-lesson-in-memory-management/

Sam Altman's recent comments on the Cheeky Pint podcast inspired developer Iain Kay to create a satirical script that allows users to email the OpenAI CEO once per day if more than 10 percent of their system RAM is reported as available. Ram-Altman is described by its creator as a "parody project" launched in response to Altman's viral remarks about RAM in your personal PC. As reported by The Verge , on the October 29 episode recorded with Stripe President John Collison, Altman said, "A lot of people want local inference. And somehow, they assume that the problem is solved now because we are going to have open source models, we’re going to be able to run them on our computers, and so we’re not going to need all the stuff in the data center. But from a global allocation perspective, actually, it’s quite terrible to have everybody have a bunch of the world’s limited supply of DRAM sitting in their own computer and being used 5 percent of the time." Altman has since explained that his comments were taken out of context and briefly changed his display name to "RAM Altman" on X, which Kay calls on the project GitHub, "objectively excellent and where the project gets its name." Read full article Comments ]]>

### Vulnerability that lets hackers SSH into Linux devices is under active exploitation
Mon, 09 Nov 2026 19:41:34 +0000 — https://arstechnica.com/security/2026/11/vulnerability-that-lets-hackers-ssh-into-linux-devices-is-under-active-exploitation/

Hackers are actively exploiting a recently discovered critical vulnerability that allows them to log in to privileged accounts on many Linux systems, multiple researchers are reporting. The vulnerability, tracked under the name *sshole, arises from the interaction between OpenSSH and a code library known as musl. Linux systems that use both of these packages and meet certain other requirements can be hacked to give unauthenticated access to high-privilege accounts in a matter of seconds. *sshole became publicly known last Thursday and quickly stoked concerns it could lead to widespread compromise of Linux machines. Four days later, the prediction shows signs of becoming real. Attackers conducting "mature intrusions" Security firm Greynoise said Monday that honeypots it maintains in Southeast Asia have come under attack by a group it’s tracking as GT10. The group conducted “mature intrusions" into the systems, which Greynoise uses to detect attempted or successful attacks in real time. Greynoise subsequently gained access to a GT10 server that revealed potential other victims and some of the tools used in the campaign. A backdoor the group is using in the attacks contains Chinese language comments and appears to be generated with the use of AI. Read full article Comments ]]>

### Pentagon mulls placing fleet of military satellites around the Moon
Mon, 09 Nov 2026 19:08:37 +0000 — https://arstechnica.com/space/2026/11/us-military-notionally-interested-in-satellite-constellation-around-moon/

The US military has published a Request for Information on a federal procurement website signaling interest in deploying a "proliferated cislunar constellation" consisting of an unspecified number of satellites performing an undisclosed mission in the vicinity of the Moon. The announcement follows statements in recent months from the Space Force's acquisitions chief for advanced programs, Maj. Gen. Stephen Purdy, that the military was getting serious about extending its reach to the Moon. The Space Force's most distant satellites today are in geostationary orbit, some 22,000 miles (36,000 kilometers) over the equator, collecting routine surveillance and missile warning data. Most recently, Purdy spoke of a shift in Pentagon leadership's thinking about the Moon following an executive order signed by President Donald Trump last December. The order set out the Trump administration's space policy. One section of the order deals with the US government's ability to detect, characterize, and counter threats to US space interests from low-Earth orbit to cislunar space, the term of art for the region of space around the Moon. Read full article Comments ]]>

### Claude Code is accidentally exposing secrets all over GitHub
Mon, 09 Nov 2026 17:24:26 +0000 — https://arstechnica.com/ai/2026/11/claude-code-settings-files-expose-thousands-of-secrets-on-github/

Claude Code is leaking sensitive information on public GitHub instances thanks to a partial oversight in the way its settings files are handled. That's the finding of AI security researchers at Apiiro, who discovered thousands of secrets , including database passwords, API tokens, and root logins, amid Claude Code settings files embedded in GitHub repositories. The leak stems from the way Claude Code handles user approval for automated shell commands. When a user chooses the "Yes, and don't ask again" option to approve running a command, that choice gets stored as part of a rule in the local ".claude/settings.local.json" file on the user's computer. That rule is sometimes coded as a pattern, but the command itself is often written to that settings file as is, including any sensitive information that may be embedded within it. This isn't really a significant security issue if the settings file stays on the user's local machine (assuming that machine doesn't become compromised itself, of course). And Anthropic notes in its Claude Code documentation that this particular settings file gets added to the developer's global .gitignore list , which usually prevents it from being shared publicly. Read full article Comments ]]>

### SpaceX now fundamentally an "infrastructure company," senior official says
Mon, 09 Nov 2026 15:39:21 +0000 — https://arstechnica.com/space/2026/11/spacex-now-fundamentally-an-infrastructure-company-senior-official-says/

For a long time, SpaceX has been synonymous with the development of newer, larger, and ever-more-reusable rockets. But that began to change over the last decade with the introduction of Starlink, and the change has accelerated during the last 18 months as the company has pivoted to data and artificial intelligence. At last week's UP.Summit conference in Florida, the vice president of launch at SpaceX, Kiko Dontchev, offered some of the most revealing comments to date about the company's changing focus, how it is embracing AI, and why the Falcon 9 rocket—which has dominated global launch for a decade and remains the world's preeminent launch vehicle—is firmly on the road to retirement. "In the last couple years, when I talk about SpaceX, yes, we are a rocket company, but fundamentally we are an infrastructure company at this point," Dontchev said. "We're building infrastructure on the ground and low Earth orbit, soon on the Moon, and obviously eventually Mars." Read full article Comments ]]>

### Nvidia CEO's affair becomes a national security problem
Mon, 09 Nov 2026 15:23:20 +0000 — https://arstechnica.com/tech-policy/2026/11/ceo-jensen-huang-admits-affair-as-nvidia-probes-possible-chinese-espionage/

Nvidia’s chief executive Jensen Huang has admitted having an affair two days after the FT reported his alleged romantic relationship with a woman the US intelligence community believes was working as a spy for China. Huang revealed the affair in an internal message to employees on Sunday that was obtained by the FT. “I owe my family and all of you an apology,” Huang said in the message. “I was unfaithful to my wife. My actions hurt her and our children. There is no excuse for what I did. I am deeply sorry.” Read full article Comments ]]>

### F1 in Brazil: You’ve got to keep your tires alive
Mon, 09 Nov 2026 15:16:31 +0000 — https://arstechnica.com/cars/2026/11/f1-in-brazil-drivers-at-their-very-best-in-tricky-conditions/

In sports, a “ dead rubber ” is a match that takes place after the outcome of the series or championship has already been decided. The people in charge hate this*—if you wrap up a title two-thirds of the way through a season, the viewers evaporate, as there’s nothing left at stake. But anyone who decided to skip this year’s Brazilian Grand Prix this past weekend missed one of the year’s most entertaining races, as a combination of a mixed-up starting order, some very fast drivers at the back, and a wet track that dried and then saw rain again resulted in action aplenty. A peculiarity of F1 is that even if you manage to win a championship, there’s no guarantee you’ll be in a position to defend it. Take McLaren’s Lando Norris, who took the crown in 2025 after a nail-biting fight with his teammate Oscar Piastri and Red Bull’s Max Verstappen. Sadly for Lando, McLaren did not start this year in a position to win races, and even with several upgrades, the team has produced a car that is still very tricky to drive. But this weekend in Brazil, Norris demonstrated the form that earned him the number 1. Rain on Saturday during qualifying helped jumble the usual running order. It was heavy enough that drivers used the wet weather tire with deep treads, which usually generates so much spray that visibility disappears and running has to be suspended. But with fewer cars on track in the later knockout qualifying sessions, this was not a problem for once. More disruption came from grid pena

### New Democratic Congress will likely strip the gilding from Trump's Golden Dome
Mon, 09 Nov 2026 12:00:05 +0000 — https://arstechnica.com/space/2026/11/new-democratic-congress-will-likely-strip-the-gilding-from-trumps-golden-dome/

Two of the top lawmakers backing the Pentagon's Golden Dome missile defense shield are among the wave of Republicans leaving Congress in the coming Democratic takeover, raising questions about the future of President Donald Trump's signature second-term defense initiative. The shakeup on Capitol Hill comes after military officials signaled in recent months that they might backpedal from one element Trump asked for in Golden Dome: the capability to shoot down missiles in their initial boost phase shortly after launch. The Golden Dome has escaped serious congressional scrutiny since Trump announced the program in January 2025, one week into his second term in the White House. That lack of scrutiny will change as Democrats take responsibility for writing the Pentagon's budget, introduce limits on funding, and put forth bills to strip out Golden Dome's most controversial component and give the program a new name. Read full article Comments ]]>

### Physicists listened to electrical noise to crack a superconductor mystery
Sun, 08 Nov 2026 12:15:31 +0000 — https://arstechnica.com/science/2026/11/physicists-listened-to-electrical-noise-to-crack-a-superconductor-mystery/

Superconductors carry electricity without resistance, but most only work a few degrees above absolute zero. In the late 1980s, copper-based materials called cuprates were found to superconduct at higher temperatures—reachable with affordable liquid nitrogen. Yet nearly 40 years later, physicists still don't agree on why. In a recent Science study, a team of physicists led by Milan Allan of Ludwig Maximilian University of Munich and Ingmar Swart of Utrecht University in the Netherlands has found some answers by listening to the faint electrical crackle of current flowing into a cuprate. The missing electrons Central to the mystery of cuprates’ high-temperature superconductivity is a strange state called the pseudogap. “The pseudogap is a phenomenon of missing electrons,” Allan said. Above the temperature at which cuprates become superconducting, some of their electrons seem to vanish—measurements find far fewer of them at the energies where they should be. “Everybody knows that from different probes, you see that there's these vanishing electrons, but nobody knows why,” Allan said. Read full article Comments ]]>

## The Verge

### MSI’s refurbished QD-OLED gaming monitor is on sale for under $300
2026-11-09T16:43:41-05:00 — https://www.theverge.com/gadgets/1030262/msi-mag-272qp-qd-oled-x24-monitor-woot-deal-sale

One of the best upgrades you can make to your PC gaming setup is an OLED monitor. Fortunately, MSI’s factory-reconditioned Mag 272QP X24 is on sale at Woot through November 18th with a 180-day manufacturer warranty for $290.99, which is more than $100 cheaper than the full MSRP of $399.99. MAG 272QP QD-OLED X24 (refurbished) Where to Buy: $399.99 $290.99 at Woot MSI’s 27-inch screen is well-featured for the price, with 1440p resolution, a 240Hz refresh rate, and both G-Sync and FreeSync compatibility, which help reduce screen tearing when your FPS is below the max refresh rate. PC games are particularly well-suited to take advantage of the deep black levels OLED panels produce, too, giving every game you play a deeper, more immersive feel. MSI’s budget OLED also features quantum dots for fuller, more vivid colors. It doesn’t cut corners on ports either, with two HDMI 2.1, one DisplayPort 1.4a, and one USB Type-C DP Alt input. ]]>

### The global pledge to use AI for climate good is a cruel joke
2026-11-09T16:13:16-05:00 — https://www.theverge.com/science/1030252/ai-data-center-climate-pledge-united-nations-cop31

Murat Kurum (left), Turkey’s minister of Environment, Urbanisation and Climate Change; and Chris Bowen, Australia's minister for Climate Change and Energy, raise their hands together at the COP31 UN Climate Change Conference in Antalya, Turkey, on November 9th, 2026. | Photo: AFP via Getty Images At this point, reading through the latest splashy pledge to use AI for the good of the environment feels like downing a nonalcoholic beer. Admittedly, I'm suspicious from the onset. How can this be good? But I love beer and our planet enough to give it a whirl - and hey, why not try a little harm reduction ? Negotiators from more than 190 countries around the world are in Antalya, Turkey, this month for the annual United Nations climate summit, called COP31 (the 31st "Conference of the Parties" that ratified the UN Framework Convention on Climate Change). Turkey previewed its Antalya Artificial Intelligence Pledge ahead of the convening, inv … Read the full story at The Verge. ]]>

### Apple’s $50 Intelligence Usage Packs extend access to some AI features
2026-11-09T14:09:58-05:00 — https://www.theverge.com/tech/1030084/apple-intelligence-usage-packs-ai-features-creator-studio-logic-pro

After publishing a support article in early September outlining usage limits for some Apple Intelligence features, the company has updated Logic Pro with an option to "Buy More Usage" for a one-time purchase price of $49.99, as spotted by 9to5Mac . It has a built-in AI assistant to do things like "start a new song, set up a vocal track from a single prompt, or refine an active project." These Intelligence Usage Packs, as Apple calls them, will allow users to continue accessing certain Apple Intelligence features that have usage limits because they rely on cloud-based AI models from OpenAI or Google Gemini. The Usage Packs can only be used … Read the full story at The Verge. ]]>

### Anthropic launches new Claude Fable and Mythos 5.2 models
2026-11-09T14:00:00-05:00 — https://www.theverge.com/ai-artificial-intelligence/1030005/anthropic-claude-fable-mythos-5-2

Anthropic is announcing two new models today: Claude Fable 5.2 and Claude Mythos 5.2, which it says are designed to take on "daunting" technical challenges. The company claims the new models show improvements in coding, reasoning, and vision, and can generate outputs faster than the 5.1 versions of the Fable and Mythos models. Claude Fable 5.2 is good at challenging software engineering problems, Anthropic says, and can orchestrate agent teams and tackle long-running projects. The new model has also solved some complex scientific problems, including two open theoretical physics problems. During prerelease testing, the two models have "help … Read the full story at The Verge. ]]>

### You can grab three months of Game Pass Ultimate for under $20 per month
2026-11-09T13:35:25-05:00 — https://www.theverge.com/gadgets/1029998/game-pass-ultimate-three-months-lego-pokemon-pikachu-deal-sale

The price of Xbox Game Pass Ultimate has fluctuated between $20 and $30 per month over the last year, but you can get three months of the top plan for around $19 per month. At Newegg , using the coupon code BNWF2656 at checkout knocks $11 off the usual cost of a three-month subscription. That brings the price down to just $57.99 for three months. In addition to full access to over 500 games on both Xbox consoles and Windows PC machines, the upgraded Ultimate plan includes EA Play and Ubisoft Plus Classics, which have their own libraries and benefits, and Fortnite Crew for full access to the Fortnite battles passes. On Xbox, Ultimate enables online multiplayer, as well. Xbox Game Pass Ultimate (three-month subscription) Where to Buy: $68.99 $57.99 at Newegg (w/ promo code BNWF2656) Previously a straightforward proposition, the service has undergone a variety of changes over the last year that has made it slightly less appealing. Xbox Game Pass Ultimate was previously $29.99 per month, but earlier this year Microsoft removed the Call of Duty games from the library, and in the process dropped the price to $22.99. More recently, Microsoft added hourly limits to cloud gaming . All Game Pass plan subscribers previously enjoyed an unlimited amount of cloud gaming on their computer or mobile device, but now plans scale the number of included hours, with the Ultimate plan including 15 hours per month. That news came just weeks before announcing pay-as-you-go plans for non-Game Pass su

### Instagram’s Effect Builder makes new filters from AI prompts
2026-11-09T13:07:23-05:00 — https://www.theverge.com/tech/1030061/instagram-ai-effect-builder-filters

After expanding its Edits app to macOS last week, Instagram's next move is launching this Effect Builder that generates custom filters for your Stories posts with AI. Available now for US residents who are over 18, it has a prompt box for describing your filter idea to the chatbot, with an option to attach style reference images. Then you can upload your own photos to preview the AI-generating effects, and ask for changes in follow-up prompts. There's also an option to allow Instagram's AI to rewrite your prompt, which turned my one-line test prompt "Make a filter that turns photos into comic book pages" into several AI-generated paragraphs … Read the full story at The Verge. ]]>

### James Gunn is out as DC movie leader
2026-11-09T12:39:57-05:00 — https://www.theverge.com/entertainment/1030022/james-gunn-peter-safran-dc-studios-out-leaving

Soon, James Gunn and Peter Safran will no longer head up Skydance's DC Studios. After taking the helm of DC Studios as co-CEOs in 2022 , Gunn and Safran are being replaced by former Marvel SVP of Production and Development Jeremy Latcham, Deadline reports . However, Gunn and Safran will "continue to produce on various DC projects" and are still working on the Superman followup Man of Tomorrow , Deadline says. Gunn also posted on Instagram that he and Safran have "just been engaged on another DC project which I'm writing." In his Instagram post, Gunn said that his time at DC Studios has been "trying, to say the least. I dislike the at-times cor … Read the full story at The Verge. ]]>

### The future of AI hinges on… Jensen Huang’s sex life?
2026-11-09T12:36:08-05:00 — https://www.theverge.com/ai-artificial-intelligence/1029990/jensen-huang-the-spy-who-loved-me

Step 1. Cut a hole in the box. | Image: The Verge I would prefer that these people's sex lives were none of my business but I guess we have to talk about Jensen Huang and the National Security Incident. Who could have guessed that the guy who was out here signing titties might not have great judgment about how to behave around women ? Alice Huang - no relation to Jensen - is a former TV reporter. That was before she became "an executive" at Megaspeed, which bought $4.8 billion of hard-to-get Nvidia chips, starting around the time she was being photographed with Jensen in a Taipei bar in 2024. "To many in the industry, the well-funded push by Megaspeed into A.I. appeared to come out of nowhe … Read the full story at The Verge. ]]>

### Uber wants to park your car now, too
2026-11-09T12:00:00-05:00 — https://www.theverge.com/transportation/1029776/uber-parking-launch-spothero-robotaxis

Uber announced the launch of Uber Parking, a native in-app reservation feature that allows drivers to find, book, and pay for garage and lot spaces ahead of time. The new feature is a result of Uber's recent acquisition of SpotHero , integrating a network of over 13,000 facilities across more than 400 cities into the company's platform. The new feature works by tapping the new "Parking" icon in the Uber app to view an interactive map with upfront prices and arrival times. You can filter spots by self-park or valet, outdoor lot or garage, and whether staff are on-site. The app will prompt you to enter your vehicle details and license plate, a … Read the full story at The Verge. ]]>

### Sony’s new PlayStation Portal handheld includes ‘additional’ internal storage
2026-11-09T11:23:31-05:00 — https://www.theverge.com/news/1029822/sony-playstation-portal-japan-model-additional-storage

Sony is launching a new version of its PlayStation Portal exclusively in Japan next month. The updated model will launch in the midnight black color option we've seen before , and will include "additional" internal storage for future-looking features. It's the additional internal storage that's the surprise change to this particular model, which will be locked to Japanese language options and can only be used with a PlayStation account registered in Japan. Sony says the extra storage is for "future functionality" that it will announce once these features are finalized. Sony is also renaming this particular Portal from PlayStation Portal Rem … Read the full story at The Verge. ]]>

## Tom's Hardware

### Ethereum Foundation sued after firing employee over mandatory 'Source Seppuku' suicide pact
Mon, 09 Nov 2026 18:43:48 +0000 — https://www.tomshardware.com/tech-industry/cryptocurrency/ethereum-foundation-sued-after-firing-employee-over-mandatory-source-seppuku-suicide-pact-crypto-firm-demanded-employees-pledge-to-take-their-own-lives-with-a-sword-to-protect-open-source-code-founder-vitalik-claims-1-000-year-mandate-just-artwork

A former employee of The Ethereum Foundation is suing the nonprofit, alleging disability discrimination, retaliation, unfair employment practices, and related claims, reports The Denver Post . 'The Ethereum Foundation Mandate,' a 38-page vision for the next 1,000 years, was distributed to the organization's ~250 employees in Q1 this year. On page 11 of the finalized document, there was a bizarre and rather extreme oath. This illustrated page essentially formed a suicide pledge and, unsurprisingly, scores of people didn't want to sign. At the top of this story, you can see page 11 from the evidence submitted in the case of FULTON v. ETHEREUM ASIA PACIFIC LIMITED et al. Perhaps one could say it was illustrated like an anime version of Grimm’s fairy tales. Indeed, it contains more than a touch of the macabre, like all the best such stories. On this particular page, reproduced in court documents, anyone working on the software used by the Ethereum Federation (EF) was asked to ensure that the source code and associated documents remained free and publicly accessible. Underlining this pledge, folks had to vow to “take his or her own life with a sword upon failure to uphold any of the pledges in this license, or upon modification or removal of any part of this license.” The message about falling on one’s sword was repeated in the illustration by a cartoon cat. Agree or leave without delay At the end of the 38-page document, employees picked one of two options, basically agreeing to 

### Nvidia cracks down on overseas cloud AI GPU rentals for China
Mon, 09 Nov 2026 17:48:17 +0000 — https://www.tomshardware.com/tech-industry/policy/nvidia-cracks-down-on-overseas-cloud-ai-gpu-rentals-for-china-partners-face-51-percent-non-chinese-quota-as-black-market-b300-rack-prices-surge-to-usd2-8-million

Nvidia-based compute is getting scarce and expensive for Chinese AI labs on both of their main routes, buying export-compliant cards and renting abroad, and the Financial Times reports that Nvidia’s own crackdowns are part of the reason. Nvidia has told cloud partners worldwide that at least 51% of their services must go to non-Chinese firms, while Chinese companies have bought more than 1 million Nvidia gaming and workstation cards this year to cover the shortfall. Meanwhile, a B300 rack that sells for about $600,000 internationally reportedly fetched $2.8 million in China last month. Chinese customers have ordered more than 6 million of Nvidia’s export-compliant RTX Pro 5500 cards. That is at least twice the 3 million that the company could reportedly manufacture in 2027. One source told CNBC that it was proposed that Moonshot pay 30% to 50% more upfront, in comparison to a non-Chinese entity. Many Chinese groups have relied on overseas leases for advanced AI work, which can include model training, and these tech groups have been the biggest clients for data centers in Southeast Asia. Data centers unable to find non-Chinese clients could be forced to pull back supply, and it’s “difficult to find enough non-Chinese clients outside the US,” one Singapore-based group told the FT . While Nvidia hasn’t confirmed or denied its new rule, implementing it would ease criticism from U.S. lawmakers just as Chinese demand is growing. What Nvidia told partners has come through verbal ins

### Nvidia CEO Jensen Huang summoned to Congress over affair with alleged Chinese spy
Mon, 09 Nov 2026 15:57:13 +0000 — https://www.tomshardware.com/tech-industry/big-tech/nvidia-ceo-jensen-huang-summoned-to-congressional-committee-over-affair-with-alleged-chinese-spy-says-recent-reports-raise-concerns-over-security-protocols-and-ties-to-chinese-intelligence

Less than 24 hours after he admitted to having an affair with Alice Huang, a Megaspeed executive suspected of being a Chinese spy , Nvidia CEO Jensen Huang has been asked to appear before the House Select Committee on China. The Committee issued a letter today, signed by Rep. Brian J. Mast (R-FL), Rep. John Moolenaar (R-MI), and Rep. Eric A. Crawford (R-AK). An X post featuring the letter states that the letter "expresses concerns over NVIDIA’s security protocols against foreign adversary espionage and Mr. Huang’s reported ties to a Chinese intelligence-linked executive of a Singapore-based data center company." ICYMI: Chairman @RepMoolenaar, Chairman @RepBrianMast, and Chairman @RepRickCrawford have sent a letter to NVIDIA CEO @JensenHuang asking him to appear before their three committees this month. The letter expresses concerns over NVIDIA’s security protocols against foreign adversary espionage and Mr. Huang’s reported ties to a Chinese intelligence-linked executive of a Singapore-based data center company. November 9, 2026 "Dear Mr. Huang: We are writing to request that you appear before our committees for a joint, closed-door briefing on NVIDIA’s security protocols against foreign adversary espionage and your interactions with a publicly reported People’s Republic of China (PRC) intelligence asset: Megaspeed executive Alice Huang," the letter begins. It goes on to say that recent reports surrounding the affair "raise significant national security concerns regarding the

### Bizarre AI chip demo uses butter to highlight how new chip runs 40 degrees cooler than the competition
Mon, 09 Nov 2026 15:15:00 +0000 — https://www.tomshardware.com/tech-industry/data-centers/deepx-ai-chip-runs-so-cool-that-a-butter-heatsink-doesnt-melt-the-dx-m1-processor-impresses-in-a-bizarre-new-dairy-based-benchmark

Processors generating excess heat play a significant part in contemporary data center design, cost, and resource use. However, things could be vastly different if AI chips were more efficient and ran far cooler. South Korean chip startup DEEPX, recently featured by CNBC , thinks its AI chip designs are the answer. DEEPX demonstrated its DX-M1 processor’s cool-running capabilities in a bizarre new dairy-based thermal benchmark. While rival chips caused a knob of butter to sizzle in seconds, atop the DEEPX solution, the butter block remains solid. Concerns over AI data center proliferation are growing worldwide. These developments are shaping business, the environment, and politics . Some people have very strong feelings about them, and hundreds of people have risked being thrown into jail protesting data centers. The CNBC report linked in the intro looks into why modern data centers are problematic, and indicates that the core issues stem from the use of hot-running processors and the extensive power and cooling apparatus they need. DEEPX says its simple answer is to “make the AI chips themselves run cooler.” The CNBC video includes a demo of the ultra-low-power DX-M1 processor. In a side-by-side test against unnamed rival AI chips, you can see the DX-M1 NPU is clearly cooler. DEEPX CEO Kim Nok-won claims a temperature difference of 25 to more than 40 degrees Celsius compared with competitors. Kim said the side-by-side chips processed “the same AI workload… and every chip melt

### Acer Predator Helios Neo 16S AI Review: Slim OLED gaming that doesn't last long
Mon, 09 Nov 2026 14:05:00 +0000 — https://www.tomshardware.com/laptops/gaming-laptops/acer-predator-helios-neo-16s-ai-review

Not everyone wants a hulking gaming laptop. Some prefer something stealthier. Acer’s Predator Helios Neo 16S AI aims for portability but still packs a Core Ultra 9 290HX Plus processor and Nvidia RTX 5070 Ti graphics into a sub-five-pound package. It also includes plenty of ports and a beautiful 240 Hz OLED display. That hardware gives it plenty to work with, but the question remains whether the Helios Neo 16S AI can still deliver solid gaming performance while being portable. Design of the Acer Predator Helios Neo 16S AI Acer’s obsidian black chassis maintains the look of the Predator series – angular, dark, and visible in the dark with its illuminated lid logo. At 14.05 x 10.85 x 0.74 inches and 4.85 pounds, it’s respectably trim for a gaming laptop, though the Gigabyte Aero X16 (14 x 9.9 x 0.78 inches, 4.2 pounds) and the HyperX Omen 15 (13.5 x 9.96 x 0.93 inches, 4.89 pounds) both have about an inch less depth since neither use a rear thermal shelf like Acer. Tom's Hardware Tom's Hardware The build quality is decent – both the chassis and lid show little flex. The stamped aluminum panels on the lid bottom and chassis lid aren’t ultra-premium but still beat plastic. One downside is that the metal shows fingerprints easily, which are difficult to clean off. Acer provides an impressive port variety across three sides: Thunderbolt 4, three USB-A 3.2, USB-C 3.2, HDMI 2.1, 2.5 Gbps Ethernet, a MicroSD card reader, and an audio jack. The rear ports conveniently leave cables out 

### Nvidia RTX PRO 6000 user’s cables almost melted, even when limited to 500W
Mon, 09 Nov 2026 14:00:00 +0000 — https://www.tomshardware.com/pc-components/gpus/nvidia-rtx-pro-6000-users-cables-almost-melted-even-when-limited-to-500w-12v-2x6-cables-appear-to-still-cause-problems-show-clear-signs-of-melting

Reddit user u/Doomslayer606 posted about frayed braided sleeving on both 12V-2x6 cables for their two RTX PRO 6000 Blackwell Workstation GPUs the other day, asking whether it’s normal cable degradation or a sign of overheating. The GPUs were running at 500W, below the maximum 600W power draw, but commenters are confident it’s overheated cables, as the poster reports stiff, cracked, and easily peeling sleeves on only some of the wires. u/Doomslayer606 posted on r/PcBuild with the title “Did I just save my RTX PRO 6000 GPUs from melting?” with photos of the 12V-2x6 cable’s braided sleeving frayed. The poster asked in the description whether this was normal degradation, a manufacturing issue, or overheating. The poster reported that the damaged braided sleeving felt stiff and peeled off easily, which is a strong indication of heat damage, and the comments were sure that it was. Did I just save my RTX PRO 6000 GPUs from melting? from r/PcBuild Luckily, the poster’s GPUs were safe, but the 12-2x6 connectors are notorious for melting due to high power draw. One comment asked if they kept the stock power limit, to which the poster responded that they lowered both GPUs to 500W — another user responded asking why the poster wouldn’t use 300W, but the poster said it would reduce performance by up to 50% and they need to keep up with their deadlines. Theoretically, the cable should be able to handle 500W, as each positive pin would only handle 6.94 A, which isn’t enough current to signi

### Anthropic skips six-year waitlist with massive $3.4 billion gas turbine generator deal
Mon, 09 Nov 2026 13:45:00 +0000 — https://www.tomshardware.com/tech-industry/data-centers/anthropic-skips-six-year-waitlist-with-massive-usd3-4-billion-gas-turbine-generator-deal-firm-takes-over-onepwrs-orders-secures-1-7gw-of-capacity-to-power-ai-data-centers

Anthropic, the AI company behind Claude, has agreed to spend $3.4 billion securing 1.7 gigawatts (GW) of gas-fired generators for its AI data centres, taking over equipment orders originally placed with Caterpillar by Texas-based supplier OnePWR Solutions. According to Reuters , the agreement was reached in late September, and also covers the engineering and construction work needed to install the equipment. Anthropic is not buying OnePWR itself. Instead, it is taking over the supplier's existing generator commitments, which were placed roughly two years ago but required additional financing. By taking over the existing orders, Anthropic avoids having to start from scratch and wait for Caterpillar to find another larger order into its production schedule. That timing matters too, as larger orders for large gas turbines and generators are piling up, and manufacturers are struggling to keep up with demand, especially from AI companies. Go deeper with TH Premium: AI and data centers (Image credit: Microsoft) The data center cooling state of play The custom AI ASIC state of play America’s AI chip rules keep changing — and the rest of the world is paying the price GTC 2026: Ian Buck press Q&A transcript — VP of Hyperscale and HPC speaks out on shelving CPX and shipping LPU decode this year Demand for data center CPUs has surged, and AI agents are responsible Notably, global turbine orders have reportedly exceeded 100GW, while manufacturing capacity stands at an estimated 60GW to 7

### Memory shortage spurs smartphone makers to melt used memory off old devices, then re-solder it onto new products
Mon, 09 Nov 2026 13:40:00 +0000 — https://www.tomshardware.com/pc-components/dram/memory-shortage-spurs-smartphone-makers-to-melt-used-memory-off-old-devices-then-re-solder-it-onto-new-products-recycled-memory-to-keep-budget-phones-affordable-reballing-adoption-to-double-by-2027

The smartphone industry is expected to see a spike in reballed memory adoption. According to a report by global market intelligence and research firm TrendForce, the current penetration rate is estimated at around 3–4%, with reballed memory primarily used in entry-level and budget smartphone models. However, this figure is expected to rise to 7–9% in 2027. Reballed memory is recycled memory salvaged from older or discarded devices. The term reball comes from the process itself, in which the solder balls on a used memory chip are first melted so the chip can be removed from the old device, then re-soldered to a new device, thus allowing the component to be reused rather than discarded. You can see the process in action in the video below. This offers manufacturers a cheaper alternative to sourcing new memory chips, potentially helping them keep production costs under control. Currently, reballed 4GB LPDDR4X memory modules make up the majority of such components on the market, and they are used in 4G smartphones priced below CNY 1,299 (approximately $200). This tactic is becoming increasingly important for smartphone makers, as customers are particularly sensitive to price increases in the budget segment. This leaves limited room to raise retail prices without affecting demand. Using reballed memory can help offset rising bill of materials (BOM) costs while allowing brands to keep entry-level devices affordable. TrendForce expects DRAM prices to rise even further in the first q

### Lawyer builds private AI server with eight used Nvidia V100 GPUs
Mon, 09 Nov 2026 13:20:00 +0000 — https://www.tomshardware.com/tech-industry/artificial-intelligence/lawyer-builds-private-ai-server-with-eight-used-nvidia-v100-gpus-up-to-215-tokens-per-second-to-keep-legal-files-offline-costing-about-usd2-400-per-four-gpu-board

A lawyer posted on Reddit about their private AI server built from eight used 2018-era Nvidia Tesla V100 data center GPUs so case files never have to leave the office. With two 4-card SXM2 NVLink boards, four PEX switches, and SlimSAS cables everywhere — plus one burnt power connector — the builder now runs the open DeepSeek V4.1 Flash model with every expert in GPU memory, at up to 215 tokens per second. The four-GPU boards cost about $2,400 apiece when the builder bought them. Lawyer's V100 homelab, update: two 4-card SXM2 NVLink boards, four PEX switches, SlimSAS everywhere, one burnt power connector, and a 250 GB model running entirely in VRAM at 200+ tok/s from r/homelab The eight Tesla V100-SXM2-32GB cards, each with 32GB of HBM2 at 900 GB/s, plug into SXM2, Nvidia’s mezzanine socket for data center GPUs, rather than PCIe slots, and are split across two baseboards. Inside each board, all four cards are NVLinked — NVLink is Nvidia’s direct GPU-to-GPU link — for 128GB per board, but the two boards only communicate over PCIe. Each board connects to the host through two PEX (PLX) switch cards over SlimSAS cables, four switches in all, with each switch handling two GPUs at PCIe 3.0 x8 speeds over its own x16 uplink. The given prices are already in the past, though: used V100 SXM2 32GB cards are now listed on eBay for about $900, more than double the roughly $400 apiece from the post, and listings suggest prices are still climbing. The system also already has some other neces

### China builds massive 800-megawatt AI data center campus to rival US Stargate project
Mon, 09 Nov 2026 13:00:00 +0000 — https://www.tomshardware.com/tech-industry/data-centers/china-builds-massive-800-megawatt-ai-data-center-campus-to-rival-us-stargate-project-galaxy-campus-delivers-first-120-megawatts-in-a-year-at-one-fifth-the-cost

China is building an 800MW AI data center campus in Inner Mongolia that could challenge the economics of America's Stargate project, according to a new report from SemiAnalysis . Envision has built the first 120 MW of Galaxy AI data center campus in less than a year, a cost the researchers put at just one-fifth of comparable US projects, after visiting the site in September. But getting the buildings up is only half of the battle. AI data centers need enormous amounts of electricity, and Envision is taking an unusual route to secure it— building its own wind farms and battery storage alongside the computing facility. While US developers are turning to on-site gas turbines to work around grid constraints, Envision is building its data center alongside wind farms, battery storage, and dedicated power infrastructure. Galaxy is located in Ulanqab, Inner Mongolia, and is being developed across four phases for two unnamed internet companies. The completed campus is planned to provide up to 800MW of IT capacity by the end of 2027, putting it closer to the approximately 820MW of critical IT capacity at the Stargate campus in Abilene, Texas. Envision is building its own power supply for Galaxy rather than leaving everything to the local grid. So far, the company has installed more than 100GW of wind turbines and wants its wind farms to provide over 60% of the electricity needed by the campus’s first two phases. Those farms, located about 80 kilometers apart, have a combined capacity o

### Spoof program monitors and emails your RAM usage to Sam Altman if under 90% utilization
Mon, 09 Nov 2026 12:31:12 +0000 — https://www.tomshardware.com/pc-components/ram/spoof-program-monitors-and-emails-your-ram-usage-to-sam-altman-if-under-90-percent-utilization-ram-altman-logs-usage-and-reports-you-for-wasting-memory

A new GitHub repository dubbed ram-altman features a script to monitor your PC’s RAM usage and report back to the eponymous OpenAI boss. Sam Altman infamously described people having spare, underutilized DRAM in computers at home as “ quite terrible ” in a recent podcast. Thus, developer Iain Kay was inspired to write a bash script that emails the OpenAI boss once a day to report on any RAM that is underutilized. Clearly this is not a serious tool, or rather “The memory accounting is. The correspondence isn't,” says Kay. Are you underutilizing your RAM? ram-altman.lol I am. Future ram-altman leans on the MemAvailable query, which returns the kernel's own estimate of how much memory programs can claim without swapping, explains the developer of this script. When installed, it checks every five minutes and emails Altman once a day if you are found to be wasting this precious resource. The emails take the .CSV file logs of your RAM use throughout the day as the data source to compose a summary email. These script-generated messages rotate through eight subject lines, 10 humorous message boilerplates, and six signoffs. Sample emails can be seen on the ram-altman.lol website. Altman’s email address isn’t supplied as part of the script. If your machine is using 90% or more of its RAM, then you won’t be reported to the OpenAI boss for wasting memory. Also, if you don’t want to disturb Altman, you can run the tests without emailing anyone with the terminal command: bash ram-altman.sh

### Huawei develops 'entirely Chinese' homegrown desktop PC system
Mon, 09 Nov 2026 12:30:00 +0000 — https://www.tomshardware.com/tech-industry/huawei-develops-entirely-chinese-homegrown-desktop-pc-system-features-10-core-20-thread-kirin-x90-consumer-cpu-and-huaweis-own-harmonyos-operating-system-but-western-supply-chain-lingers

Huawei has introduced its first desktop PCs powered by its own 10-core processor as well as proprietary HarmonyOS operating system, reports the Southern China Morning Post . The company claims that the CPU and the OS are built entirely of using 'components manufactured' in China, which matters when it comes national security and domestic supply chains inside the sanctioned country. But whether these machines are truly 'entirely domestic' is an open question. The Huawei Qinyun HM650 and HM650g desktop PCs come with 16 GB of LPDDR5 memory (probably made by China's CXMT) and either a 256GB or 512GB SSD (probably made by Chinese flash maker YMTC) are powered by the company's Kirin X90 system-on-chip, which originally debuted in Huawei's consumer systems in 2025. The key ingedient of the system it its processor, which features 10 Huawei-designed Armv8-based Taishan CPU cores in a 4+4+2 configuration, with all cores supporting simultaneous multithreading (SMT) to execute up to 20 threads simultameusly. The chip also integrates Huawei's Maleoon graphics processing unit (Arm Mali-based) and a dedicated neural processing unit for AI workloads. Although Huawei doesn't officially disclose the Kirin X90's manufacturing process, a teardown analysis by TechInsights confirmed that the CPU is manufactured by SMIC using its 7nm-class N+2 process technology. This makes the X90 an example of Huawei's ability to develop PC-class processors using domestically available semiconductor manufacturing

## Phoronix

### AMDGPU Linux Driver Patches Posted For Enabling GFX13 Graphics IP - RDNA5
Mon, 09 Nov 2026 14:11:37 -0500 — https://www.phoronix.com/news/AMDGPU-Patches-GFX13

Since the beginning of the year there have been AMDGPU LLVM back-end patches for GFX13 as AMD's next-generation graphics IP. This is most likely for RDNA 5 graphics. Now out today are the GFX13 patches finally surfacing for the AMDGPU Linux kernel graphics driver...

### Darling Now Embraces AI For Running macOS Binaries On Linux
Mon, 09 Nov 2026 08:02:13 -0500 — https://www.phoronix.com/news/Darling-Using-AI-macOS-Linux

Darling is the software project more than a decade in development that is designed to run macOS binaries on Linux. This macOS compatibility layer for Linux is now gaining more brisk developments as it turns to AI/LLMs to assist in this creation...

### ChaCha AVX-512 Optimization For Linux 7.5 Yields Up To 99% Improvement On AMD Zen 5
Mon, 09 Nov 2026 07:35:12 -0500 — https://www.phoronix.com/news/ChaCha-AVX-512-Linux-7.5

The Linux kernel's ChaCha symmetric stream cipher code has long had an AVX-512 optimized code path but it was catering to the early generations of Intel CPUs with AVX-512 (Skylake) that suffered from down-clocking under use. But now slated for arrival with Linux 7.5 is tuning the code to perform better on today's AVX-512 Intel and AMD processors that don't suffer from this limitation. In turn the ChaCha performance is as much as 99% faster with current-generation AMD Zen 5 processors...

### Linux Seeing Driver Work For MSI Mystic Light On Latest Ryzen Motherboards
Mon, 09 Nov 2026 06:20:49 -0500 — https://www.phoronix.com/news/MSI-Mystic-Light-Linux

MSI's latest Ryzen motherboards with AMD 800 series chipsets feature a new capability marked as Mystic Light for RGB lighting controls of the motherboard as well as compatible graphics cards and cases. MSI Mystic Light control software is only offered for Microsoft Windows but thanks to an open-source developer with the help of Claude Code, a Mystic Light open-source driver is being worked on for the Linux kernel...

### Linux 7.5 To Convey To User-Space Multi-Grain Timestamp Usage On Files
Mon, 09 Nov 2026 06:08:22 -0500 — https://www.phoronix.com/news/Linux-7.5-Statx-MG-TImestamp

Merged for Linux 6.13 back in 2024 was multigrain timestamp support for being able to switch between coarse and fine-grained change/modification time reporting on a per-file basis. This is useful if caring about accuracy more than the once-per-jiffy timestamps on files and was originally devised as a way of addressing NFS caching issues. A limitation of multigrain timestamps though has been the lack of user-space to know whether a file's timestamps are multi-grain or not...

### New Linux Patches Bring-Up The Samsung Galaxy XR Headset, Qualcomm Halliday SoC
Mon, 09 Nov 2026 05:46:20 -0500 — https://www.phoronix.com/news/Linux-Samsung-Galaxy-XR

Samsung's Galaxy XR headset runs on Android XR by default with its own downstream kernel patches. A user leveraging AI with multiple LLMs has now drafted an initial set of patches getting the Galaxy XR headset working on the mainline kernel along with bringing up the Qualcomm Snapdragon XR2+ Gen 2 "Halliday" SoC that powers this VR/XR headset...

### Intel ANV Lands Bitrate Control For AV1 Encoding
Mon, 09 Nov 2026 05:30:24 -0500 — https://www.phoronix.com/news/Intel-ANV-AV1-Bitrate-Control

Hyunjun Ko of Igalia continues working on enhancing the Vulkan Video support in the Mesa ANV driver for better open-source video acceleration support...

### Linux 7.4-rc2 Released With FAT32 Optimization, AMDGPU HDMI 2.2 Improvement
Sun, 08 Nov 2026 19:48:19 -0500 — https://www.phoronix.com/news/Linux-7.4-rc2-Released

Linus Torvalds just released the second weekly release candidate of Linux 7.4 with some notable bug fixes and other changes routed in past the merge window. It's another big one in the AI era...

### Linux 7.5 To Provide More AMD Ryzen AI NPU AIE4 Enablement
Sun, 08 Nov 2026 07:22:24 -0500 — https://www.phoronix.com/news/Linux-7.5-RK3568-AMD-AIE4

Even before the Linux v7.4 merge window was over, there were already two pull requests of drm-misc-next material targeting for what will be Linux 7.5. This week already saw the third drm-misc-next pull request of more feature patches targeting this next kernel version...

### AMD PerfOpt Performance Boosting Code Tweaked For Linux 7.4-rc2
Sun, 08 Nov 2026 06:37:07 -0500 — https://www.phoronix.com/news/AMD-PerfOpt-Tweaks-Linux-7.4

Of the many exciting changes in Linux 7.4, one of the exciting out-of-the-box performance improvements is the new "PerfOpt" functionality for AMD SoCs with integrated Radeon graphics. AMD PerfOpt can deliver some nice iGPU performance improvements especially for AI/LLM workloads. With today's Linux 7.4-rc2 kernel release there are a few tweaks to the PerfOpt code in the IOMMU area...

### Yunsilicon Working To Upstream Their High Performance Linux Network Driver
Sun, 08 Nov 2026 06:27:33 -0500 — https://www.phoronix.com/news/Yunsilicon-Linux-Network-Driver

Yunsilicon is a Chinese semiconductor startup founded in 2021 that is working on producing high performance networking adapters and DPUs. Over the past month has been their first foray into posting patches to the Linux kernel mailing list and working to get their networking hardware supported by the mainline Linux kernel...

### GCC 17 Feature Development Ends Next Week
Sun, 08 Nov 2026 06:12:21 -0500 — https://www.phoronix.com/news/GCC-17-Ends-Stage-1-Next-Week

How time flies with the GCC 17 feature development set to end next week and transitioning over to a bug fixing focus...

## The Register

### Attackers backdoor trusted AWS integrations to steal secrets
Mon, 09 Nov 2026 19:59:50 +0000 — https://www.theregister.com/security/2026/11/09/attackers-backdoor-trusted-aws-integrations-to-steal-secrets/5308553

Unknown attackers used compromised identity and access management (IAM) credentials associated with Qubole's AWS account to access customer AWS environments, stealing secrets and other sensitive data from S3 buckets. Qubole is a cloud data processing platform that uses cross-account IAM roles to manage compute and access storage in customers' AWS environments without requiring customers to provide long-lived AWS access keys. The supply-chain attack abused this third-party, cross-account trust relationship. Google’s cloud-security shop Wiz declined to tell us how many organizations were affected, but called it a “broad, opportunistic supply chain campaign” that hit “multiple” customer environments. “Because many organizations left trust policies active even after deprecating the platform, the attacker was able to successfully assume integration roles, enumerate cloud resources, harvest secrets, and siphon data,” the researchers told The Register in an emailed response to questions. Neither AWS nor Qubole responded to The Register 's inquiries. Wiz, working with Google's Mandiant incident responders after AI data security company Sentra flagged suspicious activity, traced the malicious activity back to October 14, when credentials associated with Qubole's AWS account were used to call the sts:AssumeRole API to obtain temporary credentials for customer-managed integration roles. The calls originated from Qubole AWS account 805246085872 , and used IAM user ID AIDA3W7DIFLYOLTK63SF

### Researchers pwn automakers’ Android apps to remotely unlock cars, honk horns
Mon, 09 Nov 2026 17:31:00 +0000 — https://www.theregister.com/security/2026/11/09/researchers-pwn-automakers-android-apps-to-remotely-unlock-cars-honk-horns/5308483

Security researchers exploited flaws in Android apps to gain remote access to connected cars from two major automakers, allowing them to start engines, flash headlights, and sound horns. Shubham Shah, co-founder at Assetnote, and researcher Sam Curry worked together on the exploits earlier this year. By tinkering with the cars’ Android apps, they devised exploit paths to issue remote commands to vehicles in Australia and the US . The pair published separate blogs covering different aspects of the research; Shah said the US attack "required a lot more work" because the automaker "spent much more time securing the US, Canadian, and European OpenIDM environments." Both exploit chains centered around weaknesses in the ForgeRock identity platform relied upon by both automakers, the identities of which were kept anonymous by the researchers, who have previously highlighted flaws in the likes of Hyundai , Kia , Subaru , and many others . In the Australian version of the app, the researchers first found a vehicle identification number (VIN) using public licence plate checkers, and used those in queries to internal APIs, which provided personal information and owner email addresses. They also found hardcoded admin credentials for the ForgeRock OpenIDM that were meant for the staging environment but also worked in production. After bypassing the heavy WAF filtering by exploiting path traversal flaws, they were able to invoke the internal admin APIs and take over target accounts using o

### Insight about how 'nature makes no leaps' promises better robot predictions
Mon, 09 Nov 2026 17:00:00 +0000 — https://www.theregister.com/ai-and-ml/2026/11/09/insight-about-how-nature-makes-no-leaps-promises-better-robot-predictions/5308301

Machine learning researchers have developed a technique that allows world models to make better predictions about how objects will behave. World models are used to train physical AI systems like robots how to navigate the real world. They predict the consequences of actions. But they do so based on observed data. These models could provide better direction to robots if they were able to make inferences about possible actions without being trained for all the possible outcomes. Randall Balestriero (Brown University, AMI Labs), Kerda Varaku, and Turing Award winner Yann LeCun (NYU, AMI Labs) describe an approach that might allow that to happen in a pre-print paper, "Counterfactual World Models: Natura Non Facit Saltus." The Latin refers to Gottfried Leibniz's axiom " nature makes no leaps ," which had a good run until it ran headlong into quantum mechanics. Yet for the authors, the saying explains how they have been able to devise a method for zero-shot physics inference. Counterfactual world models, said Balestriero in an email to The Register use "the mismatch between your prediction and the real world to figure out what did you get wrong, and from that you can better understand what happened for better future predictions, debugging, reasoning, all at test time." Joint Embedding Predictive Architecture ( JEPA ) models, developed by LeCun and colleagues back in 2023, have been proposed for robots because they can take an action as input and ask what the world would be like wit

### Microsoft takes three decades to make Sticky Keys less sticky
Mon, 09 Nov 2026 16:43:17 +0000 — https://www.theregister.com/os-platforms/2026/11/09/microsoft-takes-three-decades-to-make-sticky-keys-less-sticky/5308491

Windows testers are getting a new option in the Sticky Keys and Filter Keys dialogs – one to banish the pop-ups without needing to venture deep into Settings. It's only taken several decades for Microsoft to put the off switch where the interruption actually happens. The accessibility features themselves are useful, though triggering their activation prompts by accident is another matter. Once enabled, Sticky Keys let users press modifier keys (such as Control) one at a time instead of holding them down together. For example, rather than holding Control and pressing C to copy, a user can press and release Control, then press C. Filter Keys, meanwhile, ignores brief or repeated keystrokes and adjusts the keyboard's repeat behavior. However, the dialogs are of little use to people who don't need the features, and they can pop up at the most inconvenient moments. Tap Shift five times, and you'll see what we mean: Windows chimes and shows a dialog asking whether you'd like to turn on Sticky Keys. Dismiss it, hit Shift five times, and there it is again. Or hold down the right Shift key for eight seconds to be treated to the Filter Keys pop-up. You can stop this behavior elsewhere in the system, but it requires a trek through Windows settings. The change, introduced in the Experimental Windows Insider Build 26340.9882, adds an option to the Sticky Keys or Filter Keys dialogs to dismiss the prompts permanently. It's a small change, but one that should spare users an irritating inter

### NASA keeps its PROMISE to raid Mars testbeds for parts
Mon, 09 Nov 2026 15:45:00 +0000 — https://www.theregister.com/science/2026/11/09/nasa-keeps-its-promise-to-raid-mars-testbeds-for-parts/5308475

NASA is moving ahead with its plan to repurpose a Mars rover engineering model as a lunar trundlebot for less than $400 million. The robot, dubbed PROMISE (Polar Rover for Observation, Mapping, and In-Situ Exploration), is a cut-and-shut of engineering test articles used for the Perseverance and Curiosity rovers, currently rolling around the Red Planet. During a weekend briefing , NASA outlined the plan for PROMISE: to land the robot on the lunar surface by late 2028 for an 18-month mission. PROMISE will be preceded by NASA's VIPER trundlebot, which is expected to survive only 100 days on the Moon's surface. PROMISE will carry copies of VIPER's science instruments, including a drill capable of boring 1 meter into the lunar regolith. Power will come from a Radioisotope Thermoelectric Generator (RTG) left over from the Cassini mission. NASA acknowledged the fuel was processed some time ago – the Cassini mission to Saturn was launched in 1997 – but anticipates there will be plenty of heat and power for PROMISE's components. Blue Origin is to deposit the rover on the Moon. NASA awarded the company a $94 million base contract, "with an option period worth an additional $140 million based on performance to deliver PROMISE to the lunar South Pole." The figures make it difficult to ascertain the exact cost of the PROMISE mission. However, during the briefing, NASA said it had "a pretty firm agreement with JPL to basically deliver the rover to the surface under $400 million." The $400

### Microsoft's Azure Linux gets 470-plus security fixes in one almighty patching session
Mon, 09 Nov 2026 15:02:00 +0000 — https://www.theregister.com/security/2026/11/09/microsofts-azure-linux-gets-470-plus-security-fixes-in-one-almighty-patching-session/5308434

Microsoft has unleashed a whopper of an update for Azure Linux, packing more than 470 CVE fixes into a single release as the software industry's ever-growing pile of vulnerabilities shows little sign of shrinking. Over the weekend, Microsoft rolled out Azure Linux 3.0.2022 with fixes covering everything from the Linux kernel to open source packages and container software. The changelog runs to hundreds of entries, so anyone planning to read the whole thing might want to put the kettle on. Microsoft's release notes contain more than 470 CVE references, although some vulnerabilities appear multiple times because they affect different packages. So that's not necessarily 470 separate security holes, but it's still an impressive amount of patching for one release. The fixes span OpenSSL, curl, Kubernetes, Docker, QEMU, and a lengthy list of other packages that underpin modern Linux environments. The generic Linux kernel has been updated to version 6.6.161.1. There's also been some housekeeping following the eMudhra certificate incident , tracked as CVE-2026-114406. Microsoft has removed or distrusted root certificates that could validate compromised eMudhra intermediate certificates, while adding checks in Python and Go to reject the affected certificates. It has also preserved SSL.com TLS trust where required, presumably to avoid fixing one certificate headache by creating another. Container infrastructure gets plenty of attention, too, with fixes spanning KubeVirt, containerd, D

### Who Gives A Crap? Hackers, apparently, after toilet paper maker's customer data exposed
Mon, 09 Nov 2026 14:30:00 +0000 — https://www.theregister.com/security/2026/11/09/who-gives-a-crap-hackers-apparently-after-toilet-paper-makers-customer-data-exposed/5308419

Toilet paper purveyor Who Gives A Crap has found itself in a bit of a mess after an intruder accessed customer information through a third-party software provider, leaving the company scrambling to clean up a breach affecting shoppers in the UK, US, and Australia. In an email sent to affected customers over the weekend, seen by The Register , the loo roll seller warns that personal information was accessed without authorization after a security incident at an unnamed US-based marketing software provider. The email explains that the intruder gained access to the supplier's systems on October 30. The provider spotted the intrusion the following day and says it secured its systems by November 1, although Who Gives A Crap wasn't told until November 6. It's unclear why the supplier sat on the bad news for another five days before passing it on. The exposed information includes customers' names, email addresses, phone numbers, mailing addresses, and total spending with the company. In other words, someone may now know not only where you live, but just how much of your hard-earned cash you've flushed down the crapper. Payment information, order details, and passwords were not involved, and customers' accounts were not directly accessed. That's something of a relief, although whether the intruder actually made off with the data remains a pressing question. "We don't yet know whether the information was copied or downloaded," the company told customers, adding that it had found no evi

### The AI bubble can wait, but your exit plan can't
Mon, 09 Nov 2026 14:02:00 +0000 — https://www.theregister.com/ai-and-ml/2026/11/09/the-ai-bubble-can-wait-but-your-exit-plan-cant/5308415

The AI bubble isn't about to burst, Forrester reckons, although businesses should prepare for a correction that could upend their suppliers, contracts, and prices. Spending on infrastructure has raced ahead of measurable returns, the analyst says, yet the financial strength of the companies funding the build-out is what keep Forrester from predicting an imminent crash. "Fears that an AI bubble is about to burst are premature," said Forrester emerging technology veep Brian Hopkins. "About nine-tenths of the money building today's AI computing infrastructure comes from large, healthy technology companies paying out of their own cash flow. The risk is concentrated in a few places: a small number of builders under real financial strain, and circular financing deals with the AI labs." Conveniently, Forrester has developed an AI Bubble Model to help technology leaders monitor the risks and prepare. Its latest report, " An AI Bubble Burst Is Not Imminent ," notes what many in the IT industry, including The Register , have been saying for a while: that the hyperscale operators are committing a record share of revenue into capital expenditure to bring online more infrastructure to support AI development and use. At the same time, the boost in productivity doesn't justify this supplier capacity build-out. Forrester calculates that the infrastructure investments break even only if AI raises US GDP by 5 percent by 2035. Published estimates suggest productivity improvements could provide 

### Outlook.com bounces legit emails as Microsoft's authentication crackdown goes sideways
Mon, 09 Nov 2026 13:30:00 +0000 — https://www.theregister.com/applications/2026/11/09/outlookcom-bounces-legit-emails-as-microsofts-authentication-crackdown-goes-sideways/5308428

A validation error has stopped Outlook.com from accepting legitimate emails. The problem appears widespread and, according to reports from affected users, can result in non-delivery reports with error codes related to SPF (Sender Policy Framework) validation failures. Other users have reported errors highlighting a lack of DMARC (Domain-based Message Authentication, Reporting, and Conformance) information. The troubles began at the end of last week and appear to be the result of Microsoft tightening the rules (or at least attempting to do so) for accepting emails. The company's consumer email services are affected, and it appears that if a domain doesn't have working SPF or if it has a missing DMARC record, then Outlook.com and its ilk will treat it as suspicious and not accept emails. The rules are designed to deal with spam, bulk senders, and the like. In 2025, Microsoft announced new rules designed to strengthen email authentication for domains sending more than 5,000 emails per day. In addition to DMARC and SPF compliance, DKIM (DomainKeys Identified Mail) was also required . Although this seemed like a good idea to ward off spammers, small senders now appear to be affected. According to complainants in the Outlook forum, a single email with just one line might now be rejected. Furthermore, Microsoft has not issued any advisory to customers explaining how the rules have changed. Although some customers insist their DMARC, SPF, and DKIM settings are compliant, many more ha

### Who can still open your files after they've left?
Mon, 09 Nov 2026 13:00:00 +0000 — https://www.theregister.com/storage/2026/11/09/sponsored-who-can-still-open-your-files-after-theyve-left/5306418

Someone left your organisation in the spring. Can they still open the project share? Most infrastructure leads would want to check before answering, and that pause is the subject of a dinner The Register and LucidLink are hosting for senior technology, infrastructure, and data leaders at the Covent Garden Hotel on Tuesday 24 November. Joe Fay of The Register is in the chair. Request a place The trouble is the copies. A busy folder lives on the file server, in a sync client, on a couple of laptops and in the share set up for an agency last year, and each copy carries its own permissions. Locking down one leaves the others as they were. Then there's the tool a team built for itself because the approved one was too slow, which IT may not know exists. The evening runs under the Chatham House Rule, and that's what makes it worth going. People say what actually happened in their own shop and how they caught it. Alan Marshall, Strategic Director, EMEA at LucidLink, joins a small group of peers round the table. Nobody presents. The talk moves on to unstructured data that keeps growing, the duplicate storage that comes with it, and how to get access back under control without throwing out the storage and governance you've already paid for. Drinks are at 6.30pm and dinner around one table runs until 9pm. Places are limited. Request a place at the 24 November dinner Places go by invitation and each one is confirmed personally. Sponsored by LucidLink.

### Japanese homeware giant pulls online store after cloud breach puts 7.7M records at risk
Mon, 09 Nov 2026 12:47:00 +0000 — https://www.theregister.com/cyber-crime/2026/11/09/japanese-homeware-giant-pulls-online-store-after-cloud-breach-puts-77m-records-at-risk/5308377

Japanese electronics giant Iris Ohyama has taken down its online store after discovering that attackers may have accessed the personal information of 7.7 million customers, leaving shoppers unable to place orders. The retailer, which sells everything from home appliances and furniture to pet supplies, first disclosed the incident on October 29 , a day after discovering a suspicious file on a third-party cloud service used by its Iris Plaza ecommerce operation. Iris Plaza immediately suspended its website and associated systems and began investigating, subsequently confirming unauthorized access. Iris Ohyama has since revealed that the potentially compromised cloud environment contained personal information belonging to approximately 5.8 million registered customers, including former members, and another 1.9 million people who had purchased products without creating an account or participated in promotional campaigns. The potentially exposed information includes names, addresses, phone numbers, email addresses, dates of birth, gender, and passwords, although the company says the exact information at risk varies between customers. Some of that data, including passwords, was encrypted, but Iris Ohyama hasn't explained what protection was used. It has advised customers who reused their Iris Plaza passwords elsewhere to change them, presumably before someone else gets the opportunity. There is some good news for anyone who has handed over their credit card details, as the retailer

### Datacenters, Elon Musk, and AI are all on the chopping block once Congress changes hands in 2027
Mon, 09 Nov 2026 12:14:00 +0000 — https://www.theregister.com/legal/2026/11/09/datacenters-elon-musk-and-ai-are-all-on-the-chopping-block-once-congress-changes-hands-in-2027/5308250

Hey, did you hear about those elections in the US this past week? You can listen to the latest episode of The Kettle right here on this page, as well as on Spotify , Apple Music , or YouTube . Those platforms also let you subscribe to The Kettle, so you are always notified when the latest episode goes live. The Democratic party has seized control of Congress and state governments around the country. It's easy to see this entirely as a rebuke of Trump and his policies, but blowback against AI, datacenters, and the tech industry played a role too, if the past week of chaos in markets and Silicon Valley is any indication. Join host Brandon Vigliarolo , El Reg Editor In Chief Matt Rosoff , and special guest, senior reporter at The Verge, Elizabeth Lopatto , to talk about what the winds of political change mean for the tech industry. A lightly edited transcript is below: Brandon (00:04) Hey everyone, and welcome to the latest episode of The Register' s Kettle Podcast. I'm your host, Reg Reporter Brandon Vigliarolo, and hey, chances are you've heard about those elections we had in the US this week. The Democratic Party dealt a pretty hearty rebuke to Donald Trump, Republicans, and the MAGA movement, with Dems winning elections in states that haven't gone blue in decades. Now it's easy to see this as a blowback against Trump and Republican politics. There's a lot of indication that the tech industry was kind of on the ballot this year, too. After all, they cozied up hard to Trump in

## Engadget

### YouTube will once again be part of Billboard chart calculations in 2027
Mon, 09 Nov 2026 21:09:51 +0000 — https://www.engadget.com/2311532/youtube-will-once-again-be-part-of-billboard-chart-calculations-in-2027/

Billboard will give more weight to free, ad-supported listening in its methodology.

### 5 Nintendo Switch 2 features everyone should know about
Mon, 09 Nov 2026 21:00:00 +0000 — https://www.engadget.com/2307744/nintendo-switch-2-features-everyone-should-know/

From finding hidden controllers to sharing games with others, improve your gaming experience on the Nintendo Switch 2 with these useful features.

### Apple starts offering $50 extended usage packs for AI features in Creator Studio
Mon, 09 Nov 2026 20:56:51 +0000 — https://www.engadget.com/2311500/apple-starts-offering-50-dollar-extended-usage-packs-for-ai-features-in-creator-studio/

It'll cost you to access Logic Pro's AI assistant after you reach the monthly usage limit.

### Windows 11 is finally adding an easier way to disable the Sticky Keys pop-up
Mon, 09 Nov 2026 19:42:47 +0000 — https://www.engadget.com/2311340/windows-11-is-finally-adding-an-easier-way-to-disable-sticky-keys-pop-up/

There's a checkbox that simply turns it off.

### How to use your iPhone to take the best picture of the Moon
Mon, 09 Nov 2026 19:30:00 +0000 — https://www.engadget.com/2307830/how-to-use-iphone-take-best-picture-of-moon-guide/

We explain how to take the best photos of the Moon with your iPhone, regardless of which model.

### Gmail users should know about this little-noticed feature
Mon, 09 Nov 2026 19:00:00 +0000 — https://www.engadget.com/2307742/gmail-unsend-feature/

Gmail's unsend feature will delay it from dispatching your message. Here's how to extend the amount of time you have to use it.

### How does Google Wallet's notification feed work and can you disable it?
Mon, 09 Nov 2026 18:15:00 +0000 — https://www.engadget.com/2307741/google-wallet-notifications-how-works-disable/

Google Wallet is attempting to make notifications easier to find with a notification feed, but if you're sick of alerts, find out how to disable them.

### The reason your laptop can get hot after extended use
Mon, 09 Nov 2026 17:45:00 +0000 — https://www.engadget.com/2307737/why-laptops-overheat-after-extended-use/

While it's normal for laptops to sometimes overheat after extended use, excessive temperature spikes can be reduced in a few ways.

### What the tiny blue dot on your Android phone is telling you
Mon, 09 Nov 2026 17:15:00 +0000 — https://www.engadget.com/2307733/what-tiny-blue-dot-on-android-phone-telling-you/

That tiny blue dot on the top right corner of your Android phone indicates something important. Find out what this icon means.

### Venmo finally launches an in-app bill splitting feature
Mon, 09 Nov 2026 17:05:15 +0000 — https://www.engadget.com/2310993/venmo-finally-launches-an-in-app-bill-splitting-feature/

Venmo's receipt-scanning feature is rolling out now.

### Uber is launching its own parking reservation service
Mon, 09 Nov 2026 17:00:00 +0000 — https://www.engadget.com/2308678/uber-is-launching-its-own-parking-reservation-service/

Uber Parking is built on the company's acquisition of SpotHero.

### Why EV fast charging slows down after 80 percent
Mon, 09 Nov 2026 16:45:00 +0000 — https://www.engadget.com/2307731/why-ev-fast-charging-slows-after-80-percent/

EV fast charging will only take you so far - the speed slows down as you near a full charge. Turns out there's a good reason.

## TechCrunch

### Hotel giant Wyndham exposed customer data after app security lapse
Mon, 09 Nov 2026 23:03:46 +0000 — https://techcrunch.com/2026/11/09/hotel-giant-wyndham-exposed-customer-data-after-app-security-lapse/

Exclusive: Wyndham left a hardcoded credential in its customer app, allowing anyone to access customer data. The hotel giant wouldn't say if it has the ability to check for any past unauthorized access.

### A short seller flagged Nvidia CEO s ties to a suspected Chinese spy six months before the scandal
Mon, 09 Nov 2026 22:46:09 +0000 — https://techcrunch.com/2026/11/09/a-short-seller-flagged-nvidia-ceos-ties-to-a-suspected-chinese-spy-six-months-before-the-scandal/

Six months before Nvidia's spy scandal erupted, Culper Research was already questioning Jensen Huang's unusually close relationship with a Chinese executive.

### The race is on to sue Nvidia
Mon, 09 Nov 2026 22:23:42 +0000 — https://techcrunch.com/2026/11/09/the-race-is-on-to-sue-nvidia/

Nvidia’s stock slid more than 4% after its board opened an investigation into Jensen Huang’s relationship with a suspected Chinese spy, and one securities law expert says the company’s earlier insistence that it was all “normal” could turn into a very expensive problem.

### Fervo now has $12B in orders for its geothermal power tech
Mon, 09 Nov 2026 20:55:34 +0000 — https://techcrunch.com/2026/11/09/fervo-now-has-12b-in-orders-for-its-geothermal-power-tech/

Geothermal company Fervo is targeting natural gas as it brings down geothermal drilling costs at its 8.4 GW resource in Utah.

### Jensen Huang pulls out of ElevenLabs Summit amid Nvidia controversy
Mon, 09 Nov 2026 20:09:06 +0000 — https://techcrunch.com/2026/11/09/jensen-huang-pulls-out-of-elevenlabs-summit-amid-nvidia-controversy/

The Nvidia CEO also pulled out of an Anthropic event earlier.

### YouTube streaming data returns to Billboard charts, ending major disagreement
Mon, 09 Nov 2026 19:39:41 +0000 — https://techcrunch.com/2026/11/09/youtube-streaming-data-returns-to-billboard-charts-ending-major-disagreement/

YouTube will resume sharing streaming data with Billboard in 2027 after changes to the chart formula give more weight to free, ad-supported music streams.

### Anthropic releases new Mythos and Fable models amid RSI concerns
Mon, 09 Nov 2026 19:24:51 +0000 — https://techcrunch.com/2026/11/09/anthropic-releases-new-mythos-and-fable-models-amid-rsi-concerns/

Anthropic says the new models "show improvements in areas like coding, reasoning, and vision," as well as in communicating more clearly with users.

### AI hardware startup Nominal triples valuation to $3B in 8 months
Mon, 09 Nov 2026 19:21:46 +0000 — https://techcrunch.com/2026/11/09/ai-hardware-startup-nominal-triples-valuation-to-3b-in-8-months/

Nominal, a startup that offers an AI platform for hardware engineering and claims Anduril as a major customer, has raised another big round of financing that triples its valuation.

### France blames Iran for mass-hacks targeting freezers in grocery stores and blood banks
Mon, 09 Nov 2026 19:19:24 +0000 — https://techcrunch.com/2026/11/09/france-blames-iran-for-mass-hacks-targeting-freezers-in-grocery-stores-and-blood-banks/

France's foreign minister blamed Iran for launching at least two waves of cyberattacks targeting industrial refrigerated and freezer units across France and wider Europe.

### Jensen Huang’s affair with alleged Chinese spy puts Nvidia’s China ambitions under scrutiny
Mon, 09 Nov 2026 18:09:52 +0000 — https://techcrunch.com/2026/11/09/jensen-huangs-affair-with-alleged-chinese-spy-puts-nvidias-china-ambitions-under-scrutiny/

Jensen Huang’s alleged affair with a suspected Chinese spy threatens to complicate Nvidia’s lobbying efforts to loosen U.S. chip export restrictions and maintain access to China’s lucrative AI market.

### Meta releases Muse Ember, a new lightweight model for agent execution
Mon, 09 Nov 2026 18:00:00 +0000 — https://techcrunch.com/2026/11/09/meta-releases-muse-ember-a-new-lightweight-model-for-agent-execution/

At 10 cents per million input tokens, Ember is significantly cheaper than frontier competitors like Haiku and Luna.

### Uber launches parking service following SpotHero acquisition, with an eye on robotaxis
Mon, 09 Nov 2026 17:00:00 +0000 — https://techcrunch.com/2026/11/09/uber-launches-parking-service-following-spothero-acquisition-with-an-eye-on-robotaxis/

Uber Parking is the latest example of the company offering products beyond its core ride-hailing service.

