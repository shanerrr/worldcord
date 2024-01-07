import { redirect } from "next/navigation";
import { UserAPI, MemberAPI, ServerAPI } from "@worldcord/apis";

import ServerMain from "@worldcord/components/server/server-main";
import SocketProvider from "@worldcord/components/providers/socket-provider";

export default async function MainLayout({
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
      <ServerMain server={server} user={user}>
        <SocketProvider serverId={params.serverId}>{children}</SocketProvider>
      </ServerMain>
    </main>
  );
}
