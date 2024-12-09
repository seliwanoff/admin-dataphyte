import React, { useState } from "react";
import uploadicon from "../../assets/images/Dashboard/uploadicon.png";
//import { MdCancel } from "react-icons/md"; // For the cancel icon

interface UploadElProps<T> {
  label: string;
  placeholder?: string;
  helperText?: string;
  name: any;
  value: File[]; // Enforce array of files
  setForm: (name: string, files: File[]) => void;
  accept: string;
  instruction: string;
  multipe?: boolean;
}

const UploadEl = <T extends Record<string, any>>({
  label,
  placeholder = "John Doe",
  helperText,
  name,
  value,
  setForm,
  accept,
  instruction,
  multipe = false,
}: UploadElProps<T>) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setForm(name, [...value, ...newFiles]); // Add the selected files directly to the list
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = value.filter((_, fileIndex) => fileIndex !== index);
    setForm(name, updatedFiles); // Remove the file from the list
  };

  return (
    <div className="flex flex-col gap-4 w-full flex-grow bg-white">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={label}
          className="font-Inter text-[14px] font-medium leading-6 text-left text-[#344054]"
        >
          {label}
        </label>
      </div>
      <div className="w-full rounded-md h-[150px] border border-[#d0d5dd] py-[6px] px-[4px] shadow-input-shadow flex items-center justify-between relative">
        <input
          type="file"
          name={name as string}
          id={label}
          className="h-full absolute top-0 w-full z-50 opacity-0"
          onChange={handleFileChange}
          accept={accept}
          multiple={multipe} // Allow multiple files if needed
        />
        <div className="outline-none border-none w-full font-Inter text-[16px] font-normal leading-6 text-left text-[#667085] relative px-[12px] py-[12px]">
          <div className="h-full flex flex-col gap-[12px] justify-center items-center">
            <img src={uploadicon} alt="Upload Icon" className="h-10" />
            <div className="flex flex-col gap-2 font-Inter text-[12px] font-normal leading-[18px] text-center text-[#475467]">
              <span className="w-full">
                <span className="text-[#6941C6] font-semibold">
                  Click to upload{" "}
                </span>
                or drag and drop
              </span>
              <span>{instruction}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Display List of Selected Files */}
      {value && value.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {value.map((file, index) => (
            <div
              key={index}
              className="w-full   bg-[#475467] rounded-md py-2 text-white font-Poppins px-4 overflow-hidden text-ellipsis whitespace-nowrap flex justify-between items-center"
            >
              <span>{file.name}</span>

              <svg
                onClick={() => handleRemoveFile(index)}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
                className="float-right cursor-pointer max-w-6"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadEl;
