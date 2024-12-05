import Layout from "../Layout/layout";
import Tabs from "./components/tabs";
import StepperWithForms from "./Form";
import MineralWrapper from "./MineralWrapper";
import MiningSiteWrapper from "./MiningSiteWrapper";
import PeopleWrapper from "./PeopleWrapper";

const DataCollectionWrapper = () => {
  const tabData = [
    { label: "Company", content: <StepperWithForms /> },
    { label: "Mineral", content: <MineralWrapper /> },
    { label: "People", content: <PeopleWrapper /> },
    { label: "Mining Site", content: <MiningSiteWrapper /> },
  ];
  return (
    <Layout>
      <div className=" bg-white max-w-[500px] mx-auto rounded-md my-8 shadow-md">
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default DataCollectionWrapper;
