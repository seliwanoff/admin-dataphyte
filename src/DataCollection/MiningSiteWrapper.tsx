import React, { useEffect, useState } from "react";
import InputElement from "../panel/components/inputEl";
import { showNotification } from "../components/SuccessComponent/sucess";

import TextAreaElement from "../panel/components/Textarea";
import SearchableSelect from "../panel/components/SearchableSelect";
import axios from "axios";
import UploadEl from "../dashboard/components/UpdateEl";
import MineralSearchDrop from "../panel/components/MineralSearchrop";
import LoginButton from "../panel/components/loginButton";
import RoleSelect from "../panel/components/RolesComponent";
import CountrySelect from "../panel/components/CountrySelect";
import RichTextEditor from "./components/RichText";
import MultipleEl from "../dashboard/components/MultipleEl";
import FilterPeopleByPosition from "../panel/components/FilterPeopleByPosition";
import CompanyInlineCreate from "./components/CompanyInlineCreate";
import MineralInlineCreate from "./components/mineralinlineCreate";
import PeopleInlineCreate from "./components/propleInlineCreate";
import countriesData from "../data/Countries_States_LGAs.json"; // Import the JSON data
import SearchableDropdown from "../panel/components/statelgComponent";
import PreviewPage from "./previewPage";
interface StateData {
  [key: string]: string[]; // Assuming each state contains an array of cities
}

interface CountryData {
  states: StateData;
}

interface Countries {
  [country: string]: CountryData;
}
const typedCountries: Countries = countriesData;

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="flex items-center w-full px-4">
      {steps.map((_, index) => (
        <div key={index} className="flex items-center gap-[6px]  justify-start">
          <div
            className={`w-8 h-[4px] rounded-md border-2 cursor-pointer mr-1 ${
              index <= currentStep
                ? "bg-[#7F55DA] border-[#7F55DA]"
                : "bg-gray-300 border-gray-400"
            }`}
            onClick={() => onStepClick(index)}
          ></div>
        </div>
      ))}
    </div>
  );
};

