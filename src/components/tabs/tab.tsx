import { useState } from "react";

const datas = ["12 months", "30 days", "7 days", "24 hours"];

interface DataTableToolsProps {
  setDate?: any;
}
const Tabs: React.FC<DataTableToolsProps> = ({ setDate }) => {
  const [active, setIsactive] = useState<number>(0);
  return (
    <div className="flex border border-[#D0D5DD] cursor-pointer; rounded-xl overflow-hidden shadow-newcustom">
      {datas.map((item, index) => (
        <div
          onClick={() => {
            setIsactive(index);
            setDate(item);
          }}
          className={`eachtabcard border-r ${
            index === active ? `bg-primary text-white` : "bg-white"
          } `}
          key={index}
        >
          {" "}
          {item}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
