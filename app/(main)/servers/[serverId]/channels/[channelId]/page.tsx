import ChatHeader from "@worldcord/components/chat/chat-header";
import ChatInput from "@worldcord/components/chat/chat-input";
import ChatMessages from "@worldcord/components/chat/chat-messages";

import { ChannelAPI, MemberAPI, UserAPI } from "@worldcord/apis";

type ChannelPagePros = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelPage({ params }: ChannelPagePros) {
  const { user } = await UserAPI.findOrCreate();

  const [{ channel }, { member }] = await Promise.all([
    ChannelAPI.get(params.serverId, params.channelId),
    MemberAPI.get(params.serverId, user.id),
  ]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={channel.name} type={channel.type} />
      <ChatMessages
        name={channel.name}
        type="channel"
        details={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        member={member}
      />
      <ChatInput
        type="channel"
        details={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        member={member.id}
      />
    </div>
  );
}
