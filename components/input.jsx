const Input = ({ label, rest }) => {
  return (
    <label>
      <span className="font-noto font-thin text-greyish-100 text-xs block mb-3">
        {label}
      </span>
      <input
        className="w-full bg-transparent border-b border-greyish-150 mb-6 focus:outline-none focus:border-yellowish-100 text-greyish-200"
        {...rest}
      />
    </label>
  );
};

export default Input;
