import React from "react";

interface HeroRowProps {
  name: string;
  width: any;
  image: any;
}

const HeroRow: React.FC<HeroRowProps> = ({ name, width, image }) => {
  return (
    <td className="row  flex items-center gap-4">
      <img
        src={`https://cardri.s3.eu-west-1.amazonaws.com/${image}`}
        alt=""
        className="h-8"
      />
      <div className="flex flex-col gap-[2]">
        <span className="block">{name}</span>
      </div>
    </td>
  );
};

export default HeroRow;
