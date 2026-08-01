// hooks/useFavorites.ts
"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cargar favoritos al montar en el cliente
    useEffect(() => {
        try {
            const stored = localStorage.getItem("platosmart_favorites");
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Error al cargar favoritos:", e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Guardar cambios en localStorage
    const toggleFavorite = (slug: string) => {
        setFavorites((prev) => {
            const updated = prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug];

            try {
                localStorage.setItem("platosmart_favorites", JSON.stringify(updated));
            } catch (e) {
                console.error("Error al guardar favorito:", e);
            }

            return updated;
        });
    };

    const isFavorite = (slug: string) => favorites.includes(slug);

    return { favorites, toggleFavorite, isFavorite, isLoaded };
}