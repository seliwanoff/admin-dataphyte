// GoogleButton.tsx
import React from "react";

interface GoogleButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  children = "Login",
  type = "button",
  className = "",
}) => {
  return (
    <button onClick={onClick} type={type} className="loginbutongoogle ">
      {children}
    </button>
  );
};

export default GoogleButton;
