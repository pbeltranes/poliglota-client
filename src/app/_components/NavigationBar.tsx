import { usePathname } from "next/navigation";
import { useLayout } from "../_context/layout";

export const NavigationBar = (): React.ReactNode => {
  const pathname = usePathname();
  const [layout] = useLayout();
  return (
    <header className="flex flex-row gap-4 min-w-full items-center justify-between">
      <div className="">{pathname}</div>
      <div className="">
        {layout.lang}/{layout.locale}
      </div>
    </header>
  );
};
