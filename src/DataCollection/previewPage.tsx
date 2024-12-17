import React from "react";

interface PreviewPageProps {
  name?: string;
  country?: any; // Array of objects for country
  tag?: string;
  title?: string;
  mineral?: any; // Array of objects for minerals
  location?: string;
  picture?: string; // File name or URL
  submitFunction: () => void;
  rcNumber?: any;
  parent?: any;
  isLoading?: any;
  site?: any;
  people?: any;
  state?: any;
  lg?: any;
  company?: any;
}

const PreviewPage: React.FC<PreviewPageProps> = ({
  name,
  country,
  tag,
  title,
  mineral,
  location,
  picture,
  submitFunction,
  rcNumber,
  parent,
  isLoading,
  site,
  people,
  state,
  lg,
  company,
}) => {
  const hasContent =
    name ||
    (country && country.length > 0) ||
    tag ||
    title ||
    (mineral && mineral.length > 0) ||
    location ||
    rcNumber ||
    picture ||
    parent ||
    state ||
    lg ||
    company ||
    (site && site.length > 0) ||
    (people && people.length > 0);

  //console.log(name);
  return (
    <div className="py-1 px-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-polySans text-[#202020] text-xl leading-6 font-semibold mb-5">
          {"Preview Selections"}
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {hasContent ? (
          <>
            {name && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  Name
                </span>
                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {name}
                </span>
              </div>
            )}

            {parent && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  Parent Company
                </span>
                <ul className="list-none pl-5 font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {parent.map((parent: any, index: any) => (
                    <li
                      className="font-Satoshi text-[14px] text-[#202020]"
                      key={index}
                    >
                      {parent.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {rcNumber && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  RC Number
                </span>

                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {rcNumber}
                </span>
              </div>
            )}
            {state && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  State
                </span>

                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {state}
                </span>
              </div>
            )}
            {lg && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  LG
                </span>

                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {lg}
                </span>
              </div>
            )}
            {country && country.length > 0 && (
              <div className="w-full flex justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054] block mb-2">
                  Country
                </span>
                <ul className="list-none pl-5 font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {country.map((c: any) => (
                    <li className="font-Satoshi text-[14px] text-[#202020]">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {company && company.length > 0 && (
              <div className="w-full flex justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054] block mb-2">
                  Company
                </span>
                <ul className="list-none pl-5 font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {company.map((c: any) => (
                    <li className="font-Satoshi text-[14px] text-[#202020]">
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tag && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  Tag
                </span>
                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {tag}
                </span>
              </div>
            )}

            {title && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  Title
                </span>
                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {title}
                </span>
              </div>
            )}
            {people && people.length > 0 && (
              <div className="w-full flex justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054] block mb-2">
                  People
                </span>
                <ul className="list-none pl-5 flex gap-2  flex-col font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap ">
                  {people.map((m: any) => (
                    <li
                      key={m.id}
                      className="font-Satoshi text-[14px] text-[#202020]"
                    >
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mineral && mineral.length > 0 && (
              <div className="w-full flex justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054] block mb-2">
                  Minerals
                </span>
                <ul className="list-none pl-5 flex gap-2  flex-col font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap ">
                  {mineral.map((m: any) => (
                    <li
                      key={m.id}
                      className="font-Satoshi text-[14px] text-[#202020]"
                    >
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {site && site.length > 0 && (
              <div className="w-full flex justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054] block mb-2">
                  Site
                </span>
                <ul className="list-none pl-5 flex gap-2  flex-col font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap ">
                  {site.map((m: any) => (
                    <li
                      key={m.id}
                      className="font-Satoshi text-[14px] text-[#202020]"
                    >
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {location && (
              <div className="w-full flex items-center justify-between">
                <span className="font-medium font-polySans text-[14px] text-[#344054]">
                  Location
                </span>
                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {location}
                </span>
              </div>
            )}

            {picture && (
              <div className="w-full flex justify-between items-center">
                <span className="font-medium font-polySans text-[14px] text-[#344054] block mb-2">
                  Picture
                </span>
                <span className="font-bold font-Satoshi text-[16px] max-w-[220px] text-ellipsis overflow-hidden text-nowrap">
                  {picture}
                </span>
              </div>
            )}
          </>
        ) : (
          <span className="text-gray-500 text-center">
            No data available for preview.
          </span>
        )}

        <button
          className="px-4 py-2 bg-primary font-polySans text-[14px] text-white rounded font-medium"
          onClick={submitFunction}
        >
          {isLoading ? "Submitting" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
