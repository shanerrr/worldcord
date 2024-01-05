"use client";

import { createContext, useEffect, useContext, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type WebSocketContextType = {
  socket: WebSocket | undefined;
  isConnected: boolean;
};

const SocketContext = createContext<WebSocketContextType>({
  socket: undefined,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ws = useRef<WebSocket>();
  const [connected, setConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    /* WS initialization and cleanup */
    ws.current = new WebSocket("ws://172.29.146.185:4000");
    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);
    ws.current.onmessage = (m) => {
      const { type, queryKey, message } = JSON.parse(m.data);
      if (type === "newMessage") {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              pages: [
                {
                  messages: [message],
                },
              ],
            };
          }
          const newData = [...oldData.pages];
          newData[0] = {
            ...newData[0],
            messages: [message, ...newData[0].messages],
          };
          return {
            ...oldData,
            pages: newData,
          };
        });
      }
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket: ws.current, isConnected: connected }}
    >
      {children}
    </SocketContext.Provider>
  );
}
