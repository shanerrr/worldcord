"use client";

import { Fragment, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";

import ChatWelcome from "./chat-welcome";
import ChatItem from "./chat-item";

import useChatQuery from "@worldcord/hooks/use-chat-query";
import useChatScroll from "@worldcord/hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  name: string;
  type: "channel" | "conversation";
  details: {
    serverId: string;
    channelId: string;
  };
  member: Member;
}

export default function ChatMessages({
  name,
  type,
  details,
  member,
}: ChatMessagesProps) {
  const messagesDivRef = useRef<HTMLDivElement | null>(null);

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatQuery({ details });

  useChatScroll({
    messagesDivRef,
    hasMoreMessages: !isFetchingNextPage || hasNextPage,
    fetchMoreMessages: fetchNextPage,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div ref={messagesDivRef} className="flex-1 flex flex-col overflow-y-auto">
      {!hasNextPage && <ChatWelcome type={type} name={name} />}

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.messages.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                // fileUrl={message.fileUrl}
                // deleted={message.deleted}
                fileUrl={null}
                deleted={false}
                timestamp={formatDistanceToNow(new Date(message.createdAt))}
                isUpdated={message.updatedAt !== message.createdAt}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
