import datelogo from "../../assets/images/Dashboard/calendar.png";
interface CustomDatePickerProps {
  setShowPicker?: any;
}

const DateButton: React.FC<CustomDatePickerProps> = ({ setShowPicker }) => {
  return (
    <div className="btndate" onClick={() => setShowPicker(true)}>
      <img src={datelogo} alt="" className="h-5" />
      <span className="text-[#667085] font-medium text-[14px] leading-6 font-Satoshi">
        Select date
      </span>
    </div>
  );
};

export default DateButton;
