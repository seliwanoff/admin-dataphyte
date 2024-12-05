import React, { useState } from "react";

interface OptionType {
  name: string;
  place_id: string;
  title?: string; // Position of the person (e.g., CEO, CFO, CTO)
  first_name?: string;
  last_name?: string;
  id?: any;
  positionFilter?: any;
  other_name?: any;
}

interface FilterPeopleByPositionProps {
  label: string;
  placeholder?: string;
  value: { id: string; name: string }[]; // Array of selected values
  onChange: (updatedValues: { id: string; name: string }[]) => void;
  name?: string;
  required?: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  options: OptionType[];
  setPlacedId?: (placeId: string) => void;
  positionFilter?: string;
  type?: any; // Position to filter by (e.g., "CEO", "CFO", "CTO")
}

const FilterPeopleByPosition: React.FC<FilterPeopleByPositionProps> = ({
  label,
  placeholder = "Search...",
  value = [],
  onChange,
  name,
  required,
  searchQuery,
  setSearchQuery,
  options,
  setPlacedId,
  positionFilter,
  type,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = options.filter((option) => {
    const matchesSearch =
      (option.first_name &&
        option.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (option.last_name &&
        option.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (option.other_name &&
        option.other_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (option.name &&
        option.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Check if `positionFilter` exists and is not empty
    const matchesPosition =
      positionFilter && typeof option.positionFilter === "string"
        ? option.positionFilter.toLowerCase().length > 0
        : true;

    return matchesSearch && matchesPosition;
  });

  const handleSelect = (option: OptionType) => {
    //  console.log(option);
    let keyToCheck: string;
    let keyToAdd: { id: string; name: string };

    keyToCheck = ` ${option.first_name} ${option.last_name}`;
    keyToAdd = { id: option.id, name: keyToCheck };

    const alreadySelected = value.some((item) => item.name !== "");

    const updatedValues = alreadySelected
      ? value.filter((item) => item.name !== keyToCheck)
      : [...value, keyToAdd];

    onChange(updatedValues);

    setSearchQuery("");
    setIsDropdownOpen(false);

    if (setPlacedId) setPlacedId(option.place_id);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
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
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`p-2 cursor-pointer hover:bg-slate-200 font-Satoshi font-medium ${
                    value.some((val) => val.name === option.name)
                      ? "bg-slate-100"
                      : ""
                  }`}
                >
                  {option.title
                    ? `${option.title} ${option.first_name || ""} ${
                        option.last_name || ""
                      }`
                    : option.name}
                </li>
              ))
            ) : (
              <div className="py-4 flex justify-center items-center w-full">
                <span className="font-Satoshi text-gray-700 text-[14px] font-semibold">
                  No results found
                </span>
              </div>
            )}
          </ul>
        )}
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((val, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer font-Satoshi font-medium"
              onClick={() => handleSelect({ name: val.name, place_id: val.id })}
            >
              {val.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPeopleByPosition;
