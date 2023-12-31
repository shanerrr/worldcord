import { redirectToSignIn } from "@clerk/nextjs";
import ChatHeader from "@worldcord/components/chat/chat-header";

import { getChannel } from "@worldcord/lib/server";
import { currentProfile } from "@worldcord/lib/current-profile";

type ChannelPagePros = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelPage({ params }: ChannelPagePros) {
  const profile = currentProfile();

  if (!profile) redirectToSignIn();

  const channel = await getChannel(params.serverId, params.channelId);

  return (
    <div>
      <ChatHeader name={channel?.name!} type={channel?.type!} />
    </div>
  );
}
