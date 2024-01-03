import { ChannelAPI } from "@worldcord/apis";
import { redirect } from "next/navigation";

type ServerPagePros = {
  params: {
    serverId: string;
  };
};

export default async function ServerPage({ params }: ServerPagePros) {
  const { channel } = await ChannelAPI.getFirst(params.serverId);

  if (channel)
    return redirect(`/servers/${params?.serverId}/channels/${channel.id}`);

  return <div>Start by adding a new channel!</div>;
}
