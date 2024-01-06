import { ChannelType } from "@prisma/client";

import { Hash, Volume2 } from "lucide-react";

type ChatHeaderProps = { name: string; type: ChannelType };

export default function ChatHeader({ name, type }: ChatHeaderProps) {
  return (
    <div className="h-16 flex items-center px-3 border-b gap-2 font-semibold">
      {type === "TEXT" && <Hash />}
      {type === "AUDIO" && <Volume2 />}

      <h1>{name}</h1>
    </div>
  );
}
