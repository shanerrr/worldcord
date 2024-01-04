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

    if (!res.ok) throw new Error("Error getting Server!");

    return res.json();
  },
};
