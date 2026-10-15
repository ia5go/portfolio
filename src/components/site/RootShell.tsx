import type { Viewport } from "next";
import { Rajdhani, Space_Mono, VT323 } from "next/font/google";
import { localeMetadata } from "@/content/metadata";
import type { Locale } from "@/content/localized";
import { Effects } from "./Effects";
import "../../app/globals.css";

const rajdhani = Rajdhani({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});


export { localeMetadata };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0015",
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
      className={`${rajdhani.variable} ${spaceMono.variable} ${vt323.variable}`}
    >
      <body>
        <div className="grid-floor" aria-hidden="true" />
        <Effects />
        {children}
      </body>
    </html>
  );
}
