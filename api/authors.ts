// api/authors.ts
import qs from "qs";
import { getStrapiData } from "@/lib/strapi";
import { Author, StrapiResponse } from "@/types";

export async function getAllAuthors() {
    const query = qs.stringify(
        {
            populate: ["avatar", "recipes"],
            sort: ["name:asc"],
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Author[]>>(`/api/authors?${query}`);
}


export async function getAuthorBySlug(slug: string) {
    const query = qs.stringify(
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            populate: ["avatar", "recipes.coverImage", "recipes.category"],
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<Author[]>>(`/api/authors?${query}`);
}