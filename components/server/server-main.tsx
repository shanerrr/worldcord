"use client";

import { Profile } from "@prisma/client";
import ServerSidebar from "@worldcord/components/server/server-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@worldcord/components/ui/resizable";

import { ServerWithMembersWithProfiles } from "@worldcord/types";

type ServerMainProps = {
  server: ServerWithMembersWithProfiles;
  profile: Profile | null;
  children: React.ReactNode;
};

export default async function ServerMain({
  server,
  profile,
  children,
}: ServerMainProps) {
  return (
    <main className="h-full flex flex-col">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <ServerSidebar server={server} profile={profile} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
