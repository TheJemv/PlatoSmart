export interface StrapiImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes?: number;
}

export interface StrapiBlock {
    type: string;
    children?: { text: string; type?: string }[];
}

export interface StrapiImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    focalPoint: string | null;
    width: number;
    height: number;
    formats?: {
        large?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        small?: StrapiImageFormat;
        thumbnail?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: StrapiPagination;
    };
}

export interface StrapiSEO {
    id: number;
    metaTitle: string;
    metaDescription: string;
}