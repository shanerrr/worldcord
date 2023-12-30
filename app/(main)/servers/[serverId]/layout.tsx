import { redirect } from "next/navigation";
import { initalServer } from "@worldcord/lib/inital-profile";
import ServerSidebar from "@worldcord/components/server/server-sidebar";
import { Profile } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "@worldcord/types";

export default async function MainLayout({
  params,
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  const { profile, server } = await initalServer(params.serverId);

  if (!server) return redirect("/");

  return (
    <main className="h-full flex flex-col">
      <div className="flex flex-grow">
        <div className="w-60 z-20 fixed h-full">
          <ServerSidebar server={server} profile={profile} />
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
