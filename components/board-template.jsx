import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "react-query";
import queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";

import MemberAvatar from "../components/member-avatar";

import coverpic from "../public/cardpics.jpeg";
import request from "../helpers/request";
import { Fragment } from "react";

const BoardTemplate = ({ count, dataQueryKey = "", queryUrl, text = "" }) => {
  const {
    data: infinitData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    dataQueryKey,
    ({ pageParam = 0 }) => {
      return request.get(`${queryUrl}&_start=${pageParam}`);
    },
    {
      getNextPageParam: (lastPage) => {
        let parsed = queryString.parse(lastPage.config.url);
        if (Number(parsed._start) > count) {
          return false;
        }

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
    <section>
      <h3 className="mt-4">{text}</h3>
      <div className="w-full h-full overflow-hidden">
        <div
          className="w-full box-content pr-[17px] h-[600px] overflow-y-scroll mb-8"
          id="unsplash-image-thumbnails"
        >
          <div className="w-full box-content pr-[17px] overflow-y-scroll">
            {infinitData?.pages?.length &&
            infinitData?.pages[0]?.data?.length ? (
              <InfiniteScroll
                dataLength={infinitData?.pages?.length}
                hasMore={hasNextPage}
                loader={
                  isFetchingNextPage ? (
                    <p className="text-center italic mt-4">Loading...</p>
                  ) : null
                }
                next={fetchNextPage}
                scrollableTarget="unsplash-image-thumbnails"
                endMessage={
                  <p className="text-center font-light my-4 text-sm italic">
                    You have seen it all!
                  </p>
                }
              >
                <div
                  className={`mt-10 grid ${
                    infinitData?.pages[0]?.data?.length >= 1 &&
                    infinitData?.pages[0]?.data?.length < 4
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
                            board?.cover_photo?.formats?.small?.url ?? coverpic
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
        </div>
      </div>
    </section>
  );
};

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

export default BoardTemplate;
