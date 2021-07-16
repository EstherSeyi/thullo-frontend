import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Search from "./icons/search";
import ChevronDown from "./icons/chevron-down";

import logo from "../public/Logo.svg";
import profilepic from "../public/profilepic.jpeg";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Thullo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-4 shadow-sm">
        <div className="flex justify-between w-11/12 sm:w-98% mx-auto">
          <Image src={logo} alt="logo" />
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
      <main className="w-full h-main overflow-y-scroll bg-blueish-50">
        {children}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </>
  );
}
