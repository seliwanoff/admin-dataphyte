import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import UserAnalytics from "./useranalytics/analytics";
import TableUserManagement from "./Usertable/maintable";
import UserTableRowCol from "./Usertable/usertablerow";

const UserManagementWrapper = () => {
  const baseUrl = process.env.REACT_APP_URL;
  const [allAdmin, setAlladmin] = useState([]);

  const fetchAdmin = async () => {
    try {
      const response = await fetch(`${baseUrl}auth/get-all-admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      //  console.log(data);
      setAlladmin(data.data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
  return (
    <Layout>
      <UserAnalytics />
      <TableUserManagement admin={allAdmin} fetchAdmin={fetchAdmin} />
    </Layout>
  );
};

export default UserManagementWrapper;
