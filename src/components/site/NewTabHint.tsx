import { t, type Locale } from "@/content/localized";
import { newTabHint } from "@/content/site";

/** Tells screen-reader users the link opens a new tab; invisible on screen. */
export function NewTabHint({ locale }: { locale: Locale }) {
  return (
    <>
      {" "}
      <span className="sr-only">({t(newTabHint, locale)})</span>
    </>
  );
}
