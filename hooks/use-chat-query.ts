import { useInfiniteQuery } from "@tanstack/react-query";

interface ChatQueryProps {
  details: {
    serverId: string;
    channelId: string;
  };
}

export default function useChatQuery({ details }: ChatQueryProps) {
  const fetchMessages = async ({ pageParam = undefined }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${details.serverId}/channels/${details.channelId}/messages?cursor=${pageParam}&batch=15`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    return res.json();
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      staleTime: 3600000,
      queryKey: [`channel:${details.channelId}`],
      queryFn: fetchMessages,
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.cursor,

      // refetchInterval: isConnected ? false : 1000,
    });

  return { data, status, fetchNextPage, hasNextPage, isFetchingNextPage };
}
