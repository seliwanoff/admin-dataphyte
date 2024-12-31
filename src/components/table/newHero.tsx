import React from "react";
//import doc from "../../assets/images/doc.png";
import pdf from "../../assets/images/Dashboard/pdf.png";
import audio from "../../assets/images/Dashboard/audio.png";
import video from "../../assets/images/Dashboard/video.png";
interface HeroRowProps {
  name: string;
  width: any;
  image: any;
  type?: any;
  size?: any;
}
const NewHero: React.FC<HeroRowProps> = ({
  name,
  width,
  image,
  type,
  size,
}) => {
  return (
    <td className="rows  flex items-center gap-4">
      <img
        src={
          type === "pdf"
            ? pdf
            : type === "mp4"
            ? video
            : type === "mp3"
            ? audio
            : image
        }
        alt=""
        className="h-8"
      />
      <div className="flex flex-col gap-[2]">
        <span className="block">{name}</span>
        <span className="block text-[#828282] text-xs font-normal font-polySans">
          {size}
        </span>
      </div>
    </td>
  );
};

export default NewHero;
