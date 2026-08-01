// api/global.ts
import qs from "qs";
import { getStrapiData } from "@/lib/strapi";
import { GlobalData, StrapiResponse } from "@/types";

export async function getGlobalSEO() {
    try {
        const query = qs.stringify(
            {
                populate: ["favicon", "defaultSeo.shareImage"],
            },
            { encodeValuesOnly: true }
        );

        return await getStrapiData<StrapiResponse<GlobalData>>(`/api/global?${query}`);
    } catch (error) {
        console.warn("[Strapi API] No se pudo obtener la configuración Global:", error);
        return null;
    }
}