// api/authors.ts
import qs from "qs";
import { getStrapiData } from "@/lib/strapi";
import { Author, StrapiResponse } from "@/types";

export interface StrapiBlock {
    type: string;
    children?: { text: string; type?: string }[];
}

export interface AuthorData {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    email?: string;
    bio?: StrapiBlock[] | string;
    avatar?: any;
    recipes?: any[];
}

export async function getAllAuthors() {
    const query = qs.stringify(
        {
            populate: ["avatar", "recipes"],
            sort: ["name:asc"],
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<AuthorData[]>>(`/api/authors?${query}`);
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

    return await getStrapiData<StrapiResponse<AuthorData[]>>(`/api/authors?${query}`);
}