import ServerSearch from "./ServerSearch";
import { Hash, Mic } from "lucide-react";

import { cn } from "@worldcord/lib/utils";

import { ServerWithChannelsWithMembersWithProfiles } from "@worldcord/types";
import { Channel } from "@prisma/client";

type ServerSearchProps = {
  server: ServerWithChannelsWithMembersWithProfiles;
};

export default function ServerSidebar({ server }: ServerSearchProps) {
  const { TEXT, AUDIO } = server.channels.reduce<Record<string, Channel[]>>(
    (acc, cur) => {
      if (!acc[cur.type]) acc[cur.type] = [];

      acc[cur.type].push(cur);
      return acc;
    },
    {}
  );

  return (
    <div className="bg-zinc-200 border-r dark:border-zinc-700 border-zinc-400 dark:bg-zinc-900 h-full relative">
      <ServerSearch
        serverId={server.id}
        data={[
          {
            label: "Text Channels",
            type: "channel",
            data: TEXT?.map((channel) => ({
              id: channel.id,
              name: channel.name,
              icon: <Hash className="mr-2 h-4 w-4" />,
            })),
          },
          {
            label: "Voice Channels",
            type: "channel",
            data: AUDIO?.map((channel) => ({
              id: channel.id,
              name: channel.name,
              icon: <Mic className="mr-2 h-4 w-4" />,
            })),
          },
          {
            label: "Members",
            type: "member",
            data: server.members.map((member) => ({
              id: member.id,
              name: "",
              icon: (
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full"
                      loading="lazy"
                      src={member.user.imageUrl!}
                      alt={member.user.username}
                      width={40}
                      height={40}
                    />
                    <span
                      className={cn({
                        "text-rose-500 font-bold": member.role === "ADMIN",
                      })}
                    >
                      {member.user.username}
                    </span>
                  </div>
                  {member.role !== "GUEST" && (
                    <span className="text-primary/50 lowercase text-xs">
                      {member.role}
                    </span>
                  )}
                </div>
              ),
            })),
          },
        ]}
      />
    </div>
  );
}
