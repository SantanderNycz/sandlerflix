import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/types/movie";
import { messages, type MessageKey } from "./messages";

const STORAGE_KEY = "sandlerflix:locale";

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  /** Tradução de chave estática. */
  t: (key: MessageKey) => string;
  /** Tradução de chave que recebe contagem (ex: resultados). */
  tn: (key: MessageKey, n: number) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* localStorage indisponível (ex: modo privado) — ignora */
  }
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "pt";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignora falha de persistência */
    }
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "pt" ? "en" : "pt")),
    [],
  );

  const value = useMemo<I18nValue>(() => {
    const dict = messages[locale];
    return {
      locale,
      setLocale,
      toggleLocale,
      t: (key) => {
        const v = dict[key];
        return typeof v === "function" ? key : v;
      },
      tn: (key, n) => {
        const v = dict[key];
        return typeof v === "function" ? v(n) : v;
      },
    };
  }, [locale, setLocale, toggleLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n deve ser usado dentro de <I18nProvider>");
  return ctx;
}
