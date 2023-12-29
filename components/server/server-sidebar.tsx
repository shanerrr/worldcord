import type { Channel } from "@prisma/client";

type ServerSidebarProps = {
  channels: Channel[];
};
export default function ServerSidebar({ channels }: ServerSidebarProps) {
  return (
    <div className="bg-zinc-200 border-r dark:border-zinc-700 border-zinc-400 dark:bg-zinc-900 h-full">
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
}
