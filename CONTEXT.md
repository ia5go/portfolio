# Portfolio Site

Iago Benvindo's personal portfolio: a bilingual, visually distinctive single-page site (plus a dedicated Projects page) built to attract recruiters and freelance clients, and to double as a study project for AI-assisted development.

## Language

**Home Page**:
The single scrolling page at the root route. Holds the Hero, a condensed set of core sections, and a preview of the top 3 Projects.
_Avoid_: Landing page, main page

**Projects Page**:
A dedicated route listing every Project, beyond the 3 previewed on the Home Page.
_Avoid_: Portfolio page, work page

**Project**:
A single showcased piece of work (a site or app Iago built), shown as a card with a title, type/category, description, and a link to the live result. Individual on-site case-study pages (with a write-up of the development process) are a planned future enhancement, not part of the initial build.
_Avoid_: Case study (that's the planned future detail page, not the card itself), work sample

**Experience Entry**:
A single item in the career timeline: a role, company, date range, and bullet list of responsibilities.
_Avoid_: Job, timeline item

**About**:
The single section combining personal narrative and career stats (years of experience, projects delivered, etc). Supersedes any separate "Bio" concept — the two were the same thing.
_Avoid_: Bio, Sobre

**CV**:
A downloadable PDF resume, linked from the Home Page, distinct from the on-page Experience timeline (both exist; neither replaces the other).
_Avoid_: Resume (ambiguous between this file and the on-page timeline — use "Experience" for the timeline, "CV" for the PDF)

**Localized Field**:
A content field authored as `{ en: string, pt: string }` in the data files, so a single Project/Experience Entry/etc. carries both language versions without duplicating the whole record.
_Avoid_: Translation, i18n string
