import {
  Message,
  User,
  Member,
} from "@prisma/client";

export const MessageApi = {
  create: async (
    serverId: string,
    channelId: string,
    body: { memberId: string; content: string }
  ): Promise<{ msg: string }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${serverId}/channels/${channelId}/messages`,
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
  get: async (
    serverId: string,
    channelId: string,
    pageParam: string | undefined
  ): Promise<{
    messages: Array<Message & { member: Member & { user: User } }>;
    cursor: string | undefined;
  }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${serverId}/channels/${channelId}/messages?cursor=${pageParam}&batch=15`,
      // {
      //   next: {
      //     revalidate: 3600,
      //   },
      // }
    );

    if (!res.ok) throw new Error("Error getting Messages!");

    return res.json();
  },
  update: async (
    serverId: string,
    channelId: string,
    id: string,
    body: { content: string }
  ): Promise<{ msg: string }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${serverId}/channels/${channelId}/messages/${id}`,
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
  delete: async (
    serverId: string,
    channelId: string,
    id: string
  ): Promise<{ msg: string }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${serverId}/channels/${channelId}/messages/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) throw new Error("Error deleteing Message!");

    return res.json();
  },
};
