# Tech — harvested 2026-10-27T20:58:10.770Z

## Ars Technica

### Code-execution flaw in UEFI firmware threatens most servers on planet Earth
Tue, 27 Oct 2026 20:25:55 +0000 — https://arstechnica.com/security/2026/10/code-execution-flaw-in-uefi-firmware-threatens-most-servers-on-planet-earth/

Defenders across the world face the burden of responding to yet another botched code-execution vulnerability, this time in boot-time firmware used by most of the world’s server vendors and data centers. The vulnerability, with a severity rating of 9.5 out of 10, resides in the TianoCore EDK II , an open source codebase that hardware makers and cloud providers use to create the UEFI firmware that runs during the boot-up sequence. Last year, a representative of the UEFI Forum called EDK2 the "preeminent solution / implementation of the UEFI specifications." Virtually all UEFI suppliers (sometimes still called IBVs or independent BIOS vendors), including AMI, Insyde, and Phoenix, use the reference code extensively. Project Mu, Microsoft's hardened EDK2 fork, used the code containing the vulnerable component as well. The vulnerability, tracked as CVE-2026-97631, is a memory-corruption flaw in an ICMP component that attackers can exploit to execute malicious code that runs before the operating system and firmware can implement defenses like Secure Boot , which establishes a chain of trust for all code, including the Trusted Platform Module (TPM), loaded during boot. While final payloads delivered by CVE-2026-97631 have no persistence—meaning they run only once—they can give attackers a wide opening to install other payloads that also run each time early in the boot process. Read full article Comments ]]>

### Google begins certifying Registered App Stores for Android, but not in the US
Tue, 27 Oct 2026 19:32:07 +0000 — https://arstechnica.com/gadgets/2026/10/googles-android-registered-app-stores-program-launches-dec-1-applications-now-open/

Running an app ecosystem has gotten a lot more complex for Google after its loss in the Epic Games antitrust case. While US users can access app stores in Google Play by court order, international users will use Google's voluntary Registered App Stores program . Google has announced that stores wishing to be part of that program are now free to apply, and support will roll out to some Android devices later this year. App stores accepted into the program will enjoy preferential treatment on the Android platform. Users of approved stores will be able to install apps with a single click, similar to the experience in the Play Store. These stores will also be allowed to update apps silently in the background like Google's store does. "In March, we announced the Registered App Stores program to give third-party app stores a more streamlined way to reach users while maintaining the safety and security of the Android ecosystem," said a Google spokesperson. "Eligible app stores outside the US can now apply to register their stores ahead of the new simplified installation experience rolling out to users later this year." Read full article Comments ]]>

### Vibe genes? Natural(ish) language comes to protein, genome design software
Tue, 27 Oct 2026 18:49:08 +0000 — https://arstechnica.com/science/2026/10/vibe-genes-naturalish-language-comes-to-protein-genome-design-software/

Protein design tools may be getting increasingly sophisticated , but you still need a sophisticated understanding of protein structure for them to work. This can include knowing enzyme mechanisms down to the positions of specific amino acids, as well as the water molecules that also occupy the area where catalysis takes place. Once you specify these, the tools can build the rest of a protein around this target. A large collaboration of researchers based in China, however, decided to bring protein design to the masses, making a tool that can take natural language prompts and use them to produce proteins with the function you specify. If your measure for success is a working protein, then the success rate may not be great. But they still manage to get the job done. And, in a separate announcement, Hugging Face shared that it's now hosting a tool that does similar things on the DNA level. The equivalent of vibe coding may have come to protein design—at least if you have access to a lab where you can sort the good designs from the dozens of failed ones. Read full article Comments ]]>

### Warner Bros. drops final trailer for Dune: Part Three
Tue, 27 Oct 2026 18:05:55 +0000 — https://arstechnica.com/culture/2026/10/warner-bros-drops-final-trailer-for-dune-part-three/

The end of the year is fast approaching and with it, the pre-Christmas release of Dune: Part Three , the final installment in Denis Villeneuve's acclaimed adaptation of sci-fi author Frank Herbert's novel(s). Warner Bros. gave us a broody and haunting extended teaser in March and a July trailer jam-packed with tantalizing hints of what to expect, along with plenty of Easter eggs to delight avid book fans. Now we've got one last action-packed trailer setting up the final act for iconic anti-hero Paul Atreides (Timothée Chalamet). (Spoilers for first two films in the franchise below.) Previously , 2021’s Dune culminated in the brutal defeat of House Atreides by rival House Harkonnen, with Paul and his mother, Lady Jessica (Rebecca Ferguson), fleeing to the desert and taking refuge among the Fremen. Among them is Chani (Zendaya), whom Paul has been seeing in visions all along. Read full article Comments ]]>

### Ford simplifies using your EV as a home battery with the $30K Fathom
Tue, 27 Oct 2026 16:17:58 +0000 — https://arstechnica.com/cars/2026/10/ford-builds-bidrectional-charging-into-its-30k-electric-truck/

This morning, Ford revealed that buyers of the forthcoming Fathom —the company's sub-$30,000 electric pickup truck due next year —will get more than just a truck. Until now, vehicle-to-home technology— like the setup Ford developed for the now-discontinued F-150 Lightning—takes DC power from the electric vehicle and runs it through an inverter built into the wallbox to turn it into AC the house can use. But with the Fathom, that inverter is built into the truck from the start. So every Fathom will be able to act as a backup battery for your home. It’s typical: You wait a decade for a cheap electric truck, and then two come along almost at once. And they’re two radically different products from two radically different automakers that I think will reveal a few preferences from the EV-buying public. One is the Blank Slate, from a brand new startup offering a bare-bones two-door that capitalizes on features the Internet says it wants, like no onboard modem, no touchscreens, and no infotainment system. The other is the result of one of Detroit’s big three taking a long, hard look at Chinese EVs and asking itself, “How do we make a car that cheap?” Although the Ford Fathom will cost $5,000 more than a Slate, that money does buy an extra pair of doors, modern conveniences like an infotainment system, CarPlay, electric windows, and a vast dealership network to service the car. That may be helpful given how many recalls Ford issues each year. Read full article Comments ]]>

### DeepMind unveils Genie 4 world model promising more realistic physics and humans
Tue, 27 Oct 2026 16:00:22 +0000 — https://arstechnica.com/google/2026/10/deepminds-genie-4-world-model-adds-audio-and-more-realistic-people-to-simulations/

Last year, Google DeepMind sent gaming stocks tumbling with the reveal of its Genie 3 world model . Since then, world models have become a major focus of AI labs around the world, but Google isn't resting on its laurels. Researchers have been hard at work on an updated model that improves on Genie 3 in almost every way. And if you pay Google enough money, you might actually get to use Genie 4 before too long. It's easy to look at the output of Genie 4 and see a video game, which is why Genie 3 caused so much consternation in the gaming industry. DeepMind doesn't think about it that way, though. According to Google , world models are a key element in the march toward artificial general intelligence (AGI). A world model creates a virtual world, but it doesn't require pre-rendering environments or programming interactive elements. You simply tell the model what you want, and it generates the experience frame by frame in real time as you explore it. DeepMind says this technology could create infinite training environments for physical robots or unlock new avenues of rapid prototyping for creative fields. Of course, that requires the model to accurately simulate what you want. Genie 4 has several improvements that make its simulations more useful, and that's thanks in part to Google's updated Gemini models. Read full article Comments ]]>

### From cheap tool to premium subscription: When a beloved app's price skyrockets
Tue, 27 Oct 2026 15:50:19 +0000 — https://arstechnica.com/gadgets/2026/10/from-cheap-tool-to-premium-subscription-when-a-beloved-apps-price-skyrockets/

How much are you willing to pay to keep using your favorite app? Maybe you’ve used it for years. Perhaps it performs a function so essential and specific that you couldn’t imagine what you’d do without it. But when the developer announces an extraordinary price hike, you’re forced to consider how much you really value that app. Earlier this year, Evernote, a note-taking app, changed its subscription tiers, forcing some users to go from paying $130 per year to $250. The highest tier now costs more than 3.3 times as much as the most advanced tier did in 2023 and 10 times more than what Evernote charged for annual subscriptions from its 2008 launch until 2016. Read full article Comments ]]>

### Apple iPhone Duo review: Two screens, two experiences, two thousand dollars
Tue, 27 Oct 2026 14:20:26 +0000 — https://arstechnica.com/gadgets/2026/10/apple-iphone-duo-review-two-screens-two-experiences-two-thousand-dollars/

I understand the appeal of foldable phones—they let manufacturers keep expanding screen sizes while still producing devices that can reasonably fit in a pocket. In practice, though, every foldable Android phone I've seen in public has had a ridiculously visible seam between the two halves of the screen, often with what looks like delamination from the underlying surface, giving the display an ugly, bubbly appearance. Back when Android phones began shipping with bigger and bigger screens and the iPhone was stuck at a miserly four inches, I was jealous. But I've never looked at anyone using a chunky, fragile-looking foldable phone in public and pined for Apple's take on the idea. Nevertheless, that take has arrived, in the form of the iPhone Duo . This $1,999-and-up foldable is the biggest change to the iPhone in years, with both hardware and software updates that dramatically change how you interact with the device. Read full article Comments ]]>

