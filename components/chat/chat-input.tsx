"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@worldcord/components/ui/form";

type ChatInputProps = {
  name: string;
  type: "channel";
  apiUrl: string;
  query: Record<string, any>;
};

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatInput({ apiUrl, query }: ChatInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      fetch(
        `${apiUrl}?channelId=${query.channelId}&serverId=${query.serverId}`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-3">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative pb-6">
                  <Input
                    disabled={isLoading}
                    className="p-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder="Type your funniest thoughts!"
                    {...field}
                  />
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
