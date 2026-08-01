// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosmart.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/"], // Protege los endpoints de la API
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}