### Some iPhone Duo screens are already failing, Apple says only a "small number" are affected
Tue, 27 Oct 2026 14:00:49 +0000 — https://arstechnica.com/gadgets/2026/10/some-iphone-duo-screens-are-already-failing/

The iPhone Duo launched last week, offering anyone willing to spend $2,000 a chance to experience Apple's first foldable phone. For some early buyers, the morning after isn't going great. Despite the company's big talk about its "precision-engineered" hinge, some devices appear to have a hardware flaw that destroys the device's impressive internal display within hours (or minutes) of use. The Internet is currently overflowing with images of busted iPhone Duos, all sporting almost identical damage. The OLED is marred by several bright lines originating just below the midpoint of the display. These bands of damaged pixels extend all the way to the bottom and right edges. Some units also show lines of dead pixels following the crease from the top to the area where the bright lines begin. Anyone who has seen a damaged OLED panel will be familiar with this type of defect. When the layers of the display are damaged, the pixels no longer receive the correct voltage to illuminate them. Instead, they get the full driving voltage and are permanently on at maximum brightness. Some pixels can get no voltage, leaving them totally black. The only fix is to replace the OLED, but swapping the iPhone Duo's screen reportedly costs half as much as the device itself. Read full article Comments ]]>

### Sculpture re-creates odd optical effects of famed Lycurgus Cup
Tue, 27 Oct 2026 13:32:35 +0000 — https://arstechnica.com/science/2026/10/scientists-recreate-the-1600-year-old-recipe-of-lycurgus-cup/

Dating back to around 400 CE and made of dichroic glass, the Lycurgus Cup is notable for exhibiting different colors depending on the light. (It gets its name from the scene depicted on its surface, of King Lycurgus of Thrace.) Light it from the front, and the cup looks green; light it from behind, and the color changes to a deep red. University of Sheffield scientists have re-created the original recipe to produce a contemporary glass sculpture with the same optical effect. The cup is considered one of the seven glass wonders of the world, one of just 40 glass cage cups that survived. Exactly why the unusual color effects of the Lycurgus Cup occurred was a mystery until 2007 , when a team of scientists discovered the color shifts were due to the presence of nanoparticles in the glass—the result of Roman artisans adding finely ground gold and silver into the mix. Those nanoparticles change how the electrons in the cup vibrate in response to light so that the color one sees shifts with the observer’s vantage point. As we reported in 2019, it’s a similar phenomenon to the one responsible for the shifting colors of 19th-century daguerreotypes due to the scattering properties of nanoparticles. The Romans added salt when they melted the silicon (sand) to make the glass, and those salts contained gold atoms. In the melting process, those atoms aggregate and produce nanoparticles, which in turn produce the colors. It’s how any stained glass is made. It's also similar to how the prec

### US officials want Section 702 renewed before damaging court ruling goes public
Tue, 27 Oct 2026 13:22:16 +0000 — https://arstechnica.com/tech-policy/2026/10/us-officials-want-section-702-renewed-before-damaging-court-ruling-goes-public/

Two Democratic senators who have long overseen US intelligence say the Trump administration is illegally withholding a secret court’s findings from Congress until lawmakers renew a program that lets federal agents read Americans’ communications without a warrant. Seven months ago, the Foreign Intelligence Surveillance Court objected to search filters that let intelligence analysts pull Americans’ messages from intercepted data without the approvals, written justifications, or records the law requires. The court approved another year of surveillance anyway. The ruling has never been made public, and Senators Ron Wyden of Oregon and Adam Schiff of California say the administration’s own deadline for releasing it passed in September. The program, Section 702 of the Foreign Intelligence Surveillance Act (FISA), lapsed in June after Congress failed to renew it, though collection continues under the court’s March approval. The administration’s own public documentation says rulings like this one are reviewed for public release “within 180 days of issuance.” That window closed September 13, even as intelligence officials press lawmakers to reauthorize the program by the end of the year. Read full article Comments ]]>

### Microsoft offers to buy out a quarter of its workforce
Mon, 26 Oct 2026 22:36:06 +0000 — https://arstechnica.com/gadgets/2026/10/microsoft-offers-voluntary-buyouts-to-60000-employees/

On Monday, Microsoft said it is offering voluntary buyouts to eligible employees in select parts of the company. CNBC reports that the buyouts will be offered to roughly 60,000 employees , or about a quarter of its global workforce. The company describes the offer as an opportunity for employees who may have already been considering career moves outside Microsoft. While Microsoft did not give a direct reason for the buyout package, it comes as the company has spent the last several years managing costs amid investment in AI infrastructure and data-center buildout. Microsoft will extend the voluntary exit offer (VEO) to qualifying employees in the United States, India, Canada, and the United Kingdom. Microsoft employees at level 70 or below will be eligible for the buyout program. The company's employee rankings are internal, but according to the salary and career database Levels.fyi , levels 65–67 correspond to principal positions, and 68–70 are at the partner/distinguished level. According to Chief People Officer Amy Coleman, eligible organizations were selected "based on each business’s priorities, customer commitments and workforce needs." The effort is the second time Microsoft has run a voluntary workforce reduction in 2026. In April, the company offered its first voluntary retirement package to 8,750 US employees. In July, the Xbox division laid off 3,200 employees , or about 20 percent of its entire gaming division. As reported by CNBC , about 30 percent of eligible em

## The Verge

### Researchers are getting tired of OpenAI gatekeeping its breakthroughs
2026-10-27T16:48:58-04:00 — https://www.theverge.com/ai-artificial-intelligence/1019921/openai-breakthrough-math-computer-science-physics

On Monday, OpenAI announced impressive breakthroughs in mathematics, computer science, and physics, along with what the company says is an evolving approach to communicating its findings. But despite its apparent course correction, researchers who spoke to The Verge are growing increasingly tired of the company's antics. It has been a turbulent few months between OpenAI and mathematicians, who are still grappling with the hundreds of preprints unceremoniously dumped on them at the start of October. This time, OpenAI says it is working with expert "shepherds" to decide how best to share its latest breakthroughs. All three results conc … Read the full story at The Verge. ]]>

### Elon Musk says Ukraine s military violated Starlink s terms of service
2026-10-27T15:24:06-04:00 — https://www.theverge.com/science/1019879/elon-musk-starlink-ukraine-terms-of-service

Elon Musk claims Ukraine violated Starlink's terms of service before the recent slowdown, as reported earlier by Ars Technica . According to Musk, "Ukraine military violated Starlink terms of service and used it for offensive drone strikes to kill people. That loophole was closed last week," however Ukrainian officials have denied that happened, or that it is actually possible for them to do. The statement comes nearly two weeks after Ukrainian officials accused SpaceX of putting limits on the military's satellite internet service that disrupted its drone missions and operations. As reported by Axios , Ukraine uses Starlink for communications … Read the full story at The Verge. ]]>

### Trump is making it easier for fossil fuel companies to leak methane
2026-10-27T14:25:13-04:00 — https://www.theverge.com/policy/1019691/gas-leak-methane-rule-rollback-trump

In its latest gift to oil and gas companies, the Trump administration is expected to announce plans today to weaken rules that guard against methane leaks. Methane is a smog-forming pollutant and a powerful greenhouse gas that's up to 80 times as potent as carbon dioxide on a 20-year horizon. It's the primary component of what the fossil fuel industry calls "natural gas" that routinely leaks from oil and gas wells and pipelines. The Environmental Protection Agency (EPA) is reversing course on its previous efforts to plug those leaks. As part of President Donald Trump's deregulatory agenda, the EPA plans to undo Biden-era rules that were ex … Read the full story at The Verge. ]]>

### VisionQuest is what happens when AI really goes rogue
2026-10-27T13:30:00-04:00 — https://www.theverge.com/ai-artificial-intelligence/1017064/visionquest-marvel-rogue-ai

In Marvel's VisionQuest , a superpowered robot tries to better understand humanity by getting lost in elaborate, digital daydreams in which he and other artificial intelligence-powered beings live together in a home. The series is deeply fantastical, yet it plays with some of the ideas that have come to dominate the conversation about real-world generative artificial intelligence, exploring whether we should look at thinking machines as people and if AI truly poses the kind of existential danger that should keep us up at night. It's also a reminder how aggressively Silicon Valley has used the trappings of science fiction to sell us on its AI … Read the full story at The Verge. ]]>

### The Super Mouse puts a touchscreen macro pad under your hand
2026-10-27T13:00:00-04:00 — https://www.theverge.com/tech/1019484/super-mouse-touchscreen-shortcuts-macros-kickstarter

A company called Arctic Fox Technologies has announced a new multifunction mouse that forgoes a myriad of customizable shortcut buttons peppered across its surface for a compact touchscreen sitting beneath your hand. The Super Mouse may not prioritize ergonomics with its boxy design, but it can replace other peripherals on your desk, like a trackpad, macro pad, or streaming controller. If you're faster at typing on your phone, the Super Mouse could potentially even replace a full-size keyboard with a smartphone-sized alternative that even includes swipe typing. The Super Mouse is now available for preorder through a Kickstarter crowdfunding … Read the full story at The Verge. ]]>

