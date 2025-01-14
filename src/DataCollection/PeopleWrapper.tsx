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
import CompanyRole from "../panel/components/CompanyRoleComponent";

import CountrySelect from "../panel/components/CountrySelect";
import RichTextEditor from "./components/RichText";
import MultipleEl from "../dashboard/components/MultipleEl";
import CompanyInlineCreate from "./components/CompanyInlineCreate";
import MineralInlineCreate from "./components/mineralinlineCreate";
import PeopleInlineCreate from "./components/propleInlineCreate";
import PreviewmPagem from "./previewPage";
import PreviewPage from "./previewPage";
import SiteInlineCreate from "./components/siteInlineCreate";
import { splitByNumber } from "../helper";

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

const PeopleWrapper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
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
  const [people_id, setPeopId] = useState("");
  const [placeId, setPlacedId] = useState("");
  const [selectedValuesMineral, setSelectedValuesMineral] = useState<string[]>(
    []
  );
  const closeEditor = () => setIsEditorOpen(false);

  const [selectedValuesPeople, setSelectedValuesPeople] = useState<any>([]);
  const [selectedValuesSite, setSelectedValuesSite] = useState<string[]>([]);
  const [selectedValuesCompany, setSelectedValuesCompany] = useState<string[]>(
    []
  );
  const [selectedSiteRoles, setSelectedSiteRoles] = useState<string[]>([]);

  const [siteSections, setSiteSections] = useState([0]); // Tracks all site sections
  const [selectedValuesDoc, setSelectedValuesDoc] = useState<string[]>([]);

  const [selectedCompanyCountries, setSelectedCompanyCountries] = useState<any>(
    []
  );
  const [selectedValuesParent, setSelectedValuesParent] = useState<string[]>(
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
  const [selectedCompanyRoles, setSelectedCompanyRoles] = useState<any>([]);

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
  const [acquireValue, setAcquireValue] = useState(false);

  // console.log(files);

  const handleSetForm = (name: string, files: File[]) => {
    setFiles(files);
  };

  const [sections, setSections] = useState([0]); // Array to track sections

  const addNewSection = () => {
    setSections((prevSections) => [...prevSections, prevSections.length]);
  };

  const removeSection = (index: number) => {
    setSections((prevSections) => prevSections.filter((_, i) => i !== index));
  };

  const addNewSiteSection = () => {
    setSiteSections((prev) => [...prev, prev.length]);
  };

  const removeSiteSection = (index: number) => {
    setSiteSections((prev) => prev.filter((_, i) => i !== index));
    setSelectedValuesSite((prev) => prev.filter((_, i) => i !== index));
    setSelectedSiteRoles((prev) => prev.filter((_, i) => i !== index));
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
      ? "search/mineral"
      : currentStep === 2
      ? "search/company" // "search/people"
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
      //  console.log(data);
      setMineralOption(data.data.data);
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptions([]);
    }
  };

  const handleSubmitDoc = async () => {
    setIsloading(true);
    const formData = new FormData();
    const maxSizeInBytes = 2048 * 1024; // 2024 KB in bytes

    try {
      formData.append("name", docName);

      let peopleId = people_id;

      if (!peopleId) {
        const res = await handleSubmitCompany();
        peopleId = res.data?.id;
      }
      formData.append("people_id", peopleId);
      formData.append("category", "others");

      if (files && files.length > 0) {
        let allFilesValid = true;

        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file, file.name);
        });

        if (!allFilesValid) {
          showNotification("Error!", `Please select file`, "danger");
        }
      } else {
        throw new Error("No files selected for upload.");
      }

      const response = await fetch(`${baseUrl}document/uploaddocuments`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        showNotification(
          "Error!",
          `Failed to upload documents: ${errorText}`,
          "danger"
        );
      }

      const data = await response.json();

      showNotification("Success!", "Document upload successful", "success");
      setisAddnewSite(false);
      setFiles([]);
      setDocName("");
      if (response.status === 200) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } catch (error: any) {
      showNotification(
        "Error!",
        `Error uploading document: ${error.message}`,
        "danger"
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitPics = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", picName);
    formData.append("people_id", people_id);
    // formData.append("people_id", company_id);
    /**
    selectedValuesPeople.forEach((people: any, index: any) => {
      formData.append(`company_id`, people.id);
    });

    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`mineral_id[${index}]`, mineral.id.toString());
    });

    selectedValuesSite.forEach((mineral: any, index) => {
      formData.append(`mining_site_id[${index}]`, mineral.id.toString());
    });
     */

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
      setImage(null);
      setTitle("");
      setFirstname("");
      setLastname("");
      setOtherName("");
      setCompanyAddress("");
      setSelectedCountries([]);
      setSelectedCompanyCountries([]);
      setContent("");
      setTag("");
      setSelectedCompanyCountries([]);
      setSelectedValuesCompany([]);
      setSelectedValuesDoc([]);
      setSelectedValuesMineral([]);
      setSelectedValuesPeople([]);
      setSelectedValuesSite([]);

      setSelectedCountries("");
      window.open(
        `https://home-sigma-liard.vercel.app/people?id=${encodeURIComponent(
          `${people_id}`
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

  const handleSubmitCompany = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("other_name", other_name);

    formData.append("location", companyAddress);
    formData.append("title", title);
    formData.append("other_name", other_name);
    formData.append("rich_text", content);
    const tagArray = tag.split(",").map((t) => t.trim());
    tagArray.forEach((tag: any, index: any) => {
      formData.append(`tag[${index}]`, tag);
    });
    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`mineral[${index}]`, mineral.id.toString());
    });
    selectedCompanyCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });
    /**
    selectedValuesPeople.forEach((company: any, index: any) => {
      formData.append(`company[${index}][id]`, company.id.toString());

      if (selectedCompanyRoles[index]) {
        formData.append(`company[${index}][role]`, selectedCompanyRoles[index]);
      }
    });
    */

    selectedValuesPeople.forEach((person: any, index: number) => {
      const actualPerson = Array.isArray(person) ? person[0] : person;

      //  console.log("Processed person:", actualPerson);
      formData.append(
        `company[${index}][id]`,
        actualPerson?.id?.toString() || ""
      );

      if (selectedCompanyRoles[index]) {
        formData.append(
          `company[${index}][role]`,
          selectedCompanyRoles[index]?.toString() || ""
        );
      }
    });

    /***
    selectedValuesPeople.forEach((company: any, index: any) => {
      formData.append(`company[${index}][id]`, company.id.toString());
    });
    selectedCompanyRoles.forEach((role: any, index: any) => {
      formData.append(`company[${index}][role]`, role);
    });
     selectedValuesSite.forEach((site: any, index: any) => {
      formData.append(`site[${index}][role]`, site?.role?.toString());
    });
     */

    /**
    //console.log(expectedNumber, chunkedTags);
    selectedValuesSite.forEach((site: any, index: any) => {
      // Get the roles for the current site
      const roles = chunkedTags[index] || [];

      roles.forEach((role, roleIndex) => {
        formData.append(`site[${roleIndex}][role]`, role);
      });
    });
    */

    selectedValuesSite.forEach((site: any, index: number) => {
      const actualSite = Array.isArray(site) ? site[0] : site;

      formData.append(`site[${index}][id]`, actualSite?.id?.toString() || "");

      if (selectedSiteRoles[index]) {
        formData.append(
          `site[${index}][role]`,
          selectedSiteRoles[index]?.toString() || ""
        );
      }
    });

    formData.append("other_data", other_data);

    if (image) {
      formData.append("image", image, image.name);
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
      setPeopId(data.data.id);

      showNotification("Success!", "People added successful", "success");
      setisaddNewPeople(false);
      //  setCurrentStep(currentStep + 1);
      setCurrentStep((prevStep) => prevStep + 1);

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

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="p-4">
      {showOverlay && currentStep === 2 && (
        <CompanyInlineCreate
          companyName={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          onUpdateCompanyName={setSelectedValuesParent}
          selectedValuesParent={selectedValuesSite}
          setSelectedValuesParent={setSelectedValuesPeople}
          setAcquireValue={setAcquireValue}
          setSearchMineralQueryc={setSearchMineralQuery}
        />
      )}
      {showOverlay && currentStep === 1 && (
        <MineralInlineCreate
          mineralNames={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          onUpdateCompanyName={selectedValuesMineral}
          setSelectedValuesParent={setSelectedValuesMineral}
          selectedValuesParent={selectedValuesMineral}
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
      {showOverlay && currentStep === 20 && (
        <PeopleInlineCreate
          //mineralNames={""}
          show={showOverlay}
          setShowOverlay={setShowOverlay}
          //  onUpdateCompanyName={setSelectedValuesParent}
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
              Create People
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              <RoleSelect
                label="Select title"
                values={title}
                onChange={setTitle}
              />
              <InputElement
                type="text"
                label=" First name"
                placeholder="Enter first name"
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
                name="name"
                required={true}
                //className="additional-styles"
              />
              <InputElement
                type="text"
                label=" Last name"
                placeholder="Enter last name"
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
                name="name"
                required={true}
                //className="additional-styles"
              />
              <InputElement
                type="text"
                label=" Other name"
                placeholder="Enter other name"
                value={other_name}
                onChange={(e) => setOtherName(e.target.value)}
                name="name"
                required={true}
                //className="additional-styles"
              />

              <SearchableSelect
                label="Location"
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
                label="Select Countries"
                values={selectedCompanyCountries}
                onChange={(countries) => setSelectedCompanyCountries(countries)}
              />
              <InputElement
                type="text"
                label="Tag  (Please separate with (,)"
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

              <UploadEl
                placeholder="Gold, Ore etc..."
                helperText="A cover image of yourself"
                label="Profile Picture"
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
                  acquireValue={acquireValue}
                />
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              {isaddNewPeople ? "Add Company" : "Select Company"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-gray-50 flex flex-col gap-[24px]"
                >
                  <MineralSearchDrop
                    label={`Select company`}
                    options={mineralOptions}
                    values={selectedValuesPeople[index] || []}
                    onChange={(values: any) => {
                      const updatedValues = [...selectedValuesPeople];
                      updatedValues[index] = values;
                      setSelectedValuesPeople(updatedValues);
                    }}
                    searchQuery={searchMineralQuery}
                    setSearchQuery={setSearchMineralQuery}
                    type={2}
                  />

                  <CompanyRole
                    label="Select role"
                    values={selectedCompanyRoles[index] || []}
                    onChange={(values) => {
                      const updatedRoles = [...selectedCompanyRoles];
                      updatedRoles[index] = values;
                      setSelectedCompanyRoles(updatedRoles);
                    }}
                    expectedCount={selectedValuesPeople[index]?.length || 0}
                  />

                  <button
                    type="button"
                    className="text-red-500 mt-2 font-polySans font-medium "
                    onClick={() => removeSection(index)}
                  >
                    Remove Section
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="bg-none text-primary text-right font-polySans font-semibold px-4 py-2 rounded mt-4 float-right  "
                onClick={addNewSection}
              >
                Add Section
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              {isaddNewSite ? "Add Mining site" : "Select Mining site"}
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              {siteSections.map((section, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-gray-50 flex flex-col gap-[24px]"
                >
                  <MineralSearchDrop
                    label={`Select Mining Site `}
                    options={mineralOptions}
                    values={selectedValuesSite[index] || []}
                    onChange={(values: any) => {
                      const updatedValues = [...selectedValuesSite];
                      updatedValues[index] = values;
                      setSelectedValuesSite(updatedValues);
                    }}
                    searchQuery={searchMineralQuery}
                    setSearchQuery={setSearchMineralQuery}
                    type={4}
                    setisAddnewpeople={setShowOverlay}
                    setShowOverlay={setShowOverlay}
                  />

                  <InputElement
                    type="text"
                    label="Site role"
                    placeholder="Enter role"
                    value={selectedSiteRoles[index] || ""}
                    onChange={(e) => {
                      const updatedRoles = [...selectedSiteRoles];
                      updatedRoles[index] = e.target.value;
                      setSelectedSiteRoles(updatedRoles);
                    }}
                    name={`roles[${index}]`}
                    required={true}
                  />

                  <button
                    type="button"
                    className="text-red-500 mt-2 font-polySans font-medium text-center w-full"
                    onClick={() => removeSiteSection(index)}
                  >
                    Remove Section
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="bg-none text-primary text-right font-polySans font-semibold px-4 py-2 rounded mt-4 float-right "
                onClick={addNewSiteSection}
              >
                Add new section
              </button>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <PreviewPage
            name={title + " " + first_name + " " + last_name + other_name}
            country={selectedCompanyCountries}
            tag={mineralTag}
            title={title}
            mineral={selectedValuesMineral}
            site={selectedValuesSite}
            company={selectedValuesPeople}
            location={companyAddress}
            picture={image && image?.name}
            submitFunction={handleSubmitCompany}
            isLoading={isLoading}
          />
        )}
        {currentStep === 5 && (
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
        {currentStep !== 4 && currentStep !== 6 && files.length === 0 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[14px] text-white rounded font-medium"
            onClick={() => {
              if (currentStep === steps.length - 1) {
                window.location.reload();
              } else {
                setFiles([]);
                setSearchQuery("");
                setCurrentStep((prev) => prev + 1);
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

export default PeopleWrapper;
