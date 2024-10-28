import AreaChart from "../charts/AreaCharts";
import YearCards from "../yearcard";
import Tabs2 from "./components/tab2";

const UserActivities = () => {
  const data = [
    { x: "Jan", y1: 50000, y2: 30000 },
    { x: "Feb", y1: 100000, y2: 60000 },
    { x: "Mar", y1: 150000, y2: 90000 },
    { x: "Apr", y1: 120000, y2: 80000 },
    { x: "May", y1: 80000, y2: 60000 },
    { x: "Jun", y1: 130000, y2: 100000 },
    { x: "Jul", y1: 90000, y2: 70000 },
    { x: "Aug", y1: 140000, y2: 120000 },
    { x: "Sep", y1: 110000, y2: 90000 },
    { x: "Oct", y1: 130000, y2: 110000 },
    { x: "Nov", y1: 120000, y2: 100000 },
    { x: "Dec", y1: 150000, y2: 130000 },
  ];

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
          <YearCards />
        </div>
        <AreaChart data={data} height={300} />
      </div>
    </div>
  );
};

export default UserActivities;