### Anthropic’s elaborate plan to keep Wall Street at bay
2026-10-27T12:51:22-04:00 — https://www.theverge.com/ai-artificial-intelligence/1019470/anthropic-ipo-resist-investor-pressure-cut-corners-safety

Anthropic cofounder and CEO Dario Amodei. | Bloomberg via Getty Images Anthropic wants to have it both ways. With its impending IPO, it wants to tap the vast riches of the public markets and insists it doesn't want to compromise its core mission of developing AI safely and for the benefit of humanity. But greater model capabilities bring greater risks, and shareholders eager for returns may have little patience for costly safety measures that slow products on their way to market. Sam Altman, the CEO of Anthropic's archrival, OpenAI, has cited investor pressures as one reason the company is not pursuing an IPO this year. Anthropic hopes it can resist investor pressures with a mind-boggling governance structure. … Read the full story at The Verge. ]]>

### Meta’s $25 billion legal loss just put blood in the water
2026-10-27T12:44:40-04:00 — https://www.theverge.com/policy/1019604/new-mexico-meta-cambridge-analytica-kids-safety-settlement

When attorneys general from across the US announced a $17 billion settlement with Meta this summer, the sum was unprecedented. But a ruling last week by a New Mexico judge blew that number out of the water. The judge ordered Meta to pay $25 billion to resolve claims that Meta misled users around the 2018 Cambridge Analytica scandal and related incidents. Similar claims were resolved by the settlement with most other states. The outcome raised an obvious question: Should these states have asked for more? The answer depends on a mix of factors, including whether the $25 billion order stands up to Meta's legal challenges. Meta's chief legal of … Read the full story at The Verge. ]]>

### Firefox’s Smart Window adds AI form filling and webpage monitoring
2026-10-27T12:14:18-04:00 — https://www.theverge.com/ai-artificial-intelligence/1019551/firefox-smart-window-ai-fill-forms

Mozilla is updating Smart Window - Firefox's AI-powered browsing experience - with a new feature that can help you fill out online forms based on your open tabs. As an example, Mozilla says Smart Window can pull information from your online portfolio or LinkedIn page to paste your work history into a job application. You can try out this feature by clicking into a form with at least four text fields. From there, you'll see an option to "Fill from sources," which will show all of the tabs Firefox will draw from. You can then select or deselect tabs that you want Firefox to use, and the browser will generate suggestions based on the informati … Read the full story at The Verge. ]]>

### Major League Baseball is looking for a new kind of fan
2026-10-27T12:02:43-04:00 — https://www.theverge.com/report/1019478/major-league-baseball-fandom-social-media-world-series-influencers

Fans cheer during game two of the 2026 World Series between the Milwaukee Brewers and the Tampa Bay Rays | Getty Images On October 2nd, just as Major League Baseball's Division Series was kicking off, the main MLB Instagram and TikTok accounts posted a video hyping up the teams still in the running for the World Series. It featured clips of players from the Milwaukee Brewers, Los Angeles Dodgers, Chicago White Sox, and more sliding into home plate, hitting homers, and celebrating hits - standard fare for a highlight reel. What really makes the montage, though, is that it's set to an Olivia Rodrigo song. The song, "My Way," is an album track - not even a single - from Rodrigo's latest record. It's not exactly the soundtrack one might expect from an MLB-produc … Read the full story at The Verge. ]]>

### Google’s next Genie AI model generates more realistic experiences
2026-10-27T12:00:00-04:00 — https://www.theverge.com/tech/1019076/google-genie-4-ai-model

Google announced today its Genie 4 world model for generating interactive experiences using AI. The company says the model has four main updates: It allows for more realistic worlds, lets users update an experience in real time with a natural language prompt, can generate audio, and uses Gemini 3.8 Flash under the hood to help with its simulations. It also can create experiences that are about two minutes long, up from one minute for the previous Genie 3 model. Google is pitching Genie 4 as a tool that could be helpful for things like pre-visualization for filmmakers, prototyping game ideas, and making training scenarios for robots. But the … Read the full story at The Verge. ]]>

## Tom's Hardware

### Fields Medal-winning UC Berkeley professor ends graded homework due to AI cheating
Tue, 27 Oct 2026 20:09:05 +0000 — https://www.tomshardware.com/tech-industry/artificial-intelligence/fields-medal-winning-uc-berkeley-professor-ends-graded-homework-due-to-ai-cheating-says-in-person-exams-are-the-only-solution-left-to-widespread-ai-use

A University of California, Berkeley (UC Berkeley) professor has stopped giving his students graded homework, saying that rampant AI use has made it pointless. According to the New York Post , renowned mathematician Richard Borcherds said that it’s now nearly impossible to tell the difference between a student-written submission and one that’s been created using artificial intelligence. Because of this, he now primarily uses in-person exams with no electronic devices to grade his students and see how well they are doing in his class. “Online exams are now a waste of time as several students just use AI to answer the questions. I cannot tell which students are using AI, but I notice the average score increases a lot in online exams,” Borcherds told the publication. He also added, “Grading for correctness just adds a huge incentive for them to use AI for homework instead of doing it themselves and penalizes students for honesty. And paying to grade AI generated answers is a waste of time and money.” This problem appeared when OpenAI released the first popular LLM, GPT-3.5, in November 2022. But while LLMs were prone to mistakes back then, making their inordinate use easy to spot, the technology has improved to the point that it’s now very hard to tell if it's been used for written work. Various researchers have proven that students routinely get better scores when taking exams online. While they haven’t definitively proven that the students used AI to answer the questions, the 

### Military drone outfit Anduril partners with Qualcomm to build laptops on US soil with new BlueChip venture
Tue, 27 Oct 2026 17:42:49 +0000 — https://www.tomshardware.com/laptops/military-drone-outfit-anduril-partners-with-qualcomm-to-build-laptops-on-us-soil-with-new-bluechip-venture-defense-contractor-targets-a-100-percent-domestic-supply-chain-in-the-future

Defense contractor Anduril, which is known for its military drones, just announced that it’s building laptops in the U.S., with the company saying that it will begin taking orders in 2027. According to its press release , it will call its laptop product line BlueChip and will use a Snapdragon X Series SoC for its core computing capabilities. It also said that it already has functional prototypes, with 90% of the procurement cost of the components used to build it coming from suppliers in the U.S. and other allied countries. However, it’s also aiming for a fully domestic supply chain in the long term. This means that Anduril is not only sourcing domestically produced semiconductors but also uses other made-in-the-U.S. parts, like batteries, the external casing, and even the glass for its screen. “Other companies might design their computers in the U.S., Anduril makes them here,” the Anduril founder Palmer Luckey said in the Anduril YouTube video. “We’re making parts out of metals that the U.S. knows how to extract, knows how to refine, knows how to process, and knows how to mill at scale at a reasonable price; and that goes for the entire laptop. The same thing goes for the battery technology.” Luckey has been planning to launch a fully U.S.-made laptop since last year but said that it’s going to cost 20% more than a comparable device. Still, it seems that the company is targeting critical industries — government, defense, first responders, and public safety — which might be w

### Israeli ad tech firm tied to suspected Starlink tracking effort, report claims
Tue, 27 Oct 2026 17:37:00 +0000 — https://www.tomshardware.com/tech-industry/cyber-security/israeli-ad-tech-firm-tied-to-suspected-starlink-tracking-effort-report-claims-researchers-say-it-outbid-everyone-for-starlink-linked-ads-in-100-countries-including-where-the-service-is-banned

Discover-Tech, an Israeli advertising technology company, has reportedly been linked to a suspected surveillance effort aimed at Starlink users, according to Reuters . The report, which cites six people familiar with the matter, claims the firm was the top bidder for ad space tied to Starlink traffic in more than 100 countries. Researchers suspect the aggressive bidding was meant to reveal where users are located or to enable further monitoring — though the findings do not show that anyone was actually tracked. The data comes from TrendAI, the research arm of Trend Micro. Its October 15 report referred to the activity as ‘Shadow-Earth-79’ without naming a company, but the report claims the codename belongs to Discover-Tech. TrendAI says its attribution process is designed to avoid ‘hype-driven labels’ that could mislead security teams. “Our approach reduces the risk of misattribution, hype-driven labels, and unstable actor names that can mislead defenders, distort risk prioritization, and trigger inappropriate response actions.” The report says. The method exploits how online ads are sold with advertisers bidding in real-time auctions for space on websites and in apps, and each bid request can carry details about the person on the other end. Collected over time and combined with other data, that information could be used to identify people, follow their activity across the web, or select targets for spyware. The geography is what raised eyebrows. Shadow-Earth-79 was reportedl

### TSMC reportedly weighs 20% CoWoS price increase as Nvidia Blackwell and Rubin chips put pressure on packaging capacity
Tue, 27 Oct 2026 14:30:00 +0000 — https://www.tomshardware.com/tech-industry/semiconductors/tsmc-reportedly-weighs-20-percent-cowos-price-increase-as-nvidia-blackwell-and-rubin-chips-put-pressure-on-packaging-capacity-equipment-lead-times-stretch-to-eight-months

