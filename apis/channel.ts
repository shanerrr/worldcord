import { Channel, ChannelType } from "@prisma/client";

export const ChannelAPI = {
  create: async (
    serverId: string,
    body: { name: string; type: ChannelType }
  ): Promise<{ channel: Channel }> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${serverId}/channels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) throw new Error("Error getting channels!!");

    return res.json();
  },
  get: async (
    serverId: string,
    channelId: string
  ): Promise<{ channel: Channel }> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${serverId}/channels/${channelId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting channels!!");

    return res.json();
  },
  getFirst: async (id: string): Promise<{ channel: Channel }> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${id}/channels?filter=first`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting channel!");

    return res.json();
  },
  getAll: async (id: string): Promise<{ channels: Channel[] }> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${id}/channels?filter=all`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting channels!!");

    return res.json();
  },
};
