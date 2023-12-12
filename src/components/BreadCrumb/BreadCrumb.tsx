// Libs
import { memo, useMemo } from "react";
import Link from "next/link";
import { Title } from "@tremor/react";
import { MdHome } from "react-icons/md";

// Constants
import { ROUTES } from "../../constants";

// Types
import { IBreadCrumb } from "@/types";
import { usePathname } from "next/navigation";

// Define the props for the BreadCrumb component
interface IBreadCrumbProps {
  links: IBreadCrumb[];
}

/**
 * Primary UI component for BreadCrumb component
 */
const BreadCrumb = (): JSX.Element => {
  const pathname = usePathname();

  const links: IBreadCrumb[] = useMemo(() => {
    switch (true) {
      case pathname.includes("/dashboards/"):
        return [{ name: "dashboards", url: ROUTES.ANALYTICS }];

      case pathname.includes("/pages/profile/"):
        return [
          { name: "pages", url: ROUTES.PROJECTS },
          { name: "profiles", url: ROUTES.PROJECTS },
        ];

      default:
        return [{ name: "dashboards", url: ROUTES.ANALYTICS }];
    }
  }, [pathname]);

  const pageName = useMemo(() => {
    switch (pathname) {
      case ROUTES.ANALYTICS:
        return "analytics";
      case ROUTES.SALES:
        return "sales";
      case ROUTES.PROJECTS:
        return "All Projects";
      default:
        return "analytics";
    }
  }, [pathname]);

  const renderLinks = (): JSX.Element[] => {
    return links.map(link => (
      <li key={link.name} className="flex items-center">
        <div className="bc-link">
          <Link className="text-sm capitalize" href={link.url}>
            {link.name}
          </Link>
        </div>
        <div aria-hidden="true" className="text-xs mx-2">
          &#8260;
        </div>
      </li>
    ));
  };

  return (
    <nav className="block">
      <ol className="flex flex-wrap items-center text-gray-400">
        <li>
          <Link href={ROUTES.HOME} className="flex">
            <MdHome className="bg-inherit border-0 py-0 hover:bg-transparent" />
          </Link>
        </li>
        <li aria-hidden="true" className="text-xs mx-2">
          &#8260;
        </li>

        {renderLinks()}

        <li className="text-sm text-tremor-content-title capitalize">
          {pageName}
        </li>
      </ol>
      <Title className="text-tremor-content-title font-bold capitalize">
        {pageName}
      </Title>
    </nav>
  );
};

export default memo(BreadCrumb);
