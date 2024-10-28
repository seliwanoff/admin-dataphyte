//import DataTableTools from "./tabletools";

import DataTableTools from "../../Datamanagement/table/tabletools";
import UserTableRowCol from "./usertablerow";

const TableUserManagement = () => {
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools />
        <UserTableRowCol />
      </div>
    </div>
  );
};

export default TableUserManagement;
