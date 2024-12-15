//import { table } from "console";

//import doc from "../../../../assets/images/Dashboard/doc.png";
import doc from "../../assets/images/Dashboard/doc.png";
import HeroRow from "../../components/table/HeroRow";
import TableColumn from "../../components/table/tableColumn";
import TableRow from "../../components/table/tableRow";
import ActionRow from "../../dashboard/components/table/actionRow";
import UserActionRole from "../../dashboard/components/table/UserActionRow";

interface DataTableToolsProps {
  admin?: any;
  fetchAdmin?: any;
}
const UserTableRowCol: React.FC<DataTableToolsProps> = ({
  admin,
  fetchAdmin,
}) => {
  return (
    <table className="bg-inherit w-full border-none px-4">
      <thead className="thead">
        <tr className="w-full ">
          <TableColumn name="Full name" width={20} />
          <TableColumn name="Email address" width={20} />
          <TableColumn name="Roles" width={15} />
          <TableColumn name="Date" width={15} />
          <TableColumn name="Status" width={15} />
          <TableColumn name="" width={15} />
        </tr>
      </thead>

      <tbody className="tbody px-4">
        {admin &&
          admin?.map((item: any, index: any) => (
            <tr className="">
              <HeroRow
                name={item.first_name + " " + item.last_name}
                width={20}
                image={doc}
              />
              <TableRow name={item.email} width={20} />
              <TableRow name={item.auth_level} width={15} />
              <TableRow
                name={new Date(item.created_at).toLocaleDateString()}
                width={15}
              />
              <TableRow name={item.account_status} width={15} />
              <UserActionRole
                name="Take action"
                width={15}
                id={item.id}
                status={item.account_status}
                fetchAdmin={fetchAdmin}
              />
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserTableRowCol;
