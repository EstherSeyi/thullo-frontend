import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";

import Cancel from "../icons/cancel";
import { LockClosed, LockOpen } from "../icons/lock";
import Photograph from "../icons/photograph";

import { useModal } from "../../context/modal";
import { useUser } from "../../hooks/auth-hook";
import { useAppMutation } from "../../hooks/query-hook";
import { useState } from "react";
import { queryKeyGenerator } from "../../helpers/query-key-generator";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  cover_photo: yup.mixed(),
});

const AddBoard = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { close } = useModal();
  const [file, setFile] = useState({
    name: "",
    value: "",
  });

  const { mutate, isLoading } = useAppMutation(
    {
      url: `/boards`,
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          queryKeyGenerator(data?.creator?.id).user_boards,
          {
            refetchInactive: true,
          }
        );
        close();
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    setFile((prevState) => ({
      ...prevState,
      value: file,
      name: file.name,
    }));

    formik.setFieldValue("cover_photo", file);
  };

  const rebuildData = (data) => {
    const formData = new FormData();
    formData.append("files.cover_photo", file.value, file.name);
    formData.append(
      "data",
      JSON.stringify({ ...data, creator: user?.id, members: [user?.id] })
    );

    return formData;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      is_private: true,
      cover_photo: "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: ({ is_private, title }) => {
      const builtData = rebuildData({ is_private, title });
      mutate(builtData);
    },
  });

  return (
    <form
      className="shadow max-w-[307px] sm:w-full lg:w-[307px] bg-misc-white p-4 rounded-md text-0.625rem mt-[10%] mx-auto relative"
      onSubmit={formik.handleSubmit}
    >
      <button
        type="button"
        className="bg-blueish-250 p-1 rounded absolute right-2 top-2"
        onClick={() => close()}
      >
        <Cancel className="h-4 w-4 text-misc-white" />
      </button>
      <div className="bg-cardpics py-8 rounded-md"></div>
      <input
        placeholder="Add board title"
        className="font-poppins w-full border border-greyish-200 pl-2 py-1.5 mt-2 mb-5 rounded-md text-0.625rem font-extralight shadow-sm focus:outline-none"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.touched.title && formik.errors.title && (
        <small className="text-0.625rem text-misc-red absolute left-4 bottom-28 font-noto font-light">
          {formik.errors.title}
        </small>
      )}

      <input
        className="invisible"
        id="cover_photo"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        name="cover_photo"
      />
      <div className="flex text-xs text-greyish-100 justify-between relative">
        <small className="text-0.625rem text-greyish-100 absolute left-0 -top-4 font-noto font-light truncate">
          {file.name}
        </small>
        <label
          className="px-4 py-1 rounded-md bg-greyish-50 font-light flex-48 flex justify-center cursor-pointer"
          htmlFor="cover_photo"
        >
          <Photograph />
          <span className="ml-2">Cover</span>
        </label>
        <button
          className="py-1 rounded-md bg-greyish-50 font-light flex-48 flex justify-center"
          type="button"
          onClick={() => {
            formik.setFieldValue("is_private", !formik.values.is_private);
          }}
        >
          {formik.values.is_private ? <LockClosed /> : <LockOpen />}

          <span className="ml-2">
            {formik.values.is_private ? "Private" : "Public"}
          </span>
        </button>
        {formik.touched.cover_photo && formik.errors.cover_photo && (
          <small className="text-0.625rem text-misc-red absolute left-0 top-7 font-noto font-light">
            {formik.errors.cover_photo}
          </small>
        )}
      </div>
      <div className="flex font-poppins ml-auto w-max mt-6">
        <button
          className="font-light text-greyish-100 hover:bg-greyish-50 px-3 py-1 rounded-md mr-2"
          type="reset"
          onClick={() => close()}
        >
          Cancel
        </button>
        <button
          className="font-light text-misc-white bg-blueish-250 px-2 py-1 rounded-md"
          type="submit"
        >
          {isLoading ? (
            <span>Loading</span>
          ) : (
            <>
              <span className="mr-2">+</span>
              Create
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddBoard;
