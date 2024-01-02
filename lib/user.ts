import { currentUser } from "@clerk/nextjs";

import { db } from "./db";

export const createOrGetUser = async () => {
  const user = await currentUser();

  if (!user) return;

  const res = await fetch("http://localhost:4000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      username: user.username!,
      email: user.emailAddresses[0].emailAddress,
    }),
  });

  if (!res.ok) throw new Error("Error creating or updating user!");

  return res.json();
};

export const initalServer = async (serverId: string) => {
  const user = await currentUser();

  if (!user) {
    return { profile: null, server: await getServer(serverId) };
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  const existingMember = await db.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (!existingMember) {
    await db.member.create({
      data: {
        profileId: profile!.id,
        serverId: serverId,
      },
    });
  }
  return { profile, server: await getServer(serverId) };
};

export const getServer = async (id: string) => {
  return await db.server.findUnique({
    where: {
      id,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
};

export const getProfile = async () => {
  const user = await currentUser();

  if (!user) return;

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;
};
