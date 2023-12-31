import { db } from "./db";

export const getGeneralChannel = async (serverId: string) => {
  return await db.channel.findFirst({
    where: {
      serverId,
      name: "general",
    },
  });
};

export const getChannel = async (serverId: string, channelId: string) => {
  return await db.channel.findFirst({
    where: {
      id: channelId,
      serverId,
    },
  });
};
