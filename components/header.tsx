// components/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/recipes", label: "Recipes" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="font-serif text-xl font-bold tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  PlatoSmart
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === link.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centered Navigation - Desktop */}
        <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
          {/* Primeros 3 enlaces a la izquierda del Logo */}
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Logo en el centro */}
          <Link
            href="/"
            className="mx-6 font-serif text-2xl font-semibold tracking-wide text-foreground"
          >
            PlatoSmart
          </Link>

          {/* Ultimos 3 enlaces a la derecha del Logo */}
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Logo */}
        <Link
          href="/"
          className="md:hidden font-serif text-xl font-semibold tracking-wide text-foreground"
        >
          PlatoSmart
        </Link>

        {/* Derecha: Botón de Recetas Guardadas (/saved) */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
              "relative transition-colors hover:text-red-500",
              pathname === "/saved" ? "text-red-500 bg-red-50/50" : "text-muted-foreground"
            )}
          >
            <Link href="/saved" aria-label="Ver recetas guardadas">
              <Heart
                className={cn(
                  "h-5 w-5 transition-transform hover:scale-110",
                  pathname === "/saved" && "fill-current"
                )}
              />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}