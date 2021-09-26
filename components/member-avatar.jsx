import Image from "next/image";

import profilepic from "../public/profilepic.jpeg";

const MemberAvatar = ({ imgSrc = profilepic, alt = "avatar" }) => {
  return (
    <div className="mr-2">
      <Image
        className="rounded"
        src={imgSrc}
        alt={alt}
        width={28}
        height={28}
      />
    </div>
  );
};

export default MemberAvatar;
