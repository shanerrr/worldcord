import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@worldcord/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  console.log(queryKey, apiUrl, paramKey, paramValue);

  const fetchMessages = async ({ pageParam = undefined }) => {
    // const url = qs.stringifyUrl(
    //   {
    //     url: apiUrl,
    //     query: {
    //       cursor: pageParam,
    //       [paramKey]: paramValue,
    //     },
    //   },
    //   { skipNull: true }
    // );

    const res = await fetch(
      `${apiUrl}?cursor=${pageParam}&${paramKey}=${paramValue}`
    );
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
