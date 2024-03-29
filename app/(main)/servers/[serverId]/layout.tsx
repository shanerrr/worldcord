import type { Metadata } from "next";
import { redirect } from "next/navigation";

import ServerMain from "@worldcord/components/server/server-main";
import SocketProvider from "@worldcord/components/providers/socket-provider";
import AgoraProvider from "@worldcord/components/providers/agora-provider";

import { UserAPI, MemberAPI, ServerAPI } from "@worldcord/apis";

export const metadata: Metadata = {
  title: "WorldCord",
  description: "Explore what others are doing around the world!",
};

export default async function ServerLayout({
  params,
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  const { user } = await UserAPI.findOrCreate();

  const [_, { server }] = await Promise.all([
    MemberAPI.findOrCreate(params.serverId, user.id),
    ServerAPI.get(params.serverId),
  ]);

  if (!server) return redirect("/");

  return (
    <main className="h-full flex flex-col">
      <SocketProvider serverId={params.serverId}>
        <ServerMain server={server} user={user}>
          <AgoraProvider>{children}</AgoraProvider>
        </ServerMain>
      </SocketProvider>
    </main>
  );
}
