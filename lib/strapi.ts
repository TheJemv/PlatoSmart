// lib/strapi.ts
import axios from "axios";

export const BASE_URL = "https://strapi.platosmart.com";

export const strapiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getStrapiData<T = any>(endpoint: string): Promise<T | null> {
    try {
        const response = await strapiClient.get<T>(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}