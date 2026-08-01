import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { RecipeCard } from "@/components/recipe-card";
import { getCategoryBySlug, getCategories } from "@/api/categories";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Utensils } from "lucide-react";
import { pickCover } from "@/utils/media";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const res = await getCategoryBySlug(slug);
  const category = res?.data?.[0];

  if (!category) {
    return { title: "Categoría no encontrada - PlatoSmart" };
  }

  return {
    title: `Recetas de ${category.name} - PlatoSmart`,
    description: category.description || `Descubre deliciosas recetas de ${category.name.toLowerCase()} en PlatoSmart.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Consultar la categoría actual y todas las categorías para la sección inferior
  const [categoryRes, allCategoriesRes] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  const category = categoryRes?.data?.[0];

  if (!category) {
    notFound();
  }

  const recipes = category.recipes || [];
  const otherCategories = (allCategoriesRes?.data || []).filter((c) => c.slug !== slug);

  // Usar la portada de la primera receta como hero image de la categoría
  const firstRecipeCover = pickCover(recipes[0]?.coverImage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-muted">
          <div className="absolute inset-0 z-0">
            {firstRecipeCover ? (
              <Image
                src={firstRecipeCover.url}
                alt={firstRecipeCover.alt || category.name}
                width={firstRecipeCover.width}
                height={firstRecipeCover.height}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <Utensils className="h-24 w-24 text-primary/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/categories" className="hover:text-white transition-colors">
                Categorías
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-white/80 max-w-2xl">{category.description}</p>
            )}
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {recipes.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-8">
                  Mostrando {recipes.length} {recipes.length === 1 ? "receta" : "recetas"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  Aún no hay recetas guardadas en esta categoría.
                </p>
                <Link href="/recipes" className="text-primary font-medium hover:underline">
                  Explorar todas las recetas
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        {otherCategories.length > 0 && (
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                Explorar Otras Categorías
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {otherCategories.slice(0, 4).map((cat) => {
                  const catCover = pickCover(cat.recipes?.[0]?.coverImage);

                  return (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="group relative aspect-video rounded-lg overflow-hidden bg-muted"
                    >
                      {catCover ? (
                        <Image
                          src={catCover.url}
                          alt={catCover.alt || cat.name}
                          width={catCover.width}
                          height={catCover.height}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <Utensils className="h-8 w-8 text-primary/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="font-serif text-sm md:text-base font-semibold text-white">
                          {cat.name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}