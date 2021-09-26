import { useState, useRef } from "react";
import Image from "next/image";

import MemberAvatar from "../member-avatar";
import Plus from "../icons/plus";
import Search from "../icons/search";

import useClickOutside from "../../hooks/use-click-outside";
import { useAppQuery } from "../../hooks/query-hook";

const BoardMembers = ({ members, sm = true }) => {
  const inviteMemberRef = useRef(null);
  const [invite, setInvite] = useState(false);
  useClickOutside(inviteMemberRef, () => setInvite(false));

  const { data, isLoading } = useAppQuery("all_users", {
    url: "/users",
  });

  const handleUserChoice = (userId) => {
    console.log(userId);
  };

  return (
    <div
      className={`${
        sm ? "flex sm:hidden" : "hidden sm:flex"
      } self-end mx-4 flex-wrap items-center relative`}
    >
      {members?.length &&
        members
          ?.slice(0, 5)
          ?.map((member) => (
            <MemberAvatar
              imgSrc={`https://ui-avatars.com/api/?background=random&name=${member?.username}`}
              key={member.id}
            />
          ))}
      {members?.length && (
        <span className="font-noto text-greyish-150 text-xs self-center">
          {members?.length > 5 ? `+ ${members?.length - 5} others` : ""}
        </span>
      )}
      <div ref={inviteMemberRef}>
        <button
          className="bg-blueish-250 text-misc-white rounded-md p-0.5 mx-2.5 self-start"
          onClick={() => setInvite((prevState) => !prevState)}
        >
          <Plus />
        </button>

        <div
          className={`absolute bg-misc-white top-9 left-11 z-[2] border border-greyish-250 p-2 w-60 rounded-xl shadow-sm flex flex-col ${
            invite ? "" : "hidden"
          }`}
        >
          <p>Invite to Board </p>
          <p className="font-noto text-greyish-100 text-xs mb-4">
            Search users you want to invite to
          </p>
          <form className="flex shadow rounded-lg mb-4">
            <input
              className="w-full py-1 rounded-lg focus:outline-none pl-2 font-light  text-sm"
              placeholder="search user..."
            />
            <button className="bg-blueish-250 px-2 rounded-lg">
              <Search className="text-misc-white h-4 w-4" />
            </button>
          </form>
          <div className="border border-greyish-250 rounded-lg p-3 mb-6 max-h-40 overflow-y-scroll">
            {isLoading ? (
              <p className="flex justify-center items-center text-0.625rem font-light">
                <span>Loading...</span>
              </p>
            ) : data?.length ? (
              data.map((user) => (
                <div
                  className="flex py-2 items-center hover:bg-greyish-50"
                  key={`user_${user?.id}`}
                  onClick={() => handleUserChoice(user?.id)}
                >
                  <div className="rounded-lg mr-4">
                    <Image
                      className="rounded"
                      src={`https://ui-avatars.com/api/?background=random&name=${user?.username}`}
                      alt={user?.username}
                      width={28}
                      height={28}
                    />
                  </div>
                  <p>{user.username}</p>
                </div>
              ))
            ) : (
              <p className="text-0.625rem font-light text-center">
                No other users
              </p>
            )}
          </div>

          <button className="bg-blueish-250 text-misc-white text-0.625rem py-2 px-6 rounded-lg self-center mb-2.5">
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardMembers;
