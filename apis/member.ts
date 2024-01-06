export const MemberAPI = {
  get: async (serverId: string, memberId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${serverId}/members/${memberId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting members!");

    return res.json();
  },
  getAll: async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${id}/members`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting members!");

    return res.json();
  },
  findOrCreate: async (serverId: string, userId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/${serverId}/members`,
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
