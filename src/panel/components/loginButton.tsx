// LoginButton.tsx
import React from "react";

interface LoginButtonProps {
  onClick?: any;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disable?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  children = "Login",
  type = "button",
  className = "",
  disable,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="loginbuton"
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default LoginButton;
