"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
interface layoutInterface {
  theme: string;
  lang: string;
  locale: string;
}
const Layout = createContext<
  [layoutInterface, Dispatch<SetStateAction<layoutInterface>>] | undefined
>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<layoutInterface>({
    theme: "light",
    lang: "en",
    locale: "us",
  });

  return (
    <Layout.Provider
      value={[layout, setLayout as Dispatch<SetStateAction<object>>]}
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
