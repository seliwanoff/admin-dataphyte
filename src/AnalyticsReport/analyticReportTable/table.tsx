import { useState } from "react";
import Pagination from "../../components/pagination";
import DataTableTools from "../../Datamanagement/table/tabletools";
import AnalyticTableRowCol from "./analyticRowCol";
interface MaintableProps {
  reports?: any;
  fetchMineral?: any;
  totalItems?: any;
  setCurrentPage?: any;
  setRowsPerPage?: any;
  setSearchQuery?: any;
}
const TableManagementAnalytic: React.FC<MaintableProps> = ({
  reports,
  fetchMineral,
  totalItems,
  setCurrentPage,
  setRowsPerPage,
  setSearchQuery,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
  };
  return (
    <div className="mt-5 w-full cards p-6 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-8">
        <DataTableTools
          type={"report"}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          setSearchQuery={setSearchQuery}
        />
        <AnalyticTableRowCol reports={reports} fetchMineral={fetchMineral} />
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

export default TableManagementAnalytic;
