"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@worldcord/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@worldcord/components/ui/form";
import ActionTooltip from "@worldcord/components/action-tooltip";
import { Input } from "@worldcord/components/ui/input";
import { Button } from "@worldcord/components/ui/button";
import { UserAvatar } from "@worldcord/components/user-avatar";
import { useModal } from "@worldcord/hooks/use-modal";
import { MessageApi } from "@worldcord/apis";

import { Edit, FileIcon, Trash } from "lucide-react";

import {
  Member,
  User,
  MemberRole,
} from "@prisma/client";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    user: User;
  };
  timestamp: string;
  fileUrl: string | null;
  currentMember: Member;
  isUpdated: boolean;
  details: {
    serverId: string;
    channelId: string;
  };
}

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatItem({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  details,
  currentMember,
  isUpdated,
}: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.content !== content) {
      await MessageApi.update(details.serverId, details.channelId, id, {
        ...values,
        // memberId: member,
      });
    }
    form.reset();
    setIsEditing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = isAdmin || isModerator || isOwner;
  const canEditMessage = isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-muted/60 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          // onClick={onMemberClick}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.user.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                // onClick={onMemberClick}
                className={cn(
                  "font-semibold text-base hover:underline cursor-pointer",
                  {
                    "text-rose-500": member.role === "ADMIN",
                    "text-indigo-500": member.role === "MODERATOR",
                  }
                )}
              >
                {member.user.username}
              </p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {content}
              {isUpdated && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="default">
                  Save
                </Button>
              </form>
              <span className="text-xs mt-1 text-zinc-400">
                Press escape to{" "}
                <span
                  className="underline text-blue-600 cursor-pointer"
                  onClick={() => setIsEditing(false)}
                >
                  cancel
                </span>
                , enter to{" "}
                <span
                  className="underline text-blue-600 cursor-pointer"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  save
                </span>
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  details: { ...details, messageId: id },
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}
