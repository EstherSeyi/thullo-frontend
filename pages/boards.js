import Link from "next/link";
import { useEffect, useState } from "react";

import AddBoard from "../components/board-actions/add-board";
import MemberAvatar from "../components/member-avatar";

import profilepic from "../public/profilepic.jpeg";

import { useModal } from "../context/modal";
import { useUser } from "../hooks/auth-hook";
import { useAppQuery } from "../hooks/query-hook";

export default function Home() {
  const { open } = useModal();

  const { user } = useUser();

  const { data } = useAppQuery("", {
    url: `boards?_where[members.username_contains]=${user?.username}`,
  });

  console.log(data);

  return (
    <section className="w-11/12 max-w-[1024px] mx-auto mt-8 ">
      <h1 className="text-lg">All Boards</h1>
      <button
        className="px-5 py-1.5 bg-blueish-250 rounded text-xs text-misc-white ml-auto block"
        onClick={() => open(<AddBoard />)}
      >
        Add
      </button>
      {data?.length ? (
        <div className="flex flex-wrap mt-16">
          {data?.map((board) => (
            <Card
              key={board?.id}
              id={board?.id}
              title={board?.title}
              members={board?.members}
            />
          ))}
        </div>
      ) : (
        <p>No boards Yet!</p>
      )}
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
                <MemberAvatar imgSrc={profilepic} key={member.id} />
              ))}
        </div>
        <span className="font-noto text-greyish-150 text-xs self-center">
          {members?.length > 3 ? `+ ${members?.length - 3} others` : ""}
        </span>
      </div>
    </div>
  );
};
