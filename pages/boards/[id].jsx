import profilepic from "../../public/profilepic.jpeg";
import cardpic from "../../public/cardpics.jpeg";

import MemberAvatar from "../../components/member-avatar";
import { LockClosed } from "../../components/icons/lock";
import TaskList from "../../components/task-list";
import AddAnother from "../../components/add-another";

const Board = () => {
  return (
    <section className="w-11/12 mx-auto h-full">
      <div className="flex justify-between mt-8 mb-4">
        <div className="flex ">
          <button className="ml-4 text-greyish-100 bg-greyish-50 px-3 py-1 rounded-lg font-noto font-light flex text-xs mr-4">
            <LockClosed />
            <p className="self-center ml-2 ">Private</p>
          </button>
          <div className="self-end">
            <MemberAvatar imgSrc={profilepic} />
          </div>
        </div>
      </div>

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

export default Board;
