import { UserButton } from "@clerk/nextjs";
import { Bell, Globe2 } from "lucide-react";

import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import { Button } from "../ui/button";

export default function NavigationBottom() {
  return (
    <aside className="flex items-center divide-x-2 divide-white dark:divide-zinc-700 gap-2">
      <div className="pr-2">
        <Link href="/dashboard">
          <Globe2 size={38} strokeWidth={1} />
        </Link>
      </div>
      <div className="flex items-center gap-1 pl-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </div>
    </aside>
  );
}
