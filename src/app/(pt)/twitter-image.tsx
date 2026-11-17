import { ogSize, renderOgImage } from "@/components/site/ogImage";

export const alt = "Iago Benvindo, Full-Stack Developer · Gestor de Inovação";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("pt");
}
