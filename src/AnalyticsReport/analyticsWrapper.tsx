import Cards from "../components/cards";
import UserActivities from "../components/Users/Useractivities";
//import Activities from "../components/Users/Activities";
import Layout from "../Layout/layout";
import TableManagementAnalytic from "./analyticReportTable/table";
//import UserAnalytics from "../Usermanagement/useranalytics/analytics";

const UserManagementWrapper = () => {
  return (
    <Layout>
      <div className="w-full">
        <UserActivities />
        <TableManagementAnalytic />
      </div>
    </Layout>
  );
};

export default UserManagementWrapper;
