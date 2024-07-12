"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const pathname = usePathname();

  const [params, setParams] = useState({
    project: "clay",
    path: pathname.replaceAll("/", "_"),
    lang: "es",
    locale: "cl",
  });
  const [translations, setTranslations] = useState<{ [key: string]: any }>({});
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/${params.path}/${params.lang}/${params.locale}`
      );
      const data = await response.json();
      setTranslations(data.translations);
    }
    fetchData();
  }, []);

  const TranslationList = Object.keys(translations).map((key: string) => (
    <li key={key}>
      {key}: {translations[key]}
    </li>
  ));

  return <ul>{TranslationList}</ul>;
}
