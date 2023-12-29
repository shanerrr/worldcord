import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "../theme-toggle";

type NavigationHeaderProps = {
  name: string;
  imageUrl: string;
};

export default function NavigationHeader({
  name,
  imageUrl,
}: NavigationHeaderProps) {
  return (
    <div className="bg-zinc-200 border-zinc-400 dark:bg-zinc-900 flex justify-between h-16 px-8 border-b dark:border-zinc-700">
      <div className="flex justify-center items-center gap-2">
        <div className="w-8 h-8 relative">
          <Image className="absolute" src={imageUrl} fill={true} alt={name} />
        </div>
        <h1 className="font-bold">{name}</h1>
      </div>
      <div className="flex justify-center items-center gap-2">
        <UserButton showName={true} />
        <ThemeToggle />
      </div>
    </div>
  );
}
