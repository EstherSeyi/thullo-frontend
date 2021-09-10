import Link from "next/link";

import AddBoard from "../components/board-actions/add-board";
import MemberAvatar from "../components/member-avatar";

import profilepic from "../public/profilepic.jpeg";

import { useModal } from "../context/modal";

export default function Home() {
  const { open } = useModal();

  return (
    <section className="w-11/12 max-w-[1024px] mx-auto mt-8 ">
      <h1 className="text-lg">All Boards</h1>
      <button
        className="px-5 py-1.5 bg-blueish-250 rounded text-xs text-misc-white ml-auto block"
        onClick={() => open(<AddBoard />)}
      >
        Add
      </button>
      <div className="flex flex-wrap mt-16">
        <Card
          id="1"
          title="Devchallenges Board"
          members={[
            {
              id: "233",
              image: profilepic,
            },
            {
              id: "243",
              image: profilepic,
            },
            {
              id: "223",
              image: profilepic,
            },
            {
              id: "263",
              image: profilepic,
            },
            {
              id: "263",
              image: profilepic,
            },
          ]}
        />
      </div>
    </section>
  );
}

const Card = ({ title, members }) => {
  return (
    <div className="bg-misc-white p-3 rounded-md shadow-lg mr-8 mb-8 w-full max-w-[200px]">
      <div className="bg-cardpics px-20 py-16 rounded-md"></div>
      <Link href={`/boards/${title}`} className="block mt-2.5 mb-4">
        {title}
      </Link>
      <div className="flex">
        <div className="flex">
          {members?.length &&
            members
              ?.slice(0, 3)
              ?.map((member) => (
                <MemberAvatar imgSrc={member.image} key={member.id} />
              ))}
        </div>
        <span className="font-noto text-greyish-150 text-xs self-center">
          {members?.length > 3 ? `+ ${members?.length - 3} others` : ""}
        </span>
      </div>
    </div>
  );
};
