import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Search from "./icons/search";
import ChevronDown from "./icons/chevron-down";
import ViewGrid from "./icons/view-grid";

import logo from "../public/Logo.svg";
import profilepic from "../public/profilepic.jpeg";

export default function Layout({ children, cardName }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{cardName ? `${cardName} - ` : ""}Thullo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-4 shadow-sm">
        <div className="flex justify-between w-11/12 sm:w-98% mx-auto">
          <div className="flex ">
            <Image src={logo} alt="logo" />

            <div
              className={cardName ? `hidden md:flex ml-8 items-end` : "hidden"}
            >
              <p className="mr-4">{cardName}</p> |{" "}
              <button
                className="ml-4 text-greyish-100 bg-greyish-50 px-3 py-1 rounded-lg font-noto font-light flex text-xs"
                onClick={() => router.push("/")}
              >
                <ViewGrid />
                <p className="self-center">All Boards</p>
              </button>
            </div>
          </div>

          <div className="flex">
            <button
              className=" sm:hidden p-1 rounded-md bg-blueish-100 mr-4"
              onClick={() => router.push("/search")}
            >
              <Search />
            </button>

            <form className="hidden sm:block mr-2 shadow-sm pl-2  rounded">
              <input className="text-0.625rem w-24" placeholder="Keyword..." />
              <button className="text-0.625rem bg-blueish-250 text-misc-white px-2 py-1 rounded-md">
                Search
              </button>
            </form>

            <Image
              className="rounded"
              src={profilepic}
              alt="avatar"
              width={25}
              height={8}
            />
            <span className="hidden sm:flex self-end ml-1 text-xs font-bold">
              Tonye Akin <ChevronDown />
            </span>
          </div>
        </div>
      </header>
      <main
        className={`w-full h-main overflow-y-scroll ${
          !cardName ? "bg-blueish-50" : "relative"
        }`}
      >
        {children}
      </main>
    </>
  );
}
