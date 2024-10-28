import React from "react";

interface EachCardProps {
  title: string;
  value: string | number;
  mainImage: string;
  percentage: string | number;
  percentageImage: string;
}

const EachCard: React.FC<EachCardProps> = ({
  title,
  value,
  mainImage,
  percentage,
  percentageImage,
}) => {
  return (
    <div className="cards bg-white p-4 rounded-lg  w-full ">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <span className="p-0 m-0 text-[#828282] font-polySans font-normal text-[14px] leading-[18.87px]">
              {title}
            </span>
            <p className="text-[#333] font-Satoshi font-medium leading-[32.4px] text-2xl">
              {value}
            </p>
          </div>
          <img src={mainImage} alt={`${title} icon`} className="h-12" />
        </div>

        <div className="flex items-center gap-2 font-Satoshi text-[14px] text-[#475467]">
          <span className="flex items-center gap-2 text-[#079455]">
            <img src={percentageImage} alt="Arrow up" className="h-5" />
            {percentage}
          </span>
          vs last month
        </div>
      </div>
    </div>
  );
};

export default EachCard;
