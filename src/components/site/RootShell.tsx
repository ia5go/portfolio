import type { Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { localeMetadata } from "@/content/metadata";
import type { Locale } from "@/content/localized";
import { Effects } from "./Effects";
import { LocaleProvider } from "./LocaleProvider";
import { PageTransition } from "./PageTransition";
import { PixelStars } from "./PixelStars";
import "../../app/globals.css";

// One monospace family for the whole terminal look: titles, body and code alike.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export { localeMetadata };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a0826",
};

/** The <html> shell. Each locale has its own root layout so `lang` is correct. */
export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={jetbrainsMono.variable}
    >
      <body suppressHydrationWarning>
        <PixelStars />
        <div className="grid-floor" aria-hidden="true" />
        <Effects />
        <LocaleProvider>
          <PageTransition>{children}</PageTransition>
        </LocaleProvider>
      </body>
    </html>
  );
}
