import { initalProfile, findServer } from "@worldcord/lib/inital-profile";
import { redirect } from "next/navigation";

import Mapbox from "@worldcord/components/custom/map";

export default async function Inital() {
  const profile = await initalProfile();
  const server = await findServer(profile);

  if (server) {
    return redirect(`/locations/${server.id}`);
  }

  return (
    <main className="w-full h-full">
      <div className="grid grid-rows-2 h-full w-full">
        <Mapbox />

        <div>
          <h1 className="text-4xl font-bold">{profile.username}</h1>
        </div>
      </div>
    </main>
  );
}
