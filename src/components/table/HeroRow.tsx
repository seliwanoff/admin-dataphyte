import React from "react";

interface HeroRowProps {
  name: string;
  width: any;
  image: any;
}

const HeroRow: React.FC<HeroRowProps> = ({ name, width, image }) => {
  const baseURlFile = process.env.REACT_APP_FILE_URL;

  return (
    <td className="row  flex items-center gap-4">
      <img src={`${baseURlFile}${image}`} alt="" className="h-8 w-8" />
      <div className="flex flex-col gap-[2]">
        <span className="block">{name}</span>
      </div>
    </td>
  );
};

export default HeroRow;
