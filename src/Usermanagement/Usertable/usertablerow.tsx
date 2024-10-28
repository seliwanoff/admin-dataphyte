//import { table } from "console";

//import doc from "../../../../assets/images/Dashboard/doc.png";
import doc from "../../assets/images/Dashboard/doc.png";
import HeroRow from "../../components/table/HeroRow";
import TableColumn from "../../components/table/tableColumn";
import TableRow from "../../components/table/tableRow";
import ActionRow from "../../dashboard/components/table/actionRow";
const UserTableRowCol = () => {
  return (
    <table className="bg-inherit w-full border-none px-4">
      <thead className="thead">
        <tr className="w-full ">
          <TableColumn name="Full name" width={20} />
          <TableColumn name="Email address" width={20} />
          <TableColumn name="Roles" width={15} />
          <TableColumn name="Last activity" width={15} />
          <TableColumn name="" width={15} />
        </tr>
      </thead>

      <tbody className="tbody px-4">
        <tr className="">
          <HeroRow name="Adekola Johnson" width={20} image={doc} />
          <TableRow name="oayooye@cjid.com" width={20} />
          <TableRow name="Administrator" width={15} />
          <TableRow name="9:05" width={15} />
          <ActionRow name="Take action" width={15} />
        </tr>
        <tr className="">
          <HeroRow name="Adekola Johnson" width={20} image={doc} />
          <TableRow name="oayooye@cjid.com" width={20} />
          <TableRow name="Administrator" width={15} />
          <TableRow name="9:05" width={15} />
          <ActionRow name="Take action" width={15} />
        </tr>
        <tr className="">
          <HeroRow name="Adekola Johnson" width={20} image={doc} />
          <TableRow name="oayooye@cjid.com" width={20} />
          <TableRow name="Administrator" width={15} />
          <TableRow name="9:05" width={15} />
          <ActionRow name="Take action" width={15} />
        </tr>
      </tbody>
    </table>
  );
};

export default UserTableRowCol;
