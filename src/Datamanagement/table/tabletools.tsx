import Search from "../../dashboard/components/Search";
import arrow from "../../assets/images/Dashboard/arrow-down.png";
import datelogo from "../../assets/images/Dashboard/calendar.png";
import Dropdown from "./dropdown";
import { useState } from "react";
import CustomDatePicker from "../../dashboard/components/customDatePicket";
interface DropdownProps {
  setSelectedItem?: any;
  selectedItem?: any;
  setSearchQuery?: any;
  type?: any;
  showPicker?: any;
  setShowPicker?: any;
  setDate?: any;
}
const DataTableTools: React.FC<DropdownProps> = ({
  setSelectedItem,
  selectedItem,
  setSearchQuery,
  type,
  showPicker,
  setShowPicker,
  setDate,
}) => {
  const items = ["Regulation", "License", "Others"];

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };
  const handleDateChange = (dates: { from: Date; to: Date }) => {
    setDate(dates);
  };
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <Search setSearchQuery={setSearchQuery} />
      <div className="flex gap-3 items-center">
        {type !== "report" && (
          <div className="p-[10px] h-9 justify-center items-center border border-[#E0E0E0] rounded-[48px] cursor-pointer relative">
            <div
              className="flex gap-[6px] items-center"
              onClick={() => setShow(!show)}
            >
              <span className="text-[#4f4f4f] font-Satoshi text-xs font-normal">
                {selectedItem ? selectedItem : "All type"}
              </span>
              <img src={arrow} alt="" className="h-4" />
            </div>

            <Dropdown
              items={items}
              onSelect={handleSelect}
              setShow={setShow}
              show={show}
            />
          </div>
        )}
        <div className="py-[6px] px-[11px] h-9 justify-center items-center  rounded-[48px] cursor-pointer relative">
          <div
            className="flex gap-[8px] items-center"
            onClick={() => setShowPicker(!showPicker)}
          >
            <span className="text-[#4f4f4f] font-Satoshi text-xs font-normal">
              Pick date
            </span>
            <img src={datelogo} alt="" className="h-4" />
          </div>

          {showPicker && (
            <CustomDatePicker
              onDateChange={handleDateChange}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTableTools;
