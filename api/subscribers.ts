// api/subscribers.ts
import { strapiClient } from "@/lib/strapi";

export interface SubscriberPayload {
    name: string;
    email: string;
    isActive?: boolean;
    source?: "footer" | "contact_page" | "popup";
}

export async function createSubscriber(name: string, email: string) {
    try {
        // Strapi v5 espera el objeto dentro de "data"
        const response = await strapiClient.post("/api/subscribers", {
            data: {
                name,
                email,
                isActive: true,
                source: "footer",
            },
        });

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error al crear suscriptor en Strapi:", error?.response?.data || error.message);

        // Capturar error si el email único ya existe en Strapi
        const isUniqueError =
            error?.response?.data?.error?.message?.includes("unique") ||
            error?.response?.data?.error?.name === "ValidationError";

        if (isUniqueError) {
            return { success: false, message: "Este correo ya está suscrito." };
        }

        return { success: false, message: "Hubo un problema al procesar la suscripción." };
    }
}