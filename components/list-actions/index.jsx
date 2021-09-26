import { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { object, string } from "yup";
import { useFormik } from "formik";

import DotsHorizontal from "../icons/dots-horizontal";

import AddAnother from "../add-another";
import Cancel from "../icons/cancel";

import NewCardForm from "../card-actions/new-card-form";
import TaskCard from "../card-actions/task-card";
import EditListName from "./edit-list-name";

import useClickOutside from "../../hooks/use-click-outside";
import { useAppMutation } from "../../hooks/query-hook";
import { queryKeyGenerator } from "../../helpers/query-key-generator";

const schema = object({
  name: string().required("Name is required."),
});

const TaskList = ({ list }) => {
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const [hideEditList, setHideEditList] = useState(true);
  const [showCardSettings, setShowCardSettings] = useState(false);
  const [rename, setRename] = useState(false);

  const renameRef = useRef(null);

  useClickOutside(renameRef, () => rename && setRename(false));

  const { mutate, isLoading } = useAppMutation(
    {
      url: `/lists/${list.id}`,
      method: "PUT",
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
          queryKeyGenerator(query.docId).user_boards,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        await queryClient.invalidateQueries(
          queryKeyGenerator(query.docId).board_lists,
          {
            refetchInactive: true,
            exact: true,
          }
        );
        setHideEditList(true);
        setRename(false);
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
      name: list?.name ?? "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="mr-8 min-w-[272px]">
      {rename ? (
        <form
          ref={renameRef}
          className="flex justify-between mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative">
            <input
              className="bg-transparent focus:outline-none border-b border-greyish-150 text-sm flex-grow mr-4"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="text-0.625rem text-misc-red absolute right-0 left-0 -bottom-3 font-noto font-light">
                {formik.errors.name}
              </small>
            )}
          </div>
          <div className="flex items-center">
            <button
              className="text-0.625rem text-misc-white bg-greenish-150 px-2 py-1 rounded-lg"
              type="submit"
            >
              {isLoading ? "Loading..." : "save"}
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
