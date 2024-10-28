// LoginButton.tsx
import React from "react";

interface LoginButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  children = "Login",
  type = "button",
  className = "",
}) => {
  return (
    <button onClick={onClick} type={type} className="loginbuton">
      {children}
    </button>
  );
};

export default LoginButton;
