import React, { useState } from "react";

interface CountrySelectProps {
  label: string;
  values?: any; // Array of selected countries
  onChange?: (values: string[]) => void; // Callback for selected countries
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
  type?: any;
  setSelectedCountry?: any; // Optional prop to define if it's a single or multiple selection
}

const Category: React.FC<CountrySelectProps> = ({
  label,
  values = [], // Array of selected countries (or just one)
  onChange,
  placeholder = "Select category",
  className = "",
  name,
  required,
  type,
  setSelectedCountry,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const predefinedOptions = ["Regulation", "License", "Others"];
  const handleSelect = (option: string) => {
    if (type === "site") {
      if (onChange) onChange([option]);
      setIsDropdownOpen(false);
      setSelectedCountry(option);
    } else {
      const alreadySelected = values.includes(option);
      let updatedValues;
      if (alreadySelected) {
        updatedValues = values.filter((item: any) => item !== option);
      } else {
        updatedValues = [...values, option];
      }
      if (onChange) onChange(updatedValues);
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="relative w-full">
        <div
          className="input w-full cursor-pointer font-Satoshi font-medium"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          {values.length > 0 ? values : placeholder}
        </div>
        {isDropdownOpen && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
            {predefinedOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-2 cursor-pointer hover:bg-slate-200 font-medium font-polySans ${
                  values.includes(option) ? "bg-slate-100" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className="bg-primary text-white px-3 py-1 rounded-full text-sm cursor-pointer"
            onClick={() => handleSelect(values)}
          >
            {values}
          </span>
        </div>
      )}
    </div>
  );
};

export default Category;
