import React, { useState } from "react";

interface SearchableSelectProps {
  label: string;
  options: string[]; // Options passed from the parent
  value?: string; // Selected value
  onChange?: (value: string) => void; // Callback when an option is selected
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
  setSearchQuery: any;
  searchQuery: string;
  type?: number;
  setisAddnewpeople?: any;
  setPlacedId?: any;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
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
}) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //console.log(options);
  const handleSelect = (option: any) => {
    if (onChange) onChange(option);
    setSearch(option);
    setIsDropdownOpen(false);
    setPlacedId(option.place_id);
  };

  return (
    <div className={`flex flex-col gap-2 w-full  ${className}`}>
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
          value={value === "" ? searchQuery : value}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="input w-full"
        />
        {isDropdownOpen && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-auto">
            {options && options.length > 0
              ? options.map((option: any, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleSelect(option);
                    }}
                    className="p-2 cursor-pointer  hover:bg-slate-200 font-Satoshi font-medium"
                  >
                    {option.description}
                  </li>
                ))
              : type === 2 && (
                  <div className="py-4 flex justify-center items-center w-full flex-col">
                    {" "}
                    <span className="font-Satoshi text-gray-700 text-[14px] font-semibold">
                      No people found.
                    </span>
                    <button
                      className="px-4 py-2 bg-primary font-polySans text-[14px] my-4 mx-auto   text-white rounded font-medium"
                      onClick={() => setisAddnewpeople(true)}
                    >
                      Add mineral
                    </button>
                  </div>
                )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
