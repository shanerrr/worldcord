import { useInfiniteQuery } from "@tanstack/react-query";

// import { useSocket } from "@worldcord/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  serverId: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  serverId,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  // const { isConnected } = useSocket();

  console.log(queryKey, apiUrl, paramKey, paramValue);

  const fetchMessages = async ({ pageParam = undefined }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${serverId}/channels/${paramValue}/messages?cursor=${pageParam}&${paramKey}=${paramValue}&batch=10`
    );

    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.cursor,
      // refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
