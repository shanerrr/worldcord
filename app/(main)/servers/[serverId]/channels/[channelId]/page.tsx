import { redirectToSignIn } from "@clerk/nextjs";

import ChatHeader from "@worldcord/components/chat/chat-header";
import ChatInput from "@worldcord/components/chat/chat-input";
import ChatMessages from "@worldcord/components/chat/chat-messages";

import { getChannel, getMember } from "@worldcord/lib/server";
import { currentProfile } from "@worldcord/lib/current-profile";

type ChannelPagePros = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelPage({ params }: ChannelPagePros) {
  const profile = await currentProfile();
  const member = await getMember(params.serverId, profile?.id!);
  const channel = await getChannel(params.serverId, params.channelId);

  if (!profile || !member || !channel) return redirectToSignIn();

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={channel.name} type={channel.type} />
      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
      />
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
