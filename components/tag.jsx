const Tag = ({ name, colorCode = "#2F80ED", bgColorCode = "#DAE4FD" }) => {
  return (
    <span
      style={{
        color: colorCode,
        background: bgColorCode,
      }}
      className="text-0.625rem rounded-full p-0.5 px-2"
    >
      {name}
    </span>
  );
};

export default Tag;
