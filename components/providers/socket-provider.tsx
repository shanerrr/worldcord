"use client";

import { createContext, useEffect, useContext, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { MessageWithMemberWithProfile } from "@worldcord/types";

const SocketContext = createContext<{
  socket: WebSocket | undefined;
  // isConnected: boolean;
}>({
  socket: undefined,
  // isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  serverId,
  children,
}: {
  serverId: string;
  children: React.ReactNode;
}) {
  const ws = useRef<WebSocket>();
  // const [connected, setConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    /* WS initialization and cleanup */
    ws.current = new WebSocket(
      `ws:/172.28.52.85:4000/api/websocket?server=${serverId}`
    );
    // ws.current.onopen = () => setConnected(true);
    // ws.current.onclose = () => setConnected(false);
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
      } else if (type === "deleteMessage") {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0)
            return oldData;
          const newData = oldData.pages.map((page: any) => {
            return {
              ...page,
              messages: page.messages.filter(
                (item: MessageWithMemberWithProfile) => item.id !== message.id
              ),
            };
          });

          return {
            ...oldData,
            pages: newData,
          };
        });
      } else if (type === "updateMessage") {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0)
            return oldData;
          const newData = oldData.pages.map((page: any) => {
            return {
              ...page,
              messages: page.messages.map(
                (item: MessageWithMemberWithProfile) => {
                  if (item.id === message.id)
                    return {
                      ...item,
                      content: message.content,
                      updatedAt: message.updatedAt,
                    };
                  return item;
                }
              ),
            };
          });

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
    <SocketContext.Provider value={{ socket: ws.current }}>
      {children}
    </SocketContext.Provider>
  );
}
