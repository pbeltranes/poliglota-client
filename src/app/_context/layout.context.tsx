"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";

interface layoutInterface {
  theme: string;
  lang: string;
  locale: string;
  path: Record<string, Record<string, string[]>>;
}

type LayoutContextType = [
  layoutInterface,
  Dispatch<SetStateAction<layoutInterface>>,
  () => void,
  (langLocal: string) => void
];

const Layout = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<layoutInterface>({
    theme: localStorage.getItem("theme") || "light",
    lang: localStorage.getItem("lang") || "es",
    locale: localStorage.getItem("locale") || "cl",
    path: {},
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const savedLang = localStorage.getItem("lang");
      const savedLocale = localStorage.getItem("locale");

      if (savedTheme && savedLang && savedLocale) {
        setLayout((prev) => ({
          ...prev,
          theme: savedTheme,
          lang: savedLang,
          locale: savedLocale,
        }));
      }
      fetchData();
    }
  }, [layout.theme, layout.lang, layout.locale]);

  useEffect(() => {
    localStorage.setItem("theme", layout.theme);
    localStorage.setItem("lang", layout.lang);
    localStorage.setItem("locale", layout.locale);
  }, [layout.theme, layout.lang, layout.locale]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/config");
      const data = await response.json();
      setLayout((prev) => {
        return { ...prev, path: data.path };
      });
    } catch (error) {
      console.error("Error fetching layout data:", error);
    }
  };
  const toggleTheme = () => {
    setLayout({
      ...layout,
      theme: layout.theme === "light" ? "dark" : "light",
    });
  };

  const setLanguage = async (langLocal: string) => {
    const [lang, locale] = langLocal.split("/");
    setLayout({
      ...layout,
      lang,
      locale,
    });
  };
  return (
    <Layout.Provider value={[layout, setLayout, toggleTheme, setLanguage]}>
      {children}
    </Layout.Provider>
  );
}

export function useLayout() {
  const context = useContext(Layout);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
