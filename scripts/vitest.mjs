// Starts Vitest from the project folder's real path.
//
// Windows: a shell opened as `d:\` instead of `D:\` makes Vitest load two copies of
// itself ("Vitest failed to find the current suite"), and every test file fails with
// no tests. Fixing the casing inside vitest.config is too late: the first copy is
// already loaded by then. So normalize here, then run Vitest in a child process.
import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import path from "node:path";

const cwd = realpathSync.native(process.cwd());
const vitest = path.join(cwd, "node_modules", "vitest", "vitest.mjs");
const run = spawnSync(process.execPath, [vitest, ...process.argv.slice(2)], {
  cwd,
  stdio: "inherit",
});
process.exit(run.status ?? 1);
