// api/about.ts
import qs from "qs";
import { getStrapiData } from "@/lib/strapi";
import { StrapiResponse } from "@/types";

export async function getAboutData() {
    const query = qs.stringify(
        {
            populate: {
                blocks: {
                    populate: "*",
                },
            },
        },
        { encodeValuesOnly: true }
    );

    return await getStrapiData<StrapiResponse<any>>(`/api/about?${query}`);
}