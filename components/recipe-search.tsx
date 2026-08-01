// components/recipe-search.tsx
"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface RecipeSearchProps {
    initialQuery?: string;
}

export function RecipeSearch({ initialQuery = "" }: RecipeSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term.trim()) {
            params.set("search", term);
        } else {
            params.delete("search");
        }

        startTransition(() => {
            router.push(`/recipes?${params.toString()}`);
        });
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        router.push(`/recipes?${params.toString()}`);
    };

    const currentSearch = searchParams.get("search") || initialQuery;

    return (
        <div className="relative max-w-xl mx-auto w-full mb-12">
            <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Busca por ingrediente, nombre o platillo (ej: pollo, sopa...)"
                    defaultValue={currentSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 text-base rounded-full border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground/60"
                />
                {currentSearch && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-4 text-muted-foreground hover:text-foreground p-1"
                        aria-label="Limpiar búsqueda"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            {isPending && (
                <p className="text-xs text-center text-muted-foreground mt-2">Buscando recetas...</p>
            )}
        </div>
    );
}