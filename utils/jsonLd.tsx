// lib/jsonLd.tsx

interface RecipeJsonLdProps {
    recipe: any;
}

export function RecipeJsonLd({ recipe }: RecipeJsonLdProps) {
    if (!recipe) return null;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosmart.com";

    // Formatear tiempos a ISO 8601 (ej: 20 min -> PT20M)
    const formatIsoDuration = (minutes?: number) => {
        if (!minutes) return undefined;
        return `PT${minutes}M`;
    };

    const coverUrl = recipe.coverImage?.url
        ? recipe.coverImage.url.startsWith("http")
            ? recipe.coverImage.url
            : `https://strapi.platosmart.com${recipe.coverImage.url}`
        : undefined;

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        name: recipe.title,
        image: coverUrl ? [coverUrl] : undefined,
        author: {
            "@type": "Person",
            name: recipe.author?.name || "PlatoSmart",
        },
        datePublished: recipe.publishedAt || recipe.createdAt,
        description: recipe.description,
        prepTime: formatIsoDuration(recipe.prepTime),
        cookTime: formatIsoDuration(recipe.cookTime),
        totalTime: formatIsoDuration((recipe.prepTime || 0) + (recipe.cookTime || 0)),
        recipeCategory: recipe.category?.name,
        recipeYield: recipe.servings ? `${recipe.servings} porciones` : undefined,
        url: `${baseUrl}/recipes/${recipe.slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}