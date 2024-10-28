import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SubMainmenuProps {
  logo: string; // URL or path for the default logo image
  activeLogo: string; // URL or path for the active logo image
  title: string; // Title to display
  to: string; // Destination path for the Link
  children?: React.ReactNode; // Additional children if needed
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
