// app/recipes/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { RecipeCard } from "@/components/recipe-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecipes } from "@/hooks/useRecipes";

const DIFFICULTIES = [
  { value: "easy", label: "Fácil" },
  { value: "medium", label: "Media" },
  { value: "hard", label: "Difícil" },
];

export default function RecipesPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Usamos la lógica encapsulada de nuestro Custom Hook
  const {
    recipes,
    totalCount,
    categories,
    loading,
    filters,
    hasActiveFilters,
    setSearchQuery,
    setSelectedCategory,
    setSelectedDifficulty,
    clearFilters,
  } = useRecipes();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Cargando recetas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Todas las Recetas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explora nuestra colección completa de recetas. Usa los filtros para encontrar exactamente lo que estás buscando.
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar recetas por título o ingredientes..."
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base bg-background"
              />
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    Activo
                  </span>
                )}
              </Button>

              {/* Categorías */}
              <div className={cn("flex flex-wrap gap-2", !showMobileFilters && "hidden md:flex")}>
                <Button
                  variant={filters.selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  Todas las categorías
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    variant={filters.selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Dificultades */}
              <div className={cn("flex flex-wrap gap-2", !showMobileFilters && "hidden md:flex")}>
                <Button
                  variant={filters.selectedDifficulty === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("all")}
                  className={cn(
                    "text-sm",
                    filters.selectedDifficulty === "all"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Todas
                </Button>
                {DIFFICULTIES.map((d) => (
                  <Button
                    key={d.value}
                    variant={filters.selectedDifficulty === d.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(d.value)}
                    className={cn(
                      "text-sm",
                      filters.selectedDifficulty === d.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Badges de Filtros Activos */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>

                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-secondary text-foreground text-sm px-2.5 py-1 rounded-md">
                    "{filters.searchQuery}"
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {filters.selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-secondary text-foreground text-sm px-2.5 py-1 rounded-md">
                    {categories.find((c) => c.slug === filters.selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {filters.selectedDifficulty !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-secondary text-foreground text-sm px-2.5 py-1 rounded-md capitalize">
                    {DIFFICULTIES.find((d) => d.value === filters.selectedDifficulty)?.label}
                    <button onClick={() => setSelectedDifficulty("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground underline ml-2"
                >
                  Limpiar todos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-muted-foreground mb-8">
              Mostrando {totalCount} {totalCount === 1 ? "receta" : "recetas"}
            </p>

            {recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No se encontraron recetas con los criterios seleccionados.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar Filtros
                </Button>
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