# HTML to PDF

Headless Chrome prints a local page straight to PDF:

```sh
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="D:/path/out.pdf" "file:///d:/path/page.html"
```

The first slide-deck PDF weighed 1.1 MB and opened slowly. Glows (`text-shadow`, `box-shadow`), scanline `repeating-linear-gradient`s, the CSS perspective grid and every gradient with transparency were rasterised into images.

**Why:** Chrome's PDF backend cannot keep those effects as vectors, so each becomes a bitmap per page.

**How to apply:**
- In `@media print`, drop shadows and glows, hide decorative layers, and replace every gradient with a solid colour. The deck went to 640 KB with zero images.
- Check with `grep -ac "/Subtype /Image" out.pdf` (want 0) and `grep -ao "/MediaBox \[[^]]*\]" out.pdf | uniq -c` (page count and size).
- `@page { size: 10in 5.625in; margin: 0 }` for a 16:9 deck; give `html, body` the background colour so the whole page is painted.
- `virtual-time-budget` gives Google Fonts time to load before printing.
- No PDF viewer exists here ([[visual-verification-tools]]); ask the owner to open the result.
