"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@worldcord/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@worldcord/components/ui/form";
import { Label } from "@worldcord/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@worldcord/components/ui/radio-group";
import { Input } from "@worldcord/components/ui/input";
import { Button } from "@worldcord/components/ui/button";

import { useModal } from "@worldcord/hooks/use-modal";
import { ChannelAPI } from "@worldcord/apis";

import { Hash, Video, Volume1 } from "lucide-react";

import { ChannelType } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

const channelMap = {
  TEXT: {
    type: "Text",
    icon: <Hash size={28} />,
    description: "Send messages, emojis and be sussy",
  },
  AUDIO: {
    type: "Audio",
    icon: <Volume1 size={28} />,
    description: "Send messages, emojis and be sussy",
  },
};

export default function CreateChannelModal() {
  const { onClose, data } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await ChannelAPI.create(data.details?.serverId!, values);
      onClose();
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-96">
      <CardContent className="p-0 overflow-hidden">
        <CardHeader className="pt-8 px-4">
          <CardTitle className="text-2xl text-center font-bold">
            Create Channel
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-4">
              <FormField
                control={form.control}
                name="type"
                render={() => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-ring">
                      Channel Type
                    </FormLabel>

                    <RadioGroup
                      defaultValue="TEXT"
                      onValueChange={(channel: ChannelType) =>
                        form.setValue("type", channel)
                      }
                      disabled={isLoading}
                    >
                      {Object.values(ChannelType).map((type) => (
                        <div
                          key={type}
                          className="flex flex-row-reverse items-center space-x-2 bg-muted/50 px-4 py-4 rounded"
                        >
                          <RadioGroupItem value={type} id={type} />
                          <Label
                            style={{
                              margin: 0,
                            }}
                            htmlFor={type}
                            className="m-0 flex flex-1 items-center"
                          >
                            {channelMap[type].icon}

                            <div className="flex flex-col gap-1 px-3">
                              <span className="font-semibold">
                                {channelMap[type].type}
                              </span>
                              <p className="text-xs text-ring/60">
                                {channelMap[type].description}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-ring">
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-muted/40 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="px-6 py-4 flex gap-2 justify-end bg-muted/30">
              <Button
                variant="ghost"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button variant="default" disabled={isLoading}>
                Create
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
