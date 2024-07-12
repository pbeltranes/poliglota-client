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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "../loading";

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
  const [layout, setLanguage] = useLayout();
  const paths = pathname.split("/");
  const pathUnderscore = pathname.replaceAll("/", "_");
  console.log("pathTransformer", pathUnderscore);

  console.log("layout", layout.path[pathUnderscore]);
  const arrayTranslations = transformObj(layout.path[pathUnderscore]);
  console.log("arrayTranslations", arrayTranslations);
  if (!layout || !pathname) return <Loading />;
  return (
    <body
      className={` ${layout.theme} flex min-h-screen w-full flex-col bg-muted/40`}
    >
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {`${layout.lang}/${layout.locale}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {arrayTranslations.map((translation, index) => (
                <DropdownMenuItem
                  key={index}
                  // onClick={() => setLanguage( translation )}
                >
                  {translation}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {children}
      </div>
    </body>
  );
};
