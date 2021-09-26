import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { useQueryClient } from "react-query";

import { useAppMutation } from "../../hooks/query-hook";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const EditDescription = ({ setEditDescription, cardID, description }) => {
  const queryClient = useQueryClient();
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const [state, setState] = useState({
    editorContent: "",
  });

  const handleChange = (content) => {
    setState((prevState) => ({
      ...prevState,
      editorContent: content,
    }));
  };

  const { mutate, isLoading } = useAppMutation(
    {
      method: "PUT",
      url: `/cards/${cardID}`,
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(`card_${cardID}`, {
          refetchInactive: true,
        });
        setEditDescription(false);
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      description: state.editorContent,
    });
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <SunEditor
        name="description"
        getSunEditorInstance={getSunEditorInstance}
        onChange={handleChange}
        defaultValue={description}
        width="100%"
        height="300px"
        autoFocus={true}
        setDefaultStyle="font-family: 'Noto Sans', sans-serif; font-size: 14px;"
        hideToolbar={true}
        // hide={hide}
      />

      <div className="flex mt-2 text-0.625rem">
        <button
          className="bg-greenish-150 text-misc-white px-2 py-1 mr-2 rounded-md"
          type="submit"
        >
          {isLoading ? "Loading..." : "save"}
        </button>
        <button
          className="text-greyish-100 border border-greyish-100 rounded-md px-2 py-1"
          type="button"
          onClick={() => setEditDescription(false)}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default EditDescription;
