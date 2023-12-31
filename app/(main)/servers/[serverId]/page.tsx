import { getGeneralChannel } from "@worldcord/lib/server";
import { redirect } from "next/navigation";

type ServerPagePros = {
  params: {
    serverId: string;
  };
};

export default async function ServerPage({ params }: ServerPagePros) {
  const channel = await getGeneralChannel(params.serverId);

  if (channel) {
    return redirect(`/servers/${params?.serverId}/channels/${channel.id}`);
  }

  return <div></div>;
}
