import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const initalProfile = async () => {
  const user = await currentUser();

  if (!user) return;

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      username: user.username!,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
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
