import Cancel from "../icons/cancel";

const NewCardForm = ({ showForm }) => {
  return (
    <form className="bg-greyish-50 p-2 rounded absolute top-0 left-0 right-0">
      <input
        placeholder="Enter list title..."
        className="placeholder-greyish-150 font-noto p-1 w-full bg-transparent border-2 border-blueish-250 rounded text-sm"
      />
      <div className="flex items-center mt-1">
        <button
          className="mr-2 text-misc-white bg-blueish-250 text-xs px-2 py-1 rounded"
          type="submit"
        >
          Add Card
        </button>
        <button type="button" onClick={() => showForm(false)}>
          <Cancel className="h-5 w-5 text-greyish-200" />
        </button>
      </div>
    </form>
  );
};

export default NewCardForm;
