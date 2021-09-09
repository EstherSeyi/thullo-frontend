import { useRef, useState } from "react";
import Image from "next/image";

import DotsHorizontal from "./icons/dots-horizontal";
import Plus from "./icons/plus";
import PaperClip from "./icons/paper-clip";
import Chat from "./icons/chat";
import Tag from "./tag";
import AddAnother from "./add-another";
import Cancel from "./icons/cancel";
import NewCard from "./new-card";

import useClickOutside from "../hooks/use-click-outside";
import { useModal } from "../context/modal";

const TaskList = ({ list }) => {
  const { open } = useModal();
  const [hideEditList, setHideEditList] = useState(true);
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

      <AddAnother text="Add another card" onClick={() => open(<NewCard />)} />
    </div>
  );
};

const EditListName = ({ hide, setHideEditList, setRename }) => {
  const editListRef = useRef(null);

  useClickOutside(editListRef, () => {
    return !hide && setHideEditList(true);
  });

  return (
    <ul
      ref={editListRef}
      className={`${
        hide ? "hidden" : ""
      } absolute text-0.625rem text-greyish-100 bg-misc-white left-0 w-36 border border-greyish-250 p-2 rounded-2xl`}
    >
      <li
        className="py-2 border-b border-greyish-250 cursor-pointer"
        onClick={() => setRename(true)}
      >
        Rename
      </li>
      <li className="py-2 cursor-pointer">Delete this list</li>
    </ul>
  );
};

const TaskCard = ({ card }) => {
  return (
    <div className="font-noto p-2 bg-misc-white rounded-lg shadow-md mb-4 w-[272px]">
      {card?.imageSrc ? (
        <Image
          src={card.imageSrc}
          className="rounded"
          width={450}
          height={250}
          objectFit="fill"
          layout="responsive"
          alt="interior of a lounge"
        />
      ) : null}

      <p className="mb-3">{card.title}</p>
      {card?.tags
        ? card?.tags?.map((tag) => <Tag key={tag.id} name={tag.name} />)
        : null}
      <div className="mt-6 flex justify-between">
        <button className="bg-blueish-250 text-misc-white rounded-md p-0.5">
          <Plus />
        </button>
        {card?.attachments.length || card?.comments?.length ? (
          <div className="flex text-greyish-150 text-0.625rem font-noto">
            {card?.attachments?.length ? (
              <div className="flex items-center">
                <PaperClip className="h-3 w-3 mr-0.5" />
                <span>{card?.attachments?.length}</span>
              </div>
            ) : null}
            {card?.comments?.length ? (
              <div className="flex items-center ml-2.5">
                <Chat className="h-3 w-3 mr-0.5" />
                <span>{card?.comments?.length}</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskList;
