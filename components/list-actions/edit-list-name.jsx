import { useRef } from "react";
import { useQueryClient } from "react-query";

import useClickOutside from "../../hooks/use-click-outside";
import { useAppMutation } from "../../hooks/query-hook";
import { queryKeyGenerator } from "../../helpers/query-key-generator";
const EditListName = ({
  hide,
  setHideEditList,
  setRename,
  listID,
  boardID,
}) => {
  const editListRef = useRef(null);
  const queryClient = useQueryClient();

  useClickOutside(editListRef, () => {
    return !hide && setHideEditList(true);
  });

  const { mutate, isLoading } = useAppMutation(
    {
      url: `/lists/${listID}`,
      method: "DELETE",
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          queryKeyGenerator(data?.creator?.id).user_boards,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        await queryClient.invalidateQueries(
          queryKeyGenerator(boardID).user_boards,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        await queryClient.invalidateQueries(
          queryKeyGenerator(boardID).board_lists,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        setHideEditList(true);
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const handleListDelete = () => {
    mutate();
  };

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
      <li
        className="py-2 cursor-pointer"
        role="button"
        onClick={handleListDelete}
      >
        {isLoading ? "Loading..." : "Delete this list"}
      </li>
    </ul>
  );
};

export default EditListName;
