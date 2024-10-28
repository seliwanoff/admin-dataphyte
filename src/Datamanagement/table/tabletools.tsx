import Search from "../../dashboard/components/Search";
import arrow from "../../assets/images/Dashboard/arrow-down.png";
import datelogo from "../../assets/images/Dashboard/calendar.png";

const DataTableTools = () => {
  return (
    <div className="flex items-center gap-4">
      <Search />
      <div className="flex gap-3 items-center">
        <div className="p-[10px] h-9 justify-center items-center border border-[#E0E0E0] rounded-[48px] cursor-pointer">
          <div className="flex gap-[6px] items-center">
            <span className="text-[#4f4f4f] font-Satoshi text-xs font-normal">
              All type
            </span>
            <img src={arrow} alt="" className="h-4" />
          </div>
        </div>
        <div className="py-[6px] px-[11px] h-9 justify-center items-center  rounded-[48px] cursor-pointer">
          <div className="flex gap-[8px] items-center">
            <span className="text-[#4f4f4f] font-Satoshi text-xs font-normal">
              Pick date
            </span>
            <img src={datelogo} alt="" className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableTools;
