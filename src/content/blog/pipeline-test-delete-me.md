---
title: Pipeline test — reject this one
date: 2026-08-13
category: Tech
excerpt: A throwaway draft used to prove the review email works end to end. Hit Reject and it deletes itself, which is the last part of the test.
cover: /img/blog/covers/local-llm-30b.svg
---

This is not an article. It exists to prove that the whole review chain works
before the scheduled writer starts running unattended.

If you are reading this in an email, three things already worked:

1. The draft reached GitHub with `draft: true` on it
2. The site confirmed it really is an unpublished draft
3. Your own SMTP sent the message

## What is left to test

**Press Reject.** That is the only step still unproven, because it is the one
that needs `GITHUB_TOKEN` to commit back. If the page says "Deleted", the token
works and this file removes itself.

If instead it says "not configured", the token is missing or lacks Contents:
write on the repository — tell me and I will look.

You can try **Revise** first if you want to see that path too: type anything,
and the request lands in `notes/revision-requests/`. Just remember to come back
and Reject afterwards, or this stays in the repo.

**Do not press Approve.** Nothing terrible happens if you do — it would publish
this note, and you would then delete it from the moderation page — but there is
no reason to.
