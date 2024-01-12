import { useInfiniteQuery } from "@tanstack/react-query";
import { MessageApi } from "@worldcord/apis";

import { Message, User, Member } from "@prisma/client";
interface ChatQueryProps {
  details: {
    serverId: string;
    channelId: string;
  };
}

export default function useChatQuery({ details }: ChatQueryProps) {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<{
      messages: Array<Message & { member: Member & { user: User } }>;
      cursor: string | undefined;
    }>({
      staleTime: 3600000,
      queryKey: [`channel:${details.channelId}`],
      queryFn: ({ pageParam = undefined }) =>
        MessageApi.get(
          details.serverId,
          details.channelId,
          pageParam as string | undefined
        ),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.cursor,
    });

  return {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
