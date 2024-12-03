import Layout from "../Layout/layout";
import StepperWithForms from "./Form";

const DataCollectionWrapper = () => {
  return (
    <Layout>
      <div className=" bg-white max-w-[500px] mx-auto rounded-md my-8 shadow-md">
        <StepperWithForms />
      </div>
    </Layout>
  );
};

export default DataCollectionWrapper;
