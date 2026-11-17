"use client";

import { t, type Locale } from "@/content/localized";
import { navCopy } from "@/content/site";
import { useLocale } from "./LocaleProvider";
import "./skip-link.css";

/** First tab stop of every page: jumps keyboard and screen-reader users past the header. */
export function SkipLink({ locale: served }: { locale: Locale }) {
  const locale = useLocale(served);
  return (
    <a className="skip-link" href="#main">
      {t(navCopy.skip, locale)}
    </a>
  );
}
