import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";
import type { Locale } from "@/types/movie";

interface SearchConfig {
  value: string;
  onChange: (q: string) => void;
  placeholder: string;
}

interface HeaderProps {
  search?: SearchConfig;
}

export function Header({ search }: HeaderProps) {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha dropdown de idioma ao clicar fora
  useEffect(() => {
    if (!langOpen) return;
    const onDoc = () => setLangOpen(false);
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [langOpen]);

  function toggleSearch() {
    const next = !searchActive;
    setSearchActive(next);
    if (next) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    } else {
      search?.onChange("");
    }
  }

  function pickLang(l: Locale) {
    setLocale(l);
    setLangOpen(false);
  }

  return (
    <header className={`header${scrolled || menuOpen ? " scrolled" : ""}`} id="mainHeader">
      <div className="header-container">
        <div>
          <Link to="/inicio">
            <img className="logo" src="/assets/logo.png" alt="Sandlerflix" />
          </Link>
        </div>

        <nav className={`main-nav${menuOpen ? " active" : ""}`} aria-label="Navegação principal">
          <ul>
            <li>
              <NavLink
                to="/inicio"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {t("nav-home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/filmes"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {t("nav-movies")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categorias"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {t("nav-categories")}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-right">
          {search && (
            <div className={`search-box${searchActive ? " active" : ""}`}>
              <i
                className="fas fa-search"
                aria-hidden="true"
                role="button"
                tabIndex={0}
                aria-label={search.placeholder}
                onClick={toggleSearch}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSearch();
                  }
                }}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                placeholder={search.placeholder}
                aria-label={search.placeholder}
              />
            </div>
          )}

          <div
            className={`lang-switcher${langOpen ? " open" : ""}`}
            id="langSwitcher"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lang-selected"
              id="langSelected"
              aria-label="Selecionar idioma"
              onClick={() => setLangOpen((v) => !v)}
            >
              <span id="langSelectedText">{locale.toUpperCase()}</span>
              <i className="fas fa-chevron-down lang-arrow" aria-hidden="true" />
            </button>
            <ul className="lang-options" id="langOptions" role="listbox">
              <li
                className={`lang-option${locale === "pt" ? " active" : ""}`}
                role="option"
                aria-selected={locale === "pt"}
                onClick={() => pickLang("pt")}
              >
                Português
              </li>
              <li
                className={`lang-option${locale === "en" ? " active" : ""}`}
                role="option"
                aria-selected={locale === "en"}
                onClick={() => pickLang("en")}
              >
                English
              </li>
            </ul>
          </div>

          <div className="profile">
            <img src="/assets/avatar.webp" alt="Perfil" />
          </div>
        </div>

        <div
          className="mobile-menu-btn"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          role="button"
          tabIndex={0}
          onClick={() => setMenuOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setMenuOpen((v) => !v);
            }
          }}
        >
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
