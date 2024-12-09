import React, { useEffect, useState } from "react";
import InputElement from "../../panel/components/inputEl";
import CountrySelect from "../../panel/components/CountrySelect";
import SearchableSelect from "../../panel/components/SearchableSelect";
import UploadEl from "../../dashboard/components/UpdateEl";
import LoginButton from "../../panel/components/loginButton";
import { showNotification } from "../../components/SuccessComponent/sucess";

interface PeopleInlineCreateProps {
  show?: any;
  setShowOverlay: (state: boolean) => void;
  selectedValuesParent?: any;
  setAcquireValue?: any;
  setSelectedValuesParent?: any;
  setSearchMineralQueryc?: any;
}

const SiteInlineCreate: React.FC<PeopleInlineCreateProps> = ({
  show,
  setShowOverlay,
  selectedValuesParent,
  setAcquireValue,
  setSelectedValuesParent,
  setSearchMineralQueryc,
}) => {
  const [siteName, setSiteName] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [siteAddress, setSiteAddress] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [siteImage, setSiteImage] = useState<any>(null);
  const [placeId, setPlacedId] = useState<string>("");
  const baseUrl = process.env.REACT_APP_URL;
  const [siteActualAddress, setSiteActualAddress] = useState<any>([]);
  const [siteaddress, setsiteAddres] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
          // console.log(data);

          setSiteActualAddress(data.result);
          setSiteAddress(data.result.formatted_address);
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        }
    };
    fetcPlaceDetails();
  }, [placeId]);
  // console.log(siteAddress);
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

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", siteName);
    formData.append("address", siteAddress);
    formData.append(
      "location[0][log]",
      String(siteActualAddress && siteActualAddress?.geometry.location.lng)
    );
    formData.append(
      "location[0][lat]",
      String(siteActualAddress && siteActualAddress?.geometry.location.lat)
    );
    formData.append("location[0][name]", siteAddress);
    formData.append(
      "location[0][place_id]",
      siteActualAddress && siteActualAddress?.place_id
    );

    selectedCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });

    if (siteImage) {
      formData.append("image", siteImage, siteImage.name);
    }

    try {
      const response = await fetch(`${baseUrl}mininig_site/create`, {
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

        showNotification("Success!", "Site added successful", "success");
        // setisAddnewSite(false);
        setShowOverlay(false);
        setAcquireValue(true);
        setShowOverlay(false);
      }
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsLoading(false);
      setAcquireValue(false);
      setShowOverlay(false);
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
            Add Mining site
          </h4>

          <InputElement
            type="text"
            label="Name"
            placeholder="Enter site name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            name="name"
            required={false}
          />

          <CountrySelect
            label="Select Countries"
            values={selectedCountries}
            onChange={(countries) => setSelectedCountries(countries)}
          />

          <SearchableSelect
            label="Location"
            placeholder="Select address"
            value={siteAddress}
            onChange={handleOptionChange}
            name="mineraladdress"
            required={true}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            options={options}
            setPlacedId={setPlacedId}
          />

          <UploadEl
            placeholder="Gold, Ore etc..."
            helperText=""
            label="Site display Picture"
            value={siteImage}
            setForm={setSiteImage}
            name="display_picture"
            accept="image/*"
            multipe={false}
            instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
          />

          <LoginButton onClick={handleSubmit} type="button" disable={isLoading}>
            {isLoading ? "Submitting..." : "Add site"}
          </LoginButton>
        </div>
      </div>
    )
  );
};

export default SiteInlineCreate;
