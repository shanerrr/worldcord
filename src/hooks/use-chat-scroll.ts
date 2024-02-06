"use client";

import { useEffect } from "react";

type ChatScrollProps = {
  messagesDivRef: React.RefObject<HTMLDivElement> | null;
  status: "pending" | "error" | "success";
  hasMoreMessages: boolean;
  fetchMoreMessages: () => void;
};

export default function useChatScroll({
  messagesDivRef,
  status,
  hasMoreMessages,
  fetchMoreMessages,
}: ChatScrollProps) {
  useEffect(() => {
    // TODO: MAYBE ADD DEBOUNCER FOR SCROLL
    const handleScroll = (e: Event) => {
      messagesDivRef?.current?.scrollTop === 0 && hasMoreMessages
        ? fetchMoreMessages()
        : null;
    };

    if (messagesDivRef?.current) {
      messagesDivRef.current.addEventListener("scroll", handleScroll);
      messagesDivRef.current.scrollTo({
        top: messagesDivRef.current.scrollHeight,
      });
    }

    return () => {
      messagesDivRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [status, messagesDivRef?.current]);

  useEffect(() => {
    // TODO: MAYBE ADD DEBOUNCER FOR SCROLL
    const handleScroll = (e: Event) => {
      messagesDivRef?.current?.scrollTop === 0 && hasMoreMessages
        ? fetchMoreMessages()
        : null;
    };

    if (messagesDivRef?.current) {
      messagesDivRef.current.addEventListener("scroll", handleScroll);
      // messagesDivRef.current.scrollTo({
      //   top: messagesDivRef.current.scrollHeight,
      //   behavior: "smooth",
      // });
    }

    return () => {
      messagesDivRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [status, messagesDivRef?.current]);
}
