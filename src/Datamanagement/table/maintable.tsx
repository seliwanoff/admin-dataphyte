import { useEffect, useState } from "react";
import TableRowCol from "./tablecolumnrow";
import DataTableTools from "./tabletools";

const TableManagement = () => {
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools />
        <TableRowCol />
      </div>
    </div>
  );
};

export default TableManagement;
