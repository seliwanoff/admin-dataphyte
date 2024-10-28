import { Link } from "react-router-dom";
import avater from "../../assets/images/Dashboard/Avatar.png";

const Activities = () => {
  return (
    <div className="max-w-[316px] w-full h-[408px] cards ">
      <div className="w-full h-full  my-3">
        <div className="flex justify-between items-center">
          <span className="text-[#101828] font-semibold text-[18px] leading-[28px] font-Inter">
            Activity
          </span>
          <Link
            to={"/"}
            className="text-[#475467] font-semibold leading-[20px] text-[14px] font-Inter"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col gap-[20px] mt-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={avater} alt="" className="h-8" />
              <div>
                <span className="block text-[#344054] font-medium text-[14px] leading-6 font-Inter">
                  Ayomide Olaoye
                </span>
                <span className="block text-[#475467] font-normal text-[14px] leading-6 font-Inter">
                  Uploaded Dangers of Bitumen
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={avater} alt="" className="h-8" />
              <div>
                <span className="block text-[#344054] font-medium text-[14px] leading-6  font-Inter">
                  Ayomide Olaoye
                </span>
                <span className="block text-[#475467] font-normal text-[14px] leading-6  font-Inter">
                  Uploaded Dangers of Bitumen
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={avater} alt="" className="h-8" />
              <div>
                <span className="block text-[#344054] font-medium text-[14px] leading-6  font-Inter">
                  Ayomide Olaoye
                </span>
                <span className="block text-[#475467] font-normal text-[14px] leading-6  font-Inter">
                  Uploaded Dangers of Bitumen
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={avater} alt="" className="h-8" />
              <div>
                <span className="block text-[#344054] font-medium text-[14px] leading-6  font-Inter">
                  Ayomide Olaoye
                </span>
                <span className="block text-[#475467] font-normal text-[14px] leading-6  font-Inter">
                  Uploaded Dangers of Bitumen
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={avater} alt="" className="h-8" />
              <div>
                <span className="block text-[#344054] font-medium text-[14px] leading-6  font-Inter">
                  Ayomide Olaoye
                </span>
                <span className="block text-[#475467] font-normal text-[14px] leading-6  font-Inter">
                  Uploaded Dangers of Bitumen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
