import { currentUser } from "@clerk/nextjs";

import { User } from "@prisma/client";

export const UserAPI = {
  findOrCreate: async (): Promise<{ user: User }> => {
    const user = await currentUser();

    if (!user) return { user: null };

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
