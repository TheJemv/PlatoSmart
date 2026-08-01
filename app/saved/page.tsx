// app/saved/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";
import { useFavorites } from "@/hooks/useFavorites";
import { getStrapiData } from "@/lib/strapi";
import { Recipe, StrapiResponse } from "@/types";
import { Heart, Clock, Utensils, BookOpen } from "lucide-react";
import qs from "qs";

export default function SavedRecipesPage() {
    const { favorites, isLoaded } = useFavorites();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSavedRecipes() {
            if (!isLoaded) return;

            if (favorites.length === 0) {
                setRecipes([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const query = qs.stringify(
                    {
                        filters: {
                            slug: {
                                $in: favorites,
                            },
                        },
                        populate: ["coverImage", "category"],
                    },
                    { encodeValuesOnly: true }
                );

                const res = await getStrapiData<StrapiResponse<Recipe[]>>(`/api/recipes?${query}`);
                if (res?.data) {
                    setRecipes(res.data);
                }
            } catch (err) {
                console.error("Error al cargar recetas guardadas:", err);
            } finally {
                setLoading(false);
            }
        }

        loadSavedRecipes();
    }, [favorites, isLoaded]);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Header Section */}
                <section className="py-12 lg:py-16 bg-secondary/30 border-b">
                    <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-4">
                            <Heart className="h-4 w-4 fill-current" /> Mi Colección
                        </div>
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                            Recetas Guardadas
                        </h1>
                        <p className="text-muted-foreground">
                            Tus recetas favoritas al alcance de un clic para cocinar cuando quieras.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
                                ))}
                            </div>
                        ) : recipes.length === 0 ? (
                            <div className="text-center py-16 border rounded-2xl bg-card max-w-md mx-auto">
                                <Heart className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                                <h2 className="font-serif text-xl font-bold mb-2">No tienes recetas guardadas</h2>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Explora nuestro recetario y toca el icono de corazón en las recetas que quieras cocinar después.
                                </p>
                                <Button asChild>
                                    <Link href="/recipes">Explorar Recetas</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {recipes.map((recipe) => {
                                    const cover = recipe.coverImage;
                                    const coverUrl = cover?.url
                                        ? cover.url.startsWith("http")
                                            ? cover.url
                                            : `https://strapi.platosmart.com${cover.url}`
                                        : null;

                                    return (
                                        <div
                                            key={recipe.id}
                                            className="group bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col relative"
                                        >
                                            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                                                {coverUrl ? (
                                                    <Image
                                                        src={coverUrl}
                                                        alt={recipe.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif">
                                                        PlatoSmart
                                                    </div>
                                                )}

                                                <FavoriteButton
                                                    slug={recipe.slug}
                                                    className="absolute top-3 right-3 z-10"
                                                />

                                                {recipe.category && (
                                                    <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1 rounded-full border shadow-sm">
                                                        {recipe.category.name}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                href={`/recipes/${recipe.slug}`}
                                                className="p-5 flex flex-col flex-1 justify-between space-y-4"
                                            >
                                                <div>
                                                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                        {recipe.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                                                        {recipe.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                                                    {recipe.prepTime && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5" /> Prep: {recipe.prepTime} min
                                                        </span>
                                                    )}
                                                    {recipe.cookTime && (
                                                        <span className="flex items-center gap-1">
                                                            <Utensils className="h-3.5 w-3.5" /> Cocción: {recipe.cookTime} min
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                <Newsletter />
            </main>

            <Footer />
        </div>
    );
}