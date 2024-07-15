"use client";
import { useLayout } from "@/app/_context/layout.context";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const pathname = usePathname();
  const [layout] = useLayout();

  const [translations, setTranslations] = useState<{
    [key: string]: any;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/${pathname.split("/").join("_")}/${layout.lang}/${layout.locale}`
      );
      const data = await response.json();
      if (data) setTranslations(data.translations);
    }
    fetchData();
  }, [layout.lang, layout.locale, pathname]);

  const List = ({ translations }: { translations: { [key: string]: any } }) => {
    return (
      <ul>
        {Object.keys(translations).map((key: string) => (
          <li key={key}>
            {key}: {translations[key]}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {!translations ? <Loading /> : <List translations={translations} />}
    </main>
  );
}
