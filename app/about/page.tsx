// app/about/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { getAboutData } from "@/api/about";
import { getAllAuthors } from "@/api/authors";
import { pickCover } from "@/utils/media";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { RecentRecipesCarousel } from "@/components/recent-recipes-carousel";

export const metadata = {
  title: "Sobre Nosotros - PlatoSmart",
  description: "Conoce más sobre PlatoSmart y el equipo detrás de nuestras recetas.",
};

// Helper para extraer texto plano de la Bio (evita el error 'Objects are not valid as a React child')
function getBioText(bio: any): string {
  if (!bio) return "";
  if (typeof bio === "string") return bio;
  if (Array.isArray(bio)) {
    return bio
      .map((block) => {
        if (block.type === "paragraph" && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .filter(Boolean)
      .join(" ")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "");
  }
  return "";
}

export default async function AboutPage() {
  const [aboutRes, authorsRes] = await Promise.all([
    getAboutData(),
    getAllAuthors(),
  ]);

  const about = aboutRes?.data;
  const authors = authorsRes?.data || [];
  const blocks = about?.blocks || [];

  const firstMediaBlock = blocks.find((b: any) => b.__component === "shared.media");
  const heroImage = pickCover(firstMediaBlock?.file);

  const contentBlocks = blocks.filter(
    (b: any) => b.id !== firstMediaBlock?.id || b.__component !== "shared.media"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-muted">
          <div className="absolute inset-0 z-0">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.alt || "About PlatoSmart"}
                width={heroImage.width || 1600}
                height={heroImage.height || 800}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=800&fit=crop"
                alt="Kitchen scene"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {about?.title || "Sobre PlatoSmart"}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Nos apasiona hacer que la cocina sea accesible, divertida y deliciosa para todos.
            </p>
          </div>
        </section>

        {/* Dynamic Zone Rendering */}
        {contentBlocks.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
              {contentBlocks.map((block: any, index: number) => {
                const uniqueKey = `${block.__component}-${block.id || index}-${index}`;

                switch (block.__component) {
                  case "shared.rich-text":
                    return (
                      <div key={uniqueKey} className="mb-12">
                        <ReactMarkdown
                          components={{
                            h2: ({ children }) => (
                              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8">
                                {children}
                              </h2>
                            ),
                            p: ({ children }) => (
                              <p className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="space-y-3 my-4 pl-1">
                                {children}
                              </ul>
                            ),
                            li: ({ children }) => (
                              <li className="text-muted-foreground leading-relaxed text-base md:text-lg list-none relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                                {children}
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-foreground">
                                {children}
                              </strong>
                            ),
                          }}
                        >
                          {block.body}
                        </ReactMarkdown>
                      </div>
                    );

                  case "shared.quote":
                    return (
                      <blockquote
                        key={uniqueKey}
                        className="border-l-4 border-primary pl-6 my-10 italic text-xl text-foreground font-serif bg-secondary/20 py-4 rounded-r-lg"
                      >
                        "{block.title || block.body}"
                      </blockquote>
                    );

                  case "shared.media": {
                    const mediaImg = pickCover(block.file);
                    if (!mediaImg) return null;
                    return (
                      <div
                        key={uniqueKey}
                        className="my-10 rounded-2xl overflow-hidden shadow-lg bg-muted"
                      >
                        <Image
                          src={mediaImg.url}
                          alt={mediaImg.alt || "Imagen del artículo"}
                          width={mediaImg.width || 1200}
                          height={mediaImg.height || 675}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    );
                  }

                  default:
                    return null;
                }
              })}
            </div>
          </section>
        )}

        {/* Sección de Autores/Equipo */}
        {authors.length > 0 && (
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nuestro Equipo
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Las personas detrás de PlatoSmart que trabajan para traer las mejores recetas.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {authors.map((author: any) => {
                  const avatar = pickCover(author.avatar);
                  const bioText = getBioText(author.bio);

                  return (
                    <Link
                      key={author.id}
                      href={`/authors/${author.slug}`}
                      className="group bg-card rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="aspect-square relative bg-muted">
                        {avatar ? (
                          <Image
                            src={avatar.url}
                            alt={avatar.alt || author.name}
                            width={avatar.width || 400}
                            height={avatar.height || 400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-primary bg-primary/10">
                            {author.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {author.name}
                        </h3>
                        {bioText && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {bioText}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Sé parte de la familia PlatoSmart. Descubre nuevas ideas culinarias y comparte la pasión por cocinar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link href="/recipes">Explorar Recetas</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Carrusel de Últimas Recetas */}
        <RecentRecipesCarousel />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}