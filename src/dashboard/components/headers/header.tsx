import bell from "../../../assets/images/Dashboard/Bell.png";
import env from "../../../assets/images/Dashboard/env.png";
import Search from "../Search";

const Header = () => {
  return (
    <div className="h-[72px] bg-white justify-center  flex items-center">
      <div className="w-full  flex justify-between items-center px-8">
        <Search />
        <div className="flex gap-6 items-center">
          <img src={env} alt="" className="h-10 cursor-pointer" />
          <img src={bell} alt="" className="h-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
