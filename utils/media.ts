// utils/media.ts
import { BASE_URL } from "@/lib/strapi";
import type { StrapiImage, StrapiImageFormat } from "@/types";

const ORDER: (keyof NonNullable<StrapiImage["formats"]>)[] = ["medium", "small", "thumbnail"];

/**
 * Convierte cualquier ruta relativa (/uploads/...) a URL absoluta apuntando a Strapi.
 */
export function getStrapiURL(path = "") {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${BASE_URL}${path}`;
}

export function pickCover(cover?: StrapiImage | null) {
  if (!cover) return null;

  // Busca el mejor formato disponible según la prioridad definida
  const fmt: StrapiImageFormat | StrapiImage =
    ORDER.map((k) => cover.formats?.[k]).find(Boolean) || cover;

  const rawUrl = fmt.url || cover.url;

  return {
    url: getStrapiURL(rawUrl),
    alt: cover.alternativeText || cover.name || "Imagen de receta",
    width: fmt.width || cover.width || 800,
    height: fmt.height || cover.height || 600,
  };
}