import { useState } from "react";
import InputElement from "./inputEl";
import LoginButton from "./loginButton";
//import GoogleButton from "./googleButton";
//import google from "../../assets/images/Login/google.png";
import LogoTop from "./logoTop";
import { login } from "../../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { showNotification } from "../../components/SuccessComponent/sucess";
import { useNavigate } from "react-router-dom";

const LoginFrom = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigates = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== "" && email !== "") setIsLoading(true);

    try {
      await dispatch(login({ email, password })).unwrap();
      showNotification("Success!", "Login successful", "success");
      window.location.href = "/dashboard";
    } catch (error) {
      showNotification("Error!", "Login failed: " + error, "danger");

      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <LogoTop />
      <div className="h-full  grid justify-center mt-28">
        <div className=" flex flex-col w-[360px] gap-[56px]">
          <div className="grid gap-[8px]">
            <h2 className="font-bold text-[ #101828] text-[30px] leading-[30px] font-Satoshi p-0 m-0">
              Get Started Now{" "}
            </h2>
            <p className="font-Satoshi text-[#475467] leading-6 text-[16px] font-normal">
              Enter your credentials below to open an account.
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[24px]">
              <InputElement
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required={true}
                //className="additional-styles"
              />
              <InputElement
                type="password"
                label="Password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="email"
                required={true}
              />
            </div>
            <div className="flex flex-col gap-[20px]">
              <LoginButton
                onClick={handleSubmit}
                type="button"
                disable={isLoading}
              >
                {isLoading ? "Login in..." : "Login"}
              </LoginButton>
              {/**

              <GoogleButton>
                <img src={google} alt="" className="h-6" />
                <span>Login with google</span>
              </GoogleButton>

              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
