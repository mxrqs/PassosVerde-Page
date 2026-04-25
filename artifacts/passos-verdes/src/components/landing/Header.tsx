import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo-passos-verdes.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el =
      document.getElementById("inscricao") ??
      document.getElementById("lead-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group"
            aria-label="Passos Verdes"
          >
            <img
              src={logo}
              alt="Passos Verdes"
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:-rotate-3"
            />
            <span className="hidden sm:inline-block text-base md:text-lg font-extrabold tracking-tight text-foreground">
              Passos<span className="text-primary">Verdes</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a
              href="#como-funciona"
              className="hover:text-foreground transition-colors"
            >
              Como funciona
            </a>
            <a
              href="#depoimentos"
              className="hover:text-foreground transition-colors"
            >
              Alunos
            </a>
            <a
              href="#planos"
              className="hover:text-foreground transition-colors"
            >
              Planos
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              Dúvidas
            </a>
          </nav>

          <a
            href="#inscricao"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold text-primary-foreground shadow-sm hover:shadow-md hover:brightness-105 transition-all"
          >
            Começar agora
          </a>
        </div>
      </div>
    </motion.header>
  );
}
