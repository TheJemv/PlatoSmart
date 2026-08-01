"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types";
import MyImage from "./image";
import { formatDate } from "@/utils/formatDate";

interface HeroProps {
  featuredRecipes?: Recipe[];
}

export function Hero({ featuredRecipes = [] }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Si no hay recetas guardadas, mostramos un fallback para evitar errores
  if (!featuredRecipes || featuredRecipes.length === 0) {
    return null;
  }

  const recipe = featuredRecipes[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredRecipes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredRecipes.length) % featuredRecipes.length);
  };

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Slide Indicators */}
            {featuredRecipes.length > 1 && (
              <div className="hidden lg:flex flex-col gap-3 mb-8">
                {featuredRecipes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className={`text-sm font-medium ${currentSlide === index ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-0.5 transition-all duration-300 ${currentSlide === index
                          ? "w-12 bg-foreground"
                          : "w-6 bg-muted-foreground/50 group-hover:w-8"
                        }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {recipe.cookTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {recipe.cookTime} minutos
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                {recipe.category?.name ?? "Cocina & Tips"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {recipe.title}
            </h1>

            {/* Description */}
            {recipe.description && (
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-8 line-clamp-3">
                {recipe.description}
              </p>
            )}

            {/* Author (Protección con Optional Chaining) */}
            {recipe.author && (
              <div className="flex items-center gap-4 mb-8">
                {recipe.author.avatar ? (
                  <MyImage
                    cover={recipe.author.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground">
                    {recipe.author.name?.charAt(0) ?? "A"}
                  </div>
                )}

                <div>
                  <p className="font-medium text-foreground">{recipe.author.name}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(recipe.createdAt)}</p>
                </div>
              </div>
            )}

            <Link href={`/recipes/${recipe.slug}`}>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Ver Receta Completa
              </Button>
            </Link>

            {/* Mobile Navigation */}
            {featuredRecipes.length > 1 && (
              <div className="flex lg:hidden items-center gap-4 mt-8">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentSlide + 1} / {featuredRecipes.length}
                </span>
                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-muted">
              {recipe.coverImage ? (
                <MyImage
                  cover={recipe.coverImage}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sin imagen
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-0 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}