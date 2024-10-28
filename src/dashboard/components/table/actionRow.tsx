import React from "react";
import arrow from "../../../assets/images/Dashboard/action-arrow.png";

interface ActionRowProps {
  name: string;
  width: any;
}

const ActionRow: React.FC<ActionRowProps> = ({ name, width }) => {
  return (
    <td className="row" style={{ maxWidth: `${width}%` }}>
      <div className="py-[6px] px-3 bg-[#7F56D91F] rounded-xl flex items-center gap-[4px] cursor-pointer justify-center h-8">
        <span className="text-[14px] text-[#7F55DA] leading-5 font-medium font-Satoshi">
          {name}
        </span>
        <img src={arrow} alt="" className="h-5" />
      </div>
    </td>
  );
};

export default ActionRow;
//background: #7F56D91F;
//background: #7F55DA;
