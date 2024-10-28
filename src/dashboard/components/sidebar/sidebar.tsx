import MainMenu from "./MainMenu/mainmenu";
import SettingsMenu from "./settingsMenu";

const Sidebar = () => {
  return (
    <aside className="h-screen fixed w-[280px] bg-white border border-r border-r-[#EAECF0] flex flex-col justify-between">
      <MainMenu />

      <SettingsMenu />
    </aside>
  );
};

export default Sidebar;
