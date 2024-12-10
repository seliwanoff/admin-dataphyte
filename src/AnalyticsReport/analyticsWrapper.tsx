import { useEffect, useState } from "react";
import Cards from "../components/cards";
import UserActivities from "../components/Users/Useractivities";
import Layout from "../Layout/layout";
import TableManagementAnalytic from "./analyticReportTable/table";

const UserManagementWrapper = () => {
  const baseUrl = process.env.REACT_APP_URL;
  const [reports, setReports] = useState([]);

  const fetchMineral = async () => {
    try {
      const response = await fetch(`${baseUrl}admin/reports`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      // console.log(data);
      setReports(data.data.data);

      //setMineralOption(data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
      //  setOptions([]);
    }
  };
  useEffect(() => {
    fetchMineral();
  }, []);
  return (
    <Layout>
      <div className="w-full">
        <UserActivities />
        <TableManagementAnalytic reports={reports} />
      </div>
    </Layout>
  );
};

export default UserManagementWrapper;
