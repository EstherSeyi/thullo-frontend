import { useRef } from "react";

import useClickOutside from "../../hooks/use-click-outside";
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
      } absolute text-0.625rem text-greyish-100 bg-misc-white left-0 w-36 border z-10 border-greyish-250 p-2 rounded-2xl`}
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

export default EditListName;
