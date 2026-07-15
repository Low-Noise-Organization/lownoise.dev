"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Language } from "./i18n";
import { t as translations } from "./i18n";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultT = (key: string): string => {
  const entry = (translations as Record<string, Record<string, string>>)[key];
  return entry?.en || key;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  language: "en",
  toggleTheme: () => {},
  setLanguage: () => {},
  t: defaultT,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const storedLang = localStorage.getItem("language") as Language | null;
    if (storedTheme && (storedTheme === "dark" || storedTheme === "light")) setTheme(storedTheme);
    if (storedLang) setLanguageState(storedLang);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = (translations as Record<string, Record<string, string>>)[key];
      if (!entry) return key;
      return entry[language] || entry["en"] || key;
    },
    [language],
  );

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
