import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const MenuDescriptionEditor = ({ setEditDesc }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <SunEditor
        name="description"
        getSunEditorInstance={getSunEditorInstance}
        onChange={handleChange}
        defaultValue="<p>Simple board to start on a project.</p>

      <p>Each list can hold items (cards) that represent ideas or tasks.</p>
      
      <p>There 4 lists here:</p>
      
      <ul>
      <li> <strong>Backlog</strong> 🤔 : Ideas are created here. Here people can describe the idea following three simple questions: Why you wish to do it, What it is, how can you do it.</li>
      
      <li>   <strong>In Progress</strong>📚: Once the ideas is clearly defined, the task can move to #todo stage. Here the owner of the idea can move to #doing once s/he is ready. He can also wait a bit for other members to join.</li>
      <li> <strong>In Review</strong> ⚙️: On-going</li>
      <li> <strong>Completed</strong> 🙌🏽**: Finished</li>
      </ul>"
        width="100%"
        height="421px"
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
          save
        </button>
        <button
          className="text-greyish-100 border border-greyish-100 rounded-md px-2 py-1"
          type="button"
          onClick={() => setEditDesc(false)}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default MenuDescriptionEditor;
