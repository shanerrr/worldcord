import { Profile } from "@prisma/client";
import ServerSidebar from "@worldcord/components/server/server-sidebar";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@worldcord/components/ui/resizable";

import { ServerWithMembersWithProfiles } from "@worldcord/types";

type ServerMainProps = {
  server: ServerWithMembersWithProfiles;
  user: Profile | null;
  children: React.ReactNode;
};

export default async function ServerMain({
  server,
  user,
  children,
}: ServerMainProps) {
  return (
    <main className="h-full w-full flex">
      <ServerSidebar server={server} user={user!} />
      <div className="flex-1">{children}</div>

      {/* <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <ServerSidebar server={server} user={user} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup> */}
    </main>
  );
}
