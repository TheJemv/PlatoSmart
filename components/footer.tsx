// components/footer.tsx
import Link from "next/link";

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/recipes", label: "Recipes" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalNavLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border/10">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* Brand Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity"
          >
            PlatoSmart
          </Link>

          {/* Main Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-background/70 hover:text-background transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="w-12 h-px bg-background/20 my-2" />

          {/* Bottom Bar: Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl gap-4 text-xs text-background/50">
            <p>
              © {new Date().getFullYear()} PlatoSmart. All rights reserved.
            </p>

            <div className="flex gap-6">
              {legalNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}