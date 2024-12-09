import React, { useEffect, useState } from "react";
import axios from "axios";
import InputElement from "../../panel/components/inputEl";
import MineralSearchDrop from "../../panel/components/MineralSearchrop";
import SearchableSelect from "../../panel/components/SearchableSelect";
import CountrySelect from "../../panel/components/CountrySelect";
import RichTextEditor from "./RichText";
import UploadEl from "../../dashboard/components/UpdateEl";
import { showNotification } from "../../components/SuccessComponent/sucess";

interface CompanyInlineCreateProps {
  companyName: string;
  onUpdateCompanyName: any;
  show?: any;
  setShowOverlay: any;
  selectedValuesParent?: any;
  setAcquireValue?: any;
  setSelectedValuesParent?: any;
  setSearchMineralQueryc?: any;
}

const CompanyInlineCreate: React.FC<CompanyInlineCreateProps> = ({
  companyName,
  onUpdateCompanyName,
  show,
  setShowOverlay,
  selectedValuesParent,
  setAcquireValue,
  setSelectedValuesParent,
  setSearchMineralQueryc,
}) => {
  const [name, setName] = useState(companyName);
  const [isLoading, setIsLoading] = useState(false);
  const [isNameExist, setIsNameExist] = useState(false);
  // const [selectedValuesParent, setSelectedValuesParent] = useState<any[]>([]);
  const [searchMineralQuery, setSearchMineralQuery] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [rcNumber, setRcNumber] = useState("");
  const [selectedCompanyCountries, setSelectedCompanyCountries] = useState<
    any[]
  >([]);
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [placeId, setPlacedId] = useState("");

  const closeEditor = () => setIsEditorOpen(false);
  const baseUrl = process.env.REACT_APP_URL;

  const handleSubmit = async () => {
    setIsLoading(true);
    const tagArray = tag.split(",").map((t) => t.trim());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", companyAddress);
    formData.append("rc_number", rcNumber);
    formData.append("rich_text", content);

    tagArray.forEach((tag: any, index: any) => {
      formData.append(`tag[${index}]`, tag);
    });
    // formData.append("location", peopleCountry);
    if (image) {
      formData.append("image", image, image.name);
    }

    selectedCompanyCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });
    // formData.append("other_data", other_data);
    try {
      const response = await fetch(`${baseUrl}company/create`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      if (response.status === 200) {
        setSelectedValuesParent((prevState: any) => {
          const currentState = Array.isArray(prevState) ? prevState : [];

          const filteredState = currentState.filter(
            (item: { id: any; name: any }) =>
              item.id !== undefined && item.name !== undefined
          );

          if (data.data.id && data.data.name) {
            return [
              ...filteredState,
              {
                id: data.data.id,
                name: data.data.name,
              },
            ];
          }

          // If no valid data, return the filtered state
          return filteredState;
        });

        setAcquireValue(true);
        setShowOverlay(false);
        showNotification("Success!", "Company added successful", "success");
      }
    } catch (error) {
      showNotification(
        "Error!",
        `Error fetching adding company:${error}`,
        "danger"
      );
    } finally {
      setIsLoading(false);
      setAcquireValue(false);
      setSearchMineralQueryc("");
    }
  };
  const fetchOptions = async (query: string) => {
    try {
      const response = await fetch(`${baseUrl}utility/search?q=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      setOptions(data.predictions);
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptions([]);
    }
  };
  useEffect(() => {
    if (searchQuery) {
      const delayDebounce = setTimeout(() => {
        fetchOptions(searchQuery);
      }, 300);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchQuery]);
  useEffect(() => {
    const fetcPlaceDetails = async () => {
      if (placeId !== "")
        try {
          const response = await fetch(
            `${baseUrl}utility/get_place_details?place_id=${placeId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch options");
          }

          const data = await response.json();

          setCompanyAddress(data.result.formatted_address);
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        }
    };
    fetcPlaceDetails();
  }, [placeId]);
  const checkName = async () => {
    if (!name) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}search/company?q=${name}`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      const isNameFound = data.data.some((item: { name: string }) => {
        return item.name.trim().toLowerCase() === name.trim().toLowerCase();
      });

      setIsNameExist(isNameFound);
    } catch (error) {
      console.error("Error fetching options:", error);
      setIsNameExist(false);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(companyAddress);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowOverlay(false)}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-4/5 max-w-[500px] overflow-y-auto max-h-[95%] relative vertical_scroll"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={() => setShowOverlay(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-4">
          <h4 className="font-polySans text-[#202020] text-xl font-bold">
            Create Company
          </h4>
          <InputElement
            type="text"
            label="Company Name"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required={true}
            onKeyDowns={checkName}
          />
          {isLoading && (
            <span className="font-polySans text-primary text-[12px] font-bold">
              Loading...
            </span>
          )}
          {isNameExist && !isLoading && (
            <span className="font-polySans text-[crimson] text-[14px] font-bold">
              Name already exist
            </span>
          )}

          <SearchableSelect
            label="Company Address"
            placeholder="Select address"
            value={companyAddress}
            onChange={(value: string) => setCompanyAddress(value)}
            name="address"
            required={true}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            options={options}
            setPlacedId={(id: string) => setPlacedId(id)}
          />
          <InputElement
            type="text"
            label="RC Number"
            placeholder="Enter RC Number"
            value={rcNumber}
            onChange={(e) => setRcNumber(e.target.value)}
            name="rc_number"
            required={true}
          />
          <CountrySelect
            label="Select Countries"
            values={selectedCompanyCountries}
            onChange={(countries) => setSelectedCompanyCountries(countries)}
          />
          <InputElement
            type="text"
            label="Tag (Please separate with (,))"
            placeholder="Enter Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            name="tag"
            required={true}
          />
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="label">
              Rich text
            </label>
            <div
              className="input cursor-pointer relative"
              onClick={() => setIsEditorOpen(true)}
            >
              Click to write text
              {content && (
                <div className="flex items-center justify-center w-4 h-4 bg-primary absolute rounded-full right-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {isEditorOpen && (
            <RichTextEditor
              value={content}
              onChange={setContent}
              onClose={closeEditor}
            />
          )}
          <UploadEl
            placeholder="Gold, Ore etc..."
            helperText="A cover image of yourself"
            label="Company Profile Picture"
            value={image}
            setForm={setImage}
            name="display_picture"
            multipe={false}
            accept="image/*"
            instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
          />
          <button
            className="px-6 py-2 bg-primary text-white rounded-md font-semibold mt-4"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInlineCreate;
