import Banner from "../components/banner";
import LoginFrom from "../components/loginForm";

const LoginWrapper = () => {
  return (
    <div className=" bg-white w-full mx-auto container">
      <div className="py-[40px] md:px-8 ">
        <div className=" ">
          <div className="flex  justify-between ">
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
