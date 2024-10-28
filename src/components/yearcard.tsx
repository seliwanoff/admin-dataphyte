import arrowdown from "../assets/images/Dashboard/arrow-down.png";

const YearCards = () => {
  return (
    <div className="flex justify-center items-center gap-[10px] bg-[#F7F7F8] py-[6px] px-[12px] rounded-[49px] cursor-pointer">
      <span className="font-Satoshi font-medium text-[#4F4F4F] leading-[18.9px] text-[14px]">
        2023
      </span>
      <img src={arrowdown} alt="" className="h-4" />
    </div>
  );
};

export default YearCards;
