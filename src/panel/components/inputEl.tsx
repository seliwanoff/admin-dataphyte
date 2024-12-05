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
  required: any;
}

const InputElement: React.FC<InputElementProps> = ({
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  className = "",
  name,
  required,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
        autoComplete="off"
      />
    </div>
  );
};

export default InputElement;
