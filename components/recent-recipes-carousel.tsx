"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { RecipeCard } from "@/components/recipe-card";
import { getRecipes } from "@/api/recipes";
import { Recipe } from "@/types";
import { Loader2 } from "lucide-react";

export function RecentRecipesCarousel() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    // Configuración de Embla: muestra 3 elementos en pantallas grandes y se desliza en bloques
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "start", slidesToScroll: 3 },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        (async () => {
            try {
                // Traemos las recetas (puedes ajustar el limit en tu API si agregaste paginación/limit)
                const res = await getRecipes();
                const data = res?.data || [];
                // Tomamos únicamente las últimas 9 recetas
                setRecipes(data.slice(0, 9));
            } catch (err) {
                console.error("Error al cargar recetas para el carrusel:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (recipes.length === 0) return null;

    return (
        <section className="py-16 bg-secondary/10 border-t">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Últimas Recetas Creadas
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Inspírate con las creaciones más recientes que nuestro equipo y comunidad han preparado para ti.
                    </p>
                </div>

                {/* Viewport del Carrusel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                            >
                                <div className="h-full">
                                    <RecipeCard recipe={recipe} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}