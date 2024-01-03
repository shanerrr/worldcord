export const MemberAPI = {
  get: async (serverId: string, memberId: string) => {
    const res = await fetch(
      `http://localhost:4000/api/server/${serverId}/members/${memberId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) throw new Error("Error getting members!");

    return res.json();
  },
  getAll: async (id: string) => {
    const res = await fetch(`http://localhost:4000/api/server/${id}/members`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Error getting members!");

    return res.json();
  },
  findOrCreate: async (serverId: string, userId: string) => {
    const res = await fetch(
      `http://localhost:4000/api/server/${serverId}/members`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          serverId,
        }),
      }
    );

    if (!res.ok) throw new Error("Error creating or updating member!");

    return res.json();
  },
};
