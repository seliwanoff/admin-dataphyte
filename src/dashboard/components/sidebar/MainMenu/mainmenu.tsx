import LogoTop from "../../../../panel/components/logoTop";
import SubMainmenu from "./submainmenu";
import dashboardlogo from "../../../../assets/images/Dashboard/bar-chart-square-02.png";
import userlogo from "../../../../assets/images/Dashboard/users-01.png";
import anayltyicslogo from "../../../../assets/images/Dashboard/pie-chart-03.png";
import datalogo from "../../../../assets/images/Dashboard/layers-three-01.png";
import useranayticslogo from "../../../../assets/images/Dashboard/check-done-01.png";
import { useState } from "react";
import ToggleSideBar from "./ToggleSideMenu";

const MainMenu = () => {
  const [showSideBar, setShowsidebar] = useState();
  return (
    <div className="px-[20px] justify-start flex py-[24px] flex-col">
      <LogoTop />

      <nav className="pt-16 flex flex-col gap-2">
        <SubMainmenu
          logo={dashboardlogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/dashboard"
        >
          <img src={dashboardlogo} alt="" className="h-[18px]" />
          Dashboard
        </SubMainmenu>
        <SubMainmenu
          logo={datalogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/data-management"
        >
          <img src={datalogo} alt="" className="h-[18px]" />
          Data Management
        </SubMainmenu>
        <ToggleSideBar
          logo={datalogo}
          activeLogo="/path/to/active-logo.png"
          title="Data Collection"
          to=""
          setShowsidebar={setShowsidebar}
          showSideBar={showSideBar}
        >
          <img src={datalogo} alt="" className="h-[18px]" />
          Data Collections
        </ToggleSideBar>
        {showSideBar && (
          <div className="flex flex-col gap-4 pl-12">
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/data-collection"
            >
              <img src={useranayticslogo} alt="" className="h-[18px]" />
              Company{" "}
            </SubMainmenu>
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/mineral-collection"
            >
              <img src={useranayticslogo} alt="" className="h-[18px]" />
              Mineral{" "}
            </SubMainmenu>{" "}
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/people-collection"
            >
              <img src={useranayticslogo} alt="" className="h-[18px]" />
              People
            </SubMainmenu>
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/site-collection"
            >
              <img src={useranayticslogo} alt="" className="h-[18px]" />
              Mining Site
            </SubMainmenu>
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/document"
            >
              <img src={useranayticslogo} alt="" className="h-[18px]" />
              Document
            </SubMainmenu>
          </div>
        )}
        <SubMainmenu
          logo={useranayticslogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/user-management"
        >
          <img src={useranayticslogo} alt="" className="h-[18px]" />
          User Management{" "}
        </SubMainmenu>
        <SubMainmenu
          logo={anayltyicslogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/analytics-report"
        >
          <img src={anayltyicslogo} alt="" className="h-[18px]" />
          Analytics and Report
        </SubMainmenu>
        <SubMainmenu
          logo={userlogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/access-log"
        >
          <img src={userlogo} alt="" className="h-[18px]" />
          Access logs
        </SubMainmenu>
      </nav>
    </div>
  );
};

export default MainMenu;
