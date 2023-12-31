import { redirect } from "next/navigation";
import { initalServer } from "@worldcord/lib/inital-profile";
import ServerMain from "@worldcord/components/server/server-main";

export default async function MainLayout({
  params,
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  const { profile, server } = await initalServer(params.serverId);

  if (!server) return redirect("/");

  // useEffect(() => {
  //   redirect(
  //     `/servers/${params?.serverId}/channels/${
  //       server.channels.filter((ch) => ch.type === "TEXT")[0].id
  //     }`
  //   );
  // }, []);

  return (
    <main className="h-full flex flex-col">
      <ServerMain server={server} profile={profile}>
        {children}
      </ServerMain>
    </main>
  );
}
