import banner from "../../assets/images/Login/bannerlogo.png";

const Banner = () => {
  return (
    <div className=" bg-[#E8DDFF] rounded-3xl p-2">
      <div className=" mx-auto mt-12 max-w-[614px]  px-6">
        <p className="text-[40px] text-black font-semibold leading-[53.36px] font-polySans">
          The easiest way to access Mining activities across Africa
        </p>
      </div>
      <img
        src={banner}
        alt=""
        className="h-[428px] mt-20 mb-28 w-full border "
      />
    </div>
  );
};

export default Banner;
