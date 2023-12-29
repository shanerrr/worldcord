import { initalProfile } from "@worldcord/lib/inital-profile";

import Mapbox from "@worldcord/components/map/map";

export default async function Inital() {
  const profile = await initalProfile();

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
