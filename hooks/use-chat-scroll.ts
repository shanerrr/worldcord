"use client";

import { useEffect } from "react";

type ChatScrollProps = {
  messagesDivRef: React.RefObject<HTMLDivElement> | null;
  hasMoreMessages: boolean;
  fetchMoreMessages: () => void;
};

export default function useChatScroll({
  messagesDivRef,
  hasMoreMessages,
  fetchMoreMessages,
}: ChatScrollProps) {
  useEffect(() => {
    console.log('hehe')
    const handleScroll = (e: Event) => {
      messagesDivRef?.current?.scrollTop === 0 && hasMoreMessages
        ? fetchMoreMessages()
        : null;
    };

    if (messagesDivRef?.current)
      messagesDivRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      messagesDivRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [messagesDivRef?.current]);

  // useEffect(() => {
  //   messagesDivRef?.current?.scroll({
  //     top: messagesDivRef?.current.scrollHeight,
  //     behavior: "smooth",
  //   });
  // }, []);
}
