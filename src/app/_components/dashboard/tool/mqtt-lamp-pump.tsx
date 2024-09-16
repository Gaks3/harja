"use client";

import useMqtt from "@/hooks/use-mqtt";
import { useEffect, useState } from "react";
import LampCard from "./lamp-card";
import PumpCard from "./pump-card";
import type { Pump, Switch } from "@prisma/client";
import type { MessageDataMQTT } from "@/lib/types";

export default function MqttLampPump({
  topic,
  switchs,
  pump,
}: {
  topic: string;
  switchs: Switch[];
  pump: Pump;
}) {
  const [data, setData] = useState<MessageDataMQTT>({
    ...switchs.reduce(
      (prev, curr) => ({ ...prev, [curr.inputName]: curr.status === "on" }),
      {},
    ),
    pump: pump?.status === "on" || false,
  });
  const { mqttSubscribe, isConnected, payload } = useMqtt();

  useEffect(() => {
    if (isConnected) {
      mqttSubscribe(topic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if (payload.message) {
      const parse = JSON.parse(payload.message) as MessageDataMQTT;

      const data_ = data;

      for (const property in parse) {
        (data as Record<string, unknown>)[property] =
          (parse as Record<string, string>)[property] === "on";
      }

      setData({
        ...data,
        ...data_,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <>
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold">Lamps</h2>
          <p className="text-sm">
            Remember to turn off the light when not in use.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {switchs.map((value, index) => (
            <LampCard
              id={value.id}
              name={value.name ?? value.inputName}
              inputName={value.inputName}
              topic={topic}
              value={
                (data as Record<string, boolean>)[value.inputName] ?? false
              }
              date={value.recordedAt}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold">Pump</h2>
          <p className="text-sm">Manage your water pump system</p>
        </div>
        <PumpCard
          value={pump?.status === "on" || false}
          topic={topic}
          date={pump?.recordedAt ?? new Date()}
        />
      </div>
    </>
  );
}
