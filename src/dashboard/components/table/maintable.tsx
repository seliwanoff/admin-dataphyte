//import { table } from "console";

import HeroRow from "../../../components/table/HeroRow";
import TableColumn from "../../../components/table/tableColumn";
import TableRow from "../../../components/table/tableRow";
import doc from "../../../assets/images/Dashboard/doc.png";
import ActionRow from "./actionRow";

interface MaintableProps {
  reports?: any;
  fetchMineral?: any;
}
const Maintable: React.FC<MaintableProps> = ({ reports, fetchMineral }) => {
  return (
    <table className="bg-inherit w-full border-none">
      <thead className="thead bg-white">
        <tr className="w-full ">
          <TableColumn name="Document name" width={20} />
          {/**  <TableColumn name="Reports" width={20} /> */}
          <TableColumn name="Added by" width={15} />
          <TableColumn name="Tag" width={15} />
          <TableColumn name="Date added" width={15} />
          <TableColumn name="Status" width={15} />
          <TableColumn name="" width={15} />
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
              width={15}
              id={report.id}
              fetchMineral={fetchMineral}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Maintable;
