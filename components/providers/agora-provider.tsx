"use client";

import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";

export default function AgoraProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Agora Client
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return <AgoraRTCProvider client={agoraClient}>{children}</AgoraRTCProvider>;
}