const MiningSiteWrapper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 6",
  ];

  const [name, setName] = useState("");
  const [rc_number, setRcNumber] = useState("");
  const [tag, setTag] = useState("");
  const [other_data, setOtherdata] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imageMineral, setImageMineral] = useState<any>(null);

  const [isaddNewMineral, setisAddnewminera] = useState(false);
  const [isaddNewSite, setisAddnewSite] = useState(false);

  const [placeId, setPlacedId] = useState("");
  const [selectedValuesMineral, setSelectedValuesMineral] = useState<string[]>(
    []
  );
  const [showOverlay, setShowOverlay] = useState(false);

  const closeEditor = () => setIsEditorOpen(false);

  const [selectedValuesPeople, setSelectedValuesPeople] = useState<string[]>(
    []
  );
  const [selectedValuesSite, setSelectedValuesSite] = useState<string[]>([]);
  const [selectedValuesCompany, setSelectedValuesCompany] = useState<string[]>(
    []
  );
  const [selectedValuesDoc, setSelectedValuesDoc] = useState<string[]>([]);

  const [selectedCompanyCountries, setSelectedCompanyCountries] = useState<any>(
    []
  );
  const [formData, setFormData] = useState<{
    [key: number]: { [key: string]: string };
  }>({});
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mineralOptions, setMineralOption] = useState([]);
  const [searchMineralQuery, setSearchMineralQuery] = useState("");
  const [searchMineralQuerycfo, setSearchMineralQuerycfo] = useState("");
  const [searchMineralQuerycto, setSearchMineralQuerycto] = useState("");
  const [isSelectedPosition, setIsSelectedPosition] = useState("");

  const [searchMineralQueryc, setSearchMineralQueryc] = useState("");

  const [mineralName, setMineralName] = useState("");
  const [mineralTag, setMineralTag] = useState("");
  const [mineralCountry, setMineralCountry] = useState("");
  const [mineralLocation, setMineralLocation] = useState("");
  const [searchQueryMineral, setSearchQueryMineral] = useState<string>("");

  const [mineralOtherInfo, setMineralOtherInfo] = useState("");

  const [isaddNewPeople, setisaddNewPeople] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [other_name, setOtherName] = useState("");
  const [acquireValue, setAcquireValue] = useState(false);

  const [peopleCountry, setPeopleCountry] = useState("");
  const [title, setTitle] = useState("");
  const [peopleTag, setPeopleTag] = useState("");
  const [peopleImage, setPeopleImage] = useState<any>(null);
  const [peopleOtherData, setPeopleOtherData] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);

  const [siteName, setSiteName] = useState("");
  const [siteaddress, setsiteAddres] = useState("");
  const [siteImage, setSiteImage] = useState<any>("");
  const [docImage, setdocImage] = useState<any>(null);
  const [docName, setDocName] = useState("");
  const [picName, setpicName] = useState("");

  const [siteActualAddress, setSiteActualAddress] = useState<any>([]);
  const [companyActual, setCompanyActualAdress] = useState<any>([]);

  const baseUrl = process.env.REACT_APP_URL;
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [content, setContent] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [ceo, setCEO] = useState<{ id: string; name: string } | any>("");
  const [cfo, setCFO] = useState<{ id: string; name: string } | any>("");
  const [cto, setCTO] = useState<{ id: string; name: string } | any>("");
  const [selectedValuesParent, setSelectedValuesParent] = useState<string[]>(
    []
  );
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLGs, setSelectedLGS] = useState<string>("");

  const [lgas, setLgas] = useState([]);
  const [searchMineralQueryceo, setSearchMineralQueryceo] = useState("");

  const handleSetForm = (name: string, files: File[]) => {
    setFiles(files);
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
          if (currentStep === 1) {
            setMineralLocation(data.result.formatted_address);
          }
          if (currentStep === 0) {
            setCompanyAddress(data.result.formatted_address);
            setCompanyActualAdress(data.result);
          }
          if (currentStep === 2) {
            setPeopleCountry(data.result.formatted_address);
          }
          if (currentStep === 3) {
            setSiteActualAddress(data.result);
            setsiteAddres(data.result.formatted_address);
          }
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        }
    };
    fetcPlaceDetails();
  }, [placeId]);
  //console.log(selectedCompanyCountries);

  const url =
    currentStep === 1
      ? "search/mineral"
      : currentStep === 2
      ? "search/people"
      : currentStep == 3
      ? "search/company"
      : currentStep == 4 && searchMineralQueryc === ""
      ? "search/company"
      : currentStep === 4 && searchMineralQueryc !== ""
      ? "search/people"
      : "search/people";
  const fetchMineral = async (query: string) => {
    try {
      const response = await fetch(`${baseUrl}${url}?q=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      setMineralOption(data.data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptions([]);
    }
  };
  const handleSubmit = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", mineralName);
    formData.append("location", mineralLocation);
    formData.append("tag", mineralTag);
    formData.append("other_data", mineralOtherInfo);

    // If `imageMineral` is a File, append it to FormData
    if (imageMineral) {
      formData.append("image", imageMineral, imageMineral.name);
    }

    try {
      const response = await fetch(`${baseUrl}mineral/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      showNotification("Success!", "Mineral added successful", "success");
      setisAddnewminera(false);
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      //setIsloading(false);
    }
  };
  const handleSubmitSite = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", siteName);
    formData.append("address", siteaddress);
    formData.append(
      "location[0][log]",
      String(siteActualAddress && siteActualAddress?.geometry.location.lng)
    );
    formData.append(
      "location[0][lat]",
      String(siteActualAddress && siteActualAddress?.geometry.location.lat)
    );
    formData.append("location[0][name]", siteaddress);
    formData.append(
      "location[0][place_id]",
      siteActualAddress && siteActualAddress?.place_id
    );

    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`mineral[${index}]`, mineral.id.toString());
    });
    selectedCompanyCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });

    selectedValuesPeople.forEach((people: any, index) => {
      formData.append(`people[${index}]`, people.id.toString());
    });

    formData.append("state", selectedState);
    formData.append("lg", selectedLGs);

    if (siteImage) {
      formData.append("image", siteImage, siteImage.name);
    }

    try {
      const response = await fetch(`${baseUrl}mininig_site/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      showNotification("Success!", "Site added successful", "success");
      setisAddnewSite(false);
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitDoc = async () => {
    setIsloading(true);

    try {
      if (!company_id) {
        throw new Error("Company ID is missing");
      }

      const formData = new FormData();
      formData.append("name", docName);
      formData.append("mining_site_id", company_id);

      if (files) {
        /**
        for (const file of files) {
          if (file.size > 2048 * 1024) {
            showNotification(
              "Error!",
              `File "${file.name}" exceeds the 2048KB size limit`,
              "danger"
            );
            setIsloading(false);
            return;
          }
        }
          */

        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file, file.name);
        });
      }

      const response = await fetch(`${baseUrl}document/uploaddocuments`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload documents");
      }

      const data = await response.json();

      showNotification("Success!", "Document upload successful", "success");
      setisAddnewSite(false);
      setFiles([]);
      setDocName("");
      setCurrentStep(currentStep + 1);
    } catch (error: any) {
      showNotification("Error!", `Error: ${error.message}`, "danger");
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitPics = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", picName);

    formData.append(`mining_site_id`, company_id);
    if (files) {
      files.forEach((file, index) => {
        formData.append("files", file, file.name);
      });
    }

    try {
      const response = await fetch(`${baseUrl}picture/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      showNotification("Success!", "Pictures upload successful", "success");
      setisAddnewSite(false);
      setFiles([]);
      setpicName("");
      setCEO([]);
      setCFO([]);
      setCTO([]);
      setName("");
      setCompanyAddress("");
      setCompanyActualAdress("");
      setImage(null);
      setContent("");
      setCompanyAddress("");
      setSelectedCompanyCountries([]);
      setSelectedValuesCompany([]);
      setSelectedValuesDoc([]);
      setSelectedValuesMineral([]);
      setSelectedValuesPeople([]);
      setSelectedValuesSite([]);

      setCurrentStep(0);
      window.open(
        `https://home-sigma-liard.vercel.app/mining-site?id=${encodeURIComponent(
          company_id
        )}`,
        "_blank"
      );
      window.location.reload();
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsloading(false);
    }
  };
  const handleSubmitPeople = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("title", title);
    formData.append("last_name", last_name);
    formData.append("other_name", other_name);
    formData.append("tag", peopleTag);
    formData.append("location", peopleCountry);

    formData.append("role", selectedRoles);
    formData.append("other_data", peopleOtherData);

    if (peopleImage) {
      formData.append("image", peopleImage, peopleImage.name);
    }

    try {
      const response = await fetch(`${baseUrl}people/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      showNotification("Success!", "People added successful", "success");
      setisaddNewPeople(false);
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      //  setIsloading(false);
    }
  };

  const handleSubmitCompany = async () => {
    setIsloading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", companyAddress);
    formData.append(
      "location[0][log]",
      String(companyActual && companyActual?.geometry?.location.lng)
    );
    formData.append(
      "location[0][lat]",
      String(companyActual && companyActual?.geometry?.location.lat)
    );
    formData.append("location[0][name]", companyAddress);
    formData.append(
      "location[0][place_id]",
      companyActual && companyActual?.place_id
    );

    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`mineral[${index}]`, mineral.id.toString());
    });
    selectedCompanyCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });

    selectedValuesPeople.forEach((people: any, index) => {
      formData.append(`people[${index}]`, people.id.toString());
    });

    if (ceo) {
      formData.append(`ceo_id`, ceo.id.toString());
    }
    if (cfo) {
      formData.append(`cfo_id`, cfo.id.toString());
    }
    if (cto) {
      formData.append(`cto_id`, cto.id.toString());
    }
    formData.append("state", selectedState);
    formData.append("lg", selectedLGs);
    formData.append("rich_text", content);
    selectedValuesSite.forEach((country: any, index: any) => {
      formData.append(`company[${index}]`, country.id);
    });

    if (image) {
      formData.append("image", image, image.name);
    }

    try {
      const response = await fetch(`${baseUrl}mininig_site/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();
      setCompanyId(data.data.id);
      setisaddNewPeople(false);
      showNotification("Success!", "Mining site added successful", "success");

      setCurrentStep(currentStep + 1);
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    if (
      searchMineralQuery ||
      searchMineralQueryc ||
      searchMineralQueryceo ||
      searchMineralQuerycfo ||
      searchMineralQuerycto
    ) {
      const delayDebounce = setTimeout(() => {
        fetchMineral(
          searchMineralQuery ||
            searchMineralQueryc ||
            searchMineralQueryceo ||
            searchMineralQuerycfo ||
            searchMineralQuerycto
        );
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [
    searchMineralQuery ||
      searchMineralQueryc ||
      searchMineralQueryceo ||
      searchMineralQuerycfo ||
      searchMineralQuerycto,
  ]);

  useEffect(() => {
    if (searchQuery) {
      const delayDebounce = setTimeout(() => {
        fetchOptions(
          searchQuery ||
            searchMineralQuery ||
            searchMineralQueryc ||
            searchMineralQueryceo ||
            searchMineralQuerycfo ||
            searchMineralQuerycto
        );
      }, 300);

      return () => clearTimeout(delayDebounce);
    }
  }, [
    searchMineralQuery ||
      searchMineralQueryc ||
      searchMineralQueryceo ||
      searchMineralQuerycfo ||
      searchMineralQuerycto,
    searchQuery,
  ]);
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const statess = selectedCountry
    ? Object.keys(typedCountries[selectedCountry]?.states || {})
    : [];

  // console.log(statess);
  const localGovernments = selectedState
    ? typedCountries[selectedCountry]?.states[selectedState] || []
    : [];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    step: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="p-4">
      {showOverlay && currentStep === 3 && (
        <CompanyInlineCreate
          companyName={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          onUpdateCompanyName={setSelectedValuesParent}
          selectedValuesParent={selectedValuesSite}
          setSelectedValuesParent={setSelectedValuesSite}
          setAcquireValue={setAcquireValue}
          setSearchMineralQueryc={setSearchMineralQuery}
        />
      )}
      {showOverlay && currentStep === 1 && (
        <MineralInlineCreate
          mineralNames={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          onUpdateCompanyName={setSelectedValuesParent}
          selectedValuesParent={selectedValuesMineral}
          setSelectedValuesParent={setSelectedValuesMineral}
          setAcquireValue={setAcquireValue}
          setSearchMineralQueryc={setSearchMineralQuery}
        />
      )}
      {showOverlay && currentStep === 2 && (
        <PeopleInlineCreate
          //mineralNames={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          setSelectedValuesParent={setSelectedValuesPeople}
          selectedValuesParent={selectedValuesPeople}
          setAcquireValue={setAcquireValue}
          setSearchMineralQueryc={setSearchMineralQuery}
        />
      )}
      <span className="text-gray-700 font-polySans text-[14px] mb-4 px-4  block ">
        Follow each steps below.
      </span>
      <Stepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />

      {/* Form Content */}
      <div className="mt-8">
        {currentStep === 0 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              Create Mining site
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              <InputElement
                type="text"
                label="Name"
                placeholder="Enter Site name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required={true}
              />
              <SearchableSelect
                label="Address"
                placeholder="Select address"
                value={companyAddress}
                onChange={handleOptionChange}
                name="address"
                required={true}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                options={options}
                setPlacedId={setPlacedId}
              />

              <CountrySelect
                label="Select Country"
                type="site"
                values={selectedCompanyCountries}
                setSelectedCountry={setSelectedCountry}
                onChange={(countries) => setSelectedCompanyCountries(countries)}
              />
              {selectedCompanyCountries.length > 0 && (
                <SearchableDropdown
                  label="Select State"
                  options={statess}
                  setSelectedState={setSelectedState}
                />
              )}
              {selectedState.length > 0 && (
                <SearchableDropdown
                  label="Select LG"
                  options={localGovernments}
                  setSelectedState={setSelectedLGS}
                />
              )}

              <div className="flex flex-col gap-3">
                <label htmlFor="" className="label">
                  Rich text
                </label>
                <div
                  className="input cursor-pointer relative"
                  onClick={() => setIsEditorOpen(true)}
                >
                  {" "}
                  Click to write text
                  {content !== "" && (
                    <div className="flex items-center justify-center w-4 h-4 bg-primary absolute rounded-full right-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
              {/***
              <TextAreaElement
                type="text"
                label="Other Info"
                placeholder="Other Info"
                value={other_data}
                onChange={(e: any) => setOtherdata(e.target.value)}
                name="tag"
                required={false}
              />
               */}
              <UploadEl
                placeholder="Gold, Ore etc..."
                helperText="A cover image of yourself"
                label="Company  Profile Picture"
                value={image}
                setForm={setImage}
                name="display_picture"
                multipe={false}
                accept="image/*"
                instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              {isaddNewMineral ? "Add Mineral" : "Select Mineral"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {isaddNewMineral === false && (
                <MineralSearchDrop
                  label="Select Minerals"
                  options={mineralOptions}
                  values={selectedValuesMineral}
                  onChange={(values: any) => setSelectedValuesMineral(values)}
                  searchQuery={searchMineralQuery}
                  setSearchQuery={setSearchMineralQuery}
                  type={2}
                  setisAddnewpeople={setisAddnewminera}
                  setShowOverlay={setShowOverlay}
                />
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              {isaddNewPeople ? "Add People" : "Select People"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {isaddNewPeople === false && (
                <>
                  <MineralSearchDrop
                    label="Search people"
                    options={mineralOptions}
                    values={selectedValuesPeople}
                    onChange={(values: any) => setSelectedValuesPeople(values)}
                    searchQuery={searchMineralQuery}
                    setSearchQuery={setSearchMineralQuery}
                    type={3}
                    setisAddnewpeople={setisaddNewPeople}
                    setShowOverlay={setShowOverlay}
                    acquireValue={acquireValue}
                  />
                  <FilterPeopleByPosition
                    label="Search CEO"
                    options={mineralOptions}
                    value={ceo}
                    onChange={(values: any) => setCEO(values)}
                    searchQuery={searchMineralQueryceo}
                    setSearchQuery={setSearchMineralQueryceo}
                    type={2}
                    //setisAddnewpeople={setisAddnewminera}
                    setIsSelectedPosition={setIsSelectedPosition}
                    positionFilter="CEO" // Filter only for CEOs
                    //acquireValue={acquireValue}
                    setShowOverlay={setShowOverlay}
                  />
                  <FilterPeopleByPosition
                    label="Search CTO"
                    options={mineralOptions}
                    value={cto}
                    onChange={(values: any) => setCTO(values)}
                    searchQuery={searchMineralQuerycto}
                    setSearchQuery={setSearchMineralQuerycto}
                    type={2}
                    setIsSelectedPosition={setIsSelectedPosition}
                    //setisAddnewpeople={setisAddnewminera}
                    //acquireValue={acquireValue}
                    positionFilter="CTO"
                    setShowOverlay={setShowOverlay}
                    // Filter only for CEOs
                  />
                  <FilterPeopleByPosition
                    label="Search CFO"
                    options={mineralOptions}
                    value={cfo}
                    onChange={(values: any) => setCFO(values)}
                    searchQuery={searchMineralQuerycfo}
                    setSearchQuery={setSearchMineralQuerycfo}
                    type={2}
                    //setisAddnewpeople={setisAddnewminera}
                    setIsSelectedPosition={setIsSelectedPosition}
                    positionFilter="CFO" // Filter only for CEOs
                    //acquireValue={acquireValue}
                    setShowOverlay={setShowOverlay}
                  />
                </>
              )}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              {isaddNewSite ? "Add company" : "Select Company"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {isaddNewSite === false && (
                <>
                  <MineralSearchDrop
                    label="Select company"
                    options={mineralOptions}
                    values={selectedValuesSite}
                    onChange={(values: any) => setSelectedValuesSite(values)}
                    searchQuery={searchMineralQuery}
                    setSearchQuery={setSearchMineralQuery}
                    type={5}
                    setisAddnewpeople={setisAddnewSite}
                    setShowOverlay={setShowOverlay}
                    acquireValue={acquireValue}
                  />
                </>
              )}
            </div>
          </div>
        )}
        {currentStep == 4 && (
          <PreviewPage
            name={name}
            country={selectedCompanyCountries}
            tag={mineralTag}
            title={title}
            mineral={selectedValuesMineral}
            //site={selectedValuesSite}
            people={selectedValuesPeople}
            location={companyAddress}
            state={selectedState}
            lg={selectedLGs}
            picture={image && image?.name}
            submitFunction={handleSubmitCompany}
            company={selectedValuesSite}
            isLoading={isLoading}
          />
        )}
        {currentStep === 5 && (
          <div className="py-1 px-5">
            <div className="flex flex-col gap-1">
              <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
                {"Upload Documents"}
              </h2>
            </div>

            <div className="flex flex-col gap-[24px] pt-4">
              <InputElement
                type="text"
                label="Document attribute"
                placeholder="Enter attribut name"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                name="name"
                required={false}
              />

              <MultipleEl
                label="Upload Document"
                name="files"
                value={files}
                setForm={handleSetForm}
                accept="application/*,video/*"
                instruction="PDF, DOC, DOCX or XLSX (max. 800x400px)"
                multipe={true} // Enable multiple file uploads
              />
              {files && files.length > 0 && (
                <>
                  <LoginButton
                    onClick={handleSubmitDoc}
                    type="button"
                    disable={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Attach document"}
                  </LoginButton>
                </>
              )}
            </div>
          </div>
        )}
        {currentStep === 6 && (
          <div className="py-1 px-5">
            <div className="flex flex-col gap-1">
              <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
                {"Attach Pictures"}
              </h2>
            </div>

            <div className="flex flex-col gap-[24px] pt-4">
              <InputElement
                type="text"
                label="Name"
                placeholder="Enter pictures attribute"
                value={picName}
                onChange={(e) => setpicName(e.target.value)}
                name="name"
                required={false}
              />
              {/**
              <MineralSearchDrop
                label="Select company "
                options={mineralOptions}
                values={selectedValuesCompany}
                onChange={(values: any) => setSelectedValuesCompany(values)}
                searchQuery={searchMineralQuery}
                setSearchQuery={setSearchMineralQuery}
                type={5}
                setCurrentStep={setCurrentStep}
                setisAddnewpeople={setisAddnewSite}
                isDocument={false}
              />

              <MineralSearchDrop
                label="Select people"
                options={mineralOptions}
                values={selectedValuesDoc}
                onChange={(values: any) => setSelectedValuesDoc(values)}
                searchQuery={searchMineralQueryc}
                setSearchQuery={setSearchMineralQueryc}
                type={6}
                setisAddnewpeople={setisaddNewPeople}
                setCurrentStep={setCurrentStep}
                isDocument={true}
              />
 */}

              <MultipleEl
                label="Upload Pictures"
                name="files"
                value={files}
                setForm={handleSetForm}
                accept="image/*"
                instruction="GIF, PNG, JPG or JPEG (max. 800x400px)"
                multipe={true}
              />
              {files && files.length > 0 && (
                <>
                  <LoginButton
                    onClick={handleSubmitPics}
                    type="button"
                    disable={isLoading}
                  >
                    {isLoading ? "uploading..." : "Attach Pictures"}
                  </LoginButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between px-5">
        {currentStep !== 0 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded font-Satoshi font-medium"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
          >
            Previous
          </button>
        )}
        {currentStep !== 4 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[14px] text-white rounded font-medium"
            onClick={() => {
              if (companyActual && companyAddress) {
                if (currentStep === steps.length - 1) {
                  window.location.reload();
                } else {
                  setFiles([]);
                  setSearchQuery("");
                  setCurrentStep((prev) => prev + 1);
                }
              } else {
                showNotification(
                  "Error!",
                  `Address field is required`,
                  "danger"
                );
              }
            }}
          >
            {currentStep === steps.length - 1 ? "Restart" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MiningSiteWrapper;
