import React from "react";

interface TableRowProps {
  name: string;
  width: any;
}

const TableRow: React.FC<TableRowProps> = ({ name, width }) => {
  return (
    <td
      className="row"
      style={{
        maxWidth: `${width}%`,
        color: `${
          name === "approved" ? "green" : name === "rejected" ? "#D92D20" : " "
        }`,
      }}
    >
      {name}
    </td>
  );
};

export default TableRow;
