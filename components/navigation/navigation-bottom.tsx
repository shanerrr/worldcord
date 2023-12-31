import { UserButton } from "@clerk/nextjs";
import { Bell, Globe2 } from "lucide-react";

import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import { Button } from "../ui/button";
import NavigationProfile from "./navigation-profile";

export default function NavigationBottom() {
  return (
    <aside className="absolute bottom-6 z-10 dark:bg-zinc-900 h-16 bg-zinc-200 left-1/2 -translate-x-1/2 px-6 rounded-2xl flex items-center ring-1 ring-muted">
      <div className="flex items-center divide-x-2 divide-white dark:divide-zinc-700 gap-2">
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
          <NavigationProfile />
        </div>
      </div>
    </aside>
  );
}
