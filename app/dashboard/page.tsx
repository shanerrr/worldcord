import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

import Mapbox from "@worldcord/components/map/map";

import { UserAPI } from "@worldcord/apis/user";

export default async function Inital() {
  const { user } = await UserAPI.findOrCreate();

  return (
    <main className="w-full h-full">
      <Mapbox />
      <div className="w-2/3 fixed bottom-9 bg-slate-200 dark:bg-zinc-900 h-28 left-1/2 -translate-x-1/2 rounded-2xl opacity-85 flex items-center px-8 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden">
            <Image
              className="absolute inset-0"
              src={user.imageUrl}
              alt={user.username}
              fill={true}
            />
          </div>
          <div>
            <span className="font-bold text-4xl">{user.username}</span>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
