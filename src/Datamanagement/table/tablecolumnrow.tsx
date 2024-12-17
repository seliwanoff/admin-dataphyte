//import { table } from "console";

//import doc from "../../../../assets/images/Dashboard/doc.png";
import { useEffect, useState } from "react";
import doc from "../../assets/images/Dashboard/doc.png";
import HeroRow from "../../components/table/HeroRow";
import TableColumn from "../../components/table/tableColumn";
import TableRow from "../../components/table/tableRow";
import ActionRow from "../../dashboard/components/table/actionRow";
import NewHero from "../../components/table/newHero";
const TableRowCol = () => {
  const baseUrl = process.env.REACT_APP_URL;

  const [allAdmin, setAlladmin] = useState([]);

  const fetchAdmin = async () => {
    try {
      const response = await fetch(`${baseUrl}document/getdocuments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setAlladmin(data.data.data?.reverse());
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
  //  console.log(allAdmin);
  return (
    <table className="bg-inherit w-full border-none">
      <thead className="thead">
        <tr className="w-full ">
          <TableColumn name="Document name" width={30} />
          <TableColumn name="Country" width={10} />
          <TableColumn name="category" width={10} />
          <TableColumn name="Tag" width={15} />
          <TableColumn name="Date added" width={10} />
          {/**
          <TableColumn name="" width={10} />
          */}
        </tr>
      </thead>

      <tbody className="tbody">
        {allAdmin?.map((item: any, index: any) => (
          <tr className="row">
            <NewHero name={item.name} width={20} image={doc} type={item.type} />
            <TableRow name={item.country} width={20} />
            <TableRow name={item.category} width={15} />
            <TableRow name={JSON.parse(item.meta)} width={15} />
            <TableRow
              name={new Date(item.created_at).toLocaleDateString()}
              width={15}
            />
            {/**
            <ActionRow name="Take action" width={15} />
            */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRowCol;
