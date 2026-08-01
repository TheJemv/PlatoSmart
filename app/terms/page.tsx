// app/terms/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
    title: "Términos y Condiciones - PlatoSmart",
    description: "Términos de uso y condiciones del servicio de PlatoSmart.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
                    <header className="mb-10 text-center sm:text-left border-b pb-8">
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Términos y Condiciones
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </header>

                    <article className="space-y-8 text-muted-foreground leading-relaxed">
                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                1. Aceptación de los términos
                            </h2>
                            <p>
                                Al acceder y utilizar el sitio web de <strong>PlatoSmart</strong>, aceptas estar sujeto a los presentes Términos y Condiciones de uso. Si no estás de acuerdo con alguno de ellos, te solicitamos no utilizar nuestra plataforma.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                2. Propiedad Intelectual
                            </h2>
                            <p>
                                Todo el contenido publicado en este sitio web, incluyendo textos, recetas, fotografías, marcas y logotipos, es propiedad de PlatoSmart o de sus respectivos autores/chefs, y está protegido por las leyes de propiedad intelectual.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                3. Uso de Recetas y Contenido
                            </h2>
                            <p>
                                Las recetas y consejos compartidos en PlatoSmart son exclusivamente para uso personal y no comercial. Puedes compartir enlaces a nuestro sitio web, pero no está permitida la reproducción total o parcial de nuestro contenido sin autorización previa por escrito.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                4. Exención de Responsabilidad Culinaria
                            </h2>
                            <p>
                                PlatoSmart no se responsabiliza por reacciones alérgicas, intolerancias alimentarias o resultados indeseados al preparar las recetas. Se recomienda a los usuarios revisar cuidadosamente los ingredientes y adaptar las preparaciones a sus necesidades específicas.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                5. Modificaciones
                            </h2>
                            <p>
                                Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento sin previo aviso. Te recomendamos revisar esta página periódicamente.
                            </p>
                        </section>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}