import { currentUser } from "@clerk/nextjs";

export const UserAPI = {
  findOrCreate: async () => {
    const user = await currentUser();

    if (!user) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        username: user.username!,
        email: user.emailAddresses[0].emailAddress,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Error creating or updating user!");

    return res.json();
  },
};
