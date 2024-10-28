// InputElement.tsx
import React from "react";

interface InputElementProps {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
}

const InputElement: React.FC<InputElementProps> = ({
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  className = "",
  name,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
};

export default InputElement;
