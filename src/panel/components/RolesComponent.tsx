import React, { useState } from "react";

interface RoleSelectProps {
  label: string;
  values?: string[]; // Array of selected values
  onChange?: (values: string[]) => void; // Callback for selected values
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  label,
  values = [],
  onChange,
  placeholder = "Select roles...",
  className = "",
  name,
  required,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const predefinedOptions = ["CEO", "CFO", "CTO"]; // Fixed roles

  const handleSelect = (option: string) => {
    const alreadySelected = values.includes(option);

    let updatedValues;
    if (alreadySelected) {
      // Remove if already selected
      updatedValues = values.filter((item) => item !== option);
    } else {
      // Add if not selected
      updatedValues = [...values, option];
    }

    if (onChange) onChange(updatedValues);
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
          {values.length > 0 ? values.join(", ") : placeholder}
        </div>
        {isDropdownOpen && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
            {predefinedOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-2 cursor-pointer hover:bg-slate-200 font-medium font-polySans${
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
          {values.map((value, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => handleSelect(value)}
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSelect;
