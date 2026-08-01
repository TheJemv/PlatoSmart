// components/recipe-actions.tsx
"use client";

import { useState } from "react";
import { Heart, Share2, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface RecipeActionsProps {
    slug: string;
    title: string;
    description?: string;
}

export function RecipeActions({ slug, title, description }: RecipeActionsProps) {
    const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
    const [copied, setCopied] = useState(false);

    const active = isLoaded && isFavorite(slug);

    // Lógica para Compartir
    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description || `Mira esta receta de ${title} en PlatoSmart`,
                    url,
                });
            } catch (err) {
                // El usuario canceló el diálogo de compartir
            }
        } else {
            // Fallback: Copiar enlace al portapapeles
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Error al copiar enlace:", err);
            }
        }
    };

    // Lógica para Imprimir
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-wrap items-center gap-3 pt-6 print:hidden *:cursor-pointer">
            {/* Botón Guardar / Favoritos */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFavorite(slug)}
                disabled={!isLoaded}
                className={cn(
                    "transition-colors",
                    active && "border-red-200 text-red-500 bg-red-50/50 hover:bg-red-50 hover:text-red-600"
                )}
            >
                <Heart className={cn("h-4 w-4 mr-2 transition-colors", active && "fill-current text-red-500")} />
                {active ? "Guardado" : "Guardar"}
            </Button>

            {/* Botón Compartir */}
            <Button variant="outline" size="sm" onClick={handleShare}>
                {copied ? (
                    <>
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        ¡Enlace copiado!
                    </>
                ) : (
                    <>
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                    </>
                )}
            </Button>

            {/* Botón Imprimir */}
            <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
            </Button>
        </div>
    );
}