// app/categories/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { getCategories } from "@/api/categories";
import { pickCover } from "@/utils/media";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Utensils } from "lucide-react";

export const metadata = {
  title: "Categorías Culinarias - PlatoSmart",
  description: "Explora todas las categorías de recetas en PlatoSmart.",
};

export default async function CategoriesPage() {
  const res = await getCategories();
  const categories = res?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Categorías</span>
            </nav>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Categorías Culinarias
            </h1>
            <p className="text-lg text-muted-foreground">
              Explora nuestra colección organizada por tipos de plato y estilos de cocina.
            </p>
          </div>

          {/* Grid de Categorías */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => {
              // Extraemos la portada oficial de la categoría (coverImage)
              const cover = pickCover(category.coverImage);
              const recipeCount = category.recipes?.length || 0;

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-card border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-video relative bg-muted overflow-hidden">
                    {cover ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt || category.name}
                        width={cover.width || 800}
                        height={cover.height || 600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                        <Utensils className="h-12 w-12 opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {recipeCount} {recipeCount === 1 ? "receta" : "recetas"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center text-sm font-medium text-primary">
                      Ver recetas{" "}
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}