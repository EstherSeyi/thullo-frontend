import MemberAvatar from "../member-avatar";

const MemberRow = ({
  name,
  admin = false,
  imageSrc,
  alt,
  handleRemoveUser,
  userId,
  removeLoading,
}) => {
  return (
    <div className="flex items-center justify-between font-poppins mb-4">
      <div className="flex items-center">
        <MemberAvatar imgSrc={imageSrc} alt={alt} />
        <p className="ml-4 text-misc-black font-bold">{name}</p>
      </div>
      {admin ? (
        <p className="text-greyish-150 text-0.625rem">Admin</p>
      ) : (
        <button
          className="text-misc-red py-1 px-2 border border-misc-red rounded-md text-0.625rem"
          onClick={() => handleRemoveUser(userId)}
        >
          {removeLoading ? "Loading..." : "Remove"}
        </button>
      )}
    </div>
  );
};

export default MemberRow;
