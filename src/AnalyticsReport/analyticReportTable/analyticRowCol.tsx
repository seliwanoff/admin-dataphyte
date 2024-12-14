//import { table } from "console";

//import doc from "../../../../assets/images/Dashboard/doc.png";
import { useState } from "react";
import doc from "../../assets/images/Dashboard/doc.png";
import HeroRow from "../../components/table/HeroRow";
import TableColumn from "../../components/table/tableColumn";
import TableRow from "../../components/table/tableRow";
import ActionRow from "../../dashboard/components/table/actionRow";
import DocumentViewer from "../../components/documentViewer";

interface MaintableProps {
  reports?: any;
  fetchMineral?: any;
}
const AnalyticTableRowCol: React.FC<MaintableProps> = ({
  reports,
  fetchMineral,
}) => {
  const [showDocument, setShowDocumment] = useState(false);
  const [url, setUrl] = useState("");
  return (
    <>
      {showDocument && (
        <DocumentViewer documentUrl={url} onClose={setShowDocumment} />
      )}
      <table className="bg-inherit w-full border-none">
        <thead className="thead">
          <tr className="w-full ">
            <TableColumn name="Document name" width={30} />
            <TableColumn name="Added by" width={20} />
            <TableColumn name="Tag" width={15} />
            <TableColumn name="Date added" width={20} />
            <TableColumn name="Status" width={20} />
            <TableColumn name="" width={20} />
          </tr>
        </thead>

        <tbody className="tbody bg-white">
          {reports?.map((report: any, index: any) => (
            <tr className="" key={index}>
              <HeroRow
                name={report.title}
                width={20}
                image={report.article_picture}
              />
              {/**  <TableRow name="Document name" width={20} /> */}
              <TableRow name={report.name} width={15} />
              <TableRow
                name={report.meta !== undefined && JSON.parse(report.meta)}
                width={15}
              />
              <TableRow
                name={new Date(report.created_at).toLocaleDateString()}
                width={15}
              />
              <TableRow name={report.status} width={15} />
              <ActionRow
                name="Take action"
                width={30}
                id={report.id}
                fetchMineral={fetchMineral}
                setShowDocumment={setShowDocumment}
                setUrl={setUrl}
                url={report.link}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AnalyticTableRowCol;
