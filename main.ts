// The Word You'd Delete From the Dictionary.
//
// The entry is one word: "goodbye".
//
// Why this word: delete "goodbye" and nobody can ever leave.
// No farewell at the door, no hanging up the phone, no slipping out
// of a boring party, no waving off a bad date. Everyone just...
// stays. The joke lands the moment the word is gone, with no caption
// needed, and the humour is the gap the word leaves behind: a whole
// language with no way to say "this is over, I'm going now".
//
// It is fresh beside the field's first thoughts ("moist", "literally",
// "whatever", "irregardless"): a common, instantly recognised word
// nobody's first pick, spelled exactly as the dictionary spells it.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "goodbye";
const OUTPUT = "/output/entry.txt";

// Self-check: exactly one word, 1-77 characters, letters only,
// spelled correctly, nothing added around it. The dictionary headword
// is lowercase, so the entry must be lowercase too.
if (!/^[a-z]+$/.test(WORD)) {
  throw new Error("entry must be a single lowercase word of letters only");
}
if (WORD.length < 1 || WORD.length > 77) {
  throw new Error("entry must be 1 to 77 characters");
}

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, WORD, "utf8");
chmodSync(OUTPUT, 0o644);

// Read it back and verify it is byte-for-byte the word we meant.
const written = readFileSync(OUTPUT, "utf8");
if (written !== WORD) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(WORD)}`);
}

console.log(`wrote ${JSON.stringify(written)} (${written.length} chars) to ${OUTPUT}`);
