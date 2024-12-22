import React, { useState, useEffect } from "react";
import arrowdown from "../assets/images/Dashboard/arrow-down.png";

interface YearCardsProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const YearCards: React.FC<YearCardsProps> = ({
  selectedYear,
  setSelectedYear,
}) => {
  const [years, setYears] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3;
    const endYear = currentYear + 10;

    // Generate years dynamically
    const generatedYears = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
    setYears(generatedYears);
  }, []);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-center items-center gap-[10px] bg-[#F7F7F8] py-[6px] px-[12px] rounded-[49px] cursor-pointer"
      >
        <span className="font-Satoshi font-medium text-[#4F4F4F] leading-[18.9px] text-[14px]">
          {selectedYear}
        </span>
        <img
          src={arrowdown}
          alt="Arrow Down"
          className={`h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto vertical_scroll">
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-500 hover:text-white font-polySans ${
                year === selectedYear
                  ? "bg-primary text-white font-bold"
                  : "text-gray-700"
              }`}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearCards;
