import { ImageResponse } from "next/og";
import { heroCopy } from "@/content/hero";
import { t, type Locale } from "@/content/localized";
import { siteName } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** The share card: a terminal window in the site's palette with the name and the role. */
export function renderOgImage(locale: Locale) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          background: "#1a0826",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "2px solid #00f3ff",
            borderRadius: 10,
            background: "#24093a",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "14px 24px",
              fontSize: 26,
              color: "#00f3ff",
              background: "rgba(158,0,255,0.25)",
              borderBottom: "2px solid rgba(0,243,255,0.4)",
            }}
          >
            ● ● ● ~/iago-benvindo
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 64px",
            }}
          >
            <div style={{ display: "flex", fontSize: 34, color: "#00f3ff" }}>
              {`> ${t(heroCopy.eyebrow, locale)}`}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 104,
                fontWeight: 800,
                color: "#ff007f",
              }}
            >
              {t(siteName, locale)}
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: "#e4d9f2" }}>
              {t(heroCopy.subtitle, locale)}
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
