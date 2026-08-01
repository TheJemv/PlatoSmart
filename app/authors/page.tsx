// app/authors/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { getAllAuthors } from "@/api/authors";
import { BookOpen, Utensils, ArrowRight } from "lucide-react";
import { Author, StrapiBlock } from "@/types";

// Extraer un resumen de texto plano desde los bloques de la Bio
function getBioSnippet(bio: StrapiBlock[] | string | undefined): string {
    if (!bio) return "";
    if (typeof bio === "string") return bio;

    const firstParagraph = bio.find((block) => block.type === "paragraph");
    if (!firstParagraph || !firstParagraph.children) return "";

    const text = firstParagraph.children.map((c) => c.text).join("");
    // Limpiar asteriscos de markdown para la tarjeta previa
    return text.replace(/\*\*/g, "").replace(/\*/g, "");
}

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAuthors() {
            try {
                const res = await getAllAuthors();
                if (res?.data) {
                    setAuthors(res.data);
                }
            } catch (err) {
                console.error("Error al cargar la lista de autores:", err);
            } finally {
                setLoading(false);
            }
        }
        loadAuthors();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 lg:py-24 bg-secondary/30 border-b">
                    <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-4">
                            <Utensils className="h-4 w-4" /> Equipo Culinario
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            Nuestros Chefs y Autores
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Conoce a las mentes creativas detrás de las recetas de PlatoSmart.
                            Apasionados de la cocina listos para compartir sus mejores trucos y platos favoritos.
                        </p>
                    </div>
                </section>

                {/* Authors Grid Section */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
                                ))}
                            </div>
                        ) : authors.length === 0 ? (
                            <div className="text-center py-16 border rounded-2xl bg-card">
                                <p className="text-muted-foreground text-lg">
                                    No se encontraron autores disponibles en este momento.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {authors.map((author) => {
                                    const avatarUrl = author.avatar?.url
                                        ? author.avatar.url.startsWith("http")
                                            ? author.avatar.url
                                            : `https://strapi.platosmart.com${author.avatar.url}`
                                        : null;

                                    const recipeCount = author.recipes?.length || 0;
                                    const bioSnippet = getBioSnippet(author.bio);

                                    return (
                                        <Link
                                            key={author.id}
                                            href={`/authors/${author.slug}`}
                                            className="group bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center hover:border-primary/50"
                                        >
                                            <div className="flex flex-col items-center w-full">
                                                {/* Avatar */}
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-md bg-muted mb-4 group-hover:scale-105 transition-transform duration-300">
                                                    {avatarUrl ? (
                                                        <Image
                                                            src={avatarUrl}
                                                            alt={author.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center font-serif text-3xl font-bold text-primary/40">
                                                            {author.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Nombre y Cantidad de Recetas */}
                                                <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                                                    {author.name}
                                                </h2>

                                                <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full mb-4">
                                                    <BookOpen className="h-3.5 w-3.5" />
                                                    <span>
                                                        {recipeCount} {recipeCount === 1 ? "receta" : "recetas"}
                                                    </span>
                                                </div>

                                                {/* Resumen Bio */}
                                                {bioSnippet && (
                                                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                                                        {bioSnippet}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Footer de la tarjeta */}
                                            <div className="w-full pt-4 border-t flex items-center justify-center gap-2 text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                                <span>Ver Perfil y Recetas</span>
                                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                <Newsletter />
            </main>

            <Footer />
        </div>
    );
}