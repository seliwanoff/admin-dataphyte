import React from "react";

interface TableColumnProps {
  name: string;
  width: any;
}

const TableColumn: React.FC<TableColumnProps> = ({ name, width }) => {
  return (
    <th className="column" scope="col" style={{ maxWidth: `${width}%` }}>
      {name}
    </th>
  );
};

export default TableColumn;
