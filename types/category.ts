import { StrapiImage } from './common';
import { RecipeSummary } from './recipe';

export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

    coverImage?: StrapiImage;
    recipes?: RecipeSummary[];
}