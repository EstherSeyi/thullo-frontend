import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "react-query";
import queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";

import AddBoard from "../components/board-actions/add-board";
import MemberAvatar from "../components/member-avatar";

import coverpic from "../public/cardpics.jpeg";

import { useModal } from "../context/modal";
import { useUser } from "../hooks/auth-hook";
import request from "../helpers/request";
import { Fragment } from "react";

export default function Home() {
  const { open } = useModal();

  const { user } = useUser();

  const {
    data: infinitData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    `boards_${user?.id}`,
    ({ pageParam = 0 }) => {
      return request.get(
        `/boards?_where[members.username_contains]=${user?.username}&_limit=8&_start=${pageParam}`
      );
    },
    {
      getNextPageParam: (lastPage) => {
        let parsed = queryString.parse(lastPage.config.url);

        parsed._start = Number(parsed._start) + 8;
        return parsed._start;
      },
      getPreviousPageParam: (lastPage) => {
        let parsed = queryString.parse(lastPage.config.url);
        parsed._start =
          Number(parsed._start) > 0 ? Number(parsed._start) - 8 : 0;

        return parsed._start;
      },
    }
  );

  return (
    <section className="w-11/12 max-w-[1024px] mx-auto mt-8 ">
      <h1 className="text-lg">All Boards</h1>
      <button
        className="px-5 py-1.5 bg-blueish-250 rounded text-xs text-misc-white ml-auto block"
        onClick={() => open(<AddBoard />)}
      >
        Add
      </button>
      <div className="h-main overflow-y-scroll" id="unsplash-image-thumbnails">
        {infinitData?.pages?.length ? (
          <InfiniteScroll
            dataLength={infinitData?.pages?.length}
            hasMore={hasNextPage}
            loader={
              isFetchingNextPage ? (
                <p className="text-center italic">Loading...</p>
              ) : null
            }
            next={fetchNextPage}
            scrollableTarget="unsplash-image-thumbnails"
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  marginTop: "1em",
                  fontWeight: "bold",
                }}
              >
                You have seen it all!
              </p>
            }
          >
            <div
              className={`mt-16 grid ${
                infinitData?.pages[0]?.data?.length > 1 &&
                infinitData?.pages[0]?.data?.length < 3
                  ? "grid-cols-automax"
                  : "grid-cols-200"
              }  gap-4
  `}
            >
              {infinitData?.pages?.map((page, index) => (
                <Fragment key={`board-pages-${index}`}>
                  {page?.data?.map((board) => (
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
                </Fragment>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <p className="text-sm font-noto font-thin text-center mt-20 text-greyish-100">
            No boards Yet? Click the "Add" button to create one!
          </p>
        )}
      </div>
    </section>
  );
}

const Card = ({ title, members, cover_image, id }) => {
  return (
    <div className="bg-misc-white p-3 rounded-md shadow-lg w-full xs:w-11/12 sm:w-full mx-auto sm:max-w-[250px]">
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
      <Link href={`/boards/${title}?docId=${id}`}>
        <p className="block mt-4 mb-4 truncate cursor-pointer">{title}</p>
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
