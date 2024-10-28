//import { table } from "console";

//import doc from "../../../../assets/images/Dashboard/doc.png";
import doc from "../../assets/images/Dashboard/doc.png";
import HeroRow from "../../components/table/HeroRow";
import TableColumn from "../../components/table/tableColumn";
import TableRow from "../../components/table/tableRow";
import ActionRow from "../../dashboard/components/table/actionRow";
const TableRowCol = () => {
  return (
    <table className="bg-inherit w-full border-none">
      <thead className="thead">
        <tr className="w-full ">
          <TableColumn name="Document name" width={20} />
          <TableColumn name="Reports" width={20} />
          <TableColumn name="Added by" width={15} />
          <TableColumn name="Tag" width={15} />
          <TableColumn name="Date added" width={15} />
          <TableColumn name="" width={15} />
        </tr>
      </thead>

      <tbody className="tbody">
        <tr className="">
          <HeroRow name="Document name" width={20} image={doc} />
          <TableRow name="Document name" width={20} />
          <TableRow name="Document name" width={15} />
          <TableRow name="Document name" width={15} />
          <TableRow name="Document name" width={15} />
          <ActionRow name="Take action" width={15} />
        </tr>
        <tr className="">
          <HeroRow name="Document name" width={20} image={doc} />
          <TableRow name="Document name" width={20} />
          <TableRow name="Document name" width={15} />
          <TableRow name="Document name" width={15} />
          <TableRow name="Document name" width={15} />
          <ActionRow name="Take action" width={15} />
        </tr>
        <tr className="">
          <HeroRow name="Document name" width={20} image={doc} />
          <TableRow name="Document name" width={20} />
          <TableRow name="Document name" width={15} />
          <TableRow name="Document name" width={15} />
          <TableRow name="Document name" width={15} />
          <ActionRow name="Take action" width={15} />
        </tr>
      </tbody>
    </table>
  );
};

export default TableRowCol;
