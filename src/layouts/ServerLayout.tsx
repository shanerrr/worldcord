import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { ServerAPI } from "@worldcord/apis";

import ServerSidebar from "@worldcord/components/Server/ServerSidebar";

import { ServerWithChannelsWithMembersWithProfiles } from "@worldcord/types";

export default function ServerLayout() {
  const server = useLoaderData() as ServerWithChannelsWithMembersWithProfiles;

  return (
    <main className="h-screen w-full grid grid-cols-4">
      <ServerSidebar server={server} />
      <div className="col-span-3">
        <Outlet />
      </div>
    </main>
  );
}

export const serverLayoutLoader = async ({
  request,
  params,
}: {
  request: any;
  params: any;
}) => {
  const { server } = await ServerAPI.get(params.serverId, request.signal);

  if (!server) redirect("/dashboard");

  return server;
};