TSMC is weighing raising prices for its Chip on Wafer on Substrate (CoWoS) advanced packaging technology by as much as 20%, reports Trendforce , citing supply chain sources and local media. The increase reflects strained capacity amid AI demand and longer delivery times for chipmaking tools. Such a hike would be significant, as CoWoS is already one of the tightest links in the AI supply chain. TSMC has yet to confirm the report. Go deeper with TH Premium: Chipmaking (Image credit: tsmc) Analyzing TSMC's fab expansion roadmap — multi-fab N2 ramp, CoWoS, SoIC, and uncorking bottlenecks Leading-edge foundry roadmaps for TSMC, Intel, and Samsung ASML's roadmap for chipmaking lithography tools examined Chinese chipmaking tool roadmaps examined CoWoS combines logic dies and high-bandwidth memory (HBM) stacks within a single package, which is how AI accelerators get the data bandwidth that demanding workloads require. Building these packages is only getting harder as chip designers cram in more compute and memory. Nvidia’s Blackwell already pairs two large GPU dies with eight HBM3E stacks, whereas the upcoming Rubin and Rubin Ultra are expected to push integration further, which will increase pressure on packaging and the supply chain that supports it. Testing is turning into another bottleneck. Blackwell reportedly takes three to four times longer to test than Nvidia’s previous-generation Hopper, and Rubin could need as much as seven times longer. Extended test cycles keep equipmen

### Samsung Portable SSD P9 review: speedy USB4 in a slim, pricey package
Tue, 27 Oct 2026 14:00:00 +0000 — https://www.tomshardware.com/pc-components/external-ssds/samsung-portable-ssd-p9-review

It’s a tough time to launch an external SSD, with demand for flash and RAM at all-time highs thanks to AI hyperscaler demand. But content creators, videographers, and media collectors need more, faster, and roomier options, so Samsung has launched its first USB4 external drive, the Portable SSD P9. It’s offered in 1, 2, 4, and 8TB capacities (but currently only in stock at 2TB as of this writing), with rated sequential read speeds up to 4,000 MB/s and write speeds up to 3,800 MB/s, a slim (0.3-inch) but simple boxy solid shell. It also includes one of the nicest-feeling sleeved cables I’ve come across (that’s also long for an external drive, at 16 inches). The Samsung P9 is a premium, pocket-friendly portable drive that’s speedy enough to potentially knock Corsair’s EX400U out of its top USB4 drive spot on our list of the best external SSDs . It’s also quite expensive, starting at $339 for the 1TB model, $649 for the 2TB version we tested, and commanding a whopping $2,879 for the 8TB model. Those prices might seem extreme, given Corsair’s competing USB4 drive launched at $119 for 1TB in early 2025. But as we’ll see below in our comparison section, Samsung’s pricing isn’t exactly exorbitant compared to the current price of USB4-based competition – and many alternatives that launched last year are tough to find in stock. Samsung P9 Specifications Product 1TB 2TB 4TB 8TB Pricing $339.99 $649.99 $1,439.99 $2,879.99 Interface / Protocol USB4 Gen 3x2 (40Gbps) USB4 Gen 3x2 (40Gbps) 

### Police are reportedly pulling motorists over because AI algorithms deem their driving patterns 'suspicious'
Tue, 27 Oct 2026 13:53:32 +0000 — https://www.tomshardware.com/tech-industry/artificial-intelligence/police-reportedly-pulling-motorists-over-because-ai-algorithms-deem-their-driving-patterns-suspicious-rights-group-report-warns-ai-surveillance-systems-will-sweep-in-more-innocent-people-than-wrongdoers

Police are increasingly using AI-derived pretext to justify pulling drivers over, claims a report by the American Civil Liberties Union (ACLU) on October 26. According to Jay Stanley, a senior policy analyst with the ACLU Speech, Privacy, and Technology Project, police are using AI algorithms and automated license plate reader (ALPR) surveillance data to flag motorists whose travel histories appear “suspicious,” even without evidence of wrongdoing. Go deeper with TH Premium: AI and data centers (Image credit: Microsoft) The data center cooling state of play The custom AI ASIC state of play America’s AI chip rules keep changing — and the rest of the world is paying the price GTC 2026: Ian Buck press Q&A transcript — VP of Hyperscale and HPC speaks out on shelving CPX and shipping LPU decode this year Demand for data center CPUs has surged, and AI agents are responsible Condemning the approach and the use of mass surveillance in general, Stanley expressed concerns that this approach to law enforcement would lead to an uptick in the controversial “pretextual stops” and that “More and more people will be subject to police encounters as these AI algorithms inevitably sweep in far more innocent people than actual wrongdoers.” The report details several incidents, including one in which a woman claims an officer stopped her during a cross-country road trip because a surveillance system he was using had flagged her movements as suspicious. The system has accessed ALPR data on where s

### Walmart slashes $750 off this MSI RTX 5060 gaming laptop
Tue, 27 Oct 2026 13:47:15 +0000 — https://www.tomshardware.com/laptops/gaming-laptops/walmart-slashes-usd750-off-this-msi-gaming-laptop-16-inch-crosshair-sports-an-rtx-5060-gpu-and-a-fast-240hz-qhd-display

Spotted at Walmart today, at a pretty good price, is this RTX 5060-powered MSI Crosshair gaming laptop for just $1,249 . With price rises across the board on laptops and PCs, it's important to keep an eye out for large discounts on gaming gear. The MSI Crosshair has been discounted by a hefty $750 from its original $1999 list price. This is classed as a budget-oriented gaming laptop due to the specifications, even if the price of the laptop is still over a thousand dollars. ● Grab this Gaming Laptop deal at Walmart With a fairly large 16-inch screen, the Crosshair pairs its IPS panel with a very crisp resolution of 2560 x 1600 pixels (QHD) and superb color resolution with a 100% DCI-P3 gamut. A thin bezel around the screen gives you more viewing area. Inside the chassis of this gaming laptop is Intel's Core i7-14650HX processor with 16 cores. It's perfect for gaming and for work or study applications. The graphics are powered by a dedicated Nvidia RTX 5060 graphics chip with 8GB of VRAM, and for memory and storage, there is 16GB of DDR5 RAM and a 512GB NVMe SSD. Crosshair 16: was $1999 now $1249 The MSI Crosshair sports a 16-inch IPS display with a sharp QHD resolution that's powered by an Nvidia RTX 5060 graphics card with 8GB of fast VRAM. Other specs include a 16-core Intel Core i7-14650HX processor, 16GB of memory, and a 512GB SSD. Windows 11 operating system comes installed. View Deal Although for the best gaming performance, the laptop will run best on mains power, shou

### Keybytes ‘truly modular keyboard’ starts with one key and is assembled like Legos
Tue, 27 Oct 2026 13:34:43 +0000 — https://www.tomshardware.com/peripherals/mechanical-keyboards/keybytes-truly-modular-keyboard-starts-with-one-key-and-is-assembled-like-legos-each-magnetic-key-module-has-its-own-risc-v-microcontroller-for-the-ultimate-in-customizability

Developer notaroomba (AKA Nathan Alspaugh) has published details of his Keybytes project on GitHub . In essence, this is a modular project where a Keyword hub is magnetically connected to Keybit keys, and each key has its own microcontroller. Hence the number of keys and their layout are entirely up to the user, with a modular design akin to building Lego. We’ve seen oodles of imaginative and truly excellent mechanical keyboards over recent years, but Keybytes probably offers the greatest flexibility with regard to layout and key selection we’ve ever seen. notaroomba on GitHub notaroomba on GitHub It starts with a Keyword, which is the main board that the Keybits connect to. This central component houses a stacked pair of PCBs. The top board packs an Arm Cortex M4-powered microcontroller , Bluetooth antenna, and flash memory. The lower board offers USB-C , charging, and a buck-boost converter. Adding keys seems like a cinch. Every Keybit, one of the modular keys, contains a CH32V003 RISC-V microcontroller. Moreover, it features pogo pins on all 4 sides of every key for power and I2C. The case is magnetic so you can connect it to any aspect of the Keyword and other Keybits. Atop the Keybit, a Cherry MX switch is installed. We guess you can follow the GitHub MIT-licensed plans for this project and use your preferred variety of mechanical switches. On the GitHub project page, there are no more than two Keybits together with a Keyword, so you don’t get to see what crazy layout pl

### Apple adds M6 to 14-inch MacBook Pro and iMac
Tue, 27 Oct 2026 13:28:23 +0000 — https://www.tomshardware.com/laptops/macbooks/apple-adds-m6-to-14-inch-macbook-pro-and-imac-starts-at-usd1-999

