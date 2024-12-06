import Layout from "../Layout/layout";
import Tabs from "./components/tabs";
import MineralWrapper from "./MineralWrapper";

const MainMieralWrapper = () => {
  const tabData = [{ label: "Mineral", content: <MineralWrapper /> }];
  return (
    <Layout>
      <div className=" bg-white max-w-[500px] mx-auto rounded-md my-8 shadow-md">
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default MainMieralWrapper;
