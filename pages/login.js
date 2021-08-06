import Image from "next/image";

import logo from "../public/Logo-opp.svg";

const Login = () => {
  return (
    <section className="flex min-h-screen">
      <div className="hidden sm:block  bg-blueish-250  flex-30">
        <div className="mt-[20%] mx-auto w-max">
          <Image src={logo} alt="logo" />
        </div>

        <div className="text-misc-white mt-8 w-11/12 mx-auto flex items-center flex-col">
          <p className="text-center">
            Click button to generate test user credentials
          </p>
          <button className="mx-auto text-blueish-250 rounded-md text-xs px-5 py-1.5 bg-blueish-50 mt-4 shadow-md ">
            Click me!
          </button>
          <div className="mt-10 bg-blueish-50 text-blueish-250 p-4 rounded">
            <p>
              <span className="capitalize">username: </span>{" "}
              <span>mostproductive</span>
            </p>
            <p>
              <span className="capitalize">password: </span>{" "}
              <span>logmein</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:flex-70 bg-blueish-50 ">
        <form>
          <input placeholder="username" name="username" />
        </form>
      </div>
    </section>
  );
};

export default Login;
