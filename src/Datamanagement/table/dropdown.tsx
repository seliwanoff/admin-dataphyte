import React from "react";

interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  setShow?: any;
  show?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  setShow,
  show,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setShow(false);
  };

  return (
    <div className="relative inline-block">
      {show && (
        <ul className="absolute left-0 mt-2 w-48 bg-white font-Inter border border-gray-300 rounded-md shadow-lg z-10">
          {items.map((item) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
