import Layout from "../Layout/layout";
import Tabs from "./components/tabs";
import MainDocumentWrapper from "./MainDocument";

const DocumentWrapper = () => {
  const tabData = [{ label: "Document", content: <MainDocumentWrapper /> }];
  return (
    <Layout>
      <div className=" bg-white max-w-[500px] mx-auto rounded-md my-8 shadow-md">
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default DocumentWrapper;
