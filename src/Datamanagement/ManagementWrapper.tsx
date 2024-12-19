import Layout from "../Layout/layout";
import DataAnaytics from "./Analytics/anayltics";
import TableManagement from "./table/maintable";

const ManagementWrapper = () => {
  return (
    <Layout>
      <DataAnaytics />
      <TableManagement />
    </Layout>
  );
};

export default ManagementWrapper;
