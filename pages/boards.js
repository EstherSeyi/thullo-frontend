import Link from "next/link";
import Image from "next/image";

import AddBoard from "../components/board-actions/add-board";
import MemberAvatar from "../components/member-avatar";

import coverpic from "../public/cardpics.jpeg";

import { useModal } from "../context/modal";
import { useUser } from "../hooks/auth-hook";
import { useAppQuery } from "../hooks/query-hook";

export default function Home() {
  const { open } = useModal();

  const { user } = useUser();

  const { data } = useAppQuery(`boards_${user?.id}`, {
    url: `/boards?_where[members.username_contains]=${user?.username}`,
  });

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
              cover_image={
                board?.cover_photo?.formats?.small?.url
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${board?.cover_photo?.formats?.small?.url}`
                  : coverpic
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-sm font-noto font-thin text-center mt-20 text-greyish-100">
          No boards Yet? Click the "Add" button to create one!
        </p>
      )}
    </section>
  );
}

const Card = ({ title, members, cover_image }) => {
  return (
    <div className="bg-misc-white p-3 rounded-md shadow-lg mr-8 mb-8 w-full max-w-[200px]">
      <div className="rounded-md w-full">
        <Image
          className="rounded"
          src={cover_image}
          alt="avatar"
          width={450}
          height={300}
          objectFit="fill"
          layout="responsive"
        />
      </div>
      <Link href={`/boards/${title}`} className="block mt-2.5 mb-4">
        {title}
      </Link>
      <div className="flex">
        <div className="flex">
          {members?.length &&
            members
              ?.slice(0, 3)
              ?.map((member) => (
                <MemberAvatar
                  imgSrc={`https://ui-avatars.com/api/?background=random&name=${member.username}`}
                  key={member.id}
                />
              ))}
        </div>
        <span className="font-noto text-greyish-150 text-xs self-center">
          {members?.length > 3 ? `+ ${members?.length - 3} others` : ""}
        </span>
      </div>
    </div>
  );
};
