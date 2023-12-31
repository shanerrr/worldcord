import { redirectToSignIn } from "@clerk/nextjs";
import ChatHeader from "@worldcord/components/chat/chat-header";

import { getChannel } from "@worldcord/lib/server";
import { currentProfile } from "@worldcord/lib/current-profile";
import ChatInput from "@worldcord/components/chat/chat-input";

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
    <div className="flex flex-col h-full">
      <ChatHeader name={channel?.name!} type={channel?.type!} />
      <div className="flex-1"></div>
      <ChatInput
        name={channel?.name!}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel?.id,
          serverId: channel?.serverId,
        }}
      />
    </div>
  );
}
