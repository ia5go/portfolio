import { HomePage } from "@/components/HomePage";
import { defaultLocale } from "@/content/localized";

// Ticket #4 moves this under a locale segment; Portuguese is the default.
export default function Page() {
  return <HomePage locale={defaultLocale} />;
}
