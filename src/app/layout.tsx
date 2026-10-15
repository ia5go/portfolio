import type { Metadata, Viewport } from "next";
import { Rajdhani, Space_Mono, VT323 } from "next/font/google";
import { defaultLocale } from "@/content/localized";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Iago Benvindo",
  description: "Full-Stack Developer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0015",
};

// Ticket #4 turns this into the [locale] layout and sets <html lang> per locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      className={`${rajdhani.variable} ${spaceMono.variable} ${vt323.variable}`}
    >
      <body>
        <div className="grid-floor" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
