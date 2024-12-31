import earchlog from "../../assets/images/Dashboard/searchlogo.png";
interface DropdownProps {
  setSearchQuery?: any;
}
const Search: React.FC<DropdownProps> = ({ setSearchQuery }) => {
  return (
    <div className="bg-[#F9FAFB] border border-[#F2F2F2] h-[38px] flex  rounded-[100px] w-[291px] px-3">
      <div className="flex items-center justify-start gap-3">
        <img src={earchlog} alt="" className="h-[18px]" />
        <input
          type="search"
          className="bg-inherit outline-none border-none text-[#828282] font-polySans font-normal text-[14px] leading-[18.87px]"
          placeholder="Search datasets, users, logs etc."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
