import React, { useState } from "react";
import left from "../assets/images/Dashboard/left.png";
import right from "../assets/images/Dashboard/right.png";

interface PaginationProps {
  totalItems: number;
  rowsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRows = parseInt(e.target.value, 10);
    setRowsPerPage(selectedRows);
    setCurrentPage(1); // Reset to the first page
    onRowsPerPageChange(selectedRows);
  };

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 3;
    const range = Math.min(totalPages, 5);

    pages.push(1);

    if (currentPage > maxVisiblePages + 1) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - maxVisiblePages);
      i <= Math.min(totalPages - 1, currentPage + maxVisiblePages);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + maxVisiblePages < totalPages - 1) {
      pages.push("...");
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* Rows Per Page Dropdown */}
      <div className="flex items-center">
        <span className="text-[#676767] mr-2 font-polySans font-[400] text-[16px]">
          Rows per page:
        </span>
        <select
          className="border border-gray-300 rounded p-1 text-[#676767] font-polySans font-[300] text-[16px] outline-none"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Numbers */}
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button
            className="px-2 py-1 text-sm text-[#5D6D73] rounded font-polySans"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <div className="flex items-center gap-2">
              {" "}
              <img src={right} alt="" className="h-4" /> Prev
            </div>
          </button>
        )}
        {getPaginationNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`px-3 py-1 text-sm rounded font-polySans  ${
                currentPage === page
                  ? "bg-[#1639300A] text-[#163930] font-medium"
                  : "bg-white text-[#5D6D73] font-[400]"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2">
              {page}
            </span>
          )
        )}
        {currentPage < totalPages && (
          <button
            className="px-2 py-1 text-sm text-[#5D6D73] font-polySans rounded "
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <div className="flex items-center gap-2">
              Next <img src={left} alt="" className="h-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
