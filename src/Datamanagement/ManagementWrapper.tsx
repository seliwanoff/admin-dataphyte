import Layout from "../Layout/layout";
import DataAnaytics from "./Analytics/anayltics";
import TableManagement from "./table/maintable";
import TableRowCol from "./table/tablecolumnrow";

const ManagementWrapper = () => {
  return (
    <Layout>
      <DataAnaytics />
      <TableManagement />
    </Layout>
  );
};

export default ManagementWrapper;
