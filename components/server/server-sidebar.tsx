import Image from "next/image";

import ServerHeader from "./server-header";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerSearch from "./server-search";
import NavigationBottom from "../navigation/navigation-bottom";
import { ScrollArea } from "@worldcord/components/ui/scroll-area";

import { cn } from "@worldcord/lib/utils";

import { Hash, Mic, Video } from "lucide-react";

import {
  User,
  ChannelType,
  Channel,
  Server,
} from "@prisma/client";

import { MemberAPI } from "@worldcord/apis";

type ServerSidebarProps = {
  server: Server & { channels: Channel[] };
  user: User;
};

export default async function ServerSidebar({
  server,
  user,
}: ServerSidebarProps) {
  const { members } = await MemberAPI.getAll(server.id);
  const { TEXT, AUDIO, VIDEO } = server.channels.reduce<
    Record<string, Channel[]>
  >((acc, cur) => {
    if (!acc[cur.type]) acc[cur.type] = [];

    acc[cur.type].push(cur);
    return acc;
  }, {});

  const role = user
    ? members.find((member) => member.userId === user!.id)?.role
    : null;

  return (
    <div className="bg-zinc-200 border-r dark:border-zinc-700 border-zinc-400 dark:bg-zinc-900 h-full relative">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3 mt-2">
        <div className="my-2">
          <ServerSearch
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
                label: "Video Channels",
                type: "channel",
                data: VIDEO?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: <Video className="mr-2 h-4 w-4" />,
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: "",
                  icon: (
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center gap-2">
                        <Image
                          className="rounded-full"
                          src={member.user.imageUrl!}
                          alt={member.user.username}
                          quality={100}
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
        {!!TEXT?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {TEXT.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!AUDIO?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {AUDIO.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!VIDEO?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {VIDEO.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {/* {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )} */}
      </ScrollArea>
      <NavigationBottom user={user} />
    </div>
  );
}
