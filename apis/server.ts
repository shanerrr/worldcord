import { Server, Channel } from "@prisma/client";

export const ServerAPI = {
  get: async (
    id: string
  ): Promise<{ server: Server & { channels: Channel[] } }> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${id}`,
      {
        method: "GET",
        // next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Error getting Server!");

    return res.json();
  },
};
