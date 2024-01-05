"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";
import { EmojiPicker } from "../emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@worldcord/components/ui/form";

import { MessageApi } from "@worldcord/apis";
import { Plus } from "lucide-react";

type ChatInputProps = {
  name: string;
  type: "channel";
  details: {
    serverId: string;
    channelId: string;
  };
  member: string;
};

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatInput({ name, details, member }: ChatInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await MessageApi.create(details.serverId, details.channelId, {
      ...values,
      memberId: member,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-3">
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative my-3 items-center">
                  <button
                    type="button"
                    // onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute top-1/2 -translate-y-1/2 left-4 bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full flex items-center justify-center"
                  >
                    <Plus
                      size={25}
                      className="text-white dark:text-[#313338] p-0.5"
                    />
                  </button>
                  <Input
                    className="py-6 px-14 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Type your funniest message to #${name}!`}
                    {...field}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
