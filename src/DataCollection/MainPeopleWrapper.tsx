import Layout from "../Layout/layout";
import Tabs from "./components/tabs";

import PeopleWrapper from "./PeopleWrapper";

const PeopleCollectionWrapper = () => {
  const tabData = [{ label: "People", content: <PeopleWrapper /> }];
  return (
    <Layout>
      <div className=" bg-white max-w-[500px] mx-auto rounded-md my-8 shadow-md">
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default PeopleCollectionWrapper;
