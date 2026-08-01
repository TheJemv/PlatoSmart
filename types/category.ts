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
    recipes?: RecipeSummary[];
}