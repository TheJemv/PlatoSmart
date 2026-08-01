// types/global.ts (o dentro de types/common.ts)
import { StrapiImage, StrapiSEO } from "./common";

export interface GlobalData {
    id: number;
    documentId: string;
    siteName: string;
    siteDescription: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    favicon?: StrapiImage;
    defaultSeo?: StrapiSEO;
}