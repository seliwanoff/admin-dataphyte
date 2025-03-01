import React, { useState, useEffect, useRef } from "react";

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
  value: any; // Single selected value
  onChange: (updatedValue: { id: string; name: string } | null) => void;
  name?: string;
  required?: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  options: OptionType[];
  setPlacedId?: (placeId: string) => void;
  positionFilter?: string;
  type?: any;
  setShowOverlay?: any;
  setIsSelectedPosition?: any;
  acquireValue?: any;
}

const FilterPeopleByPosition: React.FC<FilterPeopleByPositionProps> = ({
  label,
  placeholder = "Search...",
  value = null,
  onChange,
  name,
  required,
  searchQuery,
  setSearchQuery,
  options,
  setPlacedId,
  positionFilter,
  type,
  setShowOverlay,
  setIsSelectedPosition,
  acquireValue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    const matchesPosition =
      positionFilter && typeof option.positionFilter === "string"
        ? option.positionFilter.toLowerCase()?.length > 0
        : true;

    return matchesSearch && matchesPosition;
  });
  //console.log(value[0]?.first_name);

  /***
  useEffect(() => {
    if (acquireValue) {
      handleSelect(value);
    }
  }, [acquireValue, value]);
  */
  const handleSelect = (option: OptionType) => {
    const keyToCheck = `${option.title} ${option.first_name} ${option.last_name}`;
    const selectedValue = { id: option.id, name: keyToCheck };

    onChange(selectedValue);

    setSearchQuery("");
    setIsDropdownOpen(false);

    if (setPlacedId) setPlacedId(option.place_id);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsLoading(true);

    // Simulate a delay for loading
    setTimeout(() => {
      setIsLoading(false);
    }, 700);

    if (e.target.value.trim() === "") {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="relative w-full " ref={dropdownRef}>
        <input
          type="text"
          id={name}
          required={required}
          name={name}
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="input w-full"
        />
        {filteredOptions.length > 0 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[14px]  text-white rounded font-medium float-right m-1 top-0 right-0 absolute"
            onClick={() => {
              setShowOverlay(true);
              //  setIsSelectedPosition(positionFilter);
            }}
          >
            Add new
          </button>
        )}

        {isDropdownOpen && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto">
            {isLoading ? (
              <div className="py-4 flex justify-center items-center w-full">
                <span className="font-Satoshi text-gray-700 text-[14px] font-semibold">
                  Searching...
                </span>
              </div>
            ) : filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`p-2 cursor-pointer hover:bg-slate-200 font-Satoshi font-medium ${
                    value?.name === `${option.first_name} ${option.last_name}`
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
              <div className="py-4 flex justify-center items-center w-full flex-col gap-3">
                <span className="font-Satoshi text-gray-700 text-[14px] font-semibold">
                  No results found
                </span>
                <button
                  className="px-4 py-2 bg-primary font-polySans text-[14px] my-4 mx-auto   text-white rounded font-medium"
                  onClick={() => {
                    setShowOverlay(true);
                    // setIsSelectedPosition(positionFilter);
                  }}
                >
                  Add new
                </button>
              </div>
            )}
          </ul>
        )}
      </div>
      {value?.length !== 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className="bg-primary text-white px-3 py-1 rounded-full text-sm cursor-pointer font-Satoshi font-medium"
            onClick={() => onChange(null)}
          >
            {value.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterPeopleByPosition;
