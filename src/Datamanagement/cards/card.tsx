//import EachCard from "./eachcard";
import feature from "../../assets/images/Datamanagement/totaldownloads.png";
import arrow from "../../assets/images/Dashboard/arrow-up.png";
import users from "../../assets/images/Datamanagement/datasetsupload.png";
//import reports from "../assets/images/Dashboard/reports.png";
import apicalls from "../../assets/images/Datamanagement/datasetsdownloaded.png";
import EachCard from "../../components/eachcard";
import { useCallback, useEffect, useState } from "react";

const AnalyticsCard = () => {
  const [dataSets, setDataSets] = useState<number>(0);
  const baseUrl = process.env.REACT_APP_URL;

  const fetchMineral = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}admin/stats/dashbord/dataset`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      console.log(data);
      setDataSets(data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  }, [baseUrl]);
  useEffect(() => {
    fetchMineral();
  }, []);
  return (
    <div className=" flex gap-6 items-center ">
      {" "}
      <EachCard
        title="Datasets"
        value={dataSets || 0}
        mainImage={feature}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Datasets uploaded"
        value={dataSets | 0}
        mainImage={users}
        percentage="40%"
        percentageImage={arrow}
      />
    </div>
  );
};

export default AnalyticsCard;
