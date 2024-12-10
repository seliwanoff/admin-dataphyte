import React, { useState } from "react";
import arrow from "../../../assets/images/Dashboard/action-arrow.png";
import eye from "../../../assets/images/Dashboard/eye.png";
import deletes from "../../../assets/images/Dashboard/Delete.png";
import updateReportStatus from "../../../api/fetch";

interface ActionRowProps {
  name: string;
  width: any;
  id?: any;
  fetchMineral?: any;
}

const ActionRow: React.FC<ActionRowProps> = ({
  name,
  width,
  id,
  fetchMineral,
}) => {
  const [isDrop, setIsdrop] = useState(false);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const updatedReport = await updateReportStatus(id, newStatus);
      // console.log("Updated Report:", updatedReport);
      fetchMineral();
      setIsdrop(false);
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };
  return (
    <td className="row relative" style={{ maxWidth: `${width}% ` }}>
      <div
        className="py-[6px] px-3 bg-[#7F56D91F] rounded-xl flex items-center gap-[4px] cursor-pointer justify-center h-8 w-fit max-w-[350px]"
        onClick={() => setIsdrop(!isDrop)}
      >
        <span className="text-[14px] text-[#7F55DA] leading-5 font-medium font-Satoshi">
          {name}
        </span>
        <img src={arrow} alt="" className="h-5" />
      </div>
      {isDrop && (
        <div className="absolute top-12 bg-[#fff] rounded-[8px] p-4 flex w-full flex-col gap-[10px] shadow-lg z-50  min-w-[180px]">
          <div className="flex items-center gap-4 w-full cursor-pointer">
            <img src={eye} alt="" className="h-6" />
            <span className="text-[#101828] font-Satoshi text-[14px] leading-[18.4px]">
              Review Report
            </span>
          </div>
          <div className="flex items-center gap-4 w-full cursor-pointer">
            <img src={eye} alt="" className="h-6" />
            <span
              className="text-[#101828] font-Satoshi text-[14px] leading-[18.4px]"
              onClick={() => handleStatusChange(id, "Approved")}
            >
              Publish Report
            </span>
          </div>
          <div className="flex items-center gap-4 w-full">
            <img src={deletes} alt="" className="h-6" />
            <span
              className="text-[#D92D20] font-Satoshi text-[14px] leading-[18.4px] cursor-pointer"
              onClick={() => handleStatusChange(id, "rejected")}
            >
              Reject Report
            </span>
          </div>
        </div>
      )}
    </td>
  );
};

export default ActionRow;
