// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, BookOpen, Camera } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { RecipeCard } from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import MyImage from "@/components/image";

import { getRecipes } from "@/api/recipes";
import { getCategories } from "@/api/categories";
import { getGlobalSEO } from "@/api/global";
import { pickCover } from "@/utils/media";
import { formatDate } from "@/utils/formatDate";

// app/layout.tsx (o app/page.tsx)
import { getStrapiURL } from "@/utils/media";

export async function generateMetadata() {
  const globalRes = await getGlobalSEO();
  const globalData = globalRes?.data;
  const seo = globalData?.defaultSeo;

  // Extraemos la URL del favicon devuelta por Strapi
  const faviconUrl = globalData?.favicon?.url
    ? getStrapiURL(globalData.favicon.url)
    : "/favicon.ico"; // Fallback local si no hay favicon cargado en Strapi

  return {
    title: seo?.metaTitle || globalData?.siteName || "PlatoSmart",
    description: seo?.metaDescription || globalData?.siteDescription || "Recetas de cocina",
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export default async function HomePage() {
  // Peticiones paralelas a los módulos de API
  const [recipesRes, categoriesRes] = await Promise.all([
    getRecipes(1, 12),
    getCategories(),
  ]);

  const recipes = recipesRes?.data ?? [];
  const categoriesList = categoriesRes?.data ?? [];

  // Clasificación de recetas para las distintas secciones
  const heroRecipes = recipes.slice(0, 2);
  const latestRecipes = recipes.slice(0, 4);
  const featuredRecipe = recipes[0];
  const moreRecipes = recipes.slice(4, 8);

  const featuredCover = featuredRecipe ? pickCover(featuredRecipe.coverImage) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero featuredRecipes={heroRecipes} />

        {/* Newsletter */}
        <Newsletter />

        {/* Latest Recipes Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Latest Recipes
              </h2>
              <Link
                href="/recipes"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {latestRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Recipe - Large */}
        {featuredRecipe && (
          <section className="py-16 lg:py-24 bg-secondary/50">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  {featuredCover ? (
                    <Image
                      src={featuredCover.url}
                      alt={featuredRecipe.title}
                      width={featuredCover.width}
                      height={featuredCover.height}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Sin Imagen</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded">
                      Editor's Pick
                    </span>
                  </div>
                </div>

                <div className="lg:py-8">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span>{featuredRecipe.cookTime} minutos</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{featuredRecipe.category?.name ?? "Recetas"}</span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {featuredRecipe.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredRecipe.description}
                  </p>

                  {featuredRecipe.author && (
                    <div className="flex items-center gap-4 mb-8">
                      <MyImage
                        cover={featuredRecipe.author.avatar}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          {featuredRecipe.author.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(featuredRecipe.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  <Link href={`/recipes/${featuredRecipe.slug}`}>
                    <Button className="bg-foreground text-background hover:bg-foreground/90">
                      Leer Receta
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Popular This Week */}
        {featuredRecipe && (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10">
                Popular This Week
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                <RecipeCard recipe={featuredRecipe} variant="featured" />
                <div className="grid sm:grid-cols-2 gap-6">
                  {latestRecipes.slice(0, 2).map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Community Section */}
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              PlatoSmart Community
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our community of food lovers sharing recipes, tips, and culinary inspiration.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">186,281</span>
                <span className="text-muted-foreground">users</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">18,853</span>
                <span className="text-muted-foreground">recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">1,433,915</span>
                <span className="text-muted-foreground">photos</span>
              </div>
            </div>

            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
                Join Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Categories Preview */}
        {categoriesList.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Explorar por Categoría
                </h2>
                <Link
                  href="/categories"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Todas las categorías
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {categoriesList.slice(0, 4).map((category: any) => {
                  // Extraemos la URL directa ignorando abstracciones por si acaso
                  const rawCover = category.coverImage;
                  const rawUrl = rawCover?.url || rawCover?.data?.attributes?.url;

                  const imageUrl = rawUrl
                    ? rawUrl.startsWith("http")
                      ? rawUrl
                      : `https://strapi.platosmart.com${rawUrl}`
                    : null;

                  const recipeCount = Array.isArray(category.recipes)
                    ? category.recipes.length
                    : 0;

                  return (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-muted shadow-sm hover:shadow-md transition-all"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={category.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center font-serif text-3xl font-bold text-primary/40">
                          {category.name?.charAt(0)}
                        </div>
                      )}

                      {/* Overlay oscuro */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                      {/* Texto */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="font-serif text-lg md:text-xl font-semibold text-white group-hover:text-primary-foreground transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white/70">
                          {recipeCount} {recipeCount === 1 ? "receta" : "recetas"}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* More Recipes */}
        {moreRecipes.length > 0 && (
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-10">
                More Delicious Recipes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {moreRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/recipes">
                  <Button variant="outline" size="lg" className="uppercase tracking-wider">
                    View All Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}