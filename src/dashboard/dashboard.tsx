import Cards from "../components/cards";
import DateButton from "../components/tabs/datebutton";
import Tabs from "../components/tabs/tab";
import Activities from "../components/Users/Activities";
import UserActivities from "../components/Users/Useractivities";
import Greetings from "./components/Greetings";
import Maintable from "./components/table/maintable";

const Dashboard = () => {
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
        <Maintable />
      </div>
    </>
  );
};

export default Dashboard;
