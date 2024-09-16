"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Switch } from "../../ui/switch";
import { LightbulbIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  updateSwitchSchema,
  type UpdateSwitchSchema,
} from "@/server/api/routers/switch/switch.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "@/hooks/use-toast";
import { TRPCClientError } from "@trpc/client";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import useMqtt from "@/hooks/use-mqtt";
import { formatDistance } from "date-fns";

export default function LampCard({
  id,
  value,
  name,
  inputName,
  topic,
  date,
}: {
  id: number;
  value: boolean;
  name: string;
  inputName: string;
  topic: string;
  date: Date;
}) {
  const { mqttPublish, isConnected } = useMqtt();

  const [isOn, setIsOn] = useState(value ?? false);

  const mutation = api.switch.update.useMutation();

  const form = useForm<UpdateSwitchSchema>({
    resolver: zodResolver(updateSwitchSchema),
    values: {
      id,
      name,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: UpdateSwitchSchema) {
    try {
      if (values.name !== name) await mutation.mutateAsync(values);

      toast({ title: "Success to update lamp" });
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  function handleChange(value: boolean) {
    if (isConnected) {
      const message: Record<string, unknown> = {};
      message[inputName] = value ? "on" : "off";

      mqttPublish(topic, JSON.stringify(message));

      setIsOn(value);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon
            className={isOn ? "text-yellow-400" : "text-gray-400"}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onBlur={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="border-b">
                      <FormControl>
                        <Input
                          className="!border-none !p-0 !shadow-none !outline-none !ring-0 !ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardTitle>
        <CardDescription>
          {formatDistance(date, new Date(), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <label htmlFor="light-switch" className="text-sm font-medium">
            {isOn ? "Light On" : "Light Off"}
          </label>
          <Switch
            id="light-switch"
            checked={isOn}
            onCheckedChange={handleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
