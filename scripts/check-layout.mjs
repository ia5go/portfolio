// Layout check for static HTML pages and slide decks (no deps).
// Loads the page in headless Chrome, then reports any element that spills out of its
// `.slide` (or the page width) and any overlapping boxes inside a slide.
//
//   node scripts/check-layout.mjs <file.html> [width=1328]
//
// Prints "NO PROBLEMS" or one line per problem; exits 1 when it finds any.
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [file, width = "1328"] = process.argv.slice(2);
if (!file) {
  console.error("usage: node scripts/check-layout.mjs <file.html> [width]");
  process.exit(2);
}

const chrome = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && existsSync(p));
if (!chrome) {
  console.error("Chrome not found; set CHROME=/path/to/chrome");
  process.exit(2);
}

// Boxes that must not overlap each other inside a slide.
const BOXES = ".flow,.kind,.offer,.side,.panel,.want__box,.comment,.lead,h2,.group__label";

const probe = `<script>
addEventListener('load', () => setTimeout(() => {
  const out = [];
  const slides = [...document.querySelectorAll('.slide')];
  const frames = slides.length ? slides : [document.body];
  frames.forEach((sl, i) => {
    const r = sl.getBoundingClientRect();
    const right = slides.length ? r.right : document.documentElement.clientWidth;
    sl.querySelectorAll('*').forEach((e) => {
      // Text-bearing leaves only; decorative layers (aria-hidden) may bleed on purpose.
      if (e.children.length || !e.textContent.trim() || e.closest('[aria-hidden="true"]')) return;
      const b = e.getBoundingClientRect();
      if (!b.height) return;
      if ((slides.length && b.bottom > r.bottom - 4) || b.right > right - 2)
        out.push('slide ' + (i + 1) + ' overflow: "' + e.textContent.trim().slice(0, 50) + '"');
    });
    if (!slides.length) return;
    const boxes = [...sl.querySelectorAll('${BOXES}')];
    for (let a = 0; a < boxes.length; a++) for (let c = a + 1; c < boxes.length; c++) {
      const A = boxes[a], B = boxes[c];
      if (A.contains(B) || B.contains(A)) continue;
      const x = A.getBoundingClientRect(), y = B.getBoundingClientRect();
      if (x.left < y.right - 1 && y.left < x.right - 1 && x.top < y.bottom - 1 && y.top < x.bottom - 1)
        out.push('slide ' + (i + 1) + ' overlap: ' + (A.className || A.tagName) + ' x ' + (B.className || B.tagName));
    }
  });
  const pre = document.createElement('pre');
  pre.id = 'LAYOUT_RESULT';
  pre.textContent = out.length ? out.join('\\n') : 'NO PROBLEMS';
  document.body.prepend(pre);
}, 1500));
</script>`;

const html = readFileSync(resolve(file), "utf8").replace("</body>", probe + "</body>");
const tmp = join(mkdtempSync(join(tmpdir(), "layout-")), "page.html");
writeFileSync(tmp, html);

const dom = execFileSync(
  chrome,
  ["--headless=new", "--disable-gpu", "--virtual-time-budget=8000", `--window-size=${width},900`, "--dump-dom", pathToFileURL(tmp).href],
  { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
);
const match = dom.match(/<pre id="LAYOUT_RESULT">([\s\S]*?)<\/pre>/);
const result = match ? match[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&") : "probe did not run";
console.log(result);
process.exit(result === "NO PROBLEMS" ? 0 : 1);
