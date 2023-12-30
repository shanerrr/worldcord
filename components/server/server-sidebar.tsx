import { Profile } from "@prisma/client";
import { ServerHeader } from "./server-header";

import { ServerWithMembersWithProfiles } from "@worldcord/types";

type ServerSidebarProps = {
  server: ServerWithMembersWithProfiles;
  profile: Profile | null;
};
export default function ServerSidebar({ server, profile }: ServerSidebarProps) {
  const role = profile
    ? server.members.find((member) => member.profileId === profile!.id)?.role
    : null;

  return (
    <div className="bg-zinc-200 border-r dark:border-zinc-700 border-zinc-400 dark:bg-zinc-900 h-full">
      <ServerHeader server={server} role={role} />
      {/* <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))} */}
      {/* </ul> */}
    </div>
  );
}
