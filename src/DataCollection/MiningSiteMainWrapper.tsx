import Layout from "../Layout/layout";
import Tabs from "./components/tabs";

import MiningSiteWrapper from "./MiningSiteWrapper";

const MainMininsiteWrapper = () => {
  const tabData = [{ label: "Mining Site", content: <MiningSiteWrapper /> }];
  return (
    <Layout>
      <div className=" bg-white max-w-[500px] mx-auto rounded-md my-8 shadow-md">
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default MainMininsiteWrapper;
