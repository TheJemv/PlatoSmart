// components/favorite-button.tsx
"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
    slug: string;
    className?: string;
}

export function FavoriteButton({ slug, className }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

    if (!isLoaded) return null;

    const active = isFavorite(slug);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(slug);
            }}
            aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
            className={cn(
                "p-2 rounded-full transition-all bg-background/80 backdrop-blur-md border shadow-sm hover:scale-110 active:scale-95",
                active ? "text-red-500 border-red-200" : "text-muted-foreground hover:text-foreground",
                className
            )}
        >
            <Heart className={cn("h-4 w-4 transition-colors", active && "fill-current")} />
        </button>
    );
}