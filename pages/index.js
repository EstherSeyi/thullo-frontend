import Image from "next/image";

import Layout from "../components/layout";
import AddBoard from "../components/add-board";

import profilepic from "../public/profilepic.jpeg";

import { useModal } from "../context/modal";

export default function Home() {
  const { open } = useModal();

  return (
    <Layout>
      <section className="w-11/12 max-w-[1024px] mx-auto mt-8 ">
        <h1 className="text-lg">All Boards</h1>
        <button
          className="px-5 py-1.5 bg-blueish-250 rounded text-xs text-misc-white ml-auto block"
          onClick={() => open(<AddBoard />)}
        >
          Add
        </button>
        <div className="grid gap-8 mt-16 grid-cols-200">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </Layout>
  );
}

const Card = () => {
  return (
    <div className="bg-misc-white p-3 rounded-md shadow-lg">
      <div className="bg-cardpics px-20 py-16 rounded-md"></div>
      <p className="mt-2.5 mb-4">Devchallenges Board</p>
      <div className="flex">
        <div className="flex">
          <div className="mr-2">
            <Image
              className="rounded"
              src={profilepic}
              alt="avatar"
              width={25}
              height={25}
            />
          </div>
          <div className="mr-2">
            <Image
              className="rounded"
              src={profilepic}
              alt="avatar"
              width={25}
              height={25}
            />
          </div>
          <div className="mr-2">
            <Image
              className="rounded"
              src={profilepic}
              alt="avatar"
              width={25}
              height={25}
            />
          </div>
        </div>
        <span className="font-noto text-greyish-150 text-xs self-center">
          + 5 others
        </span>
      </div>
    </div>
  );
};
