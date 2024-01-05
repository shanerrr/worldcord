import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export default function ChatWelcome({ name, type }: ChatWelcomeProps) {
  return (
    <div className="space-y-2 px-4 my-8 flex flex-col items-center justify-end flex-1">
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
}
