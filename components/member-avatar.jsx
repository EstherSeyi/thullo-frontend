import Image from "next/image";

const MemberAvatar = ({ imgSrc }) => {
  return (
    <div className="mr-2">
      <Image
        className="rounded"
        src={imgSrc}
        alt="avatar"
        width={25}
        height={25}
      />
    </div>
  );
};

export default MemberAvatar;
