import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { t, locale, toggleLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha o menu mobile ao passar para desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => mql.matches && setMenuOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const links = [
    { href: "#top", label: t("nav.home") },
    { href: "#movies", label: t("nav.movies") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-sticky h-header transition-colors duration-300",
        scrolled || menuOpen
          ? "bg-bg/95 backdrop-blur-sm"
          : "bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <div className="page-gutter flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="font-display text-3xl leading-none tracking-wider text-primary sm:text-4xl"
          >
            SANDLERFLIX
          </a>
          <nav className="hidden items-center gap-5 md:flex" aria-label="Principal">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-sm text-content-secondary transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t("nav.search")}
            className="grid h-10 w-10 place-items-center rounded-full text-lg text-white transition hover:bg-bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ⌕
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-base border border-line-hover px-2.5 py-1 font-body text-xs font-semibold uppercase text-white transition hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t("lang.toggle")}
          >
            {locale === "pt" ? "EN" : "PT"}
          </button>

          {/* hambúrguer — só no mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-xl text-white transition hover:bg-bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="page-gutter absolute inset-x-0 top-header border-t border-line bg-bg/98 py-2 backdrop-blur-sm md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-line/60 py-3 font-body text-base text-content transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
