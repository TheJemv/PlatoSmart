// app/privacy/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
    title: "Política de Privacidad - PlatoSmart",
    description: "Información sobre cómo recopilamos, usamos y protegemos tus datos personales en PlatoSmart.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
                    <header className="mb-10 text-center sm:text-left border-b pb-8">
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Política de Privacidad
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </header>

                    <article className="space-y-8 text-muted-foreground leading-relaxed">
                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                1. Información que recopilamos
                            </h2>
                            <p>
                                En <strong>PlatoSmart</strong> respetamos tu privacidad. Recopilamos información personal únicamente cuando te suscribes voluntariamente a nuestro boletín de noticias (Newsletter) o te pones en contacto con nosotros. Esta información incluye:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Nombre completo</li>
                                <li>Dirección de correo electrónico</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                2. Uso de la información
                            </h2>
                            <p>
                                La información que nos proporcionas se utiliza exclusivamente para:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Enviarte nuestras últimas recetas, artículos culinarios y novedades del sitio.</li>
                                <li>Responder a tus consultas o comentarios enviados a través de nuestros formularios.</li>
                                <li>Mejorar la experiencia general de navegación en nuestra plataforma.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                3. Protección de datos
                            </h2>
                            <p>
                                Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra accesos no autorizados, alteración, divulgación o destrucción. Nunca venderemos, alquilaremos ni compartiremos tus datos personales con terceros para fines comerciales.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                4. Cancelación de suscripción
                            </h2>
                            <p>
                                Puedes cancelar tu suscripción a nuestro boletín en cualquier momento enviándonos un mensaje desde nuestro formulario de contacto o utilizando el enlace de cancelación presente al final de nuestros correos electrónicos.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-foreground">
                                5. Contacto
                            </h2>
                            <p>
                                Si tienes alguna duda sobre esta Política de Privacidad o el tratamiento de tus datos, puedes escribirnos directamente a través de nuestra página de contacto.
                            </p>
                        </section>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}