import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import UserAnalytics from "./useranalytics/analytics";
import TableUserManagement from "./Usertable/maintable";

const UserManagementWrapper = () => {
  const baseUrl = process.env.REACT_APP_URL;
  const [allAdmin, setAlladmin] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const fetchAdmin = async () => {
    try {
      const response = await fetch(
        `${baseUrl}auth/get-all-admin?count=${rowsPerPage}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setAlladmin(data.data.data);
      setTotalItems(data.data.total);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, [currentPage, rowsPerPage]);
  return (
    <Layout>
      <UserAnalytics />
      <TableUserManagement
        admin={allAdmin}
        fetchAdmin={fetchAdmin}
        totalItems={totalItems}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Layout>
  );
};

export default UserManagementWrapper;
