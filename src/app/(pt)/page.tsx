import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/site/JsonLd";

export default function Page() {
  return (
    <>
      <JsonLd page="home" locale="pt" />
      <HomePage locale="pt" />
    </>
  );
}
