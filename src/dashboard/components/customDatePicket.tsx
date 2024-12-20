import React, { useState, useRef } from "react";

interface CustomDatePickerProps {
  onDateChange: (dates: { from: Date; to: Date }) => void;
  showPicker?: any;
  setShowPicker?: any;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onDateChange,
  showPicker,
  setShowPicker,
}) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    const date = new Date(e.target.value);
    if (type === "from") {
      setFromDate(date);
    } else {
      setToDate(date);
    }
  };

  const handleApply = () => {
    if (fromDate && toDate) {
      onDateChange({ from: fromDate, to: toDate });
      setShowPicker(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute top-full mt-2 right-0 bg-white shadow-lg border rounded p-4 w-64 z-50"
        >
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-gray-600 text-sm mb-1 font-Satoshi">
                From:
              </label>
              <input
                type="date"
                className="border rounded w-full p-2 font-polySans outline-none"
                onChange={(e) => handleDateChange(e, "from")}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1 font-Satoshi">
                To:
              </label>
              <input
                type="date"
                className="border rounded w-full p-2 font-polySans outline-none"
                onChange={(e) => handleDateChange(e, "to")}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={() => setShowPicker(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded font-polySans text-center justify-center"
                onClick={handleApply}
                disabled={!fromDate || !toDate}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomDatePicker;
