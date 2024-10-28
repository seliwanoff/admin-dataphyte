//import { table } from "console";

//import doc from "../../../../assets/images/Dashboard/doc.png";
import doc from "../../assets/images/Dashboard/doc.png";
import HeroRow from "../../components/table/HeroRow";
import TableColumn from "../../components/table/tableColumn";
import TableRow from "../../components/table/tableRow";
import ActionRow from "../../dashboard/components/table/actionRow";
const AnalysisTableRow = () => {
  return (
    <table className="bg-inherit w-full border-none">
      <thead className="thead">
        <tr className="w-full ">
          <TableColumn name="Timestamp" width={20} />
          <TableColumn name="User roles" width={20} />
          <TableColumn name="Action performed" width={15} />
          <TableColumn name="Data accessed" width={15} />
          <TableColumn name="" width={15} />
        </tr>
      </thead>

      <tbody className="tbody">
        <tr className="">
          <TableRow name="09:05:43 | 09/06/2024" width={20} />
          <TableRow name="Guest" width={20} />
          <TableRow name="Download" width={15} />
          <TableRow name="drive.files.google.com" width={15} />
          <ActionRow name="View log details" width={15} />
        </tr>
        <tr className="">
          <TableRow name="09:05:43 | 09/06/2024" width={20} />
          <TableRow name="Guest" width={20} />
          <TableRow name="Download" width={15} />
          <TableRow name="drive.files.google.com" width={15} />
          <ActionRow name="View log details" width={15} />
        </tr>
        <tr className="">
          <TableRow name="09:05:43 | 09/06/2024" width={20} />
          <TableRow name="Guest" width={20} />
          <TableRow name="Download" width={15} />
          <TableRow name="drive.files.google.com" width={15} />
          <ActionRow name="View log details" width={15} />
        </tr>
        <tr className="">
          <TableRow name="09:05:43 | 09/06/2024" width={20} />
          <TableRow name="Guest" width={20} />
          <TableRow name="Download" width={15} />
          <TableRow name="drive.files.google.com" width={15} />
          <ActionRow name="View log details" width={15} />
        </tr>
      </tbody>
    </table>
  );
};

export default AnalysisTableRow;
