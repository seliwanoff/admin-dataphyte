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
import CompanyInlineCreate from "./components/CompanyInlineCreate";
import MineralInlineCreate from "./components/mineralinlineCreate";
import PeopleInlineCreate from "./components/propleInlineCreate";
import SiteInlineCreate from "./components/siteInlineCreate";

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

const MineralWrapper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"];

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
  const [acquireValue, setAcquireValue] = useState(false);

  const [formData, setFormData] = useState<{
    [key: number]: { [key: string]: string };
  }>({});
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mineralOptions, setMineralOption] = useState([]);
  const [searchMineralQuery, setSearchMineralQuery] = useState("");
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

  const baseUrl = process.env.REACT_APP_URL;
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [content, setContent] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedValuesParent, setSelectedValuesParent] = useState<string[]>(
    []
  );

  // console.log(files);

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
  const url =
    currentStep === 1
      ? "search/company" //"search/mineral"
      : currentStep === 2
      ? "search/people"
      : currentStep == 3
      ? "search/site"
      : currentStep == 4 && searchMineralQueryc === ""
      ? "search/company"
      : currentStep === 4 && searchMineralQueryc !== ""
      ? "search/people"
      : "";
  const fetchMineral = async (query: string) => {
    try {
      const response = await fetch(`${baseUrl}${url}?q=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      setMineralOption(data.data);
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
        body: formData, // Send FormData in the body
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
      setIsloading(false);
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
    selectedCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });

    selectedValuesPeople.forEach((people: any, index) => {
      formData.append(`people[${index}]`, people.id.toString());
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
    const formData = new FormData();
    formData.append("name", docName);
    //formData.append("company_id", company_id);
    /***
    selectedValuesPeople.forEach((people: any, index) => {
      formData.append(`people_id`, people.id.toString());
    });

    selectedValuesSite.forEach((mineral: any, index) => {
      formData.append(`mining_site_id`, mineral.id.toString());
    });
     */
    const res = await handleSubmitCompany();
    const miner_ids = res.data?.id;
    formData.append(`mineral_id`, miner_ids);

    if (files) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file, file.name);
      });
    }

    try {
      const response = await fetch(`${baseUrl}document/uploaddocuments`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      showNotification("Success!", "Document upload successful", "success");
      setisAddnewSite(false);
      setFiles([]);
      setDocName("");
      setCurrentStep(currentStep + 1);
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitPics = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", picName);
    // formData.append("company_id", company_id);
    // formData.append("people_id", company_id);
    /**
    selectedValuesPeople.forEach((people: any, index) => {
      formData.append(`people_id[${index}]`, people.id.toString());
    });
    */
    /**
    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`mineral_id[${index}]`, mineral.id.toString());
    });
    */

    formData.append(`mineral_id`, company_id);

    if (files) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file, file.name);
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
      setCurrentStep(0);
      setImage([]);
      setName("");
      setTag("");
      setContent("");
      setSelectedCompanyCountries([]);
      setSelectedCompanyCountries([]);
      setSelectedValuesCompany([]);
      setSelectedValuesDoc([]);
      setSelectedValuesMineral([]);
      setSelectedValuesPeople([]);
      setSelectedValuesSite([]);
      setImage([]);
      window.open(
        `https://home-sigma-liard.vercel.app/mineral?id=${encodeURIComponent(
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

    // If `imageMineral` is a File, append it to FormData
    if (peopleImage) {
      formData.append("image", peopleImage, peopleImage.name);
    }

    try {
      const response = await fetch(`${baseUrl}people/create`, {
        method: "POST",
        body: formData, // Send FormData in the body
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
      setIsloading(false);
    }
  };

  const handleSubmitCompany = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", name);
    const tagArray = tag.split(",").map((t) => t.trim());
    tagArray.forEach((tag: any, index: any) => {
      formData.append(`tag[${index}]`, tag);
    });
    // formData.append("location", companyAddress);
    //formData.append("rc_number", rc_number);
    //  formData.append("other_name", other_name);
    formData.append("rich_text", content);
    //formData.append("tag[0]", tag);
    // formData.append("location", peopleCountry);

    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`company[${index}]`, mineral.id.toString());
    });
    selectedValuesSite.forEach((mineral: any, index) => {
      formData.append(`mining_site_id[${index}]`, mineral.id.toString());
    });
    selectedValuesPeople.forEach((mineral: any, index) => {
      formData.append(`people_id[${index}]`, mineral.id.toString());
    });
    selectedCompanyCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });

    formData.append("other_data", other_data);

    if (image) {
      formData.append("image", image, image.name);
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
      //console.log(data.data.id);
      setCompanyId(data.data.id);
      // showNotification("Success!", "MIneral added successful", "success");
      setisaddNewPeople(false);
    //  setCurrentStep(currentStep + 1);
      return data;
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsloading(false);
    }
  };
  //console.log(content);
  useEffect(() => {
    if (searchMineralQuery || searchMineralQueryc) {
      const delayDebounce = setTimeout(() => {
        fetchMineral(searchMineralQuery || searchMineralQueryc);
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchMineralQuery, searchMineralQueryc]);

  useEffect(() => {
    if (searchQuery) {
      const delayDebounce = setTimeout(() => {
        fetchOptions(searchQuery || searchMineralQueryc);
      }, 300);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchQuery, searchMineralQueryc]);
  //console.log(searchMineralQueryc);
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

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
      {showOverlay && currentStep === 1 && (
        <CompanyInlineCreate
          companyName={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          onUpdateCompanyName={selectedValuesMineral}
          setSelectedValuesParent={setSelectedValuesMineral}
          selectedValuesParent={selectedValuesParent}
          setAcquireValue={setAcquireValue}
          setSearchMineralQueryc={setSearchMineralQuery}
        />
      )}
      {showOverlay && currentStep === 3 && (
        <SiteInlineCreate
          //mineralNames={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          setSelectedValuesParent={setSelectedValuesSite}
          selectedValuesParent={selectedValuesSite}
          setAcquireValue={setAcquireValue}
          setSearchMineralQueryc={setSearchMineralQuery}
          // onUpdateCompanyName={setSelectedValuesParent}
        />
      )}
      {showOverlay && currentStep === 2 && (
        <PeopleInlineCreate
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
              Create Mineral
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              <InputElement
                type="text"
                label="Mineral Name"
                placeholder="Enter mineral name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required={true}
                //className="additional-styles"
              />
              {/**
              <SearchableSelect
                label="Mineral location"
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
              */}
              {/**
              <InputElement
                type="text"
                label="RC Number"
                placeholder="Enter RC Number"
                value={rc_number}
                onChange={(e) => setRcNumber(e.target.value)}
                name="rc_number"
                required={true}
                //className="additional-styles"
              />
                */}
              <CountrySelect
                label="Select Countries"
                values={selectedCompanyCountries}
                onChange={(countries) => setSelectedCompanyCountries(countries)}
              />

              <InputElement
                type="text"
                label="Tag (Please separate with (,)"
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
                label="Mineral display Picture"
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
              {isaddNewMineral ? "Add company" : "Select company"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {isaddNewMineral === false && (
                <MineralSearchDrop
                  label="Select company"
                  options={mineralOptions}
                  values={selectedValuesMineral}
                  onChange={(values: any) => setSelectedValuesMineral(values)}
                  searchQuery={searchMineralQuery}
                  setSearchQuery={setSearchMineralQuery}
                  type={5}
                  setisAddnewpeople={setisAddnewminera}
                  setShowOverlay={setShowOverlay}
                  acquireValue={acquireValue}
                />
              )}
              {isaddNewMineral && (
                <>
                  <InputElement
                    type="text"
                    label="Mineral Name"
                    placeholder="Enter mineral name"
                    value={mineralName}
                    onChange={(e) => setMineralName(e.target.value)}
                    name="name"
                    required={false}
                    //className="additional-styles"
                  />

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
                    setPlacedId={setPlacedId}
                  />
                  <InputElement
                    type="text"
                    label="Mineral Tag"
                    placeholder="Enter Tag"
                    value={mineralTag}
                    onChange={(e) => setMineralTag(e.target.value)}
                    name="tag"
                    required={false}
                  />

                  <TextAreaElement
                    type="text"
                    label="Other Info"
                    placeholder="Other Info"
                    value={mineralOtherInfo}
                    onChange={(e: any) => setMineralOtherInfo(e.target.value)}
                    name="tag"
                    required={false}
                  />

                  <UploadEl
                    placeholder="Gold, Ore etc..."
                    helperText=""
                    label="Mineral display Picture"
                    value={imageMineral}
                    setForm={setImageMineral}
                    multipe={false}
                    name="display_picture"
                    accept="image/*"
                    instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
                  />

                  <LoginButton
                    onClick={handleSubmit}
                    type="button"
                    disable={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add mineral"}
                  </LoginButton>
                  <span
                    className="cursor-pointer text-[#202020] font-polySans text-[14px] text-center underline"
                    onClick={() => setisAddnewminera(false)}
                  >
                    Go to search
                  </span>
                </>
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
              )}
              {isaddNewPeople && (
                <>
                  <InputElement
                    type="text"
                    label="FIrst Name"
                    placeholder="Enter First name"
                    value={first_name}
                    onChange={(e) => setFirstname(e.target.value)}
                    name="name"
                    required={false}
                    //className="additional-styles"
                  />
                  <InputElement
                    type="text"
                    label="Last Name"
                    placeholder="Enter First name"
                    value={last_name}
                    onChange={(e) => setLastname(e.target.value)}
                    name="name"
                    required={false}
                    //className="additional-styles"
                  />
                  <InputElement
                    type="text"
                    label="Other Name"
                    placeholder="Enter other name"
                    value={other_name}
                    onChange={(e) => setOtherName(e.target.value)}
                    name="name"
                    required={false}
                    //className="additional-styles"
                  />
                  <CountrySelect
                    label="Select Countries"
                    values={selectedCountries}
                    onChange={(countries) => setSelectedCountries(countries)}
                  />
                  <RoleSelect
                    label="Select Roles"
                    values={selectedRoles}
                    onChange={(roles: any) => setSelectedRoles(roles)}
                  />
                  <InputElement
                    type="text"
                    label="Title"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="name"
                    required={false}
                    //className="additional-styles"
                  />

                  <SearchableSelect
                    label="Location"
                    placeholder="Select address"
                    value={peopleCountry}
                    onChange={handleOptionChange}
                    name="mineraladdress"
                    required={true}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    options={options}
                    setPlacedId={setPlacedId}
                  />
                  <InputElement
                    type="text"
                    label="Tag"
                    placeholder="Enter Tag"
                    value={peopleTag}
                    onChange={(e) => setPeopleTag(e.target.value)}
                    name="tag"
                    required={false}
                  />

                  <TextAreaElement
                    type="text"
                    label="Other Info"
                    placeholder="Other Info"
                    value={peopleOtherData}
                    onChange={(e: any) => setPeopleOtherData(e.target.value)}
                    name="tag"
                    required={false}
                  />

                  <UploadEl
                    placeholder="Gold, Ore etc..."
                    helperText=""
                    label="People display Picture"
                    value={peopleImage}
                    setForm={setPeopleImage}
                    name="display_picture"
                    multipe={false}
                    accept="image/*"
                    instruction="SVG, PNG, JPG or GIF (max. 800x400px)"
                  />

                  <LoginButton
                    onClick={handleSubmitPeople}
                    type="button"
                    disable={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add people"}
                  </LoginButton>
                  <span
                    className="cursor-pointer text-[#202020] font-polySans text-[14px] text-center underline"
                    onClick={() => setisaddNewPeople(false)}
                  >
                    Go to search
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              {isaddNewSite ? "Add Mining site" : "Select Mining site"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {isaddNewSite === false && (
                <>
                  <MineralSearchDrop
                    label="Select Mining site"
                    options={mineralOptions}
                    values={selectedValuesSite}
                    onChange={(values: any) => setSelectedValuesSite(values)}
                    searchQuery={searchMineralQuery}
                    setSearchQuery={setSearchMineralQuery}
                    type={4}
                    setisAddnewpeople={setisAddnewSite}
                    setShowOverlay={setShowOverlay}
                    acquireValue={acquireValue}
                  />
                </>
              )}
              {isaddNewSite && (
                <>
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
                    value={siteaddress}
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

                  <LoginButton
                    onClick={handleSubmitSite}
                    type="button"
                    disable={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add site"}
                  </LoginButton>

                  <span
                    className="cursor-pointer text-[#202020] font-polySans text-[14px] text-center underline"
                    onClick={() => setisAddnewSite(false)}
                  >
                    Go to search
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="py-1 px-5">
            <div className="flex flex-col gap-1">
              <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
                {"Attach Documents"}
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
        {currentStep === 5 && (
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
        {currentStep !== 5 && files.length === 0 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[14px]  text-white rounded font-medium"
            onClick={() => {
              setFiles([]);
              setSearchQuery("");
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
            }}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MineralWrapper;
