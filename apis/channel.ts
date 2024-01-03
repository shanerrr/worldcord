export const ChannelAPI = {
  get: async (serverId: string, channelId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${serverId}/channels/${channelId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting channels!!");

    return res.json();
  },
  getFirst: async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/channels?filter=first`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting channel!");

    return res.json();
  },
  getAll: async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/channels?filter=all`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting channels!!");

    return res.json();
  },
};
