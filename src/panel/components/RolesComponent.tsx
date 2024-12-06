import React, { useState, useEffect, useRef } from "react";

interface RoleSelectProps {
  label: string;
  values?: string; // Selected value
  onChange?: (value: string) => void; // Callback for selected value
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  label,
  values = "",
  onChange,
  placeholder = "Select a title...",
  className = "",
  name,
  required,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const predefinedOptions = ["Mr", "Miss", "Dr"]; // Fixed roles

  const handleSelect = (option: string) => {
    if (onChange) onChange(option);
    setIsDropdownOpen(false); // Close dropdown after selection
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
          {values || placeholder}
        </div>
        {isDropdownOpen && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
            {predefinedOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-2 cursor-pointer hover:bg-slate-200 font-medium font-polySans ${
                  values === option ? "bg-slate-100" : ""
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

export default RoleSelect;
