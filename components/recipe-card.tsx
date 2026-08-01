import Link from "next/link";
import { Clock, Leaf, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types";
import MyImage from "./image";
import { formatDate } from "@/utils/formatDate";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "featured";
  className?: string;
}

export function RecipeCard({ recipe, variant = "default", className }: RecipeCardProps) {
  // Manejo de la imagen de portada
  const coverImage = recipe.coverImage;

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className={cn(
        "group block",
        variant === "featured" && "md:flex md:gap-6 md:items-start",
        className
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted",
          variant === "default" && "aspect-4/3",
          variant === "featured" && "aspect-4/3 md:aspect-3/2 md:w-1/2"
        )}
      >
        {coverImage ? (
          <MyImage
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            cover={coverImage}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {recipe.difficulty && (
            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded capitalize">
              <Zap className="h-3 w-3" />
              {recipe.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "mt-4",
          variant === "featured" && "md:mt-0 md:w-1/2 md:py-2"
        )}
      >
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          {recipe.cookTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {recipe.cookTime} mins
            </span>
          )}
          {recipe.category && (
            <span className="flex items-center gap-1">
              <Leaf className="h-3.5 w-3.5" />
              {recipe.category.name}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2",
            variant === "default" && "text-base",
            variant === "featured" && "text-lg md:text-xl"
          )}
        >
          {recipe.title}
        </h3>

        {/* Description - Only for featured */}
        {variant === "featured" && recipe.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {recipe.description}
          </p>
        )}

        {/* Author - Only for featured (Protección con Optional Chaining) */}
        {variant === "featured" && recipe.author && (
          <div className="flex items-center gap-3 mt-4">
            {recipe.author.avatar ? (
              <MyImage
                cover={recipe.author.avatar}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {recipe.author.name?.charAt(0) ?? "A"}
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-foreground">{recipe.author.name}</p>
              <p className="text-xs text-muted-foreground">{formatDate(recipe.createdAt)}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}