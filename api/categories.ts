// api/categories.ts
import qs from "qs";
import { getStrapiData } from "@/lib/strapi";
import { Category, StrapiResponse } from "@/types";

export async function getCategories() {
    const query = qs.stringify(
        {
            populate: {
                coverImage: true,
                recipes: true,
            },
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Category[]>>(`/api/categories?${query}`);
}

export async function getCategoryBySlug(slug: string) {
    const query = qs.stringify(
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            populate: {
                coverImage: true,
                recipes: {
                    populate: ["coverImage", "author"],
                },
            },
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Category[]>>(`/api/categories?${query}`);
}