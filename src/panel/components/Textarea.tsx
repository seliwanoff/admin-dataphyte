// InputElement.tsx
import React from "react";

interface InputElementProps {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  className?: string;
  name?: string;
  required: any;
}

const TextAreaElement: React.FC<InputElementProps> = ({
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
      <textarea
        id={name}
        cols={2}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="textarea "
      ></textarea>
    </div>
  );
};

export default TextAreaElement;
