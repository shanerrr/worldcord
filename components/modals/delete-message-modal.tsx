"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@worldcord/components/ui/card";
import { useModal } from "@worldcord/hooks/use-modal";
import { Button } from "@worldcord/components/ui/button";
import { MessageApi } from "@worldcord/apis";

export const DeleteMessageModal = () => {
  const {
    type,
    data: { details },
    onClose,
  } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await MessageApi.delete(
        details?.serverId!,
        details?.channelId!,
        details?.messageId!
      );
    } catch {
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-0 overflow-hidden focus-visible:outline-none">
        <CardHeader className="pt-8 px-6">
          <CardTitle className="text-2xl text-center font-bold">
            Delete Message
          </CardTitle>
          <CardDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            The message will be permanently deleted.
          </CardDescription>
        </CardHeader>
        <CardFooter className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
