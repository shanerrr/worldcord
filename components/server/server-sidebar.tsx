import Image from "next/image";

import { ServerHeader } from "./server-header";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerSearch } from "./server-search";

import { ScrollArea } from "@worldcord/components/ui/scroll-area";

import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ServerWithMembersWithProfiles } from "@worldcord/types";
import {
  Profile,
  ChannelType,
  Channel,
  MemberRole,
  Member,
} from "@prisma/client";
import ActionTooltip from "../action-tooltip";
import NavigationBottom from "../navigation/navigation-bottom";
import { MemberAPI } from "@worldcord/apis";

type ServerSidebarProps = {
  server: ServerWithMembersWithProfiles;
  user: Profile;
};

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = (profile: Profile, role: MemberRole) => {
  const iconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
      <ShieldCheck size={16} className="text-purple-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert size={16} className="text-rose-400" />,
  };

  return (
    <div className="text-indigo-500 flex items-center gap-1 mr-2">
      <ActionTooltip label={role} align="center" side="right">
        <span className="">{iconMap[role]}</span>
      </ActionTooltip>
      <Image
        className="rounded-full"
        src={profile.imageUrl!}
        alt={profile.username}
        width={32}
        height={32}
      />
    </div>
  );
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
    ? members.find((member: Member) => member.userId === user!.id)?.role
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
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: AUDIO?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: VIDEO?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member: Member) => ({
                  id: member.id,
                  name: member.user.username,
                  icon: roleIconMap(member.user, member.role),
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
