import settingsLogo from "../../../assets/images/Dashboard/settings-01.png";
import logout from "../../../assets/images/Dashboard/log-out-01.png";

import SubMainmenu from "./MainMenu/submainmenu";

const SettingsMenu = () => {
  return (
    <div className="px-[20px] justify-start flex py-[24px] flex-col">
      <nav className="flex flex-col gap-2">
        <SubMainmenu
          logo={settingsLogo}
          activeLogo="/path/to/active-logo.png"
          title="Dashboard"
          to="/settings"
        >
          <img src={settingsLogo} alt="" className="h-[18px]" />
          Settings
        </SubMainmenu>

        <div className="border-t ">
          <div className=" flex justify-between items-center mt-3 pl-[15px] ">
            <div className="flex gap-3 items-center">
              <div className="rounded-full h-[40px] w-[40px] border bg-primary "></div>
              <div className="flex flex-col">
                <span className="font-semibold text-[14px] leading-6 text-[#344054]">
                  Administrator
                </span>
                <p className="font-normal text-[14px] leading-5 font-polySans">
                  admin@CJID.com
                </p>
              </div>
            </div>

            <img src={logout} alt="" className="h-5" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SettingsMenu;
