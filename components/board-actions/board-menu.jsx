import { useState, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

import Cancel from "../icons/cancel";
import { UserInCircle } from "../icons/user";
import DocText from "../icons/doc-text";
import Pencil from "../icons/pencil";

import MemberAvatar from "../member-avatar";
import MenuDescriptionEditor from "./menu-description-editor";
import MemberRow from "./member-row";

import profilepic from "../../public/profilepic.jpeg";
import useClickOutside from "../../hooks/use-click-outside";
import { useAppQuery, useAppMutation } from "../../hooks/query-hook";
import { formatDate } from "../../helpers/format-date";
import { useUser } from "../../hooks/auth-hook";

const MenuDescStyles = styled.div.attrs({
  className: "text-justify text-sm text-misc-black2 w-11/12 mb-6 font-light",
})`
  p,
  li {
    margin-bottom: 1em;
  }

  ul {
    margin: 1.5em 0;
  }

  strong {
    font-weight: bold;
  }
`;

const BoardMenu = ({ hide, setHideBoard }) => {
  const { query } = useRouter();
  const { user } = useUser();
  const [editDesc, setEditDesc] = useState(false);
  const menuRef = useRef(null);
  const queryClient = useQueryClient();

  useClickOutside(menuRef, () => !hide && setHideBoard(true));

  const { data } = useAppQuery(`board_${query.id}`, {
    url: `/boards/${query.docId}`,
  });

  console.log(data);

  const { mutate, isLoading } = useAppMutation(
    {
      method: "PUT",
      url: `/boards/${query.docId}`,
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(`board_${data?.title}`, {
          refetchInactive: true,
          exact: true,
        });
        await queryClient.invalidateQueries(`boards_${user?.id}`, {
          refetchInactive: true,
          exact: true,
        });
      },
      onSettled: (_, error) => {
        error && console.log(error);
      },
    }
  );

  const handleRemoveUser = (userId) => {
    mutate({
      members: data?.members.filter((member) => member.id !== userId),
    });
  };

  return (
    <div
      className={`absolute top-8 right-0 p-4 left-0 sm:left-1/4 md:left-1/3 lg:left-2/4 bg-misc-white bottom-0 z-10 ${
        hide ? "hidden" : ""
      }`}
      ref={menuRef}
    >
      <div className="flex justify-between border-b border-greyish-250 pb-2 mb-2">
        <p className="text-misc-black font-poppins font-bold">{data?.title}</p>
        <button onClick={() => setHideBoard(true)}>
          <Cancel className="h-5 w-5 text-greyish-200" />
        </button>
      </div>
      <div className="flex text-greyish-150 text-0.625rem items-center mb-2">
        <UserInCircle className="mr-1.5 h-3 w-3" />
        <span>Made by</span>
      </div>

      <div className="flex mb-4">
        <MemberAvatar
          imgSrc={`https://ui-avatars.com/api/?background=random&name=${data?.creator?.username}`}
          alt={`${data?.creator?.username ?? "user"}'s avatar`}
        />
        <div className="text-justify">
          <p className="text-misc-black font-poppins font-bold">
            {data?.creator?.username}
          </p>
          <p className="text-0.625rem text-greyish-150">
            on {formatDate(data?.created_at)}
          </p>
        </div>
      </div>
      <div className="flex text-0.625rem text-greyish-150 items-center font-poppins mb-2">
        <DocText className="h-3 w-3 mr-1" />
        <p className="mr-3">Description</p>
        <button
          className="flex text-greyish-100 border border-greyish-150 py-0.5 px-2 rounded-md"
          onClick={() => setEditDesc(true)}
        >
          <Pencil className="h-3 w-3 mr-2 self-center text-greyish-100" />
          <span>Edit</span>
        </button>
      </div>

      {editDesc ? (
        <MenuDescriptionEditor
          hide={!editDesc}
          setEditDesc={setEditDesc}
          description={data?.description ?? ""}
        />
      ) : (
        <MenuDescStyles
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></MenuDescStyles>
      )}

      <div>
        <div className="flex text-0.625rem text-greyish-150 items-center mb-5">
          <DocText className="h-3 w-3 mr-1" />
          <p>Team</p>
        </div>

        <div className="w-11/12">
          {data?.members?.map((member) => (
            <MemberRow
              key={`member_${member.id}`}
              name={member?.username}
              admin={member?.username === data?.creator?.username}
              imageSrc={`https://ui-avatars.com/api/?background=random&name=${member?.username}`}
              alt={`${member?.username ?? "user"}'s avatar`}
              handleRemoveUser={handleRemoveUser}
              userId={member?.id}
              removeLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardMenu;
