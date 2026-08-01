import { StrapiBlock, StrapiImage } from './common';
import { RecipeSummary } from './recipe';

export interface Author {
    id: number;
    documentId: string;
    name: string;
    slug: string;

    bio?: StrapiBlock[] | string;
    email: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar?: StrapiImage;
    recipes?: RecipeSummary[];
}