import { RootShell, localeMetadata, viewport } from "@/components/site/RootShell";

export const metadata = localeMetadata("en");
export { viewport };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
