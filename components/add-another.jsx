import Plus from "./icons/plus";

const AddAnother = ({ text, classes = "", onClick }) => {
  return (
    <div
      className={`flex justify-between font-noto text-xs bg-blueish-150 text-blueish-250 items-center p-1 rounded-md px-1.5 ${classes}`}
      role="button"
      onClick={onClick}
    >
      <p>{text}</p>
      <Plus />
    </div>
  );
};

export default AddAnother;
