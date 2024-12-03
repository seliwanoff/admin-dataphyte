import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SubMainmenuProps {
  logo: string;
  activeLogo: string;
  title: string;
  to: string;
  children?: React.ReactNode;
  activeColor?: string; // Optional color for active state
  inactiveColor?: string; // Optional color for inactive state
}

const SubMainmenu: React.FC<SubMainmenuProps> = ({
  logo,
  activeLogo,
  title,
  to,
  children,
  activeColor = "bg-primary",
  inactiveColor = "text-gray-800", // Default inactive color
}) => {
  const location = useLocation();
  const isActive = location.pathname === to; // Check if the current path matches the `to` prop

  return (
    <Link
      to={to}
      className={` ${isActive ? `sidebarnav` : `inactivesidebarnav`}  ${
        isActive ? activeColor : inactiveColor
      }`}
    >
      {children}
    </Link>
  );
};

export default SubMainmenu;
