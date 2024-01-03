export const ServerAPI = {
  get: async (id: string) => {
    const res = await fetch("http://localhost:4000/api/server/" + id, {
      method: "GET",
      // next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Error getting Server!");

    return res.json();
  },
};
