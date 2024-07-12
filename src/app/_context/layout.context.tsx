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
const Layout = createContext<
  | [
      layoutInterface,
      Dispatch<SetStateAction<layoutInterface>>,
      undefined,
      Dispatch<SetStateAction<string>>
    ]
  | undefined
>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<layoutInterface>({
    theme: "light",
    lang: "en",
    locale: "us",
    path: {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/config");
        const data = await response.json();
        console.log("data", data);
        setLayout({
          ...layout,
          path: data.path,
        });
      } catch (error) {
        console.error("Error fetching layout data:", error);
      }
    }
    fetchData();
  }, []);

  const tonggleTheme = () => {
    setLayout({
      ...layout,
      theme: layout.theme === "light" ? "dark" : "light",
    });
  };

  const setLanguage = (langLocal: string) => {
    const splitted = langLocal.split("/");
    setLayout({
      ...layout,
      theme: layout.theme === "light" ? "dark" : "light",
      lang: splitted[0],
      locale: splitted[1],
    });
  };
  return (
    <Layout.Provider
      value={[
        layout,
        setLayout as Dispatch<SetStateAction<object>>,
        tonggleTheme as unknown as undefined,
        setLanguage as Dispatch<SetStateAction<string>>,
      ]}
    >
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
