import { useInfiniteQuery } from "@tanstack/react-query";
import { MessageApi } from "@worldcord/apis";

interface ChatQueryProps {
  details: {
    serverId: string;
    channelId: string;
  };
}

export default function useChatQuery({ details }: ChatQueryProps) {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      staleTime: 3600000,
      queryKey: [`channel:${details.channelId}`],
      queryFn: ({ pageParam = undefined }) =>
        MessageApi.get(details.serverId, details.channelId, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.cursor,

      // refetchInterval: isConnected ? false : 1000,
    });

  return { data, status, fetchNextPage, hasNextPage, isFetchingNextPage };
}
