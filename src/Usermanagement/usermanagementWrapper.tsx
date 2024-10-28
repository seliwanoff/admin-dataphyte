import Layout from "../Layout/layout";
import UserAnalytics from "./useranalytics/analytics";
import TableUserManagement from "./Usertable/maintable";
import UserTableRowCol from "./Usertable/usertablerow";

const UserManagementWrapper = () => {
  return (
    <Layout>
      <UserAnalytics />
      <TableUserManagement />
    </Layout>
  );
};

export default UserManagementWrapper;
