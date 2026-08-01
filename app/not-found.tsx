// app/not-found.tsx
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Utensils, Home, BookOpen } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center py-20 px-4">
                <div className="text-center max-w-lg mx-auto">
                    {/* Badge & Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                        <Utensils className="h-10 w-10" />
                    </div>

                    <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-4">
                        404
                    </h1>

                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
                        ¡Esta receta no está en el menú!
                    </h2>

                    <p className="text-muted-foreground text-base leading-relaxed mb-8">
                        Lo sentimos, la página que estás buscando no existe, ha sido movida o la receta fue retiradas de la cocina.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                            <Link href="/">
                                <Home className="h-4 w-4" /> Ir al Inicio
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link href="/recipes">
                                <BookOpen className="h-4 w-4" /> Ver Recetas
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}