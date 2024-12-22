import { useCallback, useEffect, useState } from "react";
import Cards from "../components/cards";
import DateButton from "../components/tabs/datebutton";
import Tabs from "../components/tabs/tab";
import Activities from "../components/Users/Activities";
import UserActivities from "../components/Users/Useractivities";
import Greetings from "./components/Greetings";
import Maintable from "./components/table/maintable";
import { getDashboardStat } from "../api/equest";
import CustomDatePicker from "./components/customDatePicket";

const Dashboard = () => {
  const baseUrl = process.env.REACT_APP_URL;
  const [reports, setReports] = useState([]);
  const [dashboardtat, setDashboard] = useState([]);
  const [getDate, setDate] = useState<any>("12 months");
  const [showPicker, setShowPicker] = useState(false);

  const fetchMineral = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}admin/reports`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setReports(data.data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  }, [baseUrl]);
  useEffect(() => {
    fetchMineral();
  }, []);
  useEffect(() => {
    getDashboardStat(getDate)
      .then((data) => {
        setDashboard(data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
      });
  }, [getDate]);

  const handleDateChange = (dates: { from: Date; to: Date }) => {
    getDashboardStat({ from: dates.from, to: dates.to })
      .then((data) => setDashboard(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <Greetings />
        <div className="w-full flex items-center justify-between relative">
          <Tabs setDate={setDate} />

          <DateButton setShowPicker={setShowPicker} />
          {showPicker && (
            <CustomDatePicker
              onDateChange={handleDateChange}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
            />
          )}
        </div>
        <Cards stat={dashboardtat} />
      </div>
      <div className="mt-5 flex   gap-6 justify-start">
        <UserActivities />
        <Activities reports={reports} />
      </div>
      <div className="mt-5 w-full">
        <Maintable reports={reports} fetchMineral={fetchMineral} />
      </div>
    </>
  );
};

export default Dashboard;
