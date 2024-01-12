"use client";

import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useContext, createContext, useEffect } from "react";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const AgoraContext = createContext<{
  client: IAgoraRTCClient;
}>({
  client: client,
});

export const useAgora = () => useContext(AgoraContext);

export default function AgoraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgoraContext.Provider value={{ client }}>{children}</AgoraContext.Provider>
  );
}
