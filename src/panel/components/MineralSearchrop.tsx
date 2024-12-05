import React, { useState } from "react";

interface SearchableSelectProps {
  label: string;
  options: { name: string; place_id: string }[]; // Updated to include structured options
  values?: string[]; // Array of selected values
  onChange?: any; // Callback for selected values
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  type?: any;
  setisAddnewpeople?: (state: boolean) => void;
  setPlacedId?: (placeId: string) => void;
  setCurrentStep?: any;
  isDocument?: any;
}

const MineralSearchDrop: React.FC<SearchableSelectProps> = ({
  label,
  options,
  values = [],
  onChange,
  placeholder = "Search...",
  className = "",
  name,
  required,
  setSearchQuery,
  searchQuery,
  type,
  setisAddnewpeople,
  setPlacedId,
  setCurrentStep,
  isDocument,
}) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (
    option: {
      name: string;
      place_id: string;
      first_name?: string;
      last_name?: string;
      id?: any;
    },
    type: number
  ) => {
    let keyToCheck: string;
    let keyToAdd: { id: string; name: string };

    if (type === 2) {
      keyToCheck = option.name;
      keyToAdd = { id: option.id, name: option.name };
    } else if (type === 3 || type === 6) {
      keyToCheck = ` ${option.first_name} ${option.last_name}`;
      keyToAdd = { id: option.id, name: keyToCheck };
    } else if (type === 4) {
      keyToCheck = option.name;
      keyToAdd = { id: option.id, name: option.name };
    } else if (type === 5) {
      keyToCheck = option.name;
      keyToAdd = { id: option.id, name: option.name };
    } else {
      return;
    }

    const alreadySelected = values.some(
      (item: any) => item.name === keyToCheck
    );

    let updatedValues;
    if (alreadySelected) {
      updatedValues = values.filter((item: any) => item.name !== keyToCheck);
    } else {
      updatedValues = [...values, keyToAdd];
    }

    if (onChange) onChange(updatedValues);

    setSearch("");
    setSearchQuery("");
    setIsDropdownOpen(false);

    if (setPlacedId) setPlacedId(option.place_id);
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id={name}
          required={required}
          name={name}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={() => setIsDropdownOpen(true)}
          className="input w-full"
        />
        {isDropdownOpen && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
            {options.length > 0 ? (
              options.map((option: any, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option, type)}
                  className={`p-2 cursor-pointer hover:bg-slate-200 font-Satoshi font-medium ${
                    values.includes(option.name) ? "bg-slate-100" : ""
                  }`}
                >
                  {type === 2 || type === 4 || type === 5
                    ? option.name
                    : type === 3
                    ? `${option.title || ""} ${option.first_name || ""} ${
                        option.last_name || ""
                      }`
                    : type === 6
                    ? `${option.title} ${option.first_name} ${option.last_name}`
                    : ""}
                </li>
              ))
            ) : (
              <div className="py-4 flex justify-center items-center w-full flex-col">
                <span className="font-Satoshi text-gray-700 text-[14px] font-semibold">
                  {type === 2
                    ? "No mineral found"
                    : type === 3 || type === 6
                    ? "No people found"
                    : type === 4
                    ? "No Site found"
                    : type === 5 && "No company found"}
                </span>
                <button
                  className="px-4 py-2 bg-primary font-polySans text-[14px] my-4 mx-auto text-white rounded font-medium"
                  onClick={() => {
                    if (type === 5) {
                      setCurrentStep(0);
                    } else if (type === 6) {
                      setCurrentStep(2);
                    } else {
                      setisAddnewpeople && setisAddnewpeople(true);
                    }
                  }}
                >
                  {type === 2
                    ? "Add mineral"
                    : type === 3
                    ? " Add People"
                    : type === 6
                    ? " Add People"
                    : type === 5
                    ? " Add company"
                    : type === 4 && "Add site"}
                </button>
              </div>
            )}
          </ul>
        )}
      </div>
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((value: any, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer font-Satoshi font-medium"
              onClick={() => handleSelect(value, type)} // Provide a dummy place_id for removal
            >
              {value && value.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MineralSearchDrop;