Apple is updating two more computers to its M6 system-on-chip. The base 14-inch MacBook Pro and the iMac lineup are getting the company's latest processor ahead of tomorrow's "Pro and Tell" event in Los Angeles. These devices are retaining the same designs that they've had for years. The computers will be available for pre-order on Wednesday at 10:10 a.m. PT (1:10 p.m. ET) and will ship on Nov. 6. The M6 in the MacBook Pro will be configured with 12 CPU cores and 12 GPU cores, alongside dual neural engines for certain on-device AI workloads. On the iMac, there will also be a cut-down option with a 10-core CPU and 10-core GPU. (Image credit: Apple) The MacBook Pro will be configurable with up to 32GB of RAM and is being updated with Wi-Fi 7 and Bluetooth 6 using Apple's N1 networking chip. The iMac is also getting those networking benefits, as well as a 2.5 Gigabit Ethernet port. Like previous iMacs, the number of ports you get is tied to the chip, with two Thunderbolt 4 ports with the base chip or four with the option with more cores. It's no surprise that Apple is pushing both of these as AI-forward machines, both with the new chips and the recently released Siri AI and Apple Intelligence features in macOS 27 Golden Gate. The 14-inch MacBook Pro with M6 will start at $1,999 ($1,899 with education discount), while the iMac will begin at $1,499 ($1,449 with education discount) for the 10-core CPU/GPU configuration and $1,699 ($1,599 with education discount) for the full chip. 

### Hacker awarded $50k bounty for reporting bug to Sony that allowed PS5 Linux exploit
Tue, 27 Oct 2026 13:22:04 +0000 — https://www.tomshardware.com/video-games/playstation/hacker-awarded-usd50k-bounty-for-reporting-bug-to-sony-that-allowed-ps5-linux-exploit-move-sparks-backlash-from-jailbreaking-community

A hacker used an AI LLM to find a hypervisor bug that allowed security researchers to load Linux on PlayStation 5 consoles , subsequently reported it to Sony, and received a $50,000 bug bounty. IGN reports that the person who discovered the flaw, who goes by Jordy on X, shared the award on the social media platform, drawing significant ire. The biggest driver of the criticism, though, is that Jordy agreed to delay the report until after the launch of GTA VI, but moved forward anyway after someone else discovered the flaw, meaning it would be patched prior to the launch of the game, and possibly denying someone else the payday. I can at least buy GTA 6 with this I think https://t.co/1iLwrZTbdy October 14, 2026 “I can at least buy GTA 6 with this, I think,” Jordy said on their X account . One user called Gille replied to their post, saying, “50k in bank but 0 friends left. Worth it?” Another one named Darth Riker commented, “You did not ‘find this bug yourself’. The flow0 (Andy Nguyen) did that. You, however, didn’t. You’re just a lazy s****** who’s no different to those scammers out there,” while Matthew Cramer added, “The worst thing is not the money grab, it’s the fact that the whole point of exploiting PS5 is freedom, ownership, and control. Sony goes against everything we stand for! If Jordy was in need of money, there are hundreds of bug bounty programs with high paydays… or a better job!” The ps5-linux-loader GitHub project requires a PS5 Phat, Slim, or Pro running firmw

### Roblox accused of downloading 145GB of 3D assets, including adult content, for AI training purposes during scraping spree
Tue, 27 Oct 2026 12:26:13 +0000 — https://www.tomshardware.com/tech-industry/artificial-intelligence/open3dlab-accuses-roblox-of-downloading-145gb-of-3d-assets-for-ai-training-purposes-automated-crawler-ignored-site-rules-to-grab-over-1-000-files-including-adult-content-during-scraping-spree

Independent 3D modeling community Open3DLab has publicly warned that a web crawler, linked to the gaming platform Roblox, mapped "almost every project" on its website, along with sister sites SFMLab and SmutBase, downloading 145.5GB of data in the process. In a blog post , Open3DLab reports that "complete copies" of 1,027 files from 712 projects were sourced in the process, which it believes were taken for "AI training purposes." Go deeper with TH Premium: AI and data centers (Image credit: Microsoft) The data center cooling state of play The custom AI ASIC state of play America’s AI chip rules keep changing — and the rest of the world is paying the price GTC 2026: Ian Buck press Q&A transcript — VP of Hyperscale and HPC speaks out on shelving CPX and shipping LPU decode this year Demand for data center CPUs has surged, and AI agents are responsible The blog post goes into the specifics of the incident, along with some changes that Open3DLab has made since to try and avoid a repeat. According to the post, Open3DLab's staff noticed a crawler "making a large number of requests to our sites and download infrastructure" on October 18. The crawler used trellis2-data-sourcing/1.0 (3D foundation model research; [redacted]@roblox.com) as its user agent, with the data coming from a single Amazon AWS address. The crawler didn't respect the site's robots.txt file or Terms of Service, which explicitly forbid scraping. It also, according to the report, ignored creator licenses for the pro

### Intel's APX offers 'better performance' in Windows 11 according to new Insider setting
Tue, 27 Oct 2026 11:30:00 +0000 — https://www.tomshardware.com/software/windows/intels-apx-offers-better-performance-in-windows-11-according-to-new-insider-setting-microsoft-begins-early-enablement-for-advanced-performance-extensions-on-nova-lake-cpus

A new "Advanced Performance Extensions (APX)" option has been spotted in a version of Windows 11 made available to Windows Insiders on October 23, with the feature set to enable a boost in application performance on compatible chips. At the moment, those chips don't exist. But when they do, this feature is the one that you'll want to flick on if you're using one of them. The new toggle was reported by Neowin after it was first spotted by a poster on the X social network. The feature debuted in build 29295 as an Experimental build, so it's unlikely that it will make its way to the version of publicly available Windows 11 anytime soon. Intel announced APX back in 2023, confirming that it features 16 additional general-purpose registers and three-operand instruction formats with a new data destination register for many integer instructions. Doubling the number of general-purpose registers from 16 to 32 will allow code compiled with APX to run with 10% fewer loads and 20% fewer stores than Intel 64's baseline, says Intel. APX has been available in the GCC compiler since version 14, with subsequent versions up to GCC 17, which is targeting a 2027 code freeze, adding additional support. LLVM and MSVC have preliminary support, as well. Although enablement has been going steady for the past two years, developers will still need to recompile their applications with the proper flags for APX-capable CPUs to leverage those instructions. Here is how the new "Advanced Performance Extension

## Phoronix

### Raspberry Pi Zero 3 W & Raspberry Pi 4 Model A Surface In Linux Kernel Patches
Tue, 27 Oct 2026 15:53:34 -0400 — https://www.phoronix.com/news/Raspberry-Pi-Zero-3-W-Pi-4-A

It looks like a next-generation Raspberry Pi Zero is about to surface, the long-awaited Raspberry Pi Zero 3 W. And in an interesting twist in these times amid high PC component costs and supply chain constraints, a Raspberry Pi 4 Model A...

### KDE Fixes 15 Year Old Bug Over Inaccurate Notifications When Copying Files To USB Drives
Tue, 27 Oct 2026 12:50:22 -0400 — https://www.phoronix.com/news/KDE-Fixes-15-Year-Old-Bugs

A long-standing KDE bug is set to be resolved with next month's KDE Frameworks 6.32 release...

### Pavee OS: Ikey Doherty s New Daily-Driver Desktop Distro Being Built Atop Barney
Tue, 27 Oct 2026 09:11:30 -0400 — https://www.phoronix.com/news/Pavee-OS

Back in September Ikey Doherty of Solus Linux and Serpent OS notoriety as well as being a former Intel Clear Linux developer announced Barney as his planned showcase for how to "properly" build a modern Linux distribution in 2026+. Today he's provided an update on this Barney distro tooling effort as well as announcing Pavee OS as his planned daily-driver desktop distribution built atop it...

### KDE Plasma 6.8.2 Released With Dozens Of Additional Bug Fixes
Tue, 27 Oct 2026 09:02:10 -0400 — https://www.phoronix.com/news/KDE-Plasma-6.8.2

Debuting two weeks ago on the 30th anniversary of the KDE project was the Plasma 6.8 desktop with many exciting improvements. Last week it was succeeded by Plasma 6.8.1 with dozens of bug fixes and this week now brings Plasma 6.8.2 with yet more bug fixing...

### AMD EPYC Zen 6 PML Support, ARM64 On s390 Merged For Linux 7.4 KVM
Tue, 27 Oct 2026 08:00:00 -0400 — https://www.phoronix.com/news/Linux-7.4-KVM

The many Kernel-based Virtual Machine (KVM) improvements have been merged for Linux 7.4 to deliver a number of new features for different server processors...

### Accelerating HTTP Web Servers With In-Kernel eBPF Deliver Up To 4.5x Throughput
Tue, 27 Oct 2026 06:26:22 -0400 — https://www.phoronix.com/news/Beeper-In-Kernel-Parsing-eBPF

An interesting new open-source project born out of university research is Beeper to provide application-layer parsing within the in-kernel eBPF. With an HTTP parser implemented by Beeper in eBPF and providing an in-kernel HTTP cache, the throughput for web servers could be improved by 3x at high rates...

### Linux s Modern NTFS Driver Now Supports Alternate Data Streams (ADS)
Tue, 27 Oct 2026 06:11:29 -0400 — https://www.phoronix.com/news/NTFS-Linux-7.4-Improvements

Merged back in Linux 7.1 was the new NTFS kernel driver implementation for better supporting Microsoft's NTFS file-system on Linux. Since then new features and improvements have continued to land for this NTFS driver with some more notable additions also coming in Linux 7.4...

### Linux 7.4 Expands Sensor Monitoring For More ASUS & MSI Motherboards, New Minisforum Driver
Tue, 27 Oct 2026 05:52:30 -0400 — https://www.phoronix.com/news/Linux-7.4-HWMON

