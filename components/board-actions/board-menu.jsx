import { useState, useRef } from "react";
import styled from "styled-components";

import Cancel from "../icons/cancel";
import { UserInCircle } from "../icons/user";
import DocText from "../icons/doc-text";
import Pencil from "../icons/pencil";

import MemberAvatar from "../member-avatar";
import MenuDescriptionEditor from "./menu-description-editor";
import MemberRow from "./member-row";

import profilepic from "../../public/profilepic.jpeg";
import useClickOutside from "../../hooks/use-click-outside";

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
  const [editDesc, setEditDesc] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => !hide && setHideBoard(true));

  return (
    <div
      className={`absolute top-8 right-0 p-4 left-0 sm:left-1/4 md:left-1/3 lg:left-2/4 bg-misc-white bottom-0 z-10 ${
        hide ? "hidden" : ""
      }`}
      ref={menuRef}
    >
      <div className="flex justify-between border-b border-greyish-250 pb-2 mb-2">
        <p className="text-misc-black font-poppins font-bold">
          Devchallenges Board
        </p>
        <button onClick={() => setHideBoard(true)}>
          <Cancel className="h-5 w-5 text-greyish-200" />
        </button>
      </div>
      <div className="flex text-greyish-150 text-0.625rem items-center mb-2">
        <UserInCircle className="mr-1.5 h-3 w-3" />
        <span>Made by</span>
      </div>

      <div className="flex mb-4">
        <MemberAvatar imgSrc={profilepic} />
        <div className="text-justify">
          <p className="text-misc-black font-poppins font-bold">
            Daniel Jensen
          </p>
          <p className="text-0.625rem text-greyish-150">on 4 July, 2020</p>
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
        <MenuDescriptionEditor hide={!editDesc} setEditDesc={setEditDesc} />
      ) : (
        <MenuDescStyles>
          <p>Simple board to start on a project.</p>

          <p>Each list can hold items (cards) that represent ideas or tasks.</p>

          <p>There 4 lists here:</p>

          <ul>
            <li>
              {" "}
              <strong>Backlog</strong> 🤔 : Ideas are created here. Here people
              can describe the idea following three simple questions: Why you
              wish to do it, What it is, how can you do it.
            </li>

            <li>
              {" "}
              <strong>In Progress</strong>📚: Once the ideas is clearly defined,
              the task can move to #todo stage. Here the owner of the idea can
              move to #doing once s/he is ready. He can also wait a bit for
              other members to join.
            </li>
            <li>
              {" "}
              <strong>In Review</strong> ⚙️: On-going
            </li>
            <li>
              {" "}
              <strong>Completed</strong> 🙌🏽**: Finished
            </li>
          </ul>
        </MenuDescStyles>
      )}

      <div>
        <div className="flex text-0.625rem text-greyish-150 items-center mb-5">
          <DocText className="h-3 w-3 mr-1" />
          <p>Team</p>
        </div>

        <div className="w-11/12">
          <MemberRow name="Daniel Jensen" admin={true} imageSrc={profilepic} />
          <MemberRow name="Bianca Sosa" admin={false} imageSrc={profilepic} />
          <MemberRow name="Waqar Bloom" admin={false} imageSrc={profilepic} />
        </div>
      </div>
    </div>
  );
};

export default BoardMenu;
