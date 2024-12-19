import Banner from "../components/banner";
import LoginFrom from "../components/loginForm";

const LoginWrapper = () => {
  return (
    <div className=" bg-white w-full mx-auto h-full">
      <div className="py-[40px] px-20 ">
        <div className=" ">
          <div className="flex  justify-between w-full lg:max-w-[1400px]   mx-auto ">
            {/** Begin Login Form */}

            <LoginFrom />

            {/** End Login Form */}

            {/**Begin Banner */}
            <Banner />

            {/** End Banner */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWrapper;
