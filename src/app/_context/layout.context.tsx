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
    theme: "light",
    lang: "es",
    locale: "cl",
    path: {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/config");
        const data = await response.json();
        setLayout({
          ...layout,
          path: data.path,
        });
      } catch (error) {
        console.error("Error fetching layout data:", error);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    setLayout({
      ...layout,
      theme: layout.theme === "light" ? "dark" : "light",
    });
  };

  const setLanguage = (langLocal: string) => {
    const splitted = langLocal.split("/");
    setLayout({
      ...layout,
      lang: splitted[0],
      locale: splitted[1],
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