With the Linux 7.4 kernel there are more MSI and ASUS motherboards with sensor monitoring support along with a variety of other additions to help broaden the selection of supported systems for hardware sensor monitoring under Linux. It's another busy cycle for the HWMON subsystem...

### Firefox 159 Released With AMD Linux Graphics Fix For Excessive Memory Use
Tue, 27 Oct 2026 05:35:49 -0400 — https://www.phoronix.com/news/Firefox-159-Released

Firefox 159 is out today as the latest bi-weekly feature release for Mozilla's web browser...

### Initial Support For The Apple M4 & Apple A18 Pro Make It Into Linux 7.4
Mon, 26 Oct 2026 20:52:15 -0400 — https://www.phoronix.com/news/Linux-7.4-SoCs

The many SoC patches have landed within the Linux 7.4 kernel providing support for dozens of new boards as well as a number of new SoCs like the Apple M4 and the A18 Pro as found in the MacBook Neo. The Google Tensor 5 was also finally mainlined along with Pixel 10 devices. Plus some unreleased Qualcomm SoC support rounds out the bunch...

### Steam Frame VR Headset Sees Mainline Support With Linux 7.4
Mon, 26 Oct 2026 20:36:40 -0400 — https://www.phoronix.com/news/Steam-Frame-FR-Linux-7.4

The mainline Linux 7.4 kernel will be capable of running on the Steam Frame VR headset...

### Linux 7.4 Preps CXL For Very Neat Dynamic Capacity Devices "DCD"
Mon, 26 Oct 2026 17:05:32 -0400 — https://www.phoronix.com/news/Linux-7.4-CXL

The Compute Express Link (CXL) subsystem changes were merged today for the Linux 7.4 kernel. The fun work this cycle is preparing to support Dynamic Capacity Devices...

## The Register

### EU privacy advocates accuse US data annotation firm of snooping on contractors
Tue, 27 Oct 2026 17:29:00 +0000 — https://www.theregister.com/legal/2026/10/27/eu-privacy-advocates-accuse-us-data-annotation-firm-of-snooping-on-contractors/5305757

US data annotation operation Scale AI faces five GDPR complaints in four EU countries over allegations that it unlawfully monitors European contractors. Privacy campaigner noyb alleges that Scale tracks contractors who perform data annotation work on its Outlier AI platform. Like workers on Amazon's Mechanical Turk platform of yore, Outlier contractors label data, evaluate AI-generated responses, and perform other tasks to improve AI models. Scale counts companies including OpenAI, xAI, Anthropic, and Google, as well as the US government , among its customers. Scale AI faces allegations similar to those noyb has made against other US tech firms since the EU’s General Data Protection Regulation (GDPR) went into effect in 2018, namely violations of said regulation. With all that work being done digitally and remotely, Scale has extensive data collection practices to not only verify the identity of Outlier workers, but also to extensively track their activity. “Platform work seems to be fertile ground for a whole new type of workplace surveillance,” said Thomas Le Bonniec, sociology researcher at French privacy research group DIPLab, who co-authored a report earlier this month examining Outlier's data collection practices. “This would be seen as unacceptable in any other form of employment in the European Union.” Among the issues that raised the hackles of noyb's lawyers was identity verification conducted by Persona, a company that has faced scrutiny over an exposed test enviro

### ZacOS 9 and Mavernix: Two classic Apple desktops find their Wayland to Linux
Tue, 27 Oct 2026 17:00:00 +0000 — https://www.theregister.com/os-platforms/2026/10/27/zacos-9-and-mavernix-two-classic-apple-desktops-find-their-wayland-to-linux/5305710

You wait decades for a Mac-like desktop for Linux, and then two of them come along at once. AI might be involved, but even so, it's still shiny. ZacOS 9 and Mavernix are two very new, independent, and separate projects, but there is a common thread linking them: they are both brand new efforts to bring vintage Macintosh-like desktop environments to Linux. One is explicitly built using LLMs, and we suspect it was probably involved with the other as well. "ZacOS" is just a couple of weeks old, and both to forestall what is becoming a very frequently asked question, and also to credit to its inventor Adam Lawson , the project's GitHub page acknowledges two of the more visible LLM coding assistances: both Claude and Copilot are there. In the Hacker News discussion , he acknowledged that he used LLM assistance to make the software, and even his online comments. It aims to recreate the “Platinum” appearance of MacOS 8 and 9 – as we described last month , one of the few things that Apple successfully salvaged from the Copland project to build a true multitasking successor to MacOS 7. ZacOS includes a window manager, a filer, a global menu bar, a Control Panel app, a Control Strip, desk accessories and other additional apps , and more. It can network with Macs, and integrate with the existing SheepShaver emulator to run classic Mac apps. We previously mentioned SheepShaver when looking at the remarkable MacOS9.app web-based emulator, and if you don’t remember what it looked like, tha

### Day 2 of canceled classes at University of New Mexico after Health Sciences Center cyberattack
Tue, 27 Oct 2026 16:15:00 +0000 — https://www.theregister.com/cyber-crime/2026/10/27/day-2-of-canceled-classes-at-university-of-new-mexico-after-health-sciences-center-cyberattack/5305690

The University of New Mexico is canceling classes across the medicine, nursing, and pharmacy faculties for a second day amid continued efforts to recover from a "cybersecurity event." The attack targeted the Health Sciences Center on Monday, the Uni revealed, forcing it to shut down systems, cancel appointments and clinics at UNM Health hospitals, and divert ambulances to healthcare facilities in nearby Albuquerque and Santa Fe. Hospital appointments and clinics return to normal today, although nonessential UNM Health Sciences Center staff are being asked to remain at home. "The University of New Mexico Health Sciences Center (HSC), which includes the UNM Health clinical delivery system, experienced a cybersecurity event Monday, Oct. 26, 2026," the university said in a statement on Monday evening. "HSC information technology security teams immediately took steps to contain the event and protect the network. They also notified state and federal law enforcement and engaged external partners to assist with the investigation. "Leadership activated an Emergency Operations Center to coordinate the response and provide guidance to HSC employees, students, and UNM Health system frontline providers." The university announced the attack at 1430 local time, immediately cancelling all remaining clinics and classes, dismissing everyone other than critical and clinical staff, and urging patients not to attend HSC facilities. It has not commented on the nature of the cyberattack, although t

### Take it on the chin SatNad: Microsoft chief exec's pay slips 6% in record year
Tue, 27 Oct 2026 15:51:00 +0000 — https://www.theregister.com/saas/2026/10/27/take-it-on-the-chin-satnad-microsoft-chief-execs-pay-slips-6-in-record-year/5305737

Sometimes you’ve just got to roll with the punches. Microsoft chairman and CEO Satya Nadella was knocked down recently: his total compensation for the corporation’s fiscal 2026 is 6 percent lighter than it was in the prior year. The leader of the software and cloud biz pocketed $90.6 million, including a $2.5 million base salary, $77.6 million in stock awards, $10.3 million non-equity incentive plan compensation and $259,203 in all other compensation (chiefly security for personal travel, charitable gifts and pension contributions). As Reg readers are no doubt be aware, stock vests at a different rate annually and in the latest full-year Nadella was awarded a lower figure, despite breezing through all of his financial and operational targets. Revenue for Microsoft's fiscal 2026 ended June 30 was up 18 percent to $331.8 billion and operating profit was 18 percent higher - at $ 155.237 billion - than SatNad's $130.96 billion target. Together, these areas accounted for 70 percent of the bossman’s remuneration goals. Operational assessment including security, strategic transformation and culture made up the rest. The executive pay scale was outlined in the Notice of Annual Shareholder Meeting and Proxy Statement 2026 . Other highlights in that financial year included a 27 percent bounce in revenue generated by the Cloud division to $214.4 billion. Microsoft added 88 datacenters to its portfolio, and had 30 million paid Copilot seats. "The scale of adoption reflects growing custom

### CISA confirms PHP2Shell under attack as researchers clock successful exploits
Tue, 27 Oct 2026 14:45:00 +0000 — https://www.theregister.com/cyber-crime/2026/10/27/cisa-confirms-php2shell-under-attack-as-researchers-clock-successful-exploits/5305681

The US government's cybersecurity watchdog has confirmed attackers are exploiting both critical PHP2Shell vulnerabilities, giving federal agencies three days to patch the bugs that have wreaked havoc across the web over the past week. CISA added CVE-2026-109618 and CVE-2026-109619 to i ts Known Exploited Vulnerabilities (KEV) catalog on Monday , setting an October 29 deadline for federal civilian agencies to address the flaws. The move marks a shift from last week, when the agency warned of the danger posed by PHP2Shell but said it had not yet observed successful exploitation in the wild. Both bugs are rated 9.2 on the CVSS scale and can be exploited without authentication to run code on vulnerable PHP servers. That's bad news given how much of the web still relies on PHP, and just how many sites could be left exposed. Patches landed on October 21, but attackers had already beaten the maintainers to it. AWS spotted attempts to exploit the flaws as early as October 17 , four days before the bugs were publicly disclosed. CISA's confirmation comes amid growing evidence that attackers are doing more than simply knocking on the door. On October 24, Perplexity security researcher Adel Karimi recorded 35 successful shell executions across three honeypots running PHP 8.4.26 under Apache mod_php. The attacks came from two IP addresses and used memory exhaustion and disclosure to achieve remote code execution. The attackers then tried to contact external servers using PHP, curl, and wg

