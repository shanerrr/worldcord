export const MessageApi = {
  create: async (
    serverId: string,
    channelId: string,
    body: { memberId: string; content: string }
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${serverId}/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) throw new Error("Error creating message!");

    return res.json();
  },

  update: async (
    serverId: string,
    channelId: string,
    id: string,
    body: { content: string }
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${serverId}/channels/${channelId}/messages/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) throw new Error("Error updating Message!");

    return res.json();
  },
  delete: async (serverId: string, channelId: string, id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${serverId}/channels/${channelId}/messages/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) throw new Error("Error deleteing Message!");

    return res.json();
  },
};
