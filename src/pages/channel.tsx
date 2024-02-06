import { useLoaderData } from "react-router-dom";

import { ChannelAPI } from "@worldcord/apis";
import ChatMessages from "@worldcord/components/Chat/ChatMessages";

import { Channel } from "@prisma/client";
import ChatHeader from "@worldcord/components/Chat/ChatHeader";

export default function ChannelPage() {
  const channel = useLoaderData() as Channel;
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
        member={null}
      />
    </div>
  );
}

export const channelLoader = async ({
  request,
  params,
}: {
  request: any;
  params: any;
}) => {
  const { channel } = await ChannelAPI.get(params.serverId, params.channelId);
  return channel;
};
