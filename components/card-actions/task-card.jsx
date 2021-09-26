import Image from "next/image";

import Pencil from "../icons/pencil";
import PaperClip from "../icons/paper-clip";
import Chat from "../icons/chat";
import Tag from "../tag";

import EditCard from "../card-actions/index";

import { useModal } from "../../context/modal";

const TaskCard = ({ card }) => {
  const { open } = useModal();
  return (
    <div className="font-noto p-2 bg-misc-white rounded-lg shadow-md mb-4 w-[272px]">
      {card?.imageSrc ? (
        <Image
          src={card.imageSrc}
          className="rounded"
          width={450}
          height={250}
          objectFit="fill"
          layout="responsive"
          alt="interior of a lounge"
        />
      ) : null}

      <p className="mb-3">{card.title}</p>
      {card?.tags
        ? card?.tags?.map((tag) => <Tag key={tag.id} name={tag.name} />)
        : null}
      <div className="mt-6 flex justify-between">
        <button
          className="bg-blueish-250 text-misc-white rounded-md p-0.5"
          onClick={() => open(<EditCard cardID={card?.id} />)}
        >
          <Pencil />
        </button>
        {card?.attachments.length || card?.comments?.length ? (
          <div className="flex text-greyish-150 text-0.625rem font-noto">
            {card?.attachments?.length ? (
              <div className="flex items-center">
                <PaperClip className="h-3 w-3 mr-0.5" />
                <span>{card?.attachments?.length}</span>
              </div>
            ) : null}
            {card?.comments?.length ? (
              <div className="flex items-center ml-2.5">
                <Chat className="h-3 w-3 mr-0.5" />
                <span>{card?.comments?.length}</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskCard;
