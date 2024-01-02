"use client";

import { createContext, useEffect, useContext, useRef } from "react";

type WebSocketContextType = {
  subscribe: (channel: string, callback: () => void) => void;
  unsubscribe: () => void;
};

const SocketContext = createContext<WebSocketContextType>({
  subscribe: () => null,
  unsubscribe: () => null,
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ws = useRef<WebSocket>();
  const channels = useRef<Record<string, () => void>>({}); // maps each channel to the callback

  /* called from a component that registers a callback for a channel */
  const subscribe = (channel: string, callback: () => void) => {
    channels.current[channel] = callback;
  };

  /* remove callback  */
  const unsubscribe = (channel: string) => {
    delete channels.current[channel];
  };

  useEffect(() => {
    /* WS initialization and cleanup */
    ws.current = new WebSocket("ws://localhost:4000");
    ws.current.onopen = () => {
      console.log("WS open");
    };
    ws.current.onclose = () => {
      console.log("WS close");
    };
    ws.current.onmessage = (message) => {
      const { type, ...data } = JSON.parse(message.data);
      const chatChannel = `${type}_${data.chat}`;

      // lookup for an existing chat in which this message belongs
      // if no chat is subscribed send message to generic channel
      if (channels.current[chatChannel]) {
        /* in chat component the subscribed channel is `MESSAGE_CREATE_${id}` */
        channels.current[chatChannel](data);
      } else {
        /* in notifications wrapper the subscribed channel is `MESSAGE_CREATE` */
        channels.current[type]?.(data);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={[subscribe, unsubscribe]}>
      {children}
    </SocketContext.Provider>
  );
}
