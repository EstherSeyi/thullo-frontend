import { useState } from "react";

import TagIcon from "../icons/tag";
import Tag from "../tag";

const AddLabel = ({ labelRef, openLabel }) => {
  const [labelDetails, setLabelDetails] = useState({
    label_name: "",
    textColor: "",
    backgroundColor: "",
  });

  const selectColor = ({ textColor, backgroundColor }) => {
    setLabelDetails((prevState) => ({
      ...prevState,
      textColor,
      backgroundColor,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(labelDetails);
  };

  return (
    <div
      ref={labelRef}
      className={`${
        !openLabel
          ? "hidden"
          : "absolute bg-misc-white  bottom-4 sm:bottom-[-190px] sm:-left-24 z-[8] border border-greyish-250 p-2 w-60 rounded-xl shadow-sm flex flex-col"
      }`}
    >
      <p className="text-greyish-200 font-bold mb-1">Label</p>
      <p className="font-noto text-greyish-100 text-xs mb-4">
        Select a name and a color
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          placeholder="Label..."
          className="shadow w-full py-1.5 rounded-lg focus:outline-none pl-2"
          onChange={({ target }) => {
            setLabelDetails((prevState) => ({
              ...prevState,
              [target.name]: target.value,
            }));
          }}
          value={labelDetails.name}
          name="label_name"
        />

        <div className="grid grid-cols-4 gap-1.5 mt-5">
          {labelColors.map((labelColor) => (
            <LabelColor
              colorClass={labelColor.class}
              key={labelColor.colorCode}
              onClick={() =>
                selectColor({
                  textColor: labelColor.colorCode,
                  backgroundColor: labelColor.bgColorCode,
                })
              }
            />
          ))}
        </div>
        <div className="mt-4">
          <div className="flex items-center text-greyish-150 mb-2">
            <TagIcon className="w-3 h-3 mr-1 " />
            <p>Available</p>
          </div>
          <div className="overflow-x-scroll flex">
            <div className="mr-2">
              <Tag name="Technical" colorCode="#828282" bgColorCode="#ededed" />
            </div>
          </div>
        </div>

        <button
          className="bg-blueish-250 text-misc-white text-0.625rem py-2 px-6 rounded-lg mt-2.5 mb-2.5 max-w-[78px] self-center"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

const labelColors = [
  {
    class: "bg-greenish-150",
    colorCode: "#219653",
    bgColorCode: "#D3EADD",
  },
  {
    class: "bg-yellowish-100",
    colorCode: "#F2C94C",
    bgColorCode: "#FCF4DB",
  },
  {
    class: "bg-orangeish-100",
    colorCode: "#F2994A",
    bgColorCode: "rgba(242, 153, 74, 0.2)",
  },
  {
    class: "bg-misc-red",
    colorCode: "#EB5757",
    bgColorCode: "#ffcaca",
  },
  {
    class: "bg-blueish-250",
    colorCode: "#2F80ED",
    bgColorCode: "#DAE4FD",
  },
  {
    class: "bg-blueish-200",
    colorCode: "#56CCF2",
    bgColorCode: "#d4f4ff",
  },
  {
    class: "bg-greenish-100",
    colorCode: "#6FCF97",
    bgColorCode: "#e3feee",
  },
  {
    class: "bg-misc-black2",
    colorCode: "#000000",
    bgColorCode: "#a3a3a3",
  },
  {
    class: "bg-greyish-200",
    colorCode: "#4F4F4F",
    bgColorCode: "#cdcdcd",
  },
  {
    class: "bg-greyish-100",
    colorCode: "#828282",
    bgColorCode: "#ededed",
  },
  {
    class: "bg-greyish-150",
    colorCode: "#BDBDBD",
    bgColorCode: "#575757",
  },
  {
    class: "bg-greyish-250",
    colorCode: "#E0E0E0",
    bgColorCode: "#606060",
  },
];

const LabelColor = ({ colorClass, onClick }) => {
  return (
    <button
      type="button"
      className={`p-4 ${colorClass} rounded`}
      onClick={onClick}
    ></button>
  );
};

export default AddLabel;
