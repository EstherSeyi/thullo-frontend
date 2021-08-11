import Image from "next/image";

import cardpic from "../public/cardpics.jpeg";
import profilepic from "../public/profilepic.jpeg";

import DocText from "./icons/doc-text";
import Pencil from "./icons/pencil";
import Plus from "./icons/plus";
import UserInCircle, { Users } from "./icons/user";
import Photograph from "./icons/photograph";
import MemberAvatar from "./member-avatar";
import Tag from "./icons/tag";

const NewCard = () => {
  return (
    <section className="bg-misc-white mt-10 max-w-2xl mx-auto rounded-lg p-4">
      <Image
        src={cardpic}
        className="rounded-lg mb-4"
        width={450}
        height={100}
        objectFit="fill"
        layout="responsive"
        alt="interior of a lounge"
      />
      <div className="flex mt-4 flex-col sm:flex-row justify-between">
        <div className="flex-70 mr-4">
          <p>✋🏿 Move anything that is actually started here</p>
          <p className="mb-3">in list In Progress</p>
          <div className="flex text-0.625rem text-greyish-150 items-center font-poppins mb-2">
            <DocText className="h-3 w-3 mr-1" />
            <p className="mr-3">Description</p>
            <button className="flex text-greyish-100 border border-greyish-150 py-0.5 px-2 rounded-md">
              <Pencil className="h-3 w-3 mr-2 self-center text-greyish-100" />
              <span>Edit</span>
            </button>
          </div>
          <div className="font-light text-sm text-[#000000] mb-4">
            <p>
              Ideas are created and share here through a card. Here you can
              describe what you'd like to accomplish. For example you can follow
              three simple questions to create the card related to your idea:
            </p>
            <ul>
              <li>* Why ? (Why do you wish to do it ?)</li>
              <li>
                * What ? (What it is it, what are the goals, who is concerned){" "}
              </li>
              <li>
                * How ? (How do you think you can do it ? What are the required
                steps ?)
              </li>
            </ul>
            <p>After creation, you can move your card to the todo list.</p>
          </div>
          <div className="flex text-0.625rem text-greyish-150 items-center font-poppins mb-2">
            <DocText className="h-3 w-3 mr-1" />
            <p className="mr-3">Attachments</p>
            <button className="flex text-greyish-100 border border-greyish-150 py-0.5 px-2 rounded-md">
              <Plus className="h-3 w-3 mr-2 self-center text-greyish-100" />
              <span>Add</span>
            </button>
          </div>

          <div className="mb-12">
            <AttachmentCard
              attachment={{
                date: "July 5, 2020",
                name: "Gatsby-config.js",
              }}
            />
          </div>

          <form className="flex flex-col border border-greyish-250 px-3 py-2  rounded-lg shadow mb-6">
            <div className="flex">
              <MemberAvatar imgSrc={profilepic} />
              <textarea
                rows={3}
                className="text-sm font-noto placeholder-greyish-150 text-[#000000] w-full focus:outline-none"
                placeholder="Write a comment..."
              ></textarea>
            </div>
            <button className="bg-blueish-250 text-misc-white font-noto text-0.625rem rounded-lg px-2 py-1 self-end">
              comment
            </button>
          </form>

          <div>
            <Comment
              comment={{
                name: "Mikael Stanley",
                date: "24 August at 20:43 ",
                message:
                  "“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton",
                user: {
                  imageSrc: profilepic,
                },
              }}
            />
          </div>
        </div>
        <div className="">
          <div className="flex items-center text-greyish-150 mb-2.5">
            <UserInCircle className="h-3 w-3 mr-1" />
            <p className="text-0.625rem">Actions</p>
          </div>

          <div className="text-xs text-greyish-100 font-light flex sm:flex-col">
            <SideButton Component={Photograph} text="cover" />
            <SideButton Component={Tag} text="labels" />
            <SideButton Component={Users} text="members" />
          </div>
        </div>
      </div>
    </section>
  );
};

const AttachmentCard = ({ attachment }) => {
  return (
    <div className="flex mb-3">
      <div className="flex-30 max-w-[80px] bg-greyish-250 mr-4 rounded-lg flex justify-center items-center">
        <p>GA</p>
      </div>
      <div>
        <p className="text-[0.5rem] text-greyish-150">
          Added {attachment?.date}
        </p>
        <p className="text-0.625rem mb-1">{attachment?.name}</p>
        <div className="flex text-0.625rem">
          <button className="flex text-greyish-100 border border-greyish-150 py-0.5 px-2 rounded-md mr-3">
            Download
          </button>
          <button className="flex text-greyish-100 border border-greyish-150 py-0.5 px-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="text-0.625rem font-noto mb-5">
      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <MemberAvatar imgSrc={comment?.user?.imageSrc} />
          <div>
            <p className="text-xs font-poppins">{comment?.name}</p>
            <p className="text-greyish-150">{comment?.date}</p>
          </div>
        </div>
        <div className="text-greyish-100">
          <button>Edit</button>
          <span className="mx-1">-</span>
          <button>Delete</button>
        </div>
      </div>
      <p className="text-sm text-greyish-200">{comment?.message}</p>
    </div>
  );
};

const SideButton = ({ Component, text }) => {
  return (
    <button className="flex items-center capitalize bg-greyish-50 mb-2 py-1  px-2 rounded-lg mr-1.5 sm:mr-0">
      <Component className="mr-1 h-3 w-3" />
      <span>{text}</span>
    </button>
  );
};

export default NewCard;
