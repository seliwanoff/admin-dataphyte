import DataTableTools from "../../Datamanagement/table/tabletools";
import AnalyticTableRowCol from "./analyticRowCol";

const TableManagementAnalytic = () => {
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools />
        <AnalyticTableRowCol />
      </div>
    </div>
  );
};

export default TableManagementAnalytic;
