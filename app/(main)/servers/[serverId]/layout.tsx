import { getServer } from "@worldcord/lib/inital-profile";
import NavigationHeader from "@worldcord/components/navigation/navigation-header";
import ServerSidebar from "@worldcord/components/server/server-sidebar";

export default async function MainLayout({
  params,
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  const server = await getServer(params.serverId);
  if (!server) return null;

  return (
    <main className="h-full flex flex-col">
      <NavigationHeader name={server.name} imageUrl={server.imageUrl} />
      <div className="flex flex-grow">
        <div className="w-60 z-20 fixed h-full">
          <ServerSidebar channels={server.channels} />
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
