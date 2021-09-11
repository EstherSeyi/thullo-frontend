import Image from "next/image";

import googleLogo from "../public/google-logo.png";

const GooglePrompt = ({ text }) => {
  return (
    <div className="flex justify-center mt-4 font-noto items-center">
      <Image src={googleLogo} alt="google logo" width={50} height={50} />
      <a href="#" className="ml-2">
        {text}
      </a>
    </div>
  );
};

export default GooglePrompt;
