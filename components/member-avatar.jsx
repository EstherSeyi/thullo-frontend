import Image from "next/image";

const MemberAvatar = ({ imgSrc }) => {
  return (
    <div className="mr-2">
      <Image
        className="rounded"
        src={imgSrc}
        alt="avatar"
        width={28}
        height={28}
      />
    </div>
  );
};

export default MemberAvatar;
