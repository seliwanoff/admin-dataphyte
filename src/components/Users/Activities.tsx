import { Link } from "react-router-dom";
import avater from "../../assets/images/Dashboard/Avatar.png";
interface CustomDatePickerProps {
  reports?: any;
}

const Activities: React.FC<CustomDatePickerProps> = ({ reports }) => {
  return (
    <div className="max-w-[316px] w-full h-[408px] cards ">
      <div className="w-full h-full  my-3">
        <div className="flex justify-between items-center">
          <span className="text-[#101828] font-semibold text-[18px] leading-[28px] font-Inter">
            Activity
          </span>
          <Link
            to={"/analytics-report"}
            className="text-[#475467] font-semibold leading-[20px] text-[14px] font-Inter"
          >
            View all
          </Link>
        </div>
        {reports && reports.length > 0 ? (
          <div className="flex flex-col gap-[20px] mt-4">
            {reports &&
              reports?.map((item: any, index: any) => (
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={
                        item.display_picture
                          ? `https://cardri.s3.eu-west-1.amazonaws.com/${item.display_picture}`
                          : avater
                      }
                      alt=""
                      className="h-8 w-8 rounded-full object-contain"
                    />
                    <div>
                      <span className="block text-[#344054] font-medium text-[14px] leading-6 font-Inter">
                        {item.name}
                      </span>
                      <span className="block text-[#475467] font-normal text-[14px] leading-6 font-Inter">
                        Uploaded {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="font-Inter font-medium text-gray-700 text-[14px] text-center w-full mt-4">
            No record found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
