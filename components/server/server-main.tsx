import ServerSidebar from "@worldcord/components/server/server-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@worldcord/components/ui/resizable";

import {
  Server,
  User,
  Channel,
} from "@prisma/client";

type ServerMainProps = {
  server: Server & { channels: Channel[] };
  user: User;
  children: React.ReactNode;
};

export default async function ServerMain({
  server,
  user,
  children,
}: ServerMainProps) {
  return (
    <main className="h-full w-full flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <ServerSidebar server={server} user={user} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
