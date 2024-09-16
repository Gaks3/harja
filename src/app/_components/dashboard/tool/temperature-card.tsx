"use client";

import { formatDistance } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import type { TemperatureHumidity } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

const getGradientColors = (temp: number): [string, string] => {
  if (temp < 0) return ["from-blue-700", "to-blue-300"]; // Very cold
  if (temp < 10) return ["from-blue-500", "to-blue-200"]; // Cold
  if (temp < 20) return ["from-green-500", "to-blue-200"]; // Cool
  if (temp < 35) return ["from-yellow-400", "to-orange-300"]; // Warm
  if (temp < 40) return ["from-orange-500", "to-red-400"]; // Hot
  return ["from-red-600", "to-red-300"]; // Very hot
};

export default function TemperatureCard({
  value,
}: {
  value?: TemperatureHumidity;
}) {
  const [data, setData] = useState<TemperatureHumidity | null>(value ?? null);

  const query = api.device.getTemperatureHumidity.useQuery(
    { id: value?.id ?? 0 },
    {
      refetchInterval: value !== null ? 60000 : false,
      enabled: value !== null,
    },
  );

  const gradientColors = getGradientColors(data?.temperature ?? 0);

  useEffect(() => {
    if (query.data) setData(query.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isSuccess]);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader className="items-center p-4 pb-2">
        <CardTitle className="text-xl">Suhu Ruangan</CardTitle>
        <CardDescription>
          {formatDistance(data?.recordedAt ?? new Date(), new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-4 pt-0">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <div
            className={`absolute inset-2 bg-gradient-to-br ${gradientColors[0]} ${gradientColors[1]} rounded-full opacity-50 blur-md`}
          ></div>
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-4xl font-bold text-gray-800">
              {data?.temperature ?? 0}°
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
