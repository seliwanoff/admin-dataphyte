import React, { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  label: string;
  options: { name: string; place_id: string; title: string }[];
  values?: any;
  onChange?: any;
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
  parent?: string;
  setShowOverlay?: any;
  acquireValue?: boolean;
}

const MineralSearchDrop: React.FC<SearchableSelectProps> = ({
  label,
  options,
  values,
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
  parent,
  setShowOverlay,
  acquireValue,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setIsDropdownOpen(true);
      }, 900);
    } else {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    if (acquireValue) {
      handleSelect(values, type);
    }
  }, [acquireValue, values, type]);
  const handleSelect = (
    option: {
      title: any;
      name: string;
      place_id: string;
      first_name?: string;
      last_name?: string;
      id?: any;
    },
    type: number
  ) => {
    const keyToCheck =
      type === 2 || type === 4 || type === 5
        ? option.name
        : `${option.title} ${option.first_name} ${option.last_name}`;
    const keyToAdd = { id: option.id, name: keyToCheck };

    if (parent === "parent") {
      const updatedValues = [keyToAdd];
      handleSearch("");

      if (onChange) onChange(updatedValues);
    } else {
      const alreadySelected =
        values && values?.some((item: any) => item.id === option.id);

      const updatedValues = alreadySelected
        ? values.filter((item: any) => item.id !== option.id)
        : [...values, keyToAdd];

      if (onChange) onChange(updatedValues);
      handleSearch("");
    }

    if (setPlacedId) setPlacedId(option.place_id);
    setIsDropdownOpen(false);
  };

  const handleCloseDropdown = () => setIsDropdownOpen(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      handleCloseDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);
  const handleClickShow = () => {
    setShowOverlay(true);
  };

  const isType =
    type === 5
      ? "Add new"
      : type === 3
      ? "Add new"
      : type === 4
      ? "Add new"
      : "Add new";
  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2 w-full ${className}`}
    >
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="relative w-full ">
        <input
          type="text"
          id={name}
          required={required}
          name={name}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="input w-full"
        />
        {options.length > 0 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[12px]  text-white rounded font-medium m-1 float-end mb-9 top-0 absolute right-0 "
            onClick={handleClickShow}
          >
            {isType}
          </button>
        )}
        {isDropdownOpen && searchQuery.trim() !== "" && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto">
            {isSearching ? (
              <div className="py-4 flex justify-center items-center">
                <span className="text-gray-700 text-sm">Searching...</span>
              </div>
            ) : options.length > 0 ? (
              options.map((option: any, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option, type)}
                  className={`p-2 cursor-pointer hover:bg-slate-200 font-Satoshi font-medium ${
                    values && values?.includes(option.name)
                      ? "bg-slate-100"
                      : ""
                  }`}
                >
                  {type === 2 || type === 4 || type === 5
                    ? option.name
                    : `${option.first_name || ""} ${option.last_name || ""}`}
                </li>
              ))
            ) : (
              <div className="py-4 flex justify-center items-center w-full flex-col gap-2">
                <span className="font-Satoshi text-gray-700 text-[14px] font-semibold">
                  {type === 2
                    ? "No mineral found"
                    : type === 3 || type === 6
                    ? "No people found"
                    : type === 4
                    ? "No Site found"
                    : "No company found"}
                </span>

                <button
                  className="px-4 py-2 bg-primary font-polySans text-[14px]  text-white rounded font-medium"
                  onClick={handleClickShow}

                  //   disabled={currentStep === steps.length - 1}
                >
                  {isType}
                </button>
              </div>
            )}
          </ul>
        )}
      </div>
      {values && values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {values &&
            values.map((value: any, index: any) => (
              <span
                key={index}
                className="bg-primary text-white px-3 py-1 rounded-full text-sm cursor-pointer font-Satoshi font-medium"
                onClick={() => handleSelect(value, type)}
              >
                {value.name}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default MineralSearchDrop;
