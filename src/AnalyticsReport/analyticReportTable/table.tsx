import DataTableTools from "../../Datamanagement/table/tabletools";
import AnalyticTableRowCol from "./analyticRowCol";
interface MaintableProps {
  reports?: any;
}
const TableManagementAnalytic: React.FC<MaintableProps> = ({ reports }) => {
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools />
        <AnalyticTableRowCol reports={reports} />
      </div>
    </div>
  );
};

export default TableManagementAnalytic;
