const Input = ({ label, errored, errorMessage, ...rest }) => {
  return (
    <label className="relative block mb-8">
      <span className="font-noto font-thin text-greyish-100 text-xs block mb-3">
        {label}
      </span>
      <input
        className="w-full bg-transparent border-b border-greyish-150  focus:outline-none focus:border-yellowish-100 text-greyish-200"
        {...rest}
      />
      {errored ? (
        <small className="text-misc-red absolute left-0 font-thin text-0.625rem top-14 truncate">
          {errorMessage}
        </small>
      ) : null}
    </label>
  );
};

export default Input;
