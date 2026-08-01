// app/recipes/[slug]/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { FavoriteButton } from "@/components/favorite-button"; // <-- Importado
import { getRecipeBySlug } from "@/api/recipes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Users, Leaf, Share2, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pickCover } from "@/utils/media";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { RecipeJsonLd } from "@/utils/jsonLd";
import { SaveRecipeButton } from "@/components/save-recipe-button";
import { RecipeActions } from "@/components/recipe-actions";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params;
  const res = await getRecipeBySlug(slug);
  const recipe = res?.data?.[0];

  if (!recipe) {
    return { title: "Receta no encontrada - PlatoSmart" };
  }

  return {
    title: `${recipe.title} - PlatoSmart`,
    description: recipe.description || "Receta deliciosa en PlatoSmart",
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const res = await getRecipeBySlug(slug);
  const recipe = res?.data?.[0];

  if (!recipe) {
    notFound();
  }

  const cover = pickCover(recipe.coverImage);
  const avatar = pickCover(recipe.author?.avatar);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <RecipeJsonLd recipe={recipe} />

      <main className="flex-1">
        {/* Hero Image */}
        <section className="relative h-[50vh] lg:h-[60vh] bg-muted">
          {cover && (
            <Image
              src={cover.url}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              className="w-full h-full object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </section>

        {/* Recipe Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Inicio
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/recipes" className="hover:text-foreground transition-colors">
                  Recetas
                </Link>
                {recipe.category && (
                  <>
                    <ChevronRight className="h-4 w-4" />
                    <Link
                      href={`/categories/${recipe.category.slug}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {recipe.category.name}
                    </Link>
                  </>
                )}
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{recipe.title}</span>
              </nav>

              {/* Title and Meta */}
              <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {recipe.title}
                </h1>

                {/* Description */}
                {recipe.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {recipe.description}
                  </p>
                )}

                {/* Author */}
                {recipe.author && (
                  <div className="flex items-center gap-4 mb-6 w-fit">
                    {avatar ? (
                      <Image
                        src={avatar.url}
                        alt={avatar.alt}
                        width={avatar.width}
                        height={avatar.height}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {recipe.author.name?.charAt(0) ?? "A"}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{recipe.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(recipe.createdAt)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Recipe Stats */}
                <div className="flex flex-wrap gap-6 pb-6 border-b">
                  {recipe.prepTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Preparación</p>
                        <p className="font-medium text-foreground">{recipe.prepTime} min</p>
                      </div>
                    </div>
                  )}

                  {recipe.cookTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Cocción</p>
                        <p className="font-medium text-foreground">{recipe.cookTime} min</p>
                      </div>
                    </div>
                  )}

                  {recipe.servings && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Porciones</p>
                        <p className="font-medium text-foreground">{recipe.servings} personas</p>
                      </div>
                    </div>
                  )}

                  {recipe.difficulty && (
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dificultad</p>
                        <p className="font-medium text-foreground capitalize">
                          {recipe.difficulty}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <RecipeActions
                  slug={recipe.slug}
                  title={recipe.title}
                  description={recipe.description}
                />
              </div>

              {/* Recipe Grid (Ingredients & Instructions) */}
              <div className="grid lg:grid-cols-3 gap-12 mt-8">
                {/* Ingredients */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-secondary/30 rounded-xl p-6">
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                      Ingredientes
                    </h2>
                    <ul className="space-y-3">
                      {recipe.ingredients?.map((ingredient: any) => (
                        <li key={ingredient.id} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-foreground">
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructions */}
                <div className="lg:col-span-2">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Instrucciones
                  </h2>
                  <ol className="space-y-6">
                    {recipe.steps
                      ?.sort((a: any, b: any) => a.order - b.order)
                      .map((step: any) => (
                        <li key={step.id} className="flex gap-4">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                            {step.order}
                          </span>
                          <p className="text-foreground leading-relaxed pt-1">
                            {step.instruction}
                          </p>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}