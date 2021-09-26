import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import { useFormik } from "formik";

// import profilepic from "../../public/profilepic.jpeg";
import cardpic from "../../public/cardpics.jpeg";
import useClickOutside from "../../hooks/use-click-outside";
import { useAppQuery, useAppMutation } from "../../hooks/query-hook";
import { useUser } from "../../hooks/auth-hook";
import { queryKeyGenerator } from "../../helpers/query-key-generator";

import { LockClosed, LockOpen } from "../../components/icons/lock";
import TaskList from "../../components/list-actions";
import BoardMenu from "../../components/board-actions/board-menu";
import AddAnother from "../../components/add-another";
import Globe from "../../components/icons/globe";
import DotsHorizontal from "../../components/icons/dots-horizontal";
import BoardMembers from "../../components/board-actions/board-members";

import Cancel from "../../components/icons/cancel";

const Board = () => {
  const { query } = useRouter();
  const { user } = useUser();

  const { data } = useAppQuery(queryKeyGenerator(query.id).user_boards, {
    url: `/boards/${query.docId}`,
  });
  const { data: lists } = useAppQuery(
    queryKeyGenerator(query.docId).board_lists,
    {
      url: "/lists",
    }
  );

  const [hideVisibility, setHideVisibility] = useState(true);
  const [hideBoardMenu, setHideBoardMenu] = useState(true);
  const [hideListSetting, setHideListSetting] = useState(true);

  return (
    <section className="w-11/12 mx-auto h-full">
      <div className="flex justify-between mt-8 mb-4 flex-wrap items-center">
        <div className="flex ">
          <button
            className="mb-2 sm:mb-0 ml-4 text-greyish-100 bg-greyish-50 px-3 py-1 rounded-lg font-noto font-light flex text-xs mr-4 relative"
            type="button"
            onClick={() => setHideVisibility(!hideVisibility)}
          >
            {data?.is_private ? (
              <>
                <LockClosed />
                <p className="self-center ml-2 ">Private</p>
              </>
            ) : (
              <>
                <LockOpen />
                <p className="self-center ml-2 ">Public</p>
              </>
            )}

            <VisibilityOptions
              docId={query.docId}
              hide={hideVisibility}
              setHideVisibility={setHideVisibility}
              isCreator={data?.creator.username === user?.username}
            />
          </button>

          <BoardMembers members={data?.members} sm={false} />
        </div>

        <div
          className="ml-4 text-greyish-100 bg-greyish-50 px-3 py-1 rounded-lg font-noto font-light flex text-xs mr-4"
          role="button"
          onClick={() => setHideBoardMenu(!setHideBoardMenu)}
        >
          <DotsHorizontal className="text-greyish-100 h-3 w-3 self-center" />
          <p className="self-center ml-2 ">Show Menu</p>
        </div>
        <BoardMenu hide={hideBoardMenu} setHideBoard={setHideBoardMenu} />
      </div>

      <BoardMembers members={data?.members} />

      <div className="h-full bg-blueish-50 rounded-3xl pt-7 px-4 pb-2">
        {lists?.length ? (
          <div className="h-full flex max-w-full overflow-x-scroll">
            {lists.map((list) => (
              <TaskList
                key={list.id}
                list={
                  list
                  //   {
                  //   name: "Todos",
                  //   cards: [
                  //     {
                  //       title: "✋🏿 Add what you'd like to work on below",
                  //       attachments: [],
                  //       comments: [1, 2, 3, 4],
                  //       tags: [
                  //         {
                  //           id: "001",
                  //           name: "technical",
                  //         },
                  //       ],
                  //     },
                  //     {
                  //       imageSrc: cardpic,
                  //       title: "Github jobs challenge",
                  //       attachments: [1, 2],
                  //       comments: [1, 2, 3, 4],
                  //       tags: [
                  //         {
                  //           id: "001",
                  //           name: "technical",
                  //         },
                  //       ],
                  //     },
                  //   ],
                  // }
                }
              />
            ))}
            <div className="relative">
              <AddAnother
                text="Add another list"
                classes="min-w-[250px] h-8"
                onClick={() => setHideListSetting(false)}
              />
              <NewListForm
                hideListSetting={hideListSetting}
                setHideListSetting={setHideListSetting}
                boardId={query.docId}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const schema = yup.object({
  name: yup.string().required("Name is required."),
});

const NewListForm = ({ setHideListSetting, hideListSetting, boardId }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAppMutation(
    {
      url: `/lists`,
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
          queryKeyGenerator(boardId).user_boards,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        await queryClient.invalidateQueries(
          queryKeyGenerator(boardId).board_lists,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        setHideListSetting(true);
        formik.resetForm({
          name: "",
        });
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: (values) => {
      mutate({ ...values, board: [boardId] });
    },
  });

  return (
    <form
      className={`${
        hideListSetting
          ? "hidden"
          : "bg-greyish-50 p-2 rounded absolute top-0 left-0 right-0"
      } `}
      onSubmit={formik.handleSubmit}
    >
      <div className="relative">
        <input
          placeholder="Enter list title..."
          className="placeholder-greyish-150 font-noto p-1 w-full bg-transparent border-2 border-blueish-250 rounded text-sm pb-4"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <small className="text-0.625rem text-misc-red absolute right-0 left-2 bottom-0 font-noto font-light">
            {formik.errors.name}
          </small>
        )}
      </div>
      <div className="flex items-center mt-1">
        <button
          className="mr-2 text-misc-white bg-blueish-250 text-xs px-2 py-1 rounded"
          type="submit"
        >
          {isLoading ? "Loading..." : " Add List"}
        </button>
        <button type="button" onClick={() => setHideListSetting(true)}>
          <Cancel className="h-5 w-5 text-greyish-200" />
        </button>
      </div>
    </form>
  );
};

const VisibilityOptions = ({
  hide,
  setHideVisibility,
  docId,
  isCreator = false,
}) => {
  const queryClient = useQueryClient();

  const visibilityRef = useRef(null);

  useClickOutside(visibilityRef, () => !hide && setHideVisibility(true));

  const { mutate } = useAppMutation(
    {
      method: "PUT",
      url: `/boards/${docId}`,
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          queryKeyGenerator(data?.title).user_boards,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        setHideVisibility(true);
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const handleVisibility = async (isPrivate) => {
    if (isCreator) {
      await mutate({
        is_private: isPrivate,
      });
    }
    return;
  };

  return (
    <div
      ref={visibilityRef}
      className={`absolute bg-misc-white border border-greyish-250 shadow rounded-lg left-0 -right-36 top-11 text-xs text-justify p-2.5 text-greyish-100 z-[2] ${
        hide ? "hidden" : ""
      }`}
    >
      <p className="text-greyish-200 font-bold mb-1">Visibility</p>
      <p className="mb-4">Choose who can see to this board.</p>
      <ul>
        <li
          className={`my-4 p-2 rounded-md hover:bg-greyish-50 ${
            !isCreator ? "cursor-not-allowed" : ""
          }`}
          role="button"
          onClick={() => handleVisibility(false)}
        >
          <div className="flex mb-2 text-greyish-200">
            <Globe className="h-3 w-3 mr-2" />
            <p>Public</p>
          </div>
          <p>Anyone on the internet can see this.</p>
        </li>
        <li
          className={`my-4 p-2 rounded-md hover:bg-greyish-50 ${
            !isCreator ? "cursor-not-allowed" : ""
          }`}
          role="button"
          onClick={() => handleVisibility(false)}
        >
          <div className="flex mb-2 text-greyish-200">
            <LockClosed />
            <p className="ml-2">Private </p>
          </div>
          <p>Only board members can see this.</p>
        </li>
      </ul>
    </div>
  );
};

export default Board;
