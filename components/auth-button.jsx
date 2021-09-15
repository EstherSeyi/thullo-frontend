const Button = ({ children, loading, ...rest }) => {
  return (
    <div className="flex justify-center mt-12">
      <button
        className="bg-blueish-250 px-6 py-1.5 rounded-lg text-misc-white border border-blueish-250 hover:bg-transparent hover:text-blueish-250"
        {...rest}
      >
        {loading ? "Loading..." : children}
      </button>
    </div>
  );
};

export default Button;
