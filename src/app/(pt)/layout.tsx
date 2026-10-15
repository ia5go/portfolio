import { RootShell, localeMetadata, viewport } from "@/components/site/RootShell";

export const metadata = localeMetadata("pt");
export { viewport };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="pt">{children}</RootShell>;
}
