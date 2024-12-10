import DataTableTools from "../../Datamanagement/table/tabletools";
import AnalyticTableRowCol from "./analyticRowCol";
interface MaintableProps {
  reports?: any;
  fetchMineral?: any;
}
const TableManagementAnalytic: React.FC<MaintableProps> = ({
  reports,
  fetchMineral,
}) => {
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools />
        <AnalyticTableRowCol reports={reports} fetchMineral={fetchMineral} />
      </div>
    </div>
  );
};

export default TableManagementAnalytic;
