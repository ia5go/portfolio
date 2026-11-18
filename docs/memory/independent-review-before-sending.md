# Independent review before sending

Before a document goes to someone outside, a fresh subagent with no session context reads it and checks it against the sources. In the partnership-document session this review caught five confidential items that the author (with the whole conversation in context) had judged safe.

**Why:** the author's context makes vague wording feel anonymous; a reader without that context sees what a stranger would trace.

**How to apply:**
- Spawn a fresh agent (not a fork), read-only, with the document path, the list of items the owner already cleared, and the sources to compare against ([[owner-context-sources]]).
- Ask for exact quotes, why each is sensitive (with the source file), severity, and a rewrite.
- Bring the findings to the owner; apply only what the owner approves. Rules live in [[employer-confidentiality]].
