import React, { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  label: string;
  options: { name: string; place_id: string; title: string }[];
  values?: string[];
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
  parent,
  setShowOverlay,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      setIsSearching(true);
      // Simulate an API call delay for search
      setTimeout(() => {
        setIsSearching(false);
        setIsDropdownOpen(true);
      }, 900); // Adjust as needed for actual API
    } else {
      setIsDropdownOpen(false);
    }
  };

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
      const alreadySelected = values.some(
        (item: any) => item.id === option.id // Use `id` for comparison
      );

      const updatedValues = alreadySelected
        ? values.filter((item: any) => item.id !== option.id) // Use `id` for removal
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
  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2 w-full ${className}`}
    >
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
          onChange={(e) => handleSearch(e.target.value)}
          className="input w-full"
        />
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
                    values.includes(option.name) ? "bg-slate-100" : ""
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
                  {type === 5 ? "Add company" : "Add mineral"}
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
