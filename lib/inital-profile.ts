import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";
import { Profile } from "@prisma/client";

export const initalProfile = async () => {
  const user = await currentUser();

  if (!user) return redirectToSignIn();

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

export const findServer = async (profile: Profile) => {
  return await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
};
