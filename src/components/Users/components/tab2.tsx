import { useState } from "react";

const datas = ["Uploads", "Downloads", "API", "Reports"];

const Tabs2 = () => {
  const [active, setIsactive] = useState<number>(0);
  return (
    <div className="flex  cursor-pointer; rounded-full overflow-hidden shadow-newcustom bg-[#F1F1F1] p-1">
      {datas.map((item, index) => (
        <div
          onClick={() => setIsactive(index)}
          className={`eachtabcard font-normal font-Satoshi  ${
            index === active
              ? `bg-primary text-white rounded-full`
              : "text-[#828282]"
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

export default Tabs2;
