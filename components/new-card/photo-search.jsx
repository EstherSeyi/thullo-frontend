import { useState, Fragment } from "react";
import Image from "next/image";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import queryString from "query-string";

import Search from "../icons/search";

export const useUnspalshInfinite = (
  queryKey,
  axiosOptions = {},
  queryOptions = {},
  searchQuery
) => {
  const search = searchQuery ? `&query=${searchQuery}` : "";
  const data = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) =>
      axios.get(`${axiosOptions.url}&page=${pageParam}${search}`),
    {
      getNextPageParam: (lastPage) => {
        const urls = lastPage?.headers?.link?.split(",");

        const params = urls[urls?.length - 1]
          .replace("<", "")
          .replace(">", "")
          .split(";")[0]
          .split("&")[1];

        const parsed = queryString.parse(`?${params}`);

        return parsed?.page;
      },
      ...queryOptions,
    }
  );

  return data;
};

const PhotoSearch = ({ openCover, coverRef }) => {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUnspalshInfinite("unsplash_images", {
      url: `${process.env.NEXT_PUBLIC_UNSPLASH_API}/photos/?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
    });
  const {
    data: seachedData,
    hasNextPage: seachedDataHasNextPage,
    fetchNextPage: seachedDataFetchNextPage,
    isFetchingNextPage: seachedDataIsFetchingNextPage,
  } = useUnspalshInfinite(
    `searched_images_${searchQuery}`,
    {
      url: `${process.env.NEXT_PUBLIC_UNSPLASH_API}/search/photos/?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
    },
    {
      enabled: searchQuery?.length >= 3,
    },
    searchQuery
  );

  const handleSelectcover = (selected) => {
    console.log(selected);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(value);
  };

  return (
    <div
      ref={coverRef}
      className={`${
        !openCover
          ? "hidden"
          : "absolute bg-misc-white  bottom-4 sm:bottom-[-248px] sm:-left-24 z-[8] border border-greyish-250 p-2 w-60 rounded-xl shadow-sm flex flex-col"
      }`}
    >
      <p className="text-greyish-200 font-bold mb-1">Photo Search</p>
      <p className="font-noto text-greyish-100 text-xs mb-4">
        Search Unsplash for photos
      </p>
      <form className="flex shadow rounded-lg mb-4" onSubmit={handleSearch}>
        <input
          placeholder="user..."
          className="w-full py-1 rounded-lg focus:outline-none pl-2"
          onChange={({ target }) => {
            setValue(target.value);
          }}
          value={value}
          name="search-value"
        />
        <button type="submit" className="bg-blueish-250 px-2 rounded-lg">
          <Search className="text-misc-white h-4 w-4" />
        </button>
      </form>
      <div
        className="h-[150px] overflow-y-scroll"
        id="unsplash-image-thumbnails"
      >
        {searchQuery && searchQuery?.length && seachedData?.pages?.length ? (
          <InfiniteScroll
            dataLength={seachedData?.pages?.length}
            hasMore={seachedDataHasNextPage}
            loader={
              seachedDataIsFetchingNextPage ? (
                <p className="text-center italic">Loading...</p>
              ) : null
            }
            next={seachedDataFetchNextPage}
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
            <div className="grid grid-cols-4 gap-1.5">
              {seachedData?.pages?.map((page, index) => (
                <Fragment key={`pages-${index}`}>
                  {page?.data?.results?.map(
                    ({ alt_description, urls, id, user }) => (
                      <Image
                        onClick={() =>
                          handleSelectcover({ alt_description, urls, id, user })
                        }
                        key={id}
                        className="rounded"
                        src={urls?.thumb}
                        alt={alt_description}
                        width={64}
                        height={64}
                      />
                    )
                  )}
                </Fragment>
              ))}
            </div>
          </InfiniteScroll>
        ) : searchQuery?.length >= 3 && !seachedData?.pages?.length ? (
          <p>No data...</p>
        ) : data?.pages?.length ? (
          <InfiniteScroll
            dataLength={data?.pages?.length}
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
            <div className="grid grid-cols-4 gap-1.5">
              {data?.pages?.map((page, index) => (
                <Fragment key={`pages-${index}`}>
                  {page?.data?.map(({ alt_description, urls, id, user }) => (
                    <Image
                      onClick={() =>
                        handleSelectcover({ alt_description, urls, id, user })
                      }
                      key={id}
                      className="rounded"
                      src={urls?.thumb}
                      alt={alt_description}
                      width={64}
                      height={64}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
          </InfiniteScroll>
        ) : null}
      </div>
    </div>
  );
};

export default PhotoSearch;
