import profile from "../../assets/images/Dashboard/profile-add.png";
import { useUser } from "../../redux/userContext";
const Greetings = () => {
  const user = useUser();
  // console.log(user);
  return (
    <div className=" flex justify-between items-center w-full">
      <div className="">
        <h2 className="font-semibold font-polySans text-[30px] leading-[30px] p-0 m-0 ">
          Welcome,{" "}
          <span className="text-primary">
            {user && user.first_name} {user && user.last_name}
          </span>
        </h2>
        <p className="mt-2 text-[16px] font-polySans font-normal leading-6 text-[#475467]">
          Lorem ipsum dolor sit amet consectetur. Ultrices turpis amet et id.
        </p>
      </div>
      {/**
      <button className="loginbuton w-[170px] flex items-center justify-center gap-3">
        <img src={profile} alt="" className="h-5" />
        Invite staff
      </button>
      */}
    </div>
  );
};

export default Greetings;
