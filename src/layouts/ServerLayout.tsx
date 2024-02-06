import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { ServerAPI } from "@worldcord/apis";

import ServerSidebar from "@worldcord/components/Server/ServerSidebar";

import { ServerWithChannelsWithMembersWithProfiles } from "@worldcord/types";

export default function ServerLayout() {
  const server = useLoaderData() as ServerWithChannelsWithMembersWithProfiles;

  return (
    <main className="h-full w-full flex">
      <ServerSidebar server={server} />
      <Outlet />
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
