import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";
import { Server, Member, Profile, Channel } from "@prisma/client";

export type MapState = {
  name?: string;
  open: boolean;
  iso_n3?: string;
  iso_a2?: string;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
  channels: Channel[];
};
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};