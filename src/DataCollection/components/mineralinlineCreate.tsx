import React, { useEffect, useState } from "react";
import InputElement from "../../panel/components/inputEl";
import SearchableSelect from "../../panel/components/SearchableSelect";
import TextAreaElement from "../../panel/components/Textarea";
import UploadEl from "../../dashboard/components/UpdateEl";
import LoginButton from "../../panel/components/loginButton";
//import { image } from "d3";
import { showNotification } from "../../components/SuccessComponent/sucess";
import CountrySelect from "../../panel/components/CountrySelect";

interface MineralInlineCreateProps {
  show?: any;
  setShowOverlay: any;
  mineralNames?: any;
  onUpdateCompanyName: any;
  selectedValuesParent?: any;
  setAcquireValue?: any;
  setSelectedValuesParent?: any;
  setSearchMineralQueryc?: any;
}

const MineralInlineCreate: React.FC<MineralInlineCreateProps> = ({
  show,
  setShowOverlay,
  mineralNames,
  onUpdateCompanyName,
  selectedValuesParent,
  setAcquireValue,
  setSelectedValuesParent,
  setSearchMineralQueryc,
}) => {
  const [mineralName, setMineralName] = useState("");
  const [mineralLocation, setMineralLocation] = useState("");
  const [mineralTag, setMineralTag] = useState("");
  const [mineralOtherInfo, setMineralOtherInfo] = useState("");
  const [imageMineral, setImageMineral] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [placeId, setPlacedId] = useState("");
  const [selectedCompanyCountries, setSelectedCompanyCountries] = useState<any>(
    []
  );

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

          setMineralLocation(data.result.formatted_address);
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        }
    };
    fetcPlaceDetails();
  }, [placeId]);
  const handleOptionChange = (value: string) => {
    setMineralLocation(value);
  };
  const baseUrl = process.env.REACT_APP_URL;

  const handleSubmit = async () => {
    setIsLoading(true);
    const tagArray = mineralTag.split(",").map((t) => t.trim());

    const formData = new FormData();
    formData.append("name", mineralName);
    //  formData.append("location", mineralLocation);
    tagArray.forEach((tag: any, index: any) => {
      formData.append(`tag[${index}]`, tag);
    });

    selectedCompanyCountries.forEach((tag: any, index: any) => {
      formData.append(`company[${index}]`, tag);
    });
    formData.append("other_data", mineralOtherInfo);

    // If `imageMineral` is a File, append it to FormData
    if (image) {
      formData.append("image", image, image.name);
    }

    try {
      const response = await fetch(`${baseUrl}mineral/create`, {
        method: "POST",
        body: formData, // Send FormData in the body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
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

        showNotification("Success!", "Mineral added successful", "success");
        setShowOverlay(false);
        setAcquireValue(true);
      }
    } catch (error) {
      showNotification("Error!", `Error adding mineral:${error}`, "danger");
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
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <h4 className="font-polySans text-[#202020] text-xl font-bold mb-4">
            Add Mineral
          </h4>
          <InputElement
            type="text"
            label="Mineral Name"
            placeholder="Enter mineral name"
            value={mineralName}
            onChange={(e) => setMineralName(e.target.value)}
            name="name"
            required={false}
          />

          <CountrySelect
            label="Select Countries"
            values={selectedCompanyCountries}
            onChange={(countries) => setSelectedCompanyCountries(countries)}
          />
          {/***
          <SearchableSelect
            label="Mineral Address"
            placeholder="Select address"
            value={mineralLocation}
            onChange={handleOptionChange}
            name="mineraladdress"
            required={true}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            options={options}
            setPlacedId={(id: string) => setPlacedId(id)}
          />
          */}
          <InputElement
            type="text"
            label="Mineral Tag"
            placeholder="Enter Tag"
            value={mineralTag}
            onChange={(e) => setMineralTag(e.target.value)}
            name="tag"
            required={false}
          />
          {/**
          <TextAreaElement
            type="text"
            label="Other Info"
            placeholder="Other Info"
            value={mineralOtherInfo}
            onChange={(e: any) => setMineralOtherInfo(e.target.value)}
            name="tag"
            required={false}
          />
          */}
          <UploadEl
            placeholder="Gold, Ore etc..."
            helperText=""
            label="Mineral Display Picture"
            value={image}
            setForm={setImage}
            multipe={false}
            name="display_picture"
            accept="image/*"
            instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
          />
          <LoginButton onClick={handleSubmit} type="button" disable={isLoading}>
            {isLoading ? "Submitting..." : "Add Mineral"}
          </LoginButton>
        </div>
      </div>
    )
  );
};

export default MineralInlineCreate;
