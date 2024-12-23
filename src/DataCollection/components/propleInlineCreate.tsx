import React, { useEffect, useState } from "react";
import InputElement from "../../panel/components/inputEl";
import CountrySelect from "../../panel/components/CountrySelect";
import RoleSelect from "../../panel/components/RolesComponent";
import SearchableSelect from "../../panel/components/SearchableSelect";
import TextAreaElement from "../../panel/components/Textarea";
import UploadEl from "../../dashboard/components/UpdateEl";
import LoginButton from "../../panel/components/loginButton";
import { showNotification } from "../../components/SuccessComponent/sucess";
//import { image } from "d3";

interface PeopleInlineCreateProps {
  show?: any;
  setShowOverlay: (state: boolean) => void;
  selectedValuesParent?: any;
  setAcquireValue?: any;
  setSelectedValuesParent?: any;
  setSearchMineralQueryc?: any;
}

const PeopleInlineCreate: React.FC<PeopleInlineCreateProps> = ({
  show,
  setShowOverlay,
  selectedValuesParent,
  setAcquireValue,
  setSelectedValuesParent,
  setSearchMineralQueryc,
}) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [otherName, setOtherName] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [peopleCountry, setPeopleCountry] = useState("");
  const [peopleTag, setPeopleTag] = useState("");
  const [peopleOtherData, setPeopleOtherData] = useState("");
  const [peopleImage, setPeopleImage] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [placeId, setPlacedId] = useState("");

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
          // console.log(data.result.formatted_address);

          setPeopleCountry(data.result.formatted_address);
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        }
    };
    fetcPlaceDetails();
  }, [placeId]);

  const handleOptionChange = (value: string) => {
    setPeopleCountry(value);
  };
  const baseUrl = process.env.REACT_APP_URL;

  const handleSubmitPeople = async () => {
    setIsLoading(true);
    const formData = new FormData();
    const maxSizeInBytes = 2024 * 1024; // 2024 KB in bytes
    const tagArray = peopleTag.split(",").map((t) => t.trim());

    try {
      // Append form data fields
      formData.append("first_name", firstName);
      formData.append("title", title);
      formData.append("last_name", lastName);
      formData.append("other_name", otherName);
      tagArray.forEach((tag: any, index: any) => {
        formData.append(`tag[${index}]`, tag);
      });
      selectedCountries.forEach((tag: any, index: any) => {
        formData.append(`country[${index}]`, tag);
      });
      formData.append("location", peopleCountry);
      formData.append("other_data", peopleOtherData);

      // Validate and append the image
      if (peopleImage) {
        if (peopleImage.size > maxSizeInBytes) {
          showNotification(
            "Error!",
            `Image "${peopleImage.name}" exceeds the size limit of 2024 KB.`,
            "danger"
          );
          setIsLoading(false);
          return; // Stop execution if the image is too large
        }
        formData.append("image", peopleImage, peopleImage.name);
      }

      // Send POST request
      const response = await fetch(`${baseUrl}people/create`, {
        method: "POST",
        body: formData, // Send FormData in the body
      });

      if (!response.ok) {
        throw new Error("Failed to add people");
      }

      const data = await response.json();

      if (response.status === 200) {
        // Update selected values parent
        setSelectedValuesParent((prevState: any) => {
          const currentState = Array.isArray(prevState) ? prevState : [];

          const filteredState = currentState.filter(
            (item: { id: any }) => item.id !== undefined
          );

          if (data.data.id) {
            return [
              ...filteredState,
              {
                id: data.data.id,
                first_name: data.data.first_name,
                title: data.data.title,
                last_name: data.data.last_name,
                name: `${data.data.title} ${data.data.first_name} ${data.data.last_name}`,
              },
            ];
          }

          return filteredState;
        });

        showNotification("Success!", "People added successfully", "success");
        setShowOverlay(false);
        setAcquireValue(true);
      }
    } catch (error: any) {
      // Handle errors
      showNotification(
        "Error!",
        `Error adding people: ${error.message}`,
        "danger"
      );
    } finally {
      setIsLoading(false);
      setAcquireValue(false);
      setSearchMineralQueryc("");
    }
  };

  return (
    show && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={() => setShowOverlay(false)}
      >
        <div
          className="bg-white p-6 rounded-md shadow-lg w-4/5 max-w-[500px] overflow-y-auto max-h-[95%] flex flex-col gap-5 vertical_scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <h4 className="font-polySans text-[#202020] text-xl font-bold mb-4">
            Add People
          </h4>
          <InputElement
            type="text"
            label="First Name"
            placeholder="Enter First name"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            name="first_name"
            required={false}
          />
          <InputElement
            type="text"
            label="Last Name"
            placeholder="Enter Last name"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            name="last_name"
            required={false}
          />
          <InputElement
            type="text"
            label="Other Name"
            placeholder="Enter other name"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
            name="other_name"
            required={false}
          />
          <CountrySelect
            label="Select Countries"
            values={selectedCountries}
            onChange={setSelectedCountries}
          />

          <RoleSelect label="Select title" values={title} onChange={setTitle} />

          <SearchableSelect
            label="Location"
            placeholder="Select address"
            value={peopleCountry}
            onChange={handleOptionChange}
            name="location"
            required={true}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            options={options}
            setPlacedId={(id: string) => setPlacedId(id)}
          />
          <InputElement
            type="text"
            label="Tag (Please separate with ,)"
            placeholder="Enter Tag"
            value={peopleTag}
            onChange={(e) => setPeopleTag(e.target.value)}
            name="tags"
            required={false}
          />
          {/**
          <TextAreaElement
            type="text"
            label="Other Info"
            placeholder="Other Info"
            value={peopleOtherData}
            onChange={(e: any) => setPeopleOtherData(e.target.value)}
            name="other_info"
            required={false}
          />
          */}
          <UploadEl
            placeholder="Upload image..."
            helperText=""
            label="People Display Picture"
            value={peopleImage}
            setForm={setPeopleImage}
            multipe={false}
            name="display_picture"
            accept="image/*"
            instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
          />
          <LoginButton
            onClick={handleSubmitPeople}
            type="button"
            disable={isLoading}
          >
            {isLoading ? "Submitting..." : "Add People"}
          </LoginButton>
        </div>
      </div>
    )
  );
};

export default PeopleInlineCreate;
