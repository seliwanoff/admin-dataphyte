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

const StepperWithForms: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

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
  const [docImage, setdocImage] = useState<any>("");
  const [docName, setDocName] = useState("");

  const [siteActualAddress, setSiteActualAddress] = useState<any>([]);

  const baseUrl = process.env.REACT_APP_URL;

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
      "location[0][lng]",
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

    selectedValuesCompany.forEach((company: any, index) => {
      formData.append(`company_id[${index}]`, company.id.toString());
    });

    selectedValuesDoc.forEach((people: any, index) => {
      formData.append(`people_id[${index}]`, people.id.toString());
    });

    if (docImage) {
      formData.append("files", docImage, docImage.name);
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
    formData.append("address", companyAddress);
    formData.append("rc_number", rc_number);
    formData.append("other_name", other_name);
    formData.append("tag[0]", tag);
    formData.append("location", peopleCountry);
    selectedValuesMineral.forEach((mineral: any, index) => {
      formData.append(`mineral[${index}]`, mineral.id.toString());
    });
    selectedCompanyCountries.forEach((country: any, index: any) => {
      formData.append(`country[${index}]`, country);
    });
    formData.append("other_data", other_data);

    if (image) {
      formData.append("image", image, image.name);
    }

    try {
      const response = await fetch(`${baseUrl}company/create`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }

      const data = await response.json();

      showNotification("Success!", "Company added successful", "success");
      setisaddNewPeople(false);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      showNotification("Error!", `Error fetching options:${error}`, "danger");
    } finally {
      setIsloading(false);
    }
  };

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
      <span className="text-gray-700 font-polySans text-[14px] mb-4 px-4  block ">
        Follow each steps below.
      </span>
      <Stepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />

      {/* Form Content */}
      <div className="mt-8">
        {currentStep === 0 && (
          <div className="py-1 px-5">
            <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-3">
              Create Company
            </h2>
            <div className="flex flex-col gap-[24px] pt-4">
              <InputElement
                type="text"
                label="Company Name"
                placeholder="Enter company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required={true}
                //className="additional-styles"
              />
              <SearchableSelect
                label="Company Address"
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
              <CountrySelect
                label="Select Countries"
                values={selectedCompanyCountries}
                onChange={(countries) => setSelectedCompanyCountries(countries)}
              />
              <InputElement
                type="text"
                label="Tag"
                placeholder="Enter Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                name="tag"
                required={true}
              />

              <TextAreaElement
                type="text"
                label="Other Info"
                placeholder="Other Info"
                value={other_data}
                onChange={(e: any) => setOtherdata(e.target.value)}
                name="tag"
                required={false}
              />
              <UploadEl
                placeholder="Gold, Ore etc..."
                helperText="A cover image of yourself"
                label="Company  Profile Picture"
                value={image}
                setForm={setImage}
                name="display_picture"
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
                  label="Select people"
                  options={mineralOptions}
                  values={selectedValuesPeople}
                  onChange={(values: any) => setSelectedValuesPeople(values)}
                  searchQuery={searchMineralQuery}
                  setSearchQuery={setSearchMineralQuery}
                  type={3}
                  setisAddnewpeople={setisaddNewPeople}
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
                    onChange={(roles) => setSelectedRoles(roles)}
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
                  />
                  <LoginButton
                    onClick={handleSubmitCompany}
                    type="button"
                    disable={isLoading}
                  >
                    {isLoading ? "submitting" : "Submit company"}
                  </LoginButton>
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
                {"Upload document"}
              </h2>
              <span className="text-[#202020] font-Satoshi font-medium text-[14px]">
                After uploading your document, Click on finish.
              </span>
            </div>

            <div className="flex flex-col gap-[24px] pt-4">
              <InputElement
                type="text"
                label="Name"
                placeholder="Enter document name"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                name="name"
                required={false}
              />
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

              <UploadEl
                placeholder="Gold, Ore etc..."
                helperText=""
                label="Document"
                value={docImage}
                setForm={setdocImage}
                multipe={false}
                name="display_picture"
                accept=""
                instruction="PDF, DOC, DOCX or XLSX (max. 800x400px)"
              />

              <LoginButton
                onClick={handleSubmitDoc}
                type="button"
                disable={isLoading}
              >
                {isLoading ? "Adding..." : "Add document"}
              </LoginButton>
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
        {currentStep !== 3 && currentStep !== 4 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[14px]  text-white rounded font-medium"
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        )}
        {currentStep === 4 && (
          <button
            className="px-4 py-2 bg-primary font-polySans text-[14px]  text-white rounded font-medium cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default StepperWithForms;
