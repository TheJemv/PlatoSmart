// components/image.tsx
import Image from "next/image";
import { pickCover } from "@/utils/media";
import type { StrapiImage } from "@/types";

interface MyImageProps {
    cover?: StrapiImage | null;
    className?: string;
}

export default function MyImage({ cover, className = "" }: MyImageProps) {
    const imageInfo = pickCover(cover);

    // Si no hay imagen o la URL no existe, mostramos un contenedor de reserva (fallback)
    if (!imageInfo || !imageInfo.url) {
        return (
            <div className={`bg-muted flex items-center justify-center text-xs text-muted-foreground ${className}`}>
                Sin imagen
            </div>
        );
    }

    return (
        <Image
            src={imageInfo.url}
            alt={imageInfo.alt || "Imagen de receta"}
            width={imageInfo.width || 800}
            height={imageInfo.height || 600}
            className={className}
        />
    );
}