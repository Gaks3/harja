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
import { DropletsIcon } from "lucide-react";
import useMqtt from "@/hooks/use-mqtt";
import type { MessageDataMQTT } from "@/lib/types";
import { formatDistance } from "date-fns";

export default function PumpCard({
  value,
  topic,
  date = new Date(),
}: {
  value: boolean;
  topic: string;
  date: Date;
}) {
  const { mqttPublish, isConnected } = useMqtt();

  const [isOn, setIsOn] = useState(value ?? false);

  function handleChange(value: boolean) {
    if (isConnected) {
      const message: MessageDataMQTT = {};
      message.pump = value ? "on" : "off";

      mqttPublish(topic, JSON.stringify(message));

      setIsOn(value);
    }
  }

  return (
    <Card className="max-w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DropletsIcon className={isOn ? "text-blue-500" : "text-gray-400"} />
          Water Pump
        </CardTitle>
        <CardDescription>
          {formatDistance(date, new Date(), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <label htmlFor="pump-switch" className="text-sm font-medium">
            {isOn ? "Pump active" : "Pump inactive"}
          </label>
          <Switch
            id="pump-switch"
            checked={isOn}
            onCheckedChange={handleChange}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {isOn
            ? "The water pump is currently running. Turn it off when not needed to conserve energy."
            : "The water pump is currently off. Turn it on when you need to pump water."}
        </p>
      </CardContent>
    </Card>
  );
}
