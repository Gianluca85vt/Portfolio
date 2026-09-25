#!/usr/bin/env bash
# One line per article, newest first: date|category|R<score>|title.
#
# What the daily writer runs to check for repeats and pick internal links
# without reading the archive. Moved out of its prompt verbatim, so the prompt
# carries no shell quoting to get wrong when it is edited.
cd "$(dirname "$0")/.." || exit 1
cd src/content/blog && for f in *.md; do d=$(sed -n 's/^date: *//p' "$f" | head -1); c=$(sed -n 's/^category: *//p' "$f" | head -1); t=$(sed -n 's/^title: *//p' "$f" | head -1 | tr -d '"'); s=$(sed -n 's/^score: *//p' "$f" | head -1); printf '%s|%s|%s|%s\n' "$d" "$c" "${s:+R$s}" "$t"; done | sort -r
