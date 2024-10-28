import React, { ReactNode } from "react";
import Sidebar from "../dashboard/components/sidebar/sidebar";
import Header from "../dashboard/components/headers/header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex bg-secondary h-full">
      <Sidebar />
      <div className="w-full flex justify-end">
        <div className="w-calc-custom ">
          <Header />
          <div className="px-8 mt-5">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
