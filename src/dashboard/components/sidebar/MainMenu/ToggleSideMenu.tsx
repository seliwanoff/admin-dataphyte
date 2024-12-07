import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SubMainmenuProps {
  logo: string;
  activeLogo: string;
  title: string;
  to: string;
  children?: React.ReactNode;
  activeColor?: string; // Optional color for active state
  inactiveColor?: string;
  setShowsidebar?: any;
  showSideBar?: any; // Optional color for inactive state
}

const ToggleSideBar: React.FC<SubMainmenuProps> = ({
  logo,
  activeLogo,
  title,
  to,
  children,
  activeColor = "bg-primary",
  inactiveColor = "text-gray-800",
  setShowsidebar,
  showSideBar, // Default inactive color
}) => {
  const location = useLocation();
  const isActive = location.pathname === to; // Check if the current path matches the `to` prop

  return (
    <Link
      to={to}
      onClick={() => setShowsidebar(!showSideBar)}
      className={` ${isActive ? `sidebarnav` : `inactivesidebarnav`}  ${
        isActive ? activeColor : inactiveColor
      }`}
    >
      {children}
    </Link>
  );
};

export default ToggleSideBar;
