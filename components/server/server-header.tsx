"use client";
import Image from "next/image";
import { ServerWithMembersWithProfiles } from "@worldcord/types";
import { MemberRole } from "@prisma/client";
import { ChevronDown, PlusCircle, Settings, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@worldcord/components/ui/dropdown-menu";
// import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole | null;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  //   const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none"
        asChild
        disabled={!isModerator}
      >
        <button className="w-full text-md font-semibold px-3 flex items-center h-16 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          <div className="flex gap-1">
            <Image
              alt={server.name}
              src={server.imageUrl}
              width={20}
              height={20}
            />
            {server.name}
          </div>
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isAdmin && (
          <DropdownMenuItem
            // onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            // onClick={() => onOpen("createChannel")}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            // onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
