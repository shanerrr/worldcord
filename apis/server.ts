export const ServerAPI = {
  get: async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servers/${id}`, {
      method: "GET",
      // next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Error getting Server!");

    return res.json();
  },
};
