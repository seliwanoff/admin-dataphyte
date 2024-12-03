import LogoTop from "../../../../panel/components/logoTop";
import SubMainmenu from "./submainmenu";
import dashboardlogo from "../../../../assets/images/Dashboard/bar-chart-square-02.png";
import userlogo from "../../../../assets/images/Dashboard/users-01.png";
import anayltyicslogo from "../../../../assets/images/Dashboard/pie-chart-03.png";
import datalogo from "../../../../assets/images/Dashboard/layers-three-01.png";
import useranayticslogo from "../../../../assets/images/Dashboard/check-done-01.png";

const MainMenu = () => {
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
        <SubMainmenu
          logo={datalogo}
          activeLogo="/path/to/active-logo.png"
          title="Data Collection"
          to="/data-collection"
        >
          <img src={datalogo} alt="" className="h-[18px]" />
          Data Collection
        </SubMainmenu>
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
