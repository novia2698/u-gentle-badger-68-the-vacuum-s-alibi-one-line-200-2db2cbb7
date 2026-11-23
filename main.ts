// main.ts — "The Vacuum's Alibi: One Line, 200 Characters" (make.fun, program/v1)
// Writes one line, at most 200 characters, in which a robot vacuum
// explains why it missed a spot, to <output>/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line itself: the vacuum skipped the spot on purpose, because the
// dust there has unionised — and it will not cross a picket line while
// running on 12% battery. Deadpan log voice, one surprising turn, and
// the punch (the battery) lands on the last words.
const LINE =
  "I skipped that spot deliberately. The dust there has formed a union, and I am not crossing a picket line on 12% battery.";

// Guard the gate: the sealed scorer only accepts 1-200 characters,
// so refuse to write anything longer instead of shipping an invalid entry.
if ([...LINE].length === 0 || [...LINE].length > 200) {
  throw new Error(`entry line is ${[...LINE].length} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line is only whitespace");
}

// The program is fully deterministic: no network, no clock, no random
// input, no files read from outside this repository — the same line is
// written on every run, so the grader's two executions always match.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const path = join(outDir, "entry.txt");
writeFileSync(path, LINE, "utf8");
console.log(`wrote ${path} (${[...LINE].length} characters)`);
