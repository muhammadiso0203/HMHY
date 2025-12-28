import React from "react";
import { Link, useLocation } from "react-router-dom";

export const ActiveLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200
        ${
          isActive
            ? "bg-linear-to-r from-black to-gray-800 text-white shadow-md scale-[1.01]"
            : "text-gray-700 hover:bg-gray-200 hover:text-black"
        }
      `}
    >
      {children}
    </Link>
  );
};
