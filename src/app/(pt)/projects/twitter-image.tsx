import { ogSize, renderOgImage } from "@/components/site/ogImage";

export const alt = "Iago Benvindo: Projetos";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("pt");
}
