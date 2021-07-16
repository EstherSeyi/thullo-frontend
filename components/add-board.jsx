import Cancel from "./icons/cancel";
import { LockClosed } from "./icons/lock";
import Photograph from "./icons/photograph";

import { useModal } from "../context/modal";

const AddBoard = () => {
  const { close } = useModal();

  return (
    <form className="shadow max-w-[307px] bg-misc-white p-4 rounded-md text-0.625rem mt-[10%] mx-auto relative">
      <button
        type="button"
        className="bg-blueish-250 p-1 rounded absolute right-2 top-2"
        onClick={() => close()}
      >
        <Cancel />
      </button>
      <div className="bg-cardpics py-8 rounded-md"></div>
      <input
        placeholder="Add board title"
        className="font-poppins w-full border border-greyish-200 pl-2 py-1.5 mt-2 mb-5 rounded-md text-0.625rem font-extralight shadow-sm focus:outline-none"
      />

      <div className="flex text-xs text-greyish-100 justify-between">
        <button className="px-4 py-1 rounded-md bg-greyish-50 font-light flex-48 flex justify-center">
          <Photograph />
          <span className="ml-2">Cover</span>
        </button>
        <button className="py-1 rounded-md bg-greyish-50 font-light flex-48 flex justify-center">
          <LockClosed />
          <span className="ml-2">Private</span>
        </button>
      </div>
      <div className="flex font-poppins ml-auto w-max mt-6">
        <button
          className="font-light text-greyish-100 hover:bg-greyish-50 px-3 py-1 rounded-md mr-2"
          type="reset"
        >
          Cancel
        </button>
        <button className="font-light text-misc-white bg-blueish-250 px-2 py-1 rounded-md">
          <span className="mr-2">+</span>
          Create
        </button>
      </div>
    </form>
  );
};

export default AddBoard;
