import { Server, Channel, Member, User } from "@prisma/client";

export type ServerWithChannelsWithMembersWithProfiles = Server & {
  channels: Channel[];
  members: Array<Member & { user: User }>;
};
