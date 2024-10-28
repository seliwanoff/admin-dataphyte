import EachCard from "./eachcard";
import feature from "../assets/images/Dashboard/featured.png";
import arrow from "../assets/images/Dashboard/arrow-up.png";
import users from "../assets/images/Dashboard/activeusers.png";
import reports from "../assets/images/Dashboard/reports.png";
import apicalls from "../assets/images/Dashboard/apicalls.png";

const Cards = () => {
  return (
    <div className=" flex gap-6 items-center ">
      {" "}
      <EachCard
        title="Datasets"
        value={5737}
        mainImage={feature}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Active Users"
        value={320}
        mainImage={users}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="API calls"
        value={1100}
        mainImage={apicalls}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Reports"
        value={21500}
        mainImage={reports}
        percentage="40%"
        percentageImage={arrow}
      />
    </div>
  );
};

export default Cards;
