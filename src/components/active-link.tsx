import React from "react";
import { Link, useLocation } from "react-router-dom";

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
};

export const ActiveLink = ({
  href,
  children,
  className = "",
  activeClassName = "",
  exact = false,
}: ActiveLinkProps) => {
  const location = useLocation();

  const isActive = exact
    ? location.pathname === href
    : location.pathname.startsWith(href);

  return (
    <Link
      to={href}
      data-active={isActive}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
};
