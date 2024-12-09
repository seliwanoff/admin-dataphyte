import { useEffect, useState } from "react";
import Cards from "../components/cards";
import DateButton from "../components/tabs/datebutton";
import Tabs from "../components/tabs/tab";
import Activities from "../components/Users/Activities";
import UserActivities from "../components/Users/Useractivities";
import Greetings from "./components/Greetings";
import Maintable from "./components/table/maintable";

const Dashboard = () => {
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
    <>
      <div className="flex flex-col gap-6">
        <Greetings />
        <div className="w-full flex items-center justify-between">
          <Tabs />

          <DateButton />
        </div>
        <Cards />
      </div>
      <div className="mt-5 flex   gap-6 justify-start">
        <UserActivities />
        <Activities />
      </div>
      <div className="mt-5 w-full">
        <Maintable reports={reports} fetchMineral={fetchMineral} />
      </div>
    </>
  );
};

export default Dashboard;
