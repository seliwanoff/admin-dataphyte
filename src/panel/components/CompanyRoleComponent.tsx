import React, { useState, useEffect, useRef } from "react";

interface RoleSelectProps {
  label: string;
  values?: string[]; // Array of selected values
  onChange?: (values: string[]) => void; // Callback for selected values
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
  expectedCount: number; // Number of selections allowed
}

const CompanyRole: React.FC<RoleSelectProps> = ({
  label,
  values = [],
  onChange,
  placeholder = "Select roles...",
  className = "",
  name,
  required,
  expectedCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const predefinedOptions = ["CEO", "CFO", "CTO", "COO", "CMO"]; // Fixed roles

  const handleSelect = (option: string) => {
    if (values.length < expectedCount) {
      const updatedValues = [...values, option];
      if (onChange) onChange(updatedValues);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={`flex flex-col gap-2 w-full ${className}`}
      ref={dropdownRef}
    >
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
                className={`p-2 cursor-pointer hover:bg-slate-200 font-medium font-polySans ${
                  values.includes(option)
                    ? "bg-slate-100"
                    : values.length >= expectedCount
                    ? "text-gray-400 cursor-not-allowed"
                    : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompanyRole;
