import { useRef, useState } from "react";

import DotsHorizontal from "../icons/dots-horizontal";

import AddAnother from "../add-another";
import Cancel from "../icons/cancel";

import NewCardForm from "../card-actions/new-card-form";
import TaskCard from "../card-actions/task-card";
import EditListName from "./edit-list-name";

import useClickOutside from "../../hooks/use-click-outside";

const TaskList = ({ list }) => {
  const [hideEditList, setHideEditList] = useState(true);
  const [showCardSettings, setShowCardSettings] = useState(false);
  const [rename, setRename] = useState(false);

  const renameRef = useRef(null);

  useClickOutside(renameRef, () => rename && setRename(false));

  const handleRename = (e) => {
    e.preventDefault();
    console.log("handling rename");
  };

  return (
    <div className="mr-8 w-[272px]">
      {rename ? (
        <form
          ref={renameRef}
          className="flex justify-between mb-4"
          onSubmit={handleRename}
        >
          <input className="bg-transparent focus:outline-none border-b border-greyish-150 text-sm flex-grow mr-4" />
          <div className="flex items-center">
            <button
              className="text-0.625rem text-misc-white bg-greenish-150 px-2 py-1 rounded-lg"
              type="submit"
            >
              save
            </button>
            <button
              className="p-1.5 py-1 border border-greyish-150 ml-2 rounded-lg"
              type="button"
              onClick={() => setRename(false)}
            >
              <Cancel className="h-3 w-3 text-greyish-150 " />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between mb-4">
          <div className="relative">
            <p
              className="cursor-pointer"
              onClick={() => setHideEditList(!hideEditList)}
            >
              {list.name}
            </p>
            <EditListName
              hide={hideEditList}
              setHideEditList={setHideEditList}
              setRename={setRename}
            />
          </div>
          <DotsHorizontal
            className="text-greyish-100 h-6 w-6 cursor-pointer"
            onClick={() => setHideEditList(!hideEditList)}
          />
        </div>
      )}

      {list?.cards?.length
        ? list?.cards?.map((card) => <TaskCard key={card.title} card={card} />)
        : null}
      <div className="relative">
        <AddAnother
          text="Add another card"
          onClick={() => setShowCardSettings(true)}
        />
        {showCardSettings && <NewCardForm showForm={setShowCardSettings} />}
      </div>
    </div>
  );
};

export default TaskList;
