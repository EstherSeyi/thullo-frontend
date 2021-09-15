import Image from "next/image";

import logo from "../public/Logo.svg";
import collaboration from "../public/collaboration.svg";
import googleLogo from "../public/google-logo.png";
import { useRouter } from "next/router";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  return (
    <section className="flex min-h-screen">
      <div className="hidden md:block  bg-blueish-250  flex-50">
        <div className="text-misc-white mt-8 w-11/12 mx-auto flex items-center flex-col">
          <Image src={collaboration} alt="logo" width={400} />
          <p className="font-noto w-6/12 text-center font-thin">
            Provding easy and flexible ways to manage your project
          </p>
        </div>
      </div>
      <div className="w-full md:flex-50 bg-blueish-50">
        <div className="mt-24">
          <div
            className="mx-auto w-max mb-16 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={logo} alt="logo" />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
