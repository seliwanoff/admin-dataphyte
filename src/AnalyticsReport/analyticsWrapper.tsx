import { useEffect, useState } from "react";
import Cards from "../components/cards";
import UserActivities from "../components/Users/Useractivities";
import Layout from "../Layout/layout";
import TableManagementAnalytic from "./analyticReportTable/table";
import Pagination from "../components/pagination";

const UserManagementWrapper = () => {
  const baseUrl = process.env.REACT_APP_URL;
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMineral = async () => {
    try {
      const response = await fetch(
        `${baseUrl}admin/reports?count=${rowsPerPage}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setReports(data.data.data);
      setTotalItems(data.data.total);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const fetchMineralSearch = async () => {
    try {
      const response = await fetch(
        `${baseUrl}search/all/report?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setReports(data.data.data);
      setTotalItems(data.data.total);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  useEffect(() => {
    fetchMineral();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (searchQuery) {
      fetchMineralSearch();
    } else {
      fetchMineral();
    }
  }, [searchQuery]);
  return (
    <Layout>
      <div className="w-full">
        <UserActivities />
        <TableManagementAnalytic
          reports={reports}
          fetchMineral={fetchMineral}
          totalItems={totalItems}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </Layout>
  );
};

export default UserManagementWrapper;
