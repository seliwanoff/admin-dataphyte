//import TableRowCol from "./tablecolumnrow";
//import DataTableTools from "./tabletools";

import AnalysisTableRow from "./analysistbale";

const TableManagementAccess = () => {
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <AnalysisTableRow />
      </div>
    </div>
  );
};

export default TableManagementAccess;
