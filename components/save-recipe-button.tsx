// components/save-recipe-button.tsx
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface SaveRecipeButtonProps {
    slug: string;
}

export function SaveRecipeButton({ slug }: SaveRecipeButtonProps) {
    const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

    if (!isLoaded) {
        return (
            <Button variant="outline" size="sm" disabled>
                <Heart className="h-4 w-4 mr-2" />
                Guardar
            </Button>
        );
    }

    const active = isFavorite(slug);

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFavorite(slug)}
            className={cn(
                "transition-colors",
                active && "border-red-200 text-red-500 bg-red-50/50 hover:bg-red-50 hover:text-red-600"
            )}
        >
            <Heart className={cn("h-4 w-4 mr-2 transition-colors", active && "fill-current text-red-500")} />
            {active ? "Guardado" : "Guardar"}
        </Button>
    );
}