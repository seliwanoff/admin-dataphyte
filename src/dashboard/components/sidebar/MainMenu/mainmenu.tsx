import LogoTop from "../../../../panel/components/logoTop";
import SubMainmenu from "./submainmenu";
import dashboardlogo from "../../../../assets/images/Dashboard/bar-chart-square-02.png";
import userlogo from "../../../../assets/images/Dashboard/users-01.png";
import anayltyicslogo from "../../../../assets/images/Dashboard/pie-chart-03.png";
import datalogo from "../../../../assets/images/Dashboard/layers-three-01.png";
import useranayticslogo from "../../../../assets/images/Dashboard/check-done-01.png";
import inactiveDsh from "../../../../assets/images/Dashboard/inactivedas.png";
import activeuserman from "../../../../assets/images/Dashboard/activeuserman.png";
import dataman from "../../../../assets/images/Dashboard/data-man.png";
import ana from "../../../../assets/images/Dashboard/ana.png";
import accessc from "../../../../assets/images/Dashboard/access-log-ac.png";

import { useState } from "react";
import ToggleSideBar from "./ToggleSideMenu";
import { useLocation } from "react-router-dom";

const MainMenu = () => {
  const [showSideBar, setShowsidebar] = useState();
  const location = useLocation();
  const pathname = location.pathname;
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
          <img
            src={pathname === "/dashboard" ? dashboardlogo : inactiveDsh}
            alt=""
            className="h-[18px]"
          />
          Dashboard
        </SubMainmenu>
        <SubMainmenu
          logo={datalogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/data-management"
        >
          <img
            src={pathname === "/data-management" ? activeuserman : datalogo}
            alt=""
            className="h-[18px]"
          />
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
              <img
                src={
                  pathname === "/data-collection"
                    ? activeuserman
                    : useranayticslogo
                }
                alt=""
                className="h-[18px]"
              />
              Company{" "}
            </SubMainmenu>
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/mineral-collection"
            >
              <img
                src={
                  pathname === "/mineral-collection"
                    ? activeuserman
                    : useranayticslogo
                }
                alt=""
                className="h-[18px]"
              />
              Mineral{" "}
            </SubMainmenu>{" "}
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/people-collection"
            >
              <img
                src={
                  pathname === "/people-collection"
                    ? activeuserman
                    : useranayticslogo
                }
                alt=""
                className="h-[18px]"
              />
              People
            </SubMainmenu>
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/site-collection"
            >
              <img
                src={
                  pathname === "/site-collection"
                    ? activeuserman
                    : useranayticslogo
                }
                alt=""
                className="h-[18px]"
              />
              Mining Site
            </SubMainmenu>
            <SubMainmenu
              logo={useranayticslogo}
              activeLogo="/path/to/active-logo.png"
              title="Dashboard"
              to="/document"
            >
              <img
                src={
                  pathname === "/docunebt" ? activeuserman : useranayticslogo
                }
                alt=""
                className="h-[18px]"
              />
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
          <img
            src={pathname === "/user-management" ? dataman : useranayticslogo}
            alt=""
            className="h-[18px]"
          />
          User Management{" "}
        </SubMainmenu>
        <SubMainmenu
          logo={anayltyicslogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/analytics-report"
        >
          <img
            src={pathname === "/analytics-report" ? ana : anayltyicslogo}
            alt=""
            className="h-[18px]"
          />
          Analytics and Report
        </SubMainmenu>
        <SubMainmenu
          logo={userlogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/access-log"
        >
          <img
            src={pathname === "/access-log" ? accessc : userlogo}
            alt=""
            className="h-[18px]"
          />
          Access logs
        </SubMainmenu>
      </nav>
    </div>
  );
};

export default MainMenu;
