"use client";
import { usePathname } from "next/navigation";
import { useLayout } from "../_context/layout.context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "../loading";
import { DarkIcon, TranslateIcon } from "@/components/ui/icon";

const transformObj = (obj: Record<string, string[]>) => {
  return Object.entries(obj).flatMap(([lang, countries]) =>
    (countries as string[]).map((country: any) => `${lang}/${country}`)
  );
};

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode => {
  const pathname = usePathname();
  const [layout, setLayout, toggleTheme, setLanguage] = useLayout();
  const paths = pathname.split("/");
  const pathUnderscore = pathname.replaceAll("/", "_");


  if (!layout || !pathname) return <Loading />;
  return (
    <body className={` ${layout.theme} flex min-h-screen w-full flex-col`}>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky items-center justify-between flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              {paths.map((path, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link href={`/${paths.slice(0, index + 1).join("/")}`}>
                      {index === 0 ? "Home" : path}
                    </Link>
                  </BreadcrumbLink>
                  {index < paths.length - 1 && (
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex gap-4">
            <Button variant="outline" onClick={toggleTheme}>
              {layout.theme}
              <DarkIcon className="h-6 w-6" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {`${layout.lang}/${layout.locale}`}
                  <TranslateIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {layout.path[pathUnderscore] &&
                  Object.keys(layout.path).length > 0 &&
                  transformObj(layout.path[pathUnderscore]).map(
                    (translation: string, index: number) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => setLanguage(translation)}
                      >
                        {translation}
                      </DropdownMenuItem>
                    )
                  )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </div>
    </body>
  );
};
