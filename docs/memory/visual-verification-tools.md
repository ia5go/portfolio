# Visual verification on this machine

What exists: Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`) and Node. What does not: Playwright (not installed in this repo), `pdftoppm`/poppler (so PDFs cannot be read as images), Python PIL (no image cropping).

**How to apply:**
- **Layout check first:** `node scripts/check-layout.mjs <page.html> [width]` reports text spilling out of a `.slide` or the page, and overlapping boxes. Run it after every size or layout change; it would have caught the oversized flow boxes that the owner found by eye.
- **Screenshot:** `chrome --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=W,H --screenshot=out.png file:///...`, then Read the PNG.
- **One slide at full size:** copy the page with `sed "s#</style>#.slide:not(:nth-child(N)){display:none}</style>#"` and screenshot at 1328×800. A whole-deck screenshot is too small to judge.
- **Phone width:** headless Chrome will not lay out narrower than about 500 px, so a 400 px screenshot looks cropped on the right even when the page is fine. Use 520 px.
- PDF output: see [[html-to-pdf]].
