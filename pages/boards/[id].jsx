import { useState, useRef } from "react";

import profilepic from "../../public/profilepic.jpeg";
import cardpic from "../../public/cardpics.jpeg";
import useClickOutside from "../../hooks/use-click-outside";

import MemberAvatar from "../../components/member-avatar";
import { LockClosed } from "../../components/icons/lock";
import TaskList from "../../components/task-list";
import BoardMenu from "../../components/board-menu";
import AddAnother from "../../components/add-another";
import Globe from "../../components/icons/globe";
import DotsHorizontal from "../../components/icons/dots-horizontal";
import Plus from "../../components/icons/plus";
import Search from "../../components/icons/search";

const Board = () => {
  const [hideVisibility, setHideVisibility] = useState(true);
  const [hideBoard, setHideBoard] = useState(true);
  return (
    <section className="w-11/12 mx-auto h-full">
      <div className="flex justify-between mt-8 mb-4 flex-wrap items-center">
        <div className="flex ">
          <button
            className="mb-2 sm:mb-0 ml-4 text-greyish-100 bg-greyish-50 px-3 py-1 rounded-lg font-noto font-light flex text-xs mr-4 relative"
            type="button"
            onClick={() => setHideVisibility(!hideVisibility)}
          >
            <LockClosed />
            <p className="self-center ml-2 ">Private</p>
            <VisibilityOptions
              hide={hideVisibility}
              setHideVisibility={setHideVisibility}
            />
          </button>

          <BoardMembers
            members={[
              {
                image: profilepic,
                id: "0090",
              },
            ]}
            sm={false}
          />
        </div>

        <div
          className="ml-4 text-greyish-100 bg-greyish-50 px-3 py-1 rounded-lg font-noto font-light flex text-xs mr-4"
          role="button"
          onClick={() => setHideBoard(!setHideBoard)}
        >
          <DotsHorizontal className="text-greyish-100 h-3 w-3 self-center" />
          <p className="self-center ml-2 ">Show Menu</p>
        </div>
        <BoardMenu hide={hideBoard} setHideBoard={setHideBoard} />
      </div>

      <BoardMembers
        members={[
          {
            image: profilepic,
            id: "0090",
          },
        ]}
      />

      <div className="h-full bg-blueish-50 rounded-3xl pt-7 px-4 pb-2">
        <div className="h-full flex max-w-full overflow-x-scroll">
          <TaskList
            list={{
              name: "Todos",
              cards: [
                {
                  title: "✋🏿 Add what you'd like to work on below",
                  attachments: [],
                  comments: [1, 2, 3, 4],
                  tags: [
                    {
                      id: "001",
                      name: "technical",
                    },
                  ],
                },
                {
                  imageSrc: cardpic,
                  title: "Github jobs challenge",
                  attachments: [1, 2],
                  comments: [1, 2, 3, 4],
                  tags: [
                    {
                      id: "001",
                      name: "technical",
                    },
                  ],
                },
              ],
            }}
          />

          <AddAnother text="Add another list" classes="min-w-[250px] h-8" />
        </div>
      </div>
    </section>
  );
};

const VisibilityOptions = ({ hide = true, setHideVisibility }) => {
  const visibilityRef = useRef(null);

  useClickOutside(visibilityRef, () => setHideVisibility(true));

  return (
    <div
      ref={visibilityRef}
      className={`absolute bg-misc-white border border-greyish-250 shadow rounded-lg left-0 -right-36 top-11 text-xs text-justify p-2.5 text-greyish-100 z-[2] ${
        hide ? "hidden" : ""
      }`}
    >
      <p className="text-greyish-200 font-bold mb-1">Visibility</p>
      <p className="mb-4">Choose who can see to this board.</p>
      <ul>
        <li className="my-4 p-2 rounded-md hover:bg-greyish-50">
          <div className="flex mb-2 text-greyish-200">
            <Globe className="h-3 w-3 mr-2" />
            <p>Public</p>
          </div>
          <p>Anyone on the internet can see this.</p>
        </li>
        <li className="my-4 p-2 rounded-md hover:bg-greyish-50">
          <div className="flex mb-2 text-greyish-200">
            <LockClosed />
            <p className="ml-2">Private </p>
          </div>
          <p>Only board members can see this.</p>
        </li>
      </ul>
    </div>
  );
};

const BoardMembers = ({ members, sm = true }) => {
  const inviteMemberRef = useRef(null);
  const [invite, setInvite] = useState(false);
  useClickOutside(inviteMemberRef, () => setInvite(false));

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
            <MemberAvatar imgSrc={member.image} key={member.id} />
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
            <input className="w-full py-1 rounded-lg focus:outline-none pl-2" />
            <button className="bg-blueish-250 px-2 rounded-lg">
              <Search className="text-misc-white h-4 w-4" />
            </button>
          </form>
          <div className="border border-greyish-250 rounded-lg p-3 mb-6 max-h-40 overflow-y-scroll">
            <div className="flex py-2 items-center">
              <p className="bg-greyish-150 p-1.5 rounded-lg text-misc-white mr-4">
                MC
              </p>
              <p>Morris Croft</p>
            </div>
            <div className="flex py-2 items-center">
              <p className="bg-greyish-150 p-1.5 rounded-lg text-misc-white mr-4">
                KH
              </p>
              <p>Kunal Hough</p>
            </div>
            <div className="flex py-2 items-center">
              <p className="bg-greyish-150 p-1.5 rounded-lg text-misc-white mr-4">
                KS
              </p>
              <p>Kierran Salinas</p>
            </div>
          </div>

          <button className="bg-blueish-250 text-misc-white text-0.625rem py-2 px-6 rounded-lg self-center mb-2.5">
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
