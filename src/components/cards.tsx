import EachCard from "./eachcard";
import feature from "../assets/images/Dashboard/featured.png";
import arrow from "../assets/images/Dashboard/arrow-up.png";
import users from "../assets/images/Dashboard/activeusers.png";
import reports from "../assets/images/Dashboard/reports.png";
import apicalls from "../assets/images/Dashboard/apicalls.png";
interface DataTableToolsProps {
  stat?: any;
}
const Cards: React.FC<DataTableToolsProps> = ({ stat }) => {
  //console.log(stat);
  return (
    <div className=" flex gap-6 items-center ">
      {" "}
      <EachCard
        title="Datasets"
        value={(stat && stat.dataset) || 0}
        mainImage={feature}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Active Users"
        value={(stat && stat.users) || 0}
        mainImage={users}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="API calls"
        value={(stat && stat.api_call) || 0}
        mainImage={apicalls}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Reports"
        value={(stat && stat.report) || 0}
        mainImage={reports}
        percentage="40%"
        percentageImage={arrow}
      />
    </div>
  );
};

export default Cards;
