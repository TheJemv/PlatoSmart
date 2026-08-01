// app/authors/[slug]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { getAuthorBySlug, AuthorData, StrapiBlock } from "@/api/authors";
import { getRecipesByAuthor } from "@/api/recipes";
import { Recipe } from "@/types";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Utensils, Mail } from "lucide-react";

import { renderStrapiBlocks } from "@/components/renderStrapiBlocks"

export default function AuthorDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [author, setAuthor] = useState<AuthorData | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // Cargar perfil del autor
    useEffect(() => {
        async function loadAuthor() {
            try {
                const res = await getAuthorBySlug(slug);
                if (res?.data && res.data.length > 0) {
                    setAuthor(res.data[0]);
                }
            } catch (err) {
                console.error("Error al cargar autor:", err);
            }
        }
        loadAuthor();
    }, [slug]);

    // Cargar recetas del autor (paginadas de 10 en 10)
    useEffect(() => {
        async function loadAuthorRecipes() {
            setLoading(true);
            try {
                const res = await getRecipesByAuthor(slug, page, 10);
                if (res?.data) {
                    setRecipes(res.data);
                    if (res.meta?.pagination) {
                        setTotalPages(res.meta.pagination.pageCount);
                    }
                }
            } catch (err) {
                console.error("Error al cargar recetas del autor:", err);
            } finally {
                setLoading(false);
            }
        }
        loadAuthorRecipes();
    }, [slug, page]);

    if (!author && !loading) {
        return (
            <div className="min-h-screen flex flex-col justify-between bg-background">
                <Header />
                <div className="container mx-auto px-4 py-24 text-center">
                    <h1 className="font-serif text-3xl font-bold mb-4">Autor no encontrado</h1>
                    <Button asChild>
                        <Link href="/recipes">Volver a Recetas</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const avatarUrl = author?.avatar?.url
        ? author.avatar.url.startsWith("http")
            ? author.avatar.url
            : `https://strapi.platosmart.com${author.avatar.url}`
        : null;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Author Profile Header */}
                <section className="py-12 lg:py-16 bg-secondary/30 border-b">
                    <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 text-center sm:text-left">

                            {/* Avatar */}
                            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-background shadow-md bg-muted shrink-0">
                                {avatarUrl ? (
                                    <Image
                                        src={avatarUrl}
                                        alt={author?.name || "Autor"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-serif text-4xl font-bold text-primary/40">
                                        {author?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Informacion del Autor */}
                            <div className="space-y-3 flex-1">
                                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    <Utensils className="h-3.5 w-3.5" /> Chef / Autor
                                </div>

                                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                                    {author?.name}
                                </h1>

                                {/* Bio (Rich Text Blocks) */}
                                <div className="max-w-2xl text-sm md:text-base">
                                    {renderStrapiBlocks(author?.bio)}
                                </div>

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        {recipes.length} {recipes.length === 1 ? "Receta publicada" : "Recetas publicadas"}
                                    </span>

                                    {author?.email && (
                                        <a
                                            href={`mailto:${author.email}`}
                                            className="flex items-center gap-1.5 hover:text-primary transition-colors"
                                        >
                                            <Mail className="h-4 w-4 text-primary" />
                                            {author.email}
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Recipes Grid Section */}
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                            Recetas de {author?.name}
                        </h2>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
                                ))}
                            </div>
                        ) : recipes.length === 0 ? (
                            <div className="text-center py-12 border rounded-2xl bg-card">
                                <p className="text-muted-foreground">Este autor aún no tiene recetas publicadas.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {recipes.map((recipe: any) => {
                                    const cover = recipe.coverImage;
                                    const coverUrl = cover?.url
                                        ? cover.url.startsWith("http")
                                            ? cover.url
                                            : `https://strapi.platosmart.com${cover.url}`
                                        : null;

                                    return (
                                        <Link
                                            key={recipe.id}
                                            href={`/recipes/${recipe.slug}`}
                                            className="group bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col"
                                        >
                                            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                                                {coverUrl ? (
                                                    <Image
                                                        src={coverUrl}
                                                        alt={recipe.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif">
                                                        PlatoSmart
                                                    </div>
                                                )}
                                                {recipe.category && (
                                                    <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1 rounded-full border shadow-sm">
                                                        {recipe.category.name}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                                                <div>
                                                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                        {recipe.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                                                        {recipe.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                                                    {recipe.prepTime && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5" /> Prep: {recipe.prepTime} min
                                                        </span>
                                                    )}
                                                    {recipe.cookTime && (
                                                        <span className="flex items-center gap-1">
                                                            <Utensils className="h-3.5 w-3.5" /> Cocción: {recipe.cookTime} min
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-3 mt-12">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="gap-1"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Anterior
                                </Button>

                                <span className="text-sm font-medium text-muted-foreground px-2">
                                    Página {page} de {totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="gap-1"
                                >
                                    Siguiente <ChevronRight className="h-4 w-4" />
                                </Button>
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