### A whopping 3% of boardroom execs spy productivity and costs savings from AI
Tue, 27 Oct 2026 14:00:00 +0000 — https://www.theregister.com/ai-and-ml/2026/10/27/a-whopping-3-of-boardroom-execs-spy-productivity-and-costs-savings-from-ai/5305675

Three-quarters of corporate board members expect AI to deliver productivity gains and cut costs, yet only three percent of organizations have hit their targets, according to researchers at Gartner. The figures came out of the analyst’s HR Symposium, where it also reported that 38 percent of companies are over budget on AI spending, and 85 percent still plan to spend even more next year. "Ultimately, organizations will not generate cost savings from AI at this point," said CV Viverito, senior director analyst for Gartner's HR practice. "The greater opportunity is to use AI to do things that weren't possible before, such as shifting employee time into new capabilities, outcomes, and sources of growth." Gartner claims that at least 75 percent of biz leaders are out of step with the broader organization on where AI creates value, which stalls transformation efforts and muddies how to position the workforce and bag those returns. Organizations should concentrate AI on the work that matters most to the business, with HR helping execs to agree on the top bets based on strategy, Gartner advises. Companies should also spread existing AI expertise across the business rather than wait to hire scarce specialists, and give managers room to redesign the work around the technology, it adds. Only about one in five employees' time is freed-up by AI, letting them redirect toward more innovative work, the HR Symposium heard. “There isn’t a struggle to create capacity, that’s happening already a

### Apple's foldable phone has a crease in its reputation
Tue, 27 Oct 2026 13:15:00 +0000 — https://www.theregister.com/personal-tech/2026/10/27/apples-foldable-phone-has-a-crease-in-its-reputation/5305669

Apple has confirmed problems with the folding screen on its flagship iPhone Duo after reports of misbehaving displays spread among its customer base. A company spokesperson told The Register , "We are aware of an issue impacting the inner display on a small number of iPhone Duo units." "If users experience issues with their iPhone Duo display, they should contact AppleCare for a replacement." That's the least the company can do. A borked screen on a brand-new device is something any customer would expect the warranty to cover. The iPhone Duo went on sale last week and sold out almost immediately as loyalists rushed to hand over cash for Apple's foldable device. UK shoppers can expect to pay from £1,999 to £3,199 for the Duo, depending on configuration. Complaints soon surfaced on social media, with a small number of customers reporting horizontal lines on their screens, and a crunching noise from the hinge. Some reports were undoubtedly the work of AI images, though iFixit speculated in a weekend teardown that dust ingress could be interfering with the complex hinge mechanism and stressing the screen. Apple is far from the only foldable maker to stumble over production creases in its foldable phone hardware. Samsung's Galaxy Fold was delayed in 2019 after reports of dust creeping under the screen and borked displays, prompting swift design tweaks. Francisco Jeronimo, veep of Worldwide Devices at IDC, said: "The early reports of inner display failures on the iPhone Duo show th

### When file infrastructure becomes the bottleneck
Tue, 27 Oct 2026 13:00:00 +0000 — https://www.theregister.com/storage/2026/10/27/sponsored-when-file-infrastructure-becomes-the-bottleneck/5305523

Nobody sets out to build file infrastructure that makes employees less productive. Yet sensible technology decisions made years ago can leave organizations wrestling with systems that no longer suit how their teams work. Take network-attached storage (NAS). It has long provided a dependable way to store and access files. But what happens when the people using those files are no longer sitting in the same building, or even the same country? A project team can spend its morning waiting for a multi-gigabyte file to transfer over a VPN, then lose more time checking whether the copy they received is the latest. No single delay attracts much attention. Repeat that across projects and the cost starts to add up. The price of working around the problem When shared access becomes difficult, employees find workarounds. They download local copies, duplicate folders, and transfer files between systems to keep projects moving. Now imagine an architecture firm sharing a large building model between design offices. One team updates its copy while another works from yesterday’s export. Before anyone can move forward, someone has to reconcile the differences. That's time spent managing files rather than designing the building. Duplicated data consumes storage capacity and complicates oversight. Meanwhile, IT must keep legacy infrastructure running while addressing performance, cost, security, and governance requirements. Replacing every storage system is rarely a practical first move. Organiza

### Microsoft releases out-of-band Windows fixes with certificate updates
Tue, 27 Oct 2026 12:30:00 +0000 — https://www.theregister.com/security/2026/10/27/microsoft-releases-out-of-band-windows-fixes-with-certificate-updates/5305637

Microsoft has released another out-of-band update for Windows, but this one isn't an emergency fix for the latest breakages. This time, it's all about certificates. The non-security out-of-band release applies to supported OSes ranging from Windows 11 and Windows Server 2025, to Windows 10. It's all about updating the current certificate trust list (CTL) of devices that cannot access Microsoft's certificate-update service, or where automatic CTL updates are disabled. It also contains everything in the October 13 update, including the ongoing VPN issues and the change that could break on-premises Exchange Servers . There might also be oddities with Smart App Control, audio, and Remote Desktop connections for non-admin users, all of which are known issues in the October 13 update. These problems are not resolved in this patch, so be aware of this when installing it. It is also worth remembering that many devices will not need this version since the current certificate list updates usually come down through the update service. However, if that service isn't available or being used, it might be a good idea to get this out-of-band fix (while keeping the known issues in mind), since problems can occur when verifying certificates used by applications or websites. The OOB update came after Microsoft laid out its response to the compromised eMudhra certificate keys. The Indian certification authority's private keys were compromised earlier this month, requiring a massive cleanup effor

### Attack on email hosting provider for German far right party AfD exposed 345k accounts
Tue, 27 Oct 2026 11:49:30 +0000 — https://www.theregister.com/cyber-crime/2026/10/27/attack-on-email-hosting-provider-for-german-far-right-party-afd-exposed-345k-accounts/5305660

The cyberattack on Alternative for Germany (AfD), the country’s most prominent far-right political party, exposed hundreds of thousands of confidential emails and attachments, as well as more than 345,000 unique email addresses. Have I Been Pwned confirmed the scale of the breach for the first time today, after AfD officially disclosed the September attack on its hosting provider last week. AfD said in its statement that “only a few email accounts were illegally copied,” but admitted a large amount of the data was taken from them, resulting in an extensive data breach. The emails were added to what the party described as “an activist website,” which summarised the email chains into searchable topics and has led to the publication of various revelations, such as a party co-leader’s opinions on colleagues’ “deeply problematic” racial discourse . Per a report from investigative journalist Lilith Wittmann, citing conversations with the cybercriminals responsible for the hack-and-leak job and party sources, the attack was first spotted on September 9 and started with a compromise of a poorly protected WordPress site. The same report claimed the criminals gained persistent access to the servers operated by the hosting provider, identified as AfD-owned Alternita Dienstleistungs GmbH, and exfiltrated more than a terabyte of data. No official sources have verified the hackers’ claims about how the attack unfolded. The Register contacted Alternita Dienstleistungs for its take. AfD said

### UK ministers had plenty of time for AI datacenter bosses, but none for environmental groups
Tue, 27 Oct 2026 11:00:00 +0000 — https://www.theregister.com/on-prem/2026/10/27/uk-ministers-had-plenty-of-time-for-ai-datacenter-bosses-but-none-for-environmental-groups/5305654

The British government has been busy courting AI datacenter companies while apparently finding little time to speak to the people who will have to live next door to their enormous server farms. That’s according to a report published Tuesday by campaign group Spotlight on Corruption, which found that 84 percent of the stakeholders ministers met with to discuss datacenters between July 2024 and June 2026 were businesses or private-sector trade associations. Environmental groups, by contrast, didn't get a single meeting with ministers or senior officials. The findings raise questions about who gets a say in Britain's AI Growth Zones, which the government hopes will attract billions of pounds in investment by making it easier and cheaper to build the infrastructure needed to power its AI ambitions. According to the report, titled Zoned Out, ministers met representatives from 137 different businesses during the two-year period, while permanent secretaries and directors general held no meetings with community groups about datacenters. Local residents didn't fare much better. Ministers met just two community groups, both after decisions had already been made to designate their areas as AI Growth Zones. In one case, the meeting took place on the very day the designation was announced. The government also failed to conduct a national public consultation on its AI Growth Zone strategy, despite the potential consequences for electricity supplies , water consumption , and local communiti

### FreeBSD founder ports Omarchy to FreeBSD in ten days, ten releases
Tue, 27 Oct 2026 10:15:00 +0000 — https://www.theregister.com/os-platforms/2026/10/27/freebsd-founder-ports-omarchy-to-freebsd-in-ten-days-ten-releases/5305446

Omarchy has already taken up plenty of our column inches, but a new tentacle is reaching into the hitherto untouched FreeBSD. Daemonarchy brings Omarchy's Wayland-based desktop to the BSD world. It's an independent effort by Jordan Hubbard, one of the original founders of the FreeBSD project, and it's unaffiliated with the original Linux-based Omarchy. We looked at Omarchy in August and didn’t like it much. It isn't exactly a Linux distribution. That implies it's a coherent set of packages managed as a whole by uniform tools. Omarchy is a collection of apps and preconfigured settings, packaged up with the help of LLM bots and put up for download. You have to update it using its own special script, rather than the standard tools of the underlying Arch Linux – and in our testing, that update script fell over with error messages when running in a VM. However, there's no such thing as a bad press, and Omarchy is popular and growing. It keeps on attracting sponsorship as well as new users migrating from Windows and macOS, who seem to relish its bizarre, inconsistent, and ad hoc UI as a challenge: trying to close a window in Hyprland, the tiling compositor that forms the core of Omarchy's UI. In Omarchy, windows don't have title bars, let alone anything as old-fashioned as window control buttons you can click. To close a window, you must use a keystroke. In most Linux windowing environments, that's the standard Alt-F4 . Not here. Next, we tried Super+W – on a Mac, that's Command+W 

## Engadget

### Rockstar workers in the UK will hold a union vote just as GTA 6 is released
Tue, 27 Oct 2026 19:55:04 +0000 — https://www.engadget.com/2298907/rockstar-workers-in-uk-hold-union-vote-as-gta-6-release/

A legal case alleging union-busting at the game developer will also wrap next month.

### Grand Theft Auto VI reportedly requires a 210GB download
Tue, 27 Oct 2026 19:39:37 +0000 — https://www.engadget.com/2298872/gta-6-download-size-reportedly-210-gb/

Be prepared to surrender a significant portion of your console's hard drive.

### This old Nokia phone got an AI Upgrade it was never designed for
Tue, 27 Oct 2026 18:30:00 +0000 — https://www.engadget.com/2295625/old-nokia-phone-ai-upgrade-never-designed-for/

The GOAT of dumb phones gets a new lease on life.

### Why buying a Mac mini over a MacBook might be the smarter move
Tue, 27 Oct 2026 18:00:00 +0000 — https://www.engadget.com/2296036/why-buying-mac-mini-over-macbook-smarter-move/

Apple's smallest desktop delivers better performance and value for those willing to leave the laptop behind.

### Pokémon Unite is shutting down
Tue, 27 Oct 2026 16:57:44 +0000 — https://www.engadget.com/2298514/pokemon-unite-is-shutting-down/

Its journey ends in March 2027.

### Why does the FCC hate Minions routers?
Tue, 27 Oct 2026 16:45:00 +0000 — https://www.engadget.com/2296043/why-does-the-fcc-hate-minions-routers/

These themed routers are surprisingly (inexplicably) capable, but they are under threat by the FCC.

### Apple Creator Studio update adds MotionVFX to Final Cut, and AI to everywhere
Tue, 27 Oct 2026 16:21:44 +0000 — https://www.engadget.com/2298428/apple-creator-studio-update-adds-motionvfx-to-final-cut-and-ai-to-everywhere/

Final Cut clips can finally be unlocked from the primary timeline - hallelujah.

### Apple iPhone Duo vs Google Pixel 11 Pro Fold: The differences beyond foldable style
Tue, 27 Oct 2026 16:15:00 +0000 — https://www.engadget.com/2296032/apple-iphone-duo-vs-google-pixel-11-pro-fold/

With the iPhone Duo now in people's hands, how does it compare to Google's Pixel 11 Pro Fold?

### You can finally see who's talking in voice chat on PlayStation 5 — here's how
Tue, 27 Oct 2026 15:45:00 +0000 — https://www.engadget.com/2284038/playstation-5-display-whos-speaking-party-voice-feature/

You don't have to guess who's loudly eating chips in your PlayStation 5 party anymore - now you can see who's speaking in real-time.

### Vivo's X500 Pro Max is another camera-focused smartphone with more video tricks
Tue, 27 Oct 2026 15:30:00 +0000 — https://www.engadget.com/2297022/vivos-x500-pro-max-hands-on/

Vivo and Oppo are launching similar phones with different priorities.

### The reason why some USB ports are orange
Tue, 27 Oct 2026 15:15:00 +0000 — https://www.engadget.com/2295961/reason-why-usb-ports-orange/

USB colors and symbols provide an idea of a port's capabilities, but are not as standardized as they should be.

### Nintendo sets an Indie World showcase for October 28
Tue, 27 Oct 2026 15:06:04 +0000 — https://www.engadget.com/2298300/nintendo-sets-an-indie-world-showcase-for-october-28/

The stream will run for around 15 minutes and feature games coming to Switch and Switch 2.

## TechCrunch

### Re:Build, which spun out Slate Auto, raises $2.1B
Tue, 27 Oct 2026 20:31:17 +0000 — https://techcrunch.com/2026/10/27/rebuild-which-spun-out-slate-auto-raises-2-1b/

The manufacturing accelerator bills itself as "America’s answer to Shenzhen."

### Disruptive raises $10B fund to make big bets on at least 10 companies
Tue, 27 Oct 2026 18:55:35 +0000 — https://techcrunch.com/2026/10/27/disruptive-raises-10b-fund-to-make-big-bets-on-at-least-10-companies/

Disruptive has made headlines in recent years for pouring money into companies like chip startup Groq and the AI voice-generation startup ElevenLabs.

### Frontier AI labs say their models refuted the Exponential Time Hypothesis. What does that mean?
Tue, 27 Oct 2026 17:08:08 +0000 — https://techcrunch.com/2026/10/27/frontier-ai-labs-say-their-models-refuted-the-exponential-time-hypothesis-what-does-that-mean/

TechCrunch spoke to the MIT computer scientist charged with explaining OpenAI's latest mind-bending discovery.

### Google’s Genie 4 world model adds audio, more realistic worlds, and real-time steering
Tue, 27 Oct 2026 16:30:57 +0000 — https://techcrunch.com/2026/10/27/googles-genie-4-world-model-adds-audio-more-realistic-worlds-and-real-time-steering/

Genie 4 can maintain a consistent scene for up to two minutes, double Genie 3's limit, and offers better physics and more humanlike characters.

### Meta AI director Rohit Patel leaves to take on Microsoft Office and Google Workspace
Tue, 27 Oct 2026 14:59:09 +0000 — https://techcrunch.com/2026/10/27/meta-ai-director-rohit-patel-leaves-to-take-on-microsoft-office-and-google-workspace/

Rohit Patel is departing Meta after eight years working on AI evaluations and reinforcement learning, TechCrunch has exclusively learned. His startup, Ndoc, aims to take on Microsoft Office Suite.

### Ford Fathom will be the cheapest American EV capable of powering a house
Tue, 27 Oct 2026 14:51:33 +0000 — https://techcrunch.com/2026/10/27/ford-fathom-will-be-the-cheapest-american-ev-capable-of-powering-a-house/

Ford is rolling out two new chargers capable of powering a home or the grid — so-called V2X capability.

### US government says hackers are now exploiting critical PHP web bugs
Tue, 27 Oct 2026 14:40:39 +0000 — https://techcrunch.com/2026/10/27/us-government-says-hackers-are-now-exploiting-critical-php-web-bugs/

The U.S. government cyber agency warns that hackers have figured out a way to exploit the popular PHP software, used in 70% of the web's software.

### Apple unveils new 14-inch MacBook Pro with M6 chip
Tue, 27 Oct 2026 14:25:11 +0000 — https://techcrunch.com/2026/10/27/apple-unveils-new-14-inch-macbook-pro-with-m6-chip/

The new MacBook Pro comes with 24 hours of battery life, and now features support for Wi-Fi 7 and Bluetooth 6 connectivity.

### Apple rolls out iOS 27.2 with new Siri AI languages and security fixes
Tue, 27 Oct 2026 13:54:51 +0000 — https://techcrunch.com/2026/10/27/apple-rolls-out-ios-27-2-with-new-siri-ai-languages-and-security-fixes/

The latest Apple software update for iPhones and iPads includes new features and important security updates.

### Japan internet giant GMO says hackers posted stolen customer data
Tue, 27 Oct 2026 13:32:57 +0000 — https://techcrunch.com/2026/10/27/japan-internet-giant-gmo-says-hackers-posted-stolen-customer-data/

Japan's GMO Internet is verifying alleged customer data posted by suspected hackers following a cloud service breach.

### Billionaire Palmer Luckey isn t leaving California over the wealth tax
Tue, 27 Oct 2026 13:01:00 +0000 — https://techcrunch.com/2026/10/27/billionaire-palmer-luckey-isnt-leaving-california-over-the-wealth-tax/

"It's causing a lot of people to run who I don't want to be running," native Californian Palmer Luckey said. "But I'm planning on staying in California. I'm going to keep fighting it."

### Anduril, Qualcomm launch BlueChip, a new kind of US-made laptop
Tue, 27 Oct 2026 13:00:00 +0000 — https://techcrunch.com/2026/10/27/anduril-qualcomm-launch-bluechip-a-new-kind-of-us-made-laptop/

Anduril founder Palmer Luckey is vowing to bring computer manufacturing back to the U.S., and by that he doesn't just mean assembly, but every individual component, some of which are exclusively made in China today.

