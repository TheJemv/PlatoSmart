// hooks/useRecipes.ts
import { useState, useEffect, useMemo } from "react";
import { getRecipes } from "@/api/recipes";
import { getCategories } from "@/api/categories";
import { Category, Recipe } from "@/types";

export interface RecipeFilters {
    searchQuery: string;
    selectedCategory: string;
    selectedDifficulty: string;
}

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado de los filtros
    const [filters, setFilters] = useState<RecipeFilters>({
        searchQuery: "",
        selectedCategory: "all",
        selectedDifficulty: "all",
    });

    // Cargar datos iniciales
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                const [recipesRes, categoriesRes] = await Promise.all([
                    getRecipes(),
                    getCategories(),
                ]);

                if (isMounted) {
                    setRecipes(recipesRes?.data || []);
                    setCategories(categoriesRes?.data || []);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Error al cargar recetas en useRecipes:", err);
                    setError("No se pudieron cargar las recetas.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    // Recetas filtradas computadas reactivamente
    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            const matchesSearch =
                !filters.searchQuery ||
                recipe.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                recipe.description?.toLowerCase().includes(filters.searchQuery.toLowerCase());

            const matchesCategory =
                filters.selectedCategory === "all" ||
                recipe.category?.slug === filters.selectedCategory;

            const matchesDifficulty =
                filters.selectedDifficulty === "all" ||
                recipe.difficulty === filters.selectedDifficulty;

            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [recipes, filters]);

    // Manejadores auxiliares para modificar los filtros
    const setSearchQuery = (query: string) =>
        setFilters((prev) => ({ ...prev, searchQuery: query }));

    const setSelectedCategory = (categorySlug: string) =>
        setFilters((prev) => ({ ...prev, selectedCategory: categorySlug }));

    const setSelectedDifficulty = (difficulty: string) =>
        setFilters((prev) => ({ ...prev, selectedDifficulty: difficulty }));

    const clearFilters = () =>
        setFilters({
            searchQuery: "",
            selectedCategory: "all",
            selectedDifficulty: "all",
        });

    const hasActiveFilters =
        filters.searchQuery !== "" ||
        filters.selectedCategory !== "all" ||
        filters.selectedDifficulty !== "all";

    return {
        recipes: filteredRecipes,
        totalCount: filteredRecipes.length,
        categories,
        loading,
        error,
        filters,
        hasActiveFilters,
        setSearchQuery,
        setSelectedCategory,
        setSelectedDifficulty,
        clearFilters,
    };
}