// app/sitemap.ts
import { MetadataRoute } from "next";
import { getStrapiData } from "@/lib/strapi";
import { StrapiResponse, Recipe, Category } from "@/types";
import { AuthorData } from "@/api/authors";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosmart.com";

    // 1. Páginas estáticas principales
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/recipes`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/authors`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // 2. Consultar slugs dinámicos desde Strapi
    try {
        const [recipesRes, categoriesRes, authorsRes] = await Promise.all([
            getStrapiData<StrapiResponse<Recipe[]>>("/api/recipes?fields[0]=slug&fields[1]=updatedAt"),
            getStrapiData<StrapiResponse<Category[]>>("/api/categories?fields[0]=slug&fields[1]=updatedAt"),
            getStrapiData<StrapiResponse<AuthorData[]>>("/api/authors?fields[0]=slug&fields[1]=updatedAt"),
        ]);

        // URLs Dinámicas de Recetas
        const recipePages: MetadataRoute.Sitemap = (recipesRes?.data || []).map((recipe) => ({
            url: `${baseUrl}/recipes/${recipe.slug}`,
            lastModified: recipe.updatedAt ? new Date(recipe.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }));

        // URLs Dinámicas de Categorías
        const categoryPages: MetadataRoute.Sitemap = (categoriesRes?.data || []).map((cat) => ({
            url: `${baseUrl}/categories/${cat.slug}`,
            lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        }));

        // URLs Dinámicas de Autores
        const authorPages: MetadataRoute.Sitemap = (authorsRes?.data || []).map((author) => ({
            url: `${baseUrl}/authors/${author.slug}`,
            lastModified: author.updatedAt ? new Date(author.updatedAt) : new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        }));

        return [...staticPages, ...recipePages, ...categoryPages, ...authorPages];
    } catch (error) {
        console.error("Error generando sitemap dinámico:", error);
        return staticPages;
    }
}