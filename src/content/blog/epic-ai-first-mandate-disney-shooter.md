---
title: "Epic goes AI-first: no hand-written code, AI art"
date: 2026-10-13
category: AI
excerpt: Epic delayed its Marvel and Star Wars shooter and told the team to build it with AI instead. The art half of that instruction is the hard one.
cover: /img/blog/epic-ai-first-mandate-disney-shooter/shot-01.jpg
sources:
  - outlet: Tom's Hardware
    url: https://www.tomshardware.com/video-games/pc-gaming/epic-games-reportedly-delays-disney-shooter-title-so-it-can-pivot-to-ai-coding-staff-allegedly-told-no-more-handwritten-code-with-art-generated-with-full-ai-workflows
  - outlet: heise online
    url: https://www.heise.de/en/news/Epic-Games-delays-Disney-shooter-and-switches-development-to-AI-11485358.html
artistView:
  take: "An art pipeline is mostly conformance rather than invention — the UVs land where the trim sheet says, the LOD chain holds its silhouette, the skeleton matches the one animation already rigged against. Generative output arrives with none of that attached, so a mandate to generate the art does not remove the art work, it moves it to whoever has to make the generated thing fit. On a project already behind on staffing, that is the same people."
---

Bloomberg reported on 12 October that Epic Games has pushed its unannounced
shooter — the one with Marvel and Star Wars characters in it — out of March
2027, with no new date attached. The reported reason for the slip is ordinary
enough: the project was behind, and Epic had underestimated how many people and
how much time it needed.

What happened next is the part worth reading twice. Per the reporting, the team
was told to rebuild the thing AI-first. No more hand-written code. Art
"generated with full AI workflows".

Epic's communications director did not deny the direction. The company is
"embracing AI-accelerated development, led by Epic developers who are the
visionaries and creative drivers for everything we do," which is a sentence
built to survive being quoted. Disney, whose $1.5 billion went into Epic in
2024 and whose characters these are, said nothing.

Treat the internal wording as reported rather than confirmed — it comes from
Bloomberg's sources, relayed onward, and I have not seen the memo. The delay
and the AI direction are corroborated across outlets. The exact phrasing of the
instruction is not.

<figure>
  <img src="/img/blog/epic-ai-first-mandate-disney-shooter/shot-02.jpg" loading="lazy" width="1920" height="1080" alt="Marvel Rivals, a Marvel hero shooter built in Unreal Engine 5" />
  <figcaption>No art from Epic's game exists publicly, so the shots here are Marvel Rivals — NetEase's Marvel hero shooter, built by hand in Unreal Engine 5 with Lumen and Chaos destruction, out since December 2024. It is the bar, not the subject.</figcaption>
</figure>

## The code half is the easy half

"No more hand-written code" is a loud instruction that mostly describes what a
lot of studios already quietly do. Gameplay code in Unreal is already heavily
templated, there is a model on every programmer's second monitor, and a
generated function either compiles and passes its test or it does not. The
feedback is fast and the verdict is binary. You can be wrong about code on
Tuesday and know it on Tuesday.

Art does not work like that, and this is where the instruction gets expensive.

## What "full AI workflows" has to actually produce

Ask an artist what the slow part of the job is and almost nobody says coming up
with the idea. The slow part is conformance. A prop that ships has to carry a
UV layout that lands on the project's trim sheet, a topology budget it holds to,
a LOD chain whose silhouette survives three reductions, a collision mesh that
is not the render mesh, a material instance parented to the right master so a
later art-direction note can change four hundred assets at once, and a name that
the build tools can parse. A character has to be weighted to the skeleton that
the animation team already has four hundred clips authored against.

None of that is aesthetic. All of it is the actual work.

Generated geometry and generated textures arrive with none of it. They arrive as
a thing that looks like the brief from one angle. Somebody then has to retopo it,
lay the UVs, bake it down, hook up the materials, fit it to the rig, and check it
at the distance the camera will actually see it from. That person is an artist,
doing art-pipeline work, on a schedule that was already short of them.

So the honest version of "the art is generated" is: the concept and the first
block-out are generated, and the integration cost stays exactly where it was.
That can be a real saving. It is not the saving a slipping schedule needs,
because the bit it saves was never the bit that was slipping.

And a hero shooter is about the worst case to try it on. Hero shooters live or
die on silhouette discipline — twelve characters have to be readable as coloured
shapes at forty metres through a particle effect, which is a constraint you
enforce across a whole cast at once, by hand, by a lead walking the lineup and
sending things back. It is the most centrally art-directed work in games. It is
the least like a prompt.

## Epic is dogfooding its own roadmap

There is a reason this is happening at Epic specifically rather than at any of
the other studios under schedule pressure this autumn. Epic sells the engine.
At State of Unreal this summer it put AI at the centre of the Unreal Engine 6
pitch, shipped 5.8 with an experimental MCP plugin that lets a model like Claude
talk to engine systems directly, and described UE6 as the merge of UE5 and
Unreal Editor for Fortnite with Verse taking over gameplay programming.

A first-party team with a Disney licence and a slipped date is the test case for
all of it. If the AI-first pipeline works on this project, it is the keynote
demo for the engine. The incentive to find that it worked is enormous, and it
sits inside the same company as the people who have to report whether it did.

That tension is not new to Epic either. Three separate teams of
[ex-Epic people left to build AI-native engines of their own](/blog/ai-native-engines-ex-epic-founders/),
each promising that a small team could put out what fifteen people used to. Epic
is now running the same bet with the headcount it already has, on a licence it
cannot afford to embarrass.

## Which brings up the licence

Here is the question nobody has asked Disney. In September, Saber's chief
creative officer went down a list — Space Marine 3, Jurassic Park, John Wick,
Turok — and said there was
[absolutely no generative AI in any of them, because the licence holders forbid it](/blog/space-marine-3-no-generative-ai-games-workshop/).
Games Workshop drew that line. Saber's own unlicensed game used genAI happily.
The dividing line was not the studio's ethics; it was whose characters were on
screen.

Disney owns Star Wars and Marvel, and Disney has spent two years in public
argument about generative likenesses of exactly these characters. Whether
Epic's licence permits an AI-generated Wolverine is a contractual question with
a real answer, and the people who know it are not talking. Disney did not
comment on the report at all.

A studio can change its own pipeline on a Monday. It cannot change what its
licensor signed.

## What I will be watching for

Not the renders. The renders will look fine; they always do in a keynote, shot
from the angle that works. The tells are further down:

- Whether the art team's headcount goes up alongside the mandate. If generation
  is doing the work, integration demand rises and you need *more* people at the
  pipeline end, not fewer.
- Whether a new date appears before the end of 2027. A schedule rescued by a
  tooling change usually produces a date quite quickly, because the rescue is
  measurable. A schedule rescued by a slogan does not.
- Whether the silhouettes hold. Line the cast up at forty metres and you can see
  whether somebody art-directed it or assembled it.

Marvel Rivals shipped in December 2024, hand-built in UE5, destructible
environments and all, and it took NetEase a large team to do it. That game is
the comparison whether Epic wants it or not.
