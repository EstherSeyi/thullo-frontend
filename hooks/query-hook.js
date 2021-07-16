import { useQuery, useMutation, useInfiniteQuery } from "react-query";
import axios from "axios";
import queryString from "query-string";

import request from "../helpers/request";

/**
 * @returns {Object} axios response
 * @param {axiosOptions} axiosOptions - axios options including url
 */
const fetch = async (axiosOptions = {}) => {
  const source = axios.CancelToken.source();

  const { data } = await request({
    method: "GET",
    cancelToken: source.token,
    ...axiosOptions,
  });

  data.cancel = () => {
    source.cancel("Request was cancelled");
  };

  return data;
};

/**
 * @returns {Object} axios response
 * @param {axiosOptions} axiosOptions - axios options including url
 * @param {requestBody} requestBody - request body for mutation
 */
const appMutate = async (axiosOptions = {}, requestBody) => {
  const { data } = await request({
    method: "POST",
    data: requestBody,
    ...axiosOptions,
  });

  return data;
};

/**
 * @returns {Object} useQuery object
 * @param {queryKeyPrefix}  queryKeyPrefix - unique string value
 * @param {axiosOptions} axiosOptions - axios options including url
 * @param {queryOptions} queryOptions - react-query options e.g staleTime to override default staleTime for this request.
 */
export const useAppQuery = (
  queryKeyPrefix = "",
  axiosOptions,
  queryOptions = {}
) => {
  const { data, error, isLoading, isFetched } = useQuery(
    [`${queryKeyPrefix}`],
    () => fetch(axiosOptions),
    {
      ...queryOptions,
    }
  );

  return { data, error, isLoading, isFetched };
};

/**
 * @returns {Object} useInfiniteScrolling response
 * @param {queryKey}  queryKey - unique string value
 * @param {axiosOptions} axiosOptions - axios options including url
 * @param {queryOptions} queryOptions - react-query options e.g staleTime to override default staleTime for this request.
 * @param {splitter} splitter - string to split url by.
 */
export const useInfiniteScrolling = (
  queryKey,
  axiosOptions = {},
  queryOptions = {},
  splitter = "?"
) => {
  const { ...rest } = useInfiniteQuery(
    queryKey,
    (pageParams) => {
      const { pageParam } = pageParams;
      if (!pageParam) {
        return fetch(axiosOptions);
      }

      const [url] = axiosOptions.url.split(splitter);
      const urlParams = queryString.stringify(pageParam);
      const newAxiosOptions = {
        ...axiosOptions,
        url: url + splitter + urlParams,
      };
      return fetch(newAxiosOptions);
    },
    {
      getNextPageParam: (lastPage) => {
        const { limit, offset, total } = lastPage;
        if (Number(offset) > total) {
          return false;
        }
        return {
          limit,
          offset: Number(offset) + Number(limit),
        };
      },
      refetchOnWindowFocus: false,
      ...queryOptions,
    }
  );

  return rest;
};

/**
 * @returns {Object} useMutation object
 * @param  {axiosOptions} axiosOptions - axios options options e.g url, method, data.
 * @param  {queryOptions} queryOptions - react-query options e.g staleTime to override default staleTime for this request.
 */
export const useAppMutation = (axiosOptions = {}, queryOptions = {}) => {
  return useMutation((requestBody) => appMutate(axiosOptions, requestBody), {
    ...queryOptions,
  });
};
