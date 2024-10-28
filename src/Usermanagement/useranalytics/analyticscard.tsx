//import EachCard from "./eachcard";
import feature from "../../assets/images/Datamanagement/totaldownloads.png";
import arrow from "../../assets/images/Dashboard/arrow-up.png";
import users from "../../assets/images/Datamanagement/datasetsupload.png";
//import reports from "../assets/images/Dashboard/reports.png";
import apicalls from "../../assets/images/Datamanagement/datasetsdownloaded.png";
import EachCard from "../../components/eachcard";

const UserAnaylticsCard = () => {
  return (
    <div className=" flex gap-6 items-center ">
      {" "}
      <EachCard
        title="Total users"
        value={5737}
        mainImage={feature}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Active users"
        value={320}
        mainImage={users}
        percentage="40%"
        percentageImage={arrow}
      />
      <EachCard
        title="Administrator"
        value={1100}
        mainImage={apicalls}
        percentage="40"
        percentageImage={arrow}
      />
    </div>
  );
};

export default UserAnaylticsCard;
