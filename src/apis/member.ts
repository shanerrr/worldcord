import { User, Member } from "@prisma/client";

export const MemberAPI = {
  get: async (
    serverId: string,
    memberId: string
  ): Promise<{ member: Member }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${serverId}/members/${memberId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting members!");

    return res.json();
  },
  getAll: async (
    id: string
  ): Promise<{ members: Array<Member & { user: User }> }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${id}/members`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting members!");

    return res.json();
  },
  findOrCreate: async (
    serverId: string,
    userId: string
  ): Promise<{ member: Member }> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/servers/${serverId}/members`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      }
    );

    if (!res.ok) throw new Error("Error creating or updating member!");

    return res.json();
  },
};
