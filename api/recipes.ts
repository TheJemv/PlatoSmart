// api/recipes.ts
import qs from "qs";
import { getStrapiData } from "@/lib/strapi";
import { Recipe, StrapiResponse } from "@/types";

interface GetRecipesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    difficulty?: string;
}

export async function getRecipes(params?: GetRecipesParams | number, pageSizeParam = 10) {
    // Manejo de sobrecarga para soportar tanto getRecipes(1, 10) como getRecipes({ search, category, ... })
    let page = 1;
    let pageSize = pageSizeParam;
    let search = "";
    let category = "";
    let difficulty = "";

    if (typeof params === "object" && params !== null) {
        page = params.page ?? 1;
        pageSize = params.pageSize ?? 10;
        search = params.search ?? "";
        category = params.category ?? "";
        difficulty = params.difficulty ?? "";
    } else if (typeof params === "number") {
        page = params;
    }

    // Construcción de Filtros Dinámicos
    const filters: any = {};

    if (search.trim()) {
        filters.$or = [
            { title: { $containsi: search } },
            { description: { $containsi: search } },
        ];
    }

    if (category && category !== "all") {
        filters.category = { slug: { $eq: category } };
    }

    if (difficulty && difficulty !== "all") {
        filters.difficulty = { $eq: difficulty };
    }

    const query = qs.stringify(
        {
            filters,
            pagination: {
                page,
                pageSize,
            },
            sort: ["createdAt:desc"], // <-- ORDENA DE LA MÁS NUEVA A LA MÁS VIEJA
            populate: ["coverImage", "category", "author.avatar"],
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Recipe[]>>(`/api/recipes?${query}`);
}

export async function getRecipeBySlug(slug: string) {
    const query = qs.stringify(
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            populate: [
                "coverImage",
                "ingredients",
                "steps",
                "category",
                "author.avatar",
                "seo",
            ],
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Recipe[]>>(`/api/recipes?${query}`);
}

export async function getRecipesByAuthor(authorSlug: string, page = 1, pageSize = 10) {
    const query = qs.stringify(
        {
            filters: {
                author: {
                    slug: {
                        $eq: authorSlug,
                    },
                },
            },
            pagination: {
                page,
                pageSize,
            },
            sort: ["createdAt:desc"], // <-- ORDENA DE LA MÁS NUEVA A LA MÁS VIEJA
            populate: ["coverImage", "category"],
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Recipe[]>>(`/api/recipes?${query}`);
}