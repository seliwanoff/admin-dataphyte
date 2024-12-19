//import DataTableTools from "./tabletools";

import { useState } from "react";
import Pagination from "../../components/pagination";
import DataTableTools from "../../Datamanagement/table/tabletools";
import UserTableRowCol from "./usertablerow";
interface DataTableToolsProps {
  admin?: any;
  fetchAdmin?: any;
  totalItems?: any;
  setCurrentPage?: any;
  setRowsPerPage?: any;
}
const TableUserManagement: React.FC<DataTableToolsProps> = ({
  admin,
  fetchAdmin,
  totalItems,
  setCurrentPage,
  setRowsPerPage,
}) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
  };
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools />
        <UserTableRowCol admin={admin} fetchAdmin={fetchAdmin} />
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

export default TableUserManagement;
