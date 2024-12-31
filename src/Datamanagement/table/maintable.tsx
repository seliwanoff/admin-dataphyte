import { useEffect, useState } from "react";
import TableRowCol from "./tablecolumnrow";
import DataTableTools from "./tabletools";
import Pagination from "../../components/pagination";

const TableManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDateChange = (dates: { from: Date; to: Date }) => {
    console.log(dates);
  };
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
  };
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setSearchQuery={setSearchQuery}
          setShowPicker={setShowPicker}
          showPicker={showPicker}
        />
        <TableRowCol
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setTotalItems={setTotalItems}
          selectedItem={selectedItem}
          searchQuery={searchQuery}
        />

        <Pagination
          totalItems={totalItems}
          rowsPerPageOptions={[20, 50, 100, 200]}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};

export default TableManagement;
