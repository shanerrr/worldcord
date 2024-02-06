import { Server, Channel } from "@prisma/client";

// TODO: FIX TYPING FOR SIGNAL
export const ServerAPI = {
  get: async (
    id: string,
    signal: any
  ): Promise<{ server: Server & { channels: Channel[] } }> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/servers/${id}`, {
      method: "GET",
      signal,
    });

    if (!res.ok) throw new Error("Error getting Server!");

    return res.json();
  },
};
