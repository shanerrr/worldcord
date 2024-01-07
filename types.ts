import { Message, Server, Member, Channel, User } from "@prisma/client";

export type MapState = {
  name?: string;
  iso_n3?: string;
  iso_a2?: string;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[];
  channels: Channel[];
};

export type MessageWithMemberWithProfile = Message & {
  member: {
    user: User;
  };
};
