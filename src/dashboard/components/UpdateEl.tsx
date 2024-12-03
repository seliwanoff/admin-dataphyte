import uploadicon from "../../assets/images/Dashboard/uploadicon.png";

interface UploadElProps<T> {
  label: string;
  placeholder?: string;
  helperText?: string;
  name: any; // Ensures the name matches a key in the form data type
  value: File | string | any; // Updated to allow File type (not just string)
  setForm: any; // Matches the form data type
  accept: any;
  instruction: any;
  multipe?: any;
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
  multipe,
}: UploadElProps<T>) => {
  const handleChange = (e: any) => {
    const file = e.target.files?.[0];
    setForm(file);
  };

  return (
    <div className="flex flex-col gap-4 w-full  flex-grow  bg-white ">
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
          onChange={handleChange}
          accept={accept}
          multiple={multipe}
        />
        <div className="outline-none border-none w-full font-Inter text-[16px] font-normal leading-6 text-left text-[#667085] relative px-[12px] py-[12px]">
          <div className="h-full flex flex-col gap-[12px] justify-center items-center">
            <img src={uploadicon} alt="" className="h-10" />
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

      {value && (
        <div className="w-full bg-[#475467] rounded-md py-2 text-white font-Poppins px-4  overflow-hidden text-ellipsis text-nowrap">
          {value.name}
        </div>
      )}
    </div>
  );
};

export default UploadEl;
