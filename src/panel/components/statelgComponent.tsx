import React, { useState } from "react";

interface SearchableDropdownProps {
  options: string[];
  label?: string;
  setSelectedState?: any;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  label,
  setSelectedState,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setSearchQuery("");
    setShowDropdown(false);
    if (setSelectedState) {
      setSelectedState(option);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <h3 className="label">{label}</h3>}

      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Type to search..."
          className="w-full input border border-gray-300 rounded p-2"
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && (
          <ul className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedOption === option ? "bg-gray-200" : "bg-white"
                  } border-b border-gray-200`}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">
                No options found
              </li>
            )}
          </ul>
        )}
      </div>

      {selectedOption && (
        <span className="bg-primary text-white px-3 py-1 rounded-full w-fit text-sm cursor-pointer font-Satoshi font-medium">
          {selectedOption}
        </span>
      )}
    </div>
  );
};

export default SearchableDropdown;
