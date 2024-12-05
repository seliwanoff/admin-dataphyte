import Layout from "../Layout/layout";
import Tabs from "./components/tabs";
import StepperWithForms from "./Form";

const DataCollectionWrapper = () => {
  const tabData = [
    { label: "Company", content: <StepperWithForms /> },
    { label: "Mineral", content: <StepperWithForms /> },
    { label: "People", content: <StepperWithForms /> },
    { label: "Mining Site", content: <StepperWithForms /> },
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
