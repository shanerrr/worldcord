import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@worldcord/components/ThemeToggle/theme-toggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
