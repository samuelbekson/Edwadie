import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

interface Crumb {
  name: string;
  path: string;
}

// Utility to convert path segments to readable names
const toTitle = (segment: string) =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // Build crumbs array
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    ...pathnames.map((segment, idx) => ({
      name: toTitle(segment),
      path: `/${pathnames.slice(0, idx + 1).join("/")}`
    }))
  ];

  return (
    <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path}>
              <BreadcrumbItem
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {idx < crumbs.length - 1 ? (
                  <BreadcrumbLink asChild itemProp="item" to={crumb.path}>
                    <Link to={crumb.path} itemProp="item">
                      <span itemProp="name">{crumb.name}</span>
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage itemProp="name">{crumb.name}</BreadcrumbPage>
                )}
                <meta itemProp="position" content={idx + 1} />
              </BreadcrumbItem>
              {idx < crumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};
