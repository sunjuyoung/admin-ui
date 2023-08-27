import React from "react";
import { Link, useParams } from "react-router-dom";

const MainNav = () => {
  const { storeId } = useParams();

  const routes = [
    {
      href: `/store/${storeId}`,
      label: "Overview",
      active: window.location.pathname === `/store/${storeId}`,
    },
    {
      href: `/store/${storeId}/settings`,
      label: "Settings",
      active: window.location.pathname === `/store/${storeId}/settings`,
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          to={route.href}
          key={route.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            route.active ? "text-gray-900 font-bold" : "text-gray-500"
          }`}
        >
          
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
