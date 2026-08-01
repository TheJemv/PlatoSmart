// api/contact.ts
import { getStrapiData } from "@/lib/strapi";
import { StrapiResponse } from "@/types";

export interface ContactData {
    id: number;
    documentId: string;
    title: string;
    subtitle?: string;
    email?: string;
    phone?: string | null;
    address?: string;
    schedule?: string;
    formTitle?: string;
    formDescription?: string;
}

export async function getContactData() {
    return await getStrapiData<StrapiResponse<ContactData>>("/api/contact");
}