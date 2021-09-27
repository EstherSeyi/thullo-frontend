import { useQueryClient } from "react-query";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import Cancel from "../icons/cancel";

import { useAppMutation } from "../../hooks/query-hook";
import { useUser } from "../../hooks/auth-hook";

import { queryKeyGenerator } from "../../helpers/query-key-generator";

const schema = object({
  title: string().required("Name is required."),
});

const NewCardForm = ({ showForm, listID }) => {
  const { query } = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useAppMutation(
    {
      url: `/cards`,
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(`list_${data?.list?.id}`, {
          refetchInactive: true,
        });
        await queryClient.invalidateQueries(
          queryKeyGenerator(query.id).single_board,
          {
            refetchInactive: true,
          }
        );
        await queryClient.invalidateQueries(
          queryKeyGenerator(data?.list?.board).board_lists,
          {
            refetchInactive: true,
          }
        );

        formik.resetForm({
          title: "",
        });
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: (values) => {
      mutate({
        ...values,
        creator: [user?.id],
        list: listID && parseFloat(listID),
      });
    },
  });

  return (
    <form
      className="bg-greyish-50 p-2 rounded absolute top-0 left-0 right-0"
      onSubmit={formik.handleSubmit}
    >
      <input
        placeholder="Enter list title..."
        className="placeholder-greyish-150 font-noto p-1 w-full bg-transparent border-2 border-blueish-250 rounded text-sm"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <div className="flex items-center mt-1">
        <button
          className="mr-2 text-misc-white bg-blueish-250 text-xs px-2 py-1 rounded"
          type="submit"
        >
          {isLoading ? "Loading..." : "Add Card"}
        </button>
        <button type="button" onClick={() => showForm(false)}>
          <Cancel className="h-5 w-5 text-greyish-200" />
        </button>
      </div>
    </form>
  );
};

export default NewCardForm;
