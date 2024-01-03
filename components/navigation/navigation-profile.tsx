"use client";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@worldcord/components/ui/dropdown-menu";
import Image from "next/image";
import { Skeleton } from "@worldcord/components/ui/skeleton";

import { Button } from "../ui/button";
import { Profile } from "@prisma/client";

export default function NavigationProfile({ user }: { user: Profile }) {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon">
          {user?.imageUrl ? (
            <Image
              className="object-cover rounded-full"
              src={user?.imageUrl!}
              alt={user?.username!}
              height={44}
              width={44}
              priority={true}
            />
          ) : (
            <Skeleton className="h-11 w-11 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="flex gap-2" onClick={() => null}>
          <User size={20} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-800 flex gap-2"
          onClick={() => signOut(() => router.push("/"))}
        >
          <LogOut size={20} />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={true}>{user?.username}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
