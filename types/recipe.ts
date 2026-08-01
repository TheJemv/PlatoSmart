import { StrapiImage, StrapiSEO } from './common';
import { Category } from './category';
import { Author } from './author';

export interface Step {
    id: number;
    order: number;
    instruction: string;
}

export interface Ingredient {
    id: number;
    name: string;
    quantity: string;
    unit: string | null;
}

export interface Recipe {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: 'easy' | 'medium' | 'hard' | string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    coverImage?: StrapiImage;
    steps?: Step[];
    ingredients?: Ingredient[];
    category?: Category;
    author?: Author;
    seo?: StrapiSEO;
}

// Para relaciones simplificadas que devuelve Strapi dentro de categorías o autores
export type RecipeSummary = Pick<
    Recipe,
    | 'id'
    | 'documentId'
    | 'title'
    | 'slug'
    | 'description'
    | 'prepTime'
    | 'cookTime'
    | 'servings'
    | 'difficulty'
    | 'createdAt'
    | 'updatedAt'
    | 'publishedAt'
>;