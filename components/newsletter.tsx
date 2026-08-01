// components/newsletter.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSubscriber } from "@/api/subscribers";

interface NewsletterProps {
  title?: React.ReactNode;
  buttonText?: string;
  className?: string;
}

export function Newsletter({
  title = (
    <>
      Get My <span className="underline underline-offset-4 decoration-primary">Free</span> Cookbook Today!
    </>
  ),
  buttonText = "Subscribe",
  className = "",
}: NewsletterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await createSubscriber(name, email);

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 4000);
    } else {
      setErrorMessage(res.message || "Error al suscribir");
    }
  };

  return (
    <section className={`bg-secondary py-6 px-4 ${className}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <h2 className="text-lg font-medium text-foreground text-center md:text-left">
            {title}
          </h2>

          {isSubmitted ? (
            <p className="text-sm text-emerald-600 font-medium animate-in fade-in duration-300">
              ¡Gracias por suscribirte!
            </p>
          ) : (
            <div className="flex flex-col items-center gap-1 w-full max-w-md">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <Input
                  type="text"
                  placeholder="Your Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label="Your Name"
                  className="bg-background border-border/50"
                />
                <Input
                  type="email"
                  placeholder="Your Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Your Email"
                  className="bg-background border-border/50"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-foreground text-background hover:bg-foreground/90 uppercase tracking-wider text-sm px-6 shrink-0"
                >
                  {isSubmitting ? "Sending..." : buttonText}
                </Button>
              </form>
              {errorMessage && (
                <p className="text-xs text-destructive mt-1 font-medium">{errorMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}