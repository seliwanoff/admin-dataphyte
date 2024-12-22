import { useCallback, useEffect, useState } from "react";
import AreaChart from "../charts/AreaCharts";
import YearCards from "../yearcard";
import Tabs2 from "./components/tab2";

const UserActivities = () => {
  const baseUrl = process.env.REACT_APP_URL;
  const [reports, setReports] = useState([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const fetchGraphStat = useCallback(async () => {
    try {
      const response = await fetch(
        `${baseUrl}admin/stats/dashbord/graph?year=${selectedYear}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setReports(data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  }, [selectedYear]);
  useEffect(() => {
    fetchGraphStat();
  }, [selectedYear]);

  return (
    <div className="cards">
      <div className=" mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="font-Satoshi text-[14px] leading-[18.9px] font-medium text-[#333]">
              Total users against:
            </span>
            <Tabs2 />
          </div>
          <YearCards
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
        <AreaChart data={reports} height={300} />
      </div>
    </div>
  );
};

export default UserActivities